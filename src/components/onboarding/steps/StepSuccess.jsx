import { motion, useReducedMotion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const confettiPieces = Array.from({ length: 10 }).map((_, index) => ({
  id: index,
  left: `${10 + index * 8}%`,
  delay: index * 0.12,
}));

export default function StepSuccess({ onGoDashboard }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-8 text-center">
      {confettiPieces.map((piece) => (
        <motion.span
          key={piece.id}
          initial={shouldReduceMotion ? false : { y: -18, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.6 }
              : { y: [0, 34, 68], opacity: [0, 1, 0] }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.8, repeat: Infinity, delay: piece.delay }
          }
          className="absolute h-2.5 w-2.5 rounded-full"
          style={{
            left: piece.left,
            top: "10%",
            background: piece.id % 2 ? "#799B38" : "#A3E635",
          }}
        />
      ))}

      <motion.div
        initial={shouldReduceMotion ? false : { scale: 0.94, opacity: 0 }}
        animate={shouldReduceMotion ? {} : { scale: [1, 1.04, 1], opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" }}
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200"
      >
        <FaCheckCircle className="text-3xl" />
      </motion.div>

      <h3 className="text-3xl font-black text-white">Kurulum tamamlandı</h3>
      <p className="mx-auto mt-3 max-w-xl text-slate-200">
        Onboarding başarıyla tamamlandı. Dashboard üzerinden adım adım ilerleme, belge yükleme ve
        servis aktivasyonunu yönetebilirsiniz.
      </p>

      <button
        onClick={onGoDashboard}
        className="mt-8 inline-flex items-center rounded-xl border border-primary/40 bg-gradient-to-r from-[#65A30D] to-[#799B38] px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(101,163,13,0.35)] transition-all hover:-translate-y-[1px] hover:shadow-[0_18px_32px_rgba(121,155,56,0.42)] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08142b]"
        aria-label="Dashboard'a git"
      >
        Dashboard'a Git
      </button>
    </div>
  );
}
