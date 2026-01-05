const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plain password field
  language: { type: String, default: 'en' },
  gender: { type: String, default: "" }, // Added gender field
  avatar: { type: String, default: "" }  // Optional avatar for profile picture
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
