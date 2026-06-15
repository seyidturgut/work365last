"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BillingToggle from "@/components/pricing/BillingToggle";
import PricingValue from "@/components/pricing/PricingValue";
import { calculateSavingsPercent } from "@/lib/pricing";
import { skuFor } from "@/lib/catalog";
import { ArrowRight, CheckCircle2, Globe, Laptop, TrendingUp, Zap } from "lucide-react";

type Props = {
  accent: string;
  companySlug: string;
  packages: readonly {
    name: string;
    monthlyPrice: string;
    yearlyPrice: string;
    popular: boolean;
  }[];
};

const tierFeatures: Record<string, string[]> = {
  "Şirketini Kur": [
    "Şirket kuruluşu (tescil, ana sözleşme, sicil)",
    "e-İmza (1 yıl)",
    "Sanal ofis (1 yıl)",
    "e-Dönüşüm aktivasyonu (e-fatura, e-arşiv)",
    "Online muhasebe danışmanlığı",
    "Ön muhasebe",
    "Dijital asistan (hibrit AI + insan)",
    "Marka tescil analizi + teşvik ön analizi",
    "2.400 belge/yıl",
  ],
  "Şirketini + Dijital Ofisini Kur": [
    "Şirketini Kur paketindeki her şey",
    "Microsoft 365 Başlangıç lisansı",
    "Kurumsal e-posta + Microsoft Teams",
    "OneDrive & SharePoint depolama",
    "IT yönetim & destek hattı",
  ],
  "Şirketini + Dijital Ofisini Kur + İşini Büyüt": [
    "Şirketini + Dijital Ofisini Kur paketindeki her şey",
    "Web sitesi veya sosyal medya yönetimi",
    "Görünür Ol dijital varlık paketi",
    "İşini Büyüt danışmanlık erişimi",
    "Teşvik, hibe ve yatırımcı desteği",
  ],
};

const tierIcons: Record<string, React.ElementType> = {
  "Şirketini Kur": Zap,
  "Şirketini + Dijital Ofisini Kur": Laptop,
  "Şirketini + Dijital Ofisini Kur + İşini Büyüt": TrendingUp,
};

// Her tier'a kendine özgü renk
const tierColors: Record<string, { bg: string; text: string; light: string; gradient: string }> = {
  "Şirketini Kur": {
    bg: "#D97706",
    text: "#ffffff",
    light: "#FEF3C7",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  },
  "Şirketini + Dijital Ofisini Kur": {
    bg: "#1b98d5",
    text: "#ffffff",
    light: "#DBEAFE",
    gradient: "linear-gradient(135deg, #38bdf8 0%, #1b98d5 100%)",
  },
  "Şirketini + Dijital Ofisini Kur + İşini Büyüt": {
    bg: "#0F172A",
    text: "#ffffff",
    light: "#F1F5F9",
    gradient: "linear-gradient(135deg, #334155 0%, #0F172A 100%)",
  },
};

