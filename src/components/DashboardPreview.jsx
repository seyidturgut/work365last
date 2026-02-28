import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const stats = [
  { label: "Active Cases", value: "24" },
  { label: "Completion", value: "92%" },
  { label: "Avg. Setup", value: "11 Days" },
];

const timeline = [
  { id: 1, name: "Company registration", status: "Done" },
  { id: 2, name: "Tax office validation", status: "In progress" },
  { id: 3, name: "Bank onboarding", status: "Queued" },
];

export default function DashboardPreview({ screenshotSrc = "", className = "" }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [6, -6],
  );
  const parallaxRotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0.2, -0.2],
  );

  const showScreenshot = Boolean(screenshotSrc && !imageFailed);

  return (
    <motion.div
      ref={ref}
      style={shouldReduceMotion ? undefined : { y: parallaxY, rotate: parallaxRotate }}
      className={`relative w-full max-w-[580px] ${className}`}
    >
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="glass-card glass-shimmer rounded-[32px] p-6 md:p-8 hover:shadow-[0_20px_48px_rgba(121,155,56,0.2)]"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/70">Dashboard Preview</p>
            <p className="text-2xl font-semibold text-white">Business Setup Hub</p>
          </div>
          <span className="rounded-full border border-emerald-300/30 bg-emerald-300/15 px-3 py-1 text-xs font-semibold text-emerald-100">
            Live
          </span>
        </div>

        {showScreenshot ? (
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-slate-900/30">
            <img
              src={screenshotSrc}
              alt="Work365 dashboard preview"
              className="h-[230px] w-full object-cover"
              onError={() => setImageFailed(true)}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-white/15 bg-slate-900/30 p-4">
            <div className="grid grid-cols-3 gap-2">
              {stats.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[11px] text-slate-300">{item.label}</p>
                  <p className="mt-1 text-lg font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/40 p-3">
              <div className="mb-2 flex items-center justify-between text-[11px] text-slate-300">
                <span>Progress</span>
                <span>78%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-700/70">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#8FB14B] via-[#799B38] to-[#5F7D2D]"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {timeline.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
                >
                  <span className="text-xs text-slate-200">{item.name}</span>
                  <span className="text-[11px] text-primary-light">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <motion.article
        whileHover={shouldReduceMotion ? undefined : { y: -3 }}
        animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 6.4, repeat: Infinity, ease: "easeInOut" }
        }
        className="absolute -left-7 top-8 hidden w-44 rounded-2xl border border-primary/30 bg-primary/20 p-3 text-white shadow-[0_14px_30px_rgba(121,155,56,0.24)] backdrop-blur-xl lg:block"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/75">Support</p>
        <p className="mt-1 text-sm font-semibold">24/7 Ops Team Online</p>
      </motion.article>

      <motion.article
        whileHover={shouldReduceMotion ? undefined : { y: -3 }}
        animate={shouldReduceMotion ? undefined : { y: [0, -9, 0] }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
        }
        className="absolute -bottom-6 right-3 hidden w-52 rounded-2xl border border-purple-300/35 bg-purple-500/18 p-3 text-purple-100 shadow-[0_16px_32px_rgba(139,92,246,0.26)] backdrop-blur-xl lg:block"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-purple-100/80">Automation</p>
        <p className="mt-1 text-sm font-semibold">AI workflow active</p>
      </motion.article>

      <motion.article
        whileHover={shouldReduceMotion ? undefined : { y: -3 }}
        animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.35 }
        }
        className="absolute right-7 top-20 hidden w-44 rounded-2xl border border-white/20 bg-white/10 p-3 text-slate-100 shadow-[0_14px_30px_rgba(15,23,42,0.4)] backdrop-blur-xl xl:block"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">Compliance</p>
        <p className="mt-1 text-sm font-semibold">GDPR-ready pipeline</p>
      </motion.article>
    </motion.div>
  );
}
