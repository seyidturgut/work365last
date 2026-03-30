"use client";

import { motion } from "framer-motion";
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
    <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(27,152,213,0.08),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(17,24,39,0.04),_transparent_32%)] pt-40 pb-18">
      <div className="px-6 max-w-[1230px] mx-auto">
        <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[33rem] lg:pb-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 mb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
              <span className="text-[13px] font-bold tracking-wide text-black">Kur. Yönet. Tanıt. Büyüt.</span>
            </div>

            <h1 className="max-w-[11ch] text-[50px] font-bold tracking-[-0.06em] leading-[0.98] text-black md:text-[68px]">
              Şirketini kur, <span className="text-[#1b98d5]">her yerden yönet.</span>
            </h1>

            <p className="mt-7 max-w-[30rem] text-[19px] leading-[1.7] text-Work365-text md:text-[21px]">
              Şirket kuruluşundan dijital ofise, muhasebeden yatırımcı erişimine — ihtiyacın olan her şey tek
              platformda.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/sirketini-kur"
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full text-[15px] font-bold transition-colors flex items-center justify-center gap-2 shadow-[0_18px_50px_rgba(15,23,42,0.18)]"
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

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
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

          <ServicesRail />
        </div>
      </div>
    </section>
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
    <div className="min-w-0">
      <div
        className="hidden sm:flex gap-4 h-[430px] lg:h-[500px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
          {serviceCards.map((card, i) => {
            const Icon = card.icon;
            const isActive = i === activeIdx;

            return (
              <div
                key={card.id}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setActiveIdx(i)}
                className="relative overflow-hidden rounded-[32px] cursor-pointer bg-cover bg-center bg-gray-800 shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
                style={{
                  backgroundImage: `url(${card.image})`,
                  flex: isActive ? "3.2" : "0.95",
                  transition: "flex 0.5s ease-in-out",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/26 to-white/5" />

                <div
                  className={`absolute top-5 left-5 flex h-11 w-11 items-center justify-center rounded-[14px] ${card.iconBg} shadow-md backdrop-blur-sm transition-opacity duration-500 ${
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
                  className="absolute bottom-0 left-0 right-0 p-7"
                  style={{
                    transform: isActive ? "translateY(0)" : "translateY(100%)",
                    transition: "transform 0.5s ease-in-out",
                  }}
                >
                  <h3 className="text-white text-[22px] font-extrabold tracking-[-0.03em] mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    {card.label}
                  </h3>

                  <p
                    className="text-[14px] leading-[1.7] text-white/82 mb-5 max-w-[28rem]"
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

      <div className="flex flex-col gap-4 sm:hidden mt-10">
        {serviceCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.id}
              href={card.href}
              className="relative overflow-hidden rounded-[26px] h-[230px] bg-cover bg-center bg-gray-800 shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
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
  );
}
