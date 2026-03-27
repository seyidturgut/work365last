import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { companyTypeConfigs } from "@/app/sirket-kur/company-types";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Şirketini Kur | Work365",
  description: "Şahıs, Limited, Anonim veya Bilanço şirketi kur. Hangi şirket türünün sana uygun olduğunu öğren.",
};

const pillarColors: Record<string, { bg: string; accent: string; border: string }> = {
  "sahis-sirketi": { bg: "bg-[#FFFBEB]", accent: "text-[#D97706]", border: "border-[#FDE68A]" },
  "limited-sirketi": { bg: "bg-[#EFF6FF]", accent: "text-[#1b98d5]", border: "border-[#BFDBFE]" },
  "anonim-sirketi": { bg: "bg-[#F5F3FF]", accent: "text-[#7C3AED]", border: "border-[#DDD6FE]" },
  "bilanco-sirketi": { bg: "bg-[#F0FDF4]", accent: "text-[#16A34A]", border: "border-[#BBF7D0]" },
};

export default function SirketiniKurPage() {
  return (
    <main className="bg-white pt-[92px]">
      <Header />

      <section className="px-6 py-20 max-w-[1230px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 mb-6">
            <span className="text-[13px] font-bold tracking-wide text-black">Kur. Yönet. Tanıt. Büyüt.</span>
          </div>
          <h1 className="text-[40px] md:text-[56px] font-bold tracking-tighter text-black leading-tight mb-6">
            Hangisini seçmeliyim?
          </h1>
          <p className="text-[18px] text-black/60 max-w-[560px] mx-auto leading-relaxed">
            Şirket tipini seç, paketi incele — gerisini biz halledelim.
          </p>
        </div>

        {/* Company type cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {companyTypeConfigs.map((config) => {
            const colors = pillarColors[config.slug] ?? { bg: "bg-gray-50", accent: "text-black", border: "border-gray-200" };
            return (
              <Link
                key={config.slug}
                href={`/sirketini-kur/${config.slug}`}
                className={`group rounded-[28px] border ${colors.border} ${colors.bg} p-8 flex flex-col gap-5 hover:shadow-lg transition-all`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[12px] font-bold uppercase tracking-widest ${colors.accent}`}>
                      {config.badge}
                    </span>
                    <h2 className="mt-2 text-[26px] font-bold text-black tracking-tight">{config.name}</h2>
                  </div>
                  <ChevronRight className={`h-5 w-5 mt-1 ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>

                <p className="text-[15px] text-black/65 leading-relaxed">{config.heroBody}</p>

                <div className="mt-auto pt-4 border-t border-black/8 flex items-center justify-between">
                  <div>
                    <p className="text-[22px] font-bold text-black">{config.price}</p>
                    <p className="text-[12px] text-black/50 mt-0.5">Yıllık: {config.yearly}</p>
                  </div>
                  <span className={`text-[13px] font-bold ${colors.accent} flex items-center gap-1`}>
                    İncele <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Comparison hint */}
        <div className="rounded-[28px] bg-[#F8FAFC] border border-black/5 p-10 text-center">
          <h3 className="text-[24px] font-bold text-black mb-3">Emin olamadın mı?</h3>
          <p className="text-[16px] text-black/60 mb-6 max-w-[480px] mx-auto">
            Uzman ekibimiz seni doğru şirket tipine yönlendirsin. Ücretsiz danışmanlık için bize ulaş.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 text-[14px] font-bold text-white hover:bg-gray-800 transition-colors"
          >
            Ücretsiz Danış
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
