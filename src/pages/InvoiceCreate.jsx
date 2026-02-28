import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../lib/auth";
import { customerApi } from "../lib/api";

export default function InvoiceCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ number: "", date: "", amount: "", file: null });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg(""); setErr("");
    const token = getToken(); if (!token) { setErr("Giriş gerekli."); return; }
    try {
      setSaving(true);
      // Örnek gönderim: Eğer backend multipart bekliyorsa
      const fd = new FormData();
      fd.append("number", form.number);
      fd.append("date", form.date);
      fd.append("amount", form.amount);
      if (form.file) fd.append("file", form.file);
      // Örnek endpoint: /api/customer/invoices
      await customerApi.createInvoice ? customerApi.createInvoice(token, fd) : Promise.resolve();
      setMsg("Fatura eklendi.");
      setTimeout(()=> navigate("/profil/detay?tab=invoices"), 800);
    } catch (e) {
      setErr(e?.message || "Fatura eklenemedi.");
    }
    setSaving(false);
  };

  return (
    <div className="bg-white min-h-[60vh]">
      <section className="pt-28 pb-8 bg-work-navy-500 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold">Fatura Ekle</h1>
          <p className="text-blue-100 mt-2">Kesilen faturayı sisteme ekleyin (örnek form).</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-xl">
          <form onSubmit={submit} className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
            {(msg || err) && (
              <div className={`rounded-lg px-4 py-3 text-sm border ${msg? 'bg-green-50 text-green-700 border-green-200':'bg-red-50 text-red-600 border-red-200'}`}>{msg || err}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Fatura No</label>
              <input value={form.number} onChange={(e)=>setForm({...form, number: e.target.value})} className="w-full rounded-xl border-2 border-gray-200 focus:border-primary px-4 py-3" placeholder="FTR-2025-0001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tarih</label>
              <input type="date" value={form.date} onChange={(e)=>setForm({...form, date: e.target.value})} className="w-full rounded-xl border-2 border-gray-200 focus:border-primary px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tutar (₺)</label>
              <input inputMode="numeric" value={form.amount} onChange={(e)=>setForm({...form, amount: e.target.value.replace(/[^\\d.,]/g,'')})} className="w-full rounded-xl border-2 border-gray-200 focus:border-primary px-4 py-3" placeholder="1000,00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Fatura Dosyası (PDF/IMG)</label>
              <input type="file" accept="application/pdf,image/*" onChange={(e)=> setForm({...form, file: e.target.files?.[0] || null})} className="w-full" />
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dark disabled:opacity-60">{saving ? 'Kaydediliyor...' : 'Kaydet'}</button>
              <button type="button" onClick={()=>history.back()} className="px-5 py-2.5 rounded-lg bg-white border text-primary hover:bg-primary/5">Vazgeç</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}


