const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtp = async (email, otp) => {
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "OTP Verification",
    html: `<h2>Your OTP is ${otp}</h2>`,
  });
};

module.exports = sendOtp;
