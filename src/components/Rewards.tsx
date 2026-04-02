"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, FileSignature, ReceiptText, Monitor, Globe, Megaphone } from "lucide-react";

const modules = [
  {
    tag: "Kuruluş",
    name: "Şirket Kuruluşu",
    description: "Şahıs, Limited veya Anonim şirketini noter olmadan, tamamen dijital olarak kur.",
    icon: <Building2 className="w-5 h-5 text-[#A88208]" />,
    iconBg: "bg-[#FEF9EC]",
    href: "/fiyatlandirma",
  },
  {
    tag: "e-İmza & KEP",
    name: "e-İmza & KEP",
    description: "Yasal süreçlerde geçerli elektronik imza ve kayıtlı e-posta altyapısı.",
    icon: <FileSignature className="w-5 h-5 text-[#1B98D5]" />,
    iconBg: "bg-[#EEF7FD]",
    href: "/digital-altyapi",
  },
  {
    tag: "e-Dönüşüm",
    name: "e-Fatura & e-Arşiv",
    description: "GİB uyumlu e-Fatura, e-Arşiv ve e-İrsaliye entegrasyonu tek pakette.",
    icon: <ReceiptText className="w-5 h-5 text-[#00A86B]" />,
    iconBg: "bg-[#EDFAF4]",
    href: "/digital-altyapi",
  },
  {
    tag: "Dijital Ofis",
    name: "Dijital Ofis & IT",
    description: "Microsoft 365 lisansları, kurumsal e-posta ve IT altyapısı Piri güvencesiyle.",
    icon: <Monitor className="w-5 h-5 text-[#1B98D5]" />,
    iconBg: "bg-[#EEF7FD]",
    href: "/ekosistem",
  },
  {
    tag: "Web Varlık",
    name: "Web & Dijital Varlık",
    description: "Kurumsal web sitesi, alan adı ve dijital kimlik hizmetleri.",
    icon: <Globe className="w-5 h-5 text-[#B37A08]" />,
    iconBg: "bg-[#FEF9EC]",
    href: "/ekosistem",
  },
  {
    tag: "Sosyal Medya",
    name: "Sosyal Medya & İçerik",
    description: "Marka yönetimi, içerik üretimi ve sosyal medya operasyonu.",
    icon: <Megaphone className="w-5 h-5 text-[#E11D48]" />,
    iconBg: "bg-[#FFF1F3]",
    href: "/ekosistem",
  },
];

export default function Rewards() {
  return (
    <section className="py-24 px-6 bg-[#F5F7FA]">
      <div className="max-w-[1230px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:w-1/2"
        >
          <div className="flex items-center gap-3 mb-6">
            <img src="/LOGO-END.svg" alt="Work365" className="h-6 w-auto" />
            <span className="text-[#9A7B31] font-bold text-sm tracking-widest uppercase">
              Modüler Ekosistem
            </span>
          </div>

          <h2 className="text-[40px] md:text-[52px] font-bold text-black mb-6 leading-tight">
            Tek platform, tüm iş süreçlerin.
          </h2>

          <p className="text-xl text-Work365-text mb-10 leading-relaxed max-w-[540px]">
            Şirket kuruluşundan dijital altyapıya, e-Dönüşümden web varlığına kadar ihtiyacın olan tüm modüller Work365 çatısı altında. Sadece ihtiyacın olanı seç, geri kalanı biz yönetelim.
          </p>

          <Link
            href="/ekosistem"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition-all shadow-xl"
          >
            Tüm Modülleri Gör <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Right Side - Module Cards */}
        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <Link
                href={item.href}
                className="flex items-start gap-4 bg-white p-5 rounded-[24px] shadow-sm border border-transparent hover:border-gray-200 hover:shadow-md transition-all group"
              >
                <div className={`w-11 h-11 ${item.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/40 mb-0.5">{item.tag}</p>
                  <h4 className="text-[15px] font-bold text-black leading-tight group-hover:text-[#1B98D5] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[12px] text-Work365-text mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
