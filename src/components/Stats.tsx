"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "24 saat", label: "içinde kuruluş tamamlanır", icon: "⚡" },
  { value: "7/24", label: "dijital asistan desteği", icon: "🤖" },
  { value: "%35+", label: "yıllık pakette tasarruf", icon: "💰" },
  { value: "2.400+", label: "belge yılda otomatik işlenir", icon: "📄" },
];

export default function Stats() {
  return (
    <section className="px-6 py-6">
      <div className="max-w-[1230px] mx-auto">
        <div
          className="rounded-[32px] px-8 py-14 md:px-14"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-[13px] font-bold uppercase tracking-[0.16em] text-[#1b98d5] mb-12"
          >
            Rakamlarla Work365
          </motion.p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="text-center"
              >
                <p className="text-[36px] md:text-[44px] font-extrabold text-white tracking-[-0.04em] leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-[13px] text-white/55 leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
