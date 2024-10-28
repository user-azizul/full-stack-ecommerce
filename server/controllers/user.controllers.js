import { UserModel } from "../models/user.models.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All field is required"
      });
    }
    const validEmail = validator.isEmail(email);
    if (!validEmail) {
      return res.json({
        success: false,
        message: "Please provide a valid email"
      });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel({
      name,
      email,
      password: hashPassword
    });
    await newUser.save();
    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({
        success: false,
        message: "All field is required"
      });
    }
    const validEmail = validator.isEmail(email);
    if (!validEmail) {
      return res.json({
        success: false,
        message: "Please provide a valid email"
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not exists, please register"
      });
    }
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ success: false, message: "Password is not correct" });
    }
    const token = await jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({ success: true, message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const remove = async (req, res) => {};
const update = async (req, res) => {};
const adminLogin = async (req, res) => {};
const getUser = async (req, res) => {};

export { signup, login, remove, update, adminLogin, getUser };
