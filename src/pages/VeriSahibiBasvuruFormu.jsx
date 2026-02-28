import { motion } from "framer-motion";

export default function VeriSahibiBasvuruFormu() {
  return (
    <div className="bg-white">
      <section className="relative pt-28 pb-16 bg-work-navy-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.45),transparent_55%)]" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_15%,rgba(6,182,212,0.35),transparent_55%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Veri Sahibi Başvuru Formu
          </motion.h1>
          <p className="text-blue-100 mt-3 max-w-3xl">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınızı kullanmak üzere PİRİ DİJİTAL&apos;e
            yapacağınız başvurularda kullanacağınız kapsamlı başvuru metnidir.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white via-gray-50/40 to-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-3xl border shadow-lg p-6 md:p-10 space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Genel Açıklamalar</h2>
              <p>
                6698 Sayılı Kişisel Verilerin Korunması Kanunu’nda (&quot;Kanun&quot;) ilgili kişi olarak tanımlanan kişisel veri
                sahiplerine (&quot;Veri Sahibi&quot;), Kanun’un 11. maddesinde kişisel verilerinin işlenmesine ilişkin belirli
                haklar tanınmıştır. Kanun’un 13. maddesinin 1. fıkrası uyarınca; veri sorumlusu olan Şirketimize bu haklara
                ilişkin olarak yapılacak başvuruların yazılı olarak veya Kişisel Verilerin Korunması Kurulu (&quot;Kurul&quot;)
                tarafından belirlenen diğer yöntemlerle tarafımıza iletilmesi gerekmektedir.
              </p>
              <p>
                Bu çerçevede &quot;yazılı&quot; olarak PİRİ DİJİTAL ANONİM ŞİRKETİ’ne (&quot;PİRİ DİJİTAL&quot; veya
                &quot;Şirket&quot;) yapılacak başvuruların, işbu form kullanılarak; aşağıda, yazılı başvuruların ne şekilde
                tarafımıza ulaştırılacağına ilişkin yazılı başvuru kanallarından bir tanesi ile başvuruları sonucu bilgiler
                verilmektedir.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Veri Sahibinin Hakları</h2>
              <p>
                Kanun’un 11. maddesi uyarınca, Veri Sahibi olarak PİRİ DİJİTAL’e başvurarak aşağıda yer alan taleplerde
                bulunabilirsiniz:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Kişisel veri işlenip işlenmediğini öğrenme;</li>
                <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme;</li>
                <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme;</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme;</li>
                <li>Kişisel verilerin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme;</li>
                <li>İlgili mevzuatta öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme;</li>
                <li>
                  İlgili mevzuat uyarınca yapılan düzeltme, silme ve yok edilme işlemlerinin, kişisel verilerin aktarıldığı
                  üçüncü kişilere bildirilmesini isteme;
                </li>
                <li>
                  İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi
                  aleyhine bir sonucun ortaya çıkmasına itiraz etme; ve
                </li>
                <li>
                  Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması halinde zararın giderilmesini
                  isteme.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Başvuru Yolları</h2>
              <p className="text-sm text-gray-700">
                Başvurular aşağıdaki yöntemlerden biri kullanılarak PİRİ DİJİTAL&apos;e iletilebilir:
              </p>
              <div className="overflow-auto">
                <table className="min-w-full text-sm border mt-2">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 border text-left font-semibold">Başvuru Yöntemi</th>
                      <th className="px-3 py-2 border text-left font-semibold">Başvurunun Yapılacağı Adres</th>
                      <th className="px-3 py-2 border text-left font-semibold">Başvuru Gönderiminde Belirtilecek Bilgi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2 border align-top">Noter vasıtasıyla tebligat</td>
                      <td className="px-3 py-2 border align-top">
                        Adalet Mah. Manas Bul. Folkart Towers No: 39 İç Kapı No:2511 Bayraklı/İZMİR
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Tebligat zarfına &quot;Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi&quot; yazılacaktır.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        &quot;Güvenli elektronik imza&quot; ile imzalanarak Kayıtlı Elektronik Posta (KEP) yoluyla
                      </td>
                      <td className="px-3 py-2 border align-top">[Şirketin KEP Adresi]</td>
                      <td className="px-3 py-2 border align-top">
                        E-Posta&apos;nın konu kısmına &quot;Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi&quot;
                        yazılacaktır.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">Şahsen Başvuru</td>
                      <td className="px-3 py-2 border align-top">
                        Başvuru sahibinin bizzat gelerek kimliğini tevsik edici belge ile başvurması gerekir. Vekâleten
                        teslim alınması durumunda noter tasdikli vekâletname olması gerekmektedir.
                        <br />
                        <br />
                        Adalet Mah. Manas Bul. Folkart Towers No: 39 İç Kapı No:2511 Bayraklı/İZMİR
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Zarfın üzerine &quot;Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi&quot; yazılacaktır.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">E-Posta Aracılığı ile Başvuru</td>
                      <td className="px-3 py-2 border align-top">
                        Başvuru sahibinin kimlik teyidi amacıyla ek belge talebinde bulunulabilir, bu durumda kimlik teyidi
                        için istenen ek belgelerin başvuru sahibi tarafından iletilmesi ile birlikte başvuru yapılmış sayılır.
                        <br />
                        <br />
                        [Şirketin E-Posta Adresi]
                      </td>
                      <td className="px-3 py-2 border align-top">
                        E-Posta&apos;nın konu kısmına &quot;Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi&quot;
                        yazılacaktır.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Ayrıca, Kurul’un belirleyeceği diğer yöntemler duyurulduktan sonra bu yöntemler üzerinden de başvuruların ne
                şekilde alınacağı Şirket tarafından duyurulacaktır.
              </p>
              <p>
                Tarafımıza iletilmiş olan başvurularınız Kanun’un 13’üncü maddesinin 2. fıkrası gereğince, talebin niteliğine
                göre talebinizin bizlere ulaştığı tarihten itibaren 30 (otuz) gün içinde yanıtlandırılacaktır. Yanıtlarımız
                Kanun’un 13. maddesi hükmü gereğince yazılı veya elektronik ortamdan tarafınıza ulaştırılacaktır. Bu formun ve
                talebinizin niteliğine göre sizlerden istenen bilgi ve belgelerin eksiksiz ve doğru olarak tarafımıza
                sağlanması gerekmektedir.
              </p>
              <p>
                İstenilen bilgi ve belgelerin gereği gibi sağlanmaması durumunda Şirketimiz tarafından talebinize istinaden
                yapılacak araştırmaların tam ve nitelikli şekilde yürütülmesinde aksaklıklar yaşanabilecektir. Bu durumda
                Şirketimizin kanuni hakları saklıdır. Bu nedenle ilgili formun talebinizin niteliğine göre eksiksiz ve
                istenilen bilgileri ve belgeleri içerecek şekilde gönderilmesi gerekmektedir.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Veri Sahibine İlişkin İletişim Bilgileri</h2>
              <p>
                Kanun’un 13. Maddesi uyarınca yapacağınız başvurunuzla ilgili olarak, sizleri tanıyabilmemiz ve PİRİ DİJİTAL
                tarafından gerekli araştırma, değerlendirme ve çözümlemeleri yapabilmemiz amacıyla aşağıdaki bilgileri
                eksiksiz şekilde doldurmanızı rica ederiz:
              </p>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Adı ve Soyadı :</strong>
                </p>
                <p>
                  <strong>T.C Kimlik Numarası :</strong>
                </p>
                <p>
                  <strong>Pasaport No / Uyruk (Yabancılar İçin) :</strong>
                </p>
                <p>
                  <strong>Adres :</strong>
                </p>
                <p>
                  <strong>Telefon Numarası :</strong>
                </p>
                <p>
                  <strong>E – Posta Adresi :</strong>
                </p>
              </div>
              <p>Yukarıdaki alanların doldurulması zorunludur.</p>
              <p>
                Yukarıda tarafımıza sunmuş olduğunuz kişisel verileriniz, Kanun kapsamındaki talebinizin değerlendirilebilmesi,
                sonuçlandırılabilmesi ve sizinle iletişime geçilebilmesi amacıyla işlenmektedir.
              </p>
              <p>
                PİRİ DİJİTAL ile olan ilişkinize dair uygun olan seçeneği işaretleyerek, mevcut ilişkinin halen devam edip
                etmediğini aşağıdaki boşlukta belirtiniz.
              </p>
              <div className="space-y-1 text-sm">
                <p>⃞ Üye/Kullanıcı</p>
                <p>⃞ Potansiyel Üye/Kullanıcı</p>
                <p>⃞ Eski Üye/Kullanıcı</p>
                <p>⃞ Üye/Kullanıcı Çalışanı/Yakını</p>
                <p>⃞ Tedarikçi</p>
                <p>⃞ Potansiyel Tedarikçi</p>
                <p>⃞ Eski Tedarikçi</p>
                <p>⃞ Tedarikçi Çalışanı/Yakını</p>
                <p>
                  ⃞ Diğer : ………………………………………………………………………………………………………………………………………………………………………………………………………………………………..{" "}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Veri Sahibi Talepleri</h2>
              <p>
                Veri sahibi olarak, Kanun’un 11. ve 13. maddeleri kapsamında bilgi sahibi olmak istediğiniz durum/durumlar
                için lütfen aşağıda yer verilen listedeki ilgili kutucuğu işaretleyiniz.
              </p>
              <div className="overflow-auto">
                <table className="min-w-full text-sm border mt-2">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 border text-left font-semibold">Talebiniz</th>
                      <th className="px-3 py-2 border text-left font-semibold">Gereken Bilgi/Belge</th>
                      <th className="px-3 py-2 border text-left font-semibold">Seçim</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        1. Kişisel verilerimin PİRİ DİJİTAL tarafından işlenip işlenmediğini öğrenmek istiyorum.
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Özel bir veri türüne dair bilgi almak istiyorsanız lütfen belirtiniz:
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                      </td>
                      <td className="px-3 py-2 border align-top">⃞</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        2. PİRİ DİJİTAL tarafından kişisel verilerimin hangi amaçla işlendiğini öğrenmek istiyorum.
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Özel bir veri türüne dair bilgi almak istiyorsanız lütfen belirtiniz.
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                      </td>
                      <td className="px-3 py-2 border align-top">⃞</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        3. PİRİ DİJİTAL tarafından kişisel verilerimin amacına uygun kullanılıp kullanılmadığını öğrenmek
                        istiyorum.
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Özel bir veri türüne dair bilgi almak istiyorsanız lütfen belirtiniz.
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                      </td>
                      <td className="px-3 py-2 border align-top">⃞</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        4. Eğer kişisel verilerim yurt içinde veya yurt dışında üçüncü kişilere aktarılıyorsa, aktarılan
                        üçüncü kişileri bilmek istiyorum.
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Özel bir veri türüne dair bilgi almak istiyorsanız lütfen belirtiniz.
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                      </td>
                      <td className="px-3 py-2 border align-top">⃞</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        5. Kişisel verilerimin eksik veya yanlış işlendiğini düşünüyorum ve bunların düzeltilmesini istiyorum.
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Eksik ve yanlış işlendiğini düşündüğünüz bilgileri ve bu bilgilerin doğrusunun nasıl olması gerektiğini
                        lütfen belirtiniz.
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                      </td>
                      <td className="px-3 py-2 border align-top">⃞</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        6. Eksik/yanlış işlendiğini düşündüğüm kişisel verilerimin aktarıldığı üçüncü kişiler nezdinde de
                        düzeltilmesini istiyorum.
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Eksik ve yanlış işlendiğini düşündüğünüz bilgileri ve bu bilgilerin doğrusunun nasıl olması gerektiğini
                        lütfen belirtiniz.
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                      </td>
                      <td className="px-3 py-2 border align-top">⃞</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        7. Kişisel verilerimin işlenmelerini gerektiren sebeplerin ortadan kalkması nedeniyle silinmesini/yok
                        edilmesini istiyorum.
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Bu talebinize konu verilerin hangi veriler olduğunu ve aleyhinize olduğunu düşündüğünüz sonucun ne
                        olduğunu belirtiniz, bu hususlara ilişkin tevsik edici bilgi ve belgelere lütfen Form ekinde yer
                        veriniz.
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                      </td>
                      <td className="px-3 py-2 border align-top">⃞</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        8. Kişisel verilerimin işlenmelerini gerektiren sebeplerin ortadan kalkması nedeniyle aktarıldıkları
                        üçüncü kişiler nezdinde de silinmesini/yok edilmesini istiyorum.
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Bu talebiniz, kişisel bilgilerinizin yalnızca bir kısmına ilişkin ise bunların hangi veriler olduğunu ve
                        bu talebinizin gerekçesini tevsik edici bilgi ve belgelerle birlikte belirtiniz, bu hususlara ilişkin
                        tevsik edici bilgi ve belgelere lütfen Form ekinde yer veriniz.
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                      </td>
                      <td className="px-3 py-2 border align-top">⃞</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        9. PİRİ DİJİTAL tarafından işlenen kişisel verilerimin münhasıran otomatik sistemler vasıtasıyla analiz
                        edildiğini ve bu analiz neticesinde şahsım aleyhine bir sonuç doğduğunu düşünüyorum. Bu sonuca itiraz
                        ediyorum.
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Bu talebinizin gerekçesini ve bilgi alma talebinize ilişkin durumun sonucunu belirtiniz, bu hususlara
                        ilişkin tevsik edici bilgi ve belgelere lütfen Form ekinde yer veriniz.
                      </td>
                      <td className="px-3 py-2 border align-top">⃞</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border align-top">
                        10. Kişisel verilerimin kanuna aykırı işlenmesini nedeniyle uğradığım zararın tazminini talep ediyorum.
                      </td>
                      <td className="px-3 py-2 border align-top">
                        Bu talebinizin gerekçesini ve uğradığınızı düşündüğünüz zararı aşağıdaki boşlukta belirtiniz; bu
                        hususlara ilişkin tevsik edici bilgi ve belgelere (Kişisel Verilerin Korunması Kurulu veya mahkeme
                        kararları) lütfen Form ekinde yer veriniz.
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                        <br />
                        ………………………………………………………………
                      </td>
                      <td className="px-3 py-2 border align-top">⃞</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Lütfen Kanun kapsamındaki talebiniz ile ilgili başkaca bir bilgi varsa lütfen detaylı olarak belirtiniz:
              </p>
              <p className="text-sm">
                …………………………………………………………………………………………………
                <br />
                …………………………………………………………………………………………………
                <br />
                …………………………………………………………………………………………………
                <br />
                …………………………………………………………………………………………………
                <br />
                …………………………………………………………………………………………………
              </p>
              <p>Talebiniz internet ortamında yer alan bir içerikle ilgiliyse lütfen URL adresini belirtiniz:</p>
              <p className="text-sm">
                …………………………………………………………………………………………………
                <br />
                …………………………………………………………………………………………………
                <br />
                …………………………………………………………………………………………………
                <br />
                …………………………………………………………………………………………………
                <br />
                …………………………………………………………………………………………………
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Başvuru Taleplerinin Sonuçlandırılması</h2>
              <p>
                Talepleriniz PİRİ DİJİTAL tarafından ücretsiz sonuçlandırılacak olup, cevaplama sürecinin ayrıca bir maliyet
                doğurması halinde, ilgili mevzuat çerçevesinde belirlenen tutarlarda ücret talep edilebilecektir.
              </p>
              <p className="text-sm space-y-1">
                <span className="block">Başvuruma ilişkin sonucun e-posta adresime gönderilmesini istiyorum. ⃞</span>
                <span className="block">
                  Başvuruma ilişkin sonucun posta aracılığı ile gönderilmesini istiyorum. ⃞
                </span>
                <span className="block">
                  Elden teslim almak istiyorum. ⃞ (Vekâleten teslim alınması durumunda noter tasdikli vekâletname veya yetki
                  belgesi olması gerekmektedir.)
                </span>
              </p>
              <p>
                İşbu başvuru formu, Şirketimiz ile olan ilişkinizi tespit ederek, varsa, Şirketimiz tarafından işlenen kişisel
                verilerinizi eksiksiz olarak belirleyerek, ilgili başvurunuza doğru ve kanuni süresinde cevap verilebilmesi
                için tanzim edilmiştir. Hukuka aykırı ve haksız bir şekilde veri paylaşımından kaynaklanabilecek hukuki
                risklerin bertaraf edilmesi ve özellikle kişisel verilerinizin güvenliğinin sağlanması amacıyla, kimlik ve
                yetki tespiti için Şirketimizin ek evrak ve malumat (Nüfus cüzdanı veya sürücü belgesi sureti vb.) talep etme
                hakkını saklı tutar. Form kapsamında iletmekte olduğunuz taleplerinize ilişkin bilgilerin doğru ve güncel
                olmaması ya da yetkisiz bir başvuru yapılması halinde Şirketimiz, söz konusu yanlış bilgi ya da yetkisiz
                başvuru kaynaklı taleplerden dolayı mesuliyet kabul etmemektedir.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Veri Sahibi Beyanı</h2>
              <p>
                Kanun uyarınca yapmış olduğum bilgi edinme başvurusunun, yukarıda belirttiğim talep/talepler çerçevesinde
                değerlendirilerek sonuçlandırılmasını rica eder, işbu başvuruda tarafınıza sağlamış olduğum bilgi ve
                belgelerin doğru, güncel ve şahsıma ait olduğunu kabul, beyan ve taahhüt ederim.
              </p>
              <p>
                İşbu başvuru formu, Şirketimiz ile olan ilişkinizi tespit ederek, varsa Şirketimiz tarafından işlenen kişisel
                verilerinizi eksiksiz olarak belirleyerek, ilgili başvurunuza doğru ve kanuni süresinde cevap verilebilmesi
                için tanzim edilmiştir. Hukuka aykırı ve haksız bir şekilde veri paylaşımından kaynaklanabilecek hukuki
                risklerin bertaraf edilmesi ve özellikle kişisel verilerinizin güvenliğinin sağlanması amacıyla, kimlik ve
                yetki tespiti için Şirketimiz ek evrak ve malumat (Nüfus cüzdanı veya sürücü belgesi sureti vb.) talep etme
                hakkını saklı tutar. Form kapsamında iletmekte olduğunuz taleplerinize ilişkin bilgilerin doğru ve güncel
                olmaması ya da yetkisiz bir başvuru yapılması halinde Şirketimiz, söz konusu yanlış bilgi ya da yetkisiz
                başvuru kaynaklı taleplerden dolayı mesuliyet kabul etmemektedir.
              </p>
              <p>
                Kanun’un 13. Maddesi kapsamındaki haklarımı kullanmak adına doldurmuş olduğum işbu Başvuru Formu ve ekleri
                kapsamında, Şirket’in değerlendirmesini sunmuş olduğum kişisel verilerimin ve özel nitelikli kişisel
                verilerimin Şirket tarafından veya Şirket’in bu konuda danışmanlık alacağı 3. Kişiler tarafından işlenmesine
                rıza gösteriyorum.
              </p>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Başvuru Sahibi (Kişisel Veri Sahibi)</strong>
                </p>
                <p>Adı Soyadı :</p>
                <p>Başvuru Tarihi :</p>
                <p>İmza :</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-xs text-gray-500">
                Bu metin, veri sahibi başvurularında kullanılmak üzere hazırlanmış tam metin başvuru formudur. Gerekli
                alanları doldurup imzalayarak yukarıda belirtilen kanallardan PİRİ DİJİTAL&apos;e iletebilirsiniz.
              </p>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Formu Yazdır
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

