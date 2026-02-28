import React from "react";
import { motion } from "framer-motion";

export default function StepError({ error, setError, setStep, navigate }) {
  return (
    <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl shadow-md p-6">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </motion.svg>
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Ödeme Başarısız</h3>
        <p className="text-gray-600 mb-4">{error || 'Ödeme işlemi sırasında bir hata oluştu.'}</p>
        <p className="text-sm text-gray-500">Lütfen kart bilgilerinizi kontrol edip tekrar deneyin.</p>
      </div>

      <div className="border-t pt-6 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Olası Nedenler:</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-1">•</span>
            <span>Kart numarası, son kullanma tarihi veya CVV bilgisi hatalı olabilir</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-1">•</span>
            <span>Kart limitiniz yetersiz olabilir</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-1">•</span>
            <span>Banka tarafından işlem engellenmiş olabilir</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-1">•</span>
            <span>İnternet bağlantınızı kontrol edin</span>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between mt-8">
        <button type="button" onClick={() => { setError?.(null); setStep(3); }} className="px-6 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5">Geri Dön</button>
        <button type="button" onClick={() => navigate('/iletisim')} className="px-6 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-dark shadow">Destek İle İletişime Geç</button>
      </div>
    </motion.div>
  );
}

