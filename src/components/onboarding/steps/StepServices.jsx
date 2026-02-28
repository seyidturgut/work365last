const serviceOptions = [
  {
    id: "company-setup",
    title: "Company Setup",
    description: "Kuruluş evrakları ve tescil süreçleri",
  },
  {
    id: "accounting",
    title: "Accounting",
    description: "Dijital muhasebe ve aylık raporlama",
  },
  {
    id: "bank-account",
    title: "Bank Account",
    description: "Kurumsal hesap ve ödeme altyapısı",
  },
  {
    id: "tax-advisory",
    title: "Tax Advisory",
    description: "Vergi planlama ve uyum danışmanlığı",
  },
];

export default function StepServices({ values, onToggle, error }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">İhtiyacınız olan hizmetleri seçin</h3>
        <p className="mt-2 text-slate-300">
          Birden fazla seçim yapabilirsiniz. Paket önerisi bu adımda şekillenir.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {serviceOptions.map((option) => {
          const selected = values.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => onToggle(option.id)}
              className={`rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08142b] ${selected
                  ? "border-primary/60 bg-primary/20 shadow-[0_0_0_1px_rgba(121,155,56,0.4),0_12px_24px_rgba(121,155,56,0.22)]"
                  : "border-white/15 bg-white/5 hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_14px_28px_rgba(121,155,56,0.18)]"
                }`}
              aria-label={`${option.title} hizmetini seç`}
            >
              <p className="text-base font-semibold text-white">{option.title}</p>
              <p className="mt-1 text-sm text-slate-300">{option.description}</p>
            </button>
          );
        })}
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
