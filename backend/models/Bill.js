const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  month: { type: String, default: "" },         // optional human month label
  units: { type: Number, required: false, min: 0 },
  amount: { type: Number, required: false, min: 0 },
  readingDate: { type: Date, default: Date.now },
  source: { type: String, enum: ["manual", "ocr"], default: "ocr" },
  rawText: { type: String, default: "" },
  remarks: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Bill', BillSchema);
