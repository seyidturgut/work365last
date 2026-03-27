const steps = [
  {
    number: "01",
    title: "Şirket tipini seç",
    desc: "Şahıs, Limited, Anonim veya Bilanço — hangisinin sana uygun olduğunu öğren ve başvurunu başlat.",
  },
  {
    number: "02",
    title: "Paketini belirle",
    desc: "Yalnızca şirket kuruluşu mu, dijital ofis mi, sosyal medya mı? İhtiyacına göre kombine et.",
  },
  {
    number: "03",
    title: "Biz halledelim",
    desc: "Evrak, başvuru ve kurulum süreçlerini ekibimiz yönetir. Sen işine odaklan.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-20 bg-[#F8FAFC]">
      <div className="max-w-[1230px] mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-tighter text-black mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-[16px] text-black/55 max-w-[460px] mx-auto">
            3 adımda şirketini kur, dijital altyapını hazırla.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line on md+ */}
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-black/8" />
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-start md:items-center md:text-center">
              <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-black/10 flex items-center justify-center mb-5 shadow-sm">
                <span className="text-[18px] font-bold text-black/30">{step.number}</span>
              </div>
              <h3 className="text-[18px] font-bold text-black mb-2">{step.title}</h3>
              <p className="text-[14px] text-black/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