export default function CompanyPackages({ accent, companySlug, packages }: Props) {
  const [yearly, setYearly] = useState(false);
  const discountValues = packages
    .filter((pkg) => pkg.monthlyPrice !== "Teklif" && pkg.yearlyPrice !== "Teklif")
    .map((pkg) => calculateSavingsPercent(pkg.monthlyPrice, pkg.yearlyPrice))
    .filter((value) => value > 0);
  const minDiscount = discountValues.length ? Math.min(...discountValues) : 0;
  const maxDiscount = discountValues.length ? Math.max(...discountValues) : 0;
  const savingsLabel =
    minDiscount && maxDiscount
      ? minDiscount === maxDiscount
        ? `~%${minDiscount} tasarruf`
        : `~%${minDiscount}-%${maxDiscount} tasarruf`
      : null;

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-[1230px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-[640px]"
        >
          <p className="text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
            Paketler
          </p>
          <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
            İhtiyacına göre paketi seç.
          </h2>
          <p className="mt-3 text-[15px] text-[#64748B]">
            Tüm fiyatlar +KDV · Aylık abonelik
          </p>
        </motion.div>

        {/* Aylık / Yıllık toggle */}
        <BillingToggle yearly={yearly} onChange={setYearly} savingsLabel={savingsLabel} className="mb-8" />

        {/* 3-column package grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => {
            const Icon = tierIcons[pkg.name] ?? Zap;
            const features = tierFeatures[pkg.name] ?? [];
            const isQuote = pkg.monthlyPrice === "Teklif";
            const displayPrice = isQuote ? "Teklif" : (yearly ? pkg.yearlyPrice : pkg.monthlyPrice);
            const colors = tierColors[pkg.name] ?? { bg: accent, text: "#fff", light: "#f0f7ff", gradient: `linear-gradient(135deg, ${accent} 0%, ${accent} 100%)` };

            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className={`group flex flex-col rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  pkg.popular
                    ? "shadow-[0_8px_40px_rgba(15,23,42,0.16)] hover:shadow-[0_14px_54px_rgba(15,23,42,0.20)]"
                    : "shadow-[0_2px_12px_rgba(15,23,42,0.07)] hover:shadow-[0_8px_32px_rgba(15,23,42,0.12)]"
                }`}
              >
                {/* Colored header band */}
                <div
                  className="px-7 pt-7 pb-6"
                  style={{ background: colors.gradient }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="inline-flex items-center gap-2 rounded-[10px] px-3 py-1.5"
                      style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
                    >
                      <Icon className="h-4 w-4 text-white" />
                      <span className="text-[12px] font-bold text-white">
                        {pkg.name === "Şirketini Kur" ? "Başlangıç"
                          : pkg.name === "Şirketini + Dijital Ofisini Kur" ? "Profesyonel"
                          : "Kurumsal"}
                      </span>
                    </div>
                    {pkg.popular && (
                      <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-white">
                        ⭐ En Popüler
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-white/70 leading-snug max-w-[20ch]">{pkg.name}</p>
                </div>

                {/* White content */}
                <div className="flex flex-col flex-1 bg-white p-7">
                  {/* Pricing */}
                  <div className="mb-5">
                    {isQuote ? (
                      <div className="flex items-end gap-1.5">
                        <span className="text-[36px] font-extrabold tracking-[-0.03em] text-[#0F172A]">Teklif</span>
                        <span className="mb-1.5 text-[14px] text-black/50">bazlı</span>
                      </div>
                    ) : (
                      <PricingValue
                        currentPrice={displayPrice}
                        crossedPrice={yearly ? `₺${pkg.monthlyPrice}/ay` : null}
                        suffix={yearly ? "/ ay · KDV hariç · Yıllık" : "/ ay · KDV hariç · Aylık"}
                        priceClassName="text-[36px]"
                      />
                    )}
                  </div>

                  {/* Features */}
                  <ul className="mb-8 flex-1 space-y-3">
                    {features.map((f, fi) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] leading-7 text-[#475569]">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{
                            color: fi === 0 && pkg.name !== "Şirketini Kur" ? `${colors.bg}80` : colors.bg,
                          }}
                          strokeWidth={fi === 0 && pkg.name !== "Şirketini Kur" ? 2 : 2.5}
                        />
                        <span className={fi === 0 && pkg.name !== "Şirketini Kur" ? "font-semibold text-[#0F172A]" : ""}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {(() => {
                    const sku = isQuote ? null : skuFor(companySlug, pkg.name, yearly ? "yearly" : "monthly");
                    const ctaClass =
                      "inline-flex items-center justify-center gap-2 rounded-full py-4 text-[14px] font-bold text-center transition-all duration-300 text-white hover:opacity-90 w-full";
                    const ctaStyle = { background: colors.gradient, boxShadow: `0 6px 20px ${colors.bg}35` };
                    if (sku) {
                      return (
                        <Link href={`/satin-al?sku=${sku}`} className={ctaClass} style={ctaStyle}>
                          Satın Al <ArrowRight className="h-4 w-4" />
                        </Link>
                      );
                    }
                    return (
                      <Link href="/iletisim" className={ctaClass} style={ctaStyle}>
                        Teklif Al <ArrowRight className="h-4 w-4" />
                      </Link>
                    );
                  })()}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison note */}
        <div className="mt-8 flex items-center gap-3 rounded-[20px] bg-white px-6 py-4 shadow-sm ring-1 ring-[#E8ECEF]">
          <Globe className="h-5 w-5 shrink-0" style={{ color: accent }} />
          <p className="text-[13px] text-[#64748B]">
            Hangi paketin uygun olduğundan emin değilsen?{" "}
            <Link href="/iletisim" className="font-semibold underline underline-offset-2" style={{ color: accent }}>
              Ücretsiz danışmanlık al →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
