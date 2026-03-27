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
} from "lucide-react";
import DijitalOfisPlans from "@/components/pricing/DijitalOfisPlans";
import GorunurOlPlans from "@/components/pricing/GorunurOlPlans";
import IsIniBuyutSection from "@/components/pricing/IsIniBuyutSection";
import TekSeferlikUrunler from "@/components/pricing/TekSeferlikUrunler";

// ─── Şirketini Kur ───────────────────────────────────────────────────────────
const companyTypes = [
  {
    id: "sahis",
    name: "Şahıs Şirketi",
    badge: "Hızlı Başlangıç",
    monthly: "5.900",
    yearly: "3.200",
    color: "bg-[#FFFBEB]",
    border: "border-[#FDE68A]",
    accent: "#D97706",
    features: [
      "Şirket kuruluşu dahil",
      "e-İmza 1 Yıl",
      "KEP Başlangıç 1 Yıl",
      "Sanal ofis 1 Yıl",
      "Aylık muhasebe & vergi",
      "Dijital panel erişimi",
    ],
    href: "/sirketini-kur/sahis-sirketi",
  },
  {
    id: "limited",
    name: "Limited Şirketi",
    badge: "En Dengeli",
    monthly: "9.900",
    yearly: "5.400",
    color: "bg-[#EFF6FF]",
    border: "border-[#BFDBFE]",
    accent: "#1b98d5",
    popular: true,
    features: [
      "Şirket kuruluşu dahil",
      "e-İmza 1 Yıl",
      "KEP Başlangıç 1 Yıl",
      "Sanal ofis 1 Yıl",
      "Aylık muhasebe & vergi",
      "Dijital panel erişimi",
      "Ortak yönetimi",
    ],
    href: "/sirketini-kur/limited-sirketi",
  },
  {
    id: "anonim",
    name: "Anonim Şirketi",
    badge: "Kurumsal Yapı",
    monthly: "11.900",
    yearly: "6.500",
    color: "bg-[#F0FDF4]",
    border: "border-[#BBF7D0]",
    accent: "#16A34A",
    features: [
      "Şirket kuruluşu dahil",
      "e-İmza 1 Yıl",
      "KEP Başlangıç 1 Yıl",
      "Sanal ofis 1 Yıl",
      "Aylık muhasebe & vergi",
      "Dijital panel erişimi",
      "Pay defteri yönetimi",
      "Genel kurul desteği",
    ],
    href: "/sirketini-kur/anonim-sirketi",
  },
  {
    id: "bilanco",
    name: "Bilanço Şirketi",
    badge: "Operasyon Odaklı",
    monthly: "7.400",
    yearly: "4.300",
    color: "bg-[#FFF0F5]",
    border: "border-[#FBCFE8]",
    accent: "#DB2777",
    features: [
      "Şirket kuruluşu dahil",
      "e-İmza 1 Yıl",
      "KEP Başlangıç 1 Yıl",
      "Sanal ofis 1 Yıl",
      "Aylık muhasebe & vergi",
      "Dijital panel erişimi",
      "Bilanço esaslı defter",
    ],
    href: "/sirketini-kur/bilanco-sirketi",
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
      <section className="relative overflow-hidden px-6 pb-10 pt-14">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#16A34A] opacity-[0.06] blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full bg-[#1b98d5] opacity-[0.05] blur-[80px]" />

        <div className="relative mx-auto max-w-[1230px]">
          <div className="rounded-[40px] bg-gradient-to-b from-[#F0FDF4] to-white px-8 py-14 text-center md:px-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-5 py-2.5 ring-1 ring-black/5 mb-6">
              <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
              <span className="text-[13px] font-bold text-[#16A34A]">Şeffaf Fiyatlandırma</span>
            </div>
            <h1 className="text-[42px] md:text-[62px] font-extrabold tracking-[-0.04em] text-[#0F172A] leading-[1.05] mb-6 max-w-[720px] mx-auto">
              Şeffaf fiyatlandırma,{" "}
              <span className="text-[#16A34A]">gizli maliyet yok.</span>
            </h1>
            <p className="text-[18px] text-[#475569] max-w-[520px] mx-auto leading-relaxed">
              Tüm paketler +KDV. İhtiyacın kadar al, dilediğinde iptal et.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {["Şirketini Kur", "Dijital Ofis", "Görünür Ol", "İşini Büyüt"].map((t) => (
                <span key={t} className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#475569] ring-1 ring-black/8 shadow-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. Şirketini Kur ── */}
      <section className="px-6 py-20 bg-[#F8FAFC]">
        <div className="max-w-[1230px] mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D97706]/10">
                <Building2 className="h-5 w-5 text-[#D97706]" />
              </div>
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#D97706]">Şirketini Kur</p>
            </div>
            <h2 className="text-[28px] font-extrabold tracking-[-0.03em] text-[#0F172A] md:text-[36px]">
              Şirket tipin ne olursa olsun, her şey dahil.
            </h2>
          </div>

          {/* Aylık / Yıllık Toggle */}
          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-[14px] font-bold transition-colors ${
                !yearly ? "bg-black text-white" : "bg-black/8 text-black/60 hover:bg-black/12"
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-5 py-2 text-[14px] font-bold transition-colors ${
                yearly ? "bg-black text-white" : "bg-black/8 text-black/60 hover:bg-black/12"
              }`}
            >
              Yıllık <span className="ml-1.5 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-bold text-[#16A34A]">%35–45 indirim</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {companyTypes.map((ct) => (
              <button
                key={ct.id}
                onClick={() => setActiveCompany(ct.id as CompanyId)}
                className={`rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors ${
                  activeCompany === ct.id
                    ? "bg-black text-white"
                    : "bg-white border border-black/10 text-black/60 hover:border-black/30"
                }`}
              >
                {ct.name}
              </button>
            ))}
          </div>

          {/* Selected company card */}
          <div className={`rounded-[28px] border-2 ${selectedCompany.border} ${selectedCompany.color} p-8 md:p-10`}>
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1">
                <span
                  className="inline-block rounded-full px-3 py-1 text-[11px] font-bold text-white mb-4"
                  style={{ backgroundColor: selectedCompany.accent }}
                >
                  {selectedCompany.badge}
                </span>
                <h3 className="text-[28px] font-bold text-black mb-1">{selectedCompany.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-[42px] font-bold text-black">
                    {yearly ? selectedCompany.yearly : selectedCompany.monthly}
                  </span>
                  <span className="text-[15px] text-black/50 ml-2">TL/ay +KDV</span>
                  {yearly && (
                    <span className="ml-3 text-[13px] text-black/40">(yıllık peşin)</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {selectedCompany.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[15px] text-black/70">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 mt-0.5"
                        style={{ color: selectedCompany.accent }}
                        strokeWidth={2.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-64 flex flex-col gap-4">
                <Link
                  href={selectedCompany.href}
                  className="rounded-full py-4 text-[15px] font-bold text-center text-white transition-colors hover:opacity-85"
                  style={{ backgroundColor: selectedCompany.accent }}
                >
                  Hemen Başla
                </Link>
                <Link
                  href="/iletisim"
                  className="rounded-full py-4 text-[15px] font-bold text-center bg-black/6 text-black hover:bg-black/10 transition-colors"
                >
                  Ücretsiz Danış
                </Link>
                <p className="text-[12px] text-black/40 text-center">
                  İptal istediğin zaman mümkün
                </p>
              </div>
            </div>
          </div>

          {/* Progresif indirim */}
          <div className="mt-8 rounded-[20px] bg-white border border-black/8 p-6">
            <p className="text-[13px] font-bold text-black/50 uppercase tracking-widest mb-4">
              Paket Birleştirme İndirimi
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { label: "1 Hizmet", discount: "—", color: "bg-black/5 text-black/40" },
                { label: "2 Hizmet", discount: "%10 indirim", color: "bg-[#FEF9C3] text-[#854D0E]" },
                { label: "3 Hizmet", discount: "%15 indirim", color: "bg-[#FEF3C7] text-[#92400E]" },
                { label: "4 Hizmet", discount: "%20 indirim", color: "bg-[#DCFCE7] text-[#166534]" },
              ].map((item) => (
                <div key={item.label} className={`flex-1 rounded-[14px] ${item.color} px-4 py-3 text-center`}>
                  <p className="text-[12px] font-bold opacity-70">{item.label}</p>
                  <p className="text-[15px] font-bold mt-0.5">{item.discount}</p>
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
      <section className="px-6 py-20 max-w-[1230px] mx-auto">
        <h2 className="text-[28px] font-bold text-black mb-10">Sık Sorulan Sorular</h2>
        <div className="space-y-3 max-w-[760px]">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-[16px] border border-black/8 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-black/2 transition-colors"
              >
                <span className="text-[15px] font-bold text-black">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-black/40 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5">
                  <p className="text-[14px] text-black/65 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
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
