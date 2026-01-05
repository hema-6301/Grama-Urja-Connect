import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang); // store under 'lang'
  };

  React.useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
  }, [i18n]);

  const current = (i18n.language || "en").startsWith("te")
    ? "te"
    : (i18n.language || "en").startsWith("hi")
    ? "hi"
    : "en";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition ${
          current === "en" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage("te")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition ${
          current === "te" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        తెలుగు
      </button>

      <button
        onClick={() => changeLanguage("hi")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition ${
          current === "hi" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        हिंदी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
