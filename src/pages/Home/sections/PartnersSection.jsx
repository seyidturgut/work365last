const partnerLogos = ["Logo", "Mikro", "Netsis", "Nebim", "QNB Finansbank", "Garanti BBVA"];

export default function PartnersSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-work-green-500 font-semibold uppercase tracking-[0.35em] text-xs mb-3">
            Ekosistem
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Güvendiğimiz partnerlerimiz</h2>
          <p className="text-gray-600 mt-3">
            Finans, teknoloji ve hukuk alanında lider markalarla entegre çalışıyoruz.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {partnerLogos.map((logo) => (
            <div
              key={logo}
              className="rounded-2xl border border-gray-200 bg-white py-4 px-3 text-center text-sm font-semibold text-gray-600 shadow-sm"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
