import HeroSection from "../../components/HeroSection";
import { Target, MapPin, Cloud, CheckCircle, BarChart2, Landmark } from "lucide-react";
import StickyCTA from "../../components/conversion/StickyCTA";

import TestimonialsSection from "./sections/TestimonialsSection";
import ProcessStepsSection from "./sections/ProcessStepsSection";
import ServicesGridSection from "./sections/ServicesGridSection";
import LatestGuidesSection from "./sections/LatestGuidesSection";
export default function Home() {
  const quickServices = [
    { icon: <Target className="w-5 h-5 stroke-[2] transition-colors duration-300" />, label: "ŞİRKET KURULUŞU" },
    { icon: <MapPin className="w-5 h-5 stroke-[2] transition-colors duration-300" />, label: "KOBİ & STARTUP" },
    { icon: <Cloud className="w-5 h-5 stroke-[2] transition-colors duration-300" />, label: "ONLİNE MUHASEBE" },
    { icon: <Landmark className="w-5 h-5 stroke-[2] transition-colors duration-300" />, label: "E-FATURA" },
    { icon: <BarChart2 className="w-5 h-5 stroke-[2] transition-colors duration-300" />, label: "MARKA TESCİL" },
    { icon: <CheckCircle className="w-5 h-5 stroke-[2] transition-colors duration-300" />, label: "SANAL OFİS" },
  ];

  return (
    <div className="work365-light flex flex-col bg-slate-50">
      <StickyCTA />
      <HeroSection />

      {/* Hızlı Servisler Barı - Unified Premium Dock */}
      <section className="relative z-20 -mt-10 lg:-mt-14 mb-20 mx-4 lg:mx-auto max-w-[1300px] px-2 lg:px-6">
        <div className="w-full bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl lg:rounded-full shadow-[0_8px_40px_rgba(42,52,65,0.06)] p-2 lg:p-3 flex flex-col lg:flex-row items-stretch lg:items-center justify-between divide-y lg:divide-y-0 lg:divide-x divide-slate-200/60">
          {quickServices.map((item, idx) => (
            <div
              key={idx}
              className="group flex-1 flex items-center justify-start lg:justify-center gap-3 py-4 lg:py-2 px-6 lg:px-2 xl:px-4 hover:bg-slate-50/50 rounded-2xl lg:rounded-full cursor-pointer transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#65A30D] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_4px_12px_rgba(101,163,13,0.3)] transition-all duration-300">
                {item.icon}
              </div>
              <span className="text-xs xl:text-sm font-heading font-bold text-slate-700 tracking-wide group-hover:text-[#2A3441] transition-colors duration-300 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <ProcessStepsSection />
      <TestimonialsSection />
      <ServicesGridSection />
      <LatestGuidesSection />
    </div>
  );
}
