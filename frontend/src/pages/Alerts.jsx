// frontend/src/pages/Alerts.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Alerts = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); // Reset previous message
    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/api/alerts/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: email,
            subject: t("alerts1.subject"),
            message: t("alerts1.message"),
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMsg(t("alerts1.success")); // Success message
      } else {
        setMsg(data.error || t("alerts.fail")); // Backend error
      }
    } catch (err) {
      console.error("Alert API error:", err);
      setMsg(t("alerts1.serverError") || "Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-xl w-full bg-white shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          📩 {t("alerts1.title")}
        </h2>

        {msg && (
          <p
            className={`mb-3 text-center font-medium ${
              msg.includes("✅") || msg.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={t("alerts1.placeholder")}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-105"
          >
            {t("alerts1.button")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Alerts;
