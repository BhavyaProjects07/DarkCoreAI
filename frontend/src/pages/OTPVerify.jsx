import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OTPVerify() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get email passed from Signup.jsx (after successful signup)
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/auth/verify-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: otp }),  // ✅ send both email & OTP
      credentials: "include",
    });

    if (response.ok) {
      alert("Account verified successfully!");
      navigate("/");
    } else {
      const errorData = await response.json();
      alert(errorData.detail || "Invalid OTP. Try again.");
    }
  };

  const handleResend = async () => {
    const response = await fetch("http://127.0.0.1:8000/auth/resend-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),  // ✅ also send email here
      credentials: "include",
    });
    if (response.ok) {
      alert("OTP resent!");
    } else {
      alert("Could not resend OTP.");
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
        Verify OTP
      </button>
      <button
        type="button"
        onClick={handleResend}
        className="bg-gray-500 text-white p-2 rounded w-full"
      >
        Resend OTP
      </button>
    </form>
  );
}
