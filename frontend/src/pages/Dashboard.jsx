// frontend/src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Bell,
  ShieldCheck,
  Sparkles,
  BarChart2,
} from "lucide-react";

const Dashboard = ({ user }) => {
  const { t } = useTranslation();

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, rotate: 1 },
    tap: { scale: 0.97 },
  };

  const cards = [
    {
      title: t("uploadBills"),
      icon: <Upload className="w-8 h-8" />,
      link: "/billupload",
      theme: "bg-teal-50 text-teal-700 ring-teal-300",
    },
    {
      title: t("raiseComplaint"),
      icon: <FileText className="w-8 h-8" />,
      link: "/complaint",
      theme: "bg-rose-50 text-rose-700 ring-rose-300",
    },
    {
      title: t("alerts"),
      icon: <Bell className="w-8 h-8" />,
      link: "/alerts",
      theme: "bg-orange-50 text-orange-700 ring-orange-300",
    },
    {
      title: t("safetyAwareness"),
      icon: <ShieldCheck className="w-8 h-8" />,
      link: "/awareness",
      theme: "bg-purple-50 text-purple-700 ring-purple-300",
    },
    {
      title: t("needHelp"),
      icon: <Sparkles className="w-8 h-8" />,
      link: "/genie",
      theme: "bg-yellow-50 text-yellow-700 ring-yellow-300",
      extra: "mb-10",
    },
    {
      title: t("energyStats"),
      icon: <BarChart2 className="w-8 h-8" />,
      link: "/analytics",
      theme: "bg-sky-50 text-sky-700 ring-sky-300",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f4ebd0] to-[#bfa2db] px-6 py-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-teal-700 mb-4 text-center">
        {t("dashboardWelcome")}
        {user?.name ? `, ${user.name}` : ""} 👋
      </h2>
      <p className="text-gray-700 mb-10 text-center max-w-xl">
        {t("dashboardDescription")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className={`rounded-2xl shadow-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:ring-2 ${card.theme} ${card.extra || ""}`}
          >
            <Link
              to={card.link}
              className="flex flex-col items-center gap-2 w-full h-full text-center"
            >
              <div>{card.icon}</div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
