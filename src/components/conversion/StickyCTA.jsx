import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

export default function StickyCTA() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const ctaHref = useMemo(() => (user ? "/kurumsal-danismanlik" : "/register"), [user]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const getThreshold = () => {
      const hero = document.getElementById("work365-hero");
      if (!hero) return window.innerHeight * 0.65;
      const heroTop = hero.offsetTop || 0;
      const heroHeight = hero.offsetHeight || window.innerHeight * 0.7;
      return heroTop + heroHeight - 80;
    };

    let threshold = getThreshold();

    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    const onResize = () => {
      threshold = getThreshold();
      onScroll();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: "easeOut" }}
          className="pointer-events-none fixed bottom-20 left-4 right-4 z-[95] sm:bottom-6 sm:left-auto sm:right-6 sm:w-auto"
          aria-label="Sticky call to action"
        >
          <Link
            to={ctaHref}
            className="pointer-events-auto inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#799B38]/40 bg-black px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl shadow-[0_10px_24px_rgba(0,0,0,0.4)] transition hover:-translate-y-[1px] hover:border-[#799B38]/60 hover:shadow-[0_14px_30px_rgba(121,155,56,0.15)] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#799B38]/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] sm:w-auto"
          >
            Work365 ile kuruluma başla
            <FaArrowRight className="text-xs" aria-hidden="true" />
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
