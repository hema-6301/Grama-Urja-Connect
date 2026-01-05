import React from "react";
import { motion } from "framer-motion";

const themeStyles = {
  eco: {
    bg: "bg-teal-50",
    ring: "focus:ring-teal-500",
    text: "text-teal-700",
    shadow: "shadow-teal-200"
  },
  bold: {
    bg: "bg-orange-50",
    ring: "focus:ring-orange-500",
    text: "text-orange-700",
    shadow: "shadow-orange-200"
  },
  calm: {
    bg: "bg-purple-50",
    ring: "focus:ring-purple-500",
    text: "text-purple-700",
    shadow: "shadow-purple-200"
  }
};

const AnimatedCard = ({ title, description, icon, theme = "eco" }) => {
  const styles = themeStyles[theme] || themeStyles.eco;

  return (
    <motion.div
      className={`flex flex-col items-center text-center p-6 rounded-2xl ${styles.bg} ${styles.shadow} hover:shadow-2xl transition-transform hover:-translate-y-2 focus:outline-none ${styles.ring}`}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      tabIndex={0}
    >
      <div className={`${styles.text} mb-4`}>{icon}</div>
      <h3 className={`text-xl font-semibold mb-2 ${styles.text}`}>{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default AnimatedCard;