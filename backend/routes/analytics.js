// routes/analytics.js
const express = require("express");
const { verifyToken } = require("./auth"); // ✅ works with CommonJS
const router = express.Router();

router.get("/user", verifyToken, async (req, res) => {
  try {
    const userId = req.user?.id || "unknown";

    // Example mock analytics data (replace later with DB)
    const usage = 320; // kWh
    const usageChange = -5; // %
    const savings = 1280; // ₹
    const ledReplaced = 12;
    const ledImpact = 45; // %

    res.json({ userId, usage, usageChange, savings, ledReplaced, ledImpact });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;
