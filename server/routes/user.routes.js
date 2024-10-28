import express from "express";
import {
  adminLogin,
  getUser,
  login,
  remove,
  signup,
  update
} from "../controllers/user.controllers.js";

export const userRouter = express.Router();

// admin route
userRouter.post("/admin", adminLogin);
userRouter.get("/get-user", getUser);
userRouter.post("/remove", remove);

// user routes
userRouter.post("/register", signup);
userRouter.post("/login", login);
userRouter.put("/update", update);
