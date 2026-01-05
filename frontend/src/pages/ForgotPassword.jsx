import React, { useState } from "react";
import { useTranslation } from "react-i18next";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setMsg("⚠️ Please enter your email");

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setMsg("✅ Reset link sent to your email");
      } else {
        setMsg(data.error || "❌ Failed to send reset link");
      }
    } catch {
      setMsg("⚠️ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4ebd0] to-[#e6f7f7] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {msg && <p className="mt-4 text-center font-semibold text-gray-700">{msg}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;