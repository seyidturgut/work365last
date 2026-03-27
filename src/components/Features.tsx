"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  KeyRound,
  Network,
  Rocket,
} from "lucide-react";
import { useState } from "react";

type Feature = {
  label: string;
  title: string;
  cta: string;
  href?: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  gridSpan: string;
  mockupType: string;
  packageBadge?: string;
  packageItems?: string[];
};

const features: Feature[] = [
  {
    label: "Şirket Kuruluşu",
    title: "Şirketinizi hızlı, kolay ve doğru adımlarla kurun.",
    cta: "Kuruluş Sürecini Başlatın",
    href: "/fiyatlandirma",
    icon: <Rocket className="w-4 h-4 text-[#A88208]" />,
    bgColor: "bg-[#F6EDC8]",
    textColor: "text-[#A88208]",
    gridSpan: "lg:col-span-2",
    mockupType: "formation",
  },
  {
    label: "Muhasebe",
    title: "Finansal işlemlerinizi tek panelden izleyin ve yönetin.",
    cta: "Muhasebe Görünümünü İnceleyin",
    href: "/ekosistem",
    icon: <BookOpen className="w-4 h-4 text-[#2F73FF]" />,
    bgColor: "bg-[#E7ECF8]",
    textColor: "text-[#2F73FF]",
    gridSpan: "lg:col-span-2",
    mockupType: "bookkeeping",
  },
  {
    label: "Dijital Altyapı",
    title: "e-İmza ve KEP süreçlerini tek yerden yönetin.",
    cta: "Dijital Altyapıyı İnceleyin",
    href: "/digital-altyapi",
    icon: <KeyRound className="w-4 h-4 text-[#0F766E]" />,
    bgColor: "bg-[#E9F8F6]",
    textColor: "text-[#0F766E]",
    gridSpan: "lg:col-span-2",
    mockupType: "infrastructure",
  },
  {
    label: "Ekosistem",
    title: "Büyümeyi destekleyen entegre iş ortağı ağı.",
    cta: "Ekosistemi Keşfet",
    href: "/ekosistem",
    icon: <Network className="w-4 h-4 text-[#1b98d5]" />,
    bgColor: "bg-[#E8F4FD]",
    textColor: "text-[#1b98d5]",
    gridSpan: "lg:col-span-4",
    mockupType: "ecosystem",
  },
];

const featureTabs = [
  "Hepsi Bir Arada İş Paketi",
  "Kuruluş",
  "Muhasebe",
  "Dijital Altyapı",
  "Ekosistem",
];

