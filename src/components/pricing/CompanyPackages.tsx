import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, Laptop, Sparkles, TrendingUp, Zap } from "lucide-react";
import type { CompanyTypeConfig } from "@/app/sirket-kur/company-types";

type Props = { config: CompanyTypeConfig };

const tierFeatures: Record<string, string[]> = {
  Kur: [
    "Şirket kuruluşu (tam süreç yönetimi)",
    "e-İmza (1 yıllık)",
    "KEP Başlangıç (1 yıllık)",
    "Sanal Ofis adresi (1 yıllık)",
    "e-Dönüşüm altyapısı",
    "Uzman muhasebe & operasyon desteği",
  ],
  "Kur & Yönet": [
    "Kur paketindeki her şey",
    "Microsoft 365 Başlangıç lisansı",
    "Kurumsal e-posta + Microsoft Teams",
    "OneDrive & SharePoint depolama",
    "IT yönetim & destek hattı",
  ],
  "Kur & Büyüt": [
    "Kur & Yönet paketindeki her şey",
    "Web sitesi veya sosyal medya yönetimi",
    "Görünür Ol dijital varlık paketi",
    "İşini Büyüt danışmanlık erişimi",
    "Teşvik, hibe ve yatırımcı desteği",
  ],
};

const tierIcons: Record<string, React.ElementType> = {
  Kur: Zap,
  "Kur & Yönet": Laptop,
  "Kur & Büyüt": TrendingUp,
};

export default function CompanyPackages({ config }: Props) {
  const setupNum = config.price.replace(" TL +KDV", "");

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-[1230px]">
        {/* Section header */}
        <div className="mb-12 max-w-[640px]">
          <p
            className="text-[13px] font-bold uppercase tracking-[0.14em]"
            style={{ color: config.accent }}
          >
            Paketler
          </p>
          <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
            İhtiyacına göre paketi seç.
          </h2>
          <p className="mt-3 text-[15px] text-[#64748B]">
            Tüm paketler <span className="font-semibold text-[#0F172A]">{setupNum} TL +KDV</span> kuruluş ücreti ile başlar · Aylık abonelik
          </p>
        </div>

        {/* 3-column package grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {config.packages.map((pkg) => {
            const Icon = tierIcons[pkg.name] ?? Sparkles;
            const features = tierFeatures[pkg.name] ?? [];
            const isQuote = pkg.monthlyPrice === "Teklif";

            return (
              <div
                key={pkg.name}
                className={`group flex flex-col rounded-[28px] bg-white p-8 transition-all duration-300 hover:-translate-y-1 ${
                  pkg.popular
                    ? "shadow-2xl hover:shadow-2xl"
                    : "shadow-sm ring-1 ring-black/6 hover:shadow-xl hover:ring-black/12"
                }`}
                style={
                  pkg.popular
                    ? { outline: `2px solid ${config.accent}55`, outlineOffset: "-2px" }
                    : undefined
                }
              >
                {pkg.popular && (
                  <span
                    className="mb-4 self-start rounded-full px-3 py-1 text-[11px] font-bold text-white"
                    style={{ backgroundColor: config.accent }}
                  >
                    En Çok Tercih Edilen
                  </span>
                )}

                {/* Icon badge */}
                <div
                  className="mb-5 inline-flex items-center gap-2 rounded-[14px] px-4 py-2 w-fit transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: `${config.accent}14` }}
                >
                  <Icon className="h-5 w-5" style={{ color: config.accent }} />
                  <span className="text-[13px] font-bold" style={{ color: config.accent }}>
                    {pkg.name}
                  </span>
                </div>

                {/* Pricing */}
                <div className="mb-1">
                  {isQuote ? (
                    <div className="flex items-end gap-1.5">
                      <span className="text-[36px] font-extrabold tracking-[-0.03em] text-[#0F172A]">Teklif</span>
                      <span className="mb-2 text-[14px] text-black/50">bazlı</span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-1.5">
                      <span className="text-[36px] font-extrabold tracking-[-0.03em] text-[#0F172A]">{pkg.monthlyPrice}</span>
                      <span className="mb-2 text-[14px] text-black/50">TL/ay +KDV</span>
                    </div>
                  )}
                </div>
                <div className="mb-6 flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 w-fit">
                  <span className="text-[12px] font-semibold text-black/50">+ {setupNum} TL kuruluş +KDV</span>
                </div>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {features.map((f, i) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] leading-7 text-[#475569]">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: i === 0 && pkg.name !== "Kur" ? `${config.accent}80` : config.accent }}
                        strokeWidth={i === 0 && pkg.name !== "Kur" ? 2 : 2.5}
                      />
                      <span className={i === 0 && pkg.name !== "Kur" ? "font-semibold text-[#0F172A]" : ""}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/iletisim"
                  className={`inline-flex items-center justify-center gap-2 rounded-full py-4 text-[14px] font-bold text-center transition-all duration-300 ${
                    pkg.popular
                      ? "text-white hover:opacity-90 shadow-lg"
                      : "bg-black/5 text-[#0F172A] hover:bg-black/10"
                  }`}
                  style={pkg.popular ? { backgroundColor: config.accent, boxShadow: `0 8px 24px ${config.accent}40` } : undefined}
                >
                  {isQuote ? (
                    <>Teklif Al <ArrowRight className="h-4 w-4" /></>
                  ) : (
                    <>{pkg.name} ile Başla <ArrowRight className="h-4 w-4" /></>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Comparison note */}
        <div className="mt-8 flex items-center gap-3 rounded-[20px] bg-white px-6 py-4 shadow-sm ring-1 ring-black/6">
          <Globe className="h-5 w-5 shrink-0" style={{ color: config.accent }} />
          <p className="text-[13px] text-[#64748B]">
            Hangi paketin uygun olduğundan emin değilsen?{" "}
            <Link href="/iletisim" className="font-semibold underline underline-offset-2" style={{ color: config.accent }}>
              Ücretsiz danışmanlık al →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
