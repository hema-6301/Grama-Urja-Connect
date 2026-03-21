// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Register = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" }); // type: "success" | "error"
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage({ text: t("allFieldsRequired") || "All fields are required.", type: "error" });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {}

      if (res.ok) {
        setMessage({ text: t("registerSuccess") || "Account created successfully!", type: "success" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        console.error("Backend error response:", data);
        setMessage({ text: data.message || t("registerFailed") || "Registration failed.", type: "error" });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage({ text: t("serverError") + " (check console)" || "Server error.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4ebd0] to-[#e6f7f7] px-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-teal-700 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t("createAccount")}
        </motion.h2>

        {message.text && (
          <motion.p
            className={`text-center text-sm mb-3 ${
              message.type === "success" ? "text-green-700" : "text-red-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {message.text}
          </motion.p>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <input
            type="text"
            placeholder={t("name") || "Name"}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder={t("email") || "Email"}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t("password") || "Password"}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition"
          >
            {t("register") || "Register"}
          </button>
        </motion.form>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-gray-600">
            {t("Already have an account?") || "Already have an account?"}{" "}
            <Link
              to="/login"
              className="text-teal-600 font-semibold hover:underline hover:text-teal-800 transition"
            >
              {t("login") || "Login"}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
