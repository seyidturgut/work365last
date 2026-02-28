import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import MesafeliSatisSozlesmesiModal from "./MesafeliSatisSozlesmesiModal";

export default function StepMesafeliSozlesme({ setStep, distanceSalesAccepted, setDistanceSalesAccepted, onContinue }) {
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleContinue = async () => {
    if (!distanceSalesAccepted || !onContinue) return;
    setSubmitting(true);
    try {
      await onContinue();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      key="step-mesafeli"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border rounded-2xl shadow-md p-6"
    >
      <h3 className="text-lg font-bold mb-6 text-gray-900">Mesafeli Satış Sözleşmesi</h3>

      <p className="text-gray-700 mb-4">
        Ödeme adımına geçmeden önce Mesafeli Satış Sözleşmesi&apos;ni okumanız ve kabul etmeniz gerekmektedir.
      </p>

      <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <p className="text-sm text-gray-600 mb-3">
          Sözleşmenin tam metnini aşağıdaki butona tıklayarak burada okuyabilirsiniz. Taraflar, tanımlar, sözleşmenin konusu,
          cayma hakkı ve diğer tüm koşullar sözleşme metninde yer almaktadır.
        </p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="text-primary font-semibold underline hover:no-underline inline-flex items-center gap-2"
        >
          Mesafeli Satış Sözleşmesi tam metni
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>

      <MesafeliSatisSozlesmesiModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={!!distanceSalesAccepted}
            onChange={(e) => setDistanceSalesAccepted?.(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">
            Mesafeli Satış Sözleşmesi&apos;ni okudum, anladım ve kabul ediyorum. Ödeme adımına geçmek için bu onayı vermem gerektiğini biliyorum.
          </span>
        </label>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-6 py-3 rounded-xl font-semibold bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-2"
        >
          <FaArrowLeft /> Geri
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!distanceSalesAccepted || submitting}
          className={`px-8 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 ${
            !distanceSalesAccepted || submitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary-dark hover:to-blue-700 hover:shadow-xl transform hover:-translate-y-0.5"
          }`}
        >
          {submitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Kaydediliyor...
            </>
          ) : (
            <>
              Ödeme Adımına Geç
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
