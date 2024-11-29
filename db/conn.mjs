import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true }, { useUnifiedTopology: true });
    console.log('connection success: ');
  } catch (error) {
    console.log('connection error', error);
    process.exit(1)
  }
}

export default connectDB;

// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// dotenv.config();


// const client = new MongoClient(process.env.ATLAS_URI);

// let conn;
// try {
//   conn = await client.connect();
// } catch (e) {
//   console.error(e);
// }

// let db = conn.db("sample_training");

// export default db;
