import { motion } from "framer-motion";

export default function LibraryHeroSection() {
  return (
    <section className="relative bg-work-navy-500 text-white py-24 pt-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Bilgi Kütüphanesi
            <span className="block text-blue-200">İşinizi Büyütün</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Rehberler, şablonlar, hesaplayıcılar ve daha fazlası. İşletmeniz için ihtiyacınız olan
            tüm kaynaklar tek yerde.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
