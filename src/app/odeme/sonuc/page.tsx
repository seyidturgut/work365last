"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

function SonucInner() {
  const params = useSearchParams();
  const success = params.get("status") === "success";

  // PayTR iframe içinde açıldıysa sonucu tüm pencerede göster.
  useEffect(() => {
    if (typeof window !== "undefined" && window.top && window.top !== window.self) {
      try {
        window.top.location.href = window.location.href;
      } catch {
        /* yoksay */
      }
    }
  }, []);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-[620px] rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-black/6">
        {success ? (
          <>
            <CheckCircle2 className="mx-auto h-16 w-16 text-[#16A34A]" />
            <h1 className="mt-5 text-[26px] font-extrabold tracking-[-0.03em] text-[#0F172A]">
              Ödemeniz alındı 🎉
            </h1>
            <p className="mt-3 text-[15px] leading-7 text-[#475569]">
              Siparişiniz oluşturuldu. Satın aldıklarınızı ve aboneliklerinizi hesabınızdan takip edebilirsiniz.
            </p>
            <Link
              href="/hesabim"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1b98d5] px-7 py-3.5 text-[14px] font-bold text-white hover:bg-[#1580b3]"
            >
              Satın Aldıklarım <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-16 w-16 text-[#DC2626]" />
            <h1 className="mt-5 text-[26px] font-extrabold tracking-[-0.03em] text-[#0F172A]">
              Ödeme tamamlanamadı
            </h1>
            <p className="mt-3 text-[15px] leading-7 text-[#475569]">
              Ödeme sırasında bir sorun oluştu. Tekrar deneyebilirsiniz.
            </p>
            <Link
              href="/sirketini-kur"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1b98d5] px-7 py-3.5 text-[14px] font-bold text-white hover:bg-[#1580b3]"
            >
              Paketlere Dön <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default function OdemeSonucPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFC] pt-[92px]">
      <Header />
      <Suspense fallback={<div className="px-6 py-16 text-center text-[#64748B]">Yükleniyor…</div>}>
        <SonucInner />
      </Suspense>
    </main>
  );
}
