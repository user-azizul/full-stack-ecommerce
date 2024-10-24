import mongoose from "mongoose";

const conenctDB = async () => {
  try {
    const res = await mongoose.connect();
    console.log("Database connected");
  } catch (error) {
    console.log(error, "DB connection error");
    process.exit(1);
  }
};
export default conenctDB;
