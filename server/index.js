import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/index.js"; // Corrected function name
import { userRoute } from "./routes/user.routes.js";
import cors from "cors";
import { productRoute } from "./routes/product.route.js";
import connectCloudinary from "./DB/cloudinary.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "*"];

app.get("/", (req, res) => {
  res.send("Welcome to server");
});
app.use(express.json());
app.use(
  cors()
  //   {
  //   origin: (origin, cb) => {
  //     if (allowedOrigins.includes(origin)) {
  //       cb(null, true);
  //     } else {
  //       cb(new Error("Not allowed by CORS"));
  //     }
  //   },
  //   credentials: true,
  //   allowedHeaders: ["Authorization", "Content-Type"]
  // }
);

// User router
app.use("/api/user/", userRoute);
app.use("/api/product/", productRoute);
connectCloudinary();
// Connect to database
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((err) => {
    console.log(err, "DB connection failed");
  });
