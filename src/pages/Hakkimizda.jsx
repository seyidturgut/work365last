import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaLinkedin,
  FaLightbulb,
  FaUsers,
  FaHandshake,
  FaRocket,
  FaQuoteLeft,
  FaAward,
  FaGlobe,
  FaChartLine
} from 'react-icons/fa';

const impactStats = [
  { label: 'Tasarlandı', value: '320+', detail: 'Kurumsal dönüşüm ve dijitalleşme projesi' },
  { label: 'Göç ettirildi', value: '4.8 TB', detail: 'Kritik veri & süreç' },
  { label: 'Tasarruf', value: '%37', detail: 'Operasyon maliyetlerinde ortalama düşüş' },
  { label: 'NPS', value: '72', detail: 'Müşteri tavsiye skoru' },
];

const missionVision = [
  {
    title: 'Misyonumuz',
    description: 'Şirketleri karmaşık süreçlerden kurtararak strateji, teknoloji ve insan odağında ölçülebilir değer üretmek.'
  },
  {
    title: 'Vizyonumuz',
    description: 'Her ölçekte şirketin dijital dönüşüm yolculuğunda güvenilir kılavuzu olmak ve bölgesel ölçekte etki yaratmak.'
  },
  {
    title: 'Yaklaşımımız',
    description: 'Analiz → Strateji → Uygulama → Optimize döngüsünü gerçek zamanlı verilerle besleyip her sprintte görünür sonuç sunmak.'
  }
];

const values = [
  {
    icon: FaLightbulb,
    title: 'Netlik & Şeffaflık',
    description: 'Projeye başlamadan önce tüm risk, maliyet ve KPI seti netleşir. Beklenmedik sürprizlere yer bırakmayız.',
  },
  {
    icon: FaUsers,
    title: 'İnsan Odağı',
    description: 'Ekiplerin yeni süreçlere uyumunu kolaylaştırmak için değişim yönetimi kurgular, eğitimlerle destekleriz.',
  },
  {
    icon: FaHandshake,
    title: 'Ortak Başarı',
    description: 'Kendimizi dış kaynak ekip değil, aynı hedefe koşan takım arkadaşı olarak konumlarız.',
  },
  {
    icon: FaRocket,
    title: 'Sürekli İyileştirme',
    description: 'Canlıya geçiş sonrası da performansı takip eder, veriyle konuşan öneriler sunmayı sürdürürüz.',
  },
];

const milestones = [
  { year: '2005', title: 'İlk Kurumsal Proje', description: 'Büyük ölçekli şirket için uçtan uca dijital dönüşüm programı' },
  { year: '2014', title: 'Ekosistem Modeli', description: 'Alan uzmanlarından oluşan “Güven Mührü” iş ortaklığı ağı' },
  { year: '2019', title: 'Work365', description: 'Teknoloji ve danışmanlığı tek platformda birleştiren modelin lansmanı' },
  { year: '2024', title: '360° Platform', description: 'KOBİ ve girişimlere özel self-servis panellerle ölçeklenebilir yapı' },
];

const cultureHighlights = [
  { title: 'Çapraz Disiplinli Ekipler', detail: 'Strateji, teknoloji, finans ve hukuk ekipleri aynı masada çalışır.' },
  { title: 'Haftalık Şeffaflık', detail: 'Sprint raporları ve canlı KPI panelleriyle herkes aynı sayfada kalır.' },
  { title: 'Kurucu ile Erişim', detail: 'Kritik karar anlarında kurucu ekip bizzat sürece dahil olur.' },
];

