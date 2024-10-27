import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique },
    password: { type: String, required: true },
    avatar: { type: String },
    userCart: { type: Object, default: {} },
  },
  { minimize: flase }
);

export const UserMOndel = mongoose.model("User", userSchema);
