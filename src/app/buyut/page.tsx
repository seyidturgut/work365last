import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, TrendingUp, Lightbulb, Users, Briefcase, DollarSign, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "İşini Büyüt | Work365",
  description: "Tam zamanlı çalışan almadan, uzman desteğiyle şirketini güçlendir. Teşvik, hibe, yatırımcı erişimi ve uzman kiralama.",
};

const services = [
  {
    icon: Search,
    name: "Teşvik Analizi",
    description: "Şirketinizin yararlanabileceği devlet teşvik ve desteklerini tespit edip başvuru sürecini yönetiyoruz.",
    pricing: "990 TL tek seferlik + 290 TL/ay takip",
    cta: "Analiz Al",
    color: "bg-[#FFFBEB]",
    accent: "text-[#D97706]",
    border: "border-[#FDE68A]",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
  },
  {
    icon: Lightbulb,
    name: "Hibe Başvuru Desteği",
    description: "KOSGEB, TÜBİTAK ve diğer hibe programlarına başvuru hazırlığı ve süreç yönetimi.",
    pricing: "Proje bazlı teklif",
    cta: "Teklif İste",
    color: "bg-[#F5F3FF]",
    accent: "text-[#7C3AED]",
    border: "border-[#DDD6FE]",
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#7C3AED]",
  },
  {
    icon: DollarSign,
    name: "Yatırımcı Erişimi",
    description: "Şirketinizi yatırımcılara sunun. Pitch deck hazırlığı, veri odası kurulumu ve yatırımcı ağına erişim.",
    pricing: "Abonelik modeli",
    cta: "Randevu Al",
    color: "bg-[#F0FDF4]",
    accent: "text-[#16A34A]",
    border: "border-[#BBF7D0]",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  {
    icon: Briefcase,
    name: "Uzman Kiralama",
    description: "CFO, CMO veya teknik uzman gibi üst düzey profilleri tam zamanlı işe almadan, ihtiyaç duyduğunuzda kiralayın.",
    pricing: "Saat/gün bazlı teklif",
    cta: "Teklif İste",
    color: "bg-[#EFF6FF]",
    accent: "text-[#1b98d5]",
    border: "border-[#BFDBFE]",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#1b98d5]",
  },
  {
    icon: Users,
    name: "İşe Alım Hizmeti",
    description: "Şirketiniz için doğru adayı bulun. Aday tarama, mülakatlar ve süreç yönetimi bizden.",
    pricing: "Pozisyon bazlı teklif",
    cta: "Teklif İste",
    color: "bg-[#FFF0F5]",
    accent: "text-[#DB2777]",
    border: "border-[#FBCFE8]",
    iconBg: "bg-[#FCE7F3]",
    iconColor: "text-[#DB2777]",
  },
];

export default function IsınıBuyutPage() {
  return (
    <main className="bg-white pt-[92px]">
      <Header />

      {/* Hero */}
      <section className="px-6 py-24 max-w-[1230px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-4 py-2 mb-6">
          <TrendingUp className="h-4 w-4 text-[#16A34A]" />
          <span className="text-[13px] font-bold text-[#16A34A]">İşini Büyüt</span>
        </div>
        <h1 className="text-[40px] md:text-[56px] font-bold tracking-tighter text-black leading-tight mb-6 max-w-[720px] mx-auto">
          Tam zamanlı çalışan almadan,{" "}
          <span className="text-[#16A34A]">uzman desteğiyle büyü.</span>
        </h1>
        <p className="text-[18px] text-black/60 max-w-[560px] mx-auto leading-relaxed">
          Teşvik analizi, hibe başvurusu, yatırımcı erişimi ve uzman kiralama — ihtiyacın olduğunda, ihtiyacın kadar.
        </p>
      </section>

      {/* Services */}
      <section className="px-6 pb-20 max-w-[1230px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className={`rounded-[28px] border ${service.border} ${service.color} p-8 flex flex-col gap-5`}
              >
                <div className={`w-12 h-12 rounded-[16px] ${service.iconBg} flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${service.iconColor}`} />
                </div>
                <div>
                  <h2 className="text-[22px] font-bold text-black mb-2">{service.name}</h2>
                  <p className="text-[15px] text-black/65 leading-relaxed">{service.description}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-black/8 flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-black/50">{service.pricing}</p>
                  <Link
                    href="/iletisim"
                    className={`flex items-center gap-1 text-[14px] font-bold ${service.accent} hover:opacity-70 transition-opacity`}
                  >
                    {service.cta} <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#F8FAFC]">
        <div className="max-w-[1230px] mx-auto text-center">
          <h2 className="text-[32px] font-bold text-black mb-4">Şirketini büyütmeye hazır mısın?</h2>
          <p className="text-[16px] text-black/55 mb-8">
            İhtiyacına uygun hizmeti seç, ekibimiz seninle iletişime geçsin.
          </p>
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
