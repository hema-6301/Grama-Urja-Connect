// routes/bills.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Bill = require("../models/Bill"); // create this model
const bcrypt = require("bcryptjs");
// Middleware: check JWT token
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    if (!req.user) return res.status(401).json({ error: "Invalid user" });
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "Registration successful." });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.post("/forgot-password", async (req, res) => {
  // logic here
});

// Upload bill
router.post("/upload", auth, async (req, res) => {
  const { month, amount, remarks } = req.body;

  if (!month || !amount) {
    return res.status(400).json({ error: "Month and amount are required" });
  }

  try {
    const bill = await Bill.create({
      user: req.user._id,
      month,
      amount,
      remarks,
    });
    res.json({ ok: true, bill });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ error: "Invalid user" });
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ✅ CommonJS export


// Get all bills of logged in user
router.get("/my", auth, async (req, res) => {
  try {
    const bills = await Bill.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Export both the router and verifyToken properly
module.exports = router;
module.exports.verifyToken = verifyToken;

