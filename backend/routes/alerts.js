// backend/routes/alerts.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Bill = require("../models/Bill");
const User = require("../models/User");

// Setup transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ 1️⃣ Manual alert endpoint (send custom mail)
router.post("/send", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Recipient and message are required" });
  }

  try {
    await transporter.sendMail({
      from: `"Grama Urja Connect" <${process.env.EMAIL_USER}>`,
      to,
      subject: subject || "🔔 Alert from Grama Urja Connect",
      text: message,
    });

    res.json({ ok: true, msg: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// ✅ 2️⃣ Automatic daily reminder job (runs at 8 AM)
cron.schedule("0 8 * * *", async () => {
  console.log("🔔 Running daily bill reminder check...");

  try {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Find all bills due today or tomorrow
    const dueBills = await Bill.find({
      dueDate: { $gte: today, $lte: tomorrow },
    }).populate("userId", "email");

    if (dueBills.length === 0) {
      console.log("✅ No bills due today or tomorrow.");
      return;
    }

    for (const bill of dueBills) {
      const userEmail = bill.userId?.email;
      if (!userEmail) continue;

      const message = `⚡ Hello! Your electricity bill of ₹${bill.amount} is due on ${bill.dueDate.toDateString()}. Please pay before the due date.`;

      await transporter.sendMail({
        from: `"Grama Urja Connect" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: "⚡ Bill Payment Reminder",
        text: message,
      });

      console.log(`📩 Reminder sent to ${userEmail}`);
    }
  } catch (err) {
    console.error("❌ Error in reminder cron job:", err);
  }
});

module.exports = router;
