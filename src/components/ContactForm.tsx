"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-[14px] border border-[#DCE7F1] bg-white px-4 py-3.5 text-[15px] text-[#0F172A] outline-none transition-all placeholder:text-[#B0BEC5] focus:border-[#1B98D5] focus:shadow-[0_0_0_3px_rgba(27,152,213,0.12)]";

const labelClass = "mb-2 block text-[13px] font-semibold text-[#475569]";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => window.setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-5 py-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0FDF4]">
          <CheckCircle2 className="h-7 w-7 text-[#16A34A]" />
        </div>
        <div>
          <h3 className="text-[22px] font-bold tracking-[-0.03em] text-[#0F172A]">Mesajınız alındı.</h3>
          <p className="mt-2 text-[15px] leading-7 text-[#64748B]">
            Satış ekibimiz en geç 1 iş günü içinde size geri dönecek.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Ad Soyad</label>
          <input
            required
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Adınız Soyadınız"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>E-posta</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@sirket.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            Telefon{" "}
            <span className="font-normal text-[#94A3B8]">(opsiyonel)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05xx xxx xx xx"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Konu</label>
          <select
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>Seçin...</option>
            <option value="sirket-kurulus">Şirket Kuruluşu</option>
            <option value="dijital-ofis">Dijital Ofis</option>
            <option value="gorunur-ol">Görünür Ol</option>
            <option value="buyut">İşini Büyüt</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Mesajınız</label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nasıl yardımcı olabiliriz?"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#0F172A] px-6 py-4 text-[15px] font-bold text-white transition-all hover:bg-[#1e293b] disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
