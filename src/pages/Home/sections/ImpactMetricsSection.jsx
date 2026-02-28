import { motion } from "framer-motion";

const impactMetrics = [
  { label: "Kurulan Şirket", value: "45", detail: "Şahıs, limited ve anonim yapılar" },
  { label: "Süre Ortalama", value: "11 Gün", detail: "Vergi, sicil ve noter süreçleri" },
  { label: "Operasyon Tasarrufu", value: "%42", detail: "Otomasyona geçen ekipler" },
  { label: "NPS", value: "74", detail: "Kurucu memnuniyeti puanı" },
];

export default function ImpactMetricsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-corporate hover:shadow-glow-green hover:-translate-y-1 transition-all duration-300 ease-micro group"
            >
              <div className="absolute inset-0 bg-work-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6 space-y-2">
                <p className="text-sm font-heading font-semibold text-work-navy-500 uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-4xl font-mono font-bold text-gray-900 tracking-tight group-hover:text-work-green-600 transition-colors duration-300">{item.value}</p>
                <p className="text-sm font-body text-gray-500">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

