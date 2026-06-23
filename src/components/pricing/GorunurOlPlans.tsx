"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Globe, Share2 } from "lucide-react";

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
    setup: "30.000",
    monthly: "3.000",
    description: "1-3 sayfa landing, mobil uyumlu",
    popular: false,
    features: ["Hazır şablon, 1-3 sayfa", "Mobil uyumlu tasarım", "Temel SEO", "Analytics kurulumu"],
  },
  {
    name: "Profesyonel",
    setup: "50.000",
    monthly: "5.000",
    description: "5–10 sayfalı kurumsal site, blog",
    popular: true,
    features: ["Özel tasarım, 5-10 sayfa", "Blog + iletişim formu", "SEO optimizasyonu", "CRM bağlantısı"],
  },
  {
    name: "Premium",
    setup: "75.000",
    monthly: "10.000",
    description: "Tam özel tasarım, e-ticaret",
    popular: false,
    features: ["Tam özel tasarım", "E-ticaret veya özel fonksiyon", "SEO audit + strateji", "Ads entegrasyonu"],
  },
];

export default function GorunurOlPlans() {
  const [gorunurTab, setGorunurTab] = useState<"sosyal" | "web">("sosyal");

  return (
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
                  Hemen Al
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
                  Hemen Al
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
