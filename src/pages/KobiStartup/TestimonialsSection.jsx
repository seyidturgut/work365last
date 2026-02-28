import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    quote:
      'Üç ortaklı startupımızı birkaç hafta içinde şirkete dönüştürdük. Sürecin her adımını panelden takip edebilmek, özellikle ilk kez şirket kuran biri için büyük güven verdi.',
    name: 'Deniz Aksoy',
    role: 'Kurucu Ortak, Loopware'
  },
  {
    quote:
      'Yatırım öncesi sözleşmeler, cap table ve resmi başvurular tek çatı altında toparlanınca, ekibin odağını tekrar ürüne ve büyümeye çevirebildik.',
    name: 'İlayda Güneş',
    role: 'CEO, NovaCraft'
  },
  {
    quote:
      'Kuruluş sonrası bordro, SGK ve faturalama adımlarını da buraya taşıyınca, farklı araçlar yerine tek bir panelden rapor alabilir hale geldik.',
    name: 'Kaan Demirer',
    role: 'COO, ScaleUp Studio'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_#799b38,_#020617)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-950"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary font-semibold uppercase tracking-[0.4em] text-sm">Kurucu Hikayeleri</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Ekosistemin Güvendiği Platform</h2>
          <p className="text-slate-300 text-lg">
            Girişimlerden aile şirketlerine kadar yüzlerce ekip; kuruluş sürecini hızlandırmak için Work365'i tercih ediyor.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-2xl flex flex-col h-full"
            >
              <FaQuoteLeft className="w-8 h-8 text-primary mb-4" />
              <p className="text-slate-100 leading-relaxed mb-6 flex-1">&ldquo;{item.quote}&rdquo;</p>
              <div>
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-primary/80 text-sm">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
