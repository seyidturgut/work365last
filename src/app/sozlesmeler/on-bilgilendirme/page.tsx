import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ön Bilgilendirme Formu | Work365",
};

export default function OnBilgilendirmePage() {
  return (
    <main className="min-h-screen bg-white pt-[92px]">
      <Header />
      <article className="mx-auto max-w-[820px] px-6 py-12">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">Form</p>
        <h1 className="mt-3 text-[30px] font-extrabold tracking-[-0.03em] text-[#0F172A]">
          Ön Bilgilendirme Formu
        </h1>
        <p className="mt-2 text-[13px] text-[#94A3B8]">
          Bu metin bir şablondur; nihai hukuki içerik yayına almadan önce güncellenmelidir.
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-7 text-[#334155]">
          <section>
            <h2 className="text-[18px] font-bold text-[#0F172A]">Satıcı Bilgileri</h2>
            <p className="mt-2">Unvan: Work365 · İletişim: /iletisim sayfası üzerinden.</p>
          </section>
          <section>
            <h2 className="text-[18px] font-bold text-[#0F172A]">Hizmetin Temel Nitelikleri ve Bedeli</h2>
            <p className="mt-2">
              Satın alınan hizmetin adı, kapsamı ve KDV dahil toplam bedeli sipariş özetinde gösterilir.
              Aylık paketlerde bedel, abonelik süresince her ay otomatik yenilenir.
            </p>
          </section>
          <section>
            <h2 className="text-[18px] font-bold text-[#0F172A]">Ödeme ve Otomatik Yenileme</h2>
            <p className="mt-2">
              Ödemeler PayTR güvenli ödeme altyapısı ile alınır. Aylık aboneliklerde, ilk ödeme tarihinden
              itibaren her ay aynı tutar tanımlı karttan otomatik tahsil edilir. Abonelik, hesabınızdaki
              “Aboneliklerim” bölümünden istediğiniz zaman iptal edilebilir; iptal sonrası yeni tahsilat yapılmaz.
            </p>
          </section>
          <section>
            <h2 className="text-[18px] font-bold text-[#0F172A]">Cayma Hakkı ve İade</h2>
            <p className="mt-2">
              Cayma hakkı ve iade koşulları için{" "}
              <a href="/hizmet-sartlari/para-iade-kosullari" className="font-semibold text-[#1b98d5] underline">
                Para İade Koşulları
              </a>{" "}
              sayfasına bakınız.
            </p>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
