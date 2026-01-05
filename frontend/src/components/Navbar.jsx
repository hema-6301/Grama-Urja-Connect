import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Lightbulb,
  Bell,
  ShieldCheck,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  User,
  Globe,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-pink-500 via-purple-300 to-pink-300 to-blue-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
          />
         {t("navbar.gramaurjaconnect")}
        </Link>

        {/* Icon Navigation */}
        <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
          <Link
            to="/"
            title={t("navbar.home")}
            className={`p-1 rounded ${isActive("/") ? "bg-white text-purple-700" : "hover:bg-purple-400"}`}
          >
            <Home className="w-6 h-6" />
          </Link>
          <Link
            to="/awareness"
            title={t("navbar.awareness")}
            className={`p-1 rounded ${isActive("/awareness") ? "bg-white text-purple-700" : "hover:bg-purple-400"}`}
          >
            <Lightbulb className="w-6 h-6" />
          </Link>
          <Link
            to="/alerts"
            title={t("navbar.alerts")}
            className={`p-1 rounded ${isActive("/alerts") ? "bg-white text-purple-700" : "hover:bg-purple-400"}`}
          >
            <Bell className="w-6 h-6" />
          </Link>
          <Link
            to="/complaint"
            title={t("navbar.complaint")}
            className={`p-1 rounded ${isActive("/complaint") ? "bg-white text-purple-700" : "hover:bg-purple-400"}`}
          >
            <ShieldCheck className="w-6 h-6" />
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                title={t("navbar.dashboard")}
                className={`p-1 rounded ${isActive("/dashboard") ? "bg-white text-purple-700" : "hover:bg-purple-400"}`}
              >
                <LayoutDashboard className="w-6 h-6" />
              </Link>
              <Link
                to="/profile"
                title={t("navbar.profile")}
                className={`p-1 rounded ${isActive("/profile") ? "bg-white text-purple-700" : "hover:bg-purple-400"}`}
              >
                <User className="w-6 h-6" />
              </Link>
              <button
                onClick={handleLogout}
                title={t("navbar.logout")}
                className="hover:bg-purple-400 p-1 rounded"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                title={t("navbar.login")}
                className={`p-1 rounded ${isActive("/login") ? "bg-white text-purple-700" : "hover:bg-purple-400"}`}
              >
                <LogIn className="w-6 h-6" />
              </Link>
              <Link
                to="/register"
                title={t("navbar.register")}
                className={`p-1 rounded ${isActive("/register") ? "bg-white text-purple-700" : "hover:bg-purple-400"}`}
              >
                <UserPlus className="w-6 h-6" />
              </Link>
            </>
          )}

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu((prev) => !prev)}
              className="flex items-center gap-2 bg-purple-400 px-3 py-2 rounded-full text-white text-sm font-medium hover:bg-purple-500 transition"
            >
              <Globe className="w-5 h-5" />
              <span>{i18n.language === "en" ? "English" : i18n.language === "te" ? "తెలుగు" : "हिंदी"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10">
                {[
                  { code: "en", label: "English" },
                  { code: "te", label: "తెలుగు" },
                  { code: "hi", label: "हिंदी" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      localStorage.setItem("lang", lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg ${
                      i18n.language === lang.code
                        ? "bg-purple-100 text-purple-700 font-semibold"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
