import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, Clock, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const StatusBadge = ({ status }) => {
  const map = {
    Pending: { text: "Pending", classes: "bg-amber-100 text-amber-800" },
    "In Progress": { text: "In Progress", classes: "bg-yellow-100 text-yellow-800" },
    Resolved: { text: "Resolved", classes: "bg-green-100 text-green-800" },
    Rejected: { text: "Rejected", classes: "bg-red-100 text-red-800" },
    open: { text: "Pending", classes: "bg-amber-100 text-amber-800" },
    "in-progress": { text: "In Progress", classes: "bg-yellow-100 text-yellow-800" },
    resolved: { text: "Resolved", classes: "bg-green-100 text-green-800" },
    closed: { text: "Closed", classes: "bg-gray-100 text-gray-700" },
  };

  const s = map[status] || { text: status || "Unknown", classes: "bg-gray-100 text-gray-800" };
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${s.classes}`}>
      {s.text}
    </span>
  );
};

const TrackComplaint = () => {
  const { t } = useTranslation();
  const [ticketNumber, setTicketNumber] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();

    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_BASE}/api/complaints/my`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          if (data && Array.isArray(data)) setRecent(data.slice(0, 6));
        })
        .catch(() => {});
    }
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  const handleTrack = async (e) => {
    e?.preventDefault();
    setMessage("");
    setComplaint(null);

    if (!ticketNumber || ticketNumber.trim().length < 3) {
      setMessage(t("enterValidTicket"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/complaints/track/${encodeURIComponent(ticketNumber.trim())}`);
      const data = await res.json();

      if (res.ok) {
        setComplaint(data);
        setMessage("");
      } else {
        setMessage(data.error || t("complaintNotFound"));
      }
    } catch (err) {
      console.error("Track error:", err);
      setMessage(t("serverError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-green-700">{t("trackComplaint")}</h2>
        <p className="text-gray-600 mt-2">{t("enterTicketHint")}</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-3 items-center mb-6">
        <input
          ref={inputRef}
          type="text"
          placeholder={t("ticketPlaceholder")}
          value={ticketNumber}
          onChange={(e) => setTicketNumber(e.target.value)}
          className="flex-1 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          aria-label="Ticket number"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          {loading ? t("tracking") : t("trackBtn")}
        </button>
      </form>

      {message && (
        <div className="mb-6 text-center">
          <p className="text-sm text-red-600">{message}</p>
        </div>
      )}

      <AnimatePresence>
        {complaint && (
          <motion.div
            key={complaint._id || complaint.ticketNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-lg shadow-md p-6 border"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <Ticket className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-semibold">
                    {t("ticket")}: {complaint.ticketNumber}
                  </h3>
                </div>

                <p className="mt-4 text-gray-700">
                  <strong>{t("issue")}:</strong> {complaint.title || "—"}
                </p>

                <p className="mt-2 text-gray-700">
                  <strong>{t("description")}:</strong> {complaint.description || "—"}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <StatusBadge status={complaint.status || complaint.state || "Pending"} />
                  <span className="text-gray-500 text-sm">
                    {t("submittedOn")}: {formatDate(complaint.createdAt)}
                  </span>
                </div>
              </div>

              <div className="text-right">
                {complaint.status === "Resolved" || complaint.status === "resolved" ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : complaint.status === "Rejected" || complaint.status === "rejected" ? (
                  <XCircle className="w-8 h-8 text-red-500" />
                ) : (
                  <Clock className="w-8 h-8 text-amber-500" />
                )}
              </div>
            </div>

            {complaint.updates && Array.isArray(complaint.updates) && complaint.updates.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">{t("updates")}</h4>
                <ul className="space-y-2">
                  {complaint.updates.map((u, idx) => (
                    <li key={idx} className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-500">{formatDate(u.date)}</div>
                      <div>{u.note}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate("/complaint")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <ArrowLeft className="w-4 h-4" /> {t("fileAnother")}
              </button>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 transition"
              >
                {t("scrollUp")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {recent && recent.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">{t("recentComplaints")}</h4>
          <div className="grid gap-3">
            {recent.map((c) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="p-4 border rounded bg-white flex justify-between items-start"
              >
                <div>
                  <div className="text-sm text-gray-500">{formatDate(c.createdAt)}</div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-gray-700 mt-1">{c.ticketNumber}</div>
                </div>
                <div>
                  <StatusBadge status={c.status || "Pending"} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackComplaint;
