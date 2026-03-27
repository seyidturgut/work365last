import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, ChevronRight, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Web Sitesi | Görünür Ol | Work365",
  description: "Kurumsal web sitesi tasarım ve bakımı. 20.000 TL'den başlayan kurulum fiyatlarıyla.",
};

const plans = [
  {
    name: "Başlangıç",
    setup: "20.000",
    monthly: "1.000",
    description: "Tek sayfa landing, mobil uyumlu, temel SEO",
    features: [
      "Hazır şablon, 1-3 sayfa",
      "Mobil uyumlu tasarım",
      "Temel SEO",
      "Domain + SSL 1 yıl",
      "Analytics kurulumu",
    ],
    popular: false,
  },
  {
    name: "Profesyonel",
    setup: "30.000",
    monthly: "2.000",
    description: "5–10 sayfalı kurumsal site, blog, iletişim formu",
    features: [
      "Özel tasarım, 5-10 sayfa",
      "Blog + iletişim formu",
      "SEO optimizasyonu",
      "CRM bağlantısı",
      "2 revizyon hakkı",
    ],
    popular: true,
  },
  {
    name: "Premium",
    setup: "50.000",
    monthly: "3.000",
    description: "Özel tasarım, e-ticaret veya özel fonksiyon, gelişmiş SEO",
    features: [
      "Tam özel tasarım",
      "E-ticaret veya özel fonksiyon",
      "SEO audit + strateji",
      "Ads entegrasyonu",
      "Performans dashboard",
    ],
    popular: false,
  },
];

export default function WebSitesiPage() {
  return (
    <main className="bg-white pt-[92px]">
      <Header />

      {/* Hero */}
      <section className="px-6 py-24 max-w-[1230px] mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Link href="/gorunur-ol" className="text-[13px] text-black/40 hover:text-black transition-colors">Görünür Ol</Link>
          <span className="text-black/20">/</span>
          <span className="text-[13px] font-bold text-black">Web Sitesi</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#DBEAFE] px-4 py-2 mb-6">
          <Globe className="h-4 w-4 text-[#1b98d5]" />
          <span className="text-[13px] font-bold text-[#1b98d5]">Web Sitesi</span>
        </div>
        <h1 className="text-[40px] md:text-[56px] font-bold tracking-tighter text-black leading-tight mb-6 max-w-[680px] mx-auto">
          Markanın dijital adresi,{" "}
          <span className="text-[#1b98d5]">profesyonelce hazırlanmış.</span>
        </h1>
        <p className="text-[18px] text-black/60 max-w-[520px] mx-auto leading-relaxed mb-10">
          Kurulum + aylık bakım dahil. Gizli maliyet yok.
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
            Tüm Fiyatlandırma <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 bg-[#F8FAFC]">
        <div className="max-w-[1230px] mx-auto">
          <p className="text-center text-[14px] text-black/40 mb-12">Tüm fiyatlar +KDV</p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
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
                <p className="mt-2 text-[13px] text-black/50">{plan.description}</p>
                <div className="mt-6 mb-2">
                  <span className="text-[32px] font-bold text-black">{plan.setup}</span>
                  <span className="text-[14px] text-black/50 ml-1">TL kurulum +KDV</span>
                </div>
                <p className="text-[14px] text-black/50 mb-6">
                  + {plan.monthly} TL/ay bakım +KDV
                </p>
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
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 max-w-[1230px] mx-auto text-center">
        <h2 className="text-[32px] font-bold text-black mb-4">Hangi paketi seçeceğinden emin değil misin?</h2>
        <p className="text-[16px] text-black/55 mb-8">Ekibimizle 15 dakika konuşalım, ihtiyacına en uygun paketi belirleyelim.</p>
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
