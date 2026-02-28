import { motion } from "framer-motion";

export default function CerezPolitikasi() {
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
            PİRİ DİJİTAL ANONİM ŞİRKETİ ÇEREZ POLİTİKASI
          </motion.h1>
          <p className="text-emerald-100 mt-3 max-w-3xl">
            Bu politika, Piri Dijital Anonim Şirketi tarafından işletilen internet sitelerinde kullanılan çerezlerin
            türlerini, kullanım amaçlarını ve tercihlerinizi nasıl yönetebileceğinizi açıklar.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <div className="container mx-auto px-6 max-w-5xl space-y-10 text-sm md:text-base leading-relaxed text-gray-800">
          <div className="bg-white rounded-3xl border shadow-lg p-6 md:p-10 space-y-6">
            <p>
              PİRİ DİJİTAL ANONİM ŞİRKETİ (“PİRİ DİJİTAL”) olarak sahip olduğumuz{" "}
              <strong>www.piri.tr/</strong> internet sitemizin (şirketimize ait internet sitelerinin hepsi birlikte “Site”
              olarak anılacaktır) ziyaretçilerine daha iyi bir kullanım deneyimi sağlayabilmek için internet çerezleri
              kullanmaktayız. Sizleri Site’de kullanılan çerez türleri, çerezlerin kullanım amaçları ve bu çerezlerin
              ayarları, yönetilmesi ve silinmesi hakkında bilgilendirmek isteriz.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-4">ÇEREZ (“COOKIE”) NEDİR?</h2>
            <p>
              Çerezler, ziyaret ettiğiniz internet siteleri ve/veya mobil uygulamalar ve/veya mobil siteler tarafından
              tarayıcılar aracılığıyla bilgisayarınıza (ya da akıllı telefon veya tablet gibi diğer cihazlarınıza)
              kaydedilen ve genelde harf ve rakamlardan oluşan çok küçük metin dosyalarıdır. Çerezler, ziyaretçilere
              ilişkin isim, cinsiyet veya adres gibi kişisel verileri içermezler.
            </p>
            <p>
              Çerezler, ziyaret ettiğiniz internet sitesini ve/veya mobil uygulamaları ve/veya mobil siteleri yöneten
              sunucular tarafından oluşturulurlar. Böylelikle ziyaretçi aynı siteyi ziyaret ettiğinde sunucu bunu
              anlayabilir. Çerezler, internet sitesi ve/veya mobil uygulama ve/veya mobil sitelerin sahiplerine aynı
              ziyaretçinin siteyi yeniden ziyaret ettiğini gösteren kimlik kartlarına benzetilebilir.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-4">PİRİ DİJİTAL ÇEREZLERİ NASIL KULLANILMAKTADIR?</h2>
            <p>PİRİ DİJİTAL çerezleri;</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Yaptığınız tercihleri hatırlamak ve internet sitesi / mobil uygulama / mobil site kullanımınızı
                kişiselleştirmek için kullanır. Bu kullanım; parolanızı kaydeden ve internet sitesi / mobil
                uygulama / mobil site oturumunuzun sürekli açık kalmasını sağlayan, böylece her ziyaretinizde birden fazla
                kez parola girme zahmetinden kurtaran çerezleri ve internet sitesine / mobil uygulamaya / mobil sitesine
                daha sonraki ziyaretlerinizde sizi hatırlayan ve tanıyan çerezleri içerir.
              </li>
              <li>
                PİRİ DİJİTAL tarafından işletilen elektronik ticaret platformlarına nereden ve hangi cihazlardan
                bağlandığınız, internet sitesi / mobil uygulama / mobil site üzerinde hangi içeriği görüntülediğiniz ve
                ziyaretinizin süresi gibi internet sitesini / mobil uygulamayı / mobil siteyi nasıl kullandığınızı
                belirlemek için kullanır.
              </li>
              <li>
                İlgi alanlarınıza ve size daha uygun içerik ve reklamları sunmak için, diğer bir ifade ile hedeflenmiş
                reklam / tanıtım amacıyla kullanır. PİRİ DİJİTAL, çerezler yoluyla elde edilen bilgileri sizlere ait diğer
                kişisel verilerle eşleştirerek; size daha uygun içerikleri, kişiye özel kampanya ve hizmetleri sunar ve
                daha önceden istemediğinizi belirttiğiniz içerik veya fırsatları bir daha sunmaz.
              </li>
            </ul>

            <p className="mt-2">Bu kapsamda PİRİ DİJİTAL çerezleri;</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Site’nin çalışması için gerekli temel fonksiyonları gerçekleştirmek (örneğin üyelikle giriş yapılması),</li>
              <li>
                Site’yi analiz etmek ve Site’nin performansını arttırmak (örneğin ziyaretçi sayısını tespit etmek ve aranan
                içeriği daha kolay bulmayı sağlamak),
              </li>
              <li>
                Site’nin işlevselliğini arttırmak ve kullanım kolaylığı sağlamak (örneğin kullanıcı adı bilgisinin veya
                arama sorgularının hatırlanması, üçüncü taraf sosyal medya faaliyetlerine bağlantı sağlanması),
              </li>
              <li>
                Kişiselleştirme, hedefleme ve reklamcılık faaliyeti gerçekleştirmek (örneğin görüntülenen sayfa ve
                hizmetlere göre ilgi alanlarına uygun reklam gösterilmesi),
              </li>
            </ul>

            <h2 className="text-lg font-semibold text-gray-900 mt-4">
              PİRİ DİJİTAL ÜÇÜNCÜ TARAF ÇEREZLERİNİ REKLAM VE YENİDEN HEDEFLEME İÇİN NASIL KULLANMAKTADIR?
            </h2>
            <p>
              PİRİ DİJİTAL, çerezleri ayrıca; arama motorlarını, PİRİ DİJİTAL tarafından işletilen elektronik ticaret
              platformlarının internet sitesini, mobil uygulamasını veya mobil sitesini ve/veya PİRİ DİJİTAL’in reklam
              verdiği internet sitelerini ziyaret ettiğinizde ilginizi çekebileceğini düşündüğü reklamları size sunabilmek
              için “reklam teknolojisini” devreye sokmak amacıyla kullanabilir. Reklam teknolojisi, size özel reklamlar
              sunabilmek için internet sitesine / mobil uygulamaya / mobil sitesine ve PİRİ DİJİTAL’in reklam verdiği
              internet sitelerine / mobil uygulamalara yaptığınız önceki ziyaretlerle ilgili bilgileri kullanır. Bu
              reklamları sunarken, PİRİ DİJİTAL’in sizi tanıyabilmesi amacıyla tarayıcınıza benzersiz bir üçüncü taraf
              çerezi yerleştirilebilir.
            </p>

            <p>
              PİRİ DİJİTAL ayrıca Google, Inc. (“Google”) tarafından sağlanan bir internet analizi hizmeti olan Google
              Analytics kullanmaktadır. Google Analytics, çerezleri ziyaretçilerin internet sitesini / mobil uygulamayı /
              mobil siteyi nasıl kullandıklarını istatistiki bilgiler / raporlar ile analiz etmek amacıyla kullanır. Google
              Analytics kullanımı hakkında daha fazla bilgi için (reddetme seçenekleri dahil){" "}
              <a
                href="https://www.google.com/intl/tr/policies/privacy/#infocollect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline"
              >
                https://www.google.com/intl/tr/policies/privacy/#infocollect
              </a>{" "}
              adresini ziyaret edebilirsiniz.
            </p>

            <p>
              Bunun yanı sıra ilginizi çekebilecek reklamları sosyal medya platformlarında da sunabilmek ve özel hedef
              kitle oluşturmak amacıyla kişisel verilerinizden e-posta adresiniz, bu platformlar ile paylaşılmaktadır.
              E-posta adresiniz, bu platformların sunduğu güvenli kanallar ve ortamlar üzerinden aktarılmaktadır. Sosyal
              medya platformları, e-posta adresinizi hashleyerek, yalnızca eşleştirme işlemi için kullanmaktadır. E-posta
              adresiniz üçüncü taraflarla veya diğer reklam verenlerle paylaşılmaz ve eşleştirme işlemi tamamlandıktan sonra
              mümkün olan en kısa sürede sosyal medya platformlarının sistemlerinden silinir.
            </p>

            <p>
              Örneğin; kişisel veriniz Facebook sistemlerinde bulunduğu sürece verilerin güvenliğini ve bütünlüğünü
              korumak ve Facebook sistemlerinde bulunan kişisel verinize yanlışlıkla veya yetkisiz olarak erişilmesine ve
              verinizin yanlışlıkla veya yetkisiz olarak kullanılmasına, değiştirilmesine veya ifşa edilmesine karşı
              korumak için geliştirilen teknik ve fiziksel güvenlik önlemlerini de içerecek şekilde, özel hedef kitlenizi
              (“özel hedef kitleniz”) oluşturan hash yöntemiyle şifrelenen e-posta adresinizin ve Facebook Kullanıcı
              Kimliği koleksiyonunun gizliliğini ve güvenliğini sağlayacaktır. Ayrıca, izniniz olmadan veya yasalar
              gerektirmediği sürece, Facebook üçüncü taraflara veya diğer reklam verenlere özel hedef kitleniz için erişim
              veya bilgi vermez, özel hedef kitle bilgilerinizi kullanıcılarımız hakkındaki bilgilere eklemez veya ilgi
              alanına dayalı profiller oluşturmaz ya da özel hedef kitlenizi size hizmet sunmanın haricinde kullanmaz.
              Facebook özel hedef kitleler koşulları için{" "}
              <a
                href="https://www.facebook.com/ads/manage/customaudiences/tos.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline"
              >
                https://www.facebook.com/ads/manage/customaudiences/tos.php
              </a>{" "}
              adresini, Facebook Gizlilik İlkeleri için{" "}
              <a
                href="https://www.facebook.com/privacy/explanation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline"
              >
                https://www.facebook.com/privacy/explanation
              </a>{" "}
              adresini ziyaret edebilirsiniz.
            </p>

            <p>
              Mobil uygulamada ise çerez yerine, Google ve Criteo SDK’sı (Software Development Kit) kullanılmaktadır.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-4">ÇEREZ YÖNETİMİ</h2>
            <p>
              İnternet tarayıcınızın çeşidine göre aşağıdaki adımları izleyerek, çerezler hakkında bilgi edinip, izin
              verme veya reddetme hakkınızı kullanabilirsiniz:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Google Chrome:</strong> Tarayıcınızın adres bölümünde yer alan “kilit işareti” veya “i” harfini
                tıklayarak, “Çerezler” sekmesinden çerezlere izin verebilir veya bloke edebilirsiniz.
              </li>
              <li>
                <strong>Internet Explorer:</strong> Tarayıcınızın sağ üst köşesinde yer alan “Tool” veya “Araçlar”
                bölümünden “Güvenlik” sekmesini tıklayın ve “izin ver” veya “izin verme” şeklinde çerez yönetiminizi
                gerçekleştirin.
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Tarayıcınızın sağ üst köşesinde yer alan “menüyü aç” sekmesini tıklayın.
                “Seçenekler” menüsünden “Gizlilik ve Güvenlik” butonunu kullanarak çerez yönetiminizi yapın.
              </li>
              <li>
                <strong>Safari:</strong> Telefonunuzun “Ayarlar” bölümünden “Safari” sekmesini seçip, “Gizlilik ve
                Güvenlik” bölümünden tüm çerez yönetiminizi sağlayabilirsiniz.
              </li>
              <li>
                Diğer tarayıcılar (Opera, Microsoft Edge vb.) için ilgili tarayıcının yardım veya destek sayfalarını
                inceleyebilirsiniz.
              </li>
              <li>
                Yukarıdaki seçeneklerin yanı sıra; tüm çerezler hakkında bilgi sahibi olmak ve çerez yönetimi için{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline"
                >
                  https://www.allaboutcookies.org
                </a>{" "}
                ve{" "}
                <a
                  href="https://www.youronlinechoices.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline"
                >
                  https://www.youronlinechoices.eu
                </a>{" "}
                adreslerini ziyaret edebilirsiniz veya “Privacy Badger” uygulamasını ({" "}
                <a
                  href="https://www.eff.org/tr/privacybadger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline"
                >
                  https://www.eff.org/tr/privacybadger
                </a>{" "}
                ) kullanabilirsiniz.
              </li>
              <li>
                Mobil uygulamalarda çerez veya SDK yönetimi için cihazınızın Gizlilik veya Ayarlar bölümünde yer alan
                yönlendirmeleri takip edebilir veya Lumen Privacy Monitor’ü ({" "}
                <a
                  href="https://haystack.mobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline"
                >
                  https://haystack.mobi
                </a>{" "}
                ) telefonunuza indirerek kullanabilirsiniz.
              </li>
            </ul>
            <p>
              Kalıcı çerezleri veya oturum çerezlerini reddetmeniz halinde, internet sitesini, mobil uygulamayı ve mobil
              siteyi kullanmaya devam edebilirsiniz; ancak sitenin tüm işlevlerine erişemeyebilir veya erişiminiz sınırlı
              olabilir. Mobil uygulamada söz konusu durum değişkenlik gösterebilmektedir.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-4">ÇEREZ ÇEŞİTLERİ</h2>
            <p>
              PİRİ DİJİTAL tarafından işletilen elektronik ticaret platformlarının internet sitesinde, mobil uygulamasında
              ve mobil sitesinde;
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Kullanım süresine göre:</strong> Oturum çerezleri (tarayıcı kapandığında silinir) ve kalıcı
                çerezler (sabit diskte uzun süre veya süresiz kalabilir) kullanılmaktadır.
              </li>
              <li>
                <strong>Çerezin sahibi / yerleştiren tarafa göre:</strong> “PİRİ DİJİTAL çerezleri (first party cookie)” ve
                “üçüncü taraf (third party cookie)” çerezler kullanılmaktadır. PİRİ DİJİTAL çerezleri şirketimiz tarafından,
                üçüncü taraf çerezleri ise iş birliği yaptığımız firmalar tarafından yönetilmektedir.
              </li>
              <li>
                <strong>Kullanım amacına göre:</strong> ticari çerezler, teknik çerezler, doğrulama çerezleri,
                hedefleme/reklam çerezleri, kişiselleştirme çerezleri ve analitik çerezler kullanılmaktadır.
              </li>
            </ul>
            <p>
              PİRİ DİJİTAL, bu çerezleri kullanarak; üyelerinin birbirinden ayıran özelliklerini belirleyerek, tercih ve
              beğenilerine uygun kampanya ve reklam yapmak amacıyla üyeleri büyük gruplara ayırarak, ortalama harcama
              tutarı, yaş, cinsiyet, alışveriş yapılan kategoriler, mobil kullanım oranı gibi harcama alışkanlıklarını
              tespit etmeye yönelik istatistiksel çalışmalar yapmaktadır.
            </p>

            <h3 className="text-md font-semibold text-gray-900 mt-4">Oturum Çerezleri</h3>
            <p>
              Oturum çerezleri, ziyaretçilerimizin Site’yi ziyaretleri süresince kullanılan, tarayıcı kapatıldıktan sonra
              silinen geçici çerezlerdir. Bu tür çerezlerin kullanılmasının temel amacı ziyaretiniz süresince Site’nin
              düzgün bir biçimde çalışmasını sağlamaktır. Örneğin; birden fazla sayfadan oluşan çevrimiçi formları
              doldurmanız sağlanmaktadır.
            </p>

            <h3 className="text-md font-semibold text-gray-900 mt-4">Kalıcı Çerezler</h3>
            <p>
              Kalıcı çerezler, Site’nin işlevselliğini artırmak, ziyaretçilerimize daha hızlı ve iyi bir hizmet sunmak
              amacıyla kullanılan çerez türleridir. Bu tür çerezler ziyaretçi tercihlerini hatırlamak için kullanılır ve
              tarayıcılar vasıtasıyla kullanılan cihazda depolanır. Kalıcı çerezlerin bazı türleri, Site’yi kullanım
              amacınız gibi hususlar göz önünde bulundurularak sizlere özel öneriler sunulması için kullanılabilmektedir.
              Kalıcı çerezler sayesinde Site, aynı cihazla tekrar ziyaret edildiğinde, cihazınızda Site tarafından
              oluşturulmuş bir çerez olup olmadığı kontrol edilir ve var ise, sizin siteyi daha önce ziyaret ettiğiniz
              anlaşılır ve size iletilecek içerik bu doğrultuda belirlenir.
            </p>

            <h3 className="text-md font-semibold text-gray-900 mt-4">Ticari Çerezler</h3>
            <p>
              Ticari çerezler, ziyaretçilerimizin ilgi alanları ve seçimleri doğrultusunda hedeflediği hizmetlere benzer
              nitelikli olanların sunulmasını ve daha gelişmiş, kişiselleştirilmiş bir reklam portföyü aracılığıyla
              kullanıcı deneyiminin artırılmasını amaçlamaktadır.
            </p>

            <h3 className="text-md font-semibold text-gray-900 mt-4">Teknik Çerezler</h3>
            <p>
              Teknik çerezler ile Site’nin çalışması sağlanmakta, internet sitesinin çalışmayan sayfaları ve alanları
              tespit edilmektedir.
            </p>

            <h3 className="text-md font-semibold text-gray-900 mt-4">Doğrulama Çerezleri</h3>
            <p>
              Ziyaretçilerin şifrelerini kullanarak Site’ye giriş yapmaları durumunda, bu tür çerezler ile, ziyaretçinin
              Site’de ziyaret ettiği her bir sayfada site kullanıcısı olduğu belirlenerek, kullanıcının her sayfada şifresini
              yeniden girmesi önlenir.
            </p>

            <h3 className="text-md font-semibold text-gray-900 mt-4">Hedefleme / Reklam Çerezleri</h3>
            <p>
              Site’de kullanıcılara sunulan reklamları özelleştirmek ve zaten görüntülenmiş reklamların tekrar gösterilmesini
              engellemek için kullanılan çerez türleridir.
            </p>

            <h3 className="text-md font-semibold text-gray-900 mt-4">Kişiselleştirme Çerezleri</h3>
            <p>
              Kullanıcıların tercihlerini farklı Site sayfalarını ziyarette de hatırlamak için kullanılan çerezlerdir.
              Örneğin, seçmiş olduğunuz dil tercihinizin hatırlanması.
            </p>

            <h3 className="text-md font-semibold text-gray-900 mt-4">Analitik Çerezler</h3>
            <p>
              Analitik çerezler ile Site’yi ziyaret edenlerin sayıları, Site’de görüntülenen sayfaların tespiti, Site
              ziyaret saatleri, Site sayfaları kaydırma hareketleri gibi analitik sonuçların üretimini sağlayan çerezler
              kullanılmaktadır.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-4">
              PİRİ DİJİTAL’in SİTE’SİNDE YER ALAN ÇEREZLERE İLİŞKİN BİLGİLER
            </h2>
            <p>
              PİRİ DİJİTAL’in Site’sinde yer alan çerezlere ilişkin bilgiler aşağıdaki tablolarda yer almaktadır:
            </p>
            <div className="overflow-auto">
              <table className="min-w-full text-left text-xs md:text-sm border mt-2">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="px-3 py-2 border">Cookie Hizmet Sağlayıcı</th>
                    <th className="px-3 py-2 border">Cookie İsmi</th>
                    <th className="px-3 py-2 border">Cookie Amacı</th>
                    <th className="px-3 py-2 border">Cookie Tipi</th>
                    <th className="px-3 py-2 border">Cookie Süresi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcı e-posta izin bilgisi – Google Tag Manager sisteminde yer alan uygulamaların kullanması için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">
                      Her siteye kullanıcı girişi ile güncellenir. Maksimum 1 yıl
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcı ID bilgisi - Google Tag Manager sisteminde yer alan uygulamaların kullanması için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">
                      Her siteye kullanıcı girişi ile güncellenir. Maksimum 1 yıl
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcı yaş bilgisi - Google Tag Manager sisteminde yer alan uygulamaların kullanması için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">
                      Her siteye kullanıcı girişi ile güncellenir. Maksimum 1 yıl
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcı Cinsiyet bilgisi - Google Tag Manager sisteminde yer alan uygulamaların kullanması için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">
                      Her siteye kullanıcı girişi ile güncellenir. Maksimum 1 yıl
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcı kayıt tarihi - Google Tag Manager sisteminde yer alan uygulamaların kullanması için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">
                      Her siteye kullanıcı girişi ile güncellenir. Maksimum 1 yıl
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcı sisteme son giriş zamanı - Google Tag Manager sisteminde yer alan uygulamaların kullanması için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">
                      Her siteye kullanıcı girişi ile güncellenir. Maksimum 1 yıl
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcı VIP bilgisi - Google Tag Manager sisteminde yer alan uygulamaların kullanması için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">
                      Her siteye kullanıcı girişi ile güncellenir. Maksimum 1 yıl
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcının hashlanmiş e-posta bilgisi - Google Tag Manager sisteminde yer alan uygulamaların kullanması
                      için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">
                      Her siteye kullanıcı girişi ile güncellenir. Maksimum 1 yıl
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcının sisteme giriş bilgilerini girmeden login olabilmesi için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">1 Hafta</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcının hangi gelir ortağı ile siteye yönlendirildiğini tutmak için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">1 Gün</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">Misafir Kullanıcının sepet içeriğine erişebilmek için</td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">1 Ay</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Alıcının Google Tag Manager tarafından segmentlenmesi için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">1 Gün</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Mobile İnternet görünümünden site görünümüne geçme bilgisi için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">1 Gün</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Mobile İnternet’in Landing sayfasının gösterilip gösterilmediğini tutmak için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">4 Saat</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Site’yi kullanan kullanıcının üye olup olmadığını tutmak için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">1 Ay</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Son görüntülenen hizmetlerin listesini tutan ID’yi saklamak için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">1 Ay</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Kullanıcının Criteo ile geldiğini bilgisini tutmak için
                    </td>
                    <td className="px-3 py-2 border">Persistent Cookie</td>
                    <td className="px-3 py-2 border">1 Ay</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Kullanıcının üyeliğini o oturumda yapıp yapmadığını tutmak için
                    </td>
                    <td className="px-3 py-2 border">Session Cookie</td>
                    <td className="px-3 py-2 border">Tarayıcı Session süresi boyunca</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">Kullanıcı Session ID bilgisi</td>
                    <td className="px-3 py-2 border">Session Cookie</td>
                    <td className="px-3 py-2 border">Tarayıcı Session süresi boyunca</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Kullanıcıya gösterilecek Captca ID’sini tutmak için
                    </td>
                    <td className="px-3 py-2 border">Session Cookie</td>
                    <td className="px-3 py-2 border">Tarayıcı Session süresi boyunca</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">
                      Kullanıcının hızlı erişim ve kısayol erişim linkleri ile geldiğini tutmak için
                    </td>
                    <td className="px-3 py-2 border">Session Cookie</td>
                    <td className="px-3 py-2 border">Tarayıcı Session süresi boyunca</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">[hizmet-sağlayıcı]</td>
                    <td className="px-3 py-2 border">[çerez-ismi]</td>
                    <td className="px-3 py-2 border">Kullanıcının o an hangi URL’de olduğunu tutmak için.</td>
                    <td className="px-3 py-2 border">Session Cookie</td>
                    <td className="px-3 py-2 border">Tarayıcı Session süresi boyunca</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Bu Çerez Politikası, ihtiyaçlar ve mevzuat değişiklikleri doğrultusunda güncellenebilir. Güncel sürüm her
              zaman Site üzerinde yayımlanacaktır.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

