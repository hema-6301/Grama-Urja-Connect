// routes/analytics.js
import express from "express";
import { verifyToken } from "./auth.js";

const router = express.Router();


router.get("/user", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Example calculation (replace with real DB queries)
    const usage = 320; // in kWh
    const usageChange = -5;
    const savings = 1280;
    const ledReplaced = 12;
    const ledImpact = 45;

    res.json({ usage, usageChange, savings, ledReplaced, ledImpact });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

export default router;
