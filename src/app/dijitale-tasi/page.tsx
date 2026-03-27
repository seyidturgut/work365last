import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Headphones,
  HardDrive,
  Monitor,
  Server,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dijital Ofis | Work365",
  description:
    "IT departmanın biz olalım, sen işine odaklan. Microsoft 365, kurumsal e-posta, Teams, OneDrive ve help desk tek pakette.",
};

const plans = [
  {
    name: "Başlangıç",
    range: "1–10 Kullanıcı",
    price: "10.000",
    features: [
      "Microsoft 365 kurulum + lisans",
      "Kurumsal e-posta + Teams",
      "OneDrive + MFA",
      "Help desk desteği",
    ],
    popular: false,
  },
  {
    name: "Profesyonel",
    range: "11–30 Kullanıcı",
    price: "15.000",
    features: [
      "Tüm Başlangıç özellikleri",
      "SharePoint",
      "Güvenlik politikaları",
      "Öncelikli destek",
    ],
    popular: true,
  },
  {
    name: "Kurumsal",
    range: "31–100 Kullanıcı",
    price: "20.000",
    features: [
      "Tüm Profesyonel özellikleri",
      "Dedicated IT danışman",
      "SLA garantisi",
      "Yedekleme izleme",
    ],
    popular: false,
  },
];

const services = [
  { icon: Monitor, label: "Kurumsal E-posta", desc: "Microsoft Exchange ile kurumsal posta altyapısı" },
  { icon: Users, label: "Microsoft Teams", desc: "Anlık mesajlaşma, görüntülü toplantı ve dosya paylaşımı" },
  { icon: HardDrive, label: "OneDrive & SharePoint", desc: "Bulut depolama ve ekip dosya yönetimi" },
  { icon: Shield, label: "MFA & Güvenlik", desc: "Çok faktörlü kimlik doğrulama ve sıfır güven politikası" },
  { icon: Server, label: "Yedekleme İzleme", desc: "Otomatik yedekleme ve kesintisiz izleme" },
  { icon: Headphones, label: "Help Desk", desc: "7/24 teknik destek ve uzak erişim yönetimi" },
];

const entryPoints = [
  {
    eyebrow: "Yeni Kurulan Şirketler",
    title: "Sıfırdan Kurulum",
    body: "Şirketini kurdun, dijital altyapını da biz kuralım. Domain, e-posta, Teams — hepsi hazır.",
    cta: "Başlayalım",
    bg: "bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]",
    border: "border-[#FDE68A]",
    accent: "#D97706",
    points: ["Alan adı + DNS kurulumu", "Kurumsal e-posta adresleri", "Teams & OneDrive aktivasyonu"],
  },
  {
    eyebrow: "Mevcut Şirketler",
    title: "Dijitale Taşıma",
    body: "Mevcut altyapını Microsoft 365'e taşı. E-posta geçişi, veri aktarımı ve kullanıcı eğitimi dahil.",
    cta: "Geçiş Planı Al",
    bg: "bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]",
    border: "border-[#BFDBFE]",
    accent: "#1b98d5",
    points: ["Mevcut e-posta geçişi", "Veri aktarımı + doğrulama", "Kullanıcı eğitimi dahil"],
  },
];

