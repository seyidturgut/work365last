import { FaInfoCircle, FaSearch } from "react-icons/fa";

export default function StepJurisdiction({
  value,
  search,
  countries,
  onSearch,
  onChange,
  error,
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-2xl font-bold text-white">Kurulum lokasyonu</h3>
        <span className="group relative inline-flex items-center text-slate-300">
          <button
            type="button"
            aria-label="Lokasyon bilgisi"
            className="rounded-full p-1 text-slate-300 transition hover:text-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08142b]"
          >
            <FaInfoCircle className="text-sm" />
          </button>
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 scale-[0.98] rounded-lg border border-white/20 bg-slate-900/95 px-3 py-2 text-xs text-slate-200 opacity-0 transition duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100">
            Seçilen ülke; vergi çerçevesi, belge gereksinimleri ve ortalama süreç süresini etkiler.
          </span>
        </span>
      </div>

      <p className="text-slate-300">
        Ülke araması yaparak ilerleyin. İsterseniz sonraki adımda bu seçimi düzenleyebilirsiniz.
      </p>

      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Ülke ara..."
          className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/30 focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_0_3px_rgba(121,155,56,0.22)]"
          aria-label="Ülke ara"
        />
      </div>

      <div className="max-h-64 overflow-auto rounded-2xl border border-white/15 bg-slate-950/35 p-2">
        {countries.length ? (
          countries.map((country) => {
            const selected = value === country;
            return (
              <button
                key={country}
                onClick={() => onChange(country)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition hover:-translate-y-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08142b] ${selected
                    ? "bg-primary/20 text-white"
                    : "text-slate-200 hover:bg-white/10"
                  }`}
                aria-label={`${country} ülkesini seç`}
              >
                <span>{country}</span>
                {selected ? <span className="text-xs font-semibold">Seçildi</span> : null}
              </button>
            );
          })
        ) : (
          <p className="px-3 py-4 text-sm text-slate-300">Sonuç bulunamadı.</p>
        )}
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
