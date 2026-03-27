import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, ChevronRight, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sosyal Medya | Görünür Ol | Work365",
  description: "Sosyal medya içerik üretimi, imaj yönetimi ve marka danışmanlığı. 15.000 TL/ay'dan başlayan paketler.",
};

const plans = [
  {
    name: "Başlangıç",
    price: "15.000",
    posts: "4 paylaşım/ay",
    features: [
      "4 paylaşım/ay",
      "Özel gün kutlamaları",
      "İmaj yönetimi",
      "Aylık rapor",
      "İçerik onay süreci",
    ],
    popular: false,
  },
  {
    name: "Profesyonel",
    price: "20.000",
    posts: "8 paylaşım/ay",
    features: [
      "8 paylaşım/ay",
      "Özel gün kutlamaları",
      "İmaj yönetimi",
      "Marka danışmanlığı",
      "Aylık rapor",
      "İçerik onay süreci",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "30.000",
    posts: "12 paylaşım/ay",
    features: [
      "12 paylaşım/ay",
      "Özel gün kutlamaları",
      "İmaj yönetimi",
      "Marka danışmanlığı",
      "Tasarım danışmanlığı",
      "Aylık rapor",
      "İçerik onay süreci",
    ],
    popular: false,
  },
];

export default function SosyalMedyaPage() {
  return (
    <main className="bg-white pt-[92px]">
      <Header />

      {/* Hero */}
      <section className="px-6 py-24 max-w-[1230px] mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Link href="/gorunur-ol" className="text-[13px] text-black/40 hover:text-black transition-colors">Görünür Ol</Link>
          <span className="text-black/20">/</span>
          <span className="text-[13px] font-bold text-black">Sosyal Medya</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#DBEAFE] px-4 py-2 mb-6">
          <Share2 className="h-4 w-4 text-[#1b98d5]" />
          <span className="text-[13px] font-bold text-[#1b98d5]">Sosyal Medya</span>
        </div>
        <h1 className="text-[40px] md:text-[56px] font-bold tracking-tighter text-black leading-tight mb-6 max-w-[680px] mx-auto">
          İçerik üretimi ve marka yönetimi,{" "}
          <span className="text-[#1b98d5]">sizin için.</span>
        </h1>
        <p className="text-[18px] text-black/60 max-w-[520px] mx-auto leading-relaxed mb-10">
          Markanızın sesini bulun, hedef kitlenize ulaşın. İçerik oluşturmak için zaman harcamayın — biz halledelim.
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
          <p className="text-center text-[14px] text-black/40 mb-12">Tüm fiyatlar +KDV · Aylık abonelik</p>
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
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 max-w-[1230px] mx-auto text-center">
        <h2 className="text-[32px] font-bold text-black mb-4">Sosyal medyada aktif olmaya hazır mısın?</h2>
        <p className="text-[16px] text-black/55 mb-8">Ekibimizle görüşün, markanıza özel içerik stratejisi belirleyelim.</p>
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
