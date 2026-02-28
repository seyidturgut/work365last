const formatService = (service) => {
  switch (service) {
    case "company-setup":
      return "Company Setup";
    case "accounting":
      return "Accounting";
    case "bank-account":
      return "Bank Account";
    case "tax-advisory":
      return "Tax Advisory";
    default:
      return service;
  }
};

export default function StepReview({ data, pricePreview, onEdit }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Gözden geçir</h3>
        <p className="mt-2 text-slate-300">
          Bilgileriniz doğruysa kurulumu tamamlayıp dashboard’a geçebilirsiniz.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold text-white">Business Type</h4>
            <button
              onClick={() => onEdit(1)}
              className="text-xs font-semibold text-primary-light transition hover:text-white hover:-translate-y-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08142b]"
              aria-label="Business type bölümünü düzenle"
            >
              Düzenle
            </button>
          </div>
          <p className="text-sm text-slate-200">{data.businessType || "-"}</p>
        </article>

        <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold text-white">Jurisdiction</h4>
            <button
              onClick={() => onEdit(2)}
              className="text-xs font-semibold text-primary-light transition hover:text-white hover:-translate-y-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08142b]"
              aria-label="Jurisdiction bölümünü düzenle"
            >
              Düzenle
            </button>
          </div>
          <p className="text-sm text-slate-200">{data.jurisdiction || "-"}</p>
        </article>

        <article className="rounded-2xl border border-white/15 bg-white/5 p-4 md:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold text-white">Services Needed</h4>
            <button
              onClick={() => onEdit(3)}
              className="text-xs font-semibold text-primary-light transition hover:text-white hover:-translate-y-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08142b]"
              aria-label="Services bölümünü düzenle"
            >
              Düzenle
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.services.length ? (
              data.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-primary/35 bg-primary/15 px-3 py-1 text-xs text-white"
                >
                  {formatService(service)}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-300">Seçim yapılmadı.</p>
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-white/15 bg-white/5 p-4 md:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold text-white">Personal Details</h4>
            <button
              onClick={() => onEdit(4)}
              className="text-xs font-semibold text-primary-light transition hover:text-white hover:-translate-y-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08142b]"
              aria-label="Personal details bölümünü düzenle"
            >
              Düzenle
            </button>
          </div>
          <div className="grid gap-2 md:grid-cols-2 text-sm text-slate-200">
            <p>Ad Soyad: {data.personal.fullName || "-"}</p>
            <p>E-posta: {data.personal.email || "-"}</p>
            <p>Telefon: {data.personal.phone || "-"}</p>
            <p>Şirket: {data.personal.companyName || "-"}</p>
          </div>
        </article>
      </div>

      <article className="rounded-2xl border border-primary/35 bg-gradient-to-r from-primary/20 to-primary-dark/20 p-4">
        <h4 className="font-semibold text-white">Pricing Preview</h4>
        <div className="mt-3 grid gap-2 text-sm text-slate-100 md:grid-cols-2">
          <p>Aylık Tahmini: ${pricePreview.monthly}</p>
          <p>Yıllık Tahmini: ${pricePreview.yearly}</p>
        </div>
      </article>
    </div>
  );
}
