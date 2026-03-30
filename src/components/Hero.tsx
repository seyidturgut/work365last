"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  CheckCircle2,
  Globe,
  Monitor,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const serviceCards = [
  {
    id: 0,
    icon: Building2,
    label: "Şirketini Kur",
    desc: "Şahıs, Limited, Anonim veya Bilanço — 24 saat içinde kuruluş.",
    href: "/sirketini-kur",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&q=80&auto=format&fit=crop",
    accent: "#D97706",
    iconBg: "bg-[#FEF3C7]/90",
    iconColor: "text-[#D97706]",
  },
  {
    id: 1,
    icon: Monitor,
    label: "Dijital Ofis",
    desc: "Microsoft 365, kurumsal e-posta, Teams ve help desk tek pakette.",
    href: "/digital-ofis",
    image:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&h=500&q=80&auto=format&fit=crop",
    accent: "#0EA5E9",
    iconBg: "bg-[#CCFBF1]/90",
    iconColor: "text-[#0F766E]",
  },
  {
    id: 2,
    icon: Globe,
    label: "Görünür Ol",
    desc: "Web sitesi ve sosyal medya yönetimiyle markanı dijitalde büyüt.",
    href: "/gorunur-ol",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&q=80&auto=format&fit=crop",
    accent: "#1b98d5",
    iconBg: "bg-[#DBEAFE]/90",
    iconColor: "text-[#1b98d5]",
  },
  {
    id: 3,
    icon: TrendingUp,
    label: "İşini Büyüt",
    desc: "Teşvik, hibe, yatırımcı erişimi ve uzman kiralama — ihtiyacın kadar.",
    href: "/buyut",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&q=80&auto=format&fit=crop",
    accent: "#16A34A",
    iconBg: "bg-[#DCFCE7]/90",
    iconColor: "text-[#16A34A]",
  },
];

