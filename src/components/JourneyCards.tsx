"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Monitor, Globe, TrendingUp, ArrowRight } from "lucide-react";

const cards = [
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
    href: "/dijitale-tasi",
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

export default function JourneyCards() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="px-6 py-16 max-w-[1230px] mx-auto">
      {/* Section header */}
      <div className="mb-8">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">
          Hizmetler
        </p>
        <h2 className="mt-3 text-[28px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[36px]">
          İhtiyacına uygun çözümü seç.
        </h2>
      </div>

      {/* Desktop: expandable horizontal cards */}
      <div className="hidden sm:flex gap-3 h-[420px]">
        {cards.map((card, i) => {
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
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Icon badge */}
              <div
                className={`absolute top-5 left-5 flex h-10 w-10 items-center justify-center rounded-[12px] ${card.iconBg} shadow-md backdrop-blur-sm transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-70"
                }`}
              >
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>

              {/* Dikey başlık — sadece pasif kartlarda */}
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

              {/* Text block — aktif kartda aşağıdan kayar */}
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

                {/* Description */}
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

                {/* CTA */}
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
                    onClick={(e) => e.stopPropagation()}
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

      {/* Mobile: vertical stack */}
      <div className="flex flex-col gap-4 sm:hidden">
        {cards.map((card) => {
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
    </section>
  );
}
