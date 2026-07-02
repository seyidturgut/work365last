import type { Metadata } from "next";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, CircleHelp, ShieldCheck, Sparkles, WalletCards, X } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work365 vs Geleneksel Muhasebe | Karşılaştır",
  description:
    "Work365'i geleneksel muhasebe ve danışmanlık süreçleriyle karşılaştırın: şeffaf paket fiyatları, dijital süreç ve tek noktadan yönetim.",
  path: "/karsilastir",
});

const packages = [
  {
    name: "Şahıs Şirketi",
    price: "5.900 TL",
    details: "Defter: 36k/y · Mali müşavirlik: 36k/y",
    accent: "bg-[#FFF6D9]",
  },
  {
    name: "Limited Şirketi",
    price: "9.900 TL",
    details: "Defter: 72k/y · Mali müşavirlik: 72k/y",
    accent: "bg-[#EAF5FF]",
  },
  {
    name: "Anonim Şirketi",
    price: "11.900 TL",
    details: "Defter: 90k/y · Mali müşavirlik: 90k/y",
    accent: "bg-[#EAF8EF]",
  },
  {
    name: "Bilanço Şirketi",
    price: "7.400 TL",
    details: "Defter: 55k/y · Mali müşavirlik: 60k/y",
    accent: "bg-[#FFF0F4]",
  },
] as const;

const packageItems = [
  "Kuruluş",
  "e-İmza 1Y",
  "KEP Başlangıç 1Y",
  "Sanal Ofis 1Y",
  "e-Dönüşüm",
];

const comparisonRows = [
  {
    title: "Tek paket fiyat şeffaflığı",
    work365: "Net paket yapısı ve başlangıçtan görünen içerik",
    market: "Parça parça teklif ve sonradan eklenen kalemler",
  },
  {
    title: "Gizli ücret riski",
    work365: "Başlangıçta ne aldığınız açık şekilde görünür",
    market: "Süreç ilerledikçe ek hizmet ve işlem ücretleri çıkabilir",
  },
  {
    title: "Dijital süreç takibi",
    work365: "Kuruluş, muhasebe ve vergi görünümü tek panelde",
    market: "Çoğu zaman e-posta, WhatsApp ve manuel takip gerekir",
  },
  {
    title: "e-İmza ve KEP dahil olması",
    work365: "Temel dijital altyapı paket içinde sunulur",
    market: "Ayrı tedarikçi ve ayrı sözleşme gerekir",
  },
  {
    title: "Tek panelden yönetim",
    work365: "İşletme süreçleri tek bir akışta görünür",
    market: "Farklı araçlar arasında dağınık bir deneyim oluşur",
  },
  {
    title: "Uzman destek erişimi",
    work365: "Süreç boyunca yönlendirme ve görünür destek akışı",
    market: "Destek çoğu zaman kişiye ve yoğunluğa bağlı ilerler",
  },
  {
    title: "Süreç hızının görünür olması",
    work365: "Durum, adım ve bekleyen işler panelde izlenir",
    market: "İlerlemenin durumu net biçimde görünmeyebilir",
  },
] as const;

const comparisonFaqs = [
  {
    question: "Bu fiyatlara hangi hizmetler dahil?",
    answer:
      "Belirtilen başlangıç paketlerinde kuruluş, e-İmza 1Y, KEP Başlangıç 1Y, sanal ofis 1Y ve e-Dönüşüm başlangıç kapsamı birlikte sunulur.",
  },
  {
    question: "Defter ve mali müşavirlik rakamları neyi gösteriyor?",
    answer:
      "Bu satırlar, ilgili şirket tipinde yıllık operasyon tarafında oluşabilecek defter ve mali müşavirlik maliyet görünümünü özetlemek için yazılmıştır.",
  },
  {
    question: "Work365 ile süreç nasıl ilerliyor?",
    answer:
      "Kuruluş ve operasyon adımları tek panelden görünür. Böylece başvuru, belge ve süreç takibini dağınık kanallar yerine tek akışta izlersiniz.",
  },
] as const;

