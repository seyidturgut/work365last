"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 max-w-[1230px] mx-auto min-h-screen flex flex-col justify-center">
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
            Şirketini kur,{" "}
            <span className="text-[#1b98d5]">her yerden yönet.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-Work365-text mb-10 max-w-[520px] font-normal leading-relaxed">
            Şirket kuruluşundan dijital ofise, muhasebeden yatırımcı erişimine — ihtiyacın olan her şey tek platformda.
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
