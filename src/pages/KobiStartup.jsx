import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hyperspeed from '../components/common/Hyperspeed/Hyperspeed';
import {
  FaBuilding,
  FaFileUpload,
  FaClipboardCheck,
  FaCogs,
  FaRocket,
  FaUserTie,
  FaChartLine,
  FaShieldAlt,
  FaClock,
  FaPhone,
  FaArrowRight,
  FaLightbulb,
  FaRoad,
  FaHandshake
} from 'react-icons/fa';

const services = [
  {
    icon: FaBuilding,
    title: 'Şirket Kuruluş',
    description: 'Limited şirket, anonim şirket ve şahıs şirketi kuruluş süreçlerinizi dijital platformumuzdan kolayca takip edin.',
    features: [
      'Dijital başvuru sistemi',
      'Ticaret sicil işlemleri',
      'Vergi dairesi kayıt',
      'SGK işveren kayıt'
    ],
    gradient: 'from-primary to-primary-dark',
    bgGradient: 'from-primary/5 via-primary/10 to-white',
    iconBg: 'bg-gradient-to-br from-primary to-primary-dark',
    link: '/fiyatlar',
    ctaLabel: 'Başvuruya Başla'
  },
  {
    icon: FaFileUpload,
    title: 'Belge Yükleme Talepleri',
    description: 'Tüm resmi belgelerinizi güvenli bir şekilde yükleyin ve dijital arşivde saklayın.',
    features: [
      'Güvenli dosya yükleme',
      'E-imza entegrasyonu',
      'Belge doğrulama',
      'Dijital arşiv sistemi'
    ],
    gradient: 'from-emerald-500 to-emerald-600',
    bgGradient: 'from-emerald-50 via-emerald-50/80 to-white',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    link: '/profil/detay?tab=document-requests',
    ctaLabel: 'Talebi Görüntüle'
  },
  {
    icon: FaClipboardCheck,
    title: 'Başvuru Takibi',
    description: 'Şirket kuruluş başvurularınızın durumunu anlık olarak takip edin ve bilgilendirilmeler alın.',
    features: [
      'Anlık durum güncellemeleri',
      'SMS/E-posta bildirimleri',
      'Süreç takip paneli',
      'Dokümantasyon desteği'
    ],
    gradient: 'from-primary-dark to-primary',
    bgGradient: 'from-primary/5 via-primary/10 to-white',
    iconBg: 'bg-gradient-to-br from-primary to-primary-dark',
    link: null
  },
  {
    icon: FaCogs,
    title: 'Ek Hizmetler',
    description: 'Şirket kuruluş sonrası ihtiyaç duyacağınız tüm hizmetleri tek platformdan alın.',
    features: [
      'Muhasebe hizmetleri',
      'Bordro sistemi',
      'SGK işlemleri',
      'Yasal uyumluluk'
    ],
    gradient: 'from-primary to-primary-light',
    bgGradient: 'from-primary/5 via-primary/10 to-white',
    iconBg: 'bg-gradient-to-br from-primary to-primary-light',
    link: '/hizmet-basvuru',
    ctaLabel: 'Başvuruya Başla'
  }
];

const advantages = [
  {
    icon: FaRocket,
    title: 'Hızlı İşlem',
    description: 'Geleneksel yöntemlere göre %70 daha hızlı şirket kuruluş süreci'
  },
  {
    icon: FaShieldAlt,
    title: 'Güvenli Platform',
    description: 'SSL sertifikası ve 256-bit şifreleme ile maksimum güvenlik'
  },
  {
    icon: FaClock,
    title: '7/24 Erişim',
    description: 'İstediğiniz zaman, istediğiniz yerden başvuru ve takip imkanı'
  },
  {
    icon: FaUserTie,
    title: 'Uzman Desteği',
    description: 'Alanında uzman ekibimizden kesintisiz destek ve danışmanlık'
  }
];

const growthHighlights = [
  {
    label: 'Kuruluş Süresi',
    value: '12 Gün',
    detail: 'Ortalama şirket açılış süremiz',
    gradient: 'from-primary/10 via-primary/5 to-transparent'
  },
  {
    label: 'Yatırım Hazırlığı',
    value: '%68',
    detail: 'Pitch deck & finans dokümanları hazır müşteriler',
    gradient: 'from-violet-500/10 via-purple-500/5 to-transparent'
  },
  {
    label: 'Operasyonel Tasarruf',
    value: '%45',
    detail: 'Otomasyondan gelen ortalama verimlilik',
    gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent'
  }
];

