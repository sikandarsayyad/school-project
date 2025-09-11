"use client";
import { useState } from "react";

export default function Login() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  async function requestOtp() {
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert(`OTP sent to ${email}`); // ✅ Added alert
        setStep(2);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to send OTP");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  }

  async function verifyOtp() {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        alert("Logged in!");
        window.location.href = "/addSchool";
      } else {
        const data = await res.json();
        alert(data.error || "Invalid/Expired OTP");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={requestOtp}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full mb-4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}
