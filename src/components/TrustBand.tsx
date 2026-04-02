"use client";

import { motion } from "framer-motion";

const partners = [
  "Microsoft 365",
  "GİB e-Dönüşüm",
  "e-İmza",
  "KEP",
  "Sanal Ofis",
  "e-Fatura",
  "e-Arşiv",
  "OneDrive",
  "Microsoft Teams",
  "SharePoint",
  "e-İrsaliye",
  "e-Defter",
];

export default function TrustBand() {
  const doubled = [...partners, ...partners];

  return (
    <div className="py-5 border-y border-[#E8ECEF] bg-white overflow-hidden">
      <div className="flex items-center gap-3 mb-3 px-6 max-w-[1230px] mx-auto">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/30 whitespace-nowrap">
          Desteklenen altyapılar
        </span>
        <div className="h-px flex-1 bg-[#E8ECEF]" />
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-6 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 28,
            ease: "linear",
          }}
        >
          {doubled.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full border border-[#E8ECEF] bg-white px-4 py-2 shrink-0 shadow-[0_1px_4px_rgba(15,23,42,0.05)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#1b98d5]" />
              <span className="text-[13px] font-semibold text-[#475569] whitespace-nowrap">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
