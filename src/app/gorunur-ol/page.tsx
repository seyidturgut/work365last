import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe,
  Megaphone,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Görünür Ol | Work365",
  description:
    "Markayı tanıt, müşterine ulaş. Web sitesi ve sosyal medya yönetimiyle markanı dijitalde büyüt.",
};

const serviceCards = [
  {
    icon: Globe,
    title: "Web Sitesi",
    desc: "Kurumsal web sitesi tasarım, geliştirme ve bakımı. 20.000 TL'den başlayan kurulum fiyatlarıyla.",
    href: "/gorunur-ol/web-sitesi",
    cta: "Paketleri İncele",
    bg: "bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]",
    border: "border-[#BFDBFE]",
    accent: "#1b98d5",
    iconBg: "bg-[#DBEAFE]",
    points: ["Mobil uyumlu tasarım", "Temel & gelişmiş SEO", "Domain + SSL + Hosting dahil"],
  },
  {
    icon: Share2,
    title: "Sosyal Medya",
    desc: "İçerik üretimi, imaj yönetimi ve marka danışmanlığı. 15.000 TL/ay'dan başlayan paketler.",
    href: "/gorunur-ol/sosyal-medya",
    cta: "Paketleri İncele",
    bg: "bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]",
    border: "border-[#BFDBFE]",
    accent: "#1b98d5",
    iconBg: "bg-[#DBEAFE]",
    points: ["4–12 paylaşım/ay", "Marka danışmanlığı", "Aylık performans raporu"],
  },
];

export default function GorunurOlPage() {
  return (
    <main className="bg-[#FAFBFC] pt-[92px]">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-12">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#1b98d5] opacity-[0.07] blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#1b98d5] opacity-[0.05] blur-[80px]" />

        <div className="mx-auto max-w-[1230px]">
          <div className="relative rounded-[40px] bg-gradient-to-br from-[#EFF6FF] to-white px-8 py-10 md:px-12 md:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              {/* Left */}
              <div className="max-w-[720px]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1b98d5]/10 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1b98d5] ring-1 ring-black/5">
                  <Globe className="h-4 w-4" />
                  Görünür Ol
                </div>

                <h1 className="mt-7 text-[30px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[50px]">
                  Markayı tanıt,{" "}
                  <span className="text-[#1b98d5]">müşterine ulaş.</span>
                </h1>

                <p className="mt-6 max-w-[580px] text-[18px] leading-[1.8] text-[#475569]">
                  Web sitesi ve sosyal medya yönetimiyle markanı dijitalde büyüt. İki güçlü kanalı tek çatı altında yönet.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/iletisim"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#1b98d5] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_30px_#1b98d540] transition-all duration-300 hover:scale-[1.03] hover:bg-[#1580b3] hover:shadow-lg"
                  >
                    Ücretsiz Danış <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                  <a
                    href="#hizmetler"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] transition-all duration-300 hover:border-black/20 hover:shadow-md"
                  >
                    Hizmetleri Keşfet <ChevronRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Web Sitesi", "Sosyal Medya", "Uzman Ekip"].map((t) => (
                    <span key={t} className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#475569] ring-1 ring-black/8 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right – Hero image */}
              <div className="hidden items-end justify-center lg:flex">
                <div className="relative h-[380px] w-full overflow-hidden rounded-[32px]">
                  <Image src="/hero_female.png" alt="Görünür Ol" fill className="object-cover object-top" sizes="(max-width: 1280px) 50vw, 560px" priority />
                  <div className="absolute inset-0 rounded-[32px]" style={{ background: "linear-gradient(to top, #1b98d530 0%, transparent 60%)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HİZMETLER ─── */}
      <section id="hizmetler" className="px-6 py-16">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-12 max-w-[600px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">Hizmetler</p>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
              Dijitalde görünür olmanın iki yolu.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {serviceCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group rounded-[32px] border ${card.border} ${card.bg} p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                >
                  <div
                    className="mb-6 inline-flex rounded-[18px] p-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    <Icon className="h-8 w-8" style={{ color: card.accent }} />
                  </div>

                  <h2 className="text-[28px] font-extrabold tracking-[-0.03em] text-[#0F172A]">{card.title}</h2>
                  <p className="mt-3 text-[15px] leading-8 text-[#475569]">{card.desc}</p>

                  <ul className="mt-6 space-y-3">
                    {card.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-[14px] text-[#475569]">
                        <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: card.accent }} />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-bold text-white transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-lg"
                    style={{ backgroundColor: card.accent }}>
                    {card.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Roadmap – Reklam Yönetimi */}
          <div className="mt-6 rounded-[28px] border border-dashed border-black/15 bg-white p-10 opacity-70">
            <div className="flex items-center gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-black/5">
                <Megaphone className="h-7 w-7 text-black/30" />
              </div>
              <div>
                <div className="mb-1 flex items-center gap-3">
                  <h2 className="text-[22px] font-bold text-black/40">Reklam Yönetimi</h2>
                  <span className="rounded-full bg-[#FEF9C3] px-3 py-1 text-[11px] font-bold text-[#854D0E]">Yakında</span>
                </div>
                <p className="text-[14px] text-black/40">Google Ads, Meta Ads ve dijital reklam kampanya yönetimi — çok yakında.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-16 pt-4">
        <div
          className="relative mx-auto max-w-[1230px] overflow-hidden rounded-[40px] px-8 py-14 text-white md:px-12"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1b98d5cc 100%)" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#1b98d5] opacity-20 blur-[60px]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full bg-white opacity-10 blur-[40px]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[640px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/60">Görünür Ol</p>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-white md:text-[44px]">
                Dijitalde görünür olmaya hazır mısın?
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-white/70">
                Uzman ekibimiz seni dinlesin, en uygun paketi birlikte belirleyelim.
              </p>
            </div>
            <Link
              href="/iletisim"
              className="group/cta inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              Ücretsiz Danış <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
