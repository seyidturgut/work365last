"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Monitor,
  Globe,
  Share2,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

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
    href: "/sirketini-kur/sahis",
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
    href: "/sirketini-kur/limited",
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
    href: "/sirketini-kur/anonim",
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
    href: "/sirketini-kur/bilanco",
  },
] as const;

// ─── Dijital Ofis ─────────────────────────────────────────────────────────────
const dijitalOfisPlans = [
  {
    name: "Başlangıç",
    range: "1–10 Kullanıcı",
    price: "10.000",
    popular: false,
    features: [
      "Microsoft 365 kurulum + lisans",
      "Kurumsal e-posta + Teams",
      "OneDrive + MFA",
      "Help desk desteği",
    ],
  },
  {
    name: "Profesyonel",
    range: "11–30 Kullanıcı",
    price: "15.000",
    popular: true,
    features: [
      "Tüm Başlangıç özellikleri",
      "SharePoint",
      "Güvenlik politikaları",
      "Öncelikli destek",
    ],
  },
  {
    name: "Kurumsal",
    range: "31–100 Kullanıcı",
    price: "20.000",
    popular: false,
    features: [
      "Tüm Profesyonel özellikleri",
      "Dedicated IT danışman",
      "SLA garantisi",
      "Yedekleme izleme",
    ],
  },
];

// ─── Görünür Ol ──────────────────────────────────────────────────────────────
const sosyalMedyaPlans = [
  {
    name: "Başlangıç",
    posts: "4 paylaşım/ay",
    price: "15.000",
    popular: false,
    features: ["4 paylaşım/ay", "Özel gün kutlamaları", "İmaj yönetimi", "Aylık rapor"],
  },
  {
    name: "Profesyonel",
    posts: "8 paylaşım/ay",
    price: "20.000",
    popular: true,
    features: [
      "8 paylaşım/ay",
      "Özel gün kutlamaları",
      "İmaj yönetimi",
      "Marka danışmanlığı",
      "Aylık rapor",
    ],
  },
  {
    name: "Premium",
    posts: "12 paylaşım/ay",
    price: "30.000",
    popular: false,
    features: [
      "12 paylaşım/ay",
      "Özel gün kutlamaları",
      "İmaj yönetimi",
      "Marka danışmanlığı",
      "Tasarım danışmanlığı",
      "Aylık rapor",
    ],
  },
];

const webSitesiPlans = [
  {
    name: "Başlangıç",
    setup: "20.000",
    monthly: "1.000",
    description: "1-3 sayfa landing, mobil uyumlu",
    popular: false,
    features: ["Hazır şablon, 1-3 sayfa", "Mobil uyumlu tasarım", "Temel SEO", "Analytics kurulumu"],
  },
  {
    name: "Profesyonel",
    setup: "30.000",
    monthly: "2.000",
    description: "5–10 sayfalı kurumsal site, blog",
    popular: true,
    features: ["Özel tasarım, 5-10 sayfa", "Blog + iletişim formu", "SEO optimizasyonu", "CRM bağlantısı"],
  },
  {
    name: "Premium",
    setup: "50.000",
    monthly: "3.000",
    description: "Tam özel tasarım, e-ticaret",
    popular: false,
    features: ["Tam özel tasarım", "E-ticaret veya özel fonksiyon", "SEO audit + strateji", "Ads entegrasyonu"],
  },
];

