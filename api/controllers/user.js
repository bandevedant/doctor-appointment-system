import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res) => {
  try {
    console.log("regirstajfakidsja");

    // username, email, password, isAdmin, isDoctor
    const { isAdmin, username, email, password, isDoctor } = req.body;
    console.log({ isAdmin, username, email, password, isDoctor });
    // Debug: Log input data
    console.log("Password:", password);
    console.log("Salt Rounds:", 10);

    // Check if password is available
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      console.error("Hashing error:", err);
      return res.status(500).json({
        success: false,
        message: `Error in hashing password ->${password}`,
      });
    }

    // Create entry in the database for user
    const user = await Users.create({
      isAdmin,
      username,
      email,
      password: hashedPassword,
      isDoctor,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create user, please try again later",
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not Found"));
    }

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
      return next(createError(404, "Password is not matched!"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, isDoctor: user.isDoctor },
      process.env.JWT
    );
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...others } });
  } catch (err) {
    next(err);
  }
};

export const viewUser = async (req, res, next) => {
  try {
    const user = await Users.find();
    const { password, ...others } = user;
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
