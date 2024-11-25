import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import propertyRoutes from './routes/propertyRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Permitir todas las solicitudes de origen
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));