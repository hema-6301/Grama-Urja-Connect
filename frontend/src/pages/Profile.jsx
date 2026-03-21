import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [editData, setEditData] = useState({ name: "", phone: "", language: "en", gender: "" });
  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem("token");

  // Capitalize first letter helper
  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  useEffect(() => {
    if (!token) {
      setMsg("⚠️ " + t("loginRequired"));
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("https://grama-urja-connect.onrender.com/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!data.error) {
          setUser(data);
          setEditData((prev) => ({
            ...prev,
            name: prev.name || capitalize(data.name),
            phone: prev.phone || data.phone || "",
            language: prev.language || data.language || "en",
            gender: prev.gender || capitalize(data.gender),
          }));
        } else {
          setMsg("❌ " + data.error);
        }
      } catch {
        setMsg("❌ " + t("serverError"));
      }
    };
    fetchUser();
  }, [token, t]);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("https://grama-urja-connect.onrender.com/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...editData,
          name: capitalize(editData.name),
          gender: capitalize(editData.gender),
        }),
      });
      const data = await res.json();
      setMsg(data.ok ? "✅ Profile updated successfully" : "❌ " + data.error);
      if (data.ok) {
        setUser({ ...user, ...editData });
      }
    } catch {
      setMsg("❌ " + t("serverError"));
    }
  };

  const handlePasswordChange = async () => {
    try {
      const res = await fetch("https://grama-urja-connect.onrender.com/api/user/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(passwords),
      });
      const data = await res.json();
      setMsg(data.ok ? "✅ Password changed" : "❌ " + data.error);
    } catch {
      setMsg("❌ " + t("serverError"));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center items-start py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">{t("userProfile")}</h2>

        {msg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-center"
          >
            {msg}
          </motion.div>
        )}

        {user && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                  {getInitials(user.name)}
                </div>
              )}
              <p className="font-semibold text-lg text-gray-700">{capitalize(user.name)}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            {/* Edit Profile Form */}
            <div className="md:col-span-2 space-y-4">
              <label className="block">
                <span className="text-gray-600 font-medium">{t("name")}</span>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 transition"
                />
              </label>
              <label className="block">
                <span className="text-gray-600 font-medium">{t("phone")}</span>
                <input
                  type="text"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 transition"
                />
              </label>
              <label className="block">
                <span className="text-gray-600 font-medium">{t("language")}</span>
                <select
                  value={editData.language}
                  onChange={(e) => setEditData({ ...editData, language: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 transition"
                >
                  <option value="en">English</option>
                  <option value="te">తెలుగు</option>
                  <option value="hi">हिंदी</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-600 font-medium">{t("gender")}</span>
                <select
                  value={editData.gender}
                  onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 transition"
                >
                  <option value="">—</option>
                  <option value="Male">{t("male")}</option>
                  <option value="Female">{t("female")}</option>
                  <option value="Other">{t("other")}</option>
                </select>
              </label>
              <button
                onClick={handleUpdate}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {t("Update Profile")}
              </button>

              {/* Password Section */}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {t("changePassword")}
              </button>
              {showPassword && (
                <div className="space-y-4 mt-4">
                  <input
                    type="password"
                    placeholder={t("currentPassword")}
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-purple-500 focus:border-purple-500 transition"
                  />
                  <input
                    type="password"
                    placeholder={t("newPassword")}
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-purple-500 focus:border-purple-500 transition"
                  />
                  <button
                    onClick={handlePasswordChange}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
                  >
                    {t("updatePassword")}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