export default function ComparisonPage() {
  return (
    <main className="bg-white pt-[92px]">
      <Header />
      <Breadcrumb items={[{ label: "Planları Karşılaştır", href: "/karsilastir" }]} />
      <section className="px-6 pb-16 pt-10">
        <div className="mx-auto max-w-[1230px]">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[40px] bg-[#FFF4D0] px-7 py-8 md:px-10 md:py-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#9A7B31]">
                <Sparkles className="h-4 w-4" />
                Türkiye'deki alternatiflere karşı
              </span>

              <h1 className="mt-6 max-w-[760px] text-[36px] font-bold leading-[1.02] tracking-[-0.04em] text-black md:text-[58px]">
                Türkiye&apos;de aynı işi yapanlara göre daha az ödeyerek daha fazlasını elde edin.
              </h1>

              <p className="mt-6 max-w-[700px] text-[18px] leading-8 text-black/72">
                İş kurmak için fahiş danışmanlık ücretleri ödemenize gerek yok. Work365, kuruluş ve
                dijital altyapı ihtiyaçlarını daha açık, daha öngörülebilir ve daha kolay yönetilen
                paketlerle sunar.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/kayit-ol"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-[15px] font-bold text-white"
                >
                  Hemen Başlayın <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#fiyatlar"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 text-[15px] font-bold text-black"
                >
                  Fiyatları İncele
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ["4 paket", "Farklı şirket tipine göre net başlangıç kurgusu"],
                  ["5 kalem", "Temel dijital altyapı dahil görünür kapsam"],
                  ["Tek panel", "Kuruluş ve operasyon takibini aynı akışta görün"],
                ].map(([value, label]) => (
                  <div key={value} className="rounded-[24px] bg-white/70 px-4 py-4 ring-1 ring-black/5">
                    <p className="text-[22px] font-bold tracking-[-0.03em] text-black">{value}</p>
                    <p className="mt-1 text-[13px] leading-6 text-black/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[40px] bg-white px-7 py-8 shadow-sm ring-1 ring-black/5 md:px-8 md:py-9">
              <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">
                Neden Work365?
              </p>
              <div className="mt-5 space-y-4">
                {[
                  "Kuruluş, e-İmza, KEP ve operasyon ihtiyaçlarını tek paketle başlatın.",
                  "Ek hizmetleri sonradan kovalamak yerine baştan net kapsam görün.",
                  "Kurulumdan büyümeye kadar süreç görünürlüğünü tek panelde koruyun.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[22px] bg-[#F8FBFF] px-4 py-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#1b98d5]" />
                    <span className="text-[15px] font-medium leading-7 text-black/75">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[28px] bg-[#0F172A] px-5 py-5 text-white">
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#9edfff]">
                  <ShieldCheck className="h-4 w-4" />
                  Net maliyet yaklaşımı
                </div>
                <p className="mt-3 text-[16px] font-bold leading-7">
                  Aynı ihtiyacı farklı tedarikçilerden toplamak yerine, başlangıç yapısını tek bir pakette görün.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-[22px] bg-[#FFF9E7] px-4 py-4">
                  <div className="flex items-center gap-2 text-[#9A7B31]">
                    <WalletCards className="h-4 w-4" />
                    <span className="text-[12px] font-bold uppercase tracking-[0.12em]">Maliyet netliği</span>
                  </div>
                  <p className="mt-2 text-[14px] font-bold leading-6 text-black">Ek teklif kovalatmadan daha görünür başlangıç yapısı.</p>
                </div>
                <div className="rounded-[22px] bg-[#EFF9F5] px-4 py-4">
                  <div className="flex items-center gap-2 text-[#00A86B]">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-[12px] font-bold uppercase tracking-[0.12em]">Süreç görünürlüğü</span>
                  </div>
                  <p className="mt-2 text-[14px] font-bold leading-6 text-black">Kuruluş sonrası da dağılmayan panel deneyimi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="fiyatlar" className="px-6 py-10">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#9A7B31]">Bizim fiyatlarımız</p>
            <h2 className="text-[34px] font-bold tracking-[-0.04em] text-black md:text-[46px]">
              Şirket tipine göre ne aldığınızı ilk günden görün.
            </h2>
            <p className="max-w-[760px] text-[17px] leading-8 text-black/68">
              Kuruluş maliyeti, dijital altyapı ve operasyon başlangıcı tek kartta görünür. Sonradan eklenen sürprizler yerine baştan net bir kapsam alın.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((item) => (
              <div key={item.name} className="rounded-[32px] bg-white p-5 shadow-sm ring-1 ring-black/5">
                <div className={`rounded-[24px] px-4 py-4 ${item.accent}`}>
                  <p className="text-[15px] font-bold text-black">{item.name}</p>
                  <p className="mt-3 text-[34px] font-bold tracking-[-0.04em] text-black">{item.price}</p>
                  <p className="mt-2 text-[13px] font-semibold leading-6 text-black/55">{item.details}</p>
                  <div className="mt-3 inline-flex rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold text-black/65 ring-1 ring-black/5">
                    Tek paket başlangıç görünümü
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {packageItems.map((packageItem) => (
                    <div key={packageItem} className="flex items-center gap-2 rounded-[18px] bg-[#F8F8F7] px-3 py-3">
                      <Check className="h-4 w-4 text-[#00A86B]" />
                      <span className="text-[14px] font-medium text-black/72">{packageItem}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">Karşılaştırma</p>
            <h2 className="text-[34px] font-bold tracking-[-0.04em] text-black md:text-[46px]">
              Türkiye&apos;deki geleneksel alternatiflere göre ne fark yaratıyoruz?
            </h2>
          </div>

          <div className="overflow-hidden rounded-[36px] bg-white shadow-sm ring-1 ring-black/5">
            <div className="grid gap-0 border-b border-black/5 bg-[#FBFBFB] md:grid-cols-[0.9fr_1.05fr_1.05fr]">
              <div className="hidden px-6 py-5 md:block" />
              <div className="px-6 py-5 text-center text-[18px] font-bold text-black">Work365</div>
              <div className="px-6 py-5 text-center text-[18px] font-bold text-black/70">Piyasadaki Alternatifler</div>
            </div>

            {comparisonRows.map((row, index) => (
              <div
                key={row.title}
                className={`grid gap-0 border-b border-black/5 last:border-b-0 md:grid-cols-[0.9fr_1.05fr_1.05fr] ${
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

      <section className="px-6 pb-20 pt-8">
        <div className="mx-auto max-w-[1230px] rounded-[40px] bg-[linear-gradient(135deg,#FFF4D0_0%,#EAF5FF_50%,#EAF8EF_100%)] px-7 py-10 md:px-10 md:py-12">
          <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#9A7B31]">Karar desteği</p>
          <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-black md:text-[48px]">
            Hangi yapıda ne dahil, hangi şirkette hangi maliyet oluşur?
          </h2>
          <p className="mt-5 max-w-[760px] text-[18px] leading-8 text-black/70">
            Şirket tipi, dijital altyapı ve başlangıç maliyetlerini tek yerden görerek daha sağlıklı bir karar verin. İsterseniz doğrudan kuruluma geçin.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kayit-ol"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-[15px] font-bold text-white"
            >
              Hemen Başlayın <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#fiyatlar"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 text-[15px] font-bold text-black"
            >
              Paketleri Tekrar Gör
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-2">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-8 text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">Sıkça Sorulanlar</p>
            <h2 className="mt-3 text-[32px] font-bold tracking-[-0.04em] text-black md:text-[42px]">
              Karşılaştırma sayfası hakkında en çok sorulanlar
            </h2>
          </div>

          <div className="space-y-4">
            {comparisonFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-[26px] bg-white px-6 py-5 shadow-sm ring-1 ring-black/5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold text-black">
                  {faq.question}
                  <CircleHelp className="h-5 w-5 shrink-0 text-[#1b98d5]" />
                </summary>
                <p className="pt-4 text-[15px] leading-8 text-black/68">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
