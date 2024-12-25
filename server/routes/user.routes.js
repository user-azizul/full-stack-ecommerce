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

export const userRouter = express.Router();

// admin route
userRouter.post("/admin", adminLogin);
userRouter.get("/get-user", adminAuth, getUser);
userRouter.post("/remove", adminAuth, remove);

// user routes
userRouter.post("/register", signup);
userRouter.post("/login", login);
userRouter.put("/update", update);
