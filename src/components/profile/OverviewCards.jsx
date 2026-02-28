import React from "react";
import { motion } from "framer-motion";

export default function OverviewCards({ cards = [] }) {
  return (
    <section className="-mt-16 pb-12 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}></div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-32 h-32 bg-white/60 rounded-full blur-3xl -top-16 -right-12"></div>
              </div>
              <div className="relative p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-400 font-semibold">
                      {card.sublabel || card.subLabel}
                    </p>
                    <p className="text-3xl font-black text-gray-900 mt-1">
                      {card.value?.toLocaleString("tr-TR")}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md border border-gray-100 text-primary text-xl">
                    <card.icon />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-gray-800">{card.label}</p>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-gray-600 border border-gray-200 shadow-sm">
                    {card.chip}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

