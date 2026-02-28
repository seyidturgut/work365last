export default function StepPersonalDetails({
  values,
  errors,
  saveStatus,
  onChange,
}) {
  const fields = [
    { id: "fullName", label: "Ad Soyad", placeholder: "Adınız Soyadınız" },
    { id: "email", label: "E-posta", placeholder: "ornek@work365.com", type: "email" },
    { id: "phone", label: "Telefon", placeholder: "+90 5xx xxx xx xx" },
    { id: "companyName", label: "Şirket Adı", placeholder: "Şirket ünvanı" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Kişisel bilgiler</h3>
          <p className="mt-2 text-slate-300">
            Form bilgileri otomatik kaydedilir. İstediğiniz zaman düzenleyebilirsiniz.
          </p>
        </div>
        <span className="text-xs font-medium text-slate-300">
          {saveStatus === "saving" ? "Kaydediliyor..." : "Taslak kaydedildi"}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.id} className="space-y-2 text-sm">
            <span className="font-semibold text-slate-200">{field.label}</span>
            <input
              type={field.type || "text"}
              value={values[field.id] || ""}
              onChange={(event) => onChange(field.id, event.target.value)}
              placeholder={field.placeholder}
              className={`w-full rounded-xl border bg-white/10 px-4 py-3 text-white placeholder:text-slate-300 transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/30 focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_0_3px_rgba(121,155,56,0.22)] ${errors[field.id]
                  ? "border-red-300/70 shadow-[0_0_0_1px_rgba(252,165,165,0.2),0_0_14px_rgba(248,113,113,0.12)]"
                  : "border-white/20"
                }`}
              aria-label={field.label}
            />
            {errors[field.id] ? (
              <span className="text-xs text-red-300">{errors[field.id]}</span>
            ) : null}
          </label>
        ))}
      </div>
    </div>
  );
}
