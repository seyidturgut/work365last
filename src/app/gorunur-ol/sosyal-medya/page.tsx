import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  MessageSquare,
  Share2,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sosyal Medya | Görünür Ol | Work365",
  description:
    "Sosyal medya içerik üretimi, imaj yönetimi ve marka danışmanlığı. 15.000 TL/ay'dan başlayan paketler.",
};

const plans = [
  {
    name: "Başlangıç",
    price: "15.000",
    posts: "4 paylaşım/ay",
    postsNum: "4",
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
    postsNum: "8",
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
    postsNum: "12",
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
    <main className="bg-[#FAFBFC] pt-[92px]">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-12">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#1b98d5] opacity-[0.07] blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#1b98d5] opacity-[0.05] blur-[80px]" />

        <div className="mx-auto max-w-[1230px]">
          <div className="relative rounded-[40px] bg-gradient-to-br from-[#EFF6FF] to-white px-8 py-10 md:px-12 md:py-14">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2">
              <Link href="/gorunur-ol" className="text-[13px] text-[#1b98d5] hover:opacity-70 transition-opacity font-semibold">
                Görünür Ol
              </Link>
              <span className="text-black/20">/</span>
              <span className="text-[13px] font-bold text-[#0F172A]">Sosyal Medya</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              {/* Left */}
              <div className="max-w-[720px]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1b98d5]/10 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1b98d5] ring-1 ring-black/5">
                  <Share2 className="h-4 w-4" />
                  Sosyal Medya
                </div>

                <h1 className="mt-7 text-[30px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[50px]">
                  İçerik üretimi ve marka yönetimi,{" "}
                  <span className="text-[#1b98d5]">sizin için.</span>
                </h1>

                <p className="mt-6 max-w-[580px] text-[18px] leading-[1.8] text-[#475569]">
                  Markanızın sesini bulun, hedef kitlenize ulaşın. İçerik oluşturmak için zaman harcamayın — biz halledelim.
                </p>

                <div className="mt-7 lg:hidden">
                  <div className="relative h-[250px] w-full overflow-hidden rounded-[30px]">
                    <Image src="/auth-startup-team.jpg" alt="Sosyal Medya Yönetimi" fill className="object-cover object-top" sizes="100vw" priority />
                    <div className="absolute inset-0 rounded-[30px]" style={{ background: "linear-gradient(to top, #1b98d530 0%, transparent 60%)" }} />
                  </div>
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/iletisim"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#1b98d5] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_30px_#1b98d540] transition-all duration-300 hover:scale-[1.03] hover:bg-[#1580b3] hover:shadow-lg"
                  >
                    Hemen Al <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                  <Link
                    href="/fiyatlandirma"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] transition-all duration-300 hover:border-black/20 hover:shadow-md"
                  >
                    Tüm Fiyatlandırma <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["4–12 Paylaşım/ay", "Uzman İçerik", "Aylık Rapor"].map((t) => (
                    <span key={t} className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#475569] ring-1 ring-black/8 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right – Hero image */}
              <div className="hidden items-end justify-center lg:flex">
                <div className="relative h-[380px] w-full overflow-hidden rounded-[32px]">
                  <Image src="/auth-startup-team.jpg" alt="Sosyal Medya Yönetimi" fill className="object-cover object-top" sizes="(max-width: 1280px) 50vw, 560px" priority />
                  <div className="absolute inset-0 rounded-[32px]" style={{ background: "linear-gradient(to top, #1b98d530 0%, transparent 60%)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PAKETLER ─── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-4 max-w-[600px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">Fiyatlandırma</p>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
              Markanıza uygun sosyal medya paketi.
            </h2>
            <p className="mt-3 text-[15px] text-[#64748B]">Tüm fiyatlar +KDV · Aylık abonelik</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`group flex flex-col rounded-[28px] bg-white p-8 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "shadow-2xl ring-2 ring-[#1b98d5]/40 hover:ring-[#1b98d5]/60"
                    : "shadow-sm ring-1 ring-black/6 hover:shadow-xl hover:ring-black/12"
                }`}
              >
                {plan.popular && (
                  <span className="mb-4 self-start rounded-full bg-[#1b98d5] px-3 py-1 text-[11px] font-bold text-white">
                    En Çok Tercih Edilen
                  </span>
                )}

                {/* Paylaşım sayısı büyük badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-[14px] bg-[#1b98d5]/10 px-4 py-2 w-fit">
                  <span className="text-[22px] font-extrabold tracking-[-0.03em] text-[#1b98d5]">{plan.postsNum}</span>
                  <span className="text-[13px] font-bold text-[#1b98d5]/70">paylaşım/ay</span>
                </div>

                <h3 className="text-[24px] font-extrabold tracking-[-0.03em] text-[#0F172A]">{plan.name}</h3>
                <div className="mb-6 mt-4">
                  <span className="text-[36px] font-extrabold tracking-[-0.03em] text-[#0F172A]">{plan.price}</span>
                  <span className="ml-1.5 text-[14px] text-black/50">TL/ay +KDV</span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] leading-7 text-[#475569]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1b98d5]" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/iletisim"
                  className={`rounded-full py-4 text-[14px] font-bold text-center transition-all duration-300 ${
                    plan.popular
                      ? "bg-[#1b98d5] text-white hover:bg-[#1580b3] shadow-[0_8px_24px_#1b98d540]"
                      : "bg-black/5 text-[#0F172A] hover:bg-black/10"
                  }`}
                >
                  Hemen Al
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-16 pt-4">
        <div
          className="relative mx-auto max-w-[1230px] overflow-hidden rounded-[40px] px-8 py-14 text-white md:px-12"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1b98d5cc 100%)" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#1b98d5] opacity-20 blur-[60px]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full bg-white opacity-10 blur-[40px]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[640px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/60">Sosyal Medya</p>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-white md:text-[44px]">
                Sosyal medyada aktif olmaya hazır mısın?
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-white/70">
                Ekibimizle görüşün, markanıza özel içerik stratejisi belirleyelim.
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
