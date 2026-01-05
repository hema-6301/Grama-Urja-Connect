require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Import routes
const ocrRoutes = require('./routes/ocr');
const authRoutes = require('./routes/auth');
const billRoutes = require('./routes/bills');
const complaintRoutes = require('./routes/complaints');
const alertRoutes = require('./routes/alerts');
const estimateRoutes = require('./routes/estimate');
const analyticsRoutes = require('./routes/analytics'); // ✅ Added this line
const userRoutes = require('./routes/user'); // ✅ more clear import

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/estimate", estimateRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/alerts', alertRoutes); // ✅ you already had this, keeping it
app.use("/api/user", userRoutes);
app.use("/api/analytics", analyticsRoutes); // ✅ Correct route added


// Port
const PORT = process.env.PORT || 5000;

// MongoDB Connection + Server Start
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
