// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
    
  try {
    await mongoose.connect("mongodb+srv://Admin:zJe4Oj5QQVMN3MaF@cluster0.owgfxwe.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application on connection error
  }
};

export default connectDB;
