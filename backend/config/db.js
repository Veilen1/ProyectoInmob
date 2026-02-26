import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI no está definido en las variables de entorno.');
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    console.error('Verifica usuario, contraseña y permisos en MongoDB Atlas.');
    process.exit(1);
  }
};

export default connectDB;