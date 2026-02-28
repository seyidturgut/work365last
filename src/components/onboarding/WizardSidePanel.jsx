import { FaCircle, FaClock } from "react-icons/fa";

const STEP_HINTS = {
  0: [
    "İş modelinize uygun onboarding yolunu başlatıyoruz.",
    "Seçimlerinize göre sonraki adımlar netleşir.",
    "Tüm bilgileriniz güvenli olarak taslak kaydedilir.",
  ],
  1: [
    "Seçtiğiniz işletme tipi paket önerisini etkiler.",
    "Kurulum süresi seçime göre optimize edilir.",
    "Bir sonraki adımda lokasyon seçimi yaparsınız.",
  ],
  2: [
    "Ülkeye göre vergi ve yasal süreçler farklılaşır.",
    "Arama ile doğru lokasyonu hızlıca bulabilirsiniz.",
    "Sonraki adımda hizmetleri kişiselleştirirsiniz.",
  ],
  3: [
    "Birden fazla hizmet seçerek kapsamı genişletebilirsiniz.",
    "Seçimleriniz fiyat önizlemesine yansır.",
    "Sonraki adımda kişisel bilgileri girersiniz.",
  ],
  4: [
    "Bilgiler otomatik taslak olarak saklanır.",
    "Alanlar anlık doğrulama ile kontrol edilir.",
    "Sonraki adımda tüm detayları gözden geçirirsiniz.",
  ],
  5: [
    "Özeti kontrol edip düzenleyebilirsiniz.",
    "Fiyat önizlemesi seçilen kapsamla güncellenir.",
    "Onayı tamamladıktan sonra dashboard aktif olur.",
  ],
  6: [
    "Onboarding tamamlandı.",
    "Dashboard üzerinden süreçleri canlı takip edebilirsiniz.",
    "Ek servisleri daha sonra da ekleyebilirsiniz.",
  ],
};

export default function WizardSidePanel({ currentStep = 0 }) {
  const hints = STEP_HINTS[currentStep] || STEP_HINTS[0];

  return (
    <aside className="hidden lg:block" aria-label="Onboarding side guidance">
      <div className="sticky top-6 rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 text-slate-200">
          <FaClock className="text-xs text-blue-200" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">What happens next</p>
        </div>

        <ul className="space-y-2.5">
          {hints.map((hint) => (
            <li key={hint} className="flex items-start gap-2 text-sm text-slate-200/90">
              <FaCircle className="mt-1 text-[8px] text-blue-200/80" aria-hidden="true" />
              <span>{hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
