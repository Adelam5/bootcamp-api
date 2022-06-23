import config from "./config";
import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(config.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

export default connectDB;
