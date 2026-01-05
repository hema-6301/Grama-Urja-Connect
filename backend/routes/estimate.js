// routes/estimate.js
const express = require("express");
const router = express.Router();

// AP Domestic Electricity Rate Slabs
const slabs = [
  { limit: 100, rate: 3.11 },
  { limit: 200, rate: 4.8 },
  { limit: 300, rate: 7.0 },
  { limit: 400, rate: 7.5 },
  { limit: Infinity, rate: 9.0 },
];

function calculateBill(units) {
  let total = 0;
  let remaining = units;
  let previousLimit = 0;

  for (const slab of slabs) {
    const slabUnits = Math.min(remaining, slab.limit - previousLimit);
    total += slabUnits * slab.rate;
    remaining -= slabUnits;
    previousLimit = slab.limit;
    if (remaining <= 0) break;
  }

  const fixedCharge = 50; // Example fixed charge
  return total + fixedCharge;
}

router.post("/", (req, res) => {
  const { units } = req.body;
  if (!units || units < 0) {
    return res.status(400).json({ error: "Invalid units" });
  }

  const estimatedAmount = calculateBill(Number(units));
  res.json({ units, estimatedAmount });
});

module.exports = router;