// ─── Tek Seferlik Ürünler ─────────────────────────────────────────────────────
const oneTimeProducts = [
  { name: "Nitelikli e-İmza", price: "1.500 TL/yıl", desc: "Yasal geçerli dijital imza" },
  { name: "KEP Hesabı", price: "800 TL/yıl", desc: "Kayıtlı elektronik posta" },
  { name: "Marka Tescil", price: "Teklif bazlı", desc: "Türkpatent marka tescili" },
  { name: "Sanal Ofis", price: "1.200 TL/yıl", desc: "Yasal adres hizmeti" },
];

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
  const [gorunurTab, setGorunurTab] = useState<"sosyal" | "web">("sosyal");

  const selectedCompany = companyTypes.find((c) => c.id === activeCompany)!;

  return (
    <main className="bg-white pt-[92px]">
      <Header />

      {/* Hero */}
      <section className="px-6 py-24 max-w-[1230px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-4 py-2 mb-6">
          <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
          <span className="text-[13px] font-bold text-[#16A34A]">Şeffaf Fiyatlandırma</span>
        </div>
        <h1 className="text-[42px] md:text-[58px] font-bold tracking-tighter text-black leading-tight mb-6 max-w-[680px] mx-auto">
          Şeffaf fiyatlandırma,{" "}
          <span className="text-[#16A34A]">gizli maliyet yok.</span>
        </h1>
        <p className="text-[18px] text-black/60 max-w-[520px] mx-auto leading-relaxed">
          Tüm paketler +KDV. İhtiyacın kadar al, dilediğinde iptal et.
        </p>
      </section>

      {/* ── 1. Şirketini Kur ── */}
      <section className="px-6 py-20 bg-[#F8FAFC]">
        <div className="max-w-[1230px] mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[28px] font-bold text-black">Şirketini Kur</span>
          </div>
          <p className="text-[15px] text-black/50 mb-10">
            Şirket tipin ne olursa olsun, kuruluştan muhasebeye her şey dahil.
          </p>

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
      <section className="px-6 py-20 max-w-[1230px] mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Monitor className="h-6 w-6 text-[#1b98d5]" />
          <span className="text-[28px] font-bold text-black">Dijital Ofis</span>
        </div>
        <p className="text-[15px] text-black/50 mb-10">
          Microsoft 365 kurulum, lisans ve yönetimi — tek pakette.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {dijitalOfisPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[28px] bg-white border-2 p-8 flex flex-col ${
                plan.popular ? "border-[#1b98d5] shadow-lg" : "border-black/10"
              }`}
            >
              {plan.popular && (
                <span className="self-start rounded-full bg-[#1b98d5] px-3 py-1 text-[11px] font-bold text-white mb-4">
                  En Çok Tercih Edilen
                </span>
              )}
              <p className="text-[12px] font-bold uppercase tracking-widest text-black/40">{plan.range}</p>
              <h3 className="mt-2 text-[22px] font-bold text-black">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-[36px] font-bold text-black">{plan.price}</span>
                <span className="text-[14px] text-black/50 ml-1">TL/ay +KDV</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[14px] text-black/70">
                    <CheckCircle2 className="h-4 w-4 text-[#1b98d5] shrink-0 mt-0.5" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/iletisim"
                className={`rounded-full py-3.5 text-[14px] font-bold text-center transition-colors ${
                  plan.popular
                    ? "bg-[#1b98d5] text-white hover:bg-[#1580b3]"
                    : "bg-black/5 text-black hover:bg-black/10"
                }`}
              >
                Teklif Al
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-[20px] bg-black text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">Enterprise</p>
            <p className="text-[18px] font-bold mt-1">100+ Kullanıcı — Özel Kapsam</p>
          </div>
          <Link
            href="/iletisim"
            className="shrink-0 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-black hover:bg-gray-100 transition-colors"
          >
            Teklif İste
          </Link>
        </div>
      </section>

      {/* ── 3. Görünür Ol ── */}
      <section className="px-6 py-20 bg-[#F8FAFC]">
        <div className="max-w-[1230px] mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-6 w-6 text-[#1b98d5]" />
            <span className="text-[28px] font-bold text-black">Görünür Ol</span>
          </div>
          <p className="text-[15px] text-black/50 mb-10">
            Web sitesi ve sosyal medya yönetimiyle markanı dijitalde büyüt.
          </p>

          {/* Sub-tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setGorunurTab("sosyal")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors ${
                gorunurTab === "sosyal" ? "bg-black text-white" : "bg-white border border-black/10 text-black/60 hover:border-black/30"
              }`}
            >
              <Share2 className="h-4 w-4" /> Sosyal Medya
            </button>
            <button
              onClick={() => setGorunurTab("web")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors ${
                gorunurTab === "web" ? "bg-black text-white" : "bg-white border border-black/10 text-black/60 hover:border-black/30"
              }`}
            >
              <Globe className="h-4 w-4" /> Web Sitesi
            </button>
          </div>

          {/* Sosyal Medya */}
          {gorunurTab === "sosyal" && (
            <div className="grid md:grid-cols-3 gap-6">
              {sosyalMedyaPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-[28px] bg-white border-2 p-8 flex flex-col ${
                    plan.popular ? "border-[#1b98d5] shadow-lg" : "border-black/10"
                  }`}
                >
                  {plan.popular && (
                    <span className="self-start rounded-full bg-[#1b98d5] px-3 py-1 text-[11px] font-bold text-white mb-4">
                      En Çok Tercih Edilen
                    </span>
                  )}
                  <h3 className="text-[22px] font-bold text-black">{plan.name}</h3>
                  <p className="mt-1 text-[13px] font-semibold text-[#1b98d5]">{plan.posts}</p>
                  <div className="mt-5 mb-6">
                    <span className="text-[32px] font-bold text-black">{plan.price}</span>
                    <span className="text-[14px] text-black/50 ml-1">TL/ay +KDV</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[14px] text-black/70">
                        <CheckCircle2 className="h-4 w-4 text-[#1b98d5] shrink-0 mt-0.5" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/iletisim"
                    className={`rounded-full py-3.5 text-[14px] font-bold text-center transition-colors ${
                      plan.popular
                        ? "bg-[#1b98d5] text-white hover:bg-[#1580b3]"
                        : "bg-black/5 text-black hover:bg-black/10"
                    }`}
                  >
                    Teklif Al
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Web Sitesi */}
          {gorunurTab === "web" && (
            <div className="grid md:grid-cols-3 gap-6">
              {webSitesiPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-[28px] bg-white border-2 p-8 flex flex-col ${
                    plan.popular ? "border-[#1b98d5] shadow-lg" : "border-black/10"
                  }`}
                >
                  {plan.popular && (
                    <span className="self-start rounded-full bg-[#1b98d5] px-3 py-1 text-[11px] font-bold text-white mb-4">
                      En Çok Tercih Edilen
                    </span>
                  )}
                  <h3 className="text-[22px] font-bold text-black">{plan.name}</h3>
                  <p className="mt-1 text-[13px] text-black/50">{plan.description}</p>
                  <div className="mt-5 mb-1">
                    <span className="text-[32px] font-bold text-black">{plan.setup}</span>
                    <span className="text-[14px] text-black/50 ml-1">TL kurulum +KDV</span>
                  </div>
                  <p className="text-[13px] text-black/50 mb-6">+ {plan.monthly} TL/ay bakım +KDV</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[14px] text-black/70">
                        <CheckCircle2 className="h-4 w-4 text-[#1b98d5] shrink-0 mt-0.5" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/iletisim"
                    className={`rounded-full py-3.5 text-[14px] font-bold text-center transition-colors ${
                      plan.popular
                        ? "bg-[#1b98d5] text-white hover:bg-[#1580b3]"
                        : "bg-black/5 text-black hover:bg-black/10"
                    }`}
                  >
                    Teklif Al
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. İşini Büyüt ── */}
      <section className="px-6 py-20 max-w-[1230px] mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="h-6 w-6 text-[#16A34A]" />
          <span className="text-[28px] font-bold text-black">İşini Büyüt</span>
        </div>
        <p className="text-[15px] text-black/50 mb-8">
          Teşvik analizi, hibe başvurusu, yatırımcı erişimi ve uzman kiralama.
        </p>
        <div className="rounded-[28px] bg-[#F0FDF4] border border-[#BBF7D0] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[22px] font-bold text-black mb-2">Teklif Bazlı Fiyatlandırma</h3>
            <p className="text-[15px] text-black/65 max-w-[520px]">
              Her şirketin ihtiyacı farklı. Teşvik analizi, hibe desteği, yatırımcı erişimi ve uzman kiralama için ekibimizle görüşün.
            </p>
          </div>
          <Link
            href="/buyut"
            className="shrink-0 flex items-center gap-2 rounded-full bg-[#16A34A] px-7 py-3.5 text-[14px] font-bold text-white hover:bg-[#15803D] transition-colors"
          >
            Detayları İncele <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── 5. Tek Seferlik Ürünler ── */}
      <section className="px-6 py-20 bg-[#F8FAFC]">
        <div className="max-w-[1230px] mx-auto">
          <h2 className="text-[28px] font-bold text-black mb-2">Tek Seferlik Ürünler</h2>
          <p className="text-[15px] text-black/50 mb-10">Şirket paketlerine ek olarak alınabilir.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {oneTimeProducts.map((p) => (
              <div key={p.name} className="rounded-[20px] bg-white border border-black/8 p-6">
                <h3 className="text-[16px] font-bold text-black mb-1">{p.name}</h3>
                <p className="text-[13px] text-black/50 mb-4">{p.desc}</p>
                <p className="text-[15px] font-bold text-black">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <section className="px-6 py-20 bg-[#F8FAFC]">
        <div className="max-w-[1230px] mx-auto text-center">
          <h2 className="text-[32px] font-bold text-black mb-4">Hangi paketi seçeceğinden emin değil misin?</h2>
          <p className="text-[16px] text-black/55 mb-8">
            Ekibimizle 15 dakika konuşalım, ihtiyacına en uygun paketi belirleyelim.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-[15px] font-bold text-white hover:bg-gray-800 transition-colors"
          >
            Ücretsiz Danış <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
