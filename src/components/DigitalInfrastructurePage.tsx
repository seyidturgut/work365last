"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  FileSignature,
  Lock,
  Mail,
  Package,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import { buildPackageSignupHref } from "@/lib/pricing";

/* ─── DATA ─── */

const eImzaPlans = [
  {
    duration: "1 Yıl",
    price: "2.300 TL",
    monthly: "~192 TL/ay",
    savings: null,
    tag: "Başlangıç",
    tagColor: "#1B98D5",
  },
  {
    duration: "3 Yıl",
    price: "4.600 TL",
    monthly: "~128 TL/ay",
    savings: "1.300 TL Tasarruf",
    tag: "En İyi Değer",
    tagColor: "#15803D",
  },
];

const kepPlans = [
  {
    name: "0 Kontör",
    featured: true,
    price1Y: "520 TL",
    price3Y: "1.215 TL",
    extraAuth: "+99 TL",
    target: "Sadece tebligat almak — erken evre",
  },
  {
    name: "20 Kontör",
    featured: true,
    price1Y: "855 TL",
    price3Y: "1.550 TL",
    extraAuth: "+99 TL",
    target: "Standart girişimci — ~20 gönderim/yıl",
  },
  {
    name: "50 Kontör",
    featured: false,
    price1Y: "1.149 TL",
    price3Y: "1.844 TL",
    extraAuth: "+99 TL",
    target: "Aktif hukuki yazışma",
  },
  {
    name: "100 Kontör",
    featured: false,
    price1Y: "1.779 TL",
    price3Y: "2.474 TL",
    extraAuth: "+99 TL",
    target: "Büyüyen şirket",
  },
  {
    name: "250–1000 Kontör",
    featured: false,
    price1Y: "3.650–12.870",
    price3Y: "4.345–13.565",
    extraAuth: "+99 TL",
    target: "KOBİ / Kurumsal / Özel teklif",
  },
];

const bundlePlans = [
  {
    name: "e-İmza + KEP Başlangıç",
    subtitle: "0 kontör dahil",
    price1Y: "2.820 TL",
    price3Y: "5.815 TL",
    uxValue: "Tek form + tek aktivasyon — dönüşüm artışı",
    popular: false,
  },
  {
    name: "e-İmza + KEP Standart",
    subtitle: "20 kontör dahil",
    price1Y: "3.155 TL",
    price3Y: "6.150 TL",
    uxValue: "Aktif yazışmalı şirket için tam paket",
    popular: true,
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Hukuki Geçerlilik",
    body: "e-İmza ile attığınız imza, ıslak imza ile aynı yasal geçerliliğe sahiptir. 5070 sayılı Elektronik İmza Kanunu kapsamında tanınır.",
  },
  {
    icon: Mail,
    title: "Resmi Yazışma Altyapısı",
    body: "KEP ile gönderdiğiniz her mesaj taahhütlü mektup hükmündedir. İçerik değişikliği yapılamaz, teslim zamanı kayıt altına alınır.",
  },
  {
    icon: Lock,
    title: "E-Devlet Entegrasyonu",
    body: "e-İmza ile e-Devlet, MERSIS, GİB portali, SGK ve birçok resmi kurum portalına güvenli giriş yapabilirsiniz.",
  },
  {
    icon: Zap,
    title: "Hızlı Aktivasyon",
    body: "Work365 üzerinden başvurunuzu tamamlayın, e-İmza ve KEP hesabınız aynı gün aktif edilsin. Kargo veya randevu beklemeyin.",
  },
];

/* ─── COMPONENTS ─── */

function SectionTag({ children, color = "#1B98D5" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color }}>
      {children}
    </p>
  );
}

