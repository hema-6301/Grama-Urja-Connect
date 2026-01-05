// routes/bills.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Bill = require("../models/Bill");
const User = require("../models/User");

// Auth Middleware
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Add Bill
router.post("/add", auth, async (req, res) => {
  const { units, amount, source, rawText } = req.body;
  try {
    const bill = await Bill.create({
      user: req.user._id,
      units,
      amount,
      source: source || "ocr",
      rawText,
    });
    res.json({ ok: true, bill });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get user bills
router.get("/my", auth, async (req, res) => {
  const bills = await Bill.find({ user: req.user._id }).sort({ readingDate: -1 }).limit(12);
  res.json(bills);
});

module.exports = router;
