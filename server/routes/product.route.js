import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct
} from "../controllers/product.controllers.js";
import upload from "../middleware/multer.js";

export const productRoute = express.Router();

productRoute.get("/single", singleProduct);
productRoute.get("/list", listProduct);
productRoute.post("/remove", removeProduct);
productRoute.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 }
  ]),
  addProduct
);
