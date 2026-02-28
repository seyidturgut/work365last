import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const formationFlow = [
  {
    label: "Kick-off",
    title: "Kurucu Brifingi & Hedef Haritası",
    description: "Sektör, ortak yapısı ve sermaye planına göre şirket tipini oturtuyoruz.",
    duration: "Gün 0",
  },
  {
    label: "Hazırlık",
    title: "Belgeler, Noter & Başvuru Paketleri",
    description:
      "Noter randevuları, ana sözleşme ve vergi dairesi belgeleri tek seferde hazırlanıyor.",
    duration: "Gün 1-3",
  },
  {
    label: "Kuruluş",
    title: "Vergi, Ticaret Sicil ve Banka Açılışı",
    description:
      "Vergi memuru ziyareti, ticaret sicil tescili ve banka hesap açılışı paralel yürüyor.",
    duration: "Gün 4-8",
  },
  {
    label: "Go-live",
    title: "E-belge, POS ve Otomasyon Entegrasyonları",
    description:
      "E-fatura, e-defter, sanal POS ve muhasebe otomasyonları aynı panelde aktif ediliyor.",
    duration: "Gün 9+",
  },
];

export default function CinematicFormationSection() {
  return (
    <section className="relative py-12 bg-[#050c1b] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-20 w-80 h-80 bg-blue-500/40 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-purple-500/30 blur-[220px] rounded-full" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-blue-100">
              Şirket Kuruluşu 2.0
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Belgelerle uğraşmadan şirketinizi kurun, 10 günde operasyona başlayın.
            </h2>
            <p className="text-lg text-slate-200">
              Yapay zekâ destekli kontrol listeleri, gerçek zamanlı durum ekranı ve otomatik
              bildirimlerle süreci yönetiyoruz. Siz sadece iş modelinize odaklanın.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { value: "11 Gün", label: "Kuruluş Ortalaması" },
                { value: "%97", label: "İlk Denemede Onay" },
                { value: "24/7", label: "Kurucu Destek Hattı" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/kurumsal-danismanlik"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
              >
                Kuruluş Danışmanı ile Konuş
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/profil/detay?tab=document-requests"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/30 text-white/90 hover:bg-white/10 transition"
              >
                Süreci İzle
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-10 -right-8 w-44 h-44 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 blur-3xl opacity-60" />
            <div className="relative glass-card rounded-[32px] p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-200">CANLI DURUM</p>
                  <p className="text-2xl font-semibold">Kuruluş Sprinti</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                  Aktif
                </span>
              </div>
              <div className="space-y-5">
                {formationFlow.map((step, idx) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className={`relative rounded-2xl p-4 border ${idx === 0
                      ? "border-blue-300/40 bg-blue-500/15"
                      : "border-white/10 bg-slate-900/30"
                      }`}
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] mb-2 text-slate-300">
                      <span>{step.label}</span>
                      <span>{step.duration}</span>
                    </div>
                    <p className="text-lg font-semibold">{step.title}</p>
                    <p className="text-sm text-slate-200 leading-relaxed">{step.description}</p>
                    {idx === 0 && (
                      <motion.div
                        className="absolute -top-2 -right-2 px-2 py-1 bg-white text-blue-600 text-[11px] font-semibold rounded-full shadow"
                        animate={{ rotate: [0, 2, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      >
                        Şimdi
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Olası teslim tarihi</p>
                  <p className="text-xl font-semibold">11 Gün</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-300">Kurucu paneli</p>
                  <p className="text-xl font-semibold">4/4 görev tamam</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
