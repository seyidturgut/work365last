import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStore, FaLaptopCode, FaCamera, FaPaintBrush } from "react-icons/fa";

const customerTypes = [
  {
    icon: <FaStore />,
    title: "KOBİ'ler",
    description:
      "Küçük ve orta büyüklükteki işletmelerin ihtiyaç duyduğu tüm hizmetler. Şirket kuruluşu ve sonrasında muhasebe ve vergi çözümleri.",
    link: "/kobi-startup",
  },
  {
    icon: <FaStore />,
    title: "E-Ticaret Yapanlar",
    description:
      "E-ticaret şirketi kurmak için gereken tüm işlemleri online olarak halledin, kazancınızı yasal olarak vergilendirin.",
    link: "/kurumsal-danismanlik",
  },
  {
    icon: <FaLaptopCode />,
    title: "Yazılımcılar",
    description:
      "Yazılım şirketi kurmak için destek alın. Kuruluş süreciniz hızlıca tamamlansın, finansal süreçleriniz dijitalleşsin.",
    link: "/kobi-startup",
  },
  {
    icon: <FaCamera />,
    title: "Freelancerlar",
    description:
      "Freelance şirket kurmak istiyorsanız tüm bürokratik işlemleri sizin yerinize halleder ve yapay zeka destekli programlarla kolaylık sağlarız.",
    link: "/kobi-startup",
  },
  {
    icon: <FaPaintBrush />,
    title: "Reklamcılar",
    description:
      "Reklam ajansı kurmak istiyor fakat nasıl bir yol izleyeceğinizi bilmiyorsanız uzman ekibimizin desteğiyle işlemlerinizi hallederiz.",
    link: "/kurumsal-danismanlik",
  },
];

export default function CustomerTypesSection() {
  return (
    <section className="py-12 bg-[#070f22]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Her Sektörden Girişimcilerin İşini Kolaylaştıran Dijital Çözümler
          </h2>
          <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto">
            Faaliyet alanı ve sermayesi fark etmeksizin girişim fikirlerini hayata geçirmek isteyen
            herkese yardımcı olmaktan memnuniyet duyuyoruz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {customerTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-xl p-6 text-center hover:shadow-[0_20px_38px_rgba(96,165,250,0.24)] transition-all duration-300 cursor-pointer group"
            >
              <Link to={type.link} className="block">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-colors">
                  <div className="text-blue-100 text-2xl">{type.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{type.title}</h3>
                <p className="text-slate-200 leading-relaxed mb-4">{type.description}</p>
                <span className="inline-flex items-center text-blue-200 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
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
  );
}
