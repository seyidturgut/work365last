import { Building2, LayoutGrid, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Şirket tipini seç",
    desc: "Şahıs, Limited, Anonim veya Bilanço — hangisinin sana uygun olduğunu öğren ve başvurunu başlat.",
    accent: "#D97706",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
    accentText: "text-[#D97706]",
  },
  {
    number: "02",
    icon: LayoutGrid,
    title: "Paketini belirle",
    desc: "Yalnızca şirket kuruluşu mu, dijital ofis mi, sosyal medya mı? İhtiyacına göre kombine et.",
    accent: "#1b98d5",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#1b98d5]",
    accentText: "text-[#1b98d5]",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Biz halledelim",
    desc: "Evrak, başvuru ve kurulum süreçlerini ekibimiz yönetir. Sen işine odaklan.",
    accent: "#16A34A",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    accentText: "text-[#16A34A]",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-20 bg-[#F8FAFC]">
      <div className="max-w-[1230px] mx-auto">
        {/* Header — left aligned */}
        <div className="mb-14 max-w-[560px]">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">
            Nasıl Çalışır
          </p>
          <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
            Nasıl Çalışır?
          </h2>
          <p className="mt-3 text-[16px] text-[#64748B]">
            3 adımda şirketini kur, dijital altyapını hazırla.
          </p>
        </div>

        {/* Step cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex items-stretch">
                {/* Card */}
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-[28px] bg-white p-8 pb-10 shadow-sm ring-1 ring-black/6">
                  {/* Big decorative number */}
                  <span
                    className="pointer-events-none absolute -right-3 -top-5 select-none text-[120px] font-extrabold leading-none"
                    style={{ color: `${step.accent}12` }}
                  >
                    {step.number}
                  </span>

                  {/* Icon badge */}
                  <div
                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[14px] ${step.iconBg}`}
                  >
                    <Icon className={`h-6 w-6 ${step.iconColor}`} />
                  </div>

                  {/* Step label */}
                  <p
                    className={`mb-2 text-[11px] font-bold uppercase tracking-[0.16em] ${step.accentText}`}
                  >
                    Adım {step.number}
                  </p>

                  {/* Title */}
                  <h3 className="mb-3 text-[20px] font-extrabold tracking-[-0.03em] text-[#0F172A]">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="flex-1 text-[14px] leading-[1.75] text-[#64748B]">{step.desc}</p>

                  {/* Colored bottom bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-[28px]"
                    style={{ backgroundColor: step.accent }}
                  />
                </div>

                {/* Arrow connector between cards */}
                {i < steps.length - 1 && (
                  <div className="hidden shrink-0 items-center md:flex">
                    <ArrowRight className="mx-1 h-4 w-4 text-black/20" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
