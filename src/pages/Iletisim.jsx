import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp } from "react-icons/fa";

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: "Adres",
    content: "Adalet Mah. Manas Blv. Folkart Towers B Kule No:39 Kat:25/2511 Bayraklı / İzmir 35530",
    detail: "VD: Karşıyaka • VKN: 7300759423",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100/50",
    link: "https://maps.google.com/?q=Folkart+Towers+B+Kule+Bayraklı+İzmir"
  },
  {
    icon: FaPhone,
    title: "Telefon",
    content: "+90 850 123 45 67",
    detail: "Pazartesi-Cuma 09:00-18:00",
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100/50",
    link: "tel:+908501234567"
  },
  {
    icon: FaEnvelope,
    title: "E-posta",
    content: "muhasebe@piri.tr",
    detail: "Muhasebe & faturalama iletişim adresi",
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100/50",
    link: "mailto:muhasebe@piri.tr"
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    content: "+90 532 123 45 67",
    detail: "Anında destek için",
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100/50",
    link: "https://wa.me/905321234567"
  }
];

const workingHours = [
  { day: "Pazartesi - Cuma", hours: "09:00 - 18:00", available: true },
  { day: "Cumartesi", hours: "10:00 - 16:00", available: true },
  { day: "Pazar", hours: "Kapalı", available: false }
];

export default function Iletisim() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-work-navy-500 text-white py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              İletişime Geçin
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Uzman ekibimiz size en uygun çözümleri sunmak için hazır. Projelerinizi konuşalım!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    {/* Icon with Gradient */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-3xl text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-primary transition-colors">
                      {info.title}
                    </h3>
                    
                    <p className="text-primary font-semibold mb-2 text-center text-lg group-hover:underline transition-all">
                      {info.content}
                    </p>
                    
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      {info.detail}
                    </p>
                  </div>
                  
                  {/* Decorative Element */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${info.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Size Nasıl Yardımcı Olabiliriz?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Formu doldurun, uzman ekibimiz en kısa sürede sizinle iletişime geçsin.
                  </p>
                </div>
                <ContactForm />
              </div>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaMapMarkerAlt className="text-xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    Ofis Konumumuz
                  </h3>
                </div>
                
                <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-100 group-hover:border-primary/30 transition-colors">
                  <iframe
                    title="Work365 Ofis Harita"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.945582511702!2d27.13188827578722!3d38.45461707182815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9ba266cb14d%3A0x2f2b5756fa0fe58f!2sFolkart%20Towers!5e0!3m2!1str!2str!4v1733954890000!5m2!1str!2str"
                    className="w-full h-72 border-0"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
                
                <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Ulaşım Bilgileri</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Folkart Towers, Bayraklı. İzban Salhane/Alaybey duraklarına yakın; otopark imkânı mevcuttur.
                    </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Working Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaClock className="text-xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Çalışma Saatleri
                  </h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {workingHours.map((schedule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-gray-100 hover:border-primary/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${schedule.available ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                        <span className="font-semibold text-gray-900">{schedule.day}</span>
                      </div>
                      <span className={`font-bold text-lg ${schedule.available ? 'text-green-600' : 'text-red-500'}`}>
                        {schedule.hours}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaWhatsapp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">7/24 WhatsApp Desteği</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Acil durumlar için WhatsApp hattımızdan anında ulaşabilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Hemen Başlayalım!
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Projelerinizi hayata geçirmek için gereken ilk adımı birlikte atalım. 
              Ücretsiz danışmanlık için hemen iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+908501234567"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                <FaPhone className="mr-2" />
                Hemen Arayın
              </a>
              <a
                href="https://wa.me/905321234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
