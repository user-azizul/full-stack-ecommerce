import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/index.js"; // Corrected function name
import { userRouter } from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to server");
});
app.use(express.json());
app.use(cors());

// User router
app.use("/api/user/", userRouter);

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
