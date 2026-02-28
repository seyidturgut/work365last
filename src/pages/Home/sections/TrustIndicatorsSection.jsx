import { motion } from "framer-motion";
import { FaShieldAlt, FaUsers, FaGlobe } from "react-icons/fa";

const partnerLogos = ["Paribu", "Logo Yazılım", "Paraşüt", "Sodexo", "Paycell", "Workup"];

const trustMetrics = [
  { label: "Customers", value: "8,500+" },
  { label: "Countries", value: "140+" },
  { label: "Success Rate", value: "%97" },
];

export default function TrustIndicatorsSection() {
  return (
    <section className="relative overflow-hidden bg-[#070f22] py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-0 h-52 w-52 rounded-full bg-blue-500/20 blur-[90px]" />
        <div className="absolute right-10 bottom-0 h-60 w-60 rounded-full bg-purple-500/20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {trustMetrics.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-slate-900/35 p-4 text-center">
                  <p className="text-2xl font-black text-white">{item.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mb-12 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {partnerLogos.map((logo) => (
              <div
                key={logo}
                className="rounded-xl border border-white/12 bg-slate-900/35 px-3 py-3 text-center text-sm font-semibold text-slate-100"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 space-y-4"
          >
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto glow-border">
              <FaShieldAlt className="text-2xl text-blue-100" />
            </div>
            <h3 className="text-2xl font-bold text-white">Güvenli</h3>
            <p className="text-slate-200">
              Paylaştığınız tüm bilgiler en güçlü şifreleme yöntemleriyle korunuyor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 space-y-4"
          >
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto glow-border">
              <FaUsers className="text-2xl text-purple-100" />
            </div>
            <h3 className="text-2xl font-bold text-white">Profesyonel</h3>
            <p className="text-slate-200">
              Ekibimizin tamamı alanlarında uzman profesyonellerden oluşuyor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 space-y-4"
          >
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto glow-border">
              <FaGlobe className="text-2xl text-blue-100" />
            </div>
            <h3 className="text-2xl font-bold text-white">Global</h3>
            <p className="text-slate-200">
              Türkiye'de doğdu, üyeleriyle birlikte dünyaya açıldı. 140'dan fazla ülkede hizmet
              veriyor.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
