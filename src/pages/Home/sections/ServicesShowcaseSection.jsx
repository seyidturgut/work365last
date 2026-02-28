import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaRocket,
  FaChartLine,
  FaGlobe,
  FaShieldAlt,
  FaCog,
} from "react-icons/fa";

const packagePlans = [
  {
    icon: <FaBuilding className="text-3xl" />,
    title: "Şirket Kuruluşu",
    description:
      "Şahıs, Limited, Anonim ve Bilanço şirket kuruluşu hizmetleri. Profesyonel danışmanlık ile hızlı kurulum.",
    link: "/kurumsal-danismanlik",
    priceMonthly: 49,
  },
  {
    icon: <FaRocket className="text-3xl" />,
    title: "KOBİ & Startup Çözümleri",
    description: "Girişimciler ve küçük işletmeler için özel paketler ve hızlı çözümler.",
    link: "/kobi-startup",
    priceMonthly: 89,
    featured: true,
  },
  {
    icon: <FaChartLine className="text-3xl" />,
    title: "Online Muhasebe",
    description:
      "Dijital muhasebe ve ön muhasebe programları ile finansal süreçlerinizi yönetin.",
    link: "/fiyatlar",
    priceMonthly: 129,
  },
];

const addonModules = [
  {
    icon: <FaGlobe className="text-xl" />,
    title: "E-Fatura & E-Defter",
    description:
      "Elektronik fatura ve defter hizmetleri ile dijital dönüşümünüzü tamamlayın.",
    link: "/fiyatlar",
  },
  {
    icon: <FaShieldAlt className="text-xl" />,
    title: "Marka Tescil",
    description: "Markanızı koruma altına alın. Marka araştırması ve tescil süreçleri.",
    link: "/fiyatlar",
  },
  {
    icon: <FaCog className="text-xl" />,
    title: "Sanal Ofis",
    description:
      "Fiziksel ofis gerektirmeden şirket adresinizi ve iletişim bilgilerinizi yönetin.",
    link: "/kobi-startup",
  },
];

export default function ServicesShowcaseSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#060e1f] py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-0 h-64 w-64 rounded-full bg-blue-500/20 blur-[90px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/20 blur-[110px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Premium Paketler
          </h2>
          <p className="mt-4 text-slate-300">
            İş modelinize uygun paketi seçin, gerisini Work365 otomasyonu yönetsin.
          </p>

          <div className="mt-8 inline-flex rounded-xl border border-white/15 bg-white/5 p-1 backdrop-blur">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                yearly ? "text-slate-300" : "bg-blue-500 text-white"
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                yearly ? "bg-blue-500 text-white" : "text-slate-300"
              }`}
            >
              Yıllık
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {packagePlans.map((plan, index) => {
            const price = yearly ? Math.round(plan.priceMonthly * 10.2) : plan.priceMonthly;
            const featured = Boolean(plan.featured);
            return (
              <motion.article
                key={plan.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`relative rounded-3xl border p-7 transition-all duration-300 ${
                  featured
                    ? "scale-[1.02] border-blue-400/50 bg-gradient-to-b from-blue-500/18 to-purple-500/14 shadow-[0_18px_45px_rgba(59,130,246,0.35)]"
                    : "glass-card border-white/20"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-blue-300/40 bg-blue-500/90 px-3 py-1 text-xs font-bold text-white">
                    En Populer
                  </span>
                )}
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-blue-100">
                    {plan.icon}
                  </div>
                  <span className="text-xs text-slate-300">{yearly ? "Yıllık Plan" : "Aylık Plan"}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">{plan.description}</p>
                <div className="mt-6">
                  <p className="text-4xl font-black text-white">
                    ${price}
                    <span className="ml-1 text-base font-medium text-slate-300">
                      /{yearly ? "yıl" : "ay"}
                    </span>
                  </p>
                </div>
                <Link
                  to={plan.link}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-blue-300/40 bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(99,102,241,0.45)]"
                >
                  Paketi İncele
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {addonModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur"
            >
              <Link to={module.link} className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-100">{module.icon}</div>
                <div>
                  <p className="font-semibold text-white">{module.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{module.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
