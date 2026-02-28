import { motion } from "framer-motion";

const highlights = [
  { label: "İade Yanıt Süresi", value: "3 İş Günü", detail: "Talebinizin incelenme süresi" },
  { label: "Geri Ödeme", value: "10-14 Gün", detail: "Onay sonrası ödeme yönteminize göre" },
  { label: "İade Penceresi", value: "14 Gün", detail: "Satın alma tarihinden itibaren" },
];

const steps = [
  "İade talebinizi sipariş numarasıyla destek ekibimize iletin.",
  "Talebiniz hizmetin durumuna göre doğrulanır.",
  "Onaylanan iadeler için geri ödeme süreci başlatılır.",
  "Ödeme yönteminize göre tutar tarafınıza aktarılır.",
];

const accordion = [
  {
    title: "İade Hakkı",
    content: [
      "Dijital içerikler için iade hakkı, hizmetin ifasına başlanmadan önce geçerlidir.",
      "İade başvuruları satın alma tarihinden itibaren 14 gün içinde yapılmalıdır.",
      "Hizmet kullanılmaya başlanmışsa iade hakkı ortadan kalkar.",
    ],
  },
  {
    title: "İade Edilemeyen Durumlar",
    content: [
      "Belge yükleme veya resmi işlemler başlatıldıysa iade yapılamaz.",
      "Kişiye özel hazırlanan hizmetlerin tamamlanması sonrası iade hakkı bulunmaz.",
      "14 günlük yasal süre dolmuşsa iade talebi reddedilir.",
    ],
  },
  {
    title: "Geri Ödeme Yöntemleri",
    content: [
      "Kredi/banka kartı ödemeleri aynı karta iade edilir.",
      "Havale/EFT ile yapılan ödemelerde aynı IBAN'a transfer gerçekleştirilir.",
      "Kampanya veya paket alımlarda kullanılmayan hizmetler oransal olarak iade edilir.",
    ],
  },
];

export default function IadePolitikasi() {
  return (
    <div className="bg-white">
      <section className="relative pt-28 pb-16 bg-work-navy-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.4),transparent_55%)]"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.35),transparent_55%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold">
            İade Politikası
          </motion.h1>
          <p className="text-blue-100 mt-3 max-w-3xl">
            Satın aldığınız dijital hizmetlerde iade süreçlerini şeffaf, hızlı ve mevzuata uygun şekilde yürütüyoruz.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white to-blue-50/40">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold">{item.label}</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{item.value}</p>
                <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6 max-w-4xl space-y-12">
          <div className="bg-white rounded-3xl border shadow-lg p-6 md:p-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">İade Süreci Nasıl İşler?</h2>
              <p className="text-text-light">
                Tüm iade talepleri tüketici mevzuatı, Mesafeli Satış Sözleşmeleri Yönetmeliği ve platformumuzun iç süreçleri doğrultusunda değerlendirilir. Hizmetin ifasına başlanıp başlanmadığı, yüklenen belgeler ve resmi başvuru durumları kontrol edilir.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">İade İçin Gereken Şartlar</h3>
                <ul className="list-disc pl-5 space-y-2 text-text-light">
                  <li>Hizmetin ifasına başlanmamış olması</li>
                  <li>Satın alma tarihinden itibaren 14 gün içinde talep iletilmesi</li>
                  <li>Resmi sürecin veya özel hizmetlerin başlatılmamış olması</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5">
                <h3 className="text-lg font-semibold text-amber-900 mb-3">İade Edilemeyen Durumlar</h3>
                <ul className="list-disc pl-5 space-y-2 text-text-light">
                  <li>Belgelerin yüklenmesi ve başvurunun işleme alınması</li>
                  <li>Özel olarak hazırlanmış danışmanlık paketleri</li>
                  <li>Yasal ya da finansal süreçleri tetikleyen işlemler</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-blue-50/40 border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Adım Adım İade</h3>
              <ol className="list-decimal pl-5 space-y-2 text-text-light">
                {steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Sık Sorulan Başlıklar</h3>
              <div className="space-y-3">
                {accordion.map((item, idx) => (
                  <details key={idx} className="group border border-gray-100 rounded-2xl bg-white">
                    <summary className="flex items-center justify_between p-4 cursor-pointer">
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
              <p className="text-sm uppercase tracking-[0.4em] text-blue-200">Destek</p>
              <h3 className="text-2xl font-bold mt-2">İadeniz İçin Yardıma mı İhtiyacınız Var?</h3>
              <p className="text-blue-100 mt-2 max-w-xl">
                Tüm taleplerinizi 3 iş günü içerisinde yanıtlıyor, gerekli durumlarda sizi bilgilendiriyoruz. İade formu veya destek hattımız üzerinden bize ulaşabilirsiniz.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:support@work365.com"
                className="px-6 py-3 rounded-2xl bg-white text-primary font-semibold text-center shadow"
              >
                support@work365.com
              </a>
              <a
                href="/iletisim"
                className="px-6 py-3 rounded-2xl border border-white/40 text-white text-center"
              >
                İletişim Formu
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}