export default function Features() {
  const [activeTab, setActiveTab] = useState("Hepsi Bir Arada İş Paketi");

  return (
    <section className="py-24 px-6 bg-[#F7F7F5] overflow-hidden">
      <div className="max-w-[1230px] mx-auto">
        <div className="mb-14 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-black/10 pb-5 text-[16px] font-semibold text-black/55 md:gap-x-12 md:text-[18px]">
              {featureTabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 transition-colors ${
                    activeTab === tab ? "text-black" : "hover:text-black"
                  }`}
                >
                  {tab}
                  {activeTab === tab ? (
                    <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-black" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto">
            <Link
              href="/fiyatlandirma"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-[16px] font-bold text-white"
            >
              Paketleri İncele <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {activeTab === "Kuruluş" ? (
          <FormationShowcase />
        ) : activeTab === "Muhasebe" ? (
          <BookkeepingShowcase />
        ) : activeTab === "Dijital Altyapı" ? (
          <DigitalAltyapiShowcase />
        ) : activeTab === "Ekosistem" ? (
          <EcosystemShowcase />
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {features.map((feature, index) => {
            const isHorizontal = index >= 3;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative overflow-hidden group rounded-[40px] ${feature.bgColor} ${feature.gridSpan} ${
                  isHorizontal ? "min-h-[220px] flex-row items-center p-8" : "min-h-[288px] flex-col px-8 pt-8 pb-0 md:min-h-[298px]"
                } flex`}
              >
                <div className={`${isHorizontal ? "w-2/5" : "w-full"}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1">{feature.icon}</div>
                    <span className={`text-[14px] font-bold ${feature.textColor}`}>{feature.label}</span>
                  </div>

                  <h3 className={`${isHorizontal ? "text-[22px] md:text-[24px]" : "text-[20px] md:text-[22px]"} max-w-[430px] font-bold leading-[1.2] tracking-[-0.03em] text-black mb-4`}>
                    {feature.title}
                  </h3>

                  {feature.href ? (
                    <Link
                      href={feature.href}
                      className="flex items-center gap-2 text-[14px] font-semibold text-black group-hover:gap-3 transition-all"
                    >
                      {feature.cta} <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button className="flex items-center gap-2 text-[14px] font-semibold text-black group-hover:gap-3 transition-all">
                      {feature.cta} <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div
                  className={`overflow-hidden ${
                    isHorizontal
                      ? "relative h-full w-3/5 translate-x-12 translate-y-10 transition-transform duration-500 group-hover:translate-x-8 group-hover:translate-y-8"
                      : "relative mt-5 h-[184px] w-full transition-transform duration-500 group-hover:translate-y-1 md:h-[194px]"
                  }`}
                >
                  {feature.mockupType === "formation" ? (
                    <FormationMockup isHorizontal={isHorizontal} hideStroke={!isHorizontal} />
                  ) : feature.mockupType === "bookkeeping" ? (
                    <BookkeepingMockup isHorizontal={isHorizontal} />
                  ) : feature.mockupType === "infrastructure" ? (
                    <DigitalInfrastructureMockup />
                  ) : feature.mockupType === "ecosystem" ? (
                    <EcosystemMockup />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-white shadow-2xl border border-gray-100 p-3 ${
                        isHorizontal ? "rounded-tl-2xl rounded-bl-2xl" : "rounded-t-3xl"
                      }`}
                    >
                      <div className="w-full h-full bg-gray-50/50 rounded-xl border border-gray-100 overflow-hidden">
                        <div className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="w-16 h-2 bg-gray-200 rounded-full" />
                            <div className="w-5 h-5 bg-gray-100 rounded-full" />
                          </div>
                          <div className="w-full h-24 bg-gray-100/50 rounded-lg flex items-center justify-center">
                            <div className="w-3/4 space-y-2">
                              <div className="h-1 bg-gray-200 rounded w-full" />
                              <div className="h-1 bg-gray-200 rounded w-5/6" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}

function FormationShowcase() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.22fr_0.92fr_0.92fr]">
      <div className="rounded-[38px] bg-[#F6EDC8] px-7 pt-8 pb-6">
        <p className="text-[16px] font-bold text-[#A88208]">Kuruluş Dosyaları</p>
        <h3 className="mt-5 max-w-[520px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
          Uzmanlar Tarafından Hazırlanan Şirket Kuruluş Dosyalarıyla Yasalara Uygun Kalın.
        </h3>
        <p className="mt-5 max-w-[540px] text-[17px] leading-[1.5] text-black/85">
          Evrak işlerini, başvuruları ve yasal uyumluluk süreçlerini biz hallediyoruz, böylece siz vizyonunuza odaklanabiliyorsunuz.
        </p>
        <div className="relative mt-8 h-[240px] overflow-hidden md:h-[270px]">
          <div className="absolute left-0 top-0 h-[308px] w-[calc(100%/0.72)] origin-top-left scale-[0.72] md:h-[336px] md:w-[calc(100%/0.74)] md:scale-[0.74]">
            <FormationMockup isHorizontal={false} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-[38px] bg-[#F6EDC8] px-7 pt-8 pb-7">
          <p className="text-[16px] font-bold text-[#A88208]">Resmi Başvuru Süreçleri</p>
          <h3 className="mt-5 text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
            Şirketiniz için resmi başvuru süreçlerini kolayca tamamlayın.
          </h3>
          <p className="mt-5 max-w-[380px] text-[17px] leading-[1.5] text-black/85">
            Gerekli kayıt ve başvuru adımlarını tek akışta zahmetsizce yönetin.
          </p>
          <div className="mt-6 flex h-[170px] items-end justify-center rounded-[24px] bg-[radial-gradient(circle_at_center,#F2D96D_0,#F2D96D_33%,transparent_34%)]">
            <Image
              src="/ein.png.webp"
              alt="Resmi başvuru süreçleri görseli"
              width={280}
              height={190}
              className="h-auto w-[240px] object-contain"
            />
          </div>
        </div>

        <div className="rounded-[38px] border border-[#B89214] bg-white px-7 pt-8 pb-7">
          <p className="text-[16px] font-bold text-[#A88208]">İşletme Anlaşması</p>
          <h3 className="mt-5 max-w-[420px] text-[18px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[21px]">
            Şirketinizin faaliyetlerini bir işletme sözleşmesiyle koruyun.
          </h3>
        </div>
      </div>

      <div className="rounded-[38px] bg-[#F6EDC8] px-7 pt-8 pb-7">
        <p className="text-[16px] font-bold text-[#A88208]">Kayıtlı Temsilci Hizmetleri</p>
        <h3 className="mt-5 text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
          İşletmeniz İçin Güvenilir Kayıtlı Temsilci Hizmetleri.
        </h3>
        <p className="mt-5 max-w-[390px] text-[17px] leading-[1.5] text-black/85">
          Önemli devlet belgelerinizi bizimle takip edin, hiçbir süreci kaçırmayın.
        </p>
        <div className="mt-6 flex h-[290px] items-end justify-center rounded-[28px] bg-[radial-gradient(circle_at_42%_35%,#F2D96D_0,#F2D96D_26%,transparent_27%)]">
          <Image
            src="/registered-agent.png.webp"
            alt="Kayıtlı temsilci hizmetleri görseli"
            width={420}
            height={320}
            className="h-auto w-[310px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function BookkeepingShowcase() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.08fr_1.2fr]">
      <div className="rounded-[38px] bg-[#E7ECF8] px-7 pt-8 pb-6">
        <p className="text-[16px] font-bold text-[#2F73FF]">İşlemlerinizi Takip Edin</p>
        <h3 className="mt-5 max-w-[620px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
          Tüm finansal işlemlerinizi tek bir yerden takip edin, kategorize edin ve izleyin.
        </h3>
        <p className="mt-5 max-w-[700px] text-[17px] leading-[1.5] text-black/85">
          Gerçek zamanlı bilgilere erişerek her zaman güncel kalın ve kayıtlarınızı düzenli tutun. Hiçbir işlemi kaçırmayın.
        </p>
        <div className="relative mt-8 h-[240px] overflow-hidden md:h-[270px]">
          <div className="absolute left-0 top-0 h-[308px] w-[calc(100%/0.72)] origin-top-left scale-[0.72] md:h-[336px] md:w-[calc(100%/0.74)] md:scale-[0.74]">
            <BookkeepingMockup isHorizontal={false} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-[38px] border-2 border-[#2F73FF] bg-white px-7 pt-8 pb-10">
          <p className="text-[16px] font-bold text-[#2F73FF]">Faturaları Gönder</p>
          <h3 className="mt-5 max-w-[760px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
            Profesyonel faturaları saniyeler içinde göndererek zamandan tasarruf edin ve müşterilerinizi etkileyin.
          </h3>
        </div>

        <div className="relative overflow-hidden rounded-[38px] bg-[#E7ECF8] px-7 pt-8 pb-7">
          <p className="text-[16px] font-bold text-[#2F73FF]">Özel Muhasebeci</p>
          <h3 className="mt-5 max-w-[760px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
            İşletmenizi Tanıyan, Alanında Uzman Bir Muhasebeci.
          </h3>
          <p className="mt-5 max-w-[760px] text-[17px] leading-[1.5] text-black/85">
            Gece geç saatlere kadar hesap tablolarıyla uğraşmaya veda edin. Uzman muhasebe desteğiyle, paranızın durumunu her zaman bileceksiniz.
          </p>
          <div className="mt-6 flex h-[190px] items-end justify-end rounded-[26px] bg-[radial-gradient(circle_at_76%_58%,rgba(47,115,255,0.18)_0,rgba(47,115,255,0.18)_16%,transparent_17%)]">
            <Image
              src="/muhasebe.webp"
              alt="Muhasebe uzmanı görseli"
              width={340}
              height={220}
              className="h-auto w-[260px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DigitalAltyapiShowcase() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[38px] bg-[#E9F8F6] px-7 pt-8 pb-6">
        <p className="text-[16px] font-bold text-[#0F766E]">e-İmza — E-Tuğra Nitelikli</p>
        <h3 className="mt-5 max-w-[700px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
          Resmi işlemleriniz için yasal geçerliliğe sahip nitelikli elektronik imza.
        </h3>
        <p className="mt-5 max-w-[720px] text-[17px] leading-[1.5] text-black/85">
          e-İmza ile attığınız imza, ıslak imzayla aynı hukuki geçerliliğe sahiptir. e-Devlet, GİB, MERSIS ve SGK portallarına güvenli erişim sağlayın.
        </p>
        <div className="relative mt-8 h-[240px] overflow-hidden md:h-[268px]">
          <div className="absolute left-0 top-0 h-[310px] w-[calc(100%/0.74)] origin-top-left scale-[0.74] md:h-[340px] md:w-[calc(100%/0.76)] md:scale-[0.76]">
            <DigitalInfrastructureMockup />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-[38px] bg-[#E9F8F6] px-7 pt-8 pb-7">
          <p className="text-[16px] font-bold text-[#0F766E]">KEP — Kayıtlı Elektronik Posta</p>
          <h3 className="mt-5 max-w-[500px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[22px]">
            Taahhütlü mektup hükmünde resmi dijital yazışma.
          </h3>
          <p className="mt-4 max-w-[500px] text-[16px] leading-[1.5] text-black/85">
            Vergi dairesi tebligatları, SGK bildirimleri ve resmi yazışmalar için zorunlu — içerik değişikliği yapılamaz, teslim zamanı kayıt altına alınır.
          </p>
          <Link href="/digital-altyapi" className="mt-5 flex items-center gap-2 text-[14px] font-semibold text-[#0F766E] hover:opacity-70 transition-opacity">
            KEP Paketlerini Gör <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-[38px] border-2 border-[#0F766E] bg-white px-7 pt-8 pb-7">
          <p className="text-[16px] font-bold text-[#0F766E]">Dijital Altyapı Paketi</p>
          <h3 className="mt-5 max-w-[480px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[22px]">
            e-İmza ve KEP birlikte — tek paket, tam dijital altyapı.
          </h3>
          <Link href="/digital-altyapi" className="mt-5 flex items-center gap-2 text-[14px] font-semibold text-black hover:opacity-70 transition-opacity">
            Paketi İncele <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function EcosystemShowcase() {
  const services = [
    {
      label: "Şirketini Kur",
      description: "Şahıs, Limited, Anonim veya Bilanço şirketini kurumsal süreçleri takip ederek kur.",
      href: "/sirketini-kur",
      color: "bg-[#FFFBEB]",
      accent: "text-[#D97706]",
    },
    {
      label: "Dijital Ofis",
      description: "Kurumsal e-posta, Teams, OneDrive ve IT yönetimi tek pakette.",
      href: "/dijitale-tasi",
      color: "bg-[#F0FDFA]",
      accent: "text-[#0F766E]",
    },
    {
      label: "Görünür Ol",
      description: "Web sitesi ve sosyal medya yönetimiyle markanı dijitalde büyüt.",
      href: "/gorunur-ol",
      color: "bg-[#EFF6FF]",
      accent: "text-[#1b98d5]",
    },
    {
      label: "İşini Büyüt",
      description: "Teşvik, hibe, yatırımcı erişimi ve uzman desteğiyle şirketini güçlendir.",
      href: "/buyut",
      color: "bg-[#F0FDF4]",
      accent: "text-[#16A34A]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
      <div className="rounded-[38px] bg-[#E8F4FD] px-7 pt-8 pb-7">
        <p className="text-[16px] font-bold text-[#1b98d5]">Work365 Ekosistemi</p>
        <h3 className="mt-5 max-w-[620px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
          Kuruluştan büyümeye — tek platformda 4 hizmet.
        </h3>
        <p className="mt-5 max-w-[640px] text-[17px] leading-[1.5] text-black/85">
          Şirketinizin ihtiyaç duyduğu tüm hizmetler tek çatı altında. Kuruluş, dijital ofis, marka ve büyüme.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {services.slice(0, 2).map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className={`rounded-[20px] ${s.color} p-4 flex flex-col gap-3 hover:shadow-md transition-shadow`}
            >
              <span className={`text-[11px] font-bold ${s.accent}`}>{s.label}</span>
              <p className="text-[12px] leading-[1.5] text-black/70">{s.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6 flex-1">
          {services.slice(2).map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className={`rounded-[38px] ${s.color} px-7 pt-8 pb-7 flex flex-col gap-3 hover:shadow-md transition-shadow`}
            >
              <span className={`text-[13px] font-bold ${s.accent}`}>{s.label}</span>
              <h3 className="text-[18px] font-bold leading-[1.2] tracking-[-0.03em] text-black">{s.label}</h3>
              <p className="text-[13px] leading-[1.5] text-black/70">{s.description}</p>
            </Link>
          ))}
        </div>
        <div className="rounded-[38px] bg-[#E8F4FD] px-7 py-7">
          <p className="text-[16px] font-bold text-[#1b98d5]">Tek Platform</p>
          <h3 className="mt-4 text-[18px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[21px]">
            Tüm hizmetler Work365 panelinizde tek yerden yönetilir.
          </h3>
          <Link href="/fiyatlandirma" className="mt-4 flex items-center gap-2 text-[14px] font-semibold text-[#1b98d5] hover:opacity-70 transition-opacity">
            Fiyatlandırmayı Gör <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function DigitalInfrastructureMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-tl-2xl rounded-bl-2xl border border-[#D8ECE8] bg-white p-4 shadow-2xl">
      <div className="flex h-full flex-col rounded-[22px] bg-[#F6FBFA] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0F766E]">
              Dijital Altyapi
            </p>
            <p className="mt-1 text-sm font-bold text-black">Urun ve Yetki Paneli</p>
          </div>
          <div className="rounded-full bg-[#DDF5F1] px-3 py-1 text-[10px] font-bold text-[#0F766E]">
            Aktif
          </div>
        </div>

        <div className="mt-4 grid flex-1 grid-cols-[1.15fr_0.85fr] gap-3">
          <div className="rounded-[18px] bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-black">e-Imza</p>
                <p className="mt-1 text-[10px] text-black/55">E-Tugra Nitelikli</p>
              </div>
              <div className="rounded-full bg-[#E8F7F3] px-2.5 py-1 text-[9px] font-bold text-[#0F766E]">
                Hazir
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {[
                "Nitelikli elektronik sertifika",
                "Basvuru ve kimlik dogrulama takibi",
                "Imza suresi ve yenileme hatirlatmasi",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl bg-[#F7FAF9] px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-[#0F766E]" />
                  <span className="text-[10px] font-medium text-black/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-[18px] bg-[#DDF5F1] p-4">
              <p className="text-[11px] font-bold text-black">KEP</p>
              <p className="mt-1 text-[10px] text-black/60">Kurumsal ileti gonderimi</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white px-3 py-2">
                  <p className="text-[8px] font-semibold text-black/50">Hesap</p>
                  <p className="mt-1 text-[10px] font-bold text-black">Aktif</p>
                </div>
                <div className="rounded-xl bg-white px-3 py-2">
                  <p className="text-[8px] font-semibold text-black/50">Bildirim</p>
                  <p className="mt-1 text-[10px] font-bold text-black">Acik</p>
                </div>
              </div>
            </div>

            <div className="rounded-[18px] bg-white p-4">
              <p className="text-[10px] font-bold text-black">Temel Ozellikler</p>
              <div className="mt-3 space-y-2">
                {["Resmi bildirim takibi", "Delil niteliginde gonderim", "Panelden kolay yonetim"].map((item) => (
                  <div key={item} className="rounded-xl bg-[#F7FAF9] px-3 py-2 text-[10px] font-medium text-black/70">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EcosystemMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-tl-2xl rounded-bl-2xl border border-[#D0E8F8] bg-white p-4 shadow-2xl">
      <div className="flex h-full flex-col rounded-[22px] bg-[#F0F7FD] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">
              Ekosistem
            </p>
            <p className="mt-1 text-sm font-bold text-black">İş Ortakları</p>
          </div>
          <div className="rounded-full bg-[#E8F4FD] px-3 py-1 text-[10px] font-bold text-[#1b98d5]">
            4 Hizmet
          </div>
        </div>

        <div className="mt-4 grid flex-1 grid-cols-2 gap-2">
          {[
            { name: "Şirketini Kur", badge: "Kuruluş", color: "bg-[#FFFBEB]" },
            { name: "Dijital Ofis", badge: "IT Yönetimi", color: "bg-[#F0FDFA]" },
            { name: "Görünür Ol", badge: "Marka", color: "bg-[#EFF6FF]" },
            { name: "İşini Büyüt", badge: "Büyüme", color: "bg-[#F0FDF4]" },
          ].map((p) => (
            <div key={p.name} className={`${p.color} rounded-[16px] p-3 flex flex-col justify-between`}>
              <p className="text-[9px] font-bold text-black/40">{p.badge}</p>
              <p className="text-sm font-bold text-black">{p.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-[16px] bg-white px-3 py-2">
          <p className="text-[9px] font-semibold text-black/55">Tek platform</p>
          <p className="text-[10px] font-bold text-black">Tümü panelden yönetilir</p>
        </div>
      </div>
    </div>
  );
}

function FormationMockup({
  isHorizontal,
  alignBottom = false,
  hideStroke = false,
}: {
  isHorizontal: boolean;
  alignBottom?: boolean;
  hideStroke?: boolean;
}) {
  return (
    <div
      className={`${alignBottom ? "absolute bottom-0 left-5 w-[58%] md:w-[60%]" : "absolute inset-0"} overflow-hidden ${
        hideStroke ? "border border-[#E8DFC5]" : "border-2 border-[#A88208]"
      } bg-[#FFFDF7] shadow-2xl ${
        isHorizontal ? "rounded-tl-2xl rounded-bl-2xl p-4" : "rounded-t-3xl p-4"
      }`}
    >
      <div className="flex h-full flex-col rounded-[24px] bg-white px-5 py-5">
        <h4 className="text-lg font-bold text-black">Şirket</h4>

        <div className="mt-4 grid flex-1 gap-3">
          <div className="grid grid-cols-[0.78fr_1.22fr] gap-3">
            <div className="rounded-[18px] bg-[#F7F7F7] p-3">
              <div className="mb-3 h-1.5 w-16 rounded-full bg-[#26A65B]" />
              <p className="text-[9px] font-semibold text-[#7B8087]">Adım 3/4</p>
              <div className="mt-3 space-y-2.5">
                {[
                  { label: "Başlangıç Bilgileri", active: false },
                  { label: "Şirket Profili", active: false },
                  { label: "Dosyalama Tamamlandı", active: true },
                  { label: "Tescil Aşaması", active: false },
                ].map(({ label, active }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full border ${
                        active ? "border-[#A88208] bg-[#FFF4C7]" : "border-[#AEB4BC] bg-white"
                      }`}
                    />
                    <span className={`text-[9px] font-medium ${active ? "text-[#A88208]" : "text-[#5F6368]"}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] bg-[#F2DF88] p-4">
              <div className="inline-flex rounded-full bg-[#F8E58D] px-2 py-1 text-[8px] font-bold text-[#6C5200]">
                Devam Ediyor
              </div>
              <h5 className="mt-3 text-xs font-bold text-black">Kuruluş Dosyası Hazırlanıyor</h5>
              <p className="mt-2 text-[9px] leading-[1.5] text-black/75">
                Belgeler ve başvuru akışı uzman ekip tarafından hazırlanıyor. Durum değiştiğinde panelden anında görebilirsiniz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[1.55fr_0.8fr] gap-3">
            <div className="rounded-[18px] bg-[#F7F7F7] p-4">
              <h5 className="text-xs font-bold text-black">Information</h5>
              <div className="mt-3 space-y-2.5">
                {[
                  ["Şirket Ünvanı", "Wonderland Digital"],
                  ["Şirket Türü", "Limited"],
                  ["MERSIS No", "123-456789"],
                  ["Şehir", "Istanbul"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[0.9fr_1.1fr] items-center gap-3">
                    <span className="text-[9px] font-semibold text-[#5F6368]">{label}</span>
                    <div className="flex items-center justify-between rounded-xl bg-white px-2.5 py-1.5">
                      <span className="text-[9px] text-[#7B8087]">{value}</span>
                      <div className="h-2.5 w-2.5 rounded-sm border border-[#AEB4BC]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-[18px] bg-[#F7F7F7] p-4">
                <div className="h-3 w-3 rounded-sm border border-black/70" />
                <p className="mt-4 text-[10px] font-bold text-black">Şirket Belgeleri</p>
                <p className="mt-1 text-[9px] text-black/55">6 belge</p>
                <div className="mt-4 inline-flex rounded-full bg-black px-3 py-1.5 text-[8px] font-bold text-white">
                  Belgeleri Gör
                </div>
              </div>

              <div className="rounded-[18px] bg-[#EEF3FD] p-4">
                <div className="h-3 w-3 rounded-sm border border-black/70" />
                <p className="mt-4 text-[10px] font-bold text-black">Uzman Desteği</p>
                <p className="mt-1 text-[9px] leading-[1.5] text-black/60">
                  Başvuru ve belge akışı için ekibimiz hazır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookkeepingMockup({
  isHorizontal,
  alignBottom = false,
}: {
  isHorizontal: boolean;
  alignBottom?: boolean;
}) {
  return (
    <div
      className={`${alignBottom ? "absolute bottom-[-26px] left-5 w-[74%] md:w-[76%]" : "absolute inset-0"} overflow-hidden border border-[#DCE8F6] bg-[#F7FBFF] shadow-2xl ${
        isHorizontal ? "rounded-tl-2xl rounded-bl-2xl p-4" : "rounded-t-3xl p-4"
      }`}
    >
      <div className="flex h-full flex-col rounded-[24px] border border-[#E6EEF7] bg-white">
        <div className="flex items-center justify-between border-b border-[#EEF4FA] px-4 py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">
              Muhasebe Paneli
            </p>
            <p className="mt-1 text-xs font-bold text-black">Mart Özeti</p>
          </div>
          <div className="rounded-full bg-[#F2F7FF] px-3 py-1 text-[10px] font-bold text-[#1b98d5]">
            Güncel
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[20px] bg-[#F7FBFF] p-3">
              <p className="text-[10px] font-semibold text-[#7B8087]">Toplam Gelir</p>
              <p className="mt-1 text-base font-bold text-black">184.500 ₺</p>
              <p className="mt-1 text-[10px] font-bold text-[#00A86B]">+12.4%</p>
            </div>
            <div className="rounded-[20px] bg-[#F8F8F8] p-3">
              <p className="text-[10px] font-semibold text-[#7B8087]">Toplam Gider</p>
              <p className="mt-1 text-base font-bold text-black">62.300 ₺</p>
              <p className="mt-1 text-[10px] font-bold text-[#C08F00]">Kontrol altında</p>
            </div>
          </div>

          <div className="rounded-[22px] bg-[#F7FBFF] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-bold text-[#1b98d5]">Nakit Akışı</p>
              <p className="text-[10px] font-semibold text-[#7B8087]">Son 30 gün</p>
            </div>
            <div className="flex h-20 items-end gap-2">
              {[42, 58, 44, 72, 64, 88, 76].map((height, index) => (
                <div key={index} className="flex-1 rounded-t-full bg-[linear-gradient(180deg,#9edfff_0%,#1b98d5_100%)]" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {[
              ["Fatura Kontrolü", "12 evrak bekliyor"],
              ["Banka Mutabakatı", "Güncel"],
              ["Uzman Notu", "2 işlem incelenecek"],
            ].map(([title, detail]) => (
              <div key={title} className="flex items-center justify-between rounded-2xl bg-[#FAFCFF] px-3 py-2.5">
                <span className="text-[11px] font-semibold text-black">{title}</span>
                <span className="text-[10px] font-bold text-[#7B8087]">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

