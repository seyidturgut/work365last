const defaultLogos = [
  "Northlane",
  "Arcflow",
  "Ledgerly",
  "FoundersHQ",
  "Novabank",
  "ScaleOps",
  "AtlasPay",
  "Venturo",
  "SignalCloud",
  "Pivota",
];

export default function TrustStrip({ logos = defaultLogos, className = "" }) {
  return (
    <section className={`mx-auto w-full max-w-[1400px] px-6 ${className}`} aria-label="Trust strip">
      <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-5 md:px-6 md:py-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-300/85">
          Trusted by founders & teams
        </p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible">
          {logos.map((logo) => (
            <span
              key={logo}
              className="inline-flex min-w-[120px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300/80"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
