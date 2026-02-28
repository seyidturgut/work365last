import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Elif Aksoy",
    role: "COO, Nova Enerji",
    quote: "Kurumsal danışmanlık ekibi, karmaşık büyüme hedeflerimizi somut yol haritalarına dönüştürdü. İlk 6 ayda operasyonel maliyetlerimiz %28 azaldı.",
  },
  {
    name: "Mert Kalkan",
    role: "Kurucu Ortak, D-Labs",
    quote: "Dijital dönüşüm programı sayesinde tüm süreçlerimizi tek panelden yönetiyoruz. Ekiplerin adaptasyon süreci beklediğimizden çok daha hızlı gerçekleşti.",
  },
  {
    name: "Selin Yıldız",
    role: "Genel Müdür, Atlas Global",
    quote: "Globalleşme stratejimizde hem vergi planlaması hem de yerel mevzuat uyumu için tek elden destek aldık. Yeni pazarlara giriş süremiz %40 kısaldı.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_#5f7d2d,_#050816)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-950"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary font-semibold uppercase tracking-[0.4em] text-sm">Güvenilen Partner</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Gerçek Sonuçlar</h2>
          <p className="text-slate-300 text-lg">
            Stratejik ortaklarımızın deneyimleri; ölçülebilir çıktı ve sürdürülebilir büyümeyi önceliyor.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-2xl"
            >
              <p className="text-slate-100 leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
              <div>
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-primary text-sm">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
