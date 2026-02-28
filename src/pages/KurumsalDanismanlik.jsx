import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hyperspeed from '../components/common/Hyperspeed/Hyperspeed';
import {
  FaBuilding,
  FaChartLine,
  FaShieldAlt,
  FaCog,
  FaUsers,
  FaGlobe
} from "react-icons/fa";

const services = [
  {
    icon: FaBuilding,
    badge: "Strateji",
    title: "Şirket Kurma & Yapılandırma",
    description: "A'dan Z'ye şirket kuruluş süreçleri, ortaklık yapıları ve kurumsal yönetim danışmanlığı ile işletmenizi sağlam temeller üzerine inşa edin.",
    features: ["Şirket türü seçimi danışmanlığı", "Ortaklık anlaşmaları hazırlığı", "Kurumsal yönetim sistemleri"],
    statLabel: "Tamamlanan kuruluş",
    statValue: "450+",
    footer: "Özel ihtiyaçlarınıza göre uçtan uca uyarlanır",
    gradient: "from-primary-dark to-primary",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    bgColor: "bg-white"
  },
  {
    icon: FaChartLine,
    badge: "Finans",
    title: "Mali Müşavirlik & Muhasebe",
    description: "Profesyonel muhasebe hizmetleri, mali müşavirlik ve finansal raporlama ile işletmenizin finansal sağlığını optimize edin.",
    features: ["Aylık muhasebe kayıtları", "Mali müşavirlik hizmetleri", "Finansal analiz ve raporlama"],
    statLabel: "Yıllık rapor",
    statValue: "1.2K",
    gradient: "from-emerald-600 to-teal-500",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    bgColor: "bg-gray-50/50"
  },
  {
    icon: FaShieldAlt,
    badge: "Uyum",
    title: "Mevzuat Uyum & Risk Yönetimi",
    description: "Değişen mevzuatlara uyum sağlama, risk analizi ve compliance süreçleriyle işletmenizi yasal risklerden koruyun.",
    features: ["KVKK uyum danışmanlığı", "İş sağlığı ve güvenliği", "Yasal risk analizleri"],
    statLabel: "Uyum başarı oranı",
    statValue: "%99",
    gradient: "from-primary to-work-green-600",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    bgColor: "bg-primary/5"
  },
  {
    icon: FaCog,
    badge: "Teknoloji",
    title: "Dijital Dönüşüm",
    description: "İşletmenizin dijital çağa uyum sağlaması için teknoloji entegrasyonu, süreç otomasyonu ve dijital strateji geliştirme.",
    features: ["ERP sistem entegrasyonu", "Süreç otomasyonu", "Dijital pazarlama stratejileri"],
    statLabel: "Otomasyon verimi",
    statValue: "%65",
    gradient: "from-primary-dark to-work-green-500",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    bgColor: "bg-slate-50"
  },
  {
    icon: FaUsers,
    badge: "İK",
    title: "İnsan Kaynakları Danışmanlığı",
    description: "Doğru yetenek seçimi, performans yönetimi ve çalışan memnuniyeti için kapsamlı İK çözümleri sunuyoruz.",
    features: ["Bordro ve SGK işlemleri", "İK politikaları geliştirme", "Yetenek kazanım stratejileri"],
    statLabel: "Ekip memnuniyeti",
    statValue: "%92",
    gradient: "from-work-green-700 to-primary",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800",
    bgColor: "bg-work-green-50/30"
  },
  {
    icon: FaGlobe,
    badge: "Global",
    title: "Uluslararası Genişleme",
    description: "Global pazarlara açılma, uluslararası ortaklıklar ve cross-border işlemler için stratejik danışmanlık hizmetleri.",
    features: ["Pazar araştırması ve analizi", "Uluslararası vergi planlaması", "Export-import süreç danışmanlığı"],
    statLabel: "Global partner",
    statValue: "60+",
    footer: "Özel ihtiyaçlarınıza göre uçtan uca uyarlanır",
    gradient: "from-primary-dark to-primary",
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&q=80&w=800",
    bgColor: "bg-white"
  }
];

