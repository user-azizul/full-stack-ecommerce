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

    const fields = [
      { field: name, message: "Product name is required" },
      { field: price, message: "Product price is required" },
      { field: category, message: "Product category is required" },
      { field: description, message: "Product description is required" }
    ];

    fields.map(({ field, message }) => {
      if (!field) {
        return res.json({ success: false, message });
      }
    });

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];

    if (!image1 && !image2) {
      return res.json({
        success: false,
        message: "At least one product image is required"
      });
    }

    const images = [image1, image2].filter(Boolean);
    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        try {
          const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image"
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading image to Cloudinary:", uploadError);
          throw new Error("Image upload failed");
        }
      })
    );

    let parsedTags;
    try {
      // Attempt to parse tags as JSON
      parsedTags = JSON.parse(tags);
    } catch (error) {
      // Fallback: Split the string by commas if it's not valid JSON
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

    const savedProduct = await productModel.create(productData);
    return res.json({
      success: true,
      data: savedProduct,
      message: `${name} is added successfully`
    }); // Ensure this is the final response
  } catch (error) {
    console.error("addProduct error:", error);
    return res.status(500).json({ success: false, message: error.message }); // Ensure proper termination
  }
};

const listProduct = async (req, res) => {
  try {
    // Fetch all products
    const products = await productModel.find();

    // Count the total number of products
    const totalProducts = await productModel.countDocuments();
    if (products.length) {
      res.json({
        success: true,
        totalProducts,
        products
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
  } catch (error) {
    console.error("listProduct error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    await productModel.findByIdAndDelete(_id);

    return res
      .status(200)
      .json({ success: true, message: "product removed successfuly" });
  } catch (error) {
    console.error("remove product error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const singleProduct = async (req, res) => {
  try {
    const { _id } = req.body; // Get product ID from URL params

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const product = await productModel.findById(_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching single product:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
