import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";

export default function IsIniBuyutSection() {
  return (
    <section className="px-6 py-20 max-w-[1230px] mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="h-6 w-6 text-[#16A34A]" />
        <span className="text-[28px] font-bold text-black">İşini Büyüt</span>
      </div>
      <p className="text-[15px] text-black/50 mb-8">
        Teşvik analizi, hibe başvurusu, yatırımcı erişimi ve uzman kiralama.
      </p>
      <div className="rounded-[28px] bg-[#F0FDF4] border border-[#BBF7D0] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-[22px] font-bold text-black mb-2">Teklif Bazlı Fiyatlandırma</h3>
          <p className="text-[15px] text-black/65 max-w-[520px]">
            Her şirketin ihtiyacı farklı. Teşvik analizi, hibe desteği, yatırımcı erişimi ve uzman kiralama için ekibimizle görüşün.
          </p>
        </div>
        <Link
          href="/buyut"
          className="shrink-0 flex items-center gap-2 rounded-full bg-[#16A34A] px-7 py-3.5 text-[14px] font-bold text-white hover:bg-[#15803D] transition-colors"
        >
          Detayları İncele <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