const processSteps = [
  {
    icon: FaChartLine,
    title: "İhtiyaç Analizi",
    description: "Sektör, hedef ve süreçlerinizi derinlemesine analiz ederek yol haritasını belirliyoruz.",
    status: "1. Hafta",
  },
  {
    icon: FaCog,
    title: "Strateji Tasarımı",
    description: "Sürdürülebilir büyüme ve operasyonel verimliliğe odaklanan çözümü tasarlıyoruz.",
    status: "2-3. Hafta",
  },
  {
    icon: FaShieldAlt,
    title: "Uygulama & Entegrasyon",
    description: "Teknoloji, süreç ve ekip tarafında gerekli entegrasyonları yönetiyoruz.",
    status: "4-8. Hafta",
  },
  {
    icon: FaGlobe,
    title: "Performans & Optimize",
    description: "KPI takibi ve iyileştirme döngüleriyle projeyi sürekli optimize ediyoruz.",
    status: "Sürekli",
  },
];

export default function KurumsalDanismanlik() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] text-white py-24 pt-40 overflow-hidden">
        <Hyperspeed />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Kurumsal <span className="text-primary-light">Danışmanlık</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Yenilikçi, güvenilir ve bütünsel danışmanlık çözümleri ile işletmenizi yarına hazırlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/iletisim"
                className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-[0_8px_25px_rgba(121,155,56,0.3)] hover:shadow-[0_12px_35px_rgba(121,155,56,0.4)] transform hover:-translate-y-1 transition-all duration-300"
              >
                Ücretsiz Danışmanlık Al
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="tel:+908501234567"
                className="inline-flex items-center px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white hover:text-[#0F172A] hover:border-white transition-all duration-300"
              >
                Hemen Arayın
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Kapsamlı Kurumsal Çözümler
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto">
              İşletmenizin her alanında profesyonel danışmanlık hizmetleri ile büyüme yolculuğunuzda yanınızdayız.
            </p>
          </motion.div>
        </div>

        {services.map((service, index) => (
          <section key={index} className={`py-24 ${service.bgColor}`}>
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1 text-center lg:text-left">
                      <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">{service.badge}</span>
                      <h3 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    {service.statValue && (
                      <div className="flex flex-col items-center lg:items-end bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{service.statLabel}</span>
                        <span className="text-2xl font-black text-primary leading-none">{service.statValue}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 group/item"
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center text-sm font-black shadow-lg group-hover/item:scale-110 transition-transform`}>
                          {idx + 1}
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {service.footer && (
                    <div className="pt-4 border-t border-gray-100 italic text-sm text-gray-500">
                      {service.footer}
                    </div>
                  )}

                  <div className="pt-4 flex justify-center lg:justify-start">
                    <Link
                      to="/iletisim"
                      className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all group"
                    >
                      Daha Fazla Bilgi Al
                      <svg className="w-5 h-5 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Image Section */}
                <div className="flex-1 relative group w-full lg:w-auto">
                  <div className={`absolute -inset-4 bg-gradient-to-br ${service.gradient} opacity-10 blur-2xl rounded-[40px] group-hover:opacity-20 transition-opacity duration-500`}></div>
                  <div className="relative overflow-hidden rounded-[32px] aspect-[4/3] shadow-2xl border border-gray-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent"></div>

                    {/* Floating Icon Decoration */}
                    <div className={`absolute bottom-6 right-6 w-16 h-16 rounded-2xl bg-white/90 backdrop-blur shadow-xl flex items-center justify-center text-primary group-hover:rotate-6 transition-transform duration-500`}>
                      <service.icon className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              Danışmanlık Sürecimiz
            </h2>
            <p className="text-gray-600 text-lg">
              Analizden uygulamaya kadar şeffaf, ölçülebilir ve sonuç odaklı bir metodoloji izliyoruz.
            </p>
          </motion.div>

          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gray-200">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary to-primary/50 w-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group"
                >
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                    {/* Circle & Icon */}
                    <div className="relative">
                      <div className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-gray-100">
                        <step.icon className="w-10 h-10" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-black shadow-lg">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="flex flex-col items-center lg:items-start">
                        <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1">{step.status}</span>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0A1919] via-[#1E293B] to-[#0A1919] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Büyüme Yolculuğunuzda Yanınızdayız
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              20 yıllık deneyimimiz ve uzman kadromuzla işletmenizin her ihtiyacında çözüm ortağınız olmaya hazırız.
            </p>
            <Link
              to="/iletisim"
              className="inline-flex items-center px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-[0_8px_25px_rgba(121,155,56,0.3)] hover:shadow-[0_12px_35px_rgba(121,155,56,0.5)] transform hover:-translate-y-1 transition-all duration-300"
            >
              Hemen Teklif Alın
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
