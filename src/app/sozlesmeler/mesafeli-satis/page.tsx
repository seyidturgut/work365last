import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi | Work365",
};

export default function MesafeliSatisPage() {
  return (
    <main className="min-h-screen bg-white pt-[92px]">
      <Header />
      <article className="mx-auto max-w-[820px] px-6 py-12">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">Sözleşme</p>
        <h1 className="mt-3 text-[30px] font-extrabold tracking-[-0.03em] text-[#0F172A]">
          Mesafeli Satış Sözleşmesi
        </h1>
        <p className="mt-2 text-[13px] text-[#94A3B8]">
          Bu metin bir şablondur; nihai hukuki içerik yayına almadan önce güncellenmelidir.
        </p>

        <div className="mt-8 space-y-6 text-[15px] leading-7 text-[#334155]">
          <section>
            <h2 className="text-[18px] font-bold text-[#0F172A]">1. Taraflar</h2>
            <p className="mt-2">
              İşbu Mesafeli Satış Sözleşmesi (“Sözleşme”), bir tarafta <strong>Work365</strong> (“Satıcı”) ile
              diğer tarafta hizmeti satın alan <strong>Alıcı</strong> arasında, aşağıdaki şartlar dahilinde
              elektronik ortamda kurulmuştur.
            </p>
          </section>
          <section>
            <h2 className="text-[18px] font-bold text-[#0F172A]">2. Konu</h2>
            <p className="mt-2">
              Sözleşmenin konusu, Alıcı’nın Satıcı’ya ait internet sitesi üzerinden elektronik ortamda sipariş
              verdiği, nitelikleri ve satış bedeli sipariş özetinde belirtilen hizmetin satışı ve ifasıdır.
            </p>
          </section>
          <section>
            <h2 className="text-[18px] font-bold text-[#0F172A]">3. Ödeme ve İfa</h2>
            <p className="mt-2">
              Hizmet bedeli, ödeme altyapısı (PayTR) üzerinden tahsil edilir. Aylık paketlerde bedel, satın alma
              tarihinden itibaren her ay otomatik olarak Alıcı’nın tanımlı kartından tahsil edilir. Alıcı,
              aboneliği dilediği zaman hesabı üzerinden iptal edebilir.
            </p>
          </section>
          <section>
            <h2 className="text-[18px] font-bold text-[#0F172A]">4. Cayma Hakkı</h2>
            <p className="mt-2">
              Alıcı, hizmetin ifasına başlanmadan önce cayma hakkını kullanabilir. Dijital içerik ve anında ifa
              edilen hizmetlerde mevzuatın öngördüğü istisnalar saklıdır.
            </p>
          </section>
          <section>
            <h2 className="text-[18px] font-bold text-[#0F172A]">5. Yürürlük</h2>
            <p className="mt-2">
              Alıcı, siparişi onayladığında işbu Sözleşme’nin tüm koşullarını kabul etmiş sayılır.
            </p>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
