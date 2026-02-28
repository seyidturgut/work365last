import React from "react";
import { motion } from "framer-motion";

export default function CheckoutStepper({ step, setStep }) {
  const steps = [
    { id: 1, label: "Adres & Fatura" },
    { id: 2, label: "Sözleşmeler" },
    { id: 3, label: "Kart Bilgileri" },
    { id: 4, label: "Ödeme Özeti" },
  ];
  const progressWidth = step === 5 ? "75%" : step === 1 ? "25%" : step === 2 ? "50%" : step === 3 ? "75%" : "100%";
  const isError = step === 5;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between relative">
        <div className={`absolute top-6 left-0 right-0 h-1 rounded-full -z-0 ${isError ? "bg-white/20" : "bg-white/20"}`}>
          <motion.div
            className={`h-1 rounded-full ${isError ? "bg-gradient-to-r from-red-400 via-red-300 to-red-400" : "bg-gradient-to-r from-white via-blue-200 to-white"}`}
            initial={{ width: 0 }}
            animate={{ width: progressWidth }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {steps.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: s.id * 0.1 }}
            className="text-center relative z-10 flex-1"
          >
            <motion.button
              onClick={() => step >= s.id && (step !== 5 || s.id <= 3) && setStep(s.id)}
              disabled={step < s.id}
              whileHover={step >= s.id ? { scale: 1.15 } : {}}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              <motion.div
                className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300 ${
                  step > s.id || (step === s.id && !isError)
                    ? "bg-white text-primary scale-110"
                    : "bg-white/30 border-2 border-white/50 text-white/60"
                }`}
                animate={{
                  scale: step > s.id || (step === s.id && !isError) ? 1.1 : 1,
                }}
              >
                {step > s.id ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  s.id
                )}
              </motion.div>
              <div className={`mt-3 text-sm font-semibold whitespace-nowrap ${step >= s.id && !isError ? "text-white" : "text-white/60"}`}>
                {s.label}
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

