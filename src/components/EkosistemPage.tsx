"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BillingToggle from "@/components/pricing/BillingToggle";
import PricingValue from "@/components/pricing/PricingValue";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe,
  Laptop,
  Megaphone,
  Monitor,
  Palette,
  Rocket,
  Server,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import { buildPackageSignupHref, calculateSavingsPercent } from "@/lib/pricing";

/* ─── DATA ─── */

const m1Plans = [
  {
    range: "0–10 Kullanıcı",
    monthly: "10.000 TL",
    yearly: "8.500 TL",
    features: [
      "Kurulum + M365 lisans",
      "Kurumsal e-posta + Teams",
      "OneDrive + MFA",
      "Teknik destek",
    ],
    popular: false,
  },
  {
    range: "10–50 Kullanıcı",
    monthly: "15.000 TL",
    yearly: "12.750 TL",
    features: [
      "Tüm 0-10 özellikleri",
      "Exchange politikaları",
      "SharePoint",
      "Güvenlik raporu",
    ],
    popular: true,
  },
  {
    range: "50–299 Kullanıcı",
    monthly: "20.000 TL",
    yearly: "17.000 TL",
    features: [
      "Tüm 10-50 özellikleri",
      "Yedekleme izleme",
      "Dedicated teknik destek",
    ],
    popular: false,
  },
  {
    range: "300+ Kullanıcı",
    monthly: "30.000 TL",
    yearly: "25.500 TL",
    features: [
      "Tüm 50-299 özellikleri",
      "Enterprise SLA",
      "Dedicated account manager",
    ],
    popular: false,
  },
];

const m2Plans = [
  {
    name: "Serbest Meslek",
    setup: "12.000 TL",
    monthly: "500 TL/ay",
    features: [
      "Hazır şablon · 5 sayfa",
      "Domain/SSL 1Y",
      "Mobil uyumlu",
      "Analytics",
    ],
    popular: false,
  },
  {
    name: "Özelleştirilmiş WP",
    setup: "24.000 TL",
    monthly: "1.000 TL/ay",
    features: [
      "Özel tasarım · 10 sayfa + Blog",
      "SEO temel",
      "CRM bağlantısı",
      "2 revizyon",
    ],
    popular: true,
  },
  {
    name: "KOBİ Performans",
    setup: "50.000 TL",
    monthly: "5.000 TL/ay",
    features: [
      "Tam özel · Blog + SEO audit",
      "Ads entegrasyon",
      "CRO",
      "Performans dashboard",
    ],
    popular: false,
  },
];

const m3Plans = [
  {
    name: "Başlangıç",
    price: "15.000 TL/ay",
    weekly: "1 Post + Story",
    features: ["Özel günler", "Aylık rapor", "Work365'ten onay"],
    popular: false,
  },
  {
    name: "Büyüme",
    price: "25.000 TL/ay",
    weekly: "2 Post + Story",
    features: ["Özel günler", "Aylık rapor", "Work365'ten onay"],
    popular: true,
  },
  {
    name: "Pro",
    price: "35.000 TL/ay",
    weekly: "3 Post + Reels",
    features: ["Özel günler", "Aylık rapor", "Work365'ten onay"],
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Teklif",
    weekly: "Özel plan",
    features: ["Özel günler", "Aylık rapor", "Work365'ten onay"],
    popular: false,
    isCustom: true,
  },
];

/* ─── COMPONENTS ─── */

function SectionTag({ children, color = "#7C3AED" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color }}>
      {children}
    </p>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-[26px] bg-white px-7 py-6 shadow-sm ring-1 ring-black/6 transition-all duration-300 hover:shadow-md"
      style={{ borderLeft: open ? "3px solid #7C3AED" : "3px solid transparent" }}
    >
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-left">
        <span className="pr-4 text-[17px] font-bold text-black">{question}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-black/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "400px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="pt-4 text-[15px] leading-8 text-black/68">{answer}</p>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */

