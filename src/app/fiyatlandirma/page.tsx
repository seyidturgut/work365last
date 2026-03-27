"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, CheckCircle2, ShieldCheck, Sparkles, X } from "lucide-react";
import { buildPackageSignupHref, formatTl } from "@/lib/pricing";

const plans = [
  {
    name: "Şahıs Şirketi",
    price: 4500,
    yearly: "Defter: 36k/y · Mali müşavirlik: 36k/y",
    badge: "Hızlı Başlangıç",
    theme: "bg-[#FFF6DD]",
    highlight: false,
  },
  {
    name: "Limited Şirketi",
    price: 7500,
    yearly: "Defter: 72k/y · Mali müşavirlik: 72k/y",
    badge: "En Dengeli",
    theme: "bg-[#EEF7FF]",
    highlight: true,
  },
  {
    name: "Anonim Şirketi",
    price: 12000,
    yearly: "Defter: 90k/y · Mali müşavirlik: 90k/y",
    badge: "Kurumsal Yapı",
    theme: "bg-[#EEF9F1]",
    highlight: false,
  },
  {
    name: "Bilanço Şirketi",
    price: 6000,
    yearly: "Defter: 55k/y · Mali müşavirlik: 60k/y",
    badge: "Operasyon Odaklı",
    theme: "bg-[#FFF1F5]",
    highlight: false,
  },
] as const;

const includedItems = [
  "Kuruluş",
  "e-İmza 1Y",
  "KEP Başlangıç 1Y",
  "Sanal Ofis 1Y",
  "e-Dönüşüm",
] as const;

const tableRows = [
  {
    title: "Başlangıç maliyet görünürlüğü",
    work365: "Fiyat ve temel kapsam ilk ekranda açık şekilde görünür.",
    market: "Teklifler çoğu zaman parça parça ve sonradan netleşir.",
  },
  {
    title: "Gizli ücret riski",
    work365: "Paket yapısı baştan görünür olduğu için sürpriz azalır.",
    market: "Ek süreç, belge ve tedarikçi ücretleri çıkabilir.",
  },
  {
    title: "Dijital süreç takibi",
    work365: "Kuruluş, muhasebe ve vergi görünümü tek panelde izlenir.",
    market: "Süreç takibi çoğu zaman e-posta ve manuel iletişime yayılır.",
  },
  {
    title: "e-İmza ve KEP dahil olması",
    work365: "Temel dijital altyapı başlangıç kurgusuna dahildir.",
    market: "Ayrı sağlayıcılarla ayrı alım ve takip gerekir.",
  },
  {
    title: "Tek panelden yönetim",
    work365: "İşletme süreçleri tek görünümde toplanır.",
    market: "Kuruluş, muhasebe ve iletişim farklı araçlara dağılır.",
  },
  {
    title: "Uzman destek erişimi",
    work365: "Süreç boyunca görünür destek akışı ve yönlendirme vardır.",
    market: "Destek deneyimi kişiye ve yoğunluğa bağlı değişebilir.",
  },
  {
    title: "Süreç hızının görünür olması",
    work365: "Durum, bekleyen işler ve ilerleme panelde takip edilir.",
    market: "İlerleme çoğu zaman kullanıcı açısından şeffaf değildir.",
  },
] as const;

const faqs = [
  {
    question: "Başlangıç fiyatına hangi hizmetler dahil?",
    answer:
      "Her plan kartında görünen başlangıç kurgusunda kuruluş, e-İmza 1Y, KEP Başlangıç 1Y, sanal ofis 1Y ve e-Dönüşüm yer alır.",
  },
  {
    question: "Defter ve mali müşavirlik satırları neyi gösteriyor?",
    answer:
      "Bu satırlar, ilgili şirket tipinde yıllık operasyon tarafındaki defter ve mali müşavirlik görünümünü özetlemek için yer alır.",
  },
  {
    question: "Hangi şirket tipi daha uygun olur?",
    answer:
      "Şahıs şirketi sade başlangıçlar için, limited şirket daha dengeli büyüme için, anonim şirket daha kurumsal yapılar için, bilanço şirketi ise operasyon yoğun yapılar için daha uygun olabilir.",
  },
  {
    question: "Work365 ile süreç nasıl ilerliyor?",
    answer:
      "Kurulum ve operasyon adımları tek panelden izlenir; böylece belge, durum ve ilerleme akışı daha görünür hale gelir.",
  },
] as const;