export default function Hero() {
  return (
    <section className="pt-40 pb-16">
      <div className="px-6 max-w-[1230px] mx-auto min-h-[calc(100vh-120px)] flex flex-col justify-start">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            {/* Motto pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 mb-6">
              <span className="text-[13px] font-bold tracking-wide text-black">Kur. Yönet. Tanıt. Büyüt.</span>
            </div>

            {/* Headline */}
            <h1 className="text-[48px] md:text-[64px] font-bold tracking-tighter mb-6 leading-[1.05] text-black">
              Şirketini kur, <span className="text-[#1b98d5]">her yerden yönet.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-Work365-text mb-10 max-w-[520px] font-normal leading-relaxed">
              Şirket kuruluşundan dijital ofise, muhasebeden yatırımcı erişimine — ihtiyacın olan her şey tek
              platformda.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
              <Link
                href="/sirketini-kur"
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full text-[15px] font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                Hemen Başla
              </Link>
              <Link
                href="/fiyatlandirma"
                className="flex items-center gap-1 text-[15px] font-semibold text-Work365-text transition-opacity hover:opacity-70"
              >
                Fiyatları Gör <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4">
              {[
                { icon: CheckCircle2, label: "7/24 Destek", color: "text-[#1b98d5]" },
                { icon: ShieldCheck, label: "Şeffaf Fiyat", color: "text-[#1b98d5]" },
                { icon: CheckCircle2, label: "Türk Altyapısı", color: "text-[#1b98d5]" },
              ].map(({ icon: Icon, label, color }) => (
                <span key={label} className={`flex items-center gap-1.5 text-[14px] font-semibold ${color}`}>
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Visuals Slider */}
          <div className="relative h-[600px] flex items-center justify-center">
            <HeroSlider />
          </div>
        </div>
      </div>
      <ServicesRail />
    </section>
  );
}

function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev: number) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          {index === 0 ? <SlideOne /> : <SlideTwo />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ServicesRail() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const applyMedia = () => setIsDesktop(mediaQuery.matches);

    applyMedia();
    mediaQuery.addEventListener("change", applyMedia);

    return () => mediaQuery.removeEventListener("change", applyMedia);
  }, []);

  useEffect(() => {
    if (!isDesktop || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % serviceCards.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [isDesktop, isPaused]);

  return (
    <div className="mt-16 lg:mt-20">
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] px-4 sm:px-6 lg:px-10 2xl:px-16">
        <div className="mb-8 max-w-[1230px] mx-auto">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">Hizmetler</p>
          <h2 className="mt-3 text-[28px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[36px]">
            İhtiyacına uygun çözümü seç.
          </h2>
        </div>

        <div className="hidden sm:flex gap-3 h-[420px]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {serviceCards.map((card, i) => {
            const Icon = card.icon;
            const isActive = i === activeIdx;

            return (
              <div
                key={card.id}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setActiveIdx(i)}
                className="relative overflow-hidden rounded-[28px] cursor-pointer bg-cover bg-center bg-gray-800"
                style={{
                  backgroundImage: `url(${card.image})`,
                  flex: isActive ? "3" : "1",
                  transition: "flex 0.5s ease-in-out",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div
                  className={`absolute top-5 left-5 flex h-10 w-10 items-center justify-center rounded-[12px] ${card.iconBg} shadow-md backdrop-blur-sm transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>

                <div
                  className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <p
                    className="text-white text-[11px] font-bold tracking-[0.12em] uppercase"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {card.label}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{
                    transform: isActive ? "translateY(0)" : "translateY(100%)",
                    transition: "transform 0.5s ease-in-out",
                  }}
                >
                  <h3 className="text-white text-[20px] font-extrabold tracking-[-0.02em] mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    {card.label}
                  </h3>

                  <p
                    className="text-[14px] leading-[1.7] text-white/80 mb-4"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(20px)",
                      transition: isActive
                        ? "opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s"
                        : "opacity 0.2s ease, transform 0.2s ease",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {card.desc}
                  </p>

                  <div
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(16px)",
                      transition: isActive
                        ? "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s"
                        : "opacity 0.2s ease, transform 0.2s ease",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <Link
                      href={card.href}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold rounded-full px-4 py-2 hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: card.accent, color: "#fff" }}
                    >
                      İncele <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 sm:hidden">
          {serviceCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.id}
                href={card.href}
                className="relative overflow-hidden rounded-[24px] h-[220px] bg-cover bg-center bg-gray-800"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div
                  className={`absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-[10px] ${card.iconBg} shadow-md backdrop-blur-sm`}
                >
                  <Icon className={`h-4 w-4 ${card.iconColor}`} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white text-[17px] font-extrabold mb-1">{card.label}</h3>
                  <p className="text-[12px] text-white/75 leading-relaxed">{card.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SlideOne() {
  return (
    <div className="relative w-full h-full bg-[#FFEC9E] rounded-[48px] overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      {/* Entrepreneur */}
      <img
        src="/hero_male.png"
        alt="Kurucu"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] object-contain z-20"
      />

      {/* Floating UI: Compliance Checklist */}
      <motion.div 
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-10 left-6 z-10 w-[220px] md:w-[240px]"
      >
        <div className="bg-white/40 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded inline-block mb-2 text-[#8C7B38]">
          Uyum Kontrol Listesi
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex justify-between items-center group">
            <div>
              <p className="text-[10px] text-Work365-text/60 font-bold">31 Oca</p>
              <p className="text-xs font-bold">Bordro Bildirimi</p>
            </div>
            <button className="bg-[#9edfff] text-black text-[10px] font-bold px-3 py-1.5 rounded-full">Hemen Gönder</button>
          </div>
          <div className="border-t border-gray-50 pt-2 opacity-60">
             <p className="text-[10px] text-Work365-text/60 font-bold">15 Nis</p>
             <p className="text-xs font-bold">Kurumlar Vergisi Beyanı</p>
          </div>
        </div>
      </motion.div>

      {/* Floating UI: Monthly Revenue */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 10, y: -10 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-12 left-1/2 z-30 w-[220px] -translate-x-1/2 md:bottom-16"
      >
        <div className="bg-white rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
             <TrendingUp className="w-4 h-4 text-green-600" />
             <span className="text-xs font-bold tracking-tight">Aylık Gelir Özeti</span>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between text-[10px]">
                <span className="font-bold text-Work365-text/60">e-Fatura Tahsilatı</span>
                <span className="font-bold text-green-600">+12.450 ₺</span>
             </div>
             <div className="flex justify-between text-[10px]">
                <span className="font-bold text-Work365-text/60">Danışmanlık Geliri</span>
                <span className="font-bold text-green-600">+8.200 ₺</span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SlideTwo() {
  return (
    <div className="relative w-full h-full bg-[#9edfff] rounded-[48px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      <img
        src="/hero_female.png"
        alt="Kurucu"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] object-contain z-20"
      />

      <motion.div 
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-10 left-6 z-10 w-[220px] md:w-[240px]"
      >
        <div className="bg-white/40 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded inline-block mb-2 text-[#0E4A6E]">
          Şirket Kuruluş Takibi
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-xl space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                 <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-green-600">Hesap Kurulumu</span>
           </div>
           <div className="flex items-center gap-3 pl-1">
              <div className="w-4 h-4 rounded-full border-2 border-yellow-500 flex items-center justify-center text-[8px] font-bold">2</div>
              <span className="text-xs font-bold">Kuruluş Başvurusu</span>
              <span className="ml-auto bg-yellow-100 text-yellow-700 text-[8px] px-2 py-0.5 rounded font-bold uppercase">Devam ediyor</span>
           </div>
           <div className="flex items-center gap-3 pl-1 opacity-40">
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center text-[8px] font-bold">3</div>
              <span className="text-xs font-bold">Şirket Tescili</span>
           </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 10, y: -10 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-12 left-1/2 z-30 w-[220px] -translate-x-1/2 md:bottom-16"
      >
        <div className="bg-white rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-4 h-4 rounded-full border-2 border-black" />
             <span className="text-xs font-bold">İşlemler</span>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold">Vergi Tahsilatı</span>
                <span className="font-bold">6.750 ₺ <span className="text-green-600 ml-1">Gelir</span></span>
             </div>
             <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold">Banka Aktarımı</span>
                <span className="font-bold">2.390 ₺ <span className="text-yellow-600 ml-1">Aktarım</span></span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
