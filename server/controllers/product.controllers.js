import { v2 as cloudinary } from "cloudinary";
import { productModel } from "../models/product.model.js";
const addProduct = async (req, res) => {
  try {
    const {
      _type,
      name,
      price,
      discountedPercents,
      category,
      brand,
      badge,
      isAvailable,
      offer,
      description,
      tags
    } = req.body;

    console.log("Request body:", req.body); // Log the request body

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];

    if (!name) {
      return res.json({ success: false, message: "Product name is required" });
    }
    if (!price) {
      return res.json({ success: false, message: "Product price is required" });
    }
    if (!category) {
      return res.json({
        success: false,
        message: "Product category is required"
      });
    }
    if (!description) {
      return res.json({
        success: false,
        message: "Product description is required"
      });
    }
    if (!image1 && !image2) {
      return res.json({
        success: false,
        message: "At least one product image is required"
      });
    }

    let images = [image1, image2].filter((item) => item !== undefined);
    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        try {
          let result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image"
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading image to Cloudinary", uploadError);
          throw uploadError;
        }
      })
    );

    let parsedTags;
    try {
      parsedTags = JSON.parse(tags);
    } catch (error) {
      parsedTags = tags ? tags.split(",").map((tag) => tag.trim()) : [];
    }

    const productData = {
      _type: _type || "",
      name,
      price: Number(price),
      discountedPercents: Number(discountedPercents),
      category,
      brand: brand || "",
      badge: badge === "true",
      description,
      isAvailable: isAvailable === "true",
      offer: offer === "true",
      tags: parsedTags,
      image: imagesUrl
    };

    console.log("product data", productData);
    res.json({ success: true, data: productData });
  } catch (error) {
    console.log("add product error", error);
    res.json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {};
const removeProduct = async (req, res) => {};
const singleProduct = async (req, res) => {};

export { addProduct, listProduct, removeProduct, singleProduct };
