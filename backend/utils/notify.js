// backend/notify.js
import nodemailer from "nodemailer";

// Create transporter with your Gmail (turn on "Less secure app" or use App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_EMAIL@gmail.com",   // replace
    pass: "YOUR_APP_PASSWORD",      // not Gmail password (create app password)
  },
});

// Send Email Notification
export const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Grama Urja Connect" <YOUR_EMAIL@gmail.com>',
      to,
      subject,
      text,
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
};
