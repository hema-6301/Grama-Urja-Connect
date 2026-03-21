// frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setMsg("⚠️ " + t("enterEmail"));

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("✅ " + t("resetLinkSent"));
      } else {
        setMsg(data.error || "❌ " + t("resetLinkFail"));
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setMsg("⚠️ " + t("serverError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4ebd0] to-[#e6f7f7] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
          {t("forgotPasswordTitle")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={t("enterRegisteredEmail")}
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
            {loading ? t("sending") : t("sendResetLink")}
          </button>
        </form>
        {msg && (
          <p
            className={`mt-4 text-center font-semibold ${
              msg.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
