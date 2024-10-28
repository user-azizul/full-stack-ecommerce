import express from "express";
import { login, signup } from "../controllers/user.controllers.js";

export const userRouter = express.Router();

userRouter.post("/register", signup);
userRouter.post("/login", login);
