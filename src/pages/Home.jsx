import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";
import {
  FaRocket, FaUsers, FaGlobe, FaChartLine, FaShieldAlt, FaCog,
  FaBuilding, FaLaptopCode, FaPaintBrush, FaCamera, FaStore, FaStar,
  FaCheckCircle, FaChartPie, FaServer, FaBalanceScale
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Target, MapPin, Cloud, CheckCircle, BarChart2, Landmark } from "lucide-react";

const services = [
  {
    icon: <FaBuilding className="text-3xl text-primary" />,
    title: "Şirket Kuruluşu",
    description: "Türkiye'de şirket kurmak istiyorsanız kuruluş amacınıza, yönetim şeklinize ve sermayenize bağlı olarak şirket türüne karar verip hizmet almaya başlayabilirsiniz.",
    features: ["Şahıs şirketi minimum formalite ile sermayesiz kurulabilir", "Limited şirket tüzel kişi statüsüyle ortakların varlıklarını korur", "Anonim şirket büyüme potansiyeli olan girişimler için uygundur"],
    link: "/kurumsal-danismanlik",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
  },
  {
    icon: <FaGlobe className="text-3xl text-primary" />,
    title: "Sanal Ofis",
    description: "Online muhasebe ve ön muhasebe programı ile dijital süreçlerinizi yönetin.",
    features: ["Online Muhasebe", "Ön Muhasebe Programı", "Marka Tescil", "Destek ve Teşvikler"],
    link: "/kobi-startup",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
  }
];

const customerTypes = [
  {
    icon: <FaStore />,
    title: "KOBİ'ler",
    description: "Küçük ve orta büyüklükteki işletmelerin ihtiyaç duyduğu tüm hizmetler. Şirket kuruluşu ve sonrasında muhasebe ve vergi çözümleri.",
    link: "/kobi-startup"
  },
  {
    icon: <FaStore />,
    title: "E-Ticaret Yapanlar",
    description: "E-ticaret şirketi kurmak için gereken tüm işlemleri online olarak halledin, kazancınızı yasal olarak vergilendirin.",
    link: "/kurumsal-danismanlik"
  },
  {
    icon: <FaLaptopCode />,
    title: "Yazılımcılar",
    description: "Yazılım şirketi kurmak için destek alın. Kuruluş süreciniz hızlıca tamamlansın, finansal süreçleriniz dijitalleşsin.",
    link: "/kobi-startup"
  },
  {
    icon: <FaCamera />,
    title: "Freelancerlar",
    description: "Freelance şirket kurmak istiyorsanız tüm bürokratik işlemleri sizin yerinize halleder ve yapay zeka destekli programlarla kolaylık sağlarız.",
    link: "/kobi-startup"
  },
  {
    icon: <FaPaintBrush />,
    title: "Reklamcılar",
    description: "Reklam ajansı kurmak istiyor fakat nasıl bir yol izleyeceğinizi bilmiyorsanız uzman ekibimizin desteğiyle işlemlerinizi hallederiz.",
    link: "/kurumsal-danismanlik"
  }
];

const testimonials = [
  {
    name: "Umut Yaka",
    role: "Founder | Swipeline Media",
    content: "Work365 ile anonim şirket kurmuş, markamı tescil etmiş, neredeyse sundukları tüm hizmetlerden faydalanmış biri olarak, vergi ve muhasebe konularında herhangi bir hata yapmam durumunda arkamda Work365'in olduğunu biliyorum.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=160&h=160&fit=crop&crop=faces"
  },
  {
    name: "Özge Özdil & Ufuk Özdil",
    role: "Co-Founders | BabylonCutters",
    content: "Work365'in bize sağladığı en büyük avantaj, global pazarlarda bir adres, banka hesabı ve telefon numarasına sahip olabilmemiz. Kendi dilimizde hizmet alabilmek de çok değerli.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces"
  },
  {
    name: "Gülşah Gürkan",
    role: "Founder & CEO | Gülsha",
    content: "Work365 ile şirketimizi hızlı ve profesyonel bir şekilde kurduk. Girişimcilerin pek çok işle aynı anda uğraşması gerekiyor ama Work365 sayesinde işime odaklanabiliyorum.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=160&h=160&fit=crop&crop=faces"
  }
];

