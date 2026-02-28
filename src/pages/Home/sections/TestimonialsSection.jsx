import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ece Karaman",
    role: "Kurucu Ortak | Planet Studio",
    content:
      "Şirket kuruluşu ve muhasebe tarafında ne yapacağımızı hiç bilmiyorduk. Paneldeki adım adım yönlendirmeler ve ekipten aldığımız hızlı geri dönüşler sayesinde, 10 gün içinde satışa hazır hale geldik.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&h=160&fit=crop&crop=faces",
  },
  {
    name: "Mert Yılmaz",
    role: "Founder | Kodlab Dijital",
    content:
      "Serbest geliştirici olarak başladığım işimi şirkete dönüştürürken, tüm resmi süreçler ve belge takibini tek yerden yönetebilmek büyük konfor sağladı. Destek ekibi gerçekten işini biliyor.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=160&h=160&fit=crop&crop=faces",
  },
  {
    name: "Selin Arda",
    role: "İşletme Sahibi | Arda Creative",
    content:
      "Karmaşık muhasebe ve sözleşme süreçlerini oldukça sadeleştirdiler. Her ay raporlarımı panelden görebildiğim için, ajans tarafında hangi hizmetin ne kadar kazandırdığını net şekilde takip edebiliyorum.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 bg-[#050c1b]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Müşterilerimiz Ne Diyor?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(59,130,246,0.2)]"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} className="text-blue-300" />
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
                  <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center font-bold">
                    {testimonial.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-300">{testimonial.role}</div>
                </div>
              </div>
              <blockquote className="text-slate-200 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
