import { motion } from "framer-motion";
import { Target, MapPin, Cloud, CheckCircle } from "lucide-react";

const processSteps = [
  {
    id: "01",
    title: "Ön Analiz & Strateji",
    description:
      "Şirket tipi, sektör beklentileri ve finansal hedeflerinizi analiz ederek size en uygun vergi tüzel kişilik simülasyonunu çıkarıyoruz.",
    duration: "Gün 0-1",
    icon: Target,
  },
  {
    id: "02",
    title: "Başvuru & Tescil",
    description:
      "Evrak işlerini bize bırakın. Ticaret Odası, Vergi Dairesi ve SGK işlemlerini dijital ortamdan yöneterek hızla kurulumu gerçekleştiriyoruz.",
    duration: "Gün 2-5",
    icon: MapPin,
  },
  {
    id: "03",
    title: "Dijital Entegrasyon",
    description:
      "Online ön muhasebe altyapınızı kuruyor, E-Fatura/E-Defter sistemlerinizi aktif hale getiriyoruz. İşiniz ilk günden dijitalleşiyor.",
    duration: "Gün 6-10",
    icon: Cloud,
  },
  {
    id: "04",
    title: "Büyüme & Ölçeklem",
    description:
      "Artık yönetim bizde. Aylık raporlamalar, maaş bordrolamaları ve hibe danışmanlığı ile siz sadece işinizi büyütmeye odaklanın.",
    duration: "Sürekli",
    icon: CheckCircle,
  },
];

export default function ProcessStepsSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-white border-t border-slate-100">
      {/* Premium Light SaaS Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid Pattern for Light Theme */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#65A30D]/20 bg-[#65A30D]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[#65A30D] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65A30D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#65A30D]"></span>
            </span>
            Nasıl Çalışıyoruz
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#2A3441]">
            Kuruluştan büyümeye 4 adım
          </h2>
        </motion.div>

        <div className="mx-auto max-w-[1200px] mt-12 lg:mt-20 [perspective:1400px] px-4 sm:px-0">
          <motion.div
            initial={{ rotateX: 12, opacity: 0, y: 60 }}
            whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
            className="relative transform-gpu"
          >
            {/* Screen / Frame (Aluminum/Glass look) */}
            <div className="relative rounded-t-xl lg:rounded-t-[2.5rem] border-4 lg:border-[16px] border-slate-800 bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-slate-900/50">

              {/* Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 lg:w-40 h-3 lg:h-6 bg-slate-800 rounded-b-lg lg:rounded-b-2xl z-20 flex justify-center items-center shadow-inner">
                <div className="w-1 h-1 lg:w-2 lg:h-2 rounded-full bg-slate-950 border border-slate-700/50 shadow-inner"></div>
                <div className="w-0.5 h-0.5 rounded-full bg-green-500/50 ml-1.5 lg:ml-2"></div>
              </div>

              {/* Screen Content (The Dashboard UI) */}
              <div className="relative bg-slate-50 w-full h-full p-4 sm:p-6 lg:p-8 xl:p-12 overflow-hidden saas-mesh-bg">
                {/* Top App Bar Mockup */}
                <div className="flex items-center justify-between mb-6 lg:mb-12 border-b border-slate-200/80 pb-4 bg-white/50 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 -mt-4 sm:-mt-6 lg:-mt-12 pt-4 sm:pt-6 lg:pt-8 rounded-t-lg">
                  <div className="flex items-center gap-1.5 lg:gap-2 w-1/4 sm:w-1/3">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-slate-300"></div>
                    <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-slate-300 hidden sm:block"></div>
                    <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-slate-300 hidden sm:block"></div>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <div className="px-2 lg:px-6 py-1 lg:py-1.5 bg-white rounded-md lg:rounded-lg border border-slate-200 text-[8px] sm:text-[10px] lg:text-xs font-semibold text-slate-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center gap-1.5 lg:gap-2">
                      <span className="relative flex h-1.5 lg:h-2 w-1.5 lg:w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65A30D] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 lg:h-2 w-1.5 lg:w-2 bg-[#65A30D]"></span>
                      </span>
                      work365.com.tr
                    </div>
                  </div>

                  <div className="w-1/4 sm:w-1/3 flex justify-end">
                    <div className="w-5 h-5 lg:w-8 lg:h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm"></div>
                  </div>
                </div>

                {/* The 4 Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative z-10">
                  {processSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <motion.article
                        key={step.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                        className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(42,52,65,0.08)] hover:border-[#65A30D]/30 group"
                      >
                        <div className="mb-4 lg:mb-5 flex items-center justify-between">
                          <div className="flex h-9 w-9 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-700 shadow-[0_0_0_1px_rgba(15,23,42,0.06)] group-hover:bg-[#65A30D] group-hover:text-white transition-colors duration-300">
                            <Icon className="h-4.5 w-4.5 lg:h-6 lg:w-6" />
                          </div>
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 lg:px-3 py-0.5 lg:py-1 text-[9px] lg:text-xs font-semibold text-slate-600 group-hover:border-[#65A30D]/20 transition-colors duration-300">
                            {step.duration}
                          </span>
                        </div>

                        <div className="mb-2 lg:mb-4 text-2xl lg:text-4xl font-black text-slate-200 group-hover:text-[#65A30D]/10 transition-colors duration-300">{step.id}</div>
                        <h3 className="mb-1.5 lg:mb-3 text-base lg:text-xl font-bold text-slate-900 leading-tight">{step.title}</h3>
                        <p className="text-[11px] lg:text-sm leading-relaxed text-slate-600">{step.description}</p>

                        <div className="mt-4 lg:mt-6 rounded-xl border border-slate-100 bg-slate-50/50 p-3 lg:p-4">
                          <div className="mb-1.5 lg:mb-2 flex items-center justify-between text-[9px] lg:text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                            <span>İlerleme</span>
                            <span className="text-slate-700 font-bold">{25 * (index + 1)}%</span>
                          </div>
                          <div className="h-1.5 lg:h-2 rounded-full bg-slate-200/80 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${25 * (index + 1)}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.6 + (index * 0.1), duration: 0.8, ease: "easeOut" }}
                              className="h-full rounded-full bg-[#65A30D]"
                            />
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MacBook Bottom Base (Lip / Keyboard deck edge) */}
            <div className="relative w-[108%] lg:w-[114%] -translate-x-[4%] lg:-translate-x-[6.1%] h-3 lg:h-6 bg-slate-300 rounded-t-sm rounded-b-lg lg:rounded-b-3xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex justify-center items-start overflow-hidden">
              {/* Reflective shine on top edge */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white"></div>
              {/* Trackpad indentation line */}
              <div className="w-1/4 h-1 lg:h-2 bg-slate-400/60 rounded-b-lg lg:rounded-b-xl mt-px shadow-inner"></div>
              {/* Darker bottom edge for depth */}
              <div className="absolute inset-x-0 bottom-0 h-1 lg:h-2 bg-slate-400/80"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