const impactMetrics = [
  { label: "Kurulan Şirket", value: "150+", detail: "Şahıs, limited ve anonim yapılar" },
  { label: "Süre Ortalama", value: "11 Gün", detail: "Vergi, sicil ve noter süreçleri" },
  { label: "Operasyon Tasarrufu", value: "%42", detail: "Otomasyona geçen ekipler" },
  { label: "NPS", value: "74", detail: "Kurucu memnuniyeti puanı" }
];

const processSteps = [
  {
    icon: FaCheckCircle,
    title: "Ön Analiz",
    description: "Şirket tipi, sektör ve hedefleri değerlendirip kişiselleştirilmiş plan çıkarıyoruz.",
    duration: "Gün 0-1"
  },
  {
    icon: FaChartPie,
    title: "Belge & Başvuru",
    description: "Belgeleri güvenli portala yüklüyor, tüm kurum başvurularını sizin adınıza yapıyoruz.",
    duration: "Gün 2-5"
  },
  {
    icon: FaServer,
    title: "Kuruluş & Entegrasyon",
    description: "Vergi dairesi, sicil, banka ve e-belge kurgusunu eşzamanlı yürütüyoruz.",
    duration: "Gün 6-10"
  },
  {
    icon: FaBalanceScale,
    title: "Büyüme Modülleri",
    description: "Muhasebe, İK, ödeme ve raporlama araçlarıyla operasyonu ölçekliyoruz.",
    duration: "Sürekli"
  }
];

const partnerLogos = ["Paribu", "Logo Yazılım", "Paraşüt", "Sodexo", "Paycell", "Workup"];

const formationFlow = [
  {
    label: "Kick-off",
    title: "Kurucu Brifingi & Hedef Haritası",
    description: "Sektör, ortak yapısı ve sermaye planına göre şirket tipini oturtuyoruz.",
    duration: "Gün 0",
  },
  {
    label: "Hazırlık",
    title: "Belgeler, Noter & Başvuru Paketleri",
    description: "Noter randevuları, ana sözleşme ve vergi dairesi belgeleri tek seferde hazırlanıyor.",
    duration: "Gün 1-3",
  },
  {
    label: "Kuruluş",
    title: "Vergi, Ticaret Sicil ve Banka Açılışı",
    description: "Vergi memuru ziyareti, ticaret sicil tescili ve banka hesap açılışı paralel yürüyor.",
    duration: "Gün 4-8",
  },
  {
    label: "Go-live",
    title: "E-belge, POS ve Otomasyon Entegrasyonları",
    description: "E-fatura, e-defter, sanal POS ve muhasebe otomasyonları aynı panelde aktif ediliyor.",
    duration: "Gün 9+",
  },
];

