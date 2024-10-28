import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_CONNECT);
    console.log("Database connected");
  } catch (error) {
    console.log(error, "DB connection error");
    process.exit(1);
  }
};
export default connectDB;
