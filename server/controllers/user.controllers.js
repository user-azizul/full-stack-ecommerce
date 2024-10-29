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
        message: "All field is required",
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
    const newUser = await UserModel({
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
        message: "All field is required",
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
        message: "User not exists, please register",
      });
    }
    const validPassword = bcrypt.compare(password, user.password);
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
  try {
    await UserModel.findByIdAndDelete(req.body._id);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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
      return res.json({ success: false, message: "user does not exist" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "saarman1688@gmail.com",
        pass: "xiqg hqme cwkh fvtx",
      },
    });

    var mailOptions = {
      from: "saarman1688@gmail.com",
      to: email,
      subject: "Reset your password",
      text: `http://localhost:5173/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({
          status: false,
          message: "get error when sending mail",
        });
      } else {
        return res.json({
          status: true,
          message: "sent reset link to your email address",
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
    const hashPassword = bcrypt.hash(password, 10);
    await UserModel.findByIdAndUpdate({ _id }, { password: hashPassword });
    return res.json({ success: true, message: "updated the password" });
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
        message: "All field is required",
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
        message: "User not exists, please register",
      });
    }
    const validPassword = bcrypt.compare(password, user.password);
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
