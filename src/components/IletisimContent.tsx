"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, Clock } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "E-posta",
    value: "hello@work365.co",
    href: "mailto:hello@work365.co",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 850 000 36 35",
    href: "tel:+908500003635",
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "Hafta içi 09:00–18:00",
    href: null,
  },
];

export default function IletisimContent() {
  return (
    <main className="min-h-screen bg-white text-[#0F172A]">
      <Header />

      {/* Hero */}
      <section className="px-6 pb-0 pt-36 md:pt-44">
        <div className="mx-auto max-w-[1230px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#1B98D5]">İletişim</p>
            <h1 className="mt-4 max-w-[18ch] text-[42px] font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0F172A] md:text-[60px]">
              Size nasıl yardımcı olabiliriz?
            </h1>
            <p className="mt-5 max-w-[55ch] text-[18px] leading-8 text-[#64748B]">
              Satış ekibimiz 1 iş günü içinde geri döner. Kuruluş paketi, dijital altyapı veya ekosistem modülleri için doğru çözümü birlikte bulalım.
            </p>
          </motion.div>

          {/* İletişim yöntemleri */}
          <div className="mt-10 flex flex-wrap gap-4">
            {contactMethods.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3 rounded-[18px] border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-3.5 transition-colors hover:border-[#1B98D5]/30 hover:bg-[#F0F8FF]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                    <Icon className="h-4 w-4 text-[#1B98D5]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#94A3B8]">{item.label}</p>
                    <p className="text-[14px] font-semibold text-[#0F172A]">{item.value}</p>
                  </div>
                </motion.div>
              );
              return item.href ? (
                <a key={item.label} href={item.href}>{content}</a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Sağ bilgi */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[1230px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-12 lg:grid-cols-[1fr_380px]"
          >
            {/* Form */}
            <div className="rounded-[28px] border border-[#E8EFF6] bg-[#F9FBFD] p-8 md:p-10">
              <h2 className="text-[24px] font-bold tracking-[-0.04em] text-[#0F172A]">
                Mesaj gönderin
              </h2>
              <p className="mt-2 text-[14px] text-[#64748B]">
                Formu doldurun, en kısa sürede size dönelim.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Sağ panel */}
            <div className="flex flex-col gap-6">
              <div className="rounded-[24px] bg-[#0F172A] px-7 py-7 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7DD3FC]">Hızlı yanıt</p>
                <p className="mt-3 text-[20px] font-bold leading-snug tracking-[-0.03em]">
                  1 iş günü içinde geri dönüyoruz.
                </p>
                <p className="mt-3 text-[14px] leading-6 text-white/68">
                  Satış ekibimiz mesajınızı aldıktan sonra ihtiyacınıza uygun bir çözüm önerisiyle size ulaşır.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Hangi konularda yardım alabilirsiniz?",
                    a: "Şirket kuruluşu, dijital ofis (e-İmza, KEP, M365), web & sosyal medya yönetimi ve işini büyüt hizmetleri hakkında destek veriyoruz.",
                  },
                  {
                    q: "Görüşme ücretsiz mi?",
                    a: "Evet. İlk ihtiyaç görüşmesi tamamen ücretsizdir, herhangi bir taahhüt gerektirmez.",
                  },
                  {
                    q: "Mevcut müşteri misiniz?",
                    a: "Panel üzerinden destek talebi oluşturabilir ya da hello@work365.co adresine doğrudan yazabilirsiniz.",
                  },
                ].map((item) => (
                  <div key={item.q} className="rounded-[20px] border border-[#E8EFF6] bg-white px-6 py-5">
                    <p className="text-[14px] font-semibold text-[#0F172A]">{item.q}</p>
                    <p className="mt-2 text-[13px] leading-6 text-[#64748B]">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