export default function DijitalOfisPage() {
  return (
    <main className="bg-[#FAFBFC] pt-[92px]">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-12">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#1b98d5] opacity-[0.07] blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#1b98d5] opacity-[0.05] blur-[80px]" />

        <div className="mx-auto max-w-[1230px]">
          <div className="relative rounded-[40px] bg-gradient-to-br from-[#EFF6FF] to-white px-8 py-10 md:px-12 md:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
              {/* Left */}
              <div className="max-w-[720px]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1b98d5]/10 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1b98d5] ring-1 ring-black/5">
                  <Monitor className="h-4 w-4" />
                  Dijital Ofis
                </div>

                <h1 className="mt-7 text-[30px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[50px]">
                  IT departmanın biz olalım,{" "}
                  <span className="text-[#1b98d5]">sen işine odaklan.</span>
                </h1>

                <p className="mt-6 max-w-[580px] text-[18px] leading-[1.8] text-[#475569]">
                  Microsoft 365 kurulum, lisans ve yönetimi — kurumsal e-posta, Teams, OneDrive ve help desk tek pakette.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/iletisim"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#1b98d5] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_30px_#1b98d540] transition-all duration-300 hover:scale-[1.03] hover:bg-[#1580b3] hover:shadow-lg"
                  >
                    Teklif Al <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                  <Link
                    href="/fiyatlandirma"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] transition-all duration-300 hover:border-black/20 hover:shadow-md"
                  >
                    Fiyatlandırmayı Gör <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Trust signals */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {["7/24 Destek", "Microsoft Lisanslı", "%100 Bulut"].map((t) => (
                    <span key={t} className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#475569] ring-1 ring-black/8 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right – Floating stats */}
              <div className="hidden flex-col justify-center gap-4 lg:flex">
                {[
                  { icon: Clock, label: "Kurulum Süresi", value: "1–3 İş Günü" },
                  { icon: Sparkles, label: "Kurulum", value: "Uzaktan & Hızlı" },
                  { icon: Shield, label: "Güvenlik", value: "MFA Dahil" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4 rounded-2xl bg-white/80 px-5 py-4 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1b98d5]/10">
                      <stat.icon className="h-5 w-5 text-[#1b98d5]" />
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
              {[
                { label: "Başlangıç Fiyatı", value: "10.000 TL/ay", sub: "+KDV · 1–10 kullanıcı" },
                { label: "Hızlı Kurulum", value: "Tek Akışta", sub: "Sıfırdan veya mevcut geçiş" },
                { label: "Neler Dahil", value: "6 Temel Hizmet", sub: "E-posta, Teams, OneDrive ve daha fazlası" },
              ].map((card) => (
                <div key={card.label} className="rounded-[24px] bg-white/80 px-6 py-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">{card.label}</p>
                  <p className="mt-4 text-[24px] font-extrabold tracking-[-0.03em] text-[#0F172A]">{card.value}</p>
                  <p className="mt-2 text-[14px] leading-7 text-[#64748B]">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── HİZMETLER ─── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-12 max-w-[600px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">Dahil Olanlar</p>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
              Pakete dahil 6 temel hizmet.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {services.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="group rounded-[24px] bg-white px-6 py-7 shadow-sm ring-1 ring-black/6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-black/12"
              >
                <div className="mb-5 inline-flex rounded-xl bg-[#1b98d5]/10 p-3.5 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-[#1b98d5]" />
                </div>
                <h3 className="text-[17px] font-bold text-[#0F172A]">{label}</h3>
                <p className="mt-2 text-[14px] leading-7 text-[#64748B]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GİRİŞ NOKTALARI ─── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-12 max-w-[600px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">Başlangıç Noktanız</p>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
              Nereden başlıyorsunuz?
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {entryPoints.map((ep) => (
              <div
                key={ep.title}
                className={`group rounded-[32px] border ${ep.border} ${ep.bg} p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <p className="text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: ep.accent }}>
                  {ep.eyebrow}
                </p>
                <h3 className="mt-4 text-[26px] font-extrabold tracking-[-0.03em] text-[#0F172A]">{ep.title}</h3>
                <p className="mt-3 text-[15px] leading-8 text-[#475569]">{ep.body}</p>

                <ul className="mt-6 space-y-3">
                  {ep.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-[14px] text-[#475569]">
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: ep.accent }} />
                      {pt}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/iletisim"
                  className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                  style={{ backgroundColor: ep.accent }}
                >
                  {ep.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PAKETLER ─── */}
      <section className="px-6 py-16 bg-[#F8FAFC]">
        <div className="mx-auto max-w-[1230px]">
          <div className="mb-4 max-w-[600px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">Fiyatlandırma</p>
            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">
              İhtiyacına göre paket seç.
            </h2>
            <p className="mt-3 text-[16px] text-[#64748B]">Tüm fiyatlar +KDV</p>
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
                <p className="text-[12px] font-bold uppercase tracking-widest text-black/40">{plan.range}</p>
                <h3 className="mt-2 text-[24px] font-bold text-[#0F172A]">{plan.name}</h3>
                <div className="mb-6 mt-5">
                  <span className="text-[40px] font-extrabold tracking-[-0.03em] text-[#0F172A]">{plan.price}</span>
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
                  Teklif Al
                </Link>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="mt-6 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0F172A] to-[#1b98d5] p-8 text-white">
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="pointer-events-none absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full bg-white opacity-5 blur-[40px]" />
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest text-white/50">Enterprise</p>
                <h3 className="mt-1 text-[24px] font-extrabold tracking-[-0.03em]">100+ Kullanıcı — Özel Kapsam</h3>
                <p className="mt-2 text-[15px] text-white/70">Dedicated account manager, özel SLA ve kurumsal güvenlik paketleri.</p>
              </div>
              <Link
                href="/iletisim"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-bold text-[#0F172A] shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              >
                Teklif İste <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-16 pt-6">
        <div
          className="relative mx-auto max-w-[1230px] overflow-hidden rounded-[40px] px-8 py-14 text-white md:px-12"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1b98d5cc 100%)" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#1b98d5] opacity-20 blur-[60px]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full bg-white opacity-10 blur-[40px]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[640px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/60">Dijital Ofis</p>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-white md:text-[44px]">
                Dijital ofisinizi bugün kurun.
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-white/70">
                Uzman ekibimiz gereksinimlerinizi dinlesin ve size özel bir kurulum planı hazırlasın.
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
