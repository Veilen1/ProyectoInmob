import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

// ── MongoDB connection (cached for serverless) ──────────────
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  const conn = await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

// ── Models ──────────────────────────────────────────────────
const propertySchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  bedrooms:    { type: Number, required: true },
  bathrooms:   { type: Number, required: true },
  location:    { type: String, required: true },
  images:      { type: [String], required: true },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: 'user' }
});
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.comparePassword = function(pwd) {
  return bcrypt.compare(pwd, this.password);
};
const User = mongoose.models.User || mongoose.model('User', userSchema);

// ── Middleware auth ─────────────────────────────────────────
const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token, authorization denied' });
  const token = authHeader.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token is not valid or expired' });
  }
};

const authorize = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Authorization required' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Access denied' });
  next();
};

// ── App ─────────────────────────────────────────────────────
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// DB connect en cada request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection error:', err.message);
    res.status(500).json({ error: 'Database connection failed', detail: err.message, uri_defined: !!process.env.MONGO_URI });
  }
});

// ── Routes: Properties ──────────────────────────────────────

// GET — cualquiera puede ver (sin auth)
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find({}).populate('user', 'username email');
    res.json(properties);
  } catch {
    res.status(500).json({ message: 'Error fetching properties' });
  }
});

// GET por ID — cualquiera puede ver
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('user', 'username email');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching property', error: err.message });
  }
});

// POST — solo admin e inmobiliario pueden crear
app.post('/api/properties', auth, authorize(['admin', 'inmobiliario']), async (req, res) => {
  try {
    const { title, description, price, bedrooms, bathrooms, location, images } = req.body;
    const property = new Property({ title, description, price, bedrooms, bathrooms, location, images, user: req.user.id });
    const created = await property.save();
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error creating property', error: err.message });
  }
});

// PUT — admin puede editar cualquiera; inmobiliario solo las suyas
app.put('/api/properties/:id', auth, authorize(['admin', 'inmobiliario']), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (req.user.role !== 'admin' && property.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'No tenés permiso para editar esta propiedad' });
    const { title, description, price, bedrooms, bathrooms, location, images } = req.body;
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      { title, description, price, bedrooms, bathrooms, location, images },
      { new: true, runValidators: true }
    ).populate('user', 'username email');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating property', error: err.message });
  }
});

// DELETE — admin puede borrar cualquiera; inmobiliario solo las suyas
app.delete('/api/properties/:id', auth, authorize(['admin', 'inmobiliario']), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (req.user.role !== 'admin' && property.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'No tenés permiso para eliminar esta propiedad' });
    await Property.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting property', error: err.message });
  }
});

// ── Routes: Auth ────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

app.get('/', (req, res) => res.send('API is running...'));

export default app;
