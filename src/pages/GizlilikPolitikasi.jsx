import { motion } from "framer-motion";

const highlightCards = [
  { label: "Veri Talep Yanıtı", value: "30 Gün", detail: "KVKK m.13 gereği azami süre" },
  { label: "Yedekleme", value: "Günlük", detail: "Şifreli saklama & erişim kontrolü" },
  { label: "Politika İncelemesi", value: "Yılda 2+", detail: "Periyodik revizyon & denetim" },
];

const dataCategories = [
  { title: "Kimlik & İletişim", items: ["Ad-soyad, TCKN (opsiyonel)", "E-posta, telefon, adres"] },
  { title: "Hesap & İşlem", items: ["Oturum kayıtları, tercihler", "Sipariş/faturalama verileri"] },
  { title: "Teknik", items: ["IP, cihaz/çerez verileri", "Tarayıcı ve hata logları"] },
];

const faqItems = [
  {
    title: "Veriler hangi hukuki sebeplerle işleniyor?",
    content: [
      "Sözleşmenin kurulması ve ifası (KVKK m.5/2-c)",
      "Hukuki yükümlülüklerin yerine getirilmesi (m.5/2-ç)",
      "Meşru menfaat kapsamında güvenlik/iyileştirme (m.5/2-f)",
      "Açık rıza gereken hallerde pazarlama/analitik faaliyetleri (m.5/1)",
    ],
  },
  {
    title: "Veri aktarımı kimlere yapılabilir?",
    content: [
      "Barındırma, CRM, ödeme ve destek sağlayıcıları",
      "İş ortakları ve danışmanlar",
      "Yetkili kamu kurumları",
      "Yurt dışı aktarımlarda KVKK m.9 kapsamındaki güvence mekanizmaları sağlanır",
    ],
  },
  {
    title: "Haklarımı nasıl kullanırım?",
    content: [
      "KVKK m.11 kapsamındaki bilgi talebi, düzeltme, silme, itiraz ve rıza geri çekme hakları",
      "Başvurularınızı iletişim kanallarımız üzerinden ilettiğinizde 30 gün içinde yanıtlanır",
    ],
  },
];

export default function GizlilikPolitikasi() {
  return (
    <div className="bg-white">
      <section className="relative pt-28 pb-16 bg-work-navy-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.45),transparent_55%)]" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_15%,rgba(6,182,212,0.35),transparent_55%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold">
            Gizlilik Politikası
          </motion.h1>
          <p className="text-blue-100 mt-3 max-w-3xl">
            Kişisel verilerinizi KVKK ve küresel veri koruma standartlarına uygun şekilde işler; şeffaflık, güvenlik ve minimizasyon prensiplerini benimseriz.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {highlightCards.map((card) => (
              <div key={card.label} className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold">{card.label}</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{card.value}</p>
                <p className="text-sm text-gray-500 mt-1">{card.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6 max-w-5xl space-y-12">
          <div className="bg-white rounded-3xl border shadow-lg p-6 md:p-10 space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Veri Sorumlusu & Temel İlkeler</h2>
              <p className="text-text-light">
                Platformumuz veri sorumlusu sıfatıyla KVKK m.4'teki ilkelere bağlıdır: hukuka uygunluk, doğruluk/güncellik, belirli-açık-meşru amaç, sınırlı saklama ve veri minimizasyonu.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {dataCategories.map((category) => (
                <div key={category.title} className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">{category.title}</h3>
                  <ul className="list-disc pl-4 text-sm text-text-light space-y-1">
                    {category.items.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-white to-blue-50/40 border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hukuki Dayanaklar</h3>
              <p className="text-text-light">
                Veriler; sözleşmenin ifası, hukuki yükümlülükler, meşru menfaatler ve açık rıza gereksinimleri doğrultusunda işlenir. Pazarlama amaçlı iletişimler için verdiğiniz rızayı dilediğiniz an yönetebilirsiniz.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Veri Aktarımları & Saklama</h3>
              <p className="text-text-light">
                Veriler yalnızca hizmet sağlayıcılarımız (barındırma, CRM, ödeme, destek), iş ortakları ve yetkili kamu kurumlarıyla, amaçla sınırlı olarak paylaşılır. Yurt dışı aktarımlarda KVKK m.9 kapsamındaki güvence mekanizmaları uygulanır. Veriler, ilgili mevzuat ve zamanaşımı süreleri dikkate alınarak saklanır; süre dolduğunda periyodik imha politikamıza göre silinir veya anonimleştirilir.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Sık Sorulan Başlıklar</h3>
              <div className="space-y-3">
                {faqItems.map((item, idx) => (
                  <details key={idx} className="group border border-gray-100 rounded-2xl bg-white">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <span className="text-base font-semibold text-gray-900">{item.title}</span>
                      <motion.span className="text-primary">⌄</motion.span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-text-light">
                      <ul className="list-disc pl-5 space-y-1">
                        {item.content.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xl">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-blue-200">KVKK Başvuruları</p>
              <h3 className="text-2xl font-bold mt-2">Veri Sahibi Taleplerinizi Ciddiye Alıyoruz</h3>
              <p className="text-blue-100 mt-2 max-w-xl">
                Haklarınızı kullanmak, bilgi talep etmek veya itirazda bulunmak için kvkk@work365.com adresine ya da iletişim formumuza başvurabilirsiniz. Talepleriniz en geç 30 gün içinde yanıtlanır.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a href="mailto:kvkk@work365.com" className="px-6 py-3 rounded-2xl bg-white text-primary font-semibold text-center shadow">
                kvkk@work365.com
              </a>
              <a href="/veri-sahibi-basvuru-formu" className="px-6 py-3 rounded-2xl border border-white/40 text-white text-center">
                Veri Sahibi Başvuru Formu
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
