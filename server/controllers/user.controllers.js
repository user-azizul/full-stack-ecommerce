import { UserModel } from "../models/user.models.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Added missing import

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    if (name.length < 3) {
      return res.json({
        success: false,
        message: "Name must be at least 3 characters long",
      });
    }

    const validEmail = validator.isEmail(email);
    if (!validEmail) {
      return res.json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new UserModel({
      name,
      email,
      password: hashPassword,
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
        message: "All fields are required",
      });
    }

    const validEmail = validator.isEmail(email);
    if (!validEmail) {
      return res.json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist, please register",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password); // Await bcrypt compare
    if (!validPassword) {
      return res.json({ success: false, message: "Password is not correct" });
    }

    const token = await jwt.sign(
      {
        userID: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ success: true, message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  const { _id } = req.body;

  try {
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await UserModel.findOne({ _id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin users cannot be removed",
      });
    }

    await UserModel.findOneAndDelete({ _id });
    return res.json({
      success: true,
      message: "User removed successfully",
    });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove user",
    });
  }
};

const update = async (req, res) => {
  const { id, name, email, password, currentPassword } = req.body;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;

    if (email) {
      if (!validator.isEmail(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email address" });
      } else {
        user.email = email;
      }
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (isPasswordCorrect) {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    await user.save();
    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS, // Use environment variable
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      text: `http://localhost:5173/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({
          status: false,
          message: "Error when sending mail",
        });
      } else {
        return res.json({
          status: true,
          message: "Reset link sent to your email address",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const _id = decode.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await UserModel.findByIdAndUpdate({ _id }, { password: hashPassword });
    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const validEmail = validator.isEmail(email);
    if (!validEmail) {
      return res.json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist, please register",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password); // Await bcrypt compare
    if (!validPassword) {
      return res.json({ success: false, message: "Password is not correct" });
    }

    const token = await jwt.sign(
      {
        userID: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );

    res.json({ success: true, message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const users = await UserModel.find({});
    const userData = users.map((user) => ({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
    }));
    return res.json({ success: true, totalUsers, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  signup,
  login,
  remove,
  update,
  forgetPassword,
  resetPassword,
  adminLogin,
  getUser,
};
