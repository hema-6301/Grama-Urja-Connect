import React from "react";
import { useTranslation } from "react-i18next";

const Awareness = () => {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gradient-to-b from-green-50 to-white rounded-2xl shadow-md pb-32">
      <h2 className="text-3xl font-bold text-green-700 mb-10 text-center">
        💡 {t("awarenessTitle")}
      </h2>

      {/* Save Electricity Section */}
      <section className="mb-12 flex flex-col md:flex-row items-start gap-8">
        <div className="md:w-2/3">
          <h3 className="text-2xl font-semibold text-green-800 mb-3">
            🌱 {t("saveElectricityTitle")}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>{t("saveElectricity1")}</li>
            <li>{t("saveElectricity2")}</li>
            <li>{t("saveElectricity3")}</li>
            <li>{t("saveElectricity4")}</li>
            <li>{t("saveElectricity5")}</li>
          </ul>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <img
            src="/assets/save.png"
            alt="Save Electricity"
            className="h-40 w-40 rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Electrical Safety Section */}
      <section className="mb-12 flex flex-col md:flex-row items-start gap-8">
        <div className="md:w-2/3">
          <h3 className="text-2xl font-semibold text-green-800 mb-3">
            ⚡ {t("electricalSafetyTitle")}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>{t("electricalSafety1")}</li>
            <li>{t("electricalSafety2")}</li>
            <li>{t("electricalSafety3")}</li>
            <li>{t("electricalSafety4")}</li>
          </ul>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <img
            src="/assets/community.jpg"
            alt="Electrical Safety"
            className="h-40 w-40 rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Electricity Bill Section */}
      <section className="mb-12 flex flex-col md:flex-row items-start gap-8">
        <div className="md:w-2/3">
          <h3 className="text-2xl font-semibold text-green-800 mb-3">
            📊 {t("billUnderstandingTitle")}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>{t("billUnderstanding1")}</li>
            <li>{t("billUnderstanding2")}</li>
            <li>{t("billUnderstanding3")}</li>
            <li>{t("billUnderstanding4")}</li>
          </ul>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <img
            src="/assets/bill.jpg"
            alt="Bill Awareness"
            className="h-40 w-40 rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Awareness Videos */}
      <section className="mb-12">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/assets/video-icon.png"
            alt="Awareness Videos"
            className="h-40 w-40 rounded-xl shadow-lg object-cover mb-4"
          />
          <h3 className="text-2xl font-semibold text-green-800 text-center">
            🎥 {t("awarenessVideos")}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <iframe
            className="w-full h-64 rounded-lg shadow"
            src="https://www.youtube.com/embed/y-2X2z7VKhM"
            title="Energy Saving Awareness"
            allowFullScreen
          ></iframe>
          <iframe
            className="w-full h-64 rounded-lg shadow"
            src="https://www.youtube.com/embed/LfZ2fK8lK3U"
            title="Electrical Safety Tips"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Footer Note */}
      <div className="mt-16 mx-auto max-w-md bg-green-50 border border-green-300 rounded-xl shadow-lg p-6 text-center">
        <p className="text-green-800 italic text-lg leading-relaxed">
          “{t("footerQuote")}”
        </p>
        <p className="mt-2 text-green-700 font-medium tracking-wide">
          {t("footerMessage")}
        </p>
      </div>
    </div>
  );
};

export default Awareness;
