import { useState } from "react";
import Logo from "../images/Logo.png";
import image1 from "../images/image1.png";
import image2 from "../images/image2.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const res = await fetch(
        "https://notes-app-mhne.onrender.com/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      console.log("SERVER RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Server error");
        return;
      }

      if (data.otp) {
        console.log("OTP:", data.otp);
        alert(`OTP: ${data.otp}`);
      } else {
        console.warn("OTP not received from backend");
        alert("OTP generated. Check backend response.");
      }

      setStep(2);
    } catch (error) {
      console.error("FRONTEND ERROR:", error);
      alert("Something went wrong");
    }
  };

  const verifyOtp = async () => {
    const finalOtp = otp.join("");

    const res = await fetch(
      "https://notes-app-mhne.onrender.com/auth/verify-otp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: finalOtp }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);

    alert("Login successful");
    navigate("/");
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };
  return (
    <div className="flex h-[calc(100vh-32px)] m-4">
      <div className="flex-1.5 relative overflow-hidden">
        <img
          src={image1}
          alt=""
          className="w-full h-full object-cover rounded-4xl"
        />

        <div className="absolute rounded-4xl inset-0 bg-gradient-to-b from-[#010860]/40 via-[#ffffff10] to-[#BF3613]/40"></div>

        <img
          src={Logo}
          alt="Product Logo"
          className="absolute top-4 left-4 h-16 w-40 object-contain"
        />

        <img
          src={image2}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[312px] object-cover rounded-[48px] shadow-2xl"
        />
      </div>

      <div className="flex-2 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#111652] w-90.75 mb-10">
          Login to your Productr Account
        </h1>
        {step == 1 && (
          <>
            <label className="flex items-start mb-2 font-medium text-sm text-[#344054]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Acme@gmail.com|"
              className="w-90.75 border p-2 mt-1 mb-6 rounded-[8px] border-2 border-[#07107466] text-[#344054] text-sm font-normal"
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={(e) => {
                e.preventDefault();
                sendOtp();
              }}
              className="w-90.75 text-sm font-semibold bg-blue-900 text-white py-2 rounded-[8px] cursor-pointer"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="flex mb-2 font-medium text-sm text-[#344054]">
              Enter OTP
            </label>

            <div className="flex gap-3 mt-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              className="w-90.75 text-sm font-semibold bg-blue-900 text-white py-2 rounded-[8px] cursor-pointer"
              onClick={verifyOtp}
            >
              Login
            </button>

            <div className="text-sm/16 font-semibold">
              <span className="text-[#98A2B3]">Didnt recive OTP ?</span>
              <span className="text-[#071074]">Resend in 20s</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
