import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck,
  Landmark,
  Monitor,
  Rocket,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Zap,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import type { CompanyTypeConfig } from "@/app/sirket-kur/company-types";
import { FaqAccordion } from "@/components/FaqAccordion";
import { buildPackageSignupHref } from "@/lib/pricing";
import DijitalOfisPlans from "@/components/pricing/DijitalOfisPlans";
import GorunurOlPlans from "@/components/pricing/GorunurOlPlans";
import IsIniBuyutSection from "@/components/pricing/IsIniBuyutSection";
import TekSeferlikUrunler from "@/components/pricing/TekSeferlikUrunler";
import CompanyPackages from "@/components/pricing/CompanyPackages";

type CompanyTypeStoryPageProps = {
  config: CompanyTypeConfig;
};

const stepIcons = [Rocket, Monitor, FileCheck, Zap];

function buildSteps(config: CompanyTypeConfig) {
  const defaultBodies = [
    `${config.name} için ilk adımda temel bilgiler, yapı tercihleri ve başvuru görünümü tek akışta toplanır. Hangi bilginin beklendiği ve sürecin nereye geldiği net kalır.`,
    `${config.includedItems.slice(1, 4).join(", ")} gibi dijital altyapı kalemleri kuruluşla birlikte görünür hale gelir. Böylece bekleyen işler sonradan değil süreç içinde tamamlanır.`,
    `${config.highlightLabel} odağındaki evrak, kontrol ve resmi akış kalemleri aynı ritimde ilerler. Bu sayede süreç görünürlüğü kaybolmadan devam eder.`,
    `${config.shortName} yapısı kurulduktan sonra operasyon başlangıcı ikinci bir kurulum işi gibi kalmaz. İlk görevler, görünür durum bilgisi ve destek akışı başlangıçta hazır olur.`,
  ];

  const fallbackEyebrows = ["Kuruluş başlangıcı", "Dijital altyapı", "Vergi ve evrak", "Operasyon başlangıcı"];
  const fallbackBadges = ["Başvuru açık", "Kurulum aktif", "Hazır", "Canlı"];

  return config.processSteps.map((step, index) => ({
    eyebrow: fallbackEyebrows[index] ?? `Adım ${index + 1}`,
    title: step,
    body: defaultBodies[index] ?? config.highlights[index % config.highlights.length],
    badge: fallbackBadges[index] ?? "Aktif",
    icon: stepIcons[index] ?? Sparkles,
    pills:
      index === 0
        ? [
            ["Şirket Türü", config.name],
            ["Vurgu", config.highlightLabel],
            ["Durum", "Belgeler hazırlanıyor"],
          ]
        : index === 1
          ? [
              ["e-İmza 1Y", "Hazır"],
              ["KEP Başlangıç 1Y", "İşlemde"],
              ["Sanal Ofis 1Y", "Eşleştirildi"],
            ]
          : index === 2
            ? [
                ["Evrak Akışı", "Güncel"],
                ["Kontrol", "Uzman incelemesi"],
                ["Süreç", "Görünür panel"],
              ]
            : [
                ["İlk görev", "Başlangıç akışı"],
                ["Operasyon", "Hazır görünüm"],
                ["Destek", "Uzman ekiple"],
              ],
  }));
}

