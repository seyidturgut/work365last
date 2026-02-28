import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import SecurityBadges from "./conversion/SecurityBadges";
import StripeInspiredHeroMotion from "./StripeInspiredHeroMotion";
import HeroLogoAnimation from "./HeroLogoAnimation";

const animatedTexts = [
  "hızlıca kur.",
  "kaliteli yönet.",
  "geliştir, destek al.",
  "BÜYÜT."
];

export default function HeroSection() {
  const { user } = useAuth();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Start after a 1s delay to let the user see the first text
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setTextIndex((prev) => (prev + 1) % animatedTexts.length);
      }, 2200); // Faster cycle: 2.2s
      return () => clearInterval(interval);
    }, 1000); // 1s initial pause

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="work365-hero" className="saas-mesh-bg relative overflow-hidden min-h-[85vh] lg:min-h-[95vh] flex items-center pt-28 pb-16 lg:pt-32">
      <StripeInspiredHeroMotion />

      {/* 100% Foolproof, Highly Visible Dot Pattern via index.css */}
      <div className="absolute inset-0 pointer-events-none z-0 hero-dot-pattern [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_100%,transparent_100%)]"></div>
      <div className="max-w-[1400px] mx-auto w-full px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 lg:space-y-8 text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.28em] text-slate-500">
              Yeni Nesil Şirket Yönetimi
            </p>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.2] lg:leading-[1.1] tracking-tight">
              Work365 ile şirketini
              <div className="mt-2 h-[1.3em] relative overflow-hidden flex items-center justify-center lg:justify-start">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={textIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ ease: "easeOut", duration: 0.4 }}
                    className="absolute inset-0 block text-[#799B38] pb-1 sm:pb-2"
                  >
                    {animatedTexts[textIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>

            <p className="font-body text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 lg:px-0">
              Work365 ile şirketini kur, var olan şirketin için destekler al. Sen işini
              büyütürken, arkaplanda kalan tüm işlemleri biz halledelim.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to={user ? "/kurumsal-danismanlik" : "/register"}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-[#65A30D]/40 bg-[#65A30D] px-10 py-4 text-base font-heading font-bold !text-white shadow-[0_4px_14px_rgba(101,163,13,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(101,163,13,0.4)]"
              >
                HEMEN BAŞLA
              </Link>
              <SecurityBadges className="opacity-80 scale-90 sm:scale-100" />
            </div>
          </div>

          {/* Right Column: Custom SVG Animation */}
          <div className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end">
            <HeroLogoAnimation textIndex={textIndex} />
          </div>

        </div>
      </div>
    </section>
  );
}
