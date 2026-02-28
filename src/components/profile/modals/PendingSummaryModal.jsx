import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SummarySection = ({
  title,
  icon,
  entries,
  getLabelTR,
  defaultOpen = true,
  valueFormatter,
}) => {
  if (!entries || Object.keys(entries).length === 0) return null;

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <details className="group" open={defaultOpen}>
        <summary className="cursor-pointer bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 font-bold px-5 py-4 flex items-center justify-between hover:from-gray-150 hover:to-gray-100 transition-all">
          <span className="flex items-center gap-2">
            {icon}
            {title}
          </span>
          <svg className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </summary>
        <div className="px-5 py-5 bg-white">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {Object.entries(entries).map(([key, value]) =>
              value ? (
                <div key={key} className="flex flex-col">
                  <span className="font-semibold text-gray-900">{getLabelTR ? getLabelTR(key) : key}</span>
                  <span className="text-gray-700 mt-1">{valueFormatter ? valueFormatter(key, value) : value}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </details>
    </div>
  );
};

const PartnersSection = ({ partners, getLabelTR }) => {
  if (!partners || !Array.isArray(partners) || partners.length === 0) return null;

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <details className="group">
        <summary className="cursor-pointer bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 font-bold px-5 py-4 flex items-center justify-between hover:from-gray-150 hover:to-gray-100 transition-all">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Ortaklar ({partners.length})
          </span>
          <svg className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </summary>
        <div className="px-5 py-5 bg-white space-y-4">
          {partners.map((partner, idx) => (
            <div key={idx} className="bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-xl p-4 border border-gray-200">
              <p className="text-sm font-bold text-indigo-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Ortak #{idx + 1}
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {Object.entries(partner || {}).map(([key, value]) =>
                  value ? (
                    <div key={key} className="flex flex-col">
                      <span className="font-semibold text-gray-900">{getLabelTR ? getLabelTR(key) : key}</span>
                      <span className="text-gray-700 mt-1">{value}</span>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default function PendingSummaryModal({
  pendingSummaryModalOpen,
  pendingDocRegistration,
  setPendingSummaryModalOpen,
  getLabelTR,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (pendingSummaryModalOpen && modalRef.current) {
      const modalElement = modalRef.current.querySelector('[class*="rounded-3xl"]');
      if (modalElement) {
        modalElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [pendingSummaryModalOpen]);

  return (
    <AnimatePresence>
      {pendingSummaryModalOpen && pendingDocRegistration && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setPendingSummaryModalOpen(false);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 p-6 flex items-center justify-between flex-shrink-0">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">Başvuru Bilgileri Özeti</h2>
                <p className="text-white/80 text-sm">Doldurduğunuz kişisel, iletişim, şirket ve işyeri bilgilerini kontrol edin.</p>
              </div>
              <button
                type="button"
                onClick={() => setPendingSummaryModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/10 to-primary-dark/10 p-5">
                  <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Genel Bilgiler
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold text-gray-900">Şirket Adı:</span> {pendingDocRegistration.company_name || "Belirtilmemiş"}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Ürün:</span> {pendingDocRegistration.product?.title || "Şirket Kuruluşu"}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Paket:</span>{" "}
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{pendingDocRegistration.tier || "N/A"}</span>{" "}
                      •{" "}
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">{pendingDocRegistration.period || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Durum:</span>{" "}
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">{pendingDocRegistration.status || "Taslak"}</span>
                    </div>
                  </div>
                </div>

                <SummarySection
                  title="Kişisel Bilgiler"
                  icon={
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                  entries={pendingDocRegistration.personal_info}
                  getLabelTR={getLabelTR}
                />

                <SummarySection
                  title="İletişim Bilgileri"
                  icon={
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  entries={pendingDocRegistration.contact_info}
                  getLabelTR={getLabelTR}
                  defaultOpen={false}
                />

                <SummarySection
                  title="Şirket Bilgileri"
                  icon={
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                  entries={pendingDocRegistration.company_info}
                  getLabelTR={getLabelTR}
                  valueFormatter={(key, value) => (key === "capital" ? `${Number(value).toLocaleString("tr-TR")} ₺` : value)}
                />

                <SummarySection
                  title="Adres Bilgileri"
                  icon={
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  entries={pendingDocRegistration.address_info}
                  getLabelTR={getLabelTR}
                  defaultOpen={false}
                />

                <SummarySection
                  title="İşyeri Bilgileri"
                  icon={
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  entries={pendingDocRegistration.workplace_info}
                  getLabelTR={getLabelTR}
                  defaultOpen={false}
                />

                <PartnersSection partners={pendingDocRegistration.partners} getLabelTR={getLabelTR} />
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end flex-shrink-0">
              <button
                type="button"
                onClick={() => setPendingSummaryModalOpen(false)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Kapat
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

