import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ServicesGridSection() {
  return (
    <section className="bg-[#1C1C1C] flex flex-col lg:flex-row min-h-[600px] border-t border-b border-black/20">
      {/* Left Side: Image with Green Overlay */}
      <div className="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-full overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1000&q=80"
          alt="Birlikte Çalışalım"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-70"
        />
        {/* Green/Navy Tint & Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A3441]/90 to-[#7FA833]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[#7FA833] mix-blend-color opacity-50"></div>

        {/* Decorative SVG (Top Left) */}
        <img
          src="/hero/logo-sekil.svg"
          alt="Work365 Shape"
          className="absolute -top-32 -left-32 w-96 h-96 opacity-10 object-contain"
        />
      </div>

      {/* Right Side: Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-start p-8 py-16 lg:p-24 2xl:p-32 bg-[#1b1b1b]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="text-[#7FA833] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4 lg:mb-6">
            BİRLİKTE ÇALIŞALIM
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 lg:mb-8 leading-tight">
            Geleceğe odaklan,<br />
            <span className="text-[#7FA833]">yenilikçi</span> ve <span className="text-[#7FA833]">güçlü</span> adımlarla<br />
            büyü.
          </h2>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-10 lg:mb-12">
            İşinizi büyütürken operasyonel yükleri düşünmeyin. Şirket kuruluşundan e-dönüşüme, ön muhasebeden sanal ofise kadar tüm süreçlerinizi uzman ekibimizle uçtan uca yönetiyoruz.
          </p>
          <Link
            to="/basvuru"
            className="inline-block text-white text-sm font-bold tracking-[0.15em] uppercase border-b-2 border-white pb-1.5 hover:text-[#7FA833] hover:border-[#7FA833] transition-colors duration-300"
          >
            ŞİMDİ BAŞVUR
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
