import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true , useUnifiedTopology: true });
    console.log('connection success: ');
  } catch (error) {
    console.log('connection error', error);
    process.exit(1)
  }
}

export default connectDB;
