import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import { FileText, Bell, ShieldCheck, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  return (
    <div className="w-full flex flex-col overflow-x-hidden scroll-smooth">
      {/* Scene 1: Cinematic Hero */}
      <section
        className="relative h-[500px] w-full bg-cover bg-center flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('/assets/village.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl font-bold mb-2">{t("welcome")}</h1>
          <p className="text-lg max-w-xl mx-auto">{t("description")}</p>

          {!loggedIn && (
            <Link
              to="/register"
              className="mt-6 inline-block px-6 py-3 bg-white text-purple-700 font-semibold rounded-full shadow hover:bg-purple-100 transition"
            >
              {t("getStarted")}
            </Link>
          )}
        </div>
      </section>

      {/* Scene 2: What is Grama Urja */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-orange-100 to-yellow-50 px-6 text-center mt-32 scroll-mt-24">
        <motion.h2
          className="text-3xl font-bold text-purple-700 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("whatIsTitle")}
        </motion.h2>
        <motion.p
          className="text-gray-700 max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t("whatIsDescription")}
        </motion.p>
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mt-6 rounded max-w-xl shadow">
          💡 <span className="text-sm text-gray-800">{t("tip")}</span>
        </div>

        {/* What We Do Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <motion.div className="bg-white p-6 rounded-xl shadow-lg" whileHover={{ scale: 1.03 }}>
            <h3 className="text-lg font-bold text-teal-700 mb-2">{t("empowerTitle")}</h3>
            <p className="text-gray-700 text-sm">{t("empowerDesc")}</p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-xl shadow-lg" whileHover={{ scale: 1.03 }}>
            <h3 className="text-lg font-bold text-orange-700 mb-2">{t("simplifyTitle")}</h3>
            <p className="text-gray-700 text-sm">{t("simplifyDesc")}</p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-xl shadow-lg" whileHover={{ scale: 1.03 }}>
            <h3 className="text-lg font-bold text-purple-700 mb-2">{t("spreadTitle")}</h3>
            <p className="text-gray-700 text-sm">{t("spreadDesc")}</p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-xl shadow-lg" whileHover={{ scale: 1.03 }}>
            <h3 className="text-lg font-bold text-lavender-700 mb-2">{t("supportTitle")}</h3>
            <p className="text-gray-700 text-sm">{t("supportDesc")}</p>
          </motion.div>
        </div>

        {/* Awareness Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-5xl">
          {[
            { src: "/assets/solar.jpg", alt: "Solar Awareness", border: "border-indigo-400" },
            { src: "/assets/community.jpg", alt: "Community Action", border: "border-indigo-400" },
            { src: "/assets/bill.jpg", alt: "Understanding Bills", border: "border-indigo-400" },
          ].map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              className={`w-full h-64 object-cover rounded-xl shadow-xl border-4 ${img.border}`}
            />
          ))}
        </div>
      </section>

      {/* Scene 4: Feature Cards */}
      <section
        id="features"
        className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-50 to-orange-100 px-6 scroll-mt-24 mt-32"
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-6">
          {t("featuresTitle")}
        </h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          <AnimatedCard title={t("upload")} description={t("uploadDesc")} icon={<Upload className="w-10 h-10" />} theme="bold" />
          <AnimatedCard title={t("alerts")} description={t("alertsDesc")} icon={<Bell className="w-10 h-10" />} theme="eco" />
          <AnimatedCard title={t("complaint")} description={t("complaintDesc")} icon={<FileText className="w-10 h-10" />} theme="calm" />
          <AnimatedCard title={t("awareness")} description={t("awarenessDesc")} icon={<ShieldCheck className="w-10 h-10" />} theme="bold" />
        </div>
      </section>
    </div>
  );
};

export default Home;
