import Link from "next/link";
import { ChevronRight, Building2, Monitor, Globe, TrendingUp } from "lucide-react";

const cards = [
  {
    icon: Building2,
    label: "Şirketini Kur",
    desc: "Şahıs, Limited, Anonim veya Bilanço — 24 saat içinde kuruluş.",
    href: "/sirketini-kur",
    color: "bg-[#FFFBEB]",
    border: "border-[#FDE68A]",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
    accent: "text-[#D97706]",
  },
  {
    icon: Monitor,
    label: "Dijital Ofis",
    desc: "Microsoft 365, kurumsal e-posta, Teams ve help desk tek pakette.",
    href: "/dijitale-tasi",
    color: "bg-[#F0FDFA]",
    border: "border-[#99F6E4]",
    iconBg: "bg-[#CCFBF1]",
    iconColor: "text-[#0F766E]",
    accent: "text-[#0F766E]",
  },
  {
    icon: Globe,
    label: "Görünür Ol",
    desc: "Web sitesi ve sosyal medya yönetimiyle markanı dijitalde büyüt.",
    href: "/gorunur-ol",
    color: "bg-[#EFF6FF]",
    border: "border-[#BFDBFE]",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#1b98d5]",
    accent: "text-[#1b98d5]",
  },
  {
    icon: TrendingUp,
    label: "İşini Büyüt",
    desc: "Teşvik, hibe, yatırımcı erişimi ve uzman kiralama — ihtiyacın kadar.",
    href: "/buyut",
    color: "bg-[#F0FDF4]",
    border: "border-[#BBF7D0]",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    accent: "text-[#16A34A]",
  },
];

export default function JourneyCards() {
  return (
    <section className="px-6 py-20 max-w-[1230px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`group rounded-[24px] border ${card.border} ${card.color} p-7 flex flex-col gap-4 hover:shadow-md transition-all`}
            >
              <div className={`w-11 h-11 rounded-[14px] ${card.iconBg} flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-[17px] font-bold text-black mb-1.5">{card.label}</h3>
                <p className="text-[13px] text-black/60 leading-relaxed">{card.desc}</p>
              </div>
              <div className={`flex items-center gap-1 text-[13px] font-bold ${card.accent}`}>
                İncele
                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
