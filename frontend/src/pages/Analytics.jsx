// frontend/src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Coins, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const res = await fetch(`${API_BASE}/api/analytics/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || t("analytics.errorLoad"));
        }

        setStats(data);
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setError(err.message || t("analytics.errorLoad"));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API_BASE, t]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sky-600 text-xl font-semibold">
        {t("analytics.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-red-600 px-4">
        <p className="text-lg font-semibold mb-2">⚠️ {t("analytics.errorTitle")}</p>
        <p className="text-sm text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-white to-sky-50 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-sky-700 mb-6 tracking-wide"
      >
        {t("analytics.title")}
      </motion.h1>

      <p className="text-gray-700 mb-10 max-w-xl mx-auto">{t("analytics.description")}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Monthly Usage */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white shadow-lg rounded-xl p-6 border border-sky-100">
          <div className="flex justify-center mb-3">
            <Zap className="w-8 h-8 text-sky-600" />
          </div>
          <h2 className="text-xl font-semibold text-sky-600 mb-2">{t("analytics.monthlyUsage")}</h2>
          <p className="text-2xl font-bold text-gray-800">{stats?.usage ?? 0} kWh</p>
          <p className="text-sm text-gray-500 mt-2">
            {t("analytics.comparedToLast")}: {stats?.usageChange ?? 0}%
          </p>
        </motion.div>

        {/* Savings */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white shadow-lg rounded-xl p-6 border border-sky-100">
          <div className="flex justify-center mb-3">
            <Coins className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-green-600 mb-2">{t("analytics.savings")}</h2>
          <p className="text-2xl font-bold text-gray-800">₹{stats?.savings ?? 0}</p>
          <p className="text-sm text-gray-500 mt-2">{t("analytics.savingsNote")}</p>
        </motion.div>

        {/* LED Impact */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white shadow-lg rounded-xl p-6 border border-sky-100">
          <div className="flex justify-center mb-3">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">{t("analytics.ledImpact")}</h2>
          <p className="text-lg text-gray-800">
            {stats?.ledReplaced ?? 0} {t("analytics.bulbsReplaced")}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t("analytics.energySaved")}: {stats?.ledImpact ?? 0}% — {t("analytics.greenerFuture")}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
