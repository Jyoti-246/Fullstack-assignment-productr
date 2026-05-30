const express = require("express");
const jwt = require("jsonwebtoken");
const sendOtp = require("../utils/sendOtp");

const router = express.Router();

const otpStore = {}; // temporary storage

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const cleanEmail = email.trim().toLowerCase();
  console.log("EMAIL:", cleanEmail);

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[cleanEmail] = otp.toString();

  console.log("KEYS:", Object.keys(otpStore));

  await sendOtp(cleanEmail, otp);

  res.json({ message: "OTP sent successfully" });
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const cleanEmail = email?.trim().toLowerCase();

  console.log("EMAIL:", cleanEmail);
  console.log("OTP STORE:", otpStore);

  if (!otpStore[cleanEmail]) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }

  const storedOtp = otpStore[cleanEmail];

  if (storedOtp.toString() !== otp.toString()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[cleanEmail];

  res.json({ message: "Login successful" });
});

module.exports = router;
