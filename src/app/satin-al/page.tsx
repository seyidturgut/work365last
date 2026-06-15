"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import { getCatalogProduct, formatKurus } from "@/lib/catalog";
import { Loader2, ShieldCheck, AlertTriangle, ArrowRight, Repeat, Lock, Pencil } from "lucide-react";

type CheckoutResponse = {
  ok?: boolean;
  iframeUrl?: string;
  error?: string;
};

const TR_CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya",
  "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik",
  "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep",
  "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir",
  "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kırıkkale",
  "Kırklareli", "Kırşehir", "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa",
  "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize",
  "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak",
];

function SatinAlInner() {
  const router = useRouter();
  const params = useSearchParams();
  const sku = params.get("sku") ?? "";
  const product = getCatalogProduct(sku);
  const isRecurring = product?.term === "monthly";

  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const checkedRef = useRef(false);

  const [form, setForm] = useState({
    name: "",
    tckn: "",
    address: "",
    city: "",
    phone: "",
  });
  const [approved, setApproved] = useState(false);

  const locked = Boolean(iframeUrl);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;
    (async () => {
      if (!product) {
        setError("Geçersiz veya bulunamayan ürün.");
        setPhase("error");
        return;
      }
      const res = await fetch("/api/auth/session", { cache: "no-store" });
      const data = (await res.json()) as { user: { fullName?: string; phone?: string } | null };
      if (!data.user) {
        router.replace(`/kayit-ol?mode=signup&next=${encodeURIComponent(`/satin-al?sku=${sku}`)}`);
        return;
      }
      setForm((f) => ({ ...f, name: data.user?.fullName ?? "", phone: data.user?.phone ?? "" }));
      setPhase("ready");
    })();
  }, [product, router, sku]);

  const set = (k: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [k]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku,
          billing: { type: "individual", ...form },
          consents: { mesafeli: approved, onBilgi: approved, abonelik: approved },
        }),
      });
      const data = (await res.json()) as CheckoutResponse;
      if (!res.ok || !data.iframeUrl) {
        setError(data.error || "Ödeme başlatılamadı.");
        setSubmitting(false);
        return;
      }
      setIframeUrl(data.iframeUrl);
      setSubmitting(false);
    } catch {
      setError("Beklenmeyen bir hata oluştu.");
      setSubmitting(false);
    }
  };

  if (phase === "loading") {
    return (
      <div className="flex items-center gap-3 rounded-[20px] bg-white p-8 text-[15px] text-[#475569] shadow-sm ring-1 ring-black/6">
        <Loader2 className="h-5 w-5 animate-spin text-[#1b98d5]" /> Hazırlanıyor…
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="rounded-[20px] bg-white p-8 shadow-sm ring-1 ring-black/6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-[#DC2626]" />
          <div>
            <p className="text-[16px] font-bold text-[#0F172A]">İşlem başlatılamadı</p>
            <p className="mt-2 text-[14px] leading-6 text-[#475569]">{error}</p>
            <Link href="/sirketini-kur" className="mt-5 inline-flex rounded-full bg-[#1b98d5] px-6 py-3 text-[14px] font-bold text-white hover:bg-[#1580b3]">
              Paketlere Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1fr_340px]">
      {/* SOL: Fatura + Ödeme (tek onay) */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fatura Bilgileri */}
        <div className={`rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-black/6 ${locked ? "opacity-70" : ""}`}>
          <h2 className="text-[15px] font-bold text-[#0F172A]">Fatura Bilgileri</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="Ad Soyad" value={form.name} onChange={set("name")} disabled={locked} />
            <Field label="Telefon" value={form.phone} onChange={set("phone")} inputMode="tel" disabled={locked} />
            <Field label="TC Kimlik No" value={form.tckn} onChange={set("tckn")} inputMode="numeric" maxLength={11} disabled={locked} />
            <Field label="Şehir" value={form.city} onChange={set("city")} options={TR_CITIES} disabled={locked} />
            <Field label="Adres" value={form.address} onChange={set("address")} full textarea placeholder="Mahalle, sokak, no, daire…" disabled={locked} />
          </div>
        </div>

        {/* Ödeme — onay + kart aynı kartta */}
        <div className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-black/6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[15px] font-bold text-[#0F172A]">
              <Lock className="h-4 w-4 text-[#1b98d5]" /> Ödeme
            </h2>
            {locked && (
              <button
                type="button"
                onClick={() => {
                  setIframeUrl(null);
                  setError(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-[12px] font-bold text-[#475569] hover:bg-black/5"
              >
                <Pencil className="h-3.5 w-3.5" /> Düzenle
              </button>
            )}
          </div>

          {error && <p className="mt-3 text-[13px] font-medium text-[#DC2626]">{error}</p>}

          {!iframeUrl ? (
            <>
              {/* TEK onay satırı */}
              <label className="mt-3 flex items-start gap-2.5 text-[13px] leading-6 text-[#475569]">
                <input
                  type="checkbox"
                  checked={approved}
                  onChange={(e) => setApproved(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#C7D2DA] text-[#1B98D5] focus:ring-[#1B98D5]"
                />
                <span>
                  <Link href="/sozlesmeler/mesafeli-satis" target="_blank" className="font-semibold text-[#1B98D5] underline">
                    Mesafeli Satış Sözleşmesi
                  </Link>{" "}
                  ve{" "}
                  <Link href="/sozlesmeler/on-bilgilendirme" target="_blank" className="font-semibold text-[#1B98D5] underline">
                    Ön Bilgilendirme Formu
                  </Link>
                  {isRecurring ? " ile aylık otomatik yenileme koşullarını" : "'nu"} okudum, onaylıyorum.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1b98d5] py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#1580b3] disabled:opacity-60"
              >
                {submitting ? "Hazırlanıyor…" : `${formatKurus(product?.priceKurus ?? 0)} Öde`}{" "}
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="mt-3">
              <iframe
                src={iframeUrl}
                id="paytriframe"
                frameBorder={0}
                scrolling="no"
                style={{ width: "100%", minHeight: 560 }}
                title="PayTR Ödeme"
              />
              <Script
                src="https://www.paytr.com/js/iframeResizer.min.js"
                strategy="afterInteractive"
                onLoad={() => {
                  // @ts-expect-error iFrameResize PayTR script tarafından global sağlanır
                  if (typeof window.iFrameResize === "function") {
                    // @ts-expect-error global
                    window.iFrameResize({}, "#paytriframe");
                  }
                }}
              />
            </div>
          )}
        </div>
      </form>

      {/* SAĞ: Sipariş Özeti */}
      <div className="sticky top-[110px] h-fit rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-black/6">
        <h2 className="text-[15px] font-bold text-[#0F172A]">Sipariş Özeti</h2>
        <div className="mt-3 rounded-[14px] bg-[#F8FAFC] p-3.5">
          <p className="text-[14px] font-bold text-[#0F172A]">{product?.title}</p>
          <p className="mt-0.5 text-[12px] text-[#64748B]">{product?.subtitle}</p>
        </div>
        <div className="mt-3 flex items-center justify-between text-[16px] font-extrabold text-[#0F172A]">
          <span>Tutar</span>
          <span>{formatKurus(product?.priceKurus ?? 0)}</span>
        </div>
        {isRecurring && (
          <div className="mt-3 flex items-start gap-2 rounded-[12px] bg-[#EFF6FF] p-2.5 text-[11px] leading-4 text-[#1e40af]">
            <Repeat className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>Aylık abonelik — 1 ay sonra her ay otomatik yenilenir, istediğin zaman iptal edilir.</span>
          </div>
        )}
        <p className="mt-2.5 text-[11px] text-[#94A3B8]">Tüm tutarlara KDV dahildir / yansıtılır.</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  full,
  inputMode,
  maxLength,
  disabled,
  options,
  textarea,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  full?: boolean;
  inputMode?: "numeric" | "tel" | "text";
  maxLength?: number;
  disabled?: boolean;
  options?: readonly string[];
  textarea?: boolean;
  placeholder?: string;
}) {
  const base =
    "w-full rounded-[12px] border border-[#D7DFE8] bg-white px-3.5 py-2.5 text-[14px] text-[#0F172A] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(27,152,213,0.12)] disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:text-[#94A3B8]";
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-[12px] font-semibold text-[#334155]">{label}</span>
      {options ? (
        <select value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} className={base}>
          <option value="">Şehir seçin</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          value={value}
          rows={2}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} resize-none placeholder:text-[#9CA3AF]`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputMode={inputMode}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          className={`${base} placeholder:text-[#9CA3AF]`}
        />
      )}
    </label>
  );
}

export default function SatinAlPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFC] pt-[92px]">
      <Header />
      <section className="px-6 py-10">
        <div className="mx-auto max-w-[960px]">
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-[#1b98d5]" />
            <h1 className="text-[24px] font-extrabold tracking-[-0.03em] text-[#0F172A] md:text-[28px]">
              Satın Al
            </h1>
          </div>
          <Suspense fallback={<div className="text-[#64748B]">Yükleniyor…</div>}>
            <SatinAlInner />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