export default function Home() {
  const { user } = useAuth();

  const quickServices = [
    { icon: <Target className="w-10 h-10 text-[#1a8b5e] mb-4 stroke-[1.5]" />, label: "ŞİRKET KURULUŞU" },
    { icon: <MapPin className="w-10 h-10 text-[#1a8b5e] mb-4 stroke-[1.5]" />, label: "YASAL ADRES" },
    { icon: <Cloud className="w-10 h-10 text-[#1a8b5e] mb-4 stroke-[1.5]" />, label: "E-DÖNÜŞÜM" },
    { icon: <Landmark className="w-10 h-10 text-[#1a8b5e] mb-4 stroke-[1.5]" />, label: "MARKA TESCİL" },
    { icon: <BarChart2 className="w-10 h-10 text-[#1a8b5e] mb-4 stroke-[1.5]" />, label: "ÖN MUHASEBE" },
    { icon: <CheckCircle className="w-10 h-10 text-[#1a8b5e] mb-4 stroke-[1.5]" />, label: "KOSGEB DESTEĞİ" },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <HeroSection />

      {/* Hızlı Servisler Barı */}
      <section className="bg-white border-b border-gray-100 shadow-sm relative z-20">
        <div className="w-full">
          <div className="grid grid-cols-2 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-gray-100">
            {quickServices.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center py-12 px-4 hover:bg-gray-50 transition cursor-pointer group"
              >
                <div className="transform group-hover:scale-110 transition duration-300">
                  {item.icon}
                </div>
                <span className="text-sm font-bold text-gray-700 tracking-wider text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/5 to-transparent"></div>
                <div className="relative p-6 space-y-2">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{item.label}</p>
                  <p className="text-4xl font-bold text-gray-900">{item.value}</p>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Slider */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Mutlu Work365 Müşterileriyle Tanışın
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-4 mb-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {testimonial.name.split(' ').map(s => s[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-text-light">{testimonial.role}</div>
                  </div>
                </div>
                <blockquote className="text-text-light mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Şirket Kuruluşu Sinematik Akış */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-32 -left-20 w-80 h-80 bg-primary/40 blur-[180px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-primary/20 blur-[220px] rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-primary-light">
                Şirket Kuruluşu 2.0
              </p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Belgelerle uğraşmadan şirketinizi kurun, 10 günde operasyona başlayın.
              </h2>
              <p className="text-lg text-primary/80">
                Yapay zekâ destekli kontrol listeleri, gerçek zamanlı durum ekranı ve otomatik bildirimlerle süreci yönetiyoruz. Siz sadece iş modelinize odaklanın.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { value: "11 Gün", label: "Kuruluş Ortalaması" },
                  { value: "%97", label: "İlk Denemede Onay" },
                  { value: "24/7", label: "Kurucu Destek Hattı" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-light">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/kurumsal-danismanlik"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition"
                >
                  Kuruluş Danışmanı ile Konuş
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/profil/detay?tab=document-requests"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/30 text-white/90 hover:bg-white/10 transition"
                >
                  Süreci İzle
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-8 w-44 h-44 bg-gradient-to-br from-primary via-primary-dark to-black blur-3xl opacity-60"></div>
              <div className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 p-8 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-primary-light">CANLI DURUM</p>
                    <p className="text-2xl font-semibold">Kuruluş Sprinti</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                    Aktif
                  </span>
                </div>
                <div className="space-y-5">
                  {formationFlow.map((step, idx) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                      className={`relative rounded-2xl p-4 border ${idx === 0
                        ? "border-emerald-400/40 bg-emerald-400/10"
                        : "border-white/10 bg-white/5"
                        }`}
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] mb-2 text-primary-light">
                        <span>{step.label}</span>
                        <span>{step.duration}</span>
                      </div>
                      <p className="text-lg font-semibold">{step.title}</p>
                      <p className="text-sm text-primary/80 leading-relaxed">{step.description}</p>
                      {idx === 0 && (
                        <motion.div
                          className="absolute -top-2 -right-2 px-2 py-1 bg-white text-primary text-[11px] font-semibold rounded-full shadow"
                          animate={{ rotate: [0, 2, -2, 0] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        >
                          Şimdi
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-light">Olası teslim tarihi</p>
                    <p className="text-xl font-semibold">11 Gün</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary-light">Kurucu paneli</p>
                    <p className="text-xl font-semibold">4/4 görev tamam</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Süreç Özeti */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-primary font-semibold uppercase tracking-[0.35em] text-xs mb-4">Nasıl Çalışıyoruz</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Kuruluştan büyümeye kadar 4 adım</h2>
            <p className="text-gray-600 mt-4">Her sprint sonunda görünür çıktılar sunarak şirketinizi güvenle büyütmenizi sağlıyoruz.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-3xl border border-gray-100 p-6 shadow-lg bg-gradient-to-br from-white via-gray-50 to-white"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center text-lg font-bold shadow-lg">
                      {index + 1}
                    </div>
                    {index !== processSteps.length - 1 && (
                      <div className="flex-1 w-px bg-gradient-to-b from-primary/40 to-transparent mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                          <step.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                      </div>
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmetlerimiz Section */}
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">
              Hizmetlerimiz
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
              Şirketinizin ihtiyaç duyduğu tüm dijital ve yasal hizmetleri tek bir platformda sunuyoruz.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <FaBuilding className="text-4xl" />,
                title: "Şirket Kuruluşu",
                description: "Şahıs, Limited, Anonim ve Bilanço şirket kuruluşu hizmetleri. Profesyonel danışmanlık ile hızlı kurulum.",
                link: "/kurumsal-danismanlik",
                color: "from-primary-dark to-primary"
              },
              {
                icon: <FaRocket className="text-4xl" />,
                title: "KOBİ & Startup Çözümleri",
                description: "Girişimciler ve küçük işletmeler için özel paketler ve hızlı çözümler.",
                link: "/kobi-startup",
                color: "from-primary to-primary-light"
              },
              {
                icon: <FaChartLine className="text-4xl" />,
                title: "Online Muhasebe",
                description: "Dijital muhasebe ve ön muhasebe programları ile finansal süreçlerinizi yönetin.",
                link: "/fiyatlar",
                color: "from-primary-dark to-primary"
              },
              {
                icon: <FaGlobe className="text-4xl" />,
                title: "E-Fatura & E-Defter",
                description: "Elektronik fatura ve defter hizmetleri ile dijital dönüşümünüzü tamamlayın.",
                link: "/fiyatlar",
                color: "from-primary to-primary-light"
              },
              {
                icon: <FaShieldAlt className="text-4xl" />,
                title: "Marka Tescil",
                description: "Markanızı koruma altına alın. Marka araştırması ve tescil süreçleri.",
                link: "/fiyatlar",
                color: "from-primary-dark to-primary"
              },
              {
                icon: <FaCog className="text-4xl" />,
                title: "Sanal Ofis",
                description: "Fiziksel ofis gerektirmeden şirket adresinizi ve iletişim bilgilerinizi yönetin.",
                link: "/kobi-startup",
                color: "from-primary to-primary-light"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <Link to={service.link} className="block">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-text-light leading-relaxed mb-4">{service.description}</p>
                  <span className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all">
                    Detayları İncele
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl font-bold text-primary mb-6">
              Türkiye'deki Şirketiniz için Uçtan Uca Çözümler
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                {index % 2 === 0 ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      {service.icon}
                      <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
                    </div>
                    <p className="text-text-light text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-text-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={service.link}
                      className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
                    >
                      Detayları İncele
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Types */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">
              Her Sektörden Girişimcilerin İşini Kolaylaştıran Dijital Çözümler
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto">
              Faaliyet alanı ve sermayesi fark etmeksizin girişim fikirlerini hayata geçirmek isteyen herkese yardımcı olmaktan memnuniyet duyuyoruz.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {customerTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <Link to={type.link} className="block">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <div className="text-primary text-2xl">{type.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{type.title}</h3>
                  <p className="text-text-light leading-relaxed mb-4">{type.description}</p>
                  <span className="inline-flex items-center text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Detayları İncele
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerler */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-primary font-semibold uppercase tracking-[0.35em] text-xs mb-3">Ekosistem</p>
            <h2 className="text-3xl font-bold text-gray-900">Güvendiğimiz partnerlerimiz</h2>
            <p className="text-gray-600 mt-3">Finans, teknoloji ve hukuk alanında lider markalarla entegre çalışıyoruz.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {partnerLogos.map((logo) => (
              <div
                key={logo}
                className="rounded-2xl border border-gray-200 bg-white py-4 px-3 text-center text-sm font-semibold text-gray-600 shadow-sm"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <FaShieldAlt className="text-3xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Güvenli</h3>
              <p className="text-text-light">
                Paylaştığınız tüm bilgiler en güçlü şifreleme yöntemleriyle korunuyor.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <FaUsers className="text-3xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Profesyonel</h3>
              <p className="text-text-light">
                Ekibimizin tamamı alanlarında uzman profesyonellerden oluşuyor.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <FaGlobe className="text-3xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Global</h3>
              <p className="text-text-light">
                Türkiye'de doğdu, üyeleriyle birlikte dünyaya açıldı. 140'dan fazla ülkede hizmet veriyor.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-primary-dark to-primary text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Şirket kurmak veya var olan şirketini yönetmek isteyenler için eksiksiz ve özenli hizmetler sunuyoruz
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Girişimcilerin ve işletmelerin hayatını kolaylaştırmaya çalışan bir uygulama olarak, şirket kurarken veya yönetirken karşılaşılması muhtemel sorunlara yönelik pratik çözümler geliştiriyoruz.
          </p>
          <Link
            to={user ? "/fiyatlar" : "/register"}
            className="inline-flex items-center px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Hemen Başlayın
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}