import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const BillUpload = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [units, setUnits] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const textRef = useRef(null);

  const handleOCR = async (e) => {
    e.preventDefault();
    if (!file) return setMsg(t("selectFileFirst"));

    const formData = new FormData();
    formData.append("billImage", file);

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/ocr/extract", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setText(data.raw || t("ocrDone"));
        setUnits(data.units || "");
        setAmount(data.amount || "");
        setMsg(t("ocrSuccess"));
        setTimeout(() => {
          textRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        setMsg(data.error || t("ocrFailed"));
      }
    } catch {
      setMsg(t("ocrServerError"));
    } finally {
      setLoading(false);
    }
  };

  const handleEstimate = async () => {
    if (!units) return setMsg(t("enterUnitsFirst"));

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ units }),
      });
      const data = await res.json();
      if (res.ok) {
        setAmount(data.estimatedAmount.toFixed(2));
        setMsg(t("estimatedBill", { amount: data.estimatedAmount.toFixed(2) }));
      } else {
        setMsg(data.error || t("estimateFailed"));
      }
    } catch {
      setMsg(t("estimateServerError"));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBill = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return setMsg(t("loginFirst"));

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/bills/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          units,
          amount,
          source: file ? "ocr" : "manual",
          rawText: text || remarks,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setMsg(t("billUploaded"));
        setUnits("");
        setAmount("");
        setRemarks("");
        setFile(null);
        setText("");
      } else {
        setMsg(data.error || t("uploadFailed"));
      }
    } catch {
      setMsg(t("saveServerError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-8 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">
          {t("uploadTitle")}
        </h2>

        {/* OCR Upload Section */}
        <form onSubmit={handleOCR} className="space-y-4 mb-8">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full border p-3 rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            {loading ? t("extracting") : t("extractBtn")}
          </button>
        </form>

        {text && (
          <div ref={textRef} className="scroll-mt-24">
            <div className="mb-8 mt-4 bg-gray-100 p-4 rounded-lg shadow max-h-64 overflow-y-auto">
              <h3 className="font-semibold text-teal-700 mb-2">
                {t("extractedText")}
              </h3>
              <pre className="text-gray-700 whitespace-pre-wrap text-sm">
                {text}
              </pre>
            </div>
          </div>
        )}

        {/* Manual Entry Section */}
        <form onSubmit={handleSaveBill} className="space-y-4">
          <input
            type="number"
            placeholder={t("enterUnits")}
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleEstimate}
              disabled={loading}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              {t("estimateBtn")}
            </button>
            <input
              type="number"
              placeholder={t("billAmount")}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 border p-3 rounded-lg"
              required
            />
          </div>

          <textarea
            placeholder={t("remarks")}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full border p-3 rounded-lg"
            rows="3"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? t("saving") : t("saveBtn")}
          </button>
        </form>

        {msg && (
          <p
            className={`mt-4 font-semibold ${
              msg.includes("✅") || msg.includes("💡")
                ? "text-teal-700"
                : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}
      </main>
    </div>
  );
};

export default BillUpload;
