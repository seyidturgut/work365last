import { motion, useReducedMotion } from "framer-motion";

export default function StepWelcome({ onStart }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-8 text-center">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
        className="inline-flex rounded-full border border-primary/35 bg-primary/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white"
      >
        Welcome Aboard
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
          Work365 onboarding sürecine hoş geldiniz
        </h2>
        <p className="mx-auto max-w-2xl text-slate-200">
          Birkaç kısa adımda iş modelinize uygun kurulum planını çıkaralım. Tüm bilgileriniz
          güvenli şekilde kaydedilir ve dilediğiniz zaman düzenleyebilirsiniz.
        </p>
      </div>

      <button
        onClick={onStart}
        className="inline-flex items-center rounded-xl border border-primary/40 bg-gradient-to-r from-[#65A30D] to-[#799B38] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(101,163,13,0.35)] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_32px_rgba(121,155,56,0.42)] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08142b]"
        aria-label="Onboarding başlat"
      >
        Başlayalım
      </button>
    </div>
  );
}