export default function EkosistemPage() {
  const [m1Period, setM1Period] = useState<"monthly" | "yearly">("yearly");
  const savingsLabel = `~%${calculateSavingsPercent(m1Plans[0].monthly, m1Plans[0].yearly)} tasarruf`;

  return (
    <main className="bg-white pt-[92px]">
      <Header />
      <Breadcrumb items={[{ label: "Ekosistem", href: "/ekosistem" }]} />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-14">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#7C3AED] opacity-[0.06] blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#1B98D5] opacity-[0.04] blur-[80px]" />

        <div className="mx-auto max-w-[1230px]">
          <div className="relative rounded-[40px] bg-gradient-to-br from-[#F5F0FF] to-white px-8 py-12 md:px-12 md:py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-[720px]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED12] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#7C3AED] ring-1 ring-[#7C3AED]/10">
                  <Rocket className="h-4 w-4" />
                  Work365 Ekosistemi
                </div>

                <h1 className="mt-7 text-[30px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[50px]">
                  İşletmenizi büyütecek tüm modüller tek platformda.
                </h1>

                <p className="mt-6 max-w-[620px] text-[18px] leading-[1.8] text-[#475569]">
                  Dijital ofis, kurumsal web sitesi ve sosyal medya yönetimi — şirketinizin ihtiyacına göre modüler olarak ekleyin.
                  Work365 güvencesiyle Türkiye&apos;nin lider operasyonel ortaklarından hizmet alın.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#m1"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#7C3AED] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_30px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                  >
                    <span className="flex items-center gap-2">
                      Modül Seçin <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </a>
                  <a
                    href="#m1"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] transition-all duration-300 hover:border-black/20 hover:shadow-md"
                  >
                    Modülleri İncele
                  </a>
                </div>
              </div>

              {/* Floating highlights */}
              <div className="hidden flex-col justify-center gap-4 lg:flex">
                {[
                  { icon: Laptop, label: "Dijital Ofis & IT", value: "Microsoft 365" },
                  { icon: Globe, label: "Web & Dijital Varlık", value: "Profesyonel site" },
                  { icon: Megaphone, label: "Sosyal Medya", value: "İçerik yönetimi" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4 rounded-2xl bg-white/80 px-5 py-4 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED14]">
                      <stat.icon className="h-5 w-5 text-[#7C3AED]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/40">{stat.label}</p>
                      <p className="text-[16px] font-bold text-[#0F172A]">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OVERVIEW CARDS ─── */}
      <section className="px-6 py-14 bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1230px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 max-w-[720px]"
          >
            <SectionTag>Neden Work365 Ekosistemi?</SectionTag>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[44px]">
              Her modül bağımsız çalışır, birlikte güçlenir.
            </h2>
            <p className="mt-4 text-[17px] leading-8 text-[#64748B]">
              İhtiyacınız olan modülü seçin, işletmeniz büyüdükçe yeni modüller ekleyin. Tüm hizmetler Work365 panelinden yönetilir ve Türkiye&apos;nin güvenilir operasyonel ortaklarıyla sunulur.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Server, title: "M365 Altyapı", body: "Microsoft 365 lisansları, kurumsal e-posta, Teams ve OneDrive ile ekibinizi dijital ofise taşıyın.", color: "#1B98D5" },
              { icon: Shield, title: "Güvenlik & Uyum", body: "MFA, Exchange politikaları, yedekleme izleme ve güvenlik raporlarıyla verilerinizi koruyun.", color: "#15803D" },
              { icon: Palette, title: "Profesyonel Web", body: "SEO uyumlu, mobil responsive web siteleri ile markanızı dijitalde güçlü şekilde konumlandırın.", color: "#B37A08" },
              { icon: TrendingUp, title: "Büyüme Motoru", body: "Sosyal medya yönetimi, içerik üretimi ve performans analitiği ile markanızı büyütün.", color: "#7C3AED" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="group rounded-[24px] bg-white px-6 py-7 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="inline-flex rounded-[16px] p-3.5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${item.color}12` }}>
                    <Icon className="h-6 w-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="mt-5 text-[18px] font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-7 text-[#64748B]">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── M1: DİJİTAL OFİS & IT ─── */}
      <section id="m1" className="px-6 py-14 bg-white">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[720px]">
              <SectionTag color="#1B98D5">Dijital Ofis & IT Yönetimi</SectionTag>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[44px]">
                Microsoft 365 ile ekibinizi dijital ofise taşıyın.
              </h2>
              <p className="mt-4 text-[17px] leading-8 text-[#64748B]">
                Microsoft 365 Business lisansları dahil. Piri Dijital operasyonel güvencesi ile kurulum, destek ve yönetim tek elden sağlanır. Kullanıcı sayısına göre ölçeklenir.
              </p>
            </div>
            <BillingToggle yearly={m1Period === "yearly"} onChange={(value) => setM1Period(value ? "yearly" : "monthly")} savingsLabel={savingsLabel} />
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {m1Plans.map((plan) => (
              <div
                key={plan.range}
                className={`group relative rounded-[24px] bg-white px-6 py-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.popular
                    ? "ring-2 ring-[#1B98D5]/30 hover:ring-[#1B98D5]/50"
                    : "ring-1 ring-black/6 hover:ring-black/12"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-5 rounded-full bg-[#1B98D5] px-4 py-1.5 text-[11px] font-bold text-white shadow-md">
                    Popüler
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1B98D514]">
                    <Users className="h-5 w-5 text-[#1B98D5]" />
                  </div>
                  <p className="text-[15px] font-bold text-[#0F172A]">{plan.range}</p>
                </div>

                <div className="mt-5">
                  <PricingValue
                    currentPrice={m1Period === "monthly" ? plan.monthly : plan.yearly}
                    crossedPrice={m1Period === "yearly" ? plan.monthly : null}
                    suffix={m1Period === "yearly" ? "/ ay · KDV hariç · Yıllık" : "/ ay · KDV hariç · Aylık"}
                    priceClassName="text-[30px]"
                  />
                </div>

                <div className="mt-5 space-y-3">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <p className="text-[13px] leading-6 text-[#475569]">{feat}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={buildPackageSignupHref(`M365 ${plan.range}`, m1Period === "monthly" ? plan.monthly : plan.yearly, {
                    label: `M365 ${plan.range}`,
                    source: "Ekosistem sayfasından seçildi",
                    term: m1Period === "monthly" ? "Aylık plan" : "Yıllık plan",
                    description: "Microsoft 365 ile ekip e-posta, dosya paylaşımı ve toplantı akışını merkezi hale getirin.",
                    features: plan.features,
                  })}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-[13px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-[#1B98D5] text-white shadow-sm"
                      : "border border-black/10 text-[#0F172A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  Seç
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── M2: WEB SİTESİ & DİJİTAL VARLIK ─── */}
      <section id="m2" className="px-6 py-14 bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1230px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 max-w-[720px]"
          >
            <SectionTag color="#B37A08">Web Sitesi & Dijital Varlık</SectionTag>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[44px]">
              Profesyonel web sitenizi kurun, dijitalde güçlü bir şekilde var olun.
            </h2>
            <p className="mt-4 text-[17px] leading-8 text-[#64748B]">
              Work365 güvencesi + Beyincik İşleri operasyonu. Tek seferlik kurulum + aylık bakım modeli ile siteniz her zaman güncel, hızlı ve güvenli kalır.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {m2Plans.map((plan) => (
              <div
                key={plan.name}
                className={`group relative rounded-[28px] bg-white px-7 py-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.popular
                    ? "ring-2 ring-[#B37A08]/30 hover:ring-[#B37A08]/50"
                    : "ring-1 ring-black/6 hover:ring-black/12"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full bg-[#B37A08] px-4 py-1.5 text-[11px] font-bold text-white shadow-md">
                    <Sparkles className="h-3 w-3" /> Önerilen
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${plan.popular ? "bg-amber-50" : "bg-[#F1F5F9]"}`}>
                    <Globe className="h-5 w-5" style={{ color: plan.popular ? "#B37A08" : "#64748B" }} />
                  </div>
                  <p className="text-[18px] font-bold text-[#0F172A]">{plan.name}</p>
                </div>

                <div className="mt-6 flex items-end gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B]">Kurulum</p>
                    <p className="text-[28px] font-extrabold tracking-[-0.03em] text-[#0F172A]">{plan.setup}</p>
                  </div>
                  <div className="mb-1 text-[13px] text-[#64748B]">+</div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B]">Bakım</p>
                    <p className="text-[20px] font-bold tracking-[-0.02em] text-[#0F172A]">{plan.monthly}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <p className="text-[14px] leading-7 text-[#475569]">{feat}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/kayit-ol"
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-[#B37A08] text-white shadow-sm"
                      : "border border-black/10 text-[#0F172A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  Başvur <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── M3: SOSYAL MEDYA & İÇERİK ─── */}
      <section id="m3" className="px-6 py-14 bg-white">
        <div className="mx-auto max-w-[1230px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 max-w-[720px]"
          >
            <SectionTag color="#E11D48">Sosyal Medya & İçerik Yönetimi</SectionTag>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[44px]">
              Markanızı sosyal medyada profesyonelce büyütün.
            </h2>
            <p className="mt-4 text-[17px] leading-8 text-[#64748B]">
              Work365 arayüzünden onay — Lect Ajansı üretim. Tüm içerik yönetimi platform üzerinden yapılır; paylaşım takvimi, onay akışı ve raporlama tek yerden kontrol edilir.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {m3Plans.map((plan) => (
              <div
                key={plan.name}
                className={`group relative rounded-[24px] bg-white px-6 py-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.popular
                    ? "ring-2 ring-[#E11D48]/30 hover:ring-[#E11D48]/50"
                    : "ring-1 ring-black/6 hover:ring-black/12"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-5 inline-flex items-center gap-1.5 rounded-full bg-[#E11D48] px-4 py-1.5 text-[11px] font-bold text-white shadow-md">
                    <Sparkles className="h-3 w-3" /> Popüler
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${plan.popular ? "bg-rose-50" : "bg-[#F1F5F9]"}`}>
                    <Megaphone className="h-5 w-5" style={{ color: plan.popular ? "#E11D48" : "#64748B" }} />
                  </div>
                  <p className="text-[17px] font-bold text-[#0F172A]">{plan.name}</p>
                </div>

                <div className="mt-5">
                  <p className={`text-[28px] font-extrabold tracking-[-0.03em] ${plan.isCustom ? "text-[#7C3AED]" : "text-[#0F172A]"}`}>
                    {plan.price}
                  </p>
                </div>

                <div className="mt-4 rounded-xl bg-[#F8FAFC] px-3 py-2.5">
                  <p className="flex items-center gap-2 text-[13px] font-semibold text-[#475569]">
                    <Monitor className="h-4 w-4 text-[#E11D48]" />
                    Haftalık: {plan.weekly}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      <p className="text-[13px] text-[#475569]">{feat}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={plan.isCustom ? "/iletisim" : "/kayit-ol"}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[13px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-[#E11D48] text-white shadow-sm"
                      : plan.isCustom
                        ? "bg-[#7C3AED] text-white shadow-sm"
                        : "border border-black/10 text-[#0F172A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {plan.isCustom ? "Teklif Al" : "Seç"} {!plan.isCustom && <ArrowRight className="h-4 w-4" />}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="px-6 pb-14 pt-8 bg-[#F5F7FA]">
        <div className="mx-auto max-w-[860px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <SectionTag>Sık Sorulan Sorular</SectionTag>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
              Ekosistem modülleri hakkında merak edilenler
            </h2>
          </motion.div>

          <div className="space-y-4">
            <FaqItem
              question="Modülleri tek tek mi alıyorum yoksa paket olarak mı?"
              answer="Her modül bağımsızdır — sadece ihtiyacınız olan modülü seçebilirsiniz. Birden fazla modül aldığınızda tümü Work365 panelinden tek yerden yönetilir. Paket indirimi için satış ekibimizle iletişime geçebilirsiniz."
            />
            <FaqItem
              question="Dijital Ofis paketinde lisanslar dahil mi?"
              answer="Evet, tüm Dijital Ofis paketlerinde Microsoft 365 Business lisansları dahildir. Kurulum, kullanıcı yönetimi, e-posta konfigürasyonu ve teknik destek Piri Dijital operasyonel güvencesiyle sağlanır. Ek lisans veya gizli maliyet yoktur."
            />
            <FaqItem
              question="Web sitesi kurulumundan sonra değişiklik yapabilir miyim?"
              answer="Evet, aylık bakım paketiniz dahilinde içerik güncellemeleri yapılır. Özelleştirilmiş WP paketinde 2 revizyon, KOBİ Performans paketinde sınırsız revizyon hakkınız vardır. Ek yapısal değişiklikler için ayrı teklif sunulur."
            />
            <FaqItem
              question="Sosyal medya içeriklerini kim üretiyor?"
              answer="İçerik üretimi Work365'in stratejik ortağı Lect Ajansı tarafından yapılır. Tüm içerikler paylaşım öncesi Work365 paneli üzerinden onayınıza sunulur. Onay vermediğiniz hiçbir içerik paylaşılmaz."
            />
            <FaqItem
              question="Yıllık taahhütte indirim var mı?"
              answer="Dijital Ofis modülünde yıllık taahhütle %15'e varan indirim uygulanır. Diğer modüller için yıllık ödeme planları ve özel teklifler satış ekibimiz tarafından sunulabilir."
            />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-16 pt-4">
        <div className="relative mx-auto max-w-[1230px] overflow-hidden rounded-[40px] px-8 py-12 text-white md:px-12 md:py-14" style={{
          background: "linear-gradient(135deg, #0F172A 0%, #7C3AEDcc 100%)",
        }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#7C3AED] opacity-20 blur-[60px]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full bg-white opacity-[0.08] blur-[40px]" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[680px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/60">Hemen Başlayın</p>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-white md:text-[44px]">
                İşletmenizi büyütecek modülü seçin, hemen başlayın.
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-white/70">
                Dijital ofis, web sitesi veya sosyal medya — ihtiyacınıza uygun modülü Work365 panelinden aktif edin ve profesyonel desteğe hemen erişin.
              </p>
            </div>

            <Link
              href="/kayit-ol"
              className="group/cta inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              Kayıt Ol <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