export default function CompanyTypeStoryPage({ config }: CompanyTypeStoryPageProps) {
  const steps = buildSteps(config);
  const ConfigIcon = config.icon;
  const packageSignupHref = buildPackageSignupHref(config.name, config.price, {
    label: config.name,
    source: "Şirket Kur sayfasından seçildi",
    term: "Tek seferlik başlangıç paketi",
    description: config.heroBody,
    features: [...config.includedItems.slice(0, 4)],
  });

  return (
    <main className="bg-[#FAFBFC] pt-[92px]">
      <Header />
      <Breadcrumb items={[{ label: "Şirket Kur" }, { label: config.name }]} />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-12">
        {/* Background gradient orbs */}
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-[0.07] blur-[100px]"
          style={{ background: config.accent }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full opacity-[0.05] blur-[80px]"
          style={{ background: config.accent }}
        />

        <div className="mx-auto max-w-[1230px]">
          <div
            className="relative rounded-[40px] px-8 py-10 md:px-12 md:py-14"
            style={{
              background: `linear-gradient(135deg, ${config.softAccent.replace("bg-[", "").replace("]", "")} 0%, white 100%)`,
            }}
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
              {/* Left content */}
              <div className="max-w-[720px]">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] ring-1 ring-black/5"
                  style={{ backgroundColor: `${config.accent}12`, color: config.accent }}
                >
                  <ConfigIcon className="h-4 w-4" />
                  {config.name}
                </div>

                <h1 className="mt-7 text-[30px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[50px]">
                  {config.heroTitle}
                </h1>

                <p className="mt-6 max-w-[640px] text-[18px] leading-[1.8] text-[#475569]">
                  {config.heroBody}
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={packageSignupHref}
                    className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                    style={{
                      backgroundColor: config.accent,
                      boxShadow: `0 8px 30px ${config.accent}40`,
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {config.name} ile Başla <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Link>
                  <a
                    href="#adimlar"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] transition-all duration-300 hover:border-black/20 hover:shadow-md"
                  >
                    Süreci İncele
                  </a>
                </div>
              </div>

              {/* Right - Floating stats */}
              <div className="hidden flex-col justify-center gap-4 lg:flex">
                {[
                  { icon: Clock, label: "Süre", value: "2–3 İş Günü" },
                  { icon: Sparkles, label: "Başvuru", value: "Tek Akışta" },
                  { icon: ShieldCheck, label: "Süreç", value: "%100 Dijital" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4 rounded-2xl bg-white/80 px-5 py-4 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${config.accent}14` }}
                    >
                      <stat.icon className="h-5 w-5" style={{ color: config.accent }} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/40">{stat.label}</p>
                      <p className="text-[16px] font-bold text-[#0F172A]">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom info cards */}
            <div className="mt-10 grid gap-4 border-t border-black/6 pt-8 lg:grid-cols-3">
              <div className="rounded-[24px] bg-white/80 px-6 py-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${config.accent}14` }}
                  >
                    <WalletCards className="h-5 w-5" style={{ color: config.accent }} />
                  </div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: config.accent }}>
                    Başlangıç fiyatı
                  </p>
                </div>
                <p className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A]">{config.price}</p>
                <p className="mt-2 text-[14px] leading-7 text-[#64748B]">{config.yearly}</p>
              </div>

              <div className="rounded-[24px] bg-white/80 px-6 py-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${config.accent}14` }}
                  >
                    <ShieldCheck className="h-5 w-5" style={{ color: config.accent }} />
                  </div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: config.accent }}>
                    Başlangıç paketi
                  </p>
                </div>
                <p className="mt-4 text-[20px] font-bold tracking-[-0.03em] text-[#0F172A]">5 kalem tek akışta</p>
                <p className="mt-2 text-[14px] leading-7 text-[#64748B]">{config.includedItems.join(" + ")}</p>
              </div>

              <div className="rounded-[24px] bg-white/80 px-6 py-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${config.accent}14` }}
                  >
                    <Landmark className="h-5 w-5" style={{ color: config.accent }} />
                  </div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: config.accent }}>
                    Kimler için uygun?
                  </p>
                </div>
                <div className="mt-4 space-y-2.5">
                  {config.suitableFor.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-[14px] leading-7 text-[#475569]">
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: config.accent }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PAKETLER ─── */}
      <CompanyPackages accent={config.accent} packages={config.packages} />

      {/* ─── STEPS ─── */}
      <section id="adimlar" className="px-6 py-14">
        <div className="mx-auto max-w-[1230px]">
          <div className="max-w-[720px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: config.accent }}>
              Adım adım akış
            </p>
            <h2 className="mt-4 text-[34px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[48px]">
              Şirketleşme sürecini baştan sona tek çizgide takip edin.
            </h2>
            <p className="mt-5 text-[17px] leading-8 text-[#64748B]">
              Kuruluş, dijital altyapı, vergi görünümü ve operasyon başlangıcı aynı deneyimde akarken, her adımda neyin tamamlandığını net şekilde takip edin.
            </p>
          </div>

          <div className="mt-12">
            <div className="relative ml-4 pl-10 md:ml-6 md:pl-12">
              {/* Gradient line */}
              <div
                className="absolute left-0 top-0 h-full w-[2px]"
                style={{
                  background: `linear-gradient(to bottom, ${config.accent}, ${config.accent}22)`,
                }}
              />

              {steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <article
                    key={step.title}
                    className="group relative mb-10 last:mb-0"
                  >
                    {/* Step number circle */}
                    <div
                      className="absolute -left-[57px] top-1 flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110 md:-left-[61px]"
                      style={{
                        backgroundColor: config.accent,
                        boxShadow: `0 8px 24px ${config.accent}40`,
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Card */}
                    <div className="max-w-[820px] rounded-[24px] border border-black/5 bg-white px-7 py-7 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${config.accent}12` }}
                        >
                          <StepIcon className="h-4 w-4" style={{ color: config.accent }} />
                        </div>
                        <p className="text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: config.accent }}>
                          {step.eyebrow}
                        </p>
                      </div>

                      <h3 className="mt-4 text-[22px] font-bold tracking-[-0.03em] text-[#0F172A] md:text-[26px]">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[700px] text-[15px] leading-8 text-[#64748B]">
                        {step.body}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span
                          className="rounded-full px-3.5 py-2 text-[12px] font-bold"
                          style={{ backgroundColor: `${config.accent}14`, color: config.accent }}
                        >
                          {step.badge}
                        </span>
                        {step.pills.map(([label, value]) => (
                          <span
                            key={label}
                            className="rounded-full bg-[#F1F5F9] px-3.5 py-2 text-[12px] font-semibold text-[#475569]"
                          >
                            {label}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EK HİZMET FİYATLANDIRMASI ─── */}
      <DijitalOfisPlans />
      <GorunurOlPlans />
      <IsIniBuyutSection />
      <TekSeferlikUrunler />

      {/* ─── FAQ ─── */}
      <section className="px-6 pb-14 pt-8">
        <div className="mx-auto max-w-[860px]">
          <div className="mb-10 text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: config.accent }}>
              Sık sorulanlar
            </p>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
              {config.name} hakkında en çok sorulanlar
            </h2>
          </div>

          <FaqAccordion items={config.faq} accent={config.accent} />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-16 pt-4">
        <div className="relative mx-auto max-w-[1230px] overflow-hidden rounded-[40px] px-8 py-12 text-white md:px-12 md:py-14" style={{
          background: `linear-gradient(135deg, #0F172A 0%, ${config.accent}cc 100%)`,
        }}>
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full opacity-20 blur-[60px]" style={{ background: config.accent }} />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full opacity-15 blur-[40px]" style={{ background: "white" }} />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[680px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/60">Şimdi Başlayın</p>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-white md:text-[44px]">
                {config.name.toLowerCase()} yapınızı hızlı ve doğru şekilde kurun.
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-white/70">
                Kuruluş, dijital altyapı ve ilk operasyon adımlarını tek paketle başlatın; dağınık süreçler yerine görünür ve hızlı bir başlangıç yapın.
              </p>
            </div>

            <Link
              href={packageSignupHref}
              className="group/cta inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              Hemen Başlayın <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
