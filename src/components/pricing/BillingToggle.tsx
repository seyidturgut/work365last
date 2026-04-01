"use client";

import { motion } from "framer-motion";

type BillingToggleProps = {
  yearly: boolean;
  onChange: (yearly: boolean) => void;
  savingsLabel?: string | null;
  className?: string;
};

export default function BillingToggle({
  yearly,
  onChange,
  savingsLabel,
  className = "",
}: BillingToggleProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`.trim()}>
      {/* Segmented control */}
      <div className="inline-flex items-center rounded-full bg-[#F1F5F9] p-1">
        {/* Aylık */}
        <button
          type="button"
          onClick={() => onChange(false)}
          className="relative rounded-full px-5 py-2 text-[14px] font-semibold"
        >
          {!yearly && (
            <motion.span
              layoutId="billing-pill"
              className="absolute inset-0 rounded-full bg-white shadow-sm"
            />
          )}
          <span className={`relative z-10 transition-colors duration-200 ${!yearly ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>
            Aylık
          </span>
        </button>

        {/* Yıllık */}
        <button
          type="button"
          onClick={() => onChange(true)}
          className="relative rounded-full px-5 py-2 text-[14px] font-semibold"
        >
          {yearly && (
            <motion.span
              layoutId="billing-pill"
              className="absolute inset-0 rounded-full bg-white shadow-sm"
            />
          )}
          <span className={`relative z-10 transition-colors duration-200 ${yearly ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>
            Yıllık
          </span>
        </button>
      </div>

      {/* Tasarruf badge */}
      {savingsLabel && (
        <span className="rounded-full bg-[#DDFBEA] px-4 py-2 text-[12px] font-bold text-[#15803D]">
          {savingsLabel}
        </span>
      )}
    </div>
  );
}
