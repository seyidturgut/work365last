import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, Globe, Megaphone, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Görünür Ol | Work365",
  description: "Markayı tanıt, müşterine ulaş. Web sitesi ve sosyal medya yönetimiyle markanı dijitalde büyüt.",
};

export default function GorunurOlPage() {
  return (
    <main className="bg-white pt-[92px]">
      <Header />

      {/* Hero */}
      <section className="px-6 py-24 max-w-[1230px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#DBEAFE] px-4 py-2 mb-6">
          <Globe className="h-4 w-4 text-[#1b98d5]" />
          <span className="text-[13px] font-bold text-[#1b98d5]">Görünür Ol</span>
        </div>
        <h1 className="text-[42px] md:text-[58px] font-bold tracking-tighter text-black leading-tight mb-6 max-w-[680px] mx-auto">
          Markayı tanıt,{" "}
          <span className="text-[#1b98d5]">müşterine ulaş.</span>
        </h1>
        <p className="text-[18px] text-black/60 max-w-[520px] mx-auto leading-relaxed">
          Web sitesi ve sosyal medya yönetimiyle markanı dijitalde büyüt.
        </p>
      </section>

      {/* Service cards */}
      <section className="px-6 pb-20 max-w-[1230px] mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Web Sitesi */}
          <Link
            href="/gorunur-ol/web-sitesi"
            className="group rounded-[28px] border border-[#BFDBFE] bg-[#EFF6FF] p-10 flex flex-col gap-5 hover:shadow-lg transition-all"
          >
            <div className="w-14 h-14 rounded-[18px] bg-[#DBEAFE] flex items-center justify-center">
              <Globe className="h-7 w-7 text-[#1b98d5]" />
            </div>
            <div>
              <h2 className="text-[28px] font-bold text-black mb-2">Web Sitesi</h2>
              <p className="text-[15px] text-black/65 leading-relaxed">
                Kurumsal web sitesi tasarım, geliştirme ve bakımı. 20.000 TL&apos;den başlayan kurulum fiyatlarıyla.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-[14px] font-bold text-[#1b98d5]">
              Paketleri İncele
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Sosyal Medya */}
          <Link
            href="/gorunur-ol/sosyal-medya"
            className="group rounded-[28px] border border-[#BFDBFE] bg-[#EFF6FF] p-10 flex flex-col gap-5 hover:shadow-lg transition-all"
          >
            <div className="w-14 h-14 rounded-[18px] bg-[#DBEAFE] flex items-center justify-center">
              <Share2 className="h-7 w-7 text-[#1b98d5]" />
            </div>
            <div>
              <h2 className="text-[28px] font-bold text-black mb-2">Sosyal Medya</h2>
              <p className="text-[15px] text-black/65 leading-relaxed">
                İçerik üretimi, imaj yönetimi ve marka danışmanlığı. 15.000 TL/ay&apos;dan başlayan paketler.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-[14px] font-bold text-[#1b98d5]">
              Paketleri İncele
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Roadmap */}
        <div className="mt-6 rounded-[28px] border border-black/10 bg-[#F8FAFC] p-10 flex items-center gap-6">
          <div className="w-14 h-14 rounded-[18px] bg-black/5 flex items-center justify-center shrink-0">
            <Megaphone className="h-7 w-7 text-black/30" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-[22px] font-bold text-black/40">Reklam Yönetimi</h2>
              <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-bold text-black/40">Yakında</span>
            </div>
            <p className="text-[14px] text-black/40">Google Ads, Meta Ads ve dijital reklam kampanya yönetimi — çok yakında.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#F8FAFC]">
        <div className="max-w-[1230px] mx-auto text-center">
          <h2 className="text-[32px] font-bold text-black mb-4">Dijitalde görünür olmaya hazır mısın?</h2>
          <p className="text-[16px] text-black/55 mb-8">Uzman ekibimiz seni dinlesin, en uygun paketi birlikte belirleyelim.</p>
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
