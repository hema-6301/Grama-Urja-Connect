// routes/complaints.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Complaint = require("../models/Complaint");
const User = require("../models/User");

// -------------------- JWT Auth Middleware --------------------
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ error: "User not found" });
    next();
  } catch (e) {
    console.error("Auth error:", e.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// -------------------- Raise Complaint --------------------
router.post("/raise", auth, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  // Generate unique ticket number (e.g., GUC387509)
  const ticketNumber = "GUC" + Date.now().toString().slice(-6);

  try {
    const complaint = await Complaint.create({
      user: req.user._id,
      title,
      description,
      ticketNumber,
      status: "Pending",
      updates: [],
    });

    res.json({
      ok: true,
      ticketNumber,
      complaint,
      msg: "✅ Complaint registered successfully",
    });
  } catch (e) {
    console.error("Complaint raise error:", e.message);
    res.status(500).json({ error: "Failed to raise complaint" });
  }
});

// -------------------- Get Logged-in User Complaints --------------------
router.get("/my", auth, async (req, res) => {
  try {
    const list = await Complaint.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(list);
  } catch (e) {
    console.error("Fetch complaints error:", e.message);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// -------------------- Track Complaint by Ticket Number --------------------
router.get("/track/:ticketNumber", async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      ticketNumber: req.params.ticketNumber,
    }).lean();

    if (!complaint) {
      return res
        .status(404)
        .json({ error: "Complaint not found. Please check your ticket number." });
    }

    res.json({
      _id: complaint._id,
      ticketNumber: complaint.ticketNumber,
      title: complaint.title || complaint.issueType || "—",
      description: complaint.description || "—",
      status: complaint.status || "Pending",
      createdAt: complaint.createdAt,
      updatedAt: complaint.updatedAt,
      updates: complaint.updates || [],
    });
  } catch (err) {
    console.error("Track complaint error:", err.message);
    res
      .status(500)
      .json({ error: "Server error while tracking complaint." });
  }
});

module.exports = router;
