import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function LibraryCtaSection() {
  return (
    <section className="py-16 bg-work-navy-500 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Aradığınızı Bulamadınız mı?</h2>
          <p className="text-xl text-blue-100 mb-8">
            İhtiyacınız olan kaynak için bizimle iletişime geçin. Ekibimiz size yardımcı olmaktan
            mutluluk duyar.
          </p>
          <Link
            to="/iletisim"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            İletişime Geç
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
