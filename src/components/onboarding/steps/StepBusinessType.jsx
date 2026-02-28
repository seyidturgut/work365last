const businessOptions = [
  {
    id: "sole",
    title: "Sole",
    subtitle: "Bireysel ve hızlı başlangıç modeli",
  },
  {
    id: "llc",
    title: "LLC",
    subtitle: "Ekipli operasyon için dengeli yapı",
  },
  {
    id: "global",
    title: "Global",
    subtitle: "Uluslararası büyüme odaklı kurulum",
  },
];

export default function StepBusinessType({ value, onChange, error }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">İşletme tipinizi seçin</h3>
        <p className="mt-2 text-slate-300">
          Size özel onboarding akışını bu seçime göre kişiselleştiriyoruz.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {businessOptions.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08142b] ${selected
                  ? "border-primary/60 bg-primary/20 shadow-[0_0_0_1px_rgba(121,155,56,0.4),0_12px_24px_rgba(121,155,56,0.22)]"
                  : "border-white/15 bg-white/5 hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_14px_28px_rgba(121,155,56,0.18)]"
                }`}
              aria-label={`Business type ${option.title} seç`}
            >
              <p className="text-lg font-semibold text-white">{option.title}</p>
              <p className="mt-1 text-sm text-slate-300">{option.subtitle}</p>
            </button>
          );
        })}
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
