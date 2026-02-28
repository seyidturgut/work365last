import { motion } from "framer-motion";

export default function GizlilikSozlesmesi() {

  return (
    <div className="bg-white">
      <section className="relative pt-28 pb-16 bg-work-navy-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.45),transparent_55%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Kişisel Verilerin Korunması ve Gizlilik Politikası
          </motion.h1>
          <p className="text-blue-100 mt-3 max-w-3xl">
            PİRİ DİJİTAL ANONİM ŞİRKETİ&apos;nin kişisel verilerin korunması, gizliliğin sağlanması ve işlenmesine ilişkin
            benimsediği prensipleri açıklayan metindir.
          </p>
        </div>
      </section>

      <section className="py-12 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-2xl border shadow-lg p-6 md:p-10 text-gray-800 text-sm md:text-base leading-relaxed space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-2">
              KİŞİSEL VERİLERİN KORUNMASI VE GİZLİLİK POLİTİKASI
            </h2>

            <h3 className="text-lg font-bold text-gray-900 pt-2">Amaç ve Kapsam</h3>
            <p>
              İşbu Kişisel Verilerin Korunması ve Gizlilik Politikası, 6698 Sayılı Kişisel Verilerin Korunması Kanunu başta
              olmak üzere, ulusal ve uluslararası düzenlemelere uyum sağlamak amacı ile PİRİ DİJİTAL ANONİM ŞİRKETİ’nin
              (“Şirket”) kişisel verilerin korunması, gizliliğinin sağlanması ve işlenmesine ilişkin benimsemiş olduğu
              prensipleri açıklamaktadır.
            </p>
            <p>İşbu Politika, Şirket’in, çalışanları dışındaki ilgili kişilerin kişisel verilerinin işlenmesine ilişkindir.</p>
            <p>İşbu Politika’da,</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Hangi kişi gruplarının kişisel verilerinin işlendiği (İlgili Kişi Kategorizasyonu),</li>
              <li>Kişisel veri kategorileri ve örnek kişisel veri türleri,</li>
              <li>Kişisel veri toplama yöntemleri,</li>
              <li>Kişisel verilerin işlenmesine ilişkin ilkeler,</li>
              <li>Kişisel verilerin işlenmesindeki hukuki sebepler,</li>
              <li>İlgili kişisel verilerin işleme amaçları,</li>
              <li>Profilleme ve segmentasyon,</li>
              <li>Kişisel verilerin kimlere hangi amaçlarla aktarılabileceği,</li>
              <li>Kişisel verilerin güvenliğini sağlamak amacıyla alınan teknik ve idari tedbirleri,</li>
              <li>Kişisel verilerin saklanma süreleri,</li>
              <li>Kişisel verilerin silinmesi, yok edilmesi ve anonim hale getirilmesi,</li>
              <li>
                İlgili kişilerin kendi kişisel verileri üzerindeki haklarının neler olduğunu ve bu hakları nasıl
                kullanabilecekleri
              </li>
            </ul>
            <p>ayrıntılı olarak açıklanmaktadır.</p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">Tanımlar</h3>
            <div className="space-y-2">
              <p>
                <strong>Açık Rıza:</strong> Belirli bir konuya ilişkin, bilgilendirilmeye dayanan ve özgür iradeyle açıklanan
                rıza.
              </p>
              <p>
                <strong>Anonim Hale Getirme:</strong> Kişisel verinin, başka verilerle eşleştirilerek dahi hiçbir surette
                kimliği belirli veya belirlenebilir bir gerçek kişiyle ilişkilendirilemeyecek hale getirilmesi.
              </p>
              <p>
                <strong>Kişisel Veri:</strong> Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi.
              </p>
              <p>
                <strong>İlgili Kişi:</strong> Kişisel verisi işlenen gerçek kişi.
              </p>
              <p>
                <strong>Kişisel Verilerin İşlenmesi:</strong> Kişisel verilerin tamamen veya kısmen otomatik olan ya da
                herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilmesi,
                kaydedilmesi, depolanması, muhafaza edilmesi, değiştirilmesi, yeniden düzenlenmesi, açıklanması,
                aktarılması, devralınması, elde edilebilir hale getirilmesi, sınıflandırılması ya da kullanılmasının
                engellenmesi gibi veriler üzerinde gerçekleştirilen her türlü işlem.
              </p>
              <p>
                <strong>Kanun:</strong> 7 Nisan 2016 tarihli ve 29677 sayılı Resmi Gazete’de yayımlanan 6698 sayılı Kişisel
                Verilerin Korunması Kanunu.
              </p>
              <p>
                <strong>Kurul:</strong> Kişisel Verileri Koruma Kurulu.
              </p>
              <p>
                <strong>Özel Nitelikli Kişisel Veri:</strong> Irk, etnik köken, siyasi düşünce, felsefi inanç, din, mezhep
                veya diğer inançlar, kılık kıyafet, dernek vakıf ya da sendika üyeliği, sağlık, cinsel hayat, ceza
                mahkumiyeti ve güvenlik tedbirleriyle ilgili veriler ile biyometrik ve genetik veriler.
              </p>
              <p>
                <strong>Politika:</strong> Kişisel Verilerin Korunması ve Gizlilik Politikası.
              </p>
              <p>
                <strong>Veri İşleyen:</strong> Veri sorumlusunun verdiği yetkiye dayanarak onun adına kişisel veri işleyen
                gerçek ve tüzel kişidir.
              </p>
              <p>
                <strong>Veri Sorumlusu:</strong> Kişisel verilerin işlenme amaçlarını ve vasıtalarını belirleyen, verilerin
                sistematik bir şekilde tutulduğu yeri yöneten kişidir.
              </p>
              <p>
                <strong>Veri Minimizasyonu:</strong> Kişisel verilerin işlenme amacının gerektirdiği kadar talep edilmesi ve
                işlenmesi, kullanım amacının sona ermesi halinde ise verilerin tamamen silinmesi.
              </p>
            </div>

            <h3 className="text-lg font-bold text-gray-900 pt-2">İlgili Kişi Kategorizasyonu</h3>
            <p>
              Şirket, temel işleme faaliyetine konu ilgili kişi ve ilgili kişilerle bağlantılı olarak kişisel verileri
              işlenen alt kişi kategoriler bazında bir kategorizasyon yapmaktadır.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Üye/Kullanıcı: Çevrimiçi Üye/Kullanıcı</li>
              <li>Potansiyel Üye/Kullanıcı: Potansiyel Çevrimiçi Üye/Kullanıcı</li>
              <li>Tedarikçi: Hizmet Alınan Tedarikçinin Hissedarı/Yöneticisi, Tedarikçi Çalışanı</li>
              <li>Potansiyel Tedarikçi: Hizmet Alıcak Potansiyel Tedarikçinin Hissedarı/Yöneticisi, Potansiyel Tedarikçi Çalışanı</li>
              <li>Ziyaretçi: Çevrimiçi Ziyaretçi</li>
              <li>3. Kişiler</li>
            </ul>
            <p>
              Yukarıda sıralanan ilgili kişi gruplarının, somut işleme karakteristiği doğrultusunda genişlemesi söz konusu
              olabilecektir.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">İşlenen Kişisel Verileriniz</h3>
            <p>
              Şirket, ilgili kişi ile olan ilişkisi kapsamında her bir işleme faaliyeti açısından farklı kişisel veriler
              işlemektedir. Bu kapsamda Şirket, veri minimizasyonu ilkesi doğrultusunda Şirket’in yönetim faaliyetlerini
              sürdürmesi, taraflar arasındaki ilişkinin yürütülmesi ve hukuki yükümlülüklerin yerine getirilmesi amaçları ile
              doğru orantılı olarak sadece gerekli ve ilgili kişisel verileri işlemektedir.
            </p>
            <p>
              Veri kategorizasyonu ve örnek veri türleri için lütfen işbu Politika’nın EK – 1 başlığı altında yer alan
              açıklamaları inceleyiniz.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">Kişisel Verileri Toplama Yöntemleri</h3>
            <p>
              Şirket, kişisel verileri doğrudan ilgili kişilerin kendisinden, işvereninden, aile ve yakınlarından, aracı
              kişilerden, tedarikçilerden, e-posta, posta, mağazalar, çağrı merkezi, internet siteleri, mobil uygulama, sosyal
              medya hesapları, güvenlik kameraları, çerezler, faks, idari ve adli makamlardan gelen tebligatlar ve sair
              iletişim kanalları aracılığıyla görsel, işitsel, elektronik veya yazılı olarak, Kanun’da belirtilen kişisel
              veri işleme şartlarına uygun olarak toplamaktadır.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">Kişisel Verilerin İşlenmesine İlişkin İlkeler</h3>
            <p>
              Kişisel veriler, aşağıda açıklanan Kanun’un 4. maddesinde belirtilen ilkelere uygun olarak işlenmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Kişisel verilerin hukuka ve dürüstlük kuralına uygun işlenmesi; Şirket, her işleme sürecinde hukuken
                öngörülmüş kuralları gözetmekte, işleme amacı ile sınırlı olarak işleme faaliyetlerini sürdürmekte ve ilgili
                kişilerin çıkarlarını ve makul beklentilerini dikkate almaktadır.
              </li>
              <li>
                Kişisel verilerin doğru ve güncel olması; Şirket tarafından işlenen kişisel verilerinizin güncel olup
                olmadığına, buna ilişkin kontrollerin yapılmasına dikkat edilir. İlgili kişilerin bu kapsamda doğru ve güncel
                olmayan verilerinin düzeltilmesini veya silinmesini isteme hakkı güvence altına alınır.
              </li>
              <li>
                Kişisel verilerin belirli, açık ve meşru amaçlar için işlenmesi; Şirket, işleme faaliyetlerinin meşru amaçlar
                doğrultusunda olduğunu temin eder, işleme faaliyetine ilişkin her detayı önceden belirler ve işleme
                faaliyetlerinin ilgili kişi tarafından açık bir şekilde anlaşılabilir olmasını sağlar.
              </li>
              <li>
                Kişisel verilerin işlendiği amaçla bağlantılı, sınırlı ve ölçülü olması; Şirket, kişisel verileri yalnızca
                ilgili işleme faaliyetlerinin gerektirdiği nitelikte ve ölçüde toplamakta olup belirlenen amaçlarla sınırlı
                olarak işlemektedir.
              </li>
              <li>
                Kişisel verilerin mevzuatın ya da işleme amaçlarının gerektirdiği süre kadar saklanması; Şirket tarafından
                işleme amacının ortadan kalkmasından sonra ya da mevzuatta öngörülen sürenin dolması ile birlikte kişisel
                veriler silinmekte, yok edilmekte veya anonimleştirilmektedir.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-gray-900 pt-2">Kişisel Verilerin İşlenmesine İlişkin Şartlar</h3>
            <p>
              Kanun’un 5. maddesinin 2. fıkrası kapsamında kişisel veriler, Şirket tarafından aşağıdaki işleme şartları
              doğrultusunda işlenmektedir.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Gerekli olduğu durumlarda sizlerden aldığımız açık rızanız (örn. profilleme, analiz, pazarlama ve reklam
                amaçları için kişisel verilerinizin işlenmesi)
              </li>
              <li>
                Kanunlarda kişisel verilerinizi işlediğimiz sürecin açıkça öngörülmesi (örn. ticari ileti onayında bulunan
                ad/soyad bilgisi ve imzanız)
              </li>
              <li>
                Sizlerle bir sözleşme ilişkisi kurmamız veya bu sözleşmeden kaynaklanan ifa yükümlülüğümüz ile doğrudan
                doğruya ilgili olması kaydıyla, sizlere ait kişisel verilerin işlenmesinin gerekli olması (örn. sözleşme
                kuruluş aşamasında kimlik bilgilerinizin işlenmesi)
              </li>
              <li>
                Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi için zorunlu olması (örn. işyerinin, çalışanların
                veya ziyaretçilerin güvenliğinin sağlanması amacıyla güvenlik kamerası bulundurulması)
              </li>
              <li>
                Kişisel verilerin ilgili kişinin kendisi tarafından alenileştirilmiş olması (örn. halka açık sosyal medya
                platformları veya internet siteleri üzerinden ticari ilişki kurulması amacıyla paylaşmış olduğunuz iletişim
                bilgileriniz aracılığı ile sizinle iletişime geçilmesi)
              </li>
              <li>
                Bir hakkın tesisi, kullanılması veya korunması için zorunlu olması (örn. dava zamanaşımı süresi boyunca
                gerekli olabilecek kişisel verilerin saklanması)
              </li>
              <li>
                Temel hak ve özgürlüklerinize zarar vermemek kaydı ile, Şirket’in meşru menfaatleri doğrultusunda zorunlu
                olması,
              </li>
              <li>
                Fiili imkansızlık nedeniyle rızasını açıklayamayacak durumda bulunan veya rızasına hukuki geçerlilik
                tanınmayan kişinin kendisinin ya da bir başkasının hayatı veya beden bütünlüğünü koruması için zorunlu
                olması
              </li>
            </ul>
            <p>
              Şirket, kural olarak özel nitelikli kişisel verileri işlemez. Ne var ki;
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Şirket’in faaliyetleri ve sunduğu hizmetler çerçevesinde, biyometrik verileriniz işlenebilecektir. Bu
                veriler, mevzuat gereği kimlik tespiti ve bilgi güvenliğinin sağlanması amacıyla toplanacak ve işlenecek,
                ilgili mevzuatta belirtilen süreler boyunca muhafaza edilecektir.
              </li>
              <li>
                Biyometrik verileriniz Kişisel Verilerin Korunması Kurulu’nun yayımladığı “Biyometrik Verilerin İşlenmesinde
                Dikkat Edilmesi Gereken Hususlara İlişkin Rehber” metnine uygun olarak işlenecek ve muhafaza edilecektir.
              </li>
            </ul>
            <p>
              Şirket işleme amacı doğrultusunda veri sahibinin gerekli olmayan özel nitelikli kişisel verileri sunması
              halinde, söz konusu özel nitelikli kişisel verileri imha edecek veya maskeleyecektir.
            </p>
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
                İstihdam, iş sağlığı ve güvenliği, sosyal güvenlik, sosyal hizmetler ve sosyal yardım alanlarındaki hukuki
                yükümlülüklerin yerine getirilmesi için zorunlu olması;
              </li>
              <li>
                Siyasi, felsefi, dini veya sendikal amaçlarla kurulan vakıf, dernek ve diğer kâr amacı gütmeyen kuruluş ya da
                oluşumların, tâbi oldukları mevzuata ve amaçlarına uygun olmak, faaliyet alanlarıyla sınırlı olmak ve üçüncü
                kişilere açıklanmamak kaydıyla; mevcut veya eski üyelerine ve mensuplarına veyahut bu kuruluş ve oluşumlarla
                düzenli olarak temasta olan kişilere yönelik olması.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-gray-900 pt-2">Kişisel Verilerin İşlenmesindeki Amaçlar</h3>
            <p>
              Kişisel veriler, işbu Politika’nın 7. maddesinde belirtilen işleme şartlarına uygun olarak her işleme süreci
              bakımından farklı amaçlar ile işleyebilecektir. Bu kapsamda, paylaşmış olduğunuz kişisel verileriniz farklı
              Şirket departmanları tarafından farklı işleme süreçlerinde, farklı işleme amaçları doğrultusunda
              kullanılabilecektir. Örneğin, hizmet satış ve operasyon sürecinde satış departmanı tarafından “hizmetlerin
              satış süreçlerinin planlanması ve icrası” amacıyla işlenen ad/soyad bilginiz, faturalandırma sürecinde finans
              departmanı tarafından “finans ve muhasebe işlerinin yürütülmesi” amacıyla işlenebilecektir.
            </p>
            <p>
              Bu kapsamda, açık rıza alınmasını gerektiren durumlarda gerekli bilgilendirme yapılıp, ilgili kişisel veri
              sadece açık rızanın alınması ihtimalinde işlenebilecektir. Örneğin, yukarıdaki örnek ile paralel olarak, hizmet
              satış sürecinde toplanan kimlik bilgileri, pazarlama departmanı tarafından “reklam/kampanya/promosyon
              süreçlerinin yürütülmesi” amacıyla işlenecek olması halinde bu konuya ilişkin açık rıza talep edilecektir.
            </p>
            <p>
              Kişisel verilerin hangi amaçlarla işlendiği hakkında detaylı bilgi için lütfen işbu Politika’nın EK-2 başlığı
              altında yer alan açıklamaları inceleyiniz.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">Profilleme ve Segmentasyon</h3>
            <p>Şirket işlediği kişisel verileri kullanarak;</p>
            <p>
              Ticari elektronik ileti izni veren ilgili kişiler bakımından aşağıdaki amaçlar doğrultusunda profilleme ve
              segmentasyon yapacaktır.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>İlgili kişinin beğeni ve tercihlerine göre içerik hazırlanması, reklam, tanıtım ve indirim materyalleri gönderilmesi</li>
              <li>
                Yeni hizmetler hakkındaki diğer iletişimlerin ve mevcut hizmetler hakkındaki güncellemelerin/haberlerin
                gönderilmesi
              </li>
              <li>Tebrik, kutlama ve duyuru vb. içeriklerin gönderilmesi</li>
            </ul>
            <p>
              Ticari elektronik ileti onayı vermemiş olan ilgili kişiler bakımından da aşağıdaki amaçlar doğrultusunda
              profilleme ve segmentasyon yapacaktır.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                İlgili kişinin tercihleri, şikayet ve önerileri kapsamında hizmetlerin iyileştirilmesi (en çok ve en az tercih
                edilen hizmetler belirlenerek hizmet kataloğunun güncellenmesi)
              </li>
              <li>
                İlgili kişinin hizmet tercihlerinin analiz edilmesi sonucu oluşturulan özel modeller ile, bir hizmeti alma
                potansiyeli yüksek Üye/Kullanıcılara özel kampanyalar düzenlenmesi
              </li>
              <li>Hizmetlerin tercih edilirliğinin arttırılmasına ilişkin çalışmalar yapılması</li>
            </ul>
            <p>
              Profilleme ve segmentasyon çalışmaları kapsamında ilgili kişilerin kişisel verileri doğrudan kullanılmamakta
              olup, her bir üye için belirlenen özel kodlar üzerinden işlemler yapılmaktadır. Bu şekilde kişisel verilerin
              korunmasını sağladığı gibi, bu Üye/Kullanıcı numaraları da “Need to Know” ilkesi kapsamında sadece ilgili kişi
              veya departmanların erişimine açıktır.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">Kişisel Verilerin Aktarımı</h3>
            <p>
              Şirket, kişisel verileri yalnızca işbu Politika’da belirtilen amaçlar doğrultusunda ve Kanun’un 8. ve 9.
              maddelerine uygun olarak yurt içinde ve yurt dışında bulunan taraflara aktarmaktadır.
            </p>
            <p>
              Bu kapsamda gerçekleştirilen kişisel veri aktarımları güvenli ortam ve kanallar aracılığıyla gerçekleşmektedir.
              Üçüncü taraflardan alınan hizmetin içeriği ve kapsamına bağlı olarak; ilgili kişi kişisel verilerinin
              aktarımına gerek olmayan tüm hallerde Pseudonymous data (takma adlı veri) kullanılarak aktarım
              yapılmaktadır.
            </p>
            <p>
              Yurt içi ve yurt dışı aktarımlarında Şirket, güncel teknolojilerin sunduğu ve ilgili uygulamanın maliyet
              dengesi çerçevesinde mümkün olan her türlü idari ve teknik tedbiri almakta, bu kapsamda ilgili yasal
              düzenlemeler ile Kurul kararları doğrultusunda güvenliğe ilişkin uygulamalarını güncel tutmaktadır. Söz konusu
              idari ve teknik tedbirler kapsamında, aktarım yapılan taraflar ile veri aktarımına ve işlenmesine ilişkin özel
              sözleşmeler yapılmakta ve gerekli taahhütler alınmaktadır.
            </p>
            <p>
              Kanun’un 9. maddesi uyarınca, kural olarak, kişisel veriler ilgili kişinin açık rızası olmaksızın yurt dışına
              aktarılmaz. Bunun karşısında, kişisel veriler, işbu Politika’nın 7. maddesinde açıklanan şartların varlığı
              halinde, yeterli korumanın bulunduğu ülkelere; yeterli korumanın bulunmadığı hallerde ise aktarım yapılan veri
              sorumlusu taraf ile imzalanan taahhütnamenin Kurul tarafından onaylanması durumunda, ilgili kişilerin açık
              rızası alınmaksızın yurt dışına aktarılabilecektir. Bunun karşısında, kişisel veriler, aşağıdaki aktarım
              şartlarının varlığı ve aktarımın yapılacağı ülke, ülke içerisindeki sektörler veya uluslararası kuruluşlar
              hakkında yeterlilik kararı bulunması halinde, ilgili kişilerin açık rızası alınmaksızın yurt dışına
              aktarılabilecektir;
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
                İstihdam, iş sağlığı ve güvenliği, sosyal güvenlik, sosyal hizmetler ve sosyal yardım alanlarındaki hukuki
                yükümlülüklerin yerine getirilmesi için zorunlu olması;
              </li>
              <li>
                Siyasi, felsefi, dini veya sendikal amaçlarla kurulan vakıf, dernek ve diğer kâr amacı gütmeyen kuruluş ya da
                oluşumların, tâbi oldukları mevzuata ve amaçlarına uygun olmak, faaliyet alanlarıyla sınırlı olmak ve üçüncü
                kişilere açıklanmamak kaydıyla; mevcut veya eski üyelerine ve mensuplarına veyahut bu kuruluş ve oluşumlarla
                düzenli olarak temasta olan kişilere yönelik olması.
              </li>
            </ul>
            <p>
              Kişisel verilerinizin hangi amaçlarla kimlere aktarıldığı hakkında detaylı bilgi için lütfen işbu Politika’nın
              EK-3 başlığı altında yer alan açıklamalara bakınız.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">
              Kişisel Verilerin Güvenliğini Sağlamak Amacıyla Alınan İdari ve Teknik Tedbirler
            </h3>
            <p>
              Şirket, kişisel verilerinizin gizliliğinin, bütünlüğünün ve güvenliğinin sağlanması için her işleme süreci
              bazında gerekli olan idari ve teknik tedbirleri almayı taahhüt etmektedir. Şirket, kişisel verilerin hatalı
              kullanımını, hukuka aykırı olarak işlenmesini, verilere yetkisiz erişimi, verilerin ifşa edilmesini,
              değiştirilmesini veya imha edilmesini engellemek amaçları ile gerekli adımların atılması ve denetimin
              sağlanması adına Şirket içi yetkilendirmeler yapmakta ve gereklilik halinde dış hizmet sağlayıcılarından
              profesyonel destek almaktadır. Bu kapsamda Şirket, ilgili mevzuata ve Kurul tarafından yayımlanmış olan
              rehberlere ve kararlara uygunluk sağlanmasını öncelikli olarak gözetir.
            </p>
            <p>
              Kişisel verilerinizin korunmasına yönelik hangi önlemlerin alındığına ilişkin detaylı bilgi için lütfen işbu
              Politika’nın EK-4 başlığı altında yer alan açıklamaları inceleyiniz.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">Kişisel Verilerin Saklanma Süreleri</h3>
            <p>
              Şirket, işlediği kişisel verileri ilgili mevzuatta öngörülen veya işleme amacının gerektirdiği süreler boyunca
              Kanun ile uyumlu olarak muhafaza eder. Kişisel Verilerin Saklanması ve İmhası aşamasındaki yaklaşık süreler
              için lütfen işbu Politika’nın EK-5 başlığı altında yer alan açıklamaları inceleyiniz.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">
              Kişisel Verilerin Silinmesi, Yok Edilmesi ve Anonimleştirilmesi Şartları
            </h3>
            <p>
              Şirket, iş süreçleri kapsamında toplayarak işlediği kişisel verileri, Kanun’un 17. ve 7. maddesi ile Türk Ceza
              Kanunu’nun 138. maddesi uyarınca ilgili kanunların öngördüğü süreler ve/veya işleme amacının gerekli kıldığı
              süreler boyunca saklamaktadır. Bu sürelerin sona ermesi durumunda ise Kişisel Verilerin Silinmesi, Yok Edilmesi
              veya Anonim Hale Getirilmesi Hakkında Yönetmelik hükümleri ve Kurul tarafından yayımlanmış olan Kişisel
              Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Rehberi uyarınca silecek, yok edecek veya anonim
              hale getirecektir. Bu kapsamda;
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Kişisel Verilerin Silinmesi: kişisel verilerin ilgili kullanıcılar için hiçbir şekilde erişilemez ve tekrar
                kullanılamaz hale getirilmesi işlemini
              </li>
              <li>
                Kişisel Verilerin Yok Edilmesi: kişisel verilerin hiç kimse tarafından hiçbir şekilde erişilemez, geri
                getirilemez ve tekrar kullanılamaz hale getirilmesi işlemini ifade etmektedir.
              </li>
              <li>
                Kişisel Verilerin Anonim Hale Getirilmesi: kişisel verilerin başka verilerle eşleştirilse dahi hiçbir surette
                kimliği belirli veya belirlenebilir bir gerçek kişiyle ilişkilendirilemeyecek hale getirilmesini
              </li>
            </ul>
            <p>
              ifade etmektedir. Şirket, Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında
              Yönetmelik uyarınca hazırladığı Kişisel Verilerin Saklanması ve İmhası Politikası kapsamında silme, yok etme ve
              anonim hale getirmeye ilişkin yöntemleri ve aldığı teknik ve idari tedbirleri ayrıntılı olarak açıklamaktadır.
              Kişisel Verilerin Saklanması ve İmhası aşamasında Yönetmeliğin öngördüğü periyodik imhanın gerçekleştirileceği
              zaman aralığı 6 ay olarak belirlenmiştir.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">Kanun’un 11. Maddesinde Sayılan Haklarınız</h3>
            <p>
              İlgili kişiler olarak, Kanun’un 11. maddesi doğrultusunda aşağıda sıralanan haklara sahipsiniz.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>a) Kişisel veri işlenip işlenmediğini öğrenme</li>
              <li>b) Kişisel verileri işlenmişse buna ilişkin bilgi talep etme</li>
              <li>c) Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>ç) Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
              <li>d) Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>
                e) Kanun’un 7. Maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini
                isteme
              </li>
              <li>
                f) (d) ve (e) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere
                bildirilmesini isteme
              </li>
              <li>
                g) İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi
                aleyhine bir sonucun ortaya çıkmasına itiraz etme
              </li>
              <li>
                ğ) Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini
                talep etme
              </li>
            </ul>

            <p>
              Haklarınıza ilişkin taleplerinizi belirtmek ve kişisel verileriniz üzerindeki haklarınızı kullanmak amacıyla,
              “Veri Sahibi Başvuru Formu”nu doldurmanız ve aşağıda sıralanan başvuru yöntemlerinden biri ile Şirket’e
              iletmeniz gerekmektedir.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Şahsen Başvuru: İletişim Formu, Şirket merkezine şahsen teslim edilebilir. Bu durumda kişinin kimliğini ibraz
                etmesi gerekmektedir. Zarfın üzerine “Kişisel Verilerin Korunması Kanunu Kapsamında Başvuru” yazılmalıdır.
              </li>
              <li>
                Noter Vasıtası ile Tebligat: İletişim Formu, noter aracılığı ile gönderilebilir. Tebligat konusu olarak
                “Kişisel Verilerin Korunması Kanunu Kapsamında Başvuru” yazılmalıdır.
              </li>
              <li>
                KEP Üzerinden: 5070 Sayılı Elektronik İmza Kanunu’nda tanımlı olan “güvenli elektronik imza” ile imzalanarak
                Şirket’in kayıtlı elektronik posta adresine İletişim Form’u gönderilebilir. E-postanın konusu olarak “Kişisel
                Verilerin Korunması Kanunu Kapsamında Başvuru” yazılmalıdır.
              </li>
              <li>
                E – Posta Aracılığıyla: İletişim Formu, Şirket’in resmi e-posta adresine ([*e-posta*]) gönderilebilir.
                E-postanın konusu olarak “Kişisel Verilerin Korunması Kanunu Kapsamında Başvuru” yazılmalıdır.
              </li>
            </ul>
            <p>
              Başvuru sahibinin kimlik teyidi amacıyla ek belge talebinde bulunulabilir, bu durumda kimlik teyidi için istenen
              ek belgelerin başvuru sahibi tarafından iletilmesi ile birlikte başvuru yapılmış sayılır.
            </p>
            <p>
              Belirtilen yöntemlerle taleplerinizi bize iletmeniz durumunda, Şirket, talebinizin niteliğine göre talebi en
              kısa sürede ve en geç otuz gün içinde ücretsiz olarak sonuçlandıracaktır. Ancak, işlemin ayrıca bir maliyeti
              gerektirmesi hâlinde, Şirket tarafından Kişisel Verileri Koruma Kurulunca belirlenen tarifedeki ücret
              alınacaktır.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">
              Kişisel Verilerin Korunması ve Gizlilik Politikası’nda Yapılacak Değişiklikler
            </h3>
            <p>
              Şirket, işbu Kişisel Verilerin Korunması ve Gizlilik Politikası’nda her zaman değişiklik yapabilir. Bu
              değişiklikler, değiştirilmiş yeni bir politika yayınlanmasıyla birlikte derhal geçerlilik kazanır. İşbu
              Politika’daki değişikliklerden haberdar olmanız için, sizlere gerekli duyuru yapılacaktır.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-2">DÖKÜMAN TARİHÇESİ</h3>
            <p>Versiyon</p>
            <p>Yayın Tarihi</p>
            <p>Değişikliğin Tanımı</p>

            <h2 className="text-xl font-bold text-gray-900 border-b pb-2 pt-6">EK 1 – VERİ KATEGORİZASYONU</h2>
            <p>Şirket’in işbu Politika kapsamında işlemekte olduğu kişisel veri kategorileri genel olarak aşağıdaki gibidir.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kimlik Bilgisi: Ad-Soyadı, Kimlik Numarası vb.</li>
              <li>İletişim Bilgisi: Telefon Numarası, Cep Telefonu Numarası, E-posta Adresi, Adres vb.</li>
              <li>Hukuki İşlem: Tüketici Hakem Heyeti Başvuruları, Dava Dosyaları, İhtarnameler vb.</li>
              <li>Görsel ve İşitsel Kayıtlar: Fotoğraf, Video, Ses Kaydı vb.</li>
              <li>Biyometrik Veriler: Yüz tanıma veya parmak izi kayıt sistemleri aracılığıyla toplanabilecek veriler</li>
              <li>
                Üye/Kullanıcı İşlem Bilgisi: Üye/Kullanıcı Numarası, Ticari İlişki Başlangıç/Bitiş Tarihi ve Nedeni, Talepler,
                Tercih Edilen Hizmet Bilgisi, Hizmet Memnuniyet Bilgisi, Hizmet Değişim ve Yenileme Bilgisi, Hizmet
                Talep/Şikayet Bilgisi, Ev Ölçümleri vb.
              </li>
              <li>Risk Yönetimi: Şüpheli veya risk teşkil eden işlemlere dair veriler</li>
              <li>Güvenlik Verileri: IP Adresi veya Site Giriş Çıkış Kayıtları vb.</li>
              <li>
                Finans Bilgileri: Banka Bilgisi, IBAN Numarası, Fatura Bilgileri, Banka Hesap Numarası, Havale Numarası vb.
              </li>
              <li>
                Pazarlama: Tercih Edilen Hizmet Bilgisi, Alışveriş Geçmişi Bilgisi, Anket, Çerez Kayıtları, Hizmet Tercihi vb.
              </li>
            </ul>

            <h3 className="text-md font-semibold text-gray-900 pt-4">
              İLGİLİ KİŞİ BAZINDA VERİ KATEGORİZASYONU
            </h3>
            <p>
              Şirket’in işlemekte olduğu kişisel veri, ilgili kişi kategorileri bazında genel olarak aşağıdaki gibidir.
            </p>
            <p>
              Üye/Kullanıcı: Kimlik Bilgisi, İletişim Bilgisi, Özlük Bilgisi, Hukuki İşlem Bilgisi, Üye/Kullanıcı İşlem
              Bilgisi, Fiziksel Mekan Güvenliği, İşlem Güvenliği Bilgisi, Risk Yönetimi Bilgisi, Finansal Bilgi, Mesleki
              Deneyim, Pazarlama, Görsel ve İşitsel Kayıtlar, Özel Nitelikli Kişisel Veriler
            </p>
            <p>
              Potansiyel Üye/Kullanıcı: Kimlik Bilgisi, İletişim Bilgisi, Özlük ve Meslek Bilgisi, Hukuki İşlem Bilgisi,
              Üye/Kullanıcı İşlem Bilgisi, Fiziksel Mekan Güvenliği, İşlem Güvenliği Bilgisi, Risk Yönetimi Bilgisi, Mesleki
              Deneyim, Pazarlama, Görsel ve İşitsel Kayıtlar
            </p>
            <p>
              Tedarikçi: Kimlik Bilgisi, İletişim Bilgisi, Özlük Bilgisi, Hukuki İşlem Bilgisi, Tedarikçi İşlem Bilgisi,
              Fiziksel Mekan Güvenliği, İşlem Güvenliği Bilgisi, Risk Yönetimi Bilgisi, Finansal Bilgi, Mesleki Deneyim,
              Görsel ve İşitsel Kayıtlar, Özel Nitelikli Kişisel Veriler
            </p>
            <p>
              Potansiyel Tedarikçi: Kimlik Bilgisi, İletişim Bilgisi, Özlük Bilgisi, Tedarikçi İşlem Bilgisi, Fiziksel Mekan
              Güvenliği, İşlem Güvenliği Bilgisi, Risk Yönetimi Bilgisi, Mesleki Deneyim, Görsel ve İşitsel Kayıtlar
            </p>
            <p>Ziyaretçi: Fiziksel Mekan Güvenliği, Görsel ve İşitsel Kayıtlar</p>
            <p>
              Her hukuki ve ticari ilişki kapsamında işlenen kişisel veri kategorileri ve kişisel veriler farklılık
              gösterebilmektedir. Size ilişkin hangi kişisel verilerin işlendiğini saptamak için lütfen tarafınıza sunulan
              aydınlatma metnini inceleyiniz.
            </p>

            <h2 className="text-xl font-bold text-gray-900 border-b pb-2 pt-6">
              EK 2 – KİŞİSEL VERİLERİN İŞLENME AMAÇLARI
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Acil Durum Yönetimi Süreçlerinin Yürütülmesi</li>
              <li>Arşiv ve Saklama Faaliyetlerinin Yürütülmesi</li>
              <li>Bilgi Güvenliği Süreçlerinin Yürütülmesi</li>
              <li>Denetim / Etik Faaliyetlerinin Yürütülmesi</li>
              <li>Eğitim Faaliyetlerinin Yürütülmesi</li>
              <li>Erişim Yetkilerinin Yürütülmesi</li>
              <li>Faaliyetlerin Mevzuata Uygun Yürütülmesi</li>
              <li>Finans ve Muhasebe İşlerinin Yürütülmesi</li>
              <li>Firma / Hizmetlere Bağlılık Süreçlerinin Yürütülmesi</li>
              <li>Fiziksel Mekan Güvenliğinin Temini</li>
              <li>Görevlendirme Süreçlerinin Yürütülmesi</li>
              <li>İç Denetim/ Soruşturma / İstihbarat Faaliyetlerinin Yürütülmesi</li>
              <li>İletişim Faaliyetlerinin Yürütülmesi</li>
              <li>İnsan Kaynakları Süreçlerinin Planlanması</li>
              <li>İş Faaliyetlerinin Yürütülmesi / Denetimi</li>
              <li>İş Sağlığı ve Güvenliği Süreçlerinin Yürütülmesi</li>
              <li>İş Süreçlerinin İyileştirilmesine Yönelik Önerilerin Alınması ve Değerlendirilmesi</li>
              <li>İş Sürekliliğinin Sağlanması Faaliyetlerinin Yürütülmesi</li>
              <li>Lojistik Faaliyetlerinin Yürütülmesi</li>
              <li>Hizmet Satın Alım Süreçlerinin Yürütülmesi</li>
              <li>Hizmet Satış Sonrası Destek Hizmetlerinin Yürütülmesi</li>
              <li>Hizmet Satış Süreçlerinin Yürütülmesi</li>
              <li>Hizmet Üretim ve Operasyon Süreçlerinin Yürütülmesi</li>
              <li>Üye/Kullanıcı İlişkileri Yönetimi Süreçlerinin Yürütülmesi</li>
              <li>Üye/Kullanıcı Memnuniyetine Yönelik Aktivitelerin Yürütülmesi</li>
              <li>Organizasyon ve Etkinlik Yönetimi</li>
              <li>Pazarlama Analiz Çalışmalarının Yürütülmesi</li>
              <li>Performans Değerlendirme Süreçlerinin Yürütülmesi</li>
              <li>Risk Yönetimi Süreçlerinin Yürütülmesi</li>
              <li>Saklama ve Arşiv Faaliyetlerinin Yürütülmesi</li>
              <li>Sözleşme Süreçlerinin Yürütülmesi</li>
              <li>Talep / Şikayetlerin Takibi</li>
              <li>Veri Sorumlusu Operasyonlarının Güvenliğinin Temini</li>
              <li>Yetkili Kişi, Kurum ve Kuruluşlara Bilgi Verilmesi</li>
              <li>Yönetim Faaliyetlerinin Yürütülmesi</li>
              <li>Ziyaretçi Kayıtlarının Oluşturulması ve Takibi</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 border-b pb-2 pt-6">
              EK 3 – KİŞİSEL VERİLERİN YURT İÇİ/DIŞI AKTARIMI
            </h2>
            <p>
              Tedarikçi – Bilgi, İşlem ve Kişisel Verilerin Güvenliğinin Sağlanması: Kişisel verilerin, güvenli bir şekilde
              saklanması amacıyla bulut bilişim vb. yollar kullanılarak muhafaza hizmeti sunan tedarikçilerle paylaşılması,
              Üye/Kullanıcı ve tedarikçilere ilişkin ticari süreçlerin takip edilmesi ve yönetilmesi amacıyla bulut bilişim
              vb. yollarla yazılım hizmeti sunan tedarikçilere aktarım yapılması.
            </p>
            <p>
              Hizmet Alış ve Satış Sonrası Destek Süreçlerinin Yürütülmesi, Lojistik Faaliyetlerinin Yürütülmesi: Kişisel
              verilerin, sözleşmesel ilişkinin ifası kapsamında bankalar, kargo şirketleri, danışmanlar ve destek veren diğer
              taraflarla paylaşılması.
            </p>
            <p>
              İletişim Süreçlerinin Yürütülmesi: Güvenli bir şekilde e-posta üzerinden iletişim kurulması amacıyla, sunucu ve
              bulut hizmeti kullanarak e-posta hizmeti sağlayan tedarikçilere aktarılması.
            </p>
            <p>
              Pazarlama, Kampanya ve Reklam Süreçlerinin Yürütülmesi: Kişisel verilerin, ticari ileti göndermek, kampanya
              duyuruları yapmak ve hizmet reklamları sunmak amacıyla bu hizmetleri veren üçüncü taraflarla paylaşılması.
            </p>
            <p>
              Organizasyon ve Etkinlik Yönetimi: Seyahat, konferans, kongre, eğitim, lansman vb. organizasyonların
              düzenlenmesinde rol oynayan hizmet sağlayıcılara yapılan paylaşımlar.
            </p>
            <p>
              Hukuki Süreçlerin Takibi: Kişisel verilerin, tüketici hakem heyeti ve dava süreçleri dahil olmak üzere
              danışmanlık alınan avukat veya hukuk hizmetleri tedarikçileriyle paylaşılması.
            </p>
            <p>
              Üye/Kullanıcı – Hizmet Satış ve Satış Sonrası Destek Süreçlerinin Yürütülmesi: Şirket tarafından yürütülen satış
              süreçlerine ilişkin iletişim, lojistik, kurulum, destek vb. süreçlerinin tamamlanması adına tedarikçilere
              ilişkin kişisel verilerin Üye/Kullanıcılar ile paylaşılması.
            </p>
            <p>
              Gerçek kişi Üye/Kullanıcıların taleplerinin karşılanması adına ilgili yetkili satıcılarla (bayi) Üye/Kullanıcıların
              kimlik ve iletişim bilgilerinin paylaşılması.
            </p>
            <p>
              Yetkili Kişi, Kurum ve Kuruluşlar – Yetkili Kişi, Kurum ve Kuruluşlara Bilgi Verilmesi: Kişisel verilerin,
              kanun tarafından kendilerine yetki verilmiş kişi, kurum ve kuruluşlara ilgili mevzuat yükümlülüğü çerçevesinde
              paylaşılması.
            </p>
            <p>
              Her hukuki ve ticari ilişki kapsamında yurt içine veya yurt dışına yapılan aktarımlar farklılık
              gösterebilmektedir. Sizin kişisel verilerinize ilişkin yapılan aktarımlar hakkında daha fazla bilgi için lütfen
              tarafınıza sunulan aydınlatma metnini inceleyiniz.
            </p>

            <h2 className="text-xl font-bold text-gray-900 border-b pb-2 pt-6">EK 4 – İDARİ VE TEKNİK TEDBİRLER</h2>
            <p>
              Şirket, işlediği kişisel verilere hukuka aykırı erişimin engellenmesi, bu verilerin hukuka aykırı işlenmesinin
              önlenmesi ve kişisel verilerin muhafazasının sağlanmasına ilişkin olarak Kanun’un 12. maddesi doğrultusunda
              aşağıdaki teknik ve idari tedbirleri almaktadır:
            </p>
            <h4 className="font-semibold text-gray-900 pt-2">İdari Tedbirler</h4>
            <p>
              Kişisel Veri Güvenliği Politikalarının ve Prosedürlerinin Belirlenmesi: Şirket kişisel verilerin korunmasına
              ilişkin olarak, hem genel işleme faaliyetlerine hem de özellik gösteren işleme süreçlerine yönelik politika ve
              prosedürler belirlenmiştir. Bu kapsamda Şirket başlıca aşağıdaki politikaları yürürlüğe koymuştur:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kişisel Verilerin Korunması ve Gizliliği Politikası</li>
              <li>Çerez Politikası</li>
            </ul>
            <p>
              Bunlara ek olarak Şirket’in, çalışanlarının ve yöneticilerinin kişisel veri işleme faaliyetlerine ilişkin
              olarak daha detaylı talimatları içeren iç yönergeleri mevcuttur. Şirket politikalarını, prosedürlerini ve iç
              yönergelerini meydana gelen mevzuat değişiklikleri ve yeni Kurul kararları doğrultusunda günceller. Çalışanların
              Şirket politika ve prosedürlerine uygun hareket edip etmedikleri düzenli olarak denetlenir.
            </p>
            <p>
              Mevcut Risk ve Tehditlerin Belirlenmesi: Şirket kişisel veri güvenliğini zafiyete uğratabilecek her türlü risk
              ve tehditleri, bir ihlal meydana gelmeden önce belirler. Bu kapsamda risk ve tehditlerin hangi veri
              kategorilerine, hangi işleme faaliyetlerine ve araçlarına ilişkin olduğu konusunda iç değerlendirme yapar. Söz
              konusu değerlendirme yapılırken, özellikle risk ve tehditlerin özel nitelikli kişisel verilere ilişkin olup
              olmadığına dikkat eder. Şirket belirlemiş olduğu risk ve tehditlerin minimize edilmesi, önlenmesi ve ortadan
              kaldırılması için gerekli adımları atar.
            </p>
            <p>
              Çalışanlara Yönelik Önlemler: Şirket çalışanlarının, çeşitli bilgi güvenliği ihlallerine karşı farkındalıklarını
              artırmak, kişisel verilerin hukuka uygun işlenmesi ve bilgi ihlali olaylarında insan faktörünün etkisini en aza
              indirmek amacıyla gerek Şirket içi departmanlarımızca, gerekse de hukuki ve teknik danışmanlık hizmeti aldığımız
              taraflarca eğitimler verilmektedir. Şirket, çalışanlarını kişisel verilerin korunmasına ilişkin bilinçlenmeleri
              adına düzenli eğitim süreçleri, bilgilendirme yazıları, sözlü bilgilendirmeler ve iç yönergeler sunar.
            </p>
            <p>
              Veri Minimizasyonu: Şirket, Kanun’un 4. maddesinde öngörülen ilkeler doğrultusunda, ilgili kişinin işleme
              faaliyeti kapsamında gerekli olmayan hiçbir verisini işlememeye özen gösterir. Bu noktada Şirket, işleme
              faaliyetini önceden inceler ve hukuki/ticari yükümlülüklerini yerine getirebilmesi için gerekli olan kişisel
              verileri ilgili kişiden talep eder. İlgili kişinin talep edilmeyen bir kişisel veri aktarması halinde bu
              kişisel veri derhal imha edilir veya maskelenir.
            </p>
            <p>
              Veri İşleyene Yönelik Tedbirler: Şirket, yürütmekte olduğu bir işleme faaliyetlerine ilişkin olarak alt-işleten
              desteği alacağı zaman öncelikle alt-işleyenin kişisel verilerin korunması konusundaki yetkinliğini ve
              yeterliliğini analiz eder. Bu kapsamda alt-işleyen asgari olarak Şirket’in öngörmüş olduğu kişisel verilerin
              korunması politikalarına ve prosedürlerine uygun hareket edeceğini yazılı bir şekilde taahhüt eder. Alt-işleyenin
              işleme faaliyetleri ve kişisel verileri korumasına yönelik çabaları Şirket tarafından denetlenir.
            </p>

            <h4 className="font-semibold text-gray-900 pt-2">Teknik Tedbirler</h4>
            <p>
              Bilgi Teknolojileri Sistemleri: Şirket, kişisel veri güvenliğinin sağlanması adına bilgi teknolojileri sistemleri
              tedarik eden uzman hizmet sağlayıcılarla çalışmaktadır. Bu kapsamda, Şirket’in gereksinimleri ve zafiyetleri
              güncel olarak takip edilip, gerekli görülen noktalarda destek sağlanmaktadır.
            </p>
            <p>
              Siber Güvenlik Tedbirlerinin Alınması: Şirket, elektronik ortamda işlenen kişisel verilerin güvenliğinin
              sağlanması amacıyla siber güvenlik önlemleri almaktadır. Bu kapsamda, hem Şirket içi bilişim teknolojisi
              çalışanlarının hem de uzman hizmet tedarikçilerin yardımıyla Şirket, bir siber güvenlik zafiyetine uğranmaması
              adına gerekli tüm tedbirleri alır. Örneğin, Anti-Virüs, Firewall, VPN, kullanıcı tanımlamaları ve Need to Know
              ilkesi, DLP, DRM gibi uygulamalar kullanılmaktadır.
            </p>
            <p>
              Kişisel Veri Güvenliğinin Takibi: Şirket fiziksel işlenen kişisel verilerin korunmasına ilişkin düzenli olarak
              denetim yapmaktadır. Aynı zamanda elektronik ortamda işlenen kişisel verilerin güvenliğinin sağlanıp
              sağlanmadığına da ilişkin testler yapmaktadır. Fishing e-mail testleri, sızma testleri ve Bilgi Güvenliği Tehdit
              ve Olay Yönetimi sistemi bu kapsamda örnek olarak sayılabilir.
            </p>
            <p>
              Kişisel Veri İçeren Ortamların Güvenliğinin Sağlanması: Kişisel veri muhafaza edilen fiziki ortamlar kilit
              altında tutulmakta, yangın, sel, hırsızlık gibi durumlara karşı gerekli önlemler alınmakta, kağıt yoluyla
              aktarılan kişisel veriler için kapalı ve mühürlü zarf metodu kullanılmakta, sunucu veya arşiv odalarına giriş
              çıkışlar ek güvenlik tedbirleri ile korunmaktadır.
            </p>
            <p>
              Kişisel Verilerin Yedeklenmesi: Şirket, kişisel verilerin herhangi bir sebeple zarar görmesi, yok olması,
              çalınması veya kaybolması gibi hallerde yedeklenen kişisel verileri kullanarak kayıp riskini ortadan
              kaldırmaktadır. Yedeklenen kişisel verilerin güvenliği de en üst düzeyde sağlanmaktadır.
            </p>
            <p>
              Diğer Örnekler: Kişisel verilerin alındığı web sitesindeki tüm alanların SSL ile korunması, Pseudonymization
              kullanılması, kağıt ortamdaki kişisel verilerin kilitli dolaplarda muhafaza edilmesi, üçüncü taraflara ait
              çerezler aracılığıyla işlenen kişisel verilerin üyelik sona erdiğinde silinmesi, kapalı sistem ağ kullanımı,
              yetki matrisleri, şifreli depolama sistemleri, log kayıtlarının kullanıcı müdahalesi olmadan tutulması ve veri
              maskeleme yöntemi gibi uygulamalar.
            </p>
            <p>
              Özel Nitelikli Kişisel Verilere Özgü Tedbirler: Kurul’un 01/01/2018 Tarihli ve 2018/10 Sayılı Kararı gereği,
              özel nitelikli kişisel verilerin işlenmesine yönelik çalışanlara periyodik eğitimler verilmekte, gizlilik
              sözleşmeleri ve taahhütnameleri imzalanmakta, erişim yetkileri sınırlandırılıp denetlenmekte, elektronik ve
              fiziki ortamlar özel güvenlik önlemleri ile korunmakta, log kayıtları düzenli olarak tutulmakta, yazılımlar
              güncel tutulmakta ve uzaktan erişim gerekiyorsa çift taraflı doğrulama anahtarları kullanılmakta, aktarım
              süreçlerinde kriptografik yöntemler ve güvenli kanallar kullanılmaktadır.
            </p>

            <h2 className="text-xl font-bold text-gray-900 border-b pb-2 pt-6">
              EK 5 – KİŞİSEL VERİLERİN SAKLANMA SÜRELERİ
            </h2>
            <p>
              Kişisel verileri, ilgili mevzuat veya Şirket uygulamaları gereği daha uzun bir süre boyunca muhafaza edilmesi
              gerekmediği sürece, ortalama olarak aşağıdaki süreler doğrultusunda saklanacaktır.
            </p>
            <p>Üye/Kullanıcılara İlişkin Kişisel Veriler: Hukuki ilişkinin sona ermesinden itibaren 10 yıl.</p>
            <p>
              Tedarikçilere İlişkin Kişisel Veriler: Hukuki ilişkinin sona ermesinden itibaren 10 yıl. İlgili hukuki dayanaklar
              6102 Sayılı Kanun, 6098 Sayılı Kanun ve 213 Sayılı Kanun’dur.
            </p>
            <p>
              Potansiyel Üye/Kullanıcılara/Tedarikçilere İlişkin Kişisel Veriler: 2 yıl (Geriye ve İleriye Dönük Olarak Analiz
              Yapılması amacıyla).
            </p>
            <p>
              Çevrimiçi Üye/Kullanıcılara İlişkin Kişisel Veriler: Hukuki ilişkinin sona ermesinden itibaren 10 yıl (6563
              Sayılı Kanun, 6102 Sayılı Kanun, 6098 Sayılı Kanun, 213 Sayılı Kanun, 6502 Sayılı Kanun).
            </p>
            <p>
              Çevrimiçi Ziyaretçilere İlişkin Kişisel Veriler (Log Kayıtları): 2 yıl (5651 Sayılı Kanun ve ikincil mevzuat).
            </p>
            <p>
              Ticari Elektronik İleti Gönderimine İlişkin Kayıtlar: Ticari elektronik ileti onaylarına ilişkin kayıtlar,
              onayın geçersizlik tarihinden itibaren 3 yıl; ticari elektronik iletiye ilişkin diğer kayıtlar toplanma
              tarihinden itibaren 3 yıl (6563 Sayılı Kanun; Ticari İletişim ve Ticari Elektronik İletiler Hakkında
              Yönetmelik).
            </p>
            <p>
              Ziyaretçilere İlişkin Kişisel Veriler (Kamera Kayıtları): 1 ay (Güvenliğin Sağlanması amacıyla).
            </p>
            <p>
              Tüm veri tipleri bakımından, saklama süresinin bitimini takip eden ilk periyodik imha süresinde imha işlemi
              gerçekleştirilecektir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
