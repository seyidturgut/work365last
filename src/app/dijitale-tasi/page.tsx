import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, ChevronRight, Monitor, Server, Shield, Users, Headphones, HardDrive } from "lucide-react";

export const metadata: Metadata = {
  title: "Dijital Ofis | Work365",
  description: "IT departmanın biz olalım, sen işine odaklan. Microsoft 365, kurumsal e-posta, Teams, OneDrive ve help desk tek pakette.",
};

const plans = [
  {
    name: "Başlangıç",
    range: "1–10 Kullanıcı",
    price: "10.000",
    features: [
      "Microsoft 365 kurulum + lisans",
      "Kurumsal e-posta + Teams",
      "OneDrive + MFA",
      "Help desk desteği",
    ],
    popular: false,
    color: "border-black/10",
  },
  {
    name: "Profesyonel",
    range: "11–30 Kullanıcı",
    price: "15.000",
    features: [
      "Tüm Başlangıç özellikleri",
      "SharePoint",
      "Güvenlik politikaları",
      "Öncelikli destek",
    ],
    popular: true,
    color: "border-[#1b98d5]",
  },
  {
    name: "Kurumsal",
    range: "31–100 Kullanıcı",
    price: "20.000",
    features: [
      "Tüm Profesyonel özellikleri",
      "Dedicated IT danışman",
      "SLA garantisi",
      "Yedekleme izleme",
    ],
    popular: false,
    color: "border-black/10",
  },
];

const services = [
  { icon: Monitor, label: "Kurumsal E-posta" },
  { icon: Users, label: "Microsoft Teams" },
  { icon: HardDrive, label: "OneDrive & SharePoint" },
  { icon: Shield, label: "MFA & Güvenlik" },
  { icon: Server, label: "Yedekleme İzleme" },
  { icon: Headphones, label: "Help Desk" },
];

export default function DijitalOfisPage() {
  return (
    <main className="bg-white pt-[92px]">
      <Header />

      {/* Hero */}
      <section className="px-6 py-24 max-w-[1230px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#E0F2FE] px-4 py-2 mb-6">
          <Monitor className="h-4 w-4 text-[#1b98d5]" />
          <span className="text-[13px] font-bold text-[#1b98d5]">Dijital Ofis</span>
        </div>
        <h1 className="text-[42px] md:text-[58px] font-bold tracking-tighter text-black leading-tight mb-6 max-w-[720px] mx-auto">
          IT departmanın biz olalım,{" "}
          <span className="text-[#1b98d5]">sen işine odaklan.</span>
        </h1>
        <p className="text-[18px] text-black/60 max-w-[560px] mx-auto leading-relaxed mb-10">
          Microsoft 365 kurulum, lisans ve yönetimi — kurumsal e-posta, Teams, OneDrive ve help desk tek pakette.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/iletisim"
            className="rounded-full bg-black px-8 py-4 text-[15px] font-bold text-white hover:bg-gray-800 transition-colors"
          >
            Teklif Al
          </Link>
          <Link
            href="/fiyatlandirma"
            className="flex items-center gap-1 text-[15px] font-semibold text-black/60 hover:text-black transition-colors"
          >
            Fiyatlandırmayı Gör <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Services grid */}
      <section className="px-6 py-16 bg-[#F8FAFC]">
        <div className="max-w-[1230px] mx-auto">
          <h2 className="text-[28px] font-bold text-black text-center mb-12">Dahil Olan Hizmetler</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-[20px] bg-white px-6 py-5 shadow-sm">
                <div className="rounded-xl bg-[#E0F2FE] p-2.5">
                  <Icon className="h-5 w-5 text-[#1b98d5]" />
                </div>
                <span className="text-[15px] font-bold text-black">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 entry points */}
      <section className="px-6 py-20 max-w-[1230px] mx-auto">
        <h2 className="text-[28px] font-bold text-black text-center mb-12">Nereden Başlıyorsunuz?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-[28px] bg-[#FFFBEB] border border-[#FDE68A] p-8">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#D97706]">Yeni Kurulan Şirketler</span>
            <h3 className="mt-3 text-[22px] font-bold text-black mb-3">Sıfırdan Kurulum</h3>
            <p className="text-[15px] text-black/65 leading-relaxed mb-6">
              Şirketini kurdun, dijital altyapını da biz kuralım. Domain, e-posta, Teams — hepsi hazır.
            </p>
            <Link href="/iletisim" className="flex items-center gap-1 text-[14px] font-bold text-[#D97706] hover:opacity-70 transition-opacity">
              Başlayalım <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-[28px] bg-[#E0F2FE] border border-[#BAE6FD] p-8">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#1b98d5]">Mevcut Şirketler</span>
            <h3 className="mt-3 text-[22px] font-bold text-black mb-3">Dijitale Taşıma</h3>
            <p className="text-[15px] text-black/65 leading-relaxed mb-6">
              Mevcut altyapını Microsoft 365&apos;e taşı. E-posta geçişi, veri aktarımı ve kullanıcı eğitimi dahil.
            </p>
            <Link href="/iletisim" className="flex items-center gap-1 text-[14px] font-bold text-[#1b98d5] hover:opacity-70 transition-opacity">
              Geçiş Planı Al <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 bg-[#F8FAFC]">
        <div className="max-w-[1230px] mx-auto">
          <h2 className="text-[28px] font-bold text-black text-center mb-4">Paketler</h2>
          <p className="text-[16px] text-black/55 text-center mb-12">Tüm fiyatlar +KDV</p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[28px] bg-white border-2 ${plan.color} p-8 flex flex-col ${plan.popular ? "shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <span className="self-start rounded-full bg-[#1b98d5] px-3 py-1 text-[11px] font-bold text-white mb-4">
                    En Çok Tercih Edilen
                  </span>
                )}
                <p className="text-[12px] font-bold uppercase tracking-widest text-black/40">{plan.range}</p>
                <h3 className="mt-2 text-[24px] font-bold text-black">{plan.name}</h3>
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

          {/* Enterprise */}
          <div className="mt-6 rounded-[28px] bg-black text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-widest text-white/50">Enterprise</p>
              <h3 className="mt-1 text-[22px] font-bold">100+ Kullanıcı — Özel Kapsam</h3>
              <p className="mt-2 text-[14px] text-white/65">Dedicated account manager, özel SLA ve kurumsal güvenlik paketleri.</p>
            </div>
            <Link
              href="/iletisim"
              className="shrink-0 rounded-full bg-white px-7 py-3.5 text-[14px] font-bold text-black hover:bg-gray-100 transition-colors"
            >
              Teklif İste
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 max-w-[1230px] mx-auto text-center">
        <h2 className="text-[32px] font-bold text-black mb-4">Dijital ofisinizi bugün kurun.</h2>
        <p className="text-[16px] text-black/55 mb-8">Uzman ekibimiz sizinle iletişime geçsin.</p>
        <Link
          href="/iletisim"
          className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-[15px] font-bold text-white hover:bg-gray-800 transition-colors"
        >
          Ücretsiz Danış <ChevronRight className="h-4 w-4" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
