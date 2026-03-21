import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Login = ({ setUser }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/dashboard");
      } else {
        setError(data.message || t("loginFailed"));
      }
    } catch (err) {
      setError(t("serverError"));
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
          {t("login")}
        </motion.h2>

        {error && (
          <motion.p
            className="text-red-600 text-sm mb-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {error}
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
            type="email"
            placeholder={t("email")}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t("password")}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot Password Link */}
          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-teal-600 hover:underline hover:text-teal-800 transition"
            >
              {t("forgotPassword") || "Forgot Password?"}
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition"
          >
            {t("login")}
          </button>
        </motion.form>

        {/* Don't have an account section */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-gray-600">
            {t("Don’t have an account?") || "Don’t have an account?"}{" "}
            <Link
              to="/register"
              className="text-teal-600 font-semibold hover:underline hover:text-teal-800 transition"
            >
              {t("createAccount") || "Create one"}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
