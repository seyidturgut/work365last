"use client";

import { useEffect, useState } from "react";
import { Repeat, XCircle } from "lucide-react";
import { formatKurus } from "@/lib/catalog";

type Subscription = {
  id: number;
  title: string;
  sku: string;
  amountKurus: number;
  status: string;
  nextChargeAt: string | null;
  lastChargeAt: string | null;
};

const STATUS: Record<string, { text: string; cls: string }> = {
  active: { text: "Aktif", cls: "bg-[#DCFCE7] text-[#166534]" },
  past_due: { text: "Ödeme bekliyor", cls: "bg-[#FEF9C3] text-[#854D0E]" },
  canceled: { text: "İptal edildi", cls: "bg-[#F1F5F9] text-[#475569]" },
  ended: { text: "Sona erdi", cls: "bg-[#F1F5F9] text-[#475569]" },
};

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("tr-TR", { dateStyle: "medium" });
}

export default function SubscriptionsSection() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/subscriptions", { cache: "no-store" });
      const data = (await res.json()) as { subscriptions?: Subscription[] };
      setSubs(data.subscriptions ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id: number) => {
    if (!window.confirm("Bu aboneliği iptal etmek istediğinize emin misiniz? Sonraki tahsilat yapılmaz.")) return;
    setBusyId(id);
    try {
      const res = await fetch("/api/subscriptions/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) await load();
    } finally {
      setBusyId(null);
    }
  };

  if (loading || subs.length === 0) {
    // Abonelik yoksa bölümü hiç gösterme (sade tutmak için)
    return null;
  }

  return (
    <div className="mb-10">
      <div className="mb-5 flex items-center gap-2.5">
        <Repeat className="h-6 w-6 text-[#0F172A]" />
        <h2 className="text-[20px] font-extrabold tracking-[-0.02em] text-[#0F172A]">Aboneliklerim</h2>
      </div>

      <div className="space-y-4">
        {subs.map((s) => {
          const badge = STATUS[s.status] ?? STATUS.active;
          const cancelable = s.status === "active" || s.status === "past_due";
          return (
            <div key={s.id} className="rounded-[20px] bg-white p-6 shadow-sm ring-1 ring-black/6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-[#0F172A]">{s.title}</p>
                  <p className="mt-1 text-[13px] text-[#64748B]">
                    {formatKurus(s.amountKurus)} / ay ·{" "}
                    {s.status === "canceled"
                      ? "İptal edildi"
                      : `Sonraki tahsilat: ${fmtDate(s.nextChargeAt)}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-[12px] font-bold ${badge.cls}`}>{badge.text}</span>
                  {cancelable && (
                    <button
                      type="button"
                      onClick={() => cancel(s.id)}
                      disabled={busyId === s.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#FECACA] px-3 py-1.5 text-[12px] font-bold text-[#DC2626] transition-colors hover:bg-[#FEF2F2] disabled:opacity-60"
                    >
                      <XCircle className="h-3.5 w-3.5" /> İptal et
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
