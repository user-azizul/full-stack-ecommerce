import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _type: { type: String },
  name: { type: String, required: true },
  image: { type: Array, required: true },
  price: { type: Number, required: true },
  discountedPercents: { type: Number },
  category: { type: String, required: true },
  brand: { type: String },
  badge: { type: Boolean },
  isAvailable: { type: Boolean },
  offer: { type: Boolean },
  description: { type: String, required: true },
  tags: { type: Array }
});

export const productModel = mongoose.model("Product", productSchema);
