import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";

const Genie = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  const genieReplies = [
    {
      question: t("genie_q1"),
      answer: t("genie_a1"),
    },
    {
      question: t("genie_q2"),
      answer: t("genie_a2"),
    },
    {
      question: t("genie_q3"),
      answer: t("genie_a3"),
    },
    {
      question: t("genie_q4"),
      answer: t("genie_a4"),
    },
    {
      question: t("genie_q5"),
      answer: t("genie_a5"),
    },
  ];

  const handleAsk = (faq) => {
    setMessages((prev) => [...prev, { type: "user", text: faq.question }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "genie", text: faq.answer }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-6 py-12 pb-32 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-full shadow-lg p-6 mb-6"
      >
        <span className="text-4xl">🧞‍♂️</span>
      </motion.div>

      <h1 className="text-3xl font-bold text-center text-teal-700 mb-2">
        {t("askGenie")}
      </h1>
      <p className="text-gray-600 text-center mb-8 max-w-xl">
        {t("genie_description")}
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xl mb-10">
        {genieReplies.map((faq, index) => (
          <button
            key={index}
            onClick={() => handleAsk(faq)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-left shadow hover:shadow-md transition"
          >
            <span className="text-teal-700 font-medium">{faq.question}</span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow-inner px-4 py-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`px-4 py-3 rounded-xl shadow ${
              msg.type === "user"
                ? "bg-teal-100 text-teal-800 self-end text-right"
                : "bg-gray-100 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-3 rounded-xl bg-gray-100 text-gray-500 shadow self-start"
          >
            {t("genie_typing")}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Genie;
