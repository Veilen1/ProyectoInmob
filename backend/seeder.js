const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property'); // Asegúrate de que la ruta sea correcta
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const properties = [
  {
    title: 'Casa en la playa',
    description: 'Hermosa casa con vista al mar',
    price: 500000,
    bedrooms: 4,
    bathrooms: 3,
    location: 'Playa del Carmen',
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
  },
  {
    title: 'Apartamento en la ciudad',
    description: 'Moderno apartamento en el centro',
    price: 300000,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Ciudad de México',
    images: ['https://example.com/image3.jpg', 'https://example.com/image4.jpg']
  },
  {
    title: 'Casa de campo',
    description: 'Acogedora casa en el campo',
    price: 200000,
    bedrooms: 3,
    bathrooms: 2,
    location: 'Valle de Bravo',
    images: ['https://example.com/image5.jpg', 'https://example.com/image6.jpg']
  }
];

const importData = async () => {
  await connectDB();
  try {
    await Property.insertMany(properties);
    console.log('Datos insertados correctamente');
    process.exit();
  } catch (error) {
    console.error('Error inserting data:', error);
    process.exit(1);
  }
};

importData();