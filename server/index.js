import express from "express";

import dotenv from "dotenv";
import conenctDB from "./DB/index.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

conenctDB
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((err) => {
    console.log(err, "DB connection failed");
  });
