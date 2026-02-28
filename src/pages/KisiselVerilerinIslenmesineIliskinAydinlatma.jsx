import { motion } from "framer-motion";

export default function KisiselVerilerinIslenmesineIliskinAydinlatma() {
  return (
    <div className="bg-white">
      <section className="relative pt-28 pb-16 bg-work-navy-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(74,222,128,0.45),transparent_55%)]" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_80%_15%,rgba(56,189,248,0.35),transparent_55%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Kişisel Verilerin İşlenmesine İlişkin Aydınlatma ve Rıza Metni
          </motion.h1>
          <p className="text-emerald-100 mt-3 max-w-3xl">
            Bu metin, PİRİ DİJİTAL tarafından kişisel verilerinizin işlenmesine, saklanmasına, aktarılmasına ve ticari
            elektronik iletilere ilişkin aydınlatma ve açık rıza beyanlarınızı içermektedir.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <div className="container mx-auto px-6 max-w-5xl space-y-10 text-sm md:text-base leading-relaxed text-gray-800">
          <div className="bg-white rounded-3xl border shadow-lg p-6 md:p-10 space-y-8">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-2">
              KİŞİSEL VERİLERİN İŞLENMESİNE İLİŞKİN AYDINLATMA VE RIZA METNİ
            </h2>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Veri Sorumlusu</h3>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;Kanun&quot;) uyarınca, kişisel verileriniz; veri
                sorumlusu sıfatıyla PİRİ DİJİTAL ANONİM ŞİRKETİ (&quot;PİRİ DİJİTAL&quot; veya &quot;Veri Sorumlusu&quot;)
                tarafından <strong>www.piri.tr/</strong> internet sitesi (İnternet sitelerinin hepsi birlikte &quot;Site&quot;
                olarak anılacaktır.) üzerinden aşağıda açıklanan kapsamda işlenebilecektir.
              </p>
              <p>
                Kişisel verilerin işlenmesine ilişkin kapsamlı açıklamalar için lütfen PİRİ DİJİTAL Kişisel Verilerin
                Korunması ve Gizlilik Politikası’nı inceleyiniz.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Kişisel Verileri Toplama Yöntemleri ve Hukuki Sebepleri
              </h3>
              <p>
                PİRİ DİJİTAL, kişisel verileri doğrudan veri sahibinden otomatik yöntemlere ek olarak, otomatik olmayan
                yollarla (fotoğraf ve video cihazları, e-posta, posta, faks, internet sitesi ve sair iletişim kanalları
                aracılığıyla) yazılı, sözlü veya elektronik olarak toplamaktadır. Belirtilen yollarla toplanan kişisel
                verileriniz Kanun tarafından öngörülen temel ilkelere uygun olarak, Kanun’un 5. ve 6. maddeleri uyarınca
                aşağıdaki hukuki sebepler doğrultusunda açık rızanız olmaksızın işlenebilecektir:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Kanunlarda açıkça öngörülmesi;</li>
                <li>
                  Fiili imkânsızlık nedeniyle rızasını açıklayamayacak durumda bulunan veya rızasına hukuki geçerlilik
                  tanınmayan kişinin kendisinin ya da bir başkasının hayatı veya beden bütünlüğünün korunması için zorunlu
                  olması;
                </li>
                <li>
                  Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına
                  ait kişisel verilerin işlenmesinin gerekli olması (örn. sözleşme kuruluş aşamasında kimlik
                  bilgilerinizin işlenmesi);
                </li>
                <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi için zorunlu olması;</li>
                <li>
                  İlgili kişinin kendisi tarafından alenileştirilmiş olması (örn. halka açık sosyal medya platformları veya
                  internet siteleri üzerinden faaliyet alanımıza giren hizmeti temin etmek amacıyla paylaşmış olduğunuz
                  iletişim bilgileriniz aracılığı ile sizinle iletişime geçilmesi);
                </li>
                <li>
                  Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması (örn. dava zamanaşımı
                  süresi boyunca gerekli olabilecek kişisel verilerin saklanması);
                </li>
                <li>
                  İlgili kişinin temel hak ve hürriyetlerine zarar vermemek kaydıyla, Veri Sorumlusu’nun meşru menfaatleri
                  için veri işlemenin zorunlu olması;
                </li>
                <li>Kanunlarda öngörülen hallerde ilgili kişinin açık rızası olmaksızın özel nitelikli verilerin işlenebilmesi.</li>
              </ul>
              <p>
                Kanun’un 6. maddesinin 3. fıkrası uyarınca, özel nitelikli kişisel veriler aşağıdaki şartlar doğrultusunda
                açık rızanız olmaksızın işlenebilecektir:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Kanunlarda açıkça öngörülmesi;</li>
                <li>
                  Fiili imkânsızlık nedeniyle rızasını açıklayamayacak durumda bulunan veya rızasına hukuki geçerlilik
                  tanınmayan kişinin kendisinin ya da bir başkasının hayatı veya beden bütünlüğünün korunması için zorunlu
                  olması;
                </li>
                <li>İlgili kişinin kendisi tarafından alenileştirilmiş olması;</li>
                <li>Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması;</li>
                <li>
                  Sır saklama yükümlülüğü altında bulunan kişiler veya yetkili kurum ve kuruluşlarca, kamu sağlığının
                  korunması, koruyucu hekimlik, tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi ile sağlık
                  hizmetlerinin planlanması, yönetimi ve finansmanı amacıyla gerekli olması;
                </li>
                <li>
                  İstihdam, iş sağlığı ve güvenliği, sosyal güvenlik, sosyal hizmetler ve sosyal yardım alanlarındaki
                  hukuki yükümlülüklerin yerine getirilmesi için zorunlu olması;
                </li>
                <li>
                  Siyasi, felsefi, dini veya sendikal amaçlarla kurulan vakıf, dernek ve diğer kâr amacı gütmeyen kuruluş
                  ya da oluşumların, tâbi oldukları mevzuata ve amaçlarına uygun olmak, faaliyet alanlarıyla sınırlı olmak
                  ve üçüncü kişilere açıklanmamak kaydıyla; mevcut veya eski üyelerine ve mensuplarına veyahut bu kuruluş ve
                  oluşumlarla düzenli olarak temasta olan kişilere yönelik olması.
                </li>
              </ul>
              <p>
                PİRİ DİJİTAL işleme amacı doğrultusunda veri sahibinin gerekli olmayan özel nitelikli kişisel verileri
                sunması halinde, söz konusu özel nitelikli kişisel verileri imha edecek veya maskeleyecektir.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Veri Kategorileri ve Örnek Veri Türleri</h3>
              <p>Aşağıda PİRİ DİJİTAL tarafından işlenebilecek genel veri kategorileri ve örnek veri türleri yer almaktadır:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Kimlik Bilgisi: Ad-Soyadı, Kimlik Numarası vb.</li>
                <li>İletişim Bilgisi: Telefon Numarası, Cep Telefonu Numarası, E-posta Adresi, Adres vb.</li>
                <li>Hukuki İşlem: Tüketici Hakem Heyeti Başvuruları, Dava Dosyaları, İhtarnameler vb.</li>
                <li>Görsel ve İşitsel Kayıtlar: Fotoğraf, Video, Ses Kaydı vb.</li>
                <li>Biyometrik Veriler: Yüz tanıma veya parmak izi kayıt sistemleri aracılığıyla toplanabilecek veriler</li>
                <li>
                  Üye/Kullanıcı İşlem Bilgisi: Üye/Kullanıcı Numarası, Ticari İlişki Başlangıç/Bitiş Tarihi ve Nedeni,
                  Talepler, Tercih Edilen Hizmet Bilgisi, Hizmet Memnuniyet Bilgisi, Hizmet Değişim ve Yenileme Bilgisi,
                  Hizmet Talep/Şikayet Bilgisi, Ev Ölçümleri vb.
                </li>
                <li>Risk Yönetimi: Şüpheli veya risk teşkil eden işlemlere dair veriler</li>
                <li>Güvenlik Verileri: IP Adresi veya Site Giriş Çıkış Kayıtları vb.</li>
                <li>
                  Finans Bilgileri: Banka Bilgisi, IBAN Numarası, Fatura Bilgileri, Banka Hesap Numarası, Havale Numarası vb.
                </li>
                <li>
                  Pazarlama: Tercih Edilen Hizmet Bilgisi, Alışveriş Geçmişi Bilgisi, Anket, Çerez Kayıtları, Hizmet Tercihi
                  vb.
                </li>
              </ul>
              <p>
                PİRİ DİJİTAL, kural olarak özel nitelikli kişisel verileri işlemez. Ne var ki;
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  PİRİ DİJİTAL’in faaliyetleri ve sunduğu hizmetler çerçevesinde, biyometrik verileriniz işlenebilecektir.
                  Bu veriler, mevzuat gereği kimlik tespiti ve bilgi güvenliğinin sağlanması amacıyla toplanacak ve
                  işlenecek, ilgili mevzuatta belirtilen süreler boyunca muhafaza edilecektir.
                </li>
                <li>
                  Biyometrik verileriniz Kişisel Verilerin Korunması Kurulu’nun yayımladığı &quot;Biyometrik Verilerin
                  İşlenmesinde Dikkat Edilmesi Gereken Hususlara İlişkin Rehber&quot; metnine uygun olarak işlenecek ve
                  muhafaza edilecektir.
                </li>
              </ul>
              <p>
                PİRİ DİJİTAL işleme amacı doğrultusunda veri sahibinin gerekli olmayan özel nitelikli kişisel verileri
                sunması halinde, söz konusu özel nitelikli kişisel verileri imha edecek veya maskeleyecektir.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Kişisel Verilerin Hangi Amaçla İşleneceği</h3>
              <p>
                PİRİ DİJİTAL, veri sahibinin kişisel verilerini Kanun’da belirtilen kişisel veri işleme şartlarına uygun
                olarak ve hizmet satışı/sunuşu süreçlerinin yürütülmesi ile hizmet satışı/sunuşu sonrası destek süreçlerinin
                yürütülmesi amaçları başta olmak üzere aşağıda belirtilen amaçlarla doğru orantılı olarak işlemektedir:
              </p>
              <h4 className="font-semibold text-gray-900">Ticari İlişkinin Kurulması ve İfası</h4>
              <p>
                Bilgi güvenliği süreçlerinin yürütülmesi; faaliyetlerin mevzuata uygun yürütülmesi; finans ve muhasebe
                işlerinin yürütülmesi; iletişim faaliyetlerinin yürütülmesi; iş faaliyetlerinin yürütülmesi ve denetimi; iş
                sürekliliğinin sağlanması faaliyetlerinin yürütülmesi; iş süreçlerinin iyileştirilmesine yönelik önerilerin
                alınması ve değerlendirilmesi; dijital pay satışı/sunuşu süreçlerinin yürütülmesi; dijital pay
                satışı/sunuşu sonrası destek hizmetlerinin yürütülmesi; dijital pay operasyon süreçlerinin yürütülmesi;
                Üye/Kullanıcı ilişkileri yönetimi süreçlerinin yürütülmesi; Üye/Kullanıcı memnuniyetine yönelik aktivitelerin
                yürütülmesi; sözleşme süreçlerinin yürütülmesi; Site üzerinden sunulan hizmetlerin, Üye/Kullanıcılar
                tarafından sağlanan bilgi ve geri bildirimlerle iyileştirilmesi ve bu hizmetlerin yönetimi; Site’nin
                Üye/Kullanıcılarına ilişkin bilgilerin doğru ve güncel olmasının sağlanması.
              </p>
              <h4 className="font-semibold text-gray-900">Yönetim Süreçlerinin Yürütülmesi</h4>
              <p>
                Denetim faaliyetlerinin yürütülmesi; hukuki işlemlerin takibi ve yürütülmesi; iletişim faaliyetlerinin
                yürütülmesi; risk yönetimi süreçlerinin yürütülmesi; saklama ve arşiv faaliyetlerinin yürütülmesi; stratejik
                planlama faaliyetlerinin yürütülmesi; talep ve şikayetlerin takibi; tedarik zinciri yönetimi süreçlerinin
                yürütülmesi; Veri Sorumlusu operasyonlarının güvenliğinin temini; yetkili kişi, kurum ve kuruluşlara bilgi
                verilmesi; Site Üye/Kullanıcılarının taleplerine ve ihtiyaçlarına etkin bir şekilde cevap verilebilmesi;
                bilişim teknolojileri sistemlerinin kullanılması ve güncellenmesi; Site’nin güvenliğinin sağlanması için
                güvenlik tedbirlerinin alınması ve bu bağlamda otomatik taramalar gerçekleştirilmesi.
              </p>
              <h4 className="font-semibold text-gray-900">Pazarlama, Reklam ve Tanıtım Süreçlerinin Yürütülmesi</h4>
              <p>
                Dergi, bülten, broşür, reklam görseli vb. materyallerin oluşturulması; iletişim faaliyetlerinin yürütülmesi;
                pazarlama analiz çalışmalarının yürütülmesi; reklam, kampanya ve promosyon süreçlerinin yürütülmesi;
                hizmetlerin pazarlama süreçlerinin yürütülmesi; ilgili Veri Sahibi tarafından aksi belirtilmedikçe ticari
                elektronik ileti vasıtasıyla hizmetler hakkında bilgi sağlanması.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Kişisel Verilerin Saklanma Süreleri</h3>
              <p>
                PİRİ DİJİTAL işlediği kişisel verileri ilgili mevzuatta öngörülen veya işleme amacının gerektirdiği süreler
                boyunca Kanun ile uyumlu olarak fiziki ve/veya elektronik ortamlarda muhafaza eder. Bu süreler yaklaşık
                olarak aşağıdaki gibidir:
              </p>
              <div className="overflow-auto">
                <table className="min-w-full text-xs md:text-sm border mt-2">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="px-3 py-2 border text-left">Veri Tipi</th>
                      <th className="px-3 py-2 border text-left">Saklama Süresi</th>
                      <th className="px-3 py-2 border text-left">Hukuki Dayanağı</th>
                      <th className="px-3 py-2 border text-left">İmha Süresi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2 border align-top">Üye/Kullanıcılara İlişkin Kişisel Veriler</td>
                      <td className="px-3 py-2 border align-top">Hukuki ilişkinin sona ermesinden itibaren 10 yıl</td>
                      <td className="px-3 py-2 border align-top">
                        6563 Sayılı Kanun ve ikincil mevzuat, 6102 Sayılı Kanun
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Saklama süresinin bitimini takip eden ilk periyodik imha süresinde
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">Potansiyel Üye/Kullanıcılara İlişkin Kişisel Veriler</td>
                      <td className="px-3 py-2 border align-top">2 yıl</td>
                      <td className="px-3 py-2 border align-top">Geriye ve İleriye Dönük Olarak Analiz Yapılması</td>
                      <td className="px-3 py-2 border align-top">
                        Saklama süresinin bitimini takip eden ilk periyodik imha süresinde
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">Çevrimiçi Üye/Kullanıcılara İlişkin Kişisel Veriler</td>
                      <td className="px-3 py-2 border align-top">
                        Hukuki ilişki sona erdikten sonra 10 yıl; 6563 Kanun ve ilgili ikincil mevzuat uyarınca 3 yıl
                      </td>
                      <td className="px-3 py-2 border align-top">
                        6563 Sayılı Kanun, 6102 Sayılı Kanun, 6098 Sayılı Kanun, 213 Sayılı Kanun, 6502 Sayılı Kanun
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Saklama süresinin bitimini takip eden ilk periyodik imha süresinde
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        Çevrimiçi Üye/Kullanıcılara İlişkin Kişisel Veriler (Log Kayıtları)
                      </td>
                      <td className="px-3 py-2 border align-top">2 yıl</td>
                      <td className="px-3 py-2 border align-top">5651 Sayılı Kanun ve ikincil mevzuat</td>
                      <td className="px-3 py-2 border align-top">
                        Saklama süresinin bitimini takip eden ilk periyodik imha süresinde
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        Ticari Elektronik İleti Gönderimine İlişkin Kayıtlar
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Ticari elektronik ileti onaylarına ilişkin kayıtlar, onayın geçersizlik tarihinden itibaren 3 yıl;
                        ticari elektronik iletiye ilişkin diğer kayıtlar toplanma tarihinden itibaren 3 yıl
                      </td>
                      <td className="px-3 py-2 border align-top">
                        6563 Sayılı Kanun; Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Saklama süresinin bitimini takip eden ilk periyodik imha süresinde
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Kişisel veriler, ilgili mevzuat veya PİRİ DİJİTAL uygulamaları gereği daha uzun bir süre boyunca muhafaza
                edilmesi gerekmediği sürece, ortalama olarak yukarıda belirtilen süreler boyunca saklanacaktır.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği
              </h3>
              <p>
                Toplanan Üye/Kullanıcı kişisel verileri; yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda ve bu
                amaçların yerine getirilmesi ile sınırlı olarak; hizmet alınan tedarikçilerimize, kanunen yetkili kamu
                kurumlarına ve özel kişi veya kuruluşlar ile üçüncü kişilere Kanun’un 8. ve 9. maddelerinde belirtilen
                kişisel veri işleme şartları ve yukarıda belirtilen amaçlarla sınırlı olarak yurt içinde ve yurt dışında
                aktarılabilecektir.
              </p>
              <p>
                Yurt içinde ve yurt dışında gerçekleştirilen kişisel veri aktarımları güvenli ortam ve kanallar aracılığıyla
                gerçekleşmektedir. Üçüncü taraflardan alınan hizmetin içeriği ve kapsamına bağlı olarak; ilgili kişi,
                kişisel verilerinin aktarımına gerek olmayan tüm hallerde pseudonymous data (takma adlı veri) kullanılarak
                aktarım yapılmaktadır.
              </p>
              <p>
                PİRİ DİJİTAL yurt içi ve yurt dışı aktarımlarında, güncel teknolojilerin sunduğu ve ilgili uygulamanın
                maliyet dengesi çerçevesinde mümkün olan her türlü idari ve teknik tedbiri almakta, bu kapsamda ilgili yasal
                düzenlemeler ile Kişisel Verileri Koruma Kurulu (&quot;Kurul&quot;) kararları doğrultusunda güvenliğe
                ilişkin uygulamalarını güncel tutmaktadır. Söz konusu idari ve teknik tedbirler kapsamında, aktarım yapılan
                taraflar ile veri aktarımına ve işlenmesine ilişkin özel sözleşmeler yapılmakta ve gerekli taahhütler alınmaktadır.
              </p>
              <p>
                Kanun’un 9. Maddesi uyarınca, kural olarak, kişisel veriler ilgili kişinin açık rızası olmaksızın yurt
                dışına aktarılmaz. Bunun karşısında, kişisel veriler, aşağıdaki aktarım şartlarının varlığı ve aktarımın
                yapılacağı ülke, ülke içerisindeki sektörler veya uluslararası kuruluşlar hakkında yeterlilik kararı
                bulunması halinde, ilgili kişilerin açık rızası alınmaksızın yurt dışına aktarılabilecektir;
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Kanunlarda açıkça öngörülmesi;</li>
                <li>
                  Fiili imkânsızlık nedeniyle rızasını açıklayamayacak durumda bulunan veya rızasına hukuki geçerlilik
                  tanınmayan kişinin kendisinin ya da bir başkasının hayatı veya beden bütünlüğünün korunması için zorunlu
                  olması;
                </li>
                <li>İlgili kişinin kendisi tarafından alenileştirilmiş olması;</li>
                <li>Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması;</li>
                <li>
                  Sır saklama yükümlülüğü altında bulunan kişiler veya yetkili kurum ve kuruluşlarca, kamu sağlığının
                  korunması, koruyucu hekimlik, tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi ile sağlık
                  hizmetlerinin planlanması, yönetimi ve finansmanı amacıyla gerekli olması;
                </li>
                <li>
                  İstihdam, iş sağlığı ve güvenliği, sosyal güvenlik, sosyal hizmetler ve sosyal yardım alanlarındaki
                  hukuki yükümlülüklerin yerine getirilmesi için zorunlu olması;
                </li>
                <li>
                  Siyasi, felsefi, dini veya sendikal amaçlarla kurulan vakıf, dernek ve diğer kâr amacı gütmeyen kuruluş
                  ya da oluşumların, tâbi oldukları mevzuata ve amaçlarına uygun olmak, faaliyet alanlarıyla sınırlı olmak
                  ve üçüncü kişilere açıklanmamak kaydıyla; mevcut veya eski üyelerine ve mensuplarına veyahut bu kuruluş ve
                  oluşumlarla düzenli olarak temasta olan kişilere yönelik olması.
                </li>
              </ul>
              <p>Ayrıntılı olarak kişisel verilerinizin kimlerle ve hangi amaçlarla paylaşılabileceği aşağıda belirtilmiştir:</p>
              <div className="overflow-auto">
                <table className="min-w-full text-xs md:text-sm border mt-2">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="px-3 py-2 border text-left">Paylaşılan Taraf</th>
                      <th className="px-3 py-2 border text-left">Amaç</th>
                      <th className="px-3 py-2 border text-left">Örnek</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2 border align-top">Hizmet Alınan Tedarikçiler</td>
                      <td className="px-3 py-2 border align-top">Bilgi, İşlem ve Kişisel Verilerin Güvenliğinin Sağlanması</td>
                      <td className="px-3 py-2 border align-top">
                        Kişisel verilerin, güvenli bir şekilde saklanması amacıyla bulut bilişim vb. yollar kullanılarak
                        muhafaza hizmeti sunan tedarikçilerle paylaşılması. Üye/Kullanıcılara ilişkin ticari süreçlerin takip
                        edilmesi ve yönetilmesi amacıyla bulut bilişim vb. yollarla yazılım hizmeti sunan tedarikçilere
                        aktarım yapılması.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">Hizmet Alınan Tedarikçiler</td>
                      <td className="px-3 py-2 border align-top">
                        Hizmet Satış ve Satış Sonrası Destek Süreçlerinin Yürütülmesi
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Kişisel verilerin, sözleşmesel ilişkinin ifası kapsamında bankalar, finans kurumları ve benzeri
                        kapsamda destek veren diğer üçüncü taraflarla paylaşılması.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">Hizmet Alınan Tedarikçiler</td>
                      <td className="px-3 py-2 border align-top">İletişim Süreçlerinin Yürütülmesi</td>
                      <td className="px-3 py-2 border align-top">
                        Güvenli bir şekilde e-posta üzerinden iletişim kurulması amacıyla, sunucu ve bulut hizmeti kullanarak
                        e-posta hizmeti sağlayan tedarikçilere aktarılması.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">Hizmet Alınan Tedarikçiler</td>
                      <td className="px-3 py-2 border align-top">
                        Pazarlama, Kampanya ve Reklam Süreçlerinin Yürütülmesi
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Kişisel verilerin, ticari ileti göndermek, kampanya duyuruları yapmak ve hizmet reklamları sunmak
                        amacıyla bu hizmetleri veren üçüncü taraflarla paylaşılması.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">Hizmet Alınan Tedarikçiler</td>
                      <td className="px-3 py-2 border align-top">Hukuki Süreçlerin Takibi</td>
                      <td className="px-3 py-2 border align-top">
                        Kişisel verilerin, tüketici hakem heyeti ve dava süreçleri dahil olmak üzere danışmanlık alınan avukat
                        veya hukuk hizmetleri tedarikçileriyle paylaşılması.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">Yetkili, Kişi, Kurum ve Kuruluşlar</td>
                      <td className="px-3 py-2 border align-top">Yetkili Kişi, Kurum ve Kuruluşlara Bilgi Verilmesi</td>
                      <td className="px-3 py-2 border align-top">
                        Kişisel verilerin, kanun tarafından kendilerine yetki verilmiş kişi, kurum ve kuruluşlara ilgili
                        mevzuat yükümlülüğü çerçevesinde paylaşılması.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Veri Güvenliği Tedbirleri</h3>
              <p>
                PİRİ DİJİTAL, kişisel verilerinizin korunması ve güvenliği için güncel teknolojilerin sunduğu ve ilgili
                uygulamanın maliyet dengesi çerçevesinde mümkün olan her türlü idari ve teknik tedbiri almakta, bu kapsamda
                ilgili yasal düzenlemeler ile Kurul kararları doğrultusunda güvenliğe ilişkin uygulamalarını güncel
                tutmaktadır.
              </p>
              <p>
                PİRİ DİJİTAL tarafından alınan teknik ve idari tedbirler için lütfen Site’de yer alan PİRİ DİJİTAL Kişisel
                Verilerin Korunması ve Gizlilik Politikası’nı inceleyiniz.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Veri Sahibi&apos;nin Kanun’un 11. Maddesinde Sayılan Hakları
              </h3>
              <p>
                İlgili kişiler olarak, Kanun’un 11. maddesi doğrultusunda aşağıda sıralanan haklara sahipsiniz.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Kişisel veri işlenip işlenmediğini öğrenme;</li>
                <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme;</li>
                <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme;</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme;</li>
                <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme;</li>
                <li>
                  Kanun’un 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini
                  isteme;
                </li>
                <li>
                  Kişisel verilerin amacına uygun kullanıp kullanılmadığını öğrenme ve yurt içinde ve yurt dışında kişisel
                  verilerin aktarıldığı üçüncü kişileri bilme hakkının kullanılması sonucunda yapılan işlemlerin, kişisel
                  verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme;
                </li>
                <li>
                  İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi
                  aleyhine bir sonucun ortaya çıkmasına itiraz etme ve
                </li>
                <li>
                  Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini
                  talep etme.
                </li>
              </ul>
              <p>
                Yukarıda yer verilen taleplerinizi Veri Sahibi Başvuru Formu&apos;nu (&quot;Form&quot;) doldurarak, Form’da
                belirtilen başvuru yolları aracılığıyla tarafımıza iletebilirsiniz (İlgili talebin Veri Sorumlusuna Başvuru
                Usul ve Esasları Hakkında Tebliğ’de yer alan şartlara uygun olması gerekmektedir.)
              </p>
              <p>
                Söz konusu haklarınıza ilişkin taleplerinizi PİRİ DİJİTAL’e yukarıdaki şekilde iletmeniz durumunda PİRİ
                DİJİTAL, talebin niteliğine göre talebi en kısa sürede ve en geç 30 (otuz) gün içinde ücretsiz olarak
                sonuçlandıracaktır. Ancak işlemin ayrıca bir maliyeti gerektirmesi durumunda, PİRİ DİJİTAL tarafından Kurul’ca
                belirlenen tarifedeki ücret tarafınızdan tahsil edilecektir.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h2 className="text-xl font-bold text-gray-900">
                PİRİ DİJİTAL KİŞİSEL VERİLERİN İŞLENMESİNE İLİŞKİN AÇIK RIZA METNİ
              </h2>
              <p>
                PİRİ DİJİTAL Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni’ni tebliğ alıp okuyarak, PİRİ DİJİTAL
                ile paylaşacağım/paylaşmış olduğum özel nitelikli kişisel verilerimin (örn. yüz tanıma veya parmak izi
                kayıt sistemleri aracılığıyla toplanabilecek biyometrik verilerin) sözleşmesel ilişkinin kurulması ve ifası
                kapsamında işlenmesine rıza gösteriyorum.
              </p>
              <p>
                Kişisel tercihlerime, ilgi alanlarıma, mesleğime, güvenilirliğime ve davranışlarıma ilişkin
                analiz/profilleme yapılması; bu bilgilerin PİRİ DİJİTAL stratejilerinin geliştirilmesi ve kişiye/genele
                yönelik pazarlama ve reklam faaliyetlerinin yürütülmesi vb. amaçlarla kimlik, iletişim, mesleki deneyim,
                Üye/Kullanıcı işlem ve görsel ve işitsel kayıtlarımı içeren kişisel verilerimin işlemesine rıza gösteriyorum.
              </p>
              <p>
                Kişisel verilerimin genel olarak iş ve ticari ilişki yönetimi, veri güvenliğinin, muhafazasının ve
                yönetiminin sağlanması, pazarlama, eğitim, tanıtım ve reklam faaliyetlerinin yürütülmesi gibi Aydınlatma
                Metni’nde detaylıca açıklanan amaçlar ve taraflar doğrultusunda yurt içinde veya yurt dışına aktarılmasına
                rıza gösteriyorum.
              </p>
              <p className="text-sm">
                <strong>Ad / Soyad :</strong>
                <br />
                <strong>Tarih :</strong>
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h2 className="text-xl font-bold text-gray-900">TİCARİ ELEKTRONİK İLETİ ONAY METNİ</h2>
              <p>
                6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun’a uygun olarak, aşağıda belirtmiş olduğum veya
                ileride bildireceğim iletişim bilgilerimin ticari amaçlarla elektronik ileti gönderilmesi için kullanılmasına
                aksi yönde bir irade beyanında bulunana kadar onay veriyorum.
              </p>
              <p className="text-sm">
                <strong>E – Posta :</strong>
                <br />
                <strong>Telefon :</strong>
                <br />
                <strong>Ad / Soyad :</strong>
                <br />
                <strong>Tarih :</strong>
              </p>
              <p>
                Vermiş olduğunuz onayı dilediğiniz zaman <strong>www.piri.tr/</strong> adresinden bizlerle iletişime geçerek
                geri alabilirsiniz.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h2 className="text-xl font-bold text-gray-900">
                KİŞİSEL VERİLERİN YURT DIŞINA AKTARILMASINA İLİŞKİN AÇIK RIZA METNİ
              </h2>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca, Veri Sorumlusu Kadıköy Vergi Dairesi’ne 7230963820
                vergi numarası ile kayıtlı PİRİ DİJİTAL tarafından KİŞİSEL VERİLERİN İŞLENMESİNE İLİŞKİN AYDINLATMA VE RIZA
                METNİ’nde belirtilen ve aşağıda açıklanan amaçlar ve taraflar doğrultusunda kişisel verilerimin ve özel
                nitelikli kişisel verilerimin yurtdışına aktarılmasına rıza gösteriyorum.
              </p>
              <div className="overflow-auto">
                <table className="min-w-full text-xs md:text-sm border mt-2">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="px-3 py-2 border text-left">Alıcı</th>
                      <th className="px-3 py-2 border text-left">Örnek Kişisel Veri Kategorileri</th>
                      <th className="px-3 py-2 border text-left">Yurtdışına Aktarım Amacı</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2 border align-top">Hizmet Alınan Tedarikçiler</td>
                      <td className="px-3 py-2 border align-top">
                        Kimlik Bilgisi, İletişim Bilgisi, Hukuki İşlem Bilgisi, Üye/Kullanıcı İşlem Bilgisi, Risk Yönetimi,
                        Finans Bilgileri, Pazarlama, Görsel ve İşitsel Kayıtlar
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Kişisel verilerin, güvenli bir şekilde saklanması amacıyla bulut bilişim vb. yollar kullanılarak
                        muhafaza hizmeti sunan tedarikçilerle paylaşılması. Üye/Kullanıcılara ilişkin ticari süreçlerin
                        takip edilmesi ve yönetilmesi amacıyla bulut bilişim vb. yollarla yazılım hizmeti sunan
                        tedarikçilere aktarım yapılması. Kişisel verilerin, sözleşmesel ilişkinin ifası kapsamında bankalar,
                        finans kurumları ve benzeri kapsamda destek veren diğer üçüncü taraflarla paylaşılması. Güvenli bir
                        şekilde e-posta üzerinden iletişim kurulması amacıyla, sunucu ve bulut hizmeti kullanarak e-posta
                        hizmeti sağlayan tedarikçilere aktarılması. Kişisel verilerin, ticari ileti göndermek, kampanya
                        duyuruları yapmak ve hizmet reklamları sunmak amacıyla bu hizmetleri veren üçüncü taraflarla
                        paylaşılması. Kişisel verilerin, tüketici hakem heyeti ve dava süreçleri dahil olmak üzere
                        danışmanlık alınan avukat veya hukuk hizmetleri tedarikçileriyle paylaşılması.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">Yetkili, Kişi, Kurum ve Kuruluşlar</td>
                      <td className="px-3 py-2 border align-top">
                        Kimlik Bilgisi, İletişim Bilgisi, Hukuki İşlem Bilgisi, Üye/Kullanıcı İşlem Bilgisi, Risk Yönetimi,
                        Finans Bilgileri, Pazarlama, Görsel ve İşitsel Kayıtlar
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Kişisel verilerin, kanun tarafından kendilerine yetki verilmiş kişi, kurum ve kuruluşlara ilgili
                        mevzuat yükümlülüğü çerçevesinde paylaşılması.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm">
                <strong>Ad Soyad :</strong>
                <br />
                <strong>Tarih :</strong>
                <br />
                <strong>İmza :</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

