const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // can be anonymous too
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ticketNumber: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

// Generate a unique ticket number before saving (if not provided)
ComplaintSchema.pre("save", function (next) {
  if (!this.ticketNumber) {
    this.ticketNumber =
      "TCKT-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
  next();
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