export default function Hakkimizda() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] text-white py-24 pt-40 overflow-hidden">
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
              Verimlilik Okyanusunda
              <span className="block text-primary-light">Güvenilir Kılavuzunuz</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Dijitalin karmaşasında net rota, güvenli seyir.
            </p>
            <Link
              to="/iletisim"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_8px_25px_rgba(121,155,56,0.3)] hover:shadow-[0_12px_35px_rgba(121,155,56,0.4)] transform hover:-translate-y-1 transition-all duration-300"
            >
              Bize Ulaşın
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                <div className="relative p-6 space-y-2">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.35em] text-xs mb-4">Work365 Felsefesi</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Misyon, vizyon ve yaklaşım aynı potada</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {missionVision.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.35em] text-xs mb-4">Değerlerimiz</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Her projeye taşıdığımız temel ilkeler</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-gray-100 p-6 shadow-lg bg-gradient-to-b from-white to-gray-50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hikayemiz Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Hikayemiz
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Work365, 20 yıllık bir tecrübenin ve sayısız başarının ardından,
                  bu birikimi daha fazla işletmeyle paylaşma arzusuyla doğdu.
                </p>
                <p>
                  Kurucumuz Taylan Portakaldalı'nın vizyonu nettir: Dijitalleşmenin bir karmaşa değil,
                  her ölçekteki işletme için muazzam bir fırsat olduğunu kanıtlamak.
                </p>
                <div className="flex items-center gap-4 mt-8">
                  <FaQuoteLeft className="w-8 h-8 text-primary flex-shrink-0" />
                  <p className="text-primary font-medium italic">
                    "Karmaşığı basitleştirerek ölçülebilir sonuç üretme tutkusu;
                    uzun soluklu, güvene dayalı ortaklık."
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-100 rounded-2xl p-8 shadow-lg">
                <img
                  src="/Kobi.webp"
                  alt="Work365 Hizmetleri"
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_#5f7d2d,_#020617)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-950"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.35em] text-xs mb-4">Yolculuğumuz</p>
            <h2 className="text-3xl md:text-4xl font-bold">Deniz fenerimiz gibi net milestones</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {milestones.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-2xl"
              >
                <p className="text-primary text-sm font-semibold mb-2">{item.year}</p>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-slate-200 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kurucumuz Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Kurucumuz
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Photo Section */}
                <div className="text-center md:text-left">
                  <img
                    src="/Taylan-Portakaldali-Piri-1.webp"
                    alt="Taylan Portakaldalı"
                    className="w-80 h-auto rounded-2xl object-cover shadow-lg mx-auto md:mx-0"
                  />
                </div>

                {/* Content Section */}
                <div className="space-y-6 text-center md:text-left">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      Kurucumuz
                    </h2>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Taylan Portakaldalı
                    </h3>
                    <p className="text-gray-700 font-semibold text-lg mb-6">
                      Kurucu & Yönetici Ortak
                    </p>
                  </div>

                  <div className="space-y-4 text-gray-700">
                    <p className="text-lg leading-relaxed">
                      20+ yıl liderlik, C-Level roller; strateji, dönüşüm, proje yönetimi,
                      teknoloji liderliği
                    </p>
                    <p className="leading-relaxed italic text-gray-600">
                      Karmaşığı basitleştirerek ölçülebilir sonuç üretme tutkusu;
                      uzun soluklu, güvene dayalı ortaklık.
                    </p>
                  </div>

                  {/* LinkedIn Button */}
                  <div className="pt-6">
                    <a
                      href="https://www.linkedin.com/in/taylanp/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                        <FaLinkedin className="w-5 h-5" />
                      </div>
                      <span>LinkedIn'de Bağlan</span>
                      <div className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kültür Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.35em] text-xs mb-4">Ekip Kültürü</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ekiplerin güvendiği çalışma biçimi</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {cultureHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-gray-100 p-6 shadow-lg bg-white"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* İş Ortaklığı Ekosistemi */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Logo Section */}
                <div className="text-center">
                  <motion.img
                    src="/piri-fav.png"
                    alt="Work365 Logo"
                    className="w-64 h-64 mx-auto"
                    animate={{
                      x: [-10, 10, -10],
                      y: [-5, 5, -5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                      İş Ortaklığı Ekosistemi
                    </h2>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Başarının Formülü: Doğru Uzmanlıkların Senfonisi
                    </h3>
                    <p className="text-gray-700 mb-6">
                      "Güven Mührü" iş ortaklığı modeli; alanının en iyileriyle orkestra şefliği yaklaşımı.
                    </p>
                  </div>

                  <div className="text-gray-700">
                    <p className="leading-relaxed">
                      Bulut/DevOps, Siber Güvenlik, ERP/CRM, Mobil, Veri & BI, Dijital Pazarlama & SEO,
                      Marka & İletişim, Hukuk & Mali Müşavirlik.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marka İsmi Hikayesi */}
      <section className="py-20 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-primary"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Adımızı, engin denizlerde rotasını asla kaybetmeyen
              <span className="block text-primary-light">usta kılavuzlardan aldık</span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Cesur keşiflerden ve yeni rotalar çizen ekiplerden ilham alarak, dijital dünyada işletmelere
              yol gösteren güvenilir kılavuzunuz olmaya devam ediyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Dijital Yolculuğunuza Başlayın
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              20 yıllık tecrübemizle işletmenizi geleceğe taşıyalım.
              Verimlilik okyanusunda güvenilir kılavuzunuz olalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/iletisim"
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_8px_25px_rgba(121,155,56,0.3)] transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Hemen İletişime Geçin
              </Link>
              <Link
                to="/kurumsal-danismanlik"
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                Hizmetlerimizi İnceleyin
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
