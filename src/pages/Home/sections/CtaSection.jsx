import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CtaSection({ user }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6">
          Şirket kurmak veya var olan şirketini yönetmek isteyenler için eksiksiz ve özenli hizmetler
          sunuyoruz
        </h2>
        <Link
          to={user ? "/fiyatlar" : "/register"}
          className="inline-flex items-center px-8 py-4 bg-white text-work-green-500 font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Hemen Başlayın
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </motion.section>
  );
}
