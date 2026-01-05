const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Auth middleware
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

// GET logged-in user
router.get("/me", auth, (req, res) => {
  const { name, email, phone, language, gender, avatar } = req.user;
  res.json({ name, email, phone, language, gender, avatar });
});

// Update profile
router.put("/update", auth, async (req, res) => {
  const { name, phone, language, gender } = req.body;

  try {
    if (name !== undefined) req.user.name = name;
    if (phone !== undefined) req.user.phone = phone;
    if (language !== undefined) req.user.language = language;
    if (gender !== undefined) req.user.gender = gender;

    await req.user.save();
    res.json({ ok: true, msg: "Profile updated successfully" });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Change password
router.put("/change-password", auth, async (req, res) => {
  const { current, new: newPassword } = req.body;
  if (!current || !newPassword) return res.status(400).json({ error: "Both passwords required" });

  try {
    const isMatch = await bcrypt.compare(current, req.user.password);
    if (!isMatch) return res.status(401).json({ error: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    req.user.password = await bcrypt.hash(newPassword, salt);
    await req.user.save();

    res.json({ ok: true, msg: "Password changed successfully" });
  } catch (err) {
    console.error("Password change error:", err.message);
    res.status(500).json({ error: "Failed to change password" });
  }
});

module.exports = router;
