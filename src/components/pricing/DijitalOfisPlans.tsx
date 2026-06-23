import Link from "next/link";
import { CheckCircle2, Monitor } from "lucide-react";

const dijitalOfisPlans = [
  {
    name: "Başlangıç",
    range: "1–10 Kullanıcı",
    price: "10.000",
    popular: false,
    features: [
      "Microsoft 365 kurulum + lisans",
      "Kurumsal e-posta + Teams",
      "OneDrive + MFA",
      "Help desk desteği",
    ],
  },
  {
    name: "Profesyonel",
    range: "11–30 Kullanıcı",
    price: "15.000",
    popular: true,
    features: [
      "Tüm Başlangıç özellikleri",
      "SharePoint",
      "Güvenlik politikaları",
      "Öncelikli destek",
    ],
  },
  {
    name: "Kurumsal",
    range: "31–100 Kullanıcı",
    price: "20.000",
    popular: false,
    features: [
      "Tüm Profesyonel özellikleri",
      "Dedicated IT danışman",
      "SLA garantisi",
      "Yedekleme izleme",
    ],
  },
];

export default function DijitalOfisPlans() {
  return (
    <section className="px-6 py-20 max-w-[1230px] mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Monitor className="h-6 w-6 text-[#1b98d5]" />
        <span className="text-[28px] font-bold text-black">Dijital Ofis</span>
      </div>
      <p className="text-[15px] text-black/50 mb-10">
        Microsoft 365 kurulum, lisans ve yönetimi — tek pakette.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {dijitalOfisPlans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[28px] bg-white border-2 p-8 flex flex-col ${
              plan.popular ? "border-[#1b98d5] shadow-lg" : "border-black/10"
            }`}
          >
            {plan.popular && (
              <span className="self-start rounded-full bg-[#1b98d5] px-3 py-1 text-[11px] font-bold text-white mb-4">
                En Çok Tercih Edilen
              </span>
            )}
            <p className="text-[12px] font-bold uppercase tracking-widest text-black/40">{plan.range}</p>
            <h3 className="mt-2 text-[22px] font-bold text-black">{plan.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-[36px] font-bold text-black">{plan.price}</span>
              <span className="text-[14px] text-black/50 ml-1">TL/ay +KDV</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[14px] text-black/70">
                  <CheckCircle2 className="h-4 w-4 text-[#1b98d5] shrink-0 mt-0.5" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/iletisim"
              className={`rounded-full py-3.5 text-[14px] font-bold text-center transition-colors ${
                plan.popular
                  ? "bg-[#1b98d5] text-white hover:bg-[#1580b3]"
                  : "bg-black/5 text-black hover:bg-black/10"
              }`}
            >
              Hemen Al
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-[20px] bg-black text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">Enterprise</p>
          <p className="text-[18px] font-bold mt-1">100+ Kullanıcı — Özel Kapsam</p>
        </div>
        <Link
          href="/iletisim"
          className="shrink-0 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-black hover:bg-gray-100 transition-colors"
        >
          Teklif İste
        </Link>
      </div>
    </section>
  );
}
