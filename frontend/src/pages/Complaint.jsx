import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Complaint = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // 🔒 Block submission if token is missing or invalid
    if (!token || token === "null" || token === "undefined" || token.trim() === "") {
      setMsg("⚠️ " + t("loginRequired"));
      // Optional: redirect to login page
      // navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/complaints/raise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg(`✅ ${t("complaintSuccess")} ${data.ticketNumber}`);
        setTitle("");
        setDescription("");
      } else {
        setMsg(data.error || `❌ ${t("complaintFail")}`);
      }
    } catch {
      setMsg(`❌ ${t("serverError")}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fdfbfb] to-[#bfa2db] px-6 py-12 pb-32 flex items-center justify-center relative">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          {t("raiseComplaint")}
        </h2>

        {msg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-teal-50 border border-teal-300 text-teal-800 rounded-xl p-4 mb-6 text-center shadow"
          >
            {msg}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder={t("complaintTitle")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <textarea
            placeholder={t("complaintDescription")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            rows="5"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition font-semibold"
          >
            {t("submit")}
          </button>
        </form>
      </div>

      {/* Floating Track Button */}
      <Link
         to="/track-complaint"
        className="fixed bottom-6 right-6 bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-teal-700 transition"
      >
        {t("trackComplaint")}
      </Link>
    </div>
  );
};



export default Complaint;