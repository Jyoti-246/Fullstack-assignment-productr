const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS.replace(/\s/g, ""),
    },
  });

  console.log("EMAIL RECEIVED:", email);

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Test",
    text: `Your OTP is ${otp}`,
  });
};

module.exports = sendOtp;