const roadmapSteps = [
  {
    title: 'Hızlı Ön Değerlendirme',
    description: 'Şirket türü, sektör ve hedeflerinize göre 24 saat içinde kişiselleştirilmiş yol haritası çıkarırız.',
    icon: FaLightbulb,
    status: 'Gün 1'
  },
  {
    title: 'Dijital Başvuru & Belgeler',
    description: 'Belgeleri güvenli portal üzerinden yükleyin, eksik evrak takibini otomatik bildirimlerle yürütün.',
    icon: FaFileUpload,
    status: 'Gün 2-5'
  },
  {
    title: 'Kuruluş & Onay',
    description: 'Vergi dairesi, sicil müdürlüğü ve noterdeki süreçleri sizin adınıza koordine ederiz.',
    icon: FaRoad,
    status: 'Gün 6-10'
  },
  {
    title: 'Büyüme Modülleri',
    description: 'Muhasebe, İK, ödeme ve e-belge servislerini tek panelden aktif ederek operasyonu ölçeklersiniz.',
    icon: FaCogs,
    status: 'Sürekli'
  }
];

export default function KobiStartup() {
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
              KOBİ & <span className="text-primary-light">Start-up</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Şirket kuruluşundan büyümeye kadar tüm süreçlerinizi dijitalleştirin.
              Hızlı, güvenli ve kolay çözümlerle işinizi büyütün.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_8px_25px_rgba(121,155,56,0.3)] transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Hemen Başla
              </Link>
              <Link
                to="/iletisim"
                className="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#0F172A] hover:border-white transition-all duration-300"
              >
                Uzman Desteği
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Alternating Layout */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Kapsamlı <span className="text-primary">Çözümler</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Şirketinizin yaşam döngüsü boyunca ihtiyaç duyduğu tüm operasyonel ve
              stratejik hizmetleri tek bir çatı altında birleştiriyoruz.
            </p>
          </motion.div>

          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}
              >
                {/* Image Element */}
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-gradient-to-tr ${service.gradient} opacity-20 blur-2xl rounded-[40px] group-hover:opacity-30 transition-opacity duration-500`}></div>
                    <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 aspect-video">
                      <img
                        src={
                          index === 0 ? "/images/kobi/formation.png" :
                            index === 1 ? "/images/kobi/docs.png" :
                              index === 2 ? "/images/kobi/tracking.png" :
                                "/images/kobi/growth.png"
                        }
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Content Element */}
                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center text-white shadow-lg mb-6`}>
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {service.link && (
                    <div className="pt-4">
                      <Link
                        to={service.link}
                        className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-primary transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-primary/30"
                      >
                        {service.ctaLabel || 'Hizmeti İncele'}
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Metrics - Visual Refinement */}
      <section className="py-32 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-primary-light font-bold uppercase tracking-[0.25em] text-xs mb-4">Verilerle Gücümüz</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Performans Göstergelerimiz</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {growthHighlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group p-10 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 text-center"
              >
                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <div className="relative inline-block">
                    <p className="text-6xl font-black text-primary-light mb-2">{item.value}</p>
                    <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <p className="text-slate-300 font-medium leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section - Premium Cards */}
      <section className="py-32 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Neden <span className="text-primary">Work365?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Teknoloji odaklı yaklaşımımız ve uzman kadromuzla işinizi bir adım öne taşıyoruz.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-10 rounded-[35px] bg-white border border-gray-100 hover:border-primary transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                  <advantage.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm font-medium">
                  {advantage.description}
                </p>
                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-10 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <advantage.icon className="w-12 h-12 text-primary/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/80 text-lg">Başarılı Şirket Kuruluşu</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-white/80 text-lg">Müşteri Memnuniyeti</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-white/80 text-lg">Kesintisiz Destek</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-primary font-bold uppercase tracking-[0.35em] text-xs mb-4">KOBİ Büyüme Yolculuğu</p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">4 Adımda Ölçeklenin</h2>
            <p className="text-gray-600 text-lg leading-relaxed">Analizden canlıya kadar tüm süreçleri uçtan uca planlıyor, her faz için uzman ekiplerle yanınızda duruyoruz.</p>
          </div>

          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary to-primary/30 w-full shadow-[0_0_15px_rgba(121,155,56,0.3)]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {roadmapSteps.map((step, index) => (
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
                      <div className="w-24 h-24 rounded-[32px] bg-white shadow-xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-gray-100">
                        <step.icon className="w-10 h-10" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-black shadow-lg">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex flex-col items-center lg:items-start">
                        <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1">{step.status}</span>
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors">{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
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
              Hayalinizdeki Şirketi Kurun
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Dijital platformumuz ile şirket kuruluş sürecinizi hızlandırın ve
              işinizi büyütmeye odaklanın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg"
              >
                Ücretsiz Başla
              </Link>
              <Link
                to="/iletisim"
                className="flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaPhone className="w-5 h-5" />
                Hemen Ara
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
