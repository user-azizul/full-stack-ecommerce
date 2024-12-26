import express from "express";
import {
  adminLogin,
  getUser,
  login,
  remove,
  signup,
  update
} from "../controllers/user.controllers.js";
import { adminAuth } from "./../middleware/adminAuth.js";

export const userRoute = express.Router();

// admin route
userRoute.post("/admin", adminLogin);
userRoute.get("/get-user", adminAuth, getUser);
userRoute.post("/remove", adminAuth, remove);

// user routes
userRoute.post("/register", signup);
userRoute.post("/login", login);
userRoute.put("/update", update);
