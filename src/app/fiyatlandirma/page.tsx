"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  Building2,
  Laptop,
  TrendingUp,
  Zap,
  Sparkles,
} from "lucide-react";
import DijitalOfisPlans from "@/components/pricing/DijitalOfisPlans";
import GorunurOlPlans from "@/components/pricing/GorunurOlPlans";
import IsIniBuyutSection from "@/components/pricing/IsIniBuyutSection";
import TekSeferlikUrunler from "@/components/pricing/TekSeferlikUrunler";

// ─── Şirketini Kur ───────────────────────────────────────────────────────────
const tierFeatures: Record<string, string[]> = {
  Kur: [
    "Şirket kuruluşu (tescil, ana sözleşme, sicil)",
    "e-İmza (1 yıl)",
    "Sanal ofis (1 yıl)",
    "e-Dönüşüm aktivasyonu (e-fatura, e-arşiv)",
    "Online muhasebe danışmanlığı",
    "Ön muhasebe",
    "Dijital asistan (hibrit AI + insan)",
    "Marka tescil analizi + teşvik ön analizi",
    "2.400 belge/yıl",
  ],
  "Kur & Yönet": [
    "Kur paketindeki her şey",
    "Microsoft 365 Başlangıç lisansı",
    "Kurumsal e-posta + Microsoft Teams",
    "OneDrive & SharePoint depolama",
    "IT yönetim & destek hattı",
  ],
  "Kur & Büyüt": [
    "Kur & Yönet paketindeki her şey",
    "Web sitesi veya sosyal medya yönetimi",
    "Görünür Ol dijital varlık paketi",
    "İşini Büyüt danışmanlık erişimi",
    "Teşvik, hibe ve yatırımcı desteği",
  ],
};

const companyTypes = [
  {
    id: "sahis",
    name: "Şahıs Şirketi",
    badge: "Hızlı Başlangıç",
    accent: "#D97706",
    href: "/sirketini-kur/sahis-sirketi",
    packages: [
      { name: "Kur", monthlyPrice: "5.900", yearlyPrice: "3.200", popular: false },
      { name: "Kur & Yönet", monthlyPrice: "15.900", yearlyPrice: "13.200", popular: true },
      { name: "Kur & Büyüt", monthlyPrice: "Teklif", yearlyPrice: "Teklif", popular: false },
    ],
  },
  {
    id: "limited",
    name: "Limited Şirketi",
    badge: "En Dengeli",
    accent: "#1b98d5",
    href: "/sirketini-kur/limited-sirketi",
    packages: [
      { name: "Kur", monthlyPrice: "9.900", yearlyPrice: "5.400", popular: false },
      { name: "Kur & Yönet", monthlyPrice: "19.900", yearlyPrice: "15.400", popular: true },
      { name: "Kur & Büyüt", monthlyPrice: "Teklif", yearlyPrice: "Teklif", popular: false },
    ],
  },
  {
    id: "anonim",
    name: "Anonim Şirketi",
    badge: "Kurumsal Yapı",
    accent: "#16A34A",
    href: "/sirketini-kur/anonim-sirketi",
    packages: [
      { name: "Kur", monthlyPrice: "11.900", yearlyPrice: "6.500", popular: false },
      { name: "Kur & Yönet", monthlyPrice: "21.900", yearlyPrice: "16.500", popular: true },
      { name: "Kur & Büyüt", monthlyPrice: "Teklif", yearlyPrice: "Teklif", popular: false },
    ],
  },
  {
    id: "bilanco",
    name: "Bilanço Şirketi",
    badge: "Operasyon Odaklı",
    accent: "#DB2777",
    href: "/sirketini-kur/bilanco-sirketi",
    packages: [
      { name: "Kur", monthlyPrice: "7.400", yearlyPrice: "4.300", popular: false },
      { name: "Kur & Yönet", monthlyPrice: "17.400", yearlyPrice: "14.300", popular: true },
      { name: "Kur & Büyüt", monthlyPrice: "Teklif", yearlyPrice: "Teklif", popular: false },
    ],
  },
] as const;

