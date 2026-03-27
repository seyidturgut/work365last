"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, CheckCircle2, ShieldCheck, Sparkles, TrendingUp, X } from "lucide-react";

const advisorQuestions = [
  {
    key: "partners",
    title: "Ortak sayısı",
    question: "Şirketi kaç kişi kuracaksınız?",
    options: ["1 kişi", "2+ ortak"],
  },
  {
    key: "investment",
    title: "Yatırım hedefi",
    question: "Yakın dönemde yatırım alma hedefiniz var mı?",
    options: ["Yok", "Olabilir", "Evet"],
  },
  {
    key: "scale",
    title: "Ölçek beklentisi",
    question: "Nasıl bir yapı hedefliyorsunuz?",
    options: ["Küçük ve sade", "Büyüme odaklı", "Kurumsal yapı"],
  },
  {
    key: "team",
    title: "Ekip planı",
    question: "Kısa vadede ekip kuracak mısınız?",
    options: ["Yok veya az", "Ekip kuracağım"],
  },
  {
    key: "operations",
    title: "Operasyon tercihi",
    question: "Muhasebe ve operasyon tarafında nasıl bir yapı istiyorsunuz?",
    options: ["Basit yapı istiyorum", "Daha kurumsal yapı olabilir"],
  },
] as const;

type AdvisorKey = (typeof advisorQuestions)[number]["key"];
type AdvisorAnswers = Partial<Record<AdvisorKey, string>>;

function getAdvisorResult(answers: AdvisorAnswers) {
  const partners = answers.partners;
  const investment = answers.investment;
  const scale = answers.scale;
  const team = answers.team;
  const operations = answers.operations;

  if (
    investment === "Evet" ||
    scale === "Kurumsal yapı" ||
    (partners === "2+ ortak" && operations === "Daha kurumsal yapı olabilir" && team === "Ekip kuracağım")
  ) {
    return {
      companyType: "Anonim Şirket",
      reasons: [
        "Kurumsal yapı ve büyüme hedefinize daha uygun.",
        "Ortaklı yapı ve yatırım süreçlerinde daha güçlü bir zemin sunar.",
        "Yetki ve hisse yapısını daha esnek kurgulamanıza yardımcı olur.",
      ],
    };
  }

  if (
    partners === "1 kişi" &&
    investment === "Yok" &&
    scale === "Küçük ve sade" &&
    team === "Yok veya az" &&
    operations === "Basit yapı istiyorum"
  ) {
    return {
      companyType: "Şahıs Şirketi",
      reasons: [
        "Kurulum ve operasyon tarafında daha sade bir başlangıç sağlar.",
        "Tek kurucu ve düşük operasyon yükü için pratik bir yapıdır.",
        "İlk aşamada hız ve basitlik önceliğinize uyum sağlar.",
      ],
    };
  }

  return {
    companyType: "Limited Şirket",
    reasons: [
      "Büyüme hedefi ile operasyonel denge arasında güçlü bir orta yol sunar.",
      "Tek kurucu ya da ortaklı yapılarda esnek şekilde kurgulanabilir.",
      "Kurumsallaşma ihtiyacı olan çoğu işletme için dengeli bir yapıdır.",
    ],
  };
}

export default function Hero() {
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  return (
    <section className="pt-40 pb-20 px-6 max-w-[1230px] mx-auto min-h-screen flex flex-col justify-center">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-[#9A7B31] font-bold text-lg mb-4">
            Şirketini güvenle yönet.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[52px] md:text-[68px] font-bold tracking-tighter mb-10 leading-none text-black">
            {[
              { text: "Kur,", highlight: false },
              { text: "Çalıştır,", highlight: false },
              { text: "Büyüt.", highlight: true }
            ].map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={item.highlight ? "text-[#1b98d5]" : "text-black"}
              >
                {item.text}
              </motion.span>
            ))}
          </div>
          
          <p className="text-lg md:text-xl text-Work365-text mb-10 max-w-[480px] font-normal leading-relaxed">
            Girişimci ve KOBİ&apos;lerin şirket kurmaktan büyümeye kadar tüm süreçlerini tek platformdan yönettiği iş yönetim ekosistemi.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => setIsAdvisorOpen(true)}
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full text-[15px] font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" strokeWidth={2.5} />
              Şirket Türünü Bul
            </button>
            <Link
              href="/fiyatlandirma"
              className="flex items-center gap-1 text-[15px] font-semibold text-Work365-text transition-opacity hover:opacity-70"
            >
              Fiyatlandırmayı Gör <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-[15px] text-black">Türkiye Odaklı</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-[#00B67A] text-white"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
              ))}
            </div>
            <span className="flex items-center gap-1 text-[15px] font-bold text-[#00B67A]">
              <ShieldCheck className="h-4 w-4" strokeWidth={2.5} />
              Güvenli Süreç
            </span>
            <span className="w-full text-[14px] text-Work365-text">
              Kuruluş, uyum ve operasyon süreçlerini tek yerden yönetin
            </span>
          </div>
        </motion.div>

        {/* Right Visuals Slider */}
        <div className="relative h-[600px] flex items-center justify-center">
          <HeroSlider />
        </div>
      </div>

      {/* Brand Logos Banner */}
      <CompanyAdvisorModal open={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
    </section>
  );
}

function CompanyAdvisorModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AdvisorAnswers>({});

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setAnswers({});
    }
  }, [open]);

  if (!open) return null;

  const isComplete = step >= advisorQuestions.length;
  const currentQuestion = advisorQuestions[step];
  const result = isComplete ? getAdvisorResult(answers) : null;
  const progress = `${Math.min(step + 1, advisorQuestions.length)}/${advisorQuestions.length}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex max-h-[92vh] w-full max-w-[720px] flex-col overflow-hidden rounded-t-[28px] bg-[#FFFDF7] shadow-2xl sm:rounded-[32px]"
        >
          <div className="border-b border-black/5 px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#A88208]">
                  Akıllı Kurulum Sihirbazı
                </p>
                <h3 className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-black sm:text-[30px]">
                  Size uygun şirket yapısını bulalım
                </h3>
                <p className="mt-2 max-w-[540px] text-[14px] leading-6 text-black/65 sm:text-[15px]">
                  Kısa soruları yanıtlayın, işletmenize en uygun yapıyı tek öneri halinde çıkaralım.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-black/10 p-2 text-black/60 transition-colors hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E9EEF3]">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#1b98d5_0%,#F2D96D_100%)]"
                  animate={{ width: isComplete ? "100%" : `${(step / advisorQuestions.length) * 100}%` }}
                />
              </div>
              <span className="text-[12px] font-bold text-black/55">{isComplete ? "Tamamlandı" : progress}</span>
            </div>
          </div>

          <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            <AnimatePresence mode="wait">
              {!isComplete ? (
                <motion.div
                  key={currentQuestion.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="rounded-[28px] border border-[#E7E1CF] bg-white p-5 sm:p-6">
                    <p className="text-[13px] font-bold text-[#1b98d5]">{currentQuestion.title}</p>
                    <h4 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-black sm:text-[28px]">
                      {currentQuestion.question}
                    </h4>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {currentQuestion.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setAnswers((prev) => ({ ...prev, [currentQuestion.key]: option }));
                            setStep((prev) => prev + 1);
                          }}
                          className="rounded-[22px] border border-[#E7E1CF] bg-[#FFFDF7] px-4 py-4 text-left transition-all hover:border-[#A88208] hover:bg-[#FFF9E7]"
                        >
                          <span className="text-[15px] font-bold text-black">{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[28px] border border-[#E7E1CF] bg-white p-5 sm:p-6"
                >
                  <p className="text-[13px] font-bold text-[#1b98d5]">Onerilen Yapi</p>
                  <h4 className="mt-2 text-[28px] font-bold tracking-[-0.04em] text-black sm:text-[36px]">
                    {result?.companyType}
                  </h4>

                  <div className="mt-5 space-y-3">
                    {result?.reasons.map((reason) => (
                      <div key={reason} className="flex items-start gap-3 rounded-[20px] bg-[#F8FBFF] px-4 py-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#1b98d5]" />
                        <span className="text-[14px] font-medium leading-6 text-black/75">{reason}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href={
                        result?.companyType === "Şahıs Şirketi"
                          ? "/sirket-kur/sahis-sirketi"
                          : result?.companyType === "Anonim Şirket"
                          ? "/sirket-kur/anonim-sirketi"
                          : "/sirket-kur/limited-sirketi"
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-[15px] font-bold text-white"
                    >
                      Bu Yapıyla Devam Et <ChevronRight className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(0);
                        setAnswers({});
                      }}
                      className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3.5 text-[15px] font-bold text-black"
                    >
                      Yeniden Baslat
                    </button>
                  </div>

                  <p className="mt-4 text-[13px] leading-6 text-black/55">
                    Isterseniz uzman ekiple birlikte yapıyı netleştirip hemen kuruluma geçebilirsiniz.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev: number) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          {index === 0 ? <SlideOne /> : <SlideTwo />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SlideOne() {
  return (
    <div className="relative w-full h-full bg-[#FFEC9E] rounded-[48px] overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      {/* Entrepreneur */}
      <img
        src="/hero_male.png"
        alt="Kurucu"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] object-contain z-20"
      />

      {/* Floating UI: Compliance Checklist */}
      <motion.div 
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-10 left-6 z-10 w-[220px] md:w-[240px]"
      >
        <div className="bg-white/40 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded inline-block mb-2 text-[#8C7B38]">
          Uyum Kontrol Listesi
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex justify-between items-center group">
            <div>
              <p className="text-[10px] text-Work365-text/60 font-bold">31 Oca</p>
              <p className="text-xs font-bold">Bordro Bildirimi</p>
            </div>
            <button className="bg-[#9edfff] text-black text-[10px] font-bold px-3 py-1.5 rounded-full">Hemen Gönder</button>
          </div>
          <div className="border-t border-gray-50 pt-2 opacity-60">
             <p className="text-[10px] text-Work365-text/60 font-bold">15 Nis</p>
             <p className="text-xs font-bold">Kurumlar Vergisi Beyanı</p>
          </div>
        </div>
      </motion.div>

      {/* Floating UI: Monthly Revenue */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 10, y: -10 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-12 left-1/2 z-30 w-[220px] -translate-x-1/2 md:bottom-16"
      >
        <div className="bg-white rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
             <TrendingUp className="w-4 h-4 text-green-600" />
             <span className="text-xs font-bold tracking-tight">Aylık Gelir Özeti</span>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between text-[10px]">
                <span className="font-bold text-Work365-text/60">e-Fatura Tahsilatı</span>
                <span className="font-bold text-green-600">+12.450 ₺</span>
             </div>
             <div className="flex justify-between text-[10px]">
                <span className="font-bold text-Work365-text/60">Danışmanlık Geliri</span>
                <span className="font-bold text-green-600">+8.200 ₺</span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SlideTwo() {
  return (
    <div className="relative w-full h-full bg-[#9edfff] rounded-[48px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      <img
        src="/hero_female.png"
        alt="Kurucu"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] object-contain z-20"
      />

      <motion.div 
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-10 left-6 z-10 w-[220px] md:w-[240px]"
      >
        <div className="bg-white/40 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded inline-block mb-2 text-[#0E4A6E]">
          Şirket Kuruluş Takibi
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-xl space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                 <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-green-600">Hesap Kurulumu</span>
           </div>
           <div className="flex items-center gap-3 pl-1">
              <div className="w-4 h-4 rounded-full border-2 border-yellow-500 flex items-center justify-center text-[8px] font-bold">2</div>
              <span className="text-xs font-bold">Kuruluş Başvurusu</span>
              <span className="ml-auto bg-yellow-100 text-yellow-700 text-[8px] px-2 py-0.5 rounded font-bold uppercase">Devam ediyor</span>
           </div>
           <div className="flex items-center gap-3 pl-1 opacity-40">
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center text-[8px] font-bold">3</div>
              <span className="text-xs font-bold">Şirket Tescili</span>
           </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 10, y: -10 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-12 left-1/2 z-30 w-[220px] -translate-x-1/2 md:bottom-16"
      >
        <div className="bg-white rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-4 h-4 rounded-full border-2 border-black" />
             <span className="text-xs font-bold">İşlemler</span>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold">Vergi Tahsilatı</span>
                <span className="font-bold">6.750 ₺ <span className="text-green-600 ml-1">Gelir</span></span>
             </div>
             <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold">Banka Aktarımı</span>
                <span className="font-bold">2.390 ₺ <span className="text-yellow-600 ml-1">Aktarım</span></span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
