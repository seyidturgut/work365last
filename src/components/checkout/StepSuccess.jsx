import React from "react";
import { motion } from "framer-motion";

export default function StepSuccess({ total, billing, setStep, navigate }) {
  return (
    <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl shadow-md p-6">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </motion.svg>
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Ödeme Başarıyla Tamamlandı!</h3>
        <p className="text-gray-600">Siparişiniz alındı ve işleme alındı.</p>
      </div>

      <div className="border-t pt-6 mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Sipariş Detayları</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Sipariş No:</span>
            <span className="font-semibold text-gray-900">#{Date.now().toString().slice(-6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tarih:</span>
            <span className="font-semibold text-gray-900">{new Date().toLocaleDateString('tr-TR')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Toplam:</span>
            <span className="font-bold text-primary text-lg">{total.toLocaleString('tr-TR')} ₺</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="font-semibold text-gray-900 mb-4">Fatura Bilgileri</h4>
        <div className="space-y-2 text-sm text-gray-700 bg-gray-50 rounded-xl p-4">
          <div>{billing.firstName} {billing.lastName}</div>
          <div>{billing.email}</div>
          <div>{billing.phone}</div>
          {billing.address && <div className="mt-2 text-gray-600">{billing.address}</div>}
          {billing.city && <div className="text-gray-600">{billing.city}, {billing.district}</div>}
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <button onClick={()=> setStep(2)} className="px-6 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5">Geri</button>
        <button onClick={()=> navigate('/')} className="px-6 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-dark shadow">Ana Sayfaya Dön</button>
      </div>
    </motion.div>
  );
}