// ─── SSS ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Fiyatlara KDV dahil mi?",
    a: "Hayır. Tüm fiyatlar KDV hariçtir. Faturanıza +%20 KDV eklenir.",
  },
  {
    q: "Yıllık ödeme yaparsam ne kadar tasarruf ederim?",
    a: "Yıllık ödeme tercih ettiğinizde aylık fiyata kıyasla yaklaşık %35–45 tasarruf sağlarsınız.",
  },
  {
    q: "Birden fazla hizmet alırsam indirim var mı?",
    a: "Evet. 2. pilarda %10, 3. pilarda %15, 4. pilarda %20 progresif indirim uygulanır.",
  },
  {
    q: "Şirket tipi değiştirmek istersem ne olur?",
    a: "Hesabınızı dondurup farklı şirket tipine geçiş yapabilirsiniz. Süreç ekibimiz tarafından yönetilir.",
  },
  {
    q: "İptal politikası nasıl?",
    a: "Aboneliği istediğiniz zaman iptal edebilirsiniz. Kalan ayın ücreti iade edilmez.",
  },
];

type CompanyId = "sahis" | "limited" | "anonim" | "bilanco";

export default function FiyatlandirmaPage() {
  const [yearly, setYearly] = useState(false);
  const [activeCompany, setActiveCompany] = useState<CompanyId>("limited");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedCompany = companyTypes.find((c) => c.id === activeCompany)!;

  return (
    <main className="bg-[#FAFBFC] pt-[92px]">
      <Header />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-12">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#16A34A] opacity-[0.07] blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#1b98d5] opacity-[0.05] blur-[80px]" />

        <div className="mx-auto max-w-[1230px]">
          <div className="relative rounded-[40px] bg-gradient-to-br from-[#F0FDF4] to-white px-8 py-10 md:px-12 md:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
              {/* Left */}
              <div className="max-w-[720px]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#16A34A]/10 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#16A34A] ring-1 ring-black/5">
                  <ShieldCheck className="h-4 w-4" />
                  Şeffaf Fiyatlandırma
                </div>

                <h1 className="mt-7 text-[30px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[50px]">
                  Şeffaf fiyatlandırma,{" "}
                  <span className="text-[#16A34A]">gizli maliyet yok.</span>
                </h1>

                <p className="mt-6 max-w-[580px] text-[18px] leading-[1.8] text-[#475569]">
                  Tüm paketler +KDV. İhtiyacın kadar al, dilediğinde iptal et.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#sirketini-kur"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#16A34A] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_30px_#16A34A40] transition-all duration-300 hover:scale-[1.03] hover:bg-[#15803D] hover:shadow-lg"
                  >
                    Fiyatları İncele <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                  <a
                    href="/iletisim"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] transition-all duration-300 hover:border-black/20 hover:shadow-md"
                  >
                    Ücretsiz Danış <ChevronRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Şirketini Kur", "Dijital Ofis", "Görünür Ol", "İşini Büyüt"].map((t) => (
                    <span key={t} className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#475569] ring-1 ring-black/8 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right – Floating stats */}
              <div className="hidden flex-col justify-center gap-4 lg:flex">
                {[
                  { icon: ShieldCheck, label: "Gizli Maliyet", value: "Yok" },
                  { icon: Sparkles, label: "Hizmet Pilları", value: "4 Ayrı Paket" },
                  { icon: Zap, label: "Yıllık İndirim", value: "%35–45" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4 rounded-2xl bg-white/80 px-5 py-4 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16A34A]/10">
                      <stat.icon className="h-5 w-5 text-[#16A34A]" />
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

      {/* ── 1. Şirketini Kur ── */}
      <section id="sirketini-kur" className="px-6 py-16">
        <div className="max-w-[1230px] mx-auto">
          <div className="mb-10">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#D97706]">Şirketini Kur</p>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
              Şirket tipin ne olursa olsun, her şey dahil.
            </h2>
            <p className="mt-3 text-[15px] text-[#64748B]">
              4 farklı şirket tipine özel, her şey dahil paketler. Aylık veya yıllık öde.
            </p>
          </div>

          {/* Aylık / Yıllık toggle */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-[14px] font-bold transition-all duration-200 ${
                !yearly ? "bg-black text-white shadow-sm" : "bg-black/8 text-black/60 hover:bg-black/12"
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-5 py-2 text-[14px] font-bold transition-all duration-200 ${
                yearly ? "bg-black text-white shadow-sm" : "bg-black/8 text-black/60 hover:bg-black/12"
              }`}
            >
              Yıllık{" "}
              <span className="ml-1.5 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-bold text-[#16A34A]">%35–45 indirim</span>
            </button>
          </div>

          {/* Company type tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {companyTypes.map((ct) => (
              <button
                key={ct.id}
                onClick={() => setActiveCompany(ct.id as CompanyId)}
                className={`rounded-full px-5 py-2.5 text-[14px] font-bold transition-all duration-200 ${
                  activeCompany === ct.id
                    ? "text-white shadow-md"
                    : "bg-white border border-black/10 text-black/60 hover:border-black/30"
                }`}
                style={activeCompany === ct.id ? { backgroundColor: ct.accent } : undefined}
              >
                {ct.name}
              </button>
            ))}
          </div>

          {/* 3-tier package grid */}
          <div className="grid gap-5 md:grid-cols-3">
            {selectedCompany.packages.map((pkg) => {
              const isQuote = pkg.monthlyPrice === "Teklif";
              const PkgIcon = pkg.name === "Kur" ? Zap : pkg.name === "Kur & Yönet" ? Laptop : TrendingUp;
              const features = tierFeatures[pkg.name] ?? [];
              const displayPrice = isQuote ? "Teklif" : (yearly ? pkg.yearlyPrice : pkg.monthlyPrice);
              return (
                <div
                  key={pkg.name}
                  className={`group flex flex-col rounded-[24px] bg-white p-7 transition-all duration-300 hover:-translate-y-1 ${
                    pkg.popular
                      ? "shadow-xl hover:shadow-2xl"
                      : "shadow-sm ring-1 ring-black/6 hover:shadow-xl"
                  }`}
                  style={pkg.popular ? { outline: `2px solid ${selectedCompany.accent}55`, outlineOffset: "-2px" } : undefined}
                >
                  {pkg.popular && (
                    <span
                      className="mb-3 self-start rounded-full px-3 py-1 text-[11px] font-bold text-white"
                      style={{ backgroundColor: selectedCompany.accent }}
                    >
                      En Çok Tercih Edilen
                    </span>
                  )}

                  {/* Icon + name */}
                  <div
                    className="mb-4 inline-flex items-center gap-2 rounded-[12px] px-3 py-1.5 w-fit"
                    style={{ backgroundColor: `${selectedCompany.accent}14` }}
                  >
                    <PkgIcon className="h-4 w-4" style={{ color: selectedCompany.accent }} />
                    <span className="text-[13px] font-bold" style={{ color: selectedCompany.accent }}>
                      {pkg.name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    {isQuote ? (
                      <div className="flex items-end gap-1">
                        <span className="text-[30px] font-extrabold tracking-[-0.03em] text-[#0F172A]">Teklif</span>
                        <span className="mb-1 text-[13px] text-black/50">bazlı</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-end gap-1">
                          <span className="text-[30px] font-extrabold tracking-[-0.03em] text-[#0F172A]">{displayPrice}</span>
                          <span className="mb-1 text-[13px] text-black/50">TL/ay +KDV</span>
                        </div>
                        {yearly && (
                          <p className="mt-1 text-[11px] font-semibold text-[#16A34A]">yıllık ödeme</p>
                        )}
                      </>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="mb-6 flex-1 space-y-2.5">
                    {features.map((f, i) => (
                      <li key={f} className="flex items-start gap-2 text-[13px] leading-6 text-[#475569]">
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          style={{ color: i === 0 && pkg.name !== "Kur" ? `${selectedCompany.accent}70` : selectedCompany.accent }}
                          strokeWidth={i === 0 && pkg.name !== "Kur" ? 2 : 2.5}
                        />
                        <span className={i === 0 && pkg.name !== "Kur" ? "font-semibold text-[#0F172A]" : ""}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={isQuote ? "/iletisim" : selectedCompany.href}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full py-3 text-[13px] font-bold text-center transition-all duration-200"
                    style={
                      pkg.popular
                        ? { backgroundColor: selectedCompany.accent, color: "white" }
                        : { backgroundColor: "rgb(0 0 0 / 0.05)", color: "#0F172A" }
                    }
                  >
                    {isQuote ? "Teklif Al" : `${pkg.name} ile Başla`}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Progresif indirim */}
          <div className="mt-8 rounded-[24px] bg-white shadow-sm ring-1 ring-black/6 p-7">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#16A34A] mb-5">
              Paket Birleştirme İndirimi
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { label: "1 Hizmet", discount: "—", color: "bg-black/5 text-black/40" },
                { label: "2 Hizmet", discount: "%10 indirim", color: "bg-[#FEF9C3] text-[#854D0E]" },
                { label: "3 Hizmet", discount: "%15 indirim", color: "bg-[#FEF3C7] text-[#92400E]" },
                { label: "4 Hizmet", discount: "%20 indirim", color: "bg-[#DCFCE7] text-[#166534]" },
              ].map((item) => (
                <div key={item.label} className={`flex-1 rounded-[16px] ${item.color} px-4 py-4 text-center`}>
                  <p className="text-[12px] font-bold opacity-70">{item.label}</p>
                  <p className="text-[17px] font-extrabold mt-1">{item.discount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Dijital Ofis ── */}
      <DijitalOfisPlans />

      {/* ── 3. Görünür Ol ── */}
      <GorunurOlPlans />

      {/* ── 4. İşini Büyüt ── */}
      <IsIniBuyutSection />

      {/* ── 5. Tek Seferlik Ürünler ── */}
      <TekSeferlikUrunler />

      {/* ── 6. SSS ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-10 max-w-[600px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">SSS</p>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
              Sık sorulan sorular.
            </h2>
            <p className="mt-3 text-[15px] text-[#64748B]">Aklındaki soruların cevabı burada. Bulamazsan ekibimize sor.</p>
          </div>
          <div className="space-y-3 max-w-[760px]">
            {faqs.map((faq, i) => (
              <div key={i} className="overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-black/6 transition-shadow duration-200 hover:shadow-md">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-black/[0.02]"
                >
                  <span className="text-[15px] font-bold text-[#0F172A]">{faq.q}</span>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/5 transition-all duration-300 ${openFaq === i ? "rotate-180 bg-[#16A34A]/10" : ""}`}>
                    <ChevronDown className={`h-4 w-4 transition-colors ${openFaq === i ? "text-[#16A34A]" : "text-black/40"}`} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="bg-[#F8FAFC] px-6 pb-5 pt-0">
                    <p className="text-[14px] leading-[1.8] text-[#475569]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-16 pt-4">
        <div
          className="relative mx-auto max-w-[1230px] overflow-hidden rounded-[40px] px-8 py-14 text-white md:px-12"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #16A34Acc 100%)" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#16A34A] opacity-20 blur-[60px]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full bg-white opacity-10 blur-[40px]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[640px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/60">Fiyatlandırma</p>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-white md:text-[44px]">
                Hangi paketi seçeceğinden emin değil misin?
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-white/70">
                Ekibimizle 15 dakika konuşalım, ihtiyacına en uygun paketi birlikte belirleyelim.
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