const benefits = [
  {
    title: "Daha az ödeyerek daha fazlasını alın",
    text: "Farklı tedarikçilerden parça parça hizmet toplamak yerine daha net başlangıç kurgusuyla ilerleyin.",
    color: "bg-[#FFF6DD]",
  },
  {
    title: "Tek panelden görünür süreç yönetimi",
    text: "Kuruluş ve operasyon tarafını tek görünümde okuyun, dağınık iletişimi azaltın.",
    color: "bg-[#EEF7FF]",
  },
  {
    title: "Dijital altyapıyı baştan dahil edin",
    text: "e-İmza, KEP ve temel ihtiyaçları ayrı ayrı kovalamadan başlangıç planına dahil görün.",
    color: "bg-[#EEF9F1]",
  },
] as const;

const ecosystemModules = [
  {
    code: "M1",
    name: "Dijital Ofis (Microsoft 365)",
    aLaCarte: "10k–30k TL/ay",
    package: "~%15 ↓",
    model: "0–10 / 10–50 / 50–299 / 300+ kullanıcı",
    description: "Microsoft 365 lisans, kurulum ve yönetimi tek pakette. 0–10 kullanıcı 10.000 TL/ay'dan başlar, 300+ için teklif bazlı.",
    color: "text-[#0F8FA3]",
  },
  {
    code: "M2",
    name: "Web Sitesi",
    aLaCarte: "500–5.000 TL",
    package: "~%15 ↓",
    model: "Kurulum + aylık bakım",
    description: "Serbest, İşletme ve Kurumsal paketleriyle hızlı yayına çıkın. Bakım ve güncellemeler dahil.",
    color: "text-[#2158D2]",
  },
  {
    code: "M2-sosyal",
    name: "Sosyal Medya Yönetimi",
    aLaCarte: "15k–35k TL/ay",
    package: "%25 ↓ yıllık",
    model: "Hf. 1 / 2 / 3 post",
    description: "Başlangıç (15k) · Büyüme (25k) · Pro (35k). Yıllık ödemede %25 indirim. Enterprise için teklif alın.",
    color: "text-[#6638D6]",
  },
  {
    code: "M3",
    name: "Büyüme",
    aLaCarte: "Yakında",
    package: "—",
    model: "Teklif bazlı",
    description: "Tele satış, reklam yönetimi ve dönüşüm optimizasyonu. Operasyonel kapasite kurulduktan sonra fiyatlandırılacak.",
    color: "text-[#9B6B2E]",
  },
  {
    code: "M4",
    name: "İşini Büyüt",
    aLaCarte: "Teklif bazlı",
    package: "~%20 ↓",
    model: "Randevu / proje bazlı",
    description: "Teşvik analizi, hibe başvurusu, yatırımcı erişimi, uzman kiralama ve işe alım hizmetleri.",
    color: "text-[#16A34A]",
  },
] as const;

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="bg-white pt-[92px]">
      <Header />
      <Breadcrumb items={[{ label: "Fiyatlandırma", href: "/fiyatlandirma" }]} />

      <section className="mt-4 bg-[#E9EEF6] px-6 py-0">
        <div className="mx-auto max-w-[1230px]">
          <div className="flex flex-col gap-4 py-0 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden shrink-0 md:block">
                <img
                  src="/paran-guvende.webp"
                  alt="Para güvende görseli"
                  className="h-auto w-[150px] object-contain lg:w-[180px]"
                />
              </div>

              <div className="max-w-[700px]">
                <h2 className="text-[22px] font-bold tracking-[-0.04em] text-black md:text-[28px]">
                  Kusursuz üretim veya paranız iade.
                </h2>
                <p className="mt-2 text-[14px] leading-6 text-black/72 md:text-[15px] md:leading-7">
                  Şirketinizin doğru şekilde kurulmasının ne kadar önemli olduğunu biliyoruz. Hizmetimizden kaynaklanan bir kuruluş hatası olursa, o kısmı sorgusuz sualsiz iade edeceğiz.
                </p>
              </div>
            </div>

            <Link
              href="/hizmet-sartlari/para-iade-kosullari"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-4 py-2.5 text-[14px] font-bold text-black shadow-sm ring-1 ring-black/6 transition-colors hover:bg-black hover:text-white md:self-center"
            >
              Şartlara bakın <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10 pt-6">
        <div className="mx-auto max-w-[1230px]">
          <div className="mx-auto max-w-[920px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF4D0] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#9A7B31]">
              <Sparkles className="h-4 w-4" />
              Fiyatlandırma
            </span>
            <h1 className="mt-6 text-[30px] font-bold leading-[1.02] tracking-[-0.05em] text-black md:text-[50px]">
              Yüksek danışmanlık ücretleri yerine daha net ve görünür başlangıç paketleri.
            </h1>
            <p className="mx-auto mt-6 max-w-[760px] text-[18px] leading-8 text-black/70">
              Şirket kurulumunu, dijital altyapıyı ve başlangıç kapsamını ilk ekranda görün. Farklı teklifleri toplamak yerine, ne aldığınızı en baştan bilin.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/kayit-ol"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-[15px] font-bold text-white"
              >
                Hemen Başlayın <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#planlar"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 text-[15px] font-bold text-black"
              >
                Planları Karşılaştır
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Baz Bedeli */}
      <section className="px-6 pb-4 pt-2">
        <div className="mx-auto max-w-[1230px]">
          <div className="flex flex-col items-start justify-between gap-4 rounded-[28px] border border-[#1b98d5]/20 bg-[#F0F9FF] px-6 py-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1b98d5] text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1b98d5]">Zorunlu · Tüm Müşteriler</p>
                <p className="mt-1 text-[18px] font-bold text-black">Platform Baz Bedeli</p>
                <p className="mt-0.5 text-[14px] text-black/60">Aylık işletme ücreti — tüm hizmetlere erişim için gerekli</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-right">
              <div>
                <p className="text-[13px] font-semibold text-black/50">Aylık</p>
                <p className="mt-1 text-[28px] font-bold tracking-[-0.04em] text-black">390 TL</p>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#1b98d5]">Yıllık · %30 İndirim</p>
                <p className="mt-1 text-[28px] font-bold tracking-[-0.04em] text-black">275 TL<span className="text-[16px] text-black/50">/ay</span></p>
                <p className="text-[12px] text-black/40">Toplam 3.300 TL/yıl</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="planlar" className="px-6 pb-12 pt-4">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">Şirket Kuruluşu</p>
              <h2 className="mt-3 text-[32px] font-bold tracking-[-0.04em] text-black md:text-[44px]">
                Şirket tipine göre ne aldığınızı doğrudan karşılaştırın.
              </h2>
            </div>
            <div className="inline-flex w-full max-w-[290px] rounded-full bg-white p-1 shadow-sm ring-1 ring-black/8">
              <button
                type="button"
                onClick={() => setBillingPeriod("monthly")}
                className={`flex-1 rounded-full px-4 py-3 text-[14px] font-bold transition ${
                  billingPeriod === "monthly" ? "bg-black text-white" : "text-black/55"
                }`}
              >
                Aylık
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod("yearly")}
                className={`flex-1 rounded-full px-4 py-3 text-[14px] font-bold transition ${
                  billingPeriod === "yearly" ? "bg-[#1b98d5] text-white" : "text-black/55"
                }`}
              >
                Yıllık %15 İndirim
              </button>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-4">
            {plans.map((plan) => {
              const displayPrice =
                billingPeriod === "yearly" ? Math.round(plan.price * 0.85) : plan.price;
              return (
              <div
                key={plan.name}
                className={`relative flex h-full flex-col rounded-[34px] bg-white p-5 shadow-sm ring-1 ring-black/6 ${
                  plan.highlight ? "border-2 border-[#1b98d5]" : ""
                }`}
              >
                {plan.highlight ? (
                  <div className="absolute right-5 top-5 rounded-full bg-[#1b98d5] px-3 py-1 text-[11px] font-bold text-white">
                    Önerilen
                  </div>
                ) : null}

                <div className={`rounded-[26px] px-4 py-4 ${plan.theme}`}>
                  <div className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold text-black/65 ring-1 ring-black/5">
                    {plan.badge}
                  </div>
                  <p className="mt-3 text-[16px] font-bold text-black">{plan.name}</p>
                  <p className="mt-3 text-[38px] font-bold tracking-[-0.05em] text-black">
                    {formatTl(displayPrice)}
                  </p>
                  {billingPeriod === "yearly" ? (
                    <p className="mt-2 text-[13px] font-semibold leading-6 text-black/45 line-through">
                      {formatTl(plan.price)}
                    </p>
                  ) : null}
                  <p className="mt-2 text-[13px] font-semibold leading-6 text-black/55">{plan.yearly}</p>
                </div>

                <div className="mt-4 flex-1 space-y-2">
                  {includedItems.map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-[18px] bg-[#F8F8F7] px-3 py-3">
                      <Check className="h-4 w-4 text-[#00A86B]" />
                      <span className="text-[14px] font-medium text-black/72">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={buildPackageSignupHref(plan.name, displayPrice, {
                    label: plan.name,
                    source: "Fiyatlandırma sayfasından seçildi",
                    term: billingPeriod === "yearly" ? "Yıllık plan" : "Aylık plan",
                    description: `${plan.badge} paket. ${plan.yearly}`,
                    features: includedItems,
                  })}
                  className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-bold ${
                    plan.highlight ? "bg-[#1b98d5] text-white" : "bg-black text-white"
                  }`}
                >
                  Bu Paketle Başla <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* M0 Ek Hizmetler */}
      <section className="px-6 pb-12 pt-2">
        <div className="mx-auto max-w-[1230px] rounded-[38px] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8 md:py-10">
          <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">M0 — Ek Hizmetler</p>
          <h2 className="mt-3 text-[28px] font-bold tracking-[-0.04em] text-black md:text-[38px]">
            Kuruluşa ek olarak ihtiyacınıza göre seçin.
          </h2>
          <p className="mt-3 text-[16px] leading-7 text-black/60">
            Aşağıdaki hizmetler şirket kuruluş paketinize bağımsız olarak eklenebilir.
          </p>

          <div className="mt-8 space-y-6">

            {/* e-İmza */}
            <div>
              <p className="mb-3 text-[15px] font-bold text-black">e-İmza (E-Tuğra Nitelikli)</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-[#DCE7F1] bg-[#F8FAFC] px-5 py-4">
                  <p className="text-[15px] font-bold text-black">1 Yıllık</p>
                  <p className="mt-1 text-[28px] font-bold tracking-[-0.04em] text-black">2.300 TL</p>
                  <p className="mt-1 text-[13px] text-black/50">Yıllık 192 TL/ay karşılığı</p>
                </div>
                <div className="rounded-[22px] border-2 border-[#1b98d5] bg-[#F0F9FF] px-5 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[15px] font-bold text-black">3 Yıllık</p>
                    <span className="rounded-full bg-[#1b98d5] px-2.5 py-1 text-[11px] font-bold text-white">En iyi değer</span>
                  </div>
                  <p className="mt-1 text-[28px] font-bold tracking-[-0.04em] text-black">4.600 TL</p>
                  <p className="mt-1 text-[13px] font-semibold text-[#1b98d5]">1.300 TL tasarruf · 128 TL/ay</p>
                </div>
              </div>
            </div>

            {/* KEP */}
            <div>
              <p className="mb-3 text-[15px] font-bold text-black">KEP — Kayıtlı Elektronik Posta</p>
              <p className="mb-3 text-[13px] text-black/50">Ek yetkili: +99 TL/adet · Tüm paketlerde geçerli</p>
              <div className="overflow-hidden rounded-[22px] ring-1 ring-[#DCE7F1]">
                <div className="hidden bg-[#F8FAFC] md:grid md:grid-cols-4">
                  {["Paket", "Kontör", "1 Yıl", "3 Yıl"].map((h) => (
                    <div key={h} className="px-4 py-3 text-[13px] font-bold text-black/60">{h}</div>
                  ))}
                </div>
                {[
                  { name: "Başlangıç", kontor: "0 kontör", y1: "520 TL", y3: "1.215 TL" },
                  { name: "Standart", kontor: "20 kontör", y1: "855 TL", y3: "1.550 TL" },
                  { name: "Pro", kontor: "50 kontör", y1: "1.149 TL", y3: "1.844 TL" },
                  { name: "Kurumsal", kontor: "100+ kontör", y1: "1.779 TL", y3: "2.474 TL" },
                ].map((row, i) => (
                  <div key={row.name} className={`md:grid md:grid-cols-4 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"} border-t border-[#DCE7F1]`}>
                    <div className="px-4 py-3 text-[15px] font-bold text-black">{row.name}</div>
                    <div className="px-4 py-3 text-[15px] text-black/60">{row.kontor}</div>
                    <div className="px-4 py-3 text-[15px] font-semibold text-black">{row.y1}</div>
                    <div className="px-4 py-3 text-[15px] font-semibold text-[#1b98d5]">{row.y3}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Muhasebe + Dijital Asistan yan yana */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Muhasebe */}
              <div>
                <p className="mb-1 text-[15px] font-bold text-black">Online Muhasebe Danışmanlığı</p>
                <p className="mb-3 text-[13px] text-black/50">2026 SMMM asgari tarifesinin %72 altında</p>
                <div className="space-y-3">
                  {[
                    { name: "Başlangıç", kriter: "≤50 belge/ay · <1M TL ciro", ay: "990 TL/ay", yillik: "695 TL/ay yıllık" },
                    { name: "Standart", kriter: "51–300 belge · 1–10M TL", ay: "1.790 TL/ay", yillik: "1.255 TL/ay yıllık" },
                    { name: "Kurumsal", kriter: "300+ belge · 10M+ TL", ay: "2.990 TL/ay", yillik: "2.095 TL/ay yıllık" },
                  ].map((row) => (
                    <div key={row.name} className="flex items-center justify-between rounded-[18px] border border-[#DCE7F1] bg-[#F8FAFC] px-4 py-3.5">
                      <div>
                        <p className="text-[14px] font-bold text-black">{row.name}</p>
                        <p className="text-[12px] text-black/50">{row.kriter}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-bold text-black">{row.ay}</p>
                        <p className="text-[12px] font-semibold text-[#1b98d5]">{row.yillik}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dijital Asistan */}
              <div>
                <p className="mb-1 text-[15px] font-bold text-black">Dijital Asistan (AI+İnsan)</p>
                <p className="mb-3 text-[13px] text-black/50">Belge işleme · Fatura kesilemez</p>
                <div className="space-y-3">
                  {[
                    { name: "Başlangıç", kriter: "0–50 belge/ay", ay: "490 TL/ay", yillik: "345 TL/ay yıllık" },
                    { name: "Standart", kriter: "51–200 belge/ay", ay: "990 TL/ay", yillik: "695 TL/ay yıllık" },
                    { name: "Pro", kriter: "200+ belge/ay", ay: "1.990 TL/ay", yillik: "1.395 TL/ay yıllık" },
                  ].map((row) => (
                    <div key={row.name} className="flex items-center justify-between rounded-[18px] border border-[#DCE7F1] bg-[#F8FAFC] px-4 py-3.5">
                      <div>
                        <p className="text-[14px] font-bold text-black">{row.name}</p>
                        <p className="text-[12px] text-black/50">{row.kriter}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-bold text-black">{row.ay}</p>
                        <p className="text-[12px] font-semibold text-[#1b98d5]">{row.yillik}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Marka Tescil + Teşvik + Sanal Ofis */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[22px] border border-[#DCE7F1] bg-[#F8FAFC] px-5 py-5">
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">Marka Tescil</p>
                <p className="mt-3 text-[26px] font-bold tracking-[-0.04em] text-black">4.900 TL</p>
                <p className="mt-1 text-[13px] text-black/50">TPE harcı dahil · 1 sınıf</p>
                <div className="mt-3 space-y-1.5 text-[13px] text-black/60">
                  <p>+ 1.500 TL / ek sınıf</p>
                  <p>+ 290 TL/ay takip & yenileme</p>
                </div>
              </div>
              <div className="rounded-[22px] border border-[#DCE7F1] bg-[#F8FAFC] px-5 py-5">
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">Teşvik Analizi</p>
                <p className="mt-3 text-[13px] text-black/50">KOSGEB · TÜBİTAK · Ticaret Bak.</p>
                <p className="mt-2 text-[26px] font-bold tracking-[-0.04em] text-black">990 TL</p>
                <p className="mt-1 text-[13px] text-black/50">Tek seferlik AI analizi</p>
                <p className="mt-2 text-[13px] text-black/60">+ 290 TL/ay aktif başvuru takibi</p>
              </div>
              <div className="rounded-[22px] border border-[#DCE7F1] bg-[#F8FAFC] px-5 py-5">
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">Sanal Ofis</p>
                <p className="mt-3 text-[13px] font-semibold text-[#16A34A]">Kuruluşta 1 Yıl Ücretsiz</p>
                <p className="mt-2 text-[26px] font-bold tracking-[-0.04em] text-black">490 TL<span className="text-[15px] text-black/50">/ay</span></p>
                <p className="mt-1 text-[13px] text-black/50">Devam aboneliği</p>
                <p className="mt-1 text-[13px] font-semibold text-[#1b98d5]">345 TL/ay yıllık (%30 ↓)</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-[1230px]">
          <div className="grid gap-4 lg:grid-cols-3">
            {benefits.map((item) => (
              <div key={item.title} className={`rounded-[30px] px-6 py-6 ${item.color}`}>
                <div className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-black/60">
                  Avantaj
                </div>
                <h3 className="mt-4 text-[24px] font-bold tracking-[-0.03em] text-black">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-black/68">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-[1230px] rounded-[38px] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8 md:py-10">
          <div className="max-w-[920px]">
            <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">Ekosistem Modülleri</p>
            <h2 className="mt-3 text-[32px] font-bold tracking-[-0.04em] text-black md:text-[44px]">
              İşinizi büyüten ekosistem modüllerini tek yapı içinde ekleyin.
            </h2>
            <p className="mt-4 text-[17px] leading-8 text-black/70">
              Her modül operasyon paketine eklenebilir. İhtiyacınız olan modülleri tek tek seçebilir ya da tüm ekosistemi birlikte alarak daha avantajlı bir yapıyla ilerleyebilirsiniz.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[28px] ring-1 ring-[#D7E0EA]">
            <div className="hidden bg-[#142552] text-white md:grid md:grid-cols-[1.45fr_0.75fr_0.8fr_0.8fr_1.4fr]">
              {["Modül", "Tekil alım /ay", "Pakette /ay", "Model", "Açıklama"].map((item) => (
                <div key={item} className="px-5 py-4 text-[15px] font-bold">
                  {item}
                </div>
              ))}
            </div>

            <div className="divide-y divide-[#D7E0EA]">
              {ecosystemModules.map((module) => (
                <div key={module.code} className="bg-[#F9FBFC] md:grid md:grid-cols-[1.45fr_0.75fr_0.8fr_0.8fr_1.4fr]">
                  <div className="px-5 py-5">
                    {module.code === "M4" ? (
                      <Link href="/buyut" className={`group inline-flex items-center gap-1.5 text-[18px] font-bold underline-offset-4 hover:underline ${module.color}`}>
                        {module.name}
                        <span className="text-[11px] font-semibold text-[#94A3B8] group-hover:text-current">↗</span>
                      </Link>
                    ) : (
                      <p className={`text-[18px] font-bold ${module.color}`}>{module.name}</p>
                    )}
                  </div>
                  <div className="px-5 py-5 md:border-l md:border-[#D7E0EA]">
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-black/40 md:hidden">Tekil alım /ay</p>
                    <p className="mt-1 text-[17px] font-bold text-[#1A2952]">{module.aLaCarte}</p>
                  </div>
                  <div className="px-5 py-5 md:border-l md:border-[#D7E0EA]">
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-black/40 md:hidden">Pakette /ay</p>
                    <p className="mt-1 text-[17px] font-bold text-black/55">{module.package}</p>
                  </div>
                  <div className="px-5 py-5 md:border-l md:border-[#D7E0EA]">
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-black/40 md:hidden">Model</p>
                    <p className="mt-1 text-[17px] font-medium text-black/55">{module.model}</p>
                  </div>
                  <div className="px-5 py-5 md:border-l md:border-[#D7E0EA]">
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-black/40 md:hidden">Açıklama</p>
                    <p className="mt-1 text-[17px] leading-8 text-black/74">{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">Karşılaştırmalı görünüm</p>
            <h2 className="text-[34px] font-bold tracking-[-0.04em] text-black md:text-[46px]">
              Piyasadaki alternatiflere göre neden daha görünür bir başlangıç sağlıyoruz?
            </h2>
          </div>

          <div className="overflow-hidden rounded-[36px] bg-white shadow-sm ring-1 ring-black/6">
            <div className="grid border-b border-black/5 bg-[#FBFBFB] md:grid-cols-[0.9fr_1.05fr_1.05fr]">
              <div className="hidden px-6 py-5 md:block" />
              <div className="px-6 py-5 text-center text-[18px] font-bold text-black">Work365</div>
              <div className="px-6 py-5 text-center text-[18px] font-bold text-black/70">Piyasadaki Alternatifler</div>
            </div>

            {tableRows.map((row, index) => (
              <div
                key={row.title}
                className={`grid border-b border-black/5 last:border-b-0 md:grid-cols-[0.9fr_1.05fr_1.05fr] ${
                  index % 2 === 0 ? "bg-white" : "bg-[#FCFCFC]"
                }`}
              >
                <div className="px-6 py-5 text-[15px] font-bold text-black">{row.title}</div>
                <div className="px-6 py-5">
                  <div className="flex items-start gap-3 rounded-[22px] bg-[#EFF9F5] px-4 py-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00A86B]" />
                    <span className="text-[14px] leading-7 text-black/72">{row.work365}</span>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="flex items-start gap-3 rounded-[22px] bg-[#FFF5F5] px-4 py-4">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-[#D84C6F]" />
                    <span className="text-[14px] leading-7 text-black/72">{row.market}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-8">
        <div className="mx-auto max-w-[1230px] rounded-[42px] bg-[linear-gradient(135deg,#FFF4D0_0%,#EAF5FF_50%,#EAF8EF_100%)] px-7 py-10 md:px-10 md:py-12">
          <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#9A7B31]">Karar desteği</p>
          <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-black md:text-[48px]">
            Hangi yapıda ne dahil, hangi şirkette hangi maliyet oluşur?
          </h2>
          <p className="mt-5 max-w-[760px] text-[18px] leading-8 text-black/70">
            Şirket tipi, başlangıç kapsamı ve yıllık operasyon görünümünü aynı bakışta okuyarak daha sağlıklı karar verin.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kayit-ol"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-[15px] font-bold text-white"
            >
              Hemen Başlayın <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#planlar"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 text-[15px] font-bold text-black"
            >
              Planlara Dön
            </a>
          </div>
        </div>
      </section>

      <section id="sss" className="px-6 pb-20 pt-2">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-8 text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">Sıkça Sorulanlar</p>
            <h2 className="mt-3 text-[32px] font-bold tracking-[-0.04em] text-black md:text-[42px]">
              Fiyatlandırma hakkında en çok sorulanlar
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-[26px] bg-white px-6 py-5 shadow-sm ring-1 ring-black/5">
                <summary className="cursor-pointer list-none text-[17px] font-bold text-black">
                  {faq.question}
                </summary>
                <p className="pt-4 text-[15px] leading-8 text-black/68">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
