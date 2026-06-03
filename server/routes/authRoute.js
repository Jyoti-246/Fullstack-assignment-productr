const express = require("express");
const jwt = require("jsonwebtoken");
const sendOtp = require("../utils/sendOtp");

const router = express.Router();

const otpStore = new Map();

router.post("/send-otp", async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("OTP:", otp);

    otpStore.set(email, otp);

    await sendOtp(email, otp);

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/verify-otp", (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const otp = req.body.otp;

  const storedOtp = otpStore.get(email);

  if (!storedOtp) {
    return res.status(400).json({ message: "OTP expired" });
  }

  if (storedOtp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  otpStore.delete(email);

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.json({
    message: "Login success",
    token,
  });
});

module.exports = router;