function PricingToggle({ active, onToggle }: { active: "1y" | "3y"; onToggle: (v: "1y" | "3y") => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[#F1F5F9] p-1">
      <button
        onClick={() => onToggle("1y")}
        className={`rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-300 ${
          active === "1y" ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]"
        }`}
      >
        1 Yıl
      </button>
      <button
        onClick={() => onToggle("3y")}
        className={`rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-300 ${
          active === "3y" ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]"
        }`}
      >
        3 Yıl
        <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
          Tasarruf
        </span>
      </button>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-[26px] bg-white px-7 py-6 shadow-sm ring-1 ring-black/6 transition-all duration-300 hover:shadow-md"
      style={{ borderLeft: open ? "3px solid #1B98D5" : "3px solid transparent" }}
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

export default function DigitalInfrastructurePage() {
  const [kepPeriod, setKepPeriod] = useState<"1y" | "3y">("1y");
  const [bundlePeriod, setBundlePeriod] = useState<"1y" | "3y">("1y");

  return (
    <main className="bg-white pt-[92px]">
      <Header />
      <Breadcrumb items={[{ label: "Dijital Altyapı", href: "/digital-altyapi" }]} />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-14">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#1B98D5] opacity-[0.06] blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#7C3AED] opacity-[0.04] blur-[80px]" />

        <div className="mx-auto max-w-[1230px]">
          <div className="relative rounded-[40px] bg-gradient-to-br from-[#EEF7FF] to-white px-8 py-12 md:px-12 md:py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-[720px]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1B98D512] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1B98D5] ring-1 ring-[#1B98D5]/10">
                  <FileSignature className="h-4 w-4" />
                  Dijital Altyapı
                </div>

                <h1 className="mt-7 text-[30px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[50px]">
                  Şirketinizin dijital kimliğini tek adımda oluşturun.
                </h1>

                <p className="mt-6 max-w-[620px] text-[18px] leading-[1.8] text-[#475569]">
                  e-İmza, KEP hesabı ve e-Dönüşüm altyapınızı Work365 üzerinden başvurun; aynı gün aktif edilsin.
                  Türkiye&apos;deki tüm resmi işlemleriniz için yasal geçerliliğe sahip dijital imza ve güvenli elektronik posta altyapısı.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/kayit-ol"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#1B98D5] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_30px_rgba(27,152,213,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                  >
                    <span className="flex items-center gap-2">
                      Hemen Başvur <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Link>
                  <a
                    href="#paketler"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] transition-all duration-300 hover:border-black/20 hover:shadow-md"
                  >
                    Paketleri İncele
                  </a>
                </div>
              </div>

              {/* Floating highlights */}
              <div className="hidden flex-col justify-center gap-4 lg:flex">
                {[
                  { icon: BadgeCheck, label: "Yasal Geçerlilik", value: "5070 Sayılı Kanun" },
                  { icon: Zap, label: "Aktivasyon", value: "Aynı Gün" },
                  { icon: Package, label: "Paket", value: "e-İmza + KEP" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4 rounded-2xl bg-white/80 px-5 py-4 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B98D514]">
                      <stat.icon className="h-5 w-5 text-[#1B98D5]" />
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

      {/* ─── BENEFITS ─── */}
      <section className="px-6 py-14 bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1230px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 max-w-[720px]"
          >
            <SectionTag>Neden Dijital Altyapı?</SectionTag>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[44px]">
              Türkiye&apos;de resmi işlem yapmanın dijital yolu.
            </h2>
            <p className="mt-4 text-[17px] leading-8 text-[#64748B]">
              e-İmza ve KEP, Türkiye&apos;deki her şirketin resmi dijital kimliğidir. Vergi dairesi, SGK, e-Devlet ve mahkeme süreçlerinde yasal geçerliliğe sahip tek dijital araçlardır.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((item, i) => {
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
                  <div className="inline-flex rounded-[16px] bg-[#EEF7FF] p-3.5 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-[#1B98D5]" />
                  </div>
                  <h3 className="mt-5 text-[18px] font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-7 text-[#64748B]">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── e-İMZA ─── */}
      <section id="paketler" className="px-6 py-14 bg-white">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-10 max-w-[720px]">
            <SectionTag>e-İmza — E-Tuğra Nitelikli</SectionTag>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[44px]">
              Nitelikli Elektronik Sertifika ile güvenli imzalayın.
            </h2>
            <p className="mt-4 text-[17px] leading-8 text-[#64748B]">
              E-Tuğra nitelikli elektronik sertifika ile e-Devlet, MERSIS, GİB ve tüm resmi portallara giriş yapın; sözleşme, beyanname ve dilekçelerinizi yasal geçerlilikte imzalayın.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {eImzaPlans.map((plan) => (
              <div
                key={plan.duration}
                className={`group relative rounded-[28px] bg-white px-7 py-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.savings
                    ? "ring-2 ring-[#15803D]/30 hover:ring-[#15803D]/50"
                    : "ring-1 ring-black/6 hover:ring-black/12"
                }`}
              >
                {plan.savings && (
                  <div className="absolute -top-3 right-6 rounded-full bg-emerald-500 px-4 py-1.5 text-[12px] font-bold text-white shadow-md">
                    {plan.savings}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${plan.tagColor}14` }}
                  >
                    <FileSignature className="h-5 w-5" style={{ color: plan.tagColor }} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: plan.tagColor }}>{plan.tag}</p>
                    <p className="text-[15px] font-bold text-[#0F172A]">{plan.duration}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <p className="text-[40px] font-extrabold tracking-[-0.04em] text-[#0F172A]">{plan.price}</p>
                </div>
                <p className="mt-1 text-[14px] text-[#64748B]">{plan.monthly}</p>

                <div className="mt-6 space-y-3">
                  {[
                    "E-Tuğra Nitelikli Elektronik Sertifika",
                    "e-Devlet, MERSIS, GİB portal girişi",
                    "Sözleşme ve beyanname imzalama",
                    "USB token ile güvenli kullanım",
                    "Aynı gün kargo ile teslimat",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      <p className="text-[14px] text-[#475569]">{item}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={buildPackageSignupHref(`e-İmza ${plan.duration}`, plan.price, {
                    label: `e-İmza ${plan.duration}`,
                    source: "Dijital Altyapı sayfasından seçildi",
                    term: `${plan.duration} paket`,
                    description: "Nitelikli elektronik sertifika ile resmi giriş, beyanname ve sözleşme imza süreçlerini başlatın.",
                    features: [
                      "E-Tuğra Nitelikli Elektronik Sertifika",
                      "e-Devlet, MERSIS, GİB portal girişi",
                      "Sözleşme ve beyanname imzalama",
                      "USB token ile güvenli kullanım",
                    ],
                  })}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: plan.savings ? plan.tagColor : "transparent",
                    color: plan.savings ? "white" : "#0F172A",
                    border: plan.savings ? "none" : "1px solid rgba(0,0,0,0.12)",
                  }}
                >
                  Başvur <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KEP ─── */}
      <section className="px-6 py-14 bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[720px]">
              <SectionTag color="#B37A08">KEP — Kayıtlı Elektronik Posta</SectionTag>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[44px]">
                Resmi yazışmalarınız için yasal geçerlilikte e-posta.
              </h2>
              <p className="mt-4 text-[17px] leading-8 text-[#64748B]">
                KEP, taahhütlü mektup hükmünde yasal geçerliliğe sahip elektronik posta sistemidir. Vergi dairesi tebligatları, SGK bildirimleri ve resmi yazışmalarınız için zorunludur.
              </p>
            </div>
            <PricingToggle active={kepPeriod} onToggle={setKepPeriod} />
          </div>

          {/* KEP cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {kepPlans.map((plan) => (
              <div
                key={plan.name}
                className={`group relative rounded-[24px] bg-white px-5 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  plan.featured
                    ? "ring-2 ring-[#B37A08]/30 hover:ring-[#B37A08]/50"
                    : "ring-1 ring-black/6 hover:ring-black/12"
                }`}
              >
                {plan.featured && (
                  <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700">
                    <Star className="h-3 w-3" /> Work365 Ön Seçili
                  </div>
                )}

                <h3 className="text-[17px] font-bold text-[#0F172A]">{plan.name}</h3>

                <div className="mt-4">
                  <p className="text-[28px] font-extrabold tracking-[-0.03em] text-[#0F172A]">
                    {kepPeriod === "1y" ? plan.price1Y : plan.price3Y}
                  </p>
                  <p className="mt-1 text-[13px] text-[#64748B]">
                    {kepPeriod === "1y" ? "1 yıllık" : "3 yıllık"} · 1 yetkili
                  </p>
                </div>

                <div className="mt-4 rounded-xl bg-[#F8FAFC] px-3 py-2.5">
                  <p className="text-[12px] font-semibold text-[#64748B]">Ek yetkili: {plan.extraAuth}/kişi</p>
                </div>

                <p className="mt-4 text-[13px] leading-6 text-[#475569]">{plan.target}</p>

                <Link
                  href={buildPackageSignupHref(`KEP ${plan.name}`, kepPeriod === "1y" ? plan.price1Y : plan.price3Y, {
                    label: `KEP ${plan.name}`,
                    source: "Dijital Altyapı sayfasından seçildi",
                    term: kepPeriod === "1y" ? "1 yıllık paket" : "3 yıllık paket",
                    description: plan.target,
                    features: [
                      `${kepPeriod === "1y" ? "1 yıllık" : "3 yıllık"} kullanım`,
                      "1 yetkili",
                      `Ek yetkili: ${plan.extraAuth}/kişi`,
                    ],
                  })}
                  className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-[13px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                    plan.featured
                      ? "bg-[#B37A08] text-white shadow-sm"
                      : "border border-black/10 bg-transparent text-[#0F172A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  Seç
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUNDLE ─── */}
      <section className="px-6 py-14 bg-white">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[720px]">
              <SectionTag color="#7C3AED">Dijital Altyapı Paketi — Bundle</SectionTag>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[44px]">
                e-İmza + KEP&apos;i birlikte alın, hem tasarruf edin hem zaman kazanın.
              </h2>
              <p className="mt-4 text-[17px] leading-8 text-[#64748B]">
                Tek başvuru formu, tek aktivasyon süreci. e-İmza ve KEP hesabınızı ayrı ayrı başvurmadan dijital altyapı paketinizi hemen kurun.
              </p>
            </div>
            <PricingToggle active={bundlePeriod} onToggle={setBundlePeriod} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {bundlePlans.map((plan) => (
              <div
                key={plan.name}
                className={`group relative rounded-[28px] bg-white px-7 py-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.popular
                    ? "ring-2 ring-[#7C3AED]/30 hover:ring-[#7C3AED]/50"
                    : "ring-1 ring-black/6 hover:ring-black/12"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full bg-[#7C3AED] px-4 py-1.5 text-[12px] font-bold text-white shadow-md">
                    <Sparkles className="h-3 w-3" /> Önerilen
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${plan.popular ? "bg-[#F0E7FF]" : "bg-[#F1F5F9]"}`}>
                    <Package className="h-5 w-5" style={{ color: plan.popular ? "#7C3AED" : "#1B98D5" }} />
                  </div>
                  <div>
                    <p className="text-[18px] font-bold text-[#0F172A]">{plan.name}</p>
                    <p className="text-[13px] text-[#64748B]">{plan.subtitle}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <p className="text-[40px] font-extrabold tracking-[-0.04em] text-[#0F172A]">
                    {bundlePeriod === "1y" ? plan.price1Y : plan.price3Y}
                  </p>
                  <p className="mb-2 text-[14px] text-[#64748B]">
                    / {bundlePeriod === "1y" ? "1 yıl" : "3 yıl"}
                  </p>
                </div>

                <div className="mt-5 rounded-xl bg-[#F8FAFC] px-4 py-3">
                  <p className="flex items-center gap-2 text-[13px] font-semibold text-[#475569]">
                    <Sparkles className="h-4 w-4 text-[#7C3AED]" />
                    {plan.uxValue}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "E-Tuğra Nitelikli e-İmza (USB Token)",
                    `KEP hesabı (${plan.subtitle})`,
                    "e-Devlet, MERSIS, GİB entegrasyonu",
                    "Tek form ile başvuru",
                    "Aynı gün aktivasyon",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      <p className="text-[14px] text-[#475569]">{item}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={buildPackageSignupHref(plan.name, bundlePeriod === "1y" ? plan.price1Y : plan.price3Y, {
                    label: plan.name,
                    source: "Dijital Altyapı sayfasından seçildi",
                    term: bundlePeriod === "1y" ? "1 yıllık bundle" : "3 yıllık bundle",
                    description: plan.uxValue,
                    features: [
                      "E-Tuğra Nitelikli e-İmza (USB Token)",
                      `KEP hesabı (${plan.subtitle})`,
                      "e-Devlet, MERSIS, GİB entegrasyonu",
                      "Tek form ile başvuru",
                    ],
                  })}
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-[#7C3AED] text-white shadow-[0_8px_30px_rgba(124,58,237,0.3)]"
                      : "border border-black/10 text-[#0F172A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  Paketi Seç <ArrowRight className="h-4 w-4" />
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
              Dijital Altyapı hakkında merak edilenler
            </h2>
          </motion.div>

          <div className="space-y-4">
            <FaqItem
              question="e-İmza nedir ve neden gereklidir?"
              answer="e-İmza (Nitelikli Elektronik Sertifika), 5070 sayılı Elektronik İmza Kanunu kapsamında ıslak imza ile eşdeğer yasal geçerliliğe sahip dijital imzadır. e-Devlet girişi, MERSIS işlemleri, vergi beyannamesi gönderimi, sözleşme imzalama ve birçok resmi işlem için zorunludur. Türkiye'de şirket kuran herkesin e-İmza'ya ihtiyacı vardır."
            />
            <FaqItem
              question="KEP hesabı zorunlu mu?"
              answer="Evet, Türkiye'de tüm sermaye şirketleri (limited ve anonim) KEP hesabı açmak zorundadır. Şahıs şirketleri için henüz zorunlu olmamakla birlikte, vergi dairesi tebligatlarını dijital ortamda alabilmek ve resmi yazışma yapabilmek için KEP hesabı önerilir. KEP ile gönderilen mesajlar taahhütlü mektup hükmündedir."
            />
            <FaqItem
              question="Kontör ne işe yarıyor?"
              answer="KEP kontörü, KEP hesabınızdan gönderdiğiniz her mesaj için harcanan birimdir. 0 kontörlü pakette sadece gelen tebligatları okuyabilirsiniz. 20 kontör yılda ortalama 20 resmi mesaj göndermek isteyen standart girişimciler için yeterlidir. Daha fazla yazışma yapan şirketler 50 veya 100 kontörlük paketleri tercih edebilir."
            />
            <FaqItem
              question="Bundle paket almanın avantajı nedir?"
              answer="e-İmza ve KEP'i ayrı ayrı başvurmak yerine bundle olarak aldığınızda tek form doldurursunuz, tek aktivasyon süreci yaşarsınız ve toplam maliyette tasarruf edersiniz. Örneğin e-İmza + KEP Başlangıç paketi ile 1 yılda ayrı ayrı almanıza göre daha hızlı ve daha uygun fiyatla başlarsınız."
            />
            <FaqItem
              question="Ek yetkili ne demek?"
              answer="KEP hesabınıza varsayılan olarak 1 yetkili (kullanıcı) dahildir. Şirketinizde birden fazla kişinin KEP hesabına erişmesi gerekiyorsa, her ek yetkili için 99 TL ödeyerek kullanıcı ekleyebilirsiniz. Bu özellikle muhasebeci, ortak veya operasyon yöneticisi gibi farklı roller için kullanışlıdır."
            />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-16 pt-4">
        <div className="relative mx-auto max-w-[1230px] overflow-hidden rounded-[40px] px-8 py-12 text-white md:px-12 md:py-14" style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1B98D5cc 100%)",
        }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#1B98D5] opacity-20 blur-[60px]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full bg-white opacity-[0.08] blur-[40px]" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[680px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/60">Hemen Başlayın</p>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-white md:text-[44px]">
                Dijital altyapınızı bugün kurun, yarın resmi işlemlerinize başlayın.
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-white/70">
                e-İmza ve KEP hesabınızı tek başvuruyla açın. Aynı gün aktivasyon ile e-Devlet, GİB ve tüm resmi portallara erişim sağlayın.
              </p>
            </div>

            <Link
              href="/kayit-ol"
              className="group/cta inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              Başvuruya Başla <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
