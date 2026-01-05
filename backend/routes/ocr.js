// routes/ocr.js
const express = require("express");
const router = express.Router();
const Tesseract = require("tesseract.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

router.post("/extract", upload.single("billImage"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });

  const imagePath = path.resolve(req.file.path);

  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m),
    });

    console.log("🔍 OCR Extracted Text:", text);

    // Try matching multiple possible patterns
    const unitsMatch = text.match(/(?:Units|Consumption|Reading)\D*(\d{1,5})/i);
    const amountMatch = text.match(/(?:Amount|Total|Bill)\D*(\d{2,6}(?:\.\d{1,2})?)/i);

    const units = unitsMatch ? unitsMatch[1] : "N/A";
    const amount = amountMatch ? amountMatch[1] : "N/A";

    fs.unlinkSync(imagePath);
    res.json({ ok: true, units, amount, raw: text });
  } catch (err) {
    console.error("OCR Error:", err.message);
    res.status(500).json({ error: "OCR failed" });
  }
});

module.exports = router;
