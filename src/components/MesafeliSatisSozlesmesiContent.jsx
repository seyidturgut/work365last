import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { customerApi } from "../lib/api";
import { getToken } from "../lib/auth";

const PIRI_UNVAN = "Piri Dijital Anonim Şirketi";
const PIRI_MERSIS = "0730075942300001";
const PIRI_ADRES = "Adalet Mah. Manas Bul. Folkart Towers No: 39 İç Kapı No:2511 Bayraklı/İZMİR";
const PIRI_SITE = "www.piri.tr";
const IZTO = "İzmir Ticaret Odası (Telefon: 444 92 92, https://www.izto.org.tr/tr)";

export default function MesafeliSatisSozlesmesiContent({ embedded }) {
  const { user } = useAuth();
  const { items: cartItems, total: cartTotal, summary: cartSummary } = useCart();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return;
    const token = getToken();
    if (!token) return;
    customerApi.details(token).then((res) => {
      const data = res?.data ?? res;
      setProfile(data || null);
    }).catch(() => setProfile(null));
  }, [user]);

  const musteriAdSoyad = user?.name || [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "[Ad Soyad]";
  const musteriTcKimlik = profile?.tc_kimlik_no || "[T.C. Kimlik No]";
  const musteriAdres = profile?.billing_address || user?.billing_address || user?.address || "[Adres]";
  const musteriTelefon = user?.phone || profile?.phone || "[Telefon]";
  const musteriEposta = user?.email || "[E-Posta]";

  const displayTotal = cartSummary?.total?.final_gross != null
    ? parseFloat(cartSummary.total.final_gross)
    : cartTotal;
  const periodLabel = (p) => (p === "monthly" ? "Aylık" : p === "yearly" ? "Yıllık" : "-");

  const rootClass = embedded
    ? "bg-white rounded-2xl p-6 md:p-10 text-gray-800 text-sm md:text-base leading-relaxed space-y-6"
    : "bg-white rounded-2xl border shadow-lg p-6 md:p-10 text-gray-800 text-sm md:text-base leading-relaxed space-y-6";

  return (
    <div className={rootClass}>
      <h2 className="text-xl font-bold text-gray-900 border-b pb-2">MESAFELİ SATIŞ SÖZLEŞMESİ</h2>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Taraflar</h3>
        <p>İşbu Mesafeli Satış Sözleşmesi (&quot;Sözleşme&quot;), Müşteri, Aracı Hizmet Sağlayıcı ve Hizmet Sağlayıcı arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde elektronik ortamda kurulmuştur.</p>
        <div className="space-y-4 overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <tbody>
              <tr><td colSpan={2} className="font-semibold bg-gray-100 px-3 py-2">Aracı Hizmet Sağlayıcı Bilgileri:</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2 w-48">Unvanı</td><td className="border border-gray-300 px-3 py-2">{PIRI_UNVAN} (&quot;Piri&quot;)</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">MERSİS No</td><td className="border border-gray-300 px-3 py-2">{PIRI_MERSIS}</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Adresi</td><td className="border border-gray-300 px-3 py-2">{PIRI_ADRES}</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Telefon</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Faks</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">İnternet Sitesi</td><td className="border border-gray-300 px-3 py-2">{PIRI_SITE}/</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Mensubu Olduğu Meslek Odası</td><td className="border border-gray-300 px-3 py-2">{IZTO}</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">E – Posta</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Şikayet Adresi</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
            </tbody>
          </table>
          <table className="w-full border border-gray-300 text-sm">
            <tbody>
              <tr><td colSpan={2} className="font-semibold bg-gray-100 px-3 py-2">Hizmet Sağlayıcı Bilgileri:</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2 w-48">Unvanı / Adı / Soyadı</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">MERSİS No</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Adresi</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Telefon</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Faks</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">İnternet Sitesi</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Mensubu Olduğu Meslek Odası</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">E – Posta</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
            </tbody>
          </table>
          <table className="w-full border border-gray-300 text-sm">
            <tbody>
              <tr><td colSpan={2} className="font-semibold bg-gray-100 px-3 py-2">Müşteri Bilgileri:</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2 w-48">Adı / Soyadı</td><td className="border border-gray-300 px-3 py-2">{musteriAdSoyad}</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">T.C. Kimlik No</td><td className="border border-gray-300 px-3 py-2">{musteriTcKimlik}</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Adresi</td><td className="border border-gray-300 px-3 py-2">{musteriAdres}</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">Telefon</td><td className="border border-gray-300 px-3 py-2">{musteriTelefon}</td></tr>
              <tr><td className="border border-gray-300 px-3 py-2">E – Posta</td><td className="border border-gray-300 px-3 py-2">{musteriEposta}</td></tr>
            </tbody>
          </table>
        </div>
        <p>İşbu Sözleşme&apos;de bundan sonra Hizmet Sağlayıcı ile Müşteri tek başına &quot;Taraf&quot; ve birlikte &quot;Taraflar&quot; olarak anılacaktır.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Tanımlar</h3>
        <p><strong>Ürün veya Hizmet:</strong> Aracı Hizmet Sağlayıcı tarafından İnternet Sitesi üzerinden satış için sunulan, Hizmet Sağlayıcı tarafından Müşteri&apos;ye ifa edilecek olan ve Taraflar arasında Satış Sözleşmesi kurulması ile birlikte satın alınabilecek her türlü ürün veya hizmet.</p>
        <p><strong>Müşteri:</strong> Bir mal veya hizmeti ticari veya mesleki olmayan amaçlarla edinen, kullanan veya yararlanan ve yukarıda bilgileri belirtilen gerçek ya da tüzel kişi.</p>
        <p><strong>Sözleşme:</strong> Taraflar arasında akdedilen Satış Sözleşmesi.</p>
        <p><strong>İnternet Sitesi:</strong> Aracı Hizmet Sağlayıcı&apos;ya ait {PIRI_SITE}/ isimli alan adından ve bu alan adına bağlı alt alan adlarından oluşan internet sitesi.</p>
        <p><strong>Muhasebe Hizmetleri:</strong> 3568 sayılı Serbest Muhasebecilik, Serbest Muhasebeci Mali Müşavirlik ve Yeminli Mali Müşavirlik Kanunu kapsamında iş sahiplerine/vergi yükümlülerine sunulan ve Muhasebe Hizmetleri Sözleşmesi&apos;nde detaylandırılan ve sınırlandırılan hizmetleri.</p>
        <p><strong>Muhasebe Hizmetleri Sözleşmesi:</strong> Platform&apos;u kullanan ve Piri hizmetlerinden yararlanan 3568 sayılı Serbest Muhasebecilik, Serbest Muhasebeci Mali Müşavirlik ve Yeminli Mali Müşavirlik Kanunu uyarınca Muhasebe Hizmetleri sunmaya yetkili kişiler (Platform Kullanıcısı) ile Müşteri arasında akdedilen ve Muhasebe Hizmetleri&apos;ne ilişkin hüküm ve koşulların düzenlendiği sözleşmeyi.</p>
        <p><strong>Paket:</strong> Bu Sözleşme&apos;de detaylandırılan Piri hizmetlerinin biri veya birkaçını içeren, Piri tarafından içeriği ve ücretleri tek taraflı olarak değiştirilebilen, {PIRI_SITE}/ alan adlı adreste yer alan ve Platform&apos;a kayıt esnasında Müşteri tarafından seçilen veya sonrasında Müşteri tarafından değiştirilebilen paketleri.</p>
        <p><strong>Yetkili Kullanıcı, Yetkili Kullanıcı Kodu ve Bilgileri:</strong> Kendisine, Piri tarafından sunulacak hizmetleri kullanması için giriş yetkisi verilmiş Müşteri&apos;yi ve/veya Muhasebe Hizmetleri Sözleşmesi kapsamında Müşteri&apos;ye Muhasebe Hizmetleri sunacak yetkili üçüncü kişiyi ve sunulan hizmete erişim için verilecek olan kullanıcı kodları ve bilgilerini ifade eder. Bu Sözleşme kapsamında Ürün ve Hizmetler&apos;in sunulabilmesi için Muhasebe Hizmetleri Sözleşmesi&apos;nin tarafı Muhasebeci Platform üzerinde doğrudan Müşteri&apos;nin Yetkili Kullanıcılarından biri olarak atanacaktır. Müşteri&apos;nin Site için kullanmakta olduğu kullanıcı kodları ve bilgileri Uygulama için de geçerli olacaktır. Müşteri, Site ve Uygulama&apos;ya aynı kullanıcı kodu ve bilgileriyle giriş yapabilecek ve bu Sözleşme kapsamında Ürün ve Hizmetler&apos;den yararlanabilecektir.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Sözleşmenin Konusu</h3>
        <p>Müşteri; {PIRI_SITE} alan adlı internet sitesi (&quot;Site&quot;) ve/veya hizmetlerin sunulduğu ya da sunulacağı çevrimiçi uygulama mağazaları aracılığıyla Müşteri&apos;nin mobil cihazlarına indirilebilen Piri adlı mobil uygulamaya (&quot;Uygulama&quot;) üye olarak (Site ve Uygulama birlikte veya ayrı ayrı &quot;Platform&quot; olarak anılacaktır), işbu Sözleşme kapsamında Hizmet Sağlayıcı tarafından sunulan hizmetlerden faydalanmak istemektedir.</p>
        <p>Sözleşme&apos;nin konusu Müşteri&apos;nin, Platform&apos;da, Hizmet&apos;in satın alınmasına yönelik elektronik olarak sipariş verdiği, Sözleşme&apos;de belirtilen niteliklere sahip Hizmet&apos;in satışı ve teslimi ile ilgili olarak Taraflar&apos;ın hak ve yükümlülüklerinin belirlenmesi olup Taraflar, Sözleşme tahtında yükümlülük ve sorumluluklarını bildiklerini ve anladıklarını kabul, beyan ve taahhüt ederler.</p>
        <p>Müşteri, söz konusu Hizmetler&apos;in bir kısmının mevzuat uyarınca yetkili üçüncü kişiler tarafından ifa edilebileceğini, Piri&apos;nin bu Hizmetler bakımından doğrudan hizmet sağlayıcı değil, platform işletmecisi ve/veya aracı hizmet sağlayıcı konumunda bulunduğunu kabul eder.</p>
        <p>İşbu Sözleşme&apos;nin amacı, Platform üzerinden sunulan hizmetlerin Hizmet Sağlayıcı tarafından Müşteri&apos;ye sağlanmasına ve/veya bu hizmetlerin sağlanmasına ilişkin süreçlerin organize edilmesine, bu kapsamda Müşteri tarafından ödenecek ücretlere ve Taraflar&apos;ın karşılıklı hak ve yükümlülüklerine ilişkin usul ve esasların düzenlenmesidir.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Müşteri&apos;nin Önceden Bilgilendirildiği Hususlar</h3>
        <p>İşbu madde Müşteri&apos;nin tacir olmadığı, tüketici olduğu durumlarda geçerli olacaktır:</p>
        <p>Müşteri, aşağıdaki hususlarda, işbu Sözleşme&apos;nin Müşteri tarafından İnternet Sitesi vasıtasıyla kabulü ile kurulmasından ve gerek sipariş öncesinde gerek ödeme yükümlülüğü altına girilmesinden önce işbu Sözleşme&apos;ye ilişkin Ön Bilgilendirme Formu&apos;nu ve İnternet Sitesi&apos;nde yer alan ilgili tüm bölümlerdeki tüm genel/özel açıklamaları incelediğini, okuduğunu, anladığını ve kendisine doğru ve eksiksiz bilgilendirmenin yapıldığını kabul eder:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>İşbu Sözleşme madde 1&apos;de belirtildiği üzere, Hizmet Sağlayıcı&apos;nın unvanı ve iletişim bilgileri ile güncel tanıtıcı bilgileri,</li>
          <li>Sözleşme konusu hizmetin temel nitelikleri,</li>
          <li>Hizmet&apos;in Platform&apos;dan alınması sırasındaki satış işlemi aşamaları ile yanlış girilen bilgilerin düzeltilmesine ilişkin amaca uygun araçlar-yöntemler,</li>
          <li>Hizmet Sağlayıcı&apos;nın mensubu olduğu Meslek Odası ve meslek ile ilgili öngördüğü davranış kuralları bilgisinin edinebileceği elektronik iletişim bilgileri</li>
          <li>Aracı Hizmet Sağlayıcı tarafından uygulanan Müşteri bilgileri için geçerli gizlilik, veri kullanımı-işleme ve elektronik iletişim kuralları ile Müşteri&apos;nın bu hususlarda Aracı Hizmet Sağlayıcı&apos;ya verdiği izinlerin kapsamı, Müşteri&apos;nın kanuni hakları, Hizmet Sağlayıcı&apos;nın hakları ve Taraflar&apos;ın haklarını kullanım usulleri,</li>
          <li>Sözleşme konusu Hizmetler için kabul edilen ödeme yöntem/araçları ile temel özellik/nitelikleri, vergiler dahil toplam fiyatı (ilgili masraflar da dahil olmak üzere Müşteri&apos;nin ödeyeceği toplam bedel),</li>
          <li>Ödeme/tahsilat ile Sözleşme&apos;nin ifasına ilişkin bilgiler, bu hususlarda Taraflar&apos;ın sorumlulukları,</li>
          <li>Cayma hakkı ve kullanım usulü ile cayma hakkına ilişkin diğer bilgiler ile hakkın süresinde kullanılmaması durumunda Müşteri&apos;nın cayma hakkını kaybedeceği,</li>
          <li>Dijital içeriklerin işlevselliğini etkileyebilecek teknik koruma önlemlerini,</li>
          <li>Hizmet Sağlayıcı&apos;nın bildiği ya da makul olarak bilmesinin beklendiği, dijital içeriğin hangi donanım ya da yazılımla birlikte çalışabileceğine ilişkin bilgiyi,</li>
          <li>Mahiyetine göre işbu Sözleşme&apos;de de yer alan diğer tüm satış şartları ile işbu Sözleşme Müşteri tarafından İnternet Sitesi&apos;nde onaylanarak kurulduktan sonra Müşteri&apos;ye elektronik posta ile gönderildiğinden, Müşteri tarafından istenen süre ile saklanıp buradan erişilebileceği,</li>
          <li>Sözleşme&apos;den kaynaklanan uyuşmazlıklarda, Müşteri&apos;nin Hizmet Sağlayıcı&apos;ya şikayetlerini iletebileceği iletişim bilgileri ile, Kanun&apos;un ilgili hükümlerine uygun olarak İlçe/İl Hakem Heyetlerine ve Tüketici Mahkemeleri&apos;ne yasal başvurularını yapabileceği.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Sözleşme Konusu Hizmetler</h3>
        <p>Müşteri tarafından satın alınan hizmetlerin, tüm vergiler dahil satış bedeli aşağıda belirtildiği gibidir. Müşteri, işbu Sözleşme&apos;yi akdetmeden ve ödeme yükümlülüğü altına girmeden önce hizmet tanıtım sayfasında ve aşağıda belirtilen tüm hususları incelediğini ve ilgili sayfada yer alan bilgilerin güncelleme yapılana kadar geçerli olduğunu, süreli olarak ilan edilen fiyatların ise belirtilen süre sonuna kadar geçerli olduğunu kabul ettiğini beyan eder.</p>
        <p>Hizmetler&apos;in tüm vergiler dâhil satış fiyatı aşağıdaki tabloda gösterilmiştir.</p>
        <div className="overflow-x-auto my-4">
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left">Hizmet Açıklaması</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Satış Bedeli</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Hizmet Sunum Süresi</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Ara Toplam (KDV Dahil)</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(cartItems) && cartItems.length > 0 ? (
                <>
                  {cartItems.map((item, index) => {
                    const unitPrice = parseFloat(item.gross_price || item.net_price || item.price || 0);
                    const qty = parseInt(item.quantity || 1, 10);
                    const lineTotal = unitPrice * qty;
                    const name = item.service_request?.service_title || item.product?.title || item.name || "-";
                    return (
                      <tr key={item.id ?? `cart-${index}`}>
                        <td className="border border-gray-300 px-3 py-2">{name}</td>
                        <td className="border border-gray-300 px-3 py-2">{unitPrice.toLocaleString("tr-TR")} ₺</td>
                        <td className="border border-gray-300 px-3 py-2">{periodLabel(item.period)}</td>
                        <td className="border border-gray-300 px-3 py-2">{lineTotal.toLocaleString("tr-TR")} ₺</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-gray-50 font-semibold">
                    <td colSpan={3} className="border border-gray-300 px-3 py-2 text-right">Toplam (KDV Dahil)</td>
                    <td className="border border-gray-300 px-3 py-2">{Number(displayTotal).toLocaleString("tr-TR")} ₺</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="font-semibold">SÖZ KONUSU HİZMET BEDELİ, HİZMET SAĞLAYICI ADINA, ARACI HİZMET SAĞLAYICI TARAFINDAN MÜŞTERİ&apos;DEN TAHSİL EDİLMEKTEDİR. MÜŞTERİ HİZMET BEDELİNİ ARACI HİZMET SAĞLAYICI&apos;YA ÖDEMEKLE, HİZMET BEDELİNİ HİZMET SAĞLAYICI&apos;YA ÖDEMİŞ SAYILACAK VE BİR DAHA ÖDEME YÜKÜMLÜLÜĞÜ ALTINA GİRMEYECEKTİR.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Taraflar&apos;ın Hak ve Yükümlülükleri</h3>
        <p>İşbu Sözleşme, Kullanım Koşulları ve/veya Platform&apos;da ilgili bölümlerde çeşitli vasıtalarla açıklandığı üzere; Piri işbu Sözleşme&apos;de detaylandırılan hizmetlerin tamamı, bir ve/veya birkaçı birlikte bu Sözleşme&apos;de ve/veya Platform&apos;da belirtildiği şekilde üçüncü kişi iş ortaklarıyla sağlanması amacıyla buna aracılık edilmesi hizmetlerini Müşteri&apos;ye sunmaktadır.</p>
        <p>Piri tarafından sunulmasına aracılık edilecek ve Hizmet Sağlayıcı tarafından Müşteri&apos;ye sunulacak veya Ürün ve Hizmetler, aşağıdaki gibi detaylandırılmıştır. Piri, Ürün ve Hizmetler&apos;in ve/veya Paket&apos;in kapsamı ve ücretlendirmeye ilişkin detayları ve bunlardaki değişiklikleri, Müşteri&apos;nin e-mail adresine gerçekleştireceği bildirimle veya Platform&apos;da uygun gördüğü şekilde ilan edebilir. Bu detaylar veya değişikliklerin uygulanabilmesi için Müşteri&apos;nin kabulü gerekmez. Platform&apos;da yer alan Ürün ve Hizmetler&apos;e ilişkin diğer düzenlemeler ve açıklamalar da bu Sözleşme dahilinde olup; Taraflar&apos;ın uyması gereken hak ve yükümlülüklerdendir.</p>
        <p><strong>Muhasebe hizmetleri:</strong> 3568 sayılı Serbest Muhasebecilik, Serbest Muhasebeci Mali Müşavirlik ve Yeminli Mali Müşavirlik Kanunu ve ilgili mevzuat uyarınca, bu hizmetleri sunmaya yetkili gerçek veya tüzel kişiler tarafından sunulmaktadır. Piri, muhasebe hizmeti sunmamakta olup, Platform üzerinden sunulan muhasebe hizmetleri bakımından hizmetin doğrudan sağlayıcısı değildir. Söz konusu muhasebe hizmetlerinin kapsamı, içeriği, süresi ve koşulları; Müşteri ile ilgili yetkili üçüncü kişi arasında akdedilen &quot;Muhasebe Hizmetleri Sözleşmesi&quot; kapsamında belirlenmektedir.</p>
        <p>Piri, Muhasebe Hizmetleri Sözleşmesi&apos;nin herhangi bir şekilde tarafı değildir. Anılan sözleşme, Müşteri ile ilgili muhasebe hizmetini sunmaya yetkili üçüncü kişi arasında akdedilir. Bu kapsamda; Muhasebe Hizmetleri Sözleşmesi&apos;nden doğan veya bu sözleşme ile bağlantılı olarak ortaya çıkabilecek hak ve yükümlülükler, hizmetin ifası, eksik veya ayıplı ifa, gecikme, fesih, tazminat ve benzeri talepler bakımından Piri&apos;nin herhangi bir hukuki veya sözleşmesel sorumluluğu bulunmamaktadır.</p>
        <p>Bununla birlikte Piri, herhangi bir yükümlülük veya taahhüt altına girmeksizin, tamamen kendi takdirinde olmak üzere ve yalnızca müşteri memnuniyetinin sağlanması amacıyla, Müşteri ile ilgili üçüncü kişi arasındaki ilişkiye sınırlı ve geçici nitelikte destek sağlayabilir. Bu tür bir destek, Piri bakımından Muhasebe Hizmetleri Sözleşmesi&apos;ne taraf olunduğu veya bu sözleşmeden doğan sorumlulukların üstlenildiği şeklinde yorumlanamaz.</p>
        <p><strong>Hukuk Hizmetleri:</strong> Hukuk hizmetleri, 1136 sayılı Avukatlık Kanunu ve ilgili mevzuat uyarınca, yalnızca avukatlık faaliyetinde bulunmaya yetkili gerçek kişiler tarafından sunulmaktadır. Piri, avukatlık faaliyeti yürütmemekte olup, Platform üzerinden sunulan hukuk hizmetleri bakımından hukuki hizmetin doğrudan sağlayıcısı değildir. Platform aracılığıyla sunulan hukuk hizmetlerinin kapsamı, içeriği, süresi ve koşulları; Müşteri ile ilgili avukat arasında akdedilen &quot;Hukuk Hizmetleri Sözleşmesi&quot; kapsamında belirlenmektedir.</p>
        <p>Piri, Hukuk Hizmetleri Sözleşmesi&apos;nin herhangi bir şekilde tarafı değildir. Anılan sözleşme, Müşteri ile ilgili avukat arasında akdedilir. Bu kapsamda; Hukuk Hizmetleri Sözleşmesi&apos;nden doğan veya bu sözleşme ile bağlantılı olarak ortaya çıkabilecek her türlü hak, yükümlülük, ifa, eksik veya ayıplı ifa, hukuki görüş, danışmanlık içeriği, dava ve takip süreçleri ile bunların sonuçlarına ilişkin olarak Piri&apos;nin herhangi bir hukuki, cezai veya mesleki sorumluluğu bulunmamaktadır.</p>
        <p>Bununla birlikte Piri, herhangi bir hukuki danışmanlık sunmaksızın ve herhangi bir taahhüt altına girmeksizin, yalnızca Platform&apos;un işletilmesi ve müşteri deneyiminin iyileştirilmesi amacıyla, kendi takdiri çerçevesinde Müşteri ile ilgili avukat arasındaki iletişim ve süreçlere sınırlı teknik veya operasyonel destek sağlayabilir. Bu destek, Piri&apos;nin hukuki hizmet sunduğu veya Hukuk Hizmetleri Sözleşmesi&apos;ne taraf olduğu şeklinde yorumlanamaz.</p>
        <p>Bu sözleşme kapsamında verilecek hizmetlere ilişkin bilgilere aşağıda yer verilmiştir:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Hukuki durum ve ihtiyaçlara ilişkin ön değerlendirme ve bilgilendirme yapılması,</li>
          <li>Sözleşme, dilekçe, ihtarname ve benzeri hukuki metinlere ilişkin taslak hazırlanması veya mevcut metinlerin incelenmesi,</li>
          <li>Hukuki süreçlere, uyuşmazlık çözüm yollarına ve izlenebilecek hukuki adımlara ilişkin genel nitelikte görüş paylaşılması,</li>
          <li>Dava, icra, arabuluculuk ve benzeri süreçlere ilişkin usule dair yönlendirme yapılması,</li>
          <li>İlgili mevzuat ve uygulamalara ilişkin bilgi verilmesi</li>
        </ul>
        <p><strong>Marka Tescil Hizmetleri:</strong> Marka tesciline ilişkin hizmetler, 6769 sayılı Sınai Mülkiyet Kanunu ve ilgili mevzuat uyarınca, marka ve patent vekilliği yapmaya yetkili kişiler tarafından sunulmaktadır. Piri, marka veya patent vekilliği faaliyeti yürütmemekte olup, Platform üzerinden sunulan marka tescil hizmetleri bakımından hizmetin doğrudan sağlayıcısı değildir. Platform aracılığıyla sunulan marka tescil hizmetlerinin kapsamı, içeriği, süresi ve koşulları; Müşteri ile ilgili marka/patent vekili veya yetkili hizmet sağlayıcı arasında akdedilen &quot;Marka Tescil Hizmetleri Sözleşmesi&quot; kapsamında belirlenmektedir.</p>
        <p>Piri, Marka Tescil Hizmetleri Sözleşmesi&apos;nin herhangi bir şekilde tarafı değildir. Anılan sözleşme, Müşteri ile ilgili yetkili marka/patent vekili veya hizmet sağlayıcı arasında akdedilir. Bu kapsamda; marka başvurularının yapılması, takibi, tescil edilip edilmemesi, başvuruların reddi, itiraz süreçleri, üçüncü kişi talepleri ve benzeri hususlardan doğan her türlü sonuç bakımından Piri&apos;nin herhangi bir hukuki, idari veya mali sorumluluğu bulunmamaktadır.</p>
        <p>Piri&apos;nin, müşteri memnuniyetinin sağlanması amacıyla ve tamamen kendi takdiri doğrultusunda, marka tescil sürecine ilişkin olarak sunduğu bilgilendirme, yönlendirme veya teknik destekler; başvurunun kabul edileceği, tescilin kesinleşeceği veya belirli bir sonucun elde edileceği yönünde herhangi bir garanti veya taahhüt teşkil etmez.</p>
        <p>Bu sözleşme kapsamında verilecek hizmetlere ilişkin bilgilere aşağıda yer verilmiştir:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Marka tescil sürecine ilişkin ön bilgilendirme ve süreç açıklaması yapılması,</li>
          <li>Marka başvurusu öncesinde ön araştırma ve benzerlik taraması yapılması,</li>
          <li>Türk Patent ve Marka Kurumu nezdinde marka başvurusunun yapılması,</li>
          <li>Başvuru sürecinin takip edilmesi ve Müşteri&apos;nin bilgilendirilmesi,</li>
          <li>İtiraz, görüş bildirme ve benzeri idari süreçlere ilişkin teknik destek sağlanması.</li>
        </ul>
        <p>Müşteri; Piri&apos;nin faaliyetlerinin, Piri&apos;nin kontrolü dışında gelişen sebeplerle veya burada sayılanlarla sınırlı olmamak üzere doğal afetler, mevzuattan veya yetkili kamu otoritelerinin kararlarından kaynaklanan kısıtlamalar, telekomünikasyon ve enerji altyapılarında meydana gelen ve Ürün ve Hizmetler&apos;in sunulmasını engelleyebilecek genel nitelikteki arızalar, veri aktarımı ve bağlantı sorunları, Müşteri tarafından kullanılan bilgisayar, ekipman veya donanımların gereği gibi çalışmaması ya da kullanıcı kaynaklı güvenlik ihlalleri nedeniyle ya da geçici veya sürekli olarak durdurulması, kısıtlanması veya Hizmetler&apos;in hiç ya da gereği gibi sunulamaması hâllerinde, Piri&apos;den herhangi bir talepte bulunmayacağını kabul eder. Bu kapsamda, Piri kaynaklı olmayan ve Piri&apos;nin kusurunun açıkça bulunmadığı hizmet kesintilerinden ve üçüncü kişiler tarafından gerçekleştirilen siber saldırılar nedeniyle meydana gelen zararlardan Piri hiçbir şekilde sorumlu tutulamaz.</p>
        <p>Piri, Müşteri&apos;den kaynaklanan gecikmeler ile kendisine atfedilemeyecek arıza, gecikme veya haberleşmeyi engelleyici nitelikteki durumlardan dolayı herhangi bir sorumluluk kabul etmez.</p>
        <p>Piri veya Hizmet Sağlayıcı; gerekli tüm teknik, idari ve makul önlemleri almış olmasına rağmen, ulusal veya uluslararası mevzuat, yetkili mercilerce yayımlanan yasa, tebliğ, genelge ve benzeri düzenlemeler uyarınca farklı şekilde hareket etmesini gerektiren haklı nedenlerin varlığı hâlinde, sunulan Hizmetler&apos;in kapsamını daraltabilir, geçici olarak askıya alabilir veya tamamen durdurabilir. Müşteri, bu sebeplerle uğrayabileceği doğrudan veya dolaylı zararlar bakımından Piri&apos;ye herhangi bir rücu veya tazminat talebinde bulunmayacağını peşinen kabul, beyan ve taahhüt eder.</p>
        <p>Müşteri; Hizmet Sağlayıcı&apos;nın ve varsa iş ortaklarının yükümlülüklerini gereği gibi yerine getirebilmesi amacıyla kendisinden talep edilen veya bildirilmesi gereken her türlü bilgi ve belgeyi doğru, eksiksiz, güncel ve mevzuata uygun şekilde Platform&apos;a girmekle ve Sözleşme süresince güncel tutmakla yükümlüdür. Aksi hâlde, Hizmet&apos;in sunulamaması, gecikmesi veya aksaması ile bu eksikliklerden doğan her türlü sonuçtan münhasıran Müşteri sorumludur. Bu sebeple Hizmet Sağlayıcı&apos;nın veya Piri&apos;nin uğrayabileceği zararları talep etme hakkı saklıdır.</p>
        <p>Müşteri; başta KEP adresi ve elektronik posta adresleri olmak üzere, Hizmet kapsamında Piri&apos;ye bildirdiği tüm iletişim ve hesap bilgilerinin güncel olmasından sorumludur. Piri veya Hizmet Sağlayıcı tarafından Platform, e-posta veya KEP üzerinden yapılan bildirimler, Müşteri&apos;ye ulaştığı kabul edilir. Bildirilen bilgilerin hatalı veya mevzuata aykırı olduğunun tespiti hâlinde Piri, herhangi bir tazminat yükümlülüğü olmaksızın Hizmet&apos;i durdurma ve/veya Sözleşme&apos;yi feshetme hakkına sahiptir.</p>
        <p>Piri veya Hizmet Sağlayıcı, Platform kullanıcılarının kullanıcı adı ve şifreleri ile gerçekleştirilen işlemlerden doğabilecek her türlü hukuki, idari ve cezai sonuçtan sorumlu değildir. Yetkilendirmelerin geri alınması veya değiştirilmesi hâlinde Müşteri, bu durumu derhal Piri&apos;ye bildirmekle yükümlüdür. Bildirim yapılıncaya kadar mevcut yetkilendirmeler geçerliliğini korur ve bu süre içinde yapılan işlemlerden doğan tüm sorumluluk Müşteri&apos;ye aittir.</p>
        <p>Müşteri; yetkilendirme değişikliklerini geç bildirmesi, iflası, tasfiyesi veya ticari faaliyetlerinin sona ermesi hâllerinde dahi, Platform erişim bilgilerinin kullanılması suretiyle gerçekleştirilen işlemlerden dolayı Piri&apos;nin veya Hizmet Sağlayıcı&apos;nın herhangi bir sorumluluğu bulunmadığını kabul eder.</p>
        <p>Müşteri, Piri tarafından sunulan yazılım, donanım ve teknik altyapıya zarar verecek veya bu altyapının sürekliliğini olumsuz etkileyecek her türlü davranıştan kaçınacağını kabul, beyan ve taahhüt eder.</p>
        <p>Müşteri; Muhasebe Hizmetleri&apos;nin sunulabilmesi amacıyla, ilgili hizmeti sunan Platform Kullanıcısı&apos;nın aynı zamanda Müşteri&apos;nin Yetkili Kullanıcısı olması nedeniyle, Platform entegrasyonu kapsamında Müşteri&apos;ye ait finansal ve muhasebesel verilere erişebileceğini ve bu verilere ilişkin ayrıca bir onaya ihtiyaç bulunmadığını kabul eder.</p>
        <p>İşbu Sözleşme kapsamındaki Hizmetler&apos;den yararlanabilmek için Müşteri&apos;nin, ilgili mevzuattaki istisnalar saklı kalmak kaydıyla, 18 yaşını doldurmuş olması gerekmektedir. Müşteri&apos;nin gerçek kişi olması hâlinde, Sözleşme&apos;nin onaylanması ile 18 yaşını doldurduğu kabul edilir.</p>
        <p>Müşteri, ödeme sırasında kullanılan kredi/banka kartının geçerli olduğunu ve ödeme için gerekli yetkilendirmenin verildiğini kabul eder. Sanal cüzdan veya sanal kart kullanımı hâlinde de aynı hükümler geçerlidir.</p>
        <p>Müşteri ve Yetkili Kullanıcılar, Platform erişim bilgilerinin gizliliğini sağlamakla yükümlüdür. Bu bilgilerin üçüncü kişilerce ele geçirildiğinin öğrenilmesi hâlinde derhal Piri&apos;ye bildirim yapılacaktır.</p>
        <p>Müşteri, Hizmetler&apos;den faydalanabilmek için gerekli tüm teknik ve donanımsal altyapıyı sağlamakla yükümlüdür.</p>
        <p>Taraflar, işbu Sözleşme&apos;nin hiçbir hükmünün taraflar arasında temsil, acentelik, ortaklık veya benzeri bir ilişki doğurmadığını kabul eder.</p>
        <p>Piri, doğrudan kendisi tarafından sunulmayan Muhasebe Hizmetleri, e-İmza Hizmetleri ve benzeri Ürün ve Hizmetler bakımından; hizmetin kalitesi, sonucu veya eksiksiz ifası konusunda herhangi bir garanti veya taahhütte bulunmaz.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Mobil Uygulama Kullanımına İlişkin Hükümler</h3>
        <p>Uygulama&apos;nın aktivasyonu için, Müşteri tarafından talep edilen üyelik bilgilerinin girilmesi, Müşteri&apos;ye ait cep telefonu numarasına gönderilecek tek kullanımlık aktivasyon kodunun doğrulanması ve Müşteri tarafından belirlenecek Uygulama şifresinin oluşturulması gerekmektedir.</p>
        <p>Aktivasyon işleminin başarıyla tamamlanmasını takiben, Uygulama ile Müşteri&apos;nin mobil cihazı arasında eşleştirme işlemi gerçekleştirilecek olup, Müşteri, Uygulama&apos;ya yalnızca belirlediği Uygulama şifresi ile erişim sağlayarak işlem yapabilecektir.</p>
        <p>Uygulama şifresinin unutulması hâlinde, Müşteri Uygulama içerisinde yer alan &quot;Şifremi Unuttum&quot; seçeneğini kullanarak yeni bir şifre oluşturabilecektir.</p>
        <p>Piri ve/veya ilgili iş ortakları; mevzuata uygun olmak kaydıyla, Uygulama aktivasyon sürecini ve Uygulama&apos;ya erişime ilişkin adımları her zaman tek taraflı olarak değiştirme hakkına sahiptir. Bu kapsamda, Müşteri&apos;nin Uygulama&apos;yı kullanmaya devam edebilmesi için farklı veya ilave bilgi ve/veya doğrulama yöntemlerinin talep edilmesi mümkündür.</p>
        <p>Uygulama&apos;ya tanımlı cep telefonu numarasının değiştirilmesi, mobil cihazın kaybolması veya çalınması hâllerinde, Müşteri durumu derhal Uygulama çağrı merkezi aracılığıyla Piri&apos;ye ve/veya ilgili iş ortaklarına bildirmekle yükümlüdür. Uygulama aktivasyonu, Uygulama çağrı merkezi üzerinden iptal edilebilir. Müşteri&apos;nin söz konusu bildirimleri yapmaması veya gerekli güncellemeleri gerçekleştirmemesi hâlinde doğabilecek tüm zarar ve sonuçlardan münhasıran Müşteri sorumlu olup, bu kapsamda Piri&apos;ye herhangi bir talep yöneltemez.</p>
        <p>Uygulama&apos;nın kullanıldığı mobil cihazda yer alan tüm yazılımların (işletim sistemi dâhil) güncel tutulması, mobil cihazın yetkisiz erişimlere karşı en güncel antivirüs ve antispyware yazılımları ile korunması ve şifre bilgilerinin üçüncü kişilerce ele geçirilmesini önleyici her türlü teknik tedbirin alınması münhasıran Müşteri&apos;nin sorumluluğundadır. Bu yükümlülüklere aykırılıktan doğan her türlü zarardan Müşteri sorumlu olup, Piri&apos;ye herhangi bir talepte bulunamaz.</p>
        <p>Müşteri, Uygulama üzerinden gerçekleştirilen ödeme ve diğer tüm işlemlerden, Uygulama&apos;nın kullanımından ve Uygulama aracılığıyla paylaştığı her türlü bilgi ve içerikten münhasıran sorumludur. Paylaşılan bilgi ve içeriklerin içeriği ve doğruluğuna bağlı olarak ortaya çıkabilecek her türlü talep, zarar ve iddia Piri tarafından Müşteri&apos;ye iletilebilir ve/veya Müşteri&apos;ye rücu edilebilir.</p>
        <p>Müşteri; Uygulama&apos;da yapılacak bakım, iyileştirme, güncelleme ve benzeri değişikliklerin uygulanabilmesi amacıyla, Uygulama&apos;ya erişimin geçici olarak engellenebileceğini kabul eder. Ayrıca, Müşteri&apos;nin Uygulama ve/veya mobil cihaz yazılımlarının güncel sürümlerini kullanmaması nedeniyle Uygulama&apos;dan beklenen verimin alınamaması, kesintiler yaşanması veya teknik aksaklıklar meydana gelmesi hâllerinde, Piri&apos;ye karşı herhangi bir talepte bulunamayacağını kabul, beyan ve taahhüt eder.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Ücret, Faturalandırma ve Ödeme Koşulları</h3>
        <p>İşbu Sözleşme kapsamında, aylık veya yıllık sabit ücretler ya da ilgili paketler için belirlenen ücretler dışında; diğer Ürün ve Hizmetler bakımından Müşteri&apos;den farklı tutarlarda ücretler tahsil edilebilir. Müşteri&apos;ye sunulan Ürün ve Hizmetler&apos;e ilişkin güncel ücret ve paket detaylarına {PIRI_SITE}/ adresinden ulaşılabilir. İlgili tutarlar, Müşteri tarafından Platform&apos;a tanımlanan kredi/banka kartından otomatik olarak tahsil edilir. Müşteri&apos;nin Piri tarafından belirlenen ve ilan edilen toplu paketlerden yararlanmak istemesi hâlinde paket toplam bedeli; aylık hizmet alınması hâlinde ilgili ayın bedeli, yıllık hizmet alınması hâlinde ise yıllık bedel, ilgili döneme ilişkin Ürün ve Hizmetler sunulmaya başlanmadan önce peşin olarak tahsil edilir.</p>
        <p>Müşteri&apos;den tahsil edilen sabit ücretler dışında; Muhasebe Hizmetleri kapsamında, Gelir İdaresi Başkanlığı tarafından yayımlanan serbest muhasebecilik asgari ücret tarifesinde yer alan Tablo I ve Tablo II kapsamı dışında kalan işlemler ile tarifenin açıklayıcı notlarında ek ücrete tabi olduğu belirtilen işlemler için ayrıca ücret tahsil edilir. Müşteri, bu kapsamdaki ek ücretlerin Platform&apos;a tanımladığı kart hesabından otomatik olarak tahsil edilebileceğini bildiğini ve kabul ettiğini beyan eder.</p>
        <p>Müşteri, Ürün ve Hizmetler&apos;in kesintisiz şekilde sunulabilmesi için önceki dönemlere ve içinde bulunulan döneme ilişkin tüm ödemelerini eksiksiz ve zamanında yapmakla yükümlüdür. Aksi hâlde Piri; Ürün ve Hizmetler&apos;in sunumunu geçici veya Müşteri olarak durdurma ya da iş ortaklarından durdurulmasını talep etme hakkına sahiptir. Otomatik tahsilatın gerçekleştirilemediği tarih itibarıyla ödeme yapılmamış kabul edilir ve ek süre tanınmaz. Ödenmeyen tutarlar için yasal takibe başvurulması hâlinde, yasal faiz, avukatlık ücretleri ve diğer tüm masraflar Müşteri&apos;ye ait olacaktır.</p>
        <p>Piri; Muhasebe Hizmetleri&apos;ne ilişkin ücretler hariç olmak üzere, Sözleşme&apos;nin yenilendiği her yıl ve/veya uygun gördüğü diğer zamanlarda, Müşteri&apos;ye işbu Sözleşme&apos;de öngörülen yöntemlerle bildirim yapmak suretiyle Ürün ve Hizmet bedellerini tek taraflı olarak değiştirme hakkına sahiptir. Bu değişiklikler için Müşteri&apos;nin ayrıca onayı aranmaz.</p>
        <p>Bedel değişiklikleri; paket kullanımında paket bitimini takiben, aylık hizmetlerde değişikliğin yapıldığı ayı izleyen ilk tahsilattan itibaren, yıllık hizmetlerde ise ilgili yılın sona ermesiyle uygulanır. Muhasebe Hizmetleri&apos;ne ilişkin ücret değişikliklerinde 8.2. madde hükümleri saklıdır.</p>
        <p>Müşteri&apos;den tahsil edilecek ödemeler; Piri&apos;nin birlikte çalıştığı, ilgili mevzuat kapsamında yetkili ve lisanslı elektronik para ve ödeme kuruluşları aracılığıyla gerçekleştirilir. Piri, Müşteri&apos;ye ait kart ve şifre bilgilerini kendi altyapısında saklamaz.</p>
        <p>Herhangi bir sebeple banka ve/veya finans kuruluşu tarafından başarısız kodu gönderilen ancak banka ve/veya finans kuruluşu tarafından Aracı Hizmet Sağlayıcı&apos;ya yapılan ödemelere ilişkin Aracı Hizmet Sağlayıcı&apos;nın herhangi bir sorumluluğu bulunmayacaktır.</p>
        <p>Sanal Cüzdan Hizmetleri kapsamında tahsis edilen sanal kartlar veya Müşteri tarafından tanımlanan kartlar üzerinden ödeme yapılabilir. İlgili ödeme hizmetinin sunulmasından ödeme kuruluşları sorumlu olup, bu kapsamda Piri&apos;nin herhangi bir sorumluluğu bulunmamaktadır.</p>
        <p>Sözleşme kapsamında herhangi bir nedenle Müşteri&apos;ye bedel iadesi yapılması gereken durumlarda, Müşteri, ödemeyi kredi kartı ile yapmış olması halinde, kredi kartına iade edilen tutarın banka tarafından Müşteri hesabına yansıtılmasına ilişkin ortalama sürecin 2 (iki) ile 3 (üç) haftayı bulabileceğini, bu tutarın Müşteri&apos;nin hesaplarına yansıması halinin tamamen Banka işlem süreci ile ilgili olduğunu ve olası gecikmelerde Banka&apos;nın sorumlu olduğunu ve bunlar için Aracı Hizmet Sağlayıcı&apos;yı ve Hizmet Sağlayıcı&apos;yı sorumlu tutamayacağını kabul, beyan ve taahhüt eder.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Sözleşmenin Süresi ve Feshi</h3>
        <p>İşbu Sözleşme; Sözleşme&apos;nin Platform&apos;da yer alan metninin Müşteri tarafından elektronik ortamda onaylanması ile birlikte kurulmuş sayılır; Hizmetler&apos;in fiilen sunulduğu süre zarfında yürürlükte kalacak olup, Hizmetler&apos;in sunulmasının tamamlanması ile kendiliğinden sona erecektir.</p>
        <p>İşbu Sözleşme, aylık olarak sürekli hizmet sunumu olarak devam eden Hizmet&apos;in satın alınması halinde, ilgili ayın sonunda bir sonraki ay paket yenilenmeyecek şekilde Platform üzerinden Müşteri tarafından feshedilebilir. Tek seferlik alınan hizmetler Müşteri&apos;ye özgü işlemler ve çalışma gerektirdiğinden, Sözleşme feshedilse dahi aşağıdaki hüküm ve şartlar uygulanacaktır.</p>
        <p>Ürün ve Hizmetler&apos;den aylık ücret karşılığında yararlanan Müşteri&apos;nin, işbu Sözleşme&apos;yi herhangi bir haklı neden olmaksızın feshetmesi hâlinde, fesih tarihinin içinde bulunduğu aya ait ücret Müşteri&apos;den tahsil edilir.</p>
        <p>Ürün ve Hizmetler&apos;den toplu paket satın alarak yararlanan Müşteri&apos;nin, işbu Sözleşme&apos;yi haklı bir neden olmaksızın feshetmesi hâlinde, ilgili paketin kalan süresi de dâhil olmak üzere o ana kadar ödenmiş bulunan hiçbir bedel Müşteri&apos;ye iade edilmez.</p>
        <p>Ürün ve Hizmetler&apos;i yıllık olarak satın alan ve işbu Sözleşme&apos;yi ilgili hizmet yılı dolmadan önce sona erdiren veya sona ermesine sebebiyet veren Müşteri&apos;ye herhangi bir ücret iadesi yapılmaz. Ürün ve Hizmetler&apos;den yıllık bazda toplu paket kapsamında yararlanan Müşteriler bakımından da, fesih hâlinde ödenmiş bedellerin iadesi talep edilemez.</p>
        <p>Muhasebe Hizmetleri Sözleşmesi kapsamında meydana gelen herhangi bir durum, işlem veya ihlal; işbu Sözleşme&apos;nin ihlali olarak kabul edilmez ve işbu Sözleşme&apos;nin ihlaline sebebiyet vermez. Bu gibi durumlarda Müşteri, Piri ile işbu Sözleşme&apos;de belirtilen iletişim kanalları aracılığıyla iletişime geçer; Piri, çözüm sağlanması amacıyla makul ölçülerde destek sunar. Ancak her hâlükârda, Muhasebe Hizmetleri Sözleşmesi işbu Sözleşme&apos;den ayrı ve bağımsızdır.</p>
        <p>Sebebi ne olursa olsun işbu Sözleşme&apos;nin sona ermesi hâlinde; Muhasebe Hizmetleri&apos;nin, Piri dışında mevzuat uyarınca yetkili üçüncü kişiler tarafından sunulması nedeniyle, Müşteri, ilgili Muhasebe Hizmetleri Sözleşmesi&apos;ni de sona erdirmekle yükümlüdür. Bu kapsamda Müşteri; Piri&apos;nin yönlendirmeleri doğrultusunda, Muhasebe Hizmetleri Sözleşmesi&apos;nin sona erdirilmesi için gerekli bilgi ve belgeleri temin eder, gerekli formları imzalar ve/veya ilgili üçüncü kişilere gönderir ya da tebliğ eder.</p>
        <p>Sebebi ne olursa olsun, Müşteri&apos;ye Muhasebe Hizmetleri sunan yetkili üçüncü kişinin Piri ile olan ticari ilişkisinin sona ermesi hâlinde, Müşteri ile söz konusu üçüncü kişi arasında akdedilmiş Muhasebe Hizmetleri Sözleşmesi, Muhasebe Hizmetleri sunmaya yetkili başka bir üçüncü kişiye devredilebilir. Müşteri; bu devir işlemlerinin gerçekleştirilebilmesi için gerekli sözleşme devirlerini yapacağını, ilgili belge ve formları gecikmeksizin imzalayacağını ve bildirim süreçlerinde Piri ile iş birliği içinde hareket edeceğini kabul ve beyan eder.</p>
        <p>Platform kapsamında akdedilen sözleşmelere herhangi bir aykırılık bulunmasa dahi, Müşteri&apos;nin Platform&apos;u kullanma amacının hukuka veya ahlaka aykırı olduğunun tespit edilmesi hâlinde, Piri ve/veya iş ortakları, Müşteri&apos;nin işbu Sözleşme&apos;sini ve Platform kapsamında sunulan tüm Hizmetler&apos;e ilişkin sözleşmeleri feshetme hakkına sahiptir. Bu durumda Piri&apos;nin sözleşmeden ve mevzuattan doğan tazminat ve rücu hakları saklıdır. Doğan veya doğacak tüm doğrudan ve dolaylı zararlardan Müşteri sorumludur.</p>
        <p>Piri; Müşteri&apos;nin işbu Sözleşme&apos;yi veya Platform üzerinden sunulan diğer hizmetlere ilişkin kural ve sözleşmeleri ihlal etmesi hâlinde ve özellikle aşağıda sayılan durumlarda, herhangi bir bildirimde bulunmaksızın, tek taraflı ve tazminatsız olarak işbu Sözleşme&apos;yi feshedebilir:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Müşteri&apos;nin, herhangi bir yöntemle Platform&apos;un işleyişini manipüle etmeye yönelik davranışlarda bulunması,</li>
          <li>Müşteri&apos;nin işbu Sözleşme&apos;yi ve/veya Platform kapsamında akdedilen diğer sözleşmeleri ihlal etmesi,</li>
          <li>Müşteri&apos;nin üçüncü kişilerin haklarını ihlal eden fiillerde bulunması,</li>
          <li>Müşteri&apos;nin Platform&apos;da veya Piri ile paylaştığı bilgi, içerik, görsel ve yazıların hukuka aykırı olması ya da hukuka ve ahlaka aykırı amaçlarla paylaşılması.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Fikri Mülkiyet Hakları</h3>
        <p>Platform&apos;da yer alan ve bunlarla sınırlı olmamak üzere; her türlü yazılım, kaynak kodu, algoritma, tasarım, arayüz, görsel, iş modeli, veri tabanı, içerik, metin, fotoğraf, marka, alan adı, know-how ile fikrî ve/veya ticari hak doğuran veya doğurabilecek tüm unsurlar üzerindeki fikrî mülkiyet hakları, mülkiyet ve menfaatler münhasıran Piri&apos;ye aittir.</p>
        <p>Platform&apos;da, işbu Sözleşme&apos;de ve/veya Platform içeriklerinde yer alan hiçbir hüküm; söz konusu hakların herhangi birinin veya bir kısmının Müşteri&apos;ye devredildiği, lisanslandığı ya da Müşteri lehine kazanılmış hak oluşturduğu şeklinde yorumlanamaz.</p>
        <p>İşbu Sözleşme kapsamında Müşteri&apos;ye; yalnızca Ürün ve Hizmetler&apos;den yararlanabilmesi amacıyla, kişiye özel, dünya çapında geçerli, devredilemez, alt lisans verilemez ve münhasır olmayan sınırlı bir son kullanıcı lisansı tanınmaktadır.</p>
        <p>Müşteri, Platform&apos;u yalnızca işbu Sözleşme&apos;de belirtilen amaçlar doğrultusunda kullanabilir. Müşteri, Platform&apos;u, Platform&apos;da yer alan herhangi bir içeriği, veriyi, bilgiyi veya görseli; başka bir amaçla kullanamaz, kopyalayamaz, çoğaltamaz, dağıtamaz, iletemez, değiştiremez, uyarlayamaz, tersine mühendislik, kaynak koda erişim, sistem çözümleme veya benzeri yöntemlerle Platform&apos;un altyapısına, kaynak koduna veya dizinine erişmeye yönelik herhangi bir işlem gerçekleştiremez.</p>
        <p>Müşteri; Piri&apos;nin ve/veya bağlı ortaklıklarının ticaret unvanını, markasını, hizmet markasını, logosunu, alan adını, ticari adını veya ayırt edici diğer unsurlarını, Piri&apos;nin önceden verilmiş yazılı izni olmaksızın, hiçbir suretle ve hiçbir amaçla kullanamaz, tescil ettiremez, taklit edemez veya bu unsurlar üzerinde herhangi bir hak iddiasında bulunamaz.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Cayma Hakkı</h3>
        <p>İşbu Sözleşme kapsamında Cayma Hakkı tüketici olan Müşteriler için geçerli olacaktır.</p>
        <p>Müşteri, işbu Sözleşme kapsamında Platform üzerinden yararlanmak üzere satın aldığı Ürün ve/veya Hizmetler bakımından; tek işlem kapsamında veya ayrı ayrı sunulan Ürün ve/veya Hizmetler&apos;de, ilgili Ürün, dijital içerik veya Hizmet&apos;in kullanımının başlatıldığı tarihten itibaren on dört (14) gün içerisinde, herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin işbu Sözleşme&apos;den cayma hakkına sahiptir.</p>
        <p>Cayma hakkının kullanılabilmesi için, cayma süresi içerisinde; caymaya konu Ürün ve/veya Hizmetler&apos;e ilişkin bilgiler ile Müşteri&apos;nin iletişim bilgilerini içerecek şekilde, Piri&apos;nin Platform&apos;da belirtilen iletişim kanalları aracılığıyla, yazılı olarak veya Müşteri veri saklayıcısı (elektronik posta, Platform içi bildirim vb.) yoluyla bildirimde bulunulması gerekmektedir.</p>
        <p>Müşteri tarafından, Platform üzerinden sunulmuş olması hâlinde, cayma bildirimi formunun doldurularak iletilmesi de geçerli bir cayma bildirimi olarak kabul edilir.</p>
        <p>Müşteri; Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. maddesinde sayılan hâller başta olmak üzere, aşağıdaki durumlarda cayma hakkının bulunmadığını kabul eder:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Müşteri&apos;nin açık talebi üzerine, cayma süresi sona ermeden Hizmet&apos;in ifasına başlanan Ürün ve Hizmetler,</li>
          <li>Müşteri&apos;nin istekleri veya kişisel ihtiyaçları doğrultusunda kişiselleştirilen, özel olarak hazırlanan veya yapılandırılan Ürün ve/veya Hizmetler,</li>
          <li>Niteliği gereği geri alınması mümkün olmayan veya kişiye özel sunulan Ürün ve/veya Hizmetler,</li>
          <li>Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen ve Piri&apos;nin kontrolünde olmayan Ürün ve/veya Hizmetler.</li>
        </ul>
        <p>Bu kapsamda, Ürün ve/veya Hizmetler fiilen kullanılmamış olsa dahi, kişiselleştirilmiş veya ifasına başlanmış Hizmetler bakımından cayma hakkı bulunmamaktadır.</p>
        <p>Müşteri&apos;nin cayma hakkını usulüne uygun şekilde kullanması hâlinde, Piri tarafından cayma bildiriminin alınmasını takiben yapılacak değerlendirme sonucunda iade onayı verilmesi durumunda, caymaya konu Ürün ve/veya Hizmetler&apos;e ilişkin olarak Müşteri&apos;den tahsil edilmiş bulunan bedeller, cayma bildiriminin Piri&apos;ye ulaştığı tarihten itibaren en geç on dört (14) gün içerisinde, ödemenin gerçekleştirildiği banka veya ödeme kuruluşuna iade edilir. İlgili bedelin banka veya ödeme kuruluşuna iade edilmesinden sonra, tutarın Müşteri&apos;nin hesabına yansıması, tamamen Müşteri ile banka veya ödeme kuruluşu arasındaki sözleşmesel ilişkiye bağlı olup; bedelin banka veya ödeme kuruluşuna iade edilmesiyle birlikte Piri&apos;nin iade sürecine ilişkin sorumluluğu sona erer. Ödemenin havale/EFT yöntemiyle yapılmış olması hâlinde ise, Müşteri&apos;den banka hesap bilgileri talep edilir. Müşteri tarafından banka hesap bilgilerinin iletilmesini takiben, iade bedeli işbu maddede belirtilen süre içerisinde, fatura adresinde yer alan kişi adına veya Müşteri hesabı sahibine ait banka hesabına havale/EFT yoluyla gerçekleştirilir.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Diğer Hükümler ve Genel Şartlar</h3>
        <p>Platform üzerinden sunulan Hizmetler&apos;den yararlanmak isteyen kişiler, Platform&apos;un ilgili bölümünde talep edilen bilgileri eksiksiz ve doğru şekilde doldurmak suretiyle Müşteri olma başvurusunda bulunur. Müşteri&apos;nin Platform&apos;a kayıt sırasında bildirdiği elektronik posta adresi ve diğer iletişim bilgilerinin güncel olması zorunludur. Taraflar arasındaki yazışmalarda ve bildirimlerde esas alınacak iletişim bilgisi bu elektronik posta adresidir. Gerekli bilgilerin iletilmesini takiben, Piri tarafından kayıt işlemlerinin tamamlanması hâlinde ilgili kişi Müşteri sıfatını kazanır.</p>
        <p>İşbu Sözleşme ve Platform üzerinden sunulan Hizmetler kapsamında tanınan hak ve yetkiler, 18 yaşından küçük kişiler tarafından kullanılamaz. Müşteri&apos;nin gerçek kişi olması hâlinde, işbu Sözleşme&apos;nin onaylanması ile Müşteri&apos;nin 18 yaşını doldurmuş olduğu kabul edilir. Müşteri&apos;nin 18 yaşından küçük olması hâlinde, Sözleşme&apos;nin onaylanması ile veli ve/veya vasisinin izin verdiği varsayılır.</p>
        <p>Müşteri&apos;nin tüzel kişi olması hâlinde ise, Sözleşme&apos;nin onaylanması ile Müşteri&apos;nin kendi tabi olduğu hukuk düzeni uyarınca usulüne uygun şekilde kurulmuş ve faal olduğu, işbu Sözleşme&apos;yi akdetmeye yetkili bulunduğu ve Sözleşme&apos;yi onaylayan temsilcisinin gerekli yetkilere sahip olduğu kabul ve taahhüt edilir. Piri&apos;nin, tüzel kişi adına Sözleşme&apos;yi akdeden kişinin temsil yetkisini araştırma yükümlülüğü bulunmamaktadır.</p>
        <p>Müşteri; Piri&apos;nin yürürlükteki emredici mevzuat hükümleri ve Platform&apos;da yayımlanan Gizlilik Politikası uyarınca, yetkili kamu kurum ve kuruluşları tarafından usulüne uygun şekilde talep edilmesi hâlinde, Müşteri&apos;ye ait gizli, özel veya ticari bilgileri resmi makamlara açıklamaya yetkili olduğunu kabul eder. Bu kapsamda yapılacak açıklamalar nedeniyle Piri&apos;den her ne nam altında olursa olsun tazminat talep edilemeyeceğini Müşteri kabul, beyan ve taahhüt eder.</p>
        <p>Müşteri&apos;nin Platform aracılığıyla Hizmetler&apos;den yararlanabilmek amacıyla kullandığı sisteme erişim araçlarının (kullanıcı adı, şifre ve benzeri bilgiler) güvenliği, gizliliği ve üçüncü kişilerin erişiminden korunması tamamen Müşteri&apos;nin sorumluluğundadır. Müşteri&apos;ye ait kullanıcı adı ve şifre ile gerçekleştirilen tüm işlemler, Müşteri tarafından gerçekleştirilmiş kabul edilir. Bu kapsamda doğan veya doğabilecek zararlardan Piri&apos;nin doğrudan veya dolaylı herhangi bir sorumluluğu bulunmaz. Piri&apos;nin rücu hakkı saklıdır.</p>
        <p>Müşteri; Platform üzerinde kendisi tarafından sağlanan her türlü bilgi ve içeriğin doğru, güncel ve hukuka uygun olduğunu kabul, beyan ve taahhüt eder. Piri&apos;nin, Müşteri tarafından iletilen veya Platform&apos;a yüklenen bilgi ve içeriklerin doğruluğunu, güvenliğini veya hukuka uygunluğunu araştırma, denetleme veya garanti etme yükümlülüğü bulunmamaktadır. Bu bilgi ve içeriklerden kaynaklanan her türlü doğrudan veya dolaylı zarar ve talepten münhasıran Müşteri sorumludur. Piri&apos;nin rücu hakkı saklıdır.</p>
        <p>İşbu Sözleşme veya Platform üzerinden sunulan Hizmetler&apos;e ilişkin olarak Piri veya İş Ortakları ile akdedilen sözleşmelerde yer alan özel sorumluluk hükümleri saklı kalmak kaydıyla, Müşteri Platform üzerinden gerçekleştirdiği tüm iş ve işlemlerin hukuka uygunluğundan münhasıran sorumludur.</p>
        <p>Müşteri; Piri&apos;nin ve/veya İş Ortakları&apos;nın ticari, şahsi, fikrî mülkiyet veya malvarlığı haklarını ihlal edecek şekilde Platform&apos;da yer alan metinleri, görselleri, verileri, içerikleri, veri tabanlarını, katalogları ve benzeri unsurları çoğaltmayacağını, kopyalamayacağını, yaymayacağını, işlemeyeceğini kabul eder. Müşteri ayrıca, bu yollarla veya başka herhangi bir suretle Piri ile doğrudan veya dolaylı rekabet etmeyeceğini kabul, beyan ve taahhüt eder.</p>
        <p>Piri, Platform&apos;da sunulan Hizmetler ve içerikler üzerinde değişiklik yapma, güncelleme veya kaldırma hakkını saklı tutar. Müşteri, bu değişiklik veya iptaller nedeniyle uğradığı veya uğrayabileceği zararlardan dolayı Piri&apos;den herhangi bir tazminat talebinde bulunamayacağını kabul eder.</p>
        <p>İşbu Sözleşme&apos;nin herhangi bir hükmü herhangi bir nedenle geçersiz veya ifa edilemez duruma gelir veya sayılır ise bu durum kalan diğer hükümlerin yasallığını, geçerliliğini ve ifa kabiliyetini etkilemeyecek veya ortadan kaldırmayacak ve diğer hüküm ve koşullar yasal, geçerli ve ifa edilebilir olmaya devam edecektir.</p>
        <p>Taraflar&apos;ın işbu Sözleşme&apos;den ya da kanundan doğan haklarını kullanmamış olmaları, bu haklarından vazgeçmiş olmaları anlamına gelmez ya da bu şekilde yorumlanamaz.</p>
        <p>Grev, lokavt, siber saldırı, savaş, terör eylemleri, doğal afetler ve benzeri Taraflar&apos;ın kontrolü dışında gelişen hâller mücbir sebep olarak kabul edilir. Mücbir sebep süresince Taraflar yükümlülüklerini yerine getirememelerinden dolayı sorumlu tutulamaz. Mücbir sebep hâlinin 90 (doksan) günden fazla sürmesi hâlinde, diğer Taraf Türk Ticaret Kanunu m.18/3 uyarınca bildirim yapmak suretiyle Sözleşme&apos;yi feshedebilir.</p>
        <p>Piri, Müşteri ile Müşteri&apos;nin bildirdiği elektronik posta adresleri ve/veya Platform üzerinden iletişim kurar. Bu yollarla yapılan bildirimler yazılı bildirim hükmündedir. Müşteri, iletişim bilgilerini güncel tutmak ve Platform&apos;daki bildirimleri düzenli olarak takip etmekle yükümlüdür.</p>
        <p>Müşteri, işbu Sözleşme&apos;den doğan hak ve yükümlülüklerini, Piri&apos;nin önceden verilmiş yazılı izni olmaksızın üçüncü kişilere devredemez veya temlik edemez. Aksi hâlde Piri, Sözleşme&apos;yi derhal ve haklı nedenle feshedebilir.</p>
        <p>İşbu Sözleşme&apos;de belirtilen adresler Taraflar&apos;ın Tebligat Kanunu uyarınca geçerli tebligat adresleridir. Adres değişiklikleri yazılı olarak bildirilmediği sürece, mevcut adreslere yapılan tebligatlar geçerli sayılır.</p>
        <p>Piri&apos;nin ticari defter ve kayıtları, bilgisayar kayıtları, e-posta yazışmaları ve sair belgeler kesin delil niteliğindedir.</p>
        <p>İşbu Sözleşme Türk Hukuku&apos;na tabidir. Uyuşmazlıklarda İzmir Mahkemeleri ve İcra Daireleri münhasıran yetkilidir.</p>
        <p className="font-semibold">Yalnızca Tüketici olan Müşteriler için:</p>
        <p>İşbu Sözleşme&apos;den kaynaklanabilecek ihtilaflarda, Ticaret Bakanlığı tarafından ilan edilen değere kadar tüketicinin yerleşim yerinin bulunduğu veya işbu Sözleşme&apos;nin ifa edildiği yerdeki Tüketici Hakem Heyetleri, bu değerin üzerindeki ihtilaflarda Tüketici Mahkemeleri yetkilidir. Tüketici Mahkemesi bulunmayan yerlerde Asliye Hukuk Mahkemeleri yetkilidir.</p>
        <p>İşbu Sözleşme, Platform üzerinden elektronik ortamda onaylanarak akdedilmiş olup, Müşteri tarafından Platform&apos;daki ilgili bölümden erişilebilir durumdadır. Piri, işbu Sözleşme&apos;yi yürürlük tarihinden itibaren üç (3) yıl süreyle elektronik ortamda saklar ve Müşteri&apos;nin talebi hâlinde, mevzuat kapsamında Müşteri ile paylaşır.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">Ticari Elektronik İleti Onayı</h3>
        <p>Piri; Müşteri&apos;nin kendisiyle paylaştığı cep telefonu numarası, elektronik posta adresi ve diğer iletişim bilgileri üzerinden; kampanya, tanıtım, promosyon, reklam, anket ve müşteri memnuniyetine yönelik bilgilendirmeler yapmak amacıyla Müşteri ile iletişime geçebilir. Müşteri, bu kapsamda kendisiyle ticari elektronik ileti kurulmasına onay verdiğini kabul eder. Müşteri, dilediği zaman bu iletileri almak istemediğini Piri&apos;ye bildirebilir.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">EK: CAYMA FORMU (Yalnızca Tüketiciler için)</h3>
        <p>(Bu form, sadece cayma hakkı kullanılmak istenildiğinde doldurup gönderilecektir.)</p>
        <p><strong>Aracı Hizmet Sağlayıcı:</strong> {PIRI_UNVAN}</p>
        <p><strong>Adresi:</strong> {PIRI_ADRES}</p>
        <p><strong>Telefon:</strong> -</p>
        <p><strong>Faks:</strong> -</p>
        <p><strong>E – Posta:</strong> -</p>
        <p className="mt-4">Bu formla aşağıdaki malların satışına veya hizmetlerin sunulmasına ilişkin Sözleşme&apos;den cayma hakkımı kullandığımı beyan ederim.</p>
        <p><strong>Cayma Hakkına Konu Ürün/Hizmet:</strong> -</p>
        <p><strong>Cayma Hakkına Konu Ürün/Hizmetin Bedeli:</strong> -</p>
        <p><strong>Müşteri&apos;nin Adı ve Soyadı:</strong> {musteriAdSoyad}</p>
        <p><strong>Müşteri&apos;nin Adresi:</strong> {musteriAdres}</p>
        <p><strong>Müşteri&apos;nin İmzası:</strong> (Sadece kağıt üzerinde gönderilmesi halinde)</p>
        <p><strong>Tarih:</strong> -</p>
      </section>
    </div>
  );
}
