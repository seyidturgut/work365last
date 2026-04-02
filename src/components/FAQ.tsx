"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Work365 ile şirket kuruluşu ne kadar sürer?",
    answer: "Şahıs şirketi kuruluşu ortalama 2–3 iş günü, Limited veya Anonim şirket tescili ise 5–7 iş günü içinde tamamlanmaktadır. Tüm süreç tamamen dijital olarak yürütülür; noter, evrak kuyruğu veya kurum kurum dolaşmak gerekmez."
  },
  {
    question: "Şirket kurulumunda hangi belgelere ihtiyacım var?",
    answer: "Kimlik fotokopisi (T.C. kimlik kartı veya pasaport) ve ikametgah belgesi yeterlidir. Ortaklı şirketlerde tüm ortakların kimlik bilgileri gerekir. Belgelerin listesi ve doğru formatları size başvuru aşamasında adım adım gösterilir."
  },
  {
    question: "e-Fatura, e-Arşiv ve e-Dönüşüm geçişini Work365 üzerinden yapabilir miyim?",
    answer: "Evet. GİB uyumlu e-Fatura, e-Arşiv Fatura, e-İrsaliye ve e-Defter entegrasyonları Dijital Altyapı paketimiz kapsamındadır. Muhasebecin veya mevcut ERP sistemin ile entegrasyon desteği de sağlanır."
  },
  {
    question: "Başlangıç paketine hangi hizmetler dahil?",
    answer: "Başlangıç paketi; şirket kuruluşu (tescil ve vergi levhası), e-İmza (1 yıl), KEP adresi (1 yıl) ve sanal ofis hizmetini kapsar. Ek olarak Dijital Altyapı (e-Dönüşüm, M365) ve Ekosistem modülleri isteğe bağlı olarak pakete eklenebilir."
  },
  {
    question: "Sonradan paket veya modül yükseltmesi yapabilir miyim?",
    answer: "Evet, dilediğin zaman mevcut paketine yeni modüller ekleyebilir veya üst pakete geçiş yapabilirsin. Yükseltme işlemleri Work365 müşteri paneli üzerinden birkaç tıkla gerçekleştirilir; ek kurulum veya sözleşme süreci gerekmez."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-[#F5F7FA]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Sıkça Sorulan Sorular</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-[#E8ECEF] rounded-2xl overflow-hidden bg-white"
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none bg-white hover:bg-[#F9FAFB] transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-Work365-text shrink-0 ml-4" />
                ) : (
                  <Plus className="w-5 h-5 text-Work365-text shrink-0 ml-4" />
                )}
              </button>

              {openIndex === index && (
                <div className="p-6 pt-0 bg-white text-Work365-text leading-relaxed border-t border-[#E8ECEF]">
                  <p className="mt-4">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
