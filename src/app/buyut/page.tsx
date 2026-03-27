import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  DollarSign,
  Lightbulb,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "İşini Büyüt | Work365",
  description:
    "Tam zamanlı çalışan almadan, uzman desteğiyle şirketini güçlendir. Teşvik, hibe, yatırımcı erişimi ve uzman kiralama.",
};

const services = [
  {
    icon: Search,
    name: "Teşvik Analizi",
    description:
      "Şirketinizin yararlanabileceği devlet teşvik ve desteklerini tespit edip başvuru sürecini yönetiyoruz.",
    pricing: "990 TL tek seferlik + 290 TL/ay takip",
    cta: "Analiz Al",
    bg: "bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]",
    border: "border-[#FDE68A]",
    accent: "#D97706",
    iconBg: "bg-[#FEF3C7]",
  },
  {
    icon: Lightbulb,
    name: "Hibe Başvuru Desteği",
    description:
      "KOSGEB, TÜBİTAK ve diğer hibe programlarına başvuru hazırlığı ve süreç yönetimi.",
    pricing: "Proje bazlı teklif",
    cta: "Teklif İste",
    bg: "bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE]",
    border: "border-[#DDD6FE]",
    accent: "#7C3AED",
    iconBg: "bg-[#EDE9FE]",
  },
  {
    icon: DollarSign,
    name: "Yatırımcı Erişimi",
    description:
      "Şirketinizi yatırımcılara sunun. Pitch deck hazırlığı, veri odası kurulumu ve yatırımcı ağına erişim.",
    pricing: "Abonelik modeli",
    cta: "Randevu Al",
    bg: "bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]",
    border: "border-[#BBF7D0]",
    accent: "#16A34A",
    iconBg: "bg-[#DCFCE7]",
  },
  {
    icon: Briefcase,
    name: "Uzman Kiralama",
    description:
      "CFO, CMO veya teknik uzman gibi üst düzey profilleri tam zamanlı işe almadan, ihtiyaç duyduğunuzda kiralayın.",
    pricing: "Saat/gün bazlı teklif",
    cta: "Teklif İste",
    bg: "bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]",
    border: "border-[#BFDBFE]",
    accent: "#1b98d5",
    iconBg: "bg-[#DBEAFE]",
  },
  {
    icon: Users,
    name: "İşe Alım Hizmeti",
    description:
      "Şirketiniz için doğru adayı bulun. Aday tarama, mülakatlar ve süreç yönetimi bizden.",
    pricing: "Pozisyon bazlı teklif",
    cta: "Teklif İste",
    bg: "bg-gradient-to-br from-[#FFF0F5] to-[#FCE7F3]",
    border: "border-[#FBCFE8]",
    accent: "#DB2777",
    iconBg: "bg-[#FCE7F3]",
  },
];

export default function IsIniBuyutPage() {
  return (
    <main className="bg-[#FAFBFC] pt-[92px]">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-12">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#16A34A] opacity-[0.07] blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#16A34A] opacity-[0.05] blur-[80px]" />

        <div className="mx-auto max-w-[1230px]">
          <div className="relative rounded-[40px] bg-gradient-to-br from-[#F0FDF4] to-white px-8 py-10 md:px-12 md:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              {/* Left */}
              <div className="max-w-[720px]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#16A34A]/10 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#16A34A] ring-1 ring-black/5">
                  <TrendingUp className="h-4 w-4" />
                  İşini Büyüt
                </div>

                <h1 className="mt-7 text-[30px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[50px]">
                  Tam zamanlı çalışan almadan,{" "}
                  <span className="text-[#16A34A]">uzman desteğiyle büyü.</span>
                </h1>

                <p className="mt-6 max-w-[580px] text-[18px] leading-[1.8] text-[#475569]">
                  Teşvik analizi, hibe başvurusu, yatırımcı erişimi ve uzman kiralama — ihtiyacın olduğunda, ihtiyacın kadar.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/iletisim"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#16A34A] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_30px_#16A34A40] transition-all duration-300 hover:scale-[1.03] hover:bg-[#15803D] hover:shadow-lg"
                  >
                    İletişime Geç <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                  <a
                    href="#hizmetler"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] transition-all duration-300 hover:border-black/20 hover:shadow-md"
                  >
                    Hizmetleri Gör <ChevronRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Trust signals */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {["5 Hizmet", "Teklif Bazlı", "Uzman Ekip"].map((t) => (
                    <span key={t} className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#475569] ring-1 ring-black/8 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right – Hero image */}
              <div className="hidden items-end justify-center lg:flex">
                <div className="relative h-[380px] w-full overflow-hidden rounded-[32px]">
                  <Image src="/auth-growth-meeting.jpg" alt="İşini Büyüt" fill className="object-cover object-top" sizes="(max-width: 1280px) 50vw, 560px" priority />
                  <div className="absolute inset-0 rounded-[32px]" style={{ background: "linear-gradient(to top, #16A34A30 0%, transparent 60%)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HİZMETLER ─── */}
      <section id="hizmetler" className="px-6 py-16">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-12 max-w-[600px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">Hizmetlerimiz</p>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
              Her büyüme adımında yanınızdayız.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.name}
                  className={`group rounded-[32px] border ${service.border} ${service.bg} p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                >
                  <div
                    className="mb-6 inline-flex rounded-[18px] p-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: service.iconBg }}
                  >
                    <Icon className="h-7 w-7" style={{ color: service.accent }} />
                  </div>

                  <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[#0F172A]">{service.name}</h2>
                  <p className="mt-3 text-[15px] leading-8 text-[#475569]">{service.description}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-black/8 pt-5">
                    <p className="text-[14px] font-semibold text-black/50">{service.pricing}</p>
                    <Link
                      href="/iletisim"
                      className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-bold text-white transition-all duration-300 hover:scale-[1.05] hover:shadow-lg"
                      style={{ backgroundColor: service.accent }}
                    >
                      {service.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-16 pt-4">
        <div
          className="relative mx-auto max-w-[1230px] overflow-hidden rounded-[40px] px-8 py-14 text-white md:px-12"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #16A34Acc 100%)" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#16A34A] opacity-20 blur-[60px]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full bg-white opacity-10 blur-[40px]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[640px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/60">İşini Büyüt</p>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-white md:text-[44px]">
                Şirketini büyütmeye hazır mısın?
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-white/70">
                İhtiyacına uygun hizmeti seç, ekibimiz seninle iletişime geçsin.
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
