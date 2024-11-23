const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.mjs');
const propertyRoutes = require('./routes/propertyRoutes.mjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));