import { motion } from "framer-motion";

export default function KullanimSartlari() {
  return (
    <div className="bg-white">
      <section className="relative pt-28 pb-16 bg-work-navy-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_15%_20%,rgba(96,165,250,0.45),transparent_55%)]" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.35),transparent_55%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Kullanım Koşulları ve Üyelik Sözleşmesi
          </motion.h1>
          <p className="text-blue-100 mt-3 max-w-3xl">
            www.piri.tr/ internet sitesini kullanırken geçerli olan tüm kullanım koşulları ve üyelik hükümlerinin tam metni.
          </p>
        </div>
      </section>

      <section className="py-12 pb-20 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white rounded-3xl border shadow-lg p-6 md:p-10 space-y-8 text-sm md:text-base leading-relaxed text-gray-800">
            <h2 className="text-xl font-bold text-gray-900">
              KULLANIM KOŞULLARI VE ÜYELİK SÖZLEŞMESİ
            </h2>
            <p>
              www.piri.tr/ internet sitesini ziyaret ettiğiniz için teşekkür ederiz. www.piri.tr/ internet sitesini
              kullanarak aşağıda belirtilen Kullanım Koşulları’nı; üyelik formunu doldurmak suretiyle elektronik ortamda
              onay işlemini gerçekleştirerek aşağıda belirtilen Üyelik Sözleşmesi’ni bütünüyle kabul etmiş sayılırsınız.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 pt-2">KULLANIM KOŞULLARI</h3>
            <p>
              www.piri.tr/ adlı internet sitesinde (bağlı alt alan adlarıyla birlikte “Site” olarak anılacaktır) sunulan
              hizmetler/ürünler, Piri Dijital Anonim Şirketi (“Site Sahibi”) tarafından sağlanmakta olup Site’nin yasal
              sahibi Site Sahibi’dir. Site üzerindeki her türlü kullanım ve tasarruf yetkisi münhasıran Site Sahibi’ne
              aittir.
            </p>

            <h4 className="text-md font-semibold text-gray-900">Tanımlar</h4>
            <p>
              <strong>Kullanım Koşulları:</strong> İşbu belgede düzenlenen kullanım koşulları.
            </p>
            <p>
              <strong>Hizmetler/Ürünler:</strong> Üyeler’in veya Kullanıcılar’ın işbu Sözleşme içerisinde tanımlı olan iş ve
              işlemlerini gerçekleştirmelerini sağlamak amacıyla Site üzerinden Site Sahibi tarafından sunulan hizmetler
              veya ürünler.
            </p>
            <p>
              <strong>İçerik/İçerikler:</strong> Kullanıcı ve Üyeler’in sağladığı her türlü bilgi ve eklemeler de dahil
              olmak üzere, Site ve Site’de yer alan tüm ifade, bilgi, yazı, içerik, yazılım, video, müzik, ses, grafik,
              fotoğraflar, canlandırmalar, sanatsal çalışmalar, resimler, isimler, logolar, sayfa düzeni, satışa/kullanıma
              sunulan ürün, hizmet, markalar, ticari unvan, alan adı, logo, ikon, demonstratif, yazılı, elektronik, grafik
              veya makinede okunabilir şekilde sunulan teknik veriler, bilgisayar yazılımları, uygulanan satış sistemi, iş
              metodu ve iş modeli dahil ancak bunlarla sınırlı olmamak üzere tüm içerik ve bunlarla bağlantılı diğer
              unsurlar.
            </p>
            <p>
              <strong>Kişisel Verilerin Korunması ve Gizlilik Politikası:</strong> Üyeler’in Site üzerinden ilettikleri
              kişisel verilerin, Site Sahibi tarafından hangi amaçlarla ve ne şekilde kullanılacağı gibi konular da dahil
              olmak üzere Site Sahibi’nin kişisel verilere ilişkin genel gizlilik politikasını düzenleyen ve buraya
              tıklayarak erişilebilecek olan metin.
            </p>
            <p>
              <strong>Kullanıcı/Kullanıcılar:</strong> Site’ye üye olsun veya olmasın Site’yi herhangi bir şekilde kullanan
              kullanıcılar.
            </p>
            <p>
              <strong>Üye/Üyeler:</strong> Site’ye üye olarak Site üzerinden sunulan hizmetlerden veya ürünlerden işbu
              Sözleşme’de belirtilen koşullar dahilinde yararlanan kişiler.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Değişiklikler</h4>
            <p>
              Site’ye erişim sağlamanız, İçerikler’e herhangi bir şekilde ulaşmanız veya Site’de yer alan herhangi bir
              bilgiyi kullanmanız işbu Kullanım Koşulları’nı peşinen kabul ettiğiniz anlamına gelmektedir. Kullanım
              Koşulları, teknik gereklilikler ve değişebilen yasal mevzuata uyum çerçevesinde zaman zaman
              güncellenebilecektir. Değişiklikleri içeren güncellenmiş Kullanım Koşulları, Site’ye yüklenecek ve yüklenme
              tarihinden itibaren geçerli olacaktır. Site’ye erişim sağlamaya, İçerikler’e herhangi bir şekilde ulaşmaya
              veya Site’de yer alan herhangi bir bilgiyi kullanmaya devam etmeniz, Kullanım Koşulları’nda yapılan
              değişiklikleri de peşinen kabul etmiş olduğunuz anlamına gelmektedir.
            </p>
            <p>
              Bu nedenle, Site Sahibi, Kullanım Koşulları’nın Kullanıcılar tarafından düzenli olarak incelenmesini tavsiye
              etmektedir. Site’nin kullanımı, kullanım sırasında geçerli olan Kullanım Koşulları’na tabidir. Site
              Sahibi’nin dilediği zaman herhangi bir ihtarda bulunmaksızın, Site’de yer alan bilgileri, kampanyaları,
              ürünleri, koleksiyonları, Site düzenini ve sair içerikleri değiştirme ve bunların yayınını durdurma hakkı
              saklıdır. İşbu Sözleşme, Üye&apos;nin tek taraflı beyanı ile değiştirilemez.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">
              Fikri Mülkiyet Hakları, Ticari Haklar ve Diğer Mülkiyet Hakları
            </h4>
            <p>
              İçerik üzerindeki fikri ve sınai mülkiyet hakları, ticari haklar dahil olmak üzere tüm mülkiyet hakkları
              münhasıran Site Sahibi’ne aittir veya Site Sahibi bunlardan yararlanmak için gerekli izin veya lisans
              sahibidir.
            </p>
            <p>
              Kullanıcı, İçerikler’i Site Sahibi’nin önceden alınmış yazılı izni olmaksızın ve kaynak göstermeksizin, ters
              mühendislik de dahil olmak üzere hiçbir surette kullanmayacağını, değiştirmeyeceğini, kopyalamayacağını,
              çoğaltmayacağını, başka bir lisana çevirmeyeceğini, yeniden yayımlamayacağını, başka bir bilgisayara
              yüklemeyeceğini, postalamayacağını, iletmeyeceğini, sunmayacağını, işlemeyeceğini, dağıtmayacağını, türeterek
              çalışmayacağını, herhangi bir ticari faaliyete konu etmeyeceğini ve hak sahibinin izninin veya onayının
              yasal düzenlemeler ve uygulamalarca arandığı sair hiçbir işleme tabi tutmayacağını, Site’nin bütününü ve/veya
              bir kısmını veya herhangi bir İçerik’i başka bir internet sitesinde veya sosyal medya uygulamaları da dahil
              olmak üzere herhangi bir uygulamada kullanmayacağını ve gerek bu eylemleri ile gerekse de başka yollarla Site
              Sahibi/Site ile doğrudan ve/veya dolaylı olarak rekabete girmeyeceğini kabul ve taahhüt etmektedir.
            </p>
            <p>
              Aksi takdirde, Kullanıcı, Site Sahibi’nin uğradığı veya uğrayabileceği doğrudan ve dolaylı zararları tazmin
              etmenin yanında lisans verenler de dahil üçüncü kişilerin uğradıkları zararlardan dolayı Site Sahibi’nden
              talep edilen tazminat miktarını, mahkeme masrafları ve avukatlık ücreti de dahil olmak üzere karşılamakla
              yükümlü olacaktır.
            </p>
            <p>
              Kullanıcı gerek yukarıda sayılan fiiller ile gerekse de Site Sahibi’nin fikri ve sınai mülkiyet hakları,
              ticari hakları ve/veya diğer mülkiyet haklarını ihlal eder nitelikteki başka yollarla Site Sahibi ile
              doğrudan ve/veya dolaylı olarak rekabete girmeyeceğini kabul ve taahhüt etmektedir.
            </p>
            <p>
              Burada açıkça belirtilmiş olsun veya olmasın Site Sahibi’nin haklarını ihlal eden tüm işlem ve eylemler başta
              5846 sayılı Fikir ve Sanat Eserleri Kanunu, 6769 sayılı Sınai Mülkiyet Kanunu, 6102 sayılı Türk Ticaret
              Kanunu ve 5237 sayılı Türk Ceza Kanunu olmak üzere ilgili mevzuat uyarınca hukuki ve cezai yaptırımlara
              tabidir. Site Sahibi’nin fazlaya dair diğer tüm hakları saklıdır.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Sorumluluk</h4>
            <p>
              Site Sahibi, Site’ye erişim sağlanması, Site’nin veya İçerik’in herhangi bir şekilde kullanılması nedeniyle,
              sözleşmenin ihlâli, haksız fiil, hata, yanılma ve/veya herhangi bir başka sebep halinde doğabilecek doğrudan
              ya da dolaylı zarar dahil olmak üzere hiçbir zarardan hiçbir surette sorumlu değildir. Site Sahibi,
              yüklenmeye ve/veya paylaşıma uygun İçerik’in zararlı virüs ve yazılımlardan ve sair kötü amaçlı kodlardan
              arındırıldığı yönünde bir garanti vermediği gibi herhangi bir sebep neticesinde işlemin kesintiye uğraması,
              hata, ihmal, kesinti, silinme, kayıp, işlemin veya iletişimin gecikmesi, bilgisayar virüsü ya da herhangi bir
              siber tehdit, iletişim hatası, hırsızlık ya da dolandırıcılık, imha veya izinsiz olarak kayıtlara girilmesi
              ya da bunların değiştirilmesi veya kullanılması ve diğer herhangi bir tehdit/risk hususunda herhangi bir
              sorumluluk kabul etmemektedir.
            </p>
            <p>
              Site Sahibi’nin Site’de yer alan İçerik’in doğruluğunu ve güncelliğini sürekli olarak kontrol etmesine rağmen
              bazı istisnai durumlarda Site’de gösterilen bilgiler, daha sonra yapılan fiili değişikliklerle uyumlu hale
              getirilmemiş olabilir. Bu kapsamda, Site’de yer alan İçerik ile ilgili Hizmet veya ürün bilgisinin güncel
              durumu arasında farklılık söz konusu olabilir. Site Sahibi, Site’de yer alan İçerik’in güncelliği, doğruluğu,
              şartları, kalitesi, performansı, pazarlanabilirliği ve belli bir amaca uygunluğu gibi hususlarda açık veya
              zımni herhangi bir garanti vermemekte ve taahhütte bulunmamaktadır.
            </p>
            <p>
              Site, Kullanıcı kolaylığı sağlamak amacıyla Site Sahibi’nin kontrolü altında olmayan başka internet sitelerine
              bağlantı, referans veya köprü içerebilir. Site Sahibi, kontrolü altında olmayan söz konusu sitelerin
              içeriklerinden veya içerdikleri diğer bağlantılardan hiçbir şekilde sorumlu değildir.
            </p>
            <p>
              Kullanıcı, Site’yi kullanırken genel ahlaka ve adaba, yürürlükteki tüm ulusal ve uluslararası mevzuata,
              iletişim ve internet güvenliğine ilişkin uygulanabilir diğer kurallara uygun olarak hareket etmek ile
              yükümlüdür. Site’nin Kullanıcı tarafından hukuka aykırı kullanılmasından dolayı meydana gelebilecek her türlü
              hukuki ve cezai sorumluluk ile Kullanıcı’nın Site üzerindeki faaliyetleri nedeniyle üçüncü kişilerin ve/veya
              Site Sahibi’nin uğradığı/uğrayabileceği zararlardan sorumluluk münhasıran Kullanıcı’ya aittir. Kullanıcı,
              Site Sahibi’nin ve/veya üçüncü kişilerin fikri ve sınai mülkiyet hakları dahil ancak bununla sınırlı olmamak
              üzere herhangi bir hakkına tecavüz teşkil edecek nitelikte herhangi bir faaliyette bulunmayacağını taahhüt
              eder. Üye, işbu maddede yer alan yükümlülüklerini ihlal etmesi nedeniyle Site Sahibi’nin herhangi bir zarara
              uğraması halinde bu zararı aynen ve derhal tazmin edeceğini kabul, beyan ve taahhüt eder.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Uygulanacak Hukuk ve Yetki</h4>
            <p>
              İşbu Kullanım Koşulları’ndan kaynaklanabilecek ihtilaflar Türk Hukuku’na tabi olup ihtilafların çözülmesinde
              münhasıran İzmir mahkemeleri ve icra daireleri yetkilidir.
            </p>
            <p>
              Tüketiciler bakımından; işbu Sözleşme’den kaynaklanabilecek ihtilaflarda, Ticaret Bakanlığı tarafından ilan
              edilen değere kadar tüketicinin yerleşim yerinin bulunduğu veya işbu Sözleşme’nin ifa edildiği yerdeki
              Tüketici Hakem Heyetleri, bu değerin üzerindeki ihtilaflarda Tüketici Mahkemeleri yetkilidir. Tüketici
              Mahkemesi bulunmayan yerlerde Asliye Hukuk Mahkemeleri yetkilidir.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 pt-4">ÜYELİK SÖZLEŞMESİ</h3>

            <h4 className="text-md font-semibold text-gray-900">Taraflar</h4>
            <p>
              İşbu Üyelik Sözleşmesi (“Sözleşme”), www.piri.tr/ adlı internet sitesinin (bağlı alt alan adlarıyla birlikte
              “Site” olarak anılacaktır) yasal sahibi olan ve Site üzerinden sunulan hizmetleri veya ürünleri sağlayan Piri
              Dijital Anonim Şirketi (“Site Sahibi”) ile Site’ye üye olmak isteyen Kullanıcı arasında akdedilmiştir. Üye ile
              Site Sahibi ayrı ayrı “Taraf”, birlikte “Taraflar” olarak anılacaktır.
            </p>
            <p>Site Sahibi’nin iletişim bilgileri aşağıda yer almaktadır:</p>
            <p>
              <strong>Unvanı:</strong> Piri Dijital Anonim Şirketi
              <br />
              <strong>MERSİS No:</strong> 0730075942300001
              <br />
              <strong>Adresi:</strong> Adalet Mah. Manas Bul. Folkart Towers No: 39 İç Kapı No:2511 Bayraklı/İZMİR
              <br />
              <strong>Telefon:</strong> -
              <br />
              <strong>Faks:</strong> -
              <br />
              <strong>İnternet Adresi:</strong> www.piri.tr/
              <br />
              <strong>Mensubu Olduğu Meslek Odası:</strong> İzmir Ticaret Odası (Telefon: 444 92 92, www.
              https://www.izto.org.tr/tr )
              <br />
              <strong>E – Posta:</strong> -
            </p>
            <p>
              İşbu Sözleşme, üyelik formunun doldurulması ve Site’de bulunan Sözleşme’nin elektronik ortam üzerinden
              Kullanıcı tarafından onaylanması veya üçüncü taraflarca sunulan erişim araçları (Google ve Facebook dahil
              ancak bunlarla sınırlı olmamak üzere) vasıtasıyla ilk defa üye girişi yapılması anı itibariyle kurulmuş kabul
              edilir. İşbu Sözleşme, söz konusu onaylama anından ya da ilgili erişim araçları vasıtasıyla ilk defa üye
              girişi yapılması anından itibaren hükümlerini doğurur.
            </p>
            <p>
              Kullanıcı, Site’ye üye olarak veya üçüncü taraflarca sunulan erişim araçları (Google ve Facebook dahil ancak
              bunlarla sınırlı olmamak üzere) vasıtasıyla ilk defa üye girişi yaparak işbu Sözleşme’nin tamamını okuduğunu,
              içeriğini bütünü ile anladığını ve tüm hükümlerini onayladığını kabul, beyan ve taahhüt eder.
            </p>

            <h4 className="text-md font-semibold text-gray-900">Tanımlar</h4>
            <p>
              <strong>Hizmetler/Ürünler:</strong> Üyeler’in veya Kullanıcılar’ın işbu Sözleşme içerisinde tanımlı olan iş ve
              işlemlerini gerçekleştirmelerini sağlamak amacıyla Site üzerinden Site Sahibi tarafından sunulan her türlü
              hizmet veya ürün.
            </p>
            <p>
              <strong>İçerik/İçerikler:</strong> Kullanıcı ve Üyeler’in sağladığı her türlü bilgi ve eklemeler de dahil
              olmak üzere, Site ve Site’de yer alan tüm ürün, ifade, bilgi, yazı, içerik, yazılım, video, müzik, ses,
              grafik, fotoğraflar, canlandırmalar, sanatsal çalışmalar, resimler, isimler, logolar, sayfa düzeni,
              satışa/kullanıma sunulan ürün, Hizmet, markalar, ticari unvan, alan adı, logo, ikon, demonstratif, yazılı,
              elektronik, grafik veya makinede okunabilir şekilde sunulan teknik veriler, bilgisayar yazılımları,
              uygulanan satış sistemi, iş metodu ve iş modeli dahil ancak bunlarla sınırlı olmamak üzere tüm içerik ve
              bunlarla bağlantılı diğer unsurlar.
            </p>
            <p>
              <strong>Ürün/Ürünler:</strong> Site Sahibi tarafından Site üzerinden satış için sunulan ve Taraflar arasında
              Mesafeli Satış Sözleşmesi kurulması ile birlikte satın alınabilecek her türlü ürün.
            </p>
            <p>
              <strong>Kişisel Verilerin Korunması ve Gizlilik Politikası:</strong> Üyeler’in Site üzerinden ilettikleri
              kişisel verilerin, Site Sahibi tarafından hangi amaçlarla ve ne şekilde kullanılacağı gibi konular da dahil
              olmak üzere Site Sahibi’nin kişisel verilere ilişkin genel gizlilik politikasını düzenleyen ve buraya
              tıklayarak erişilebilecek olan metin.
            </p>
            <p>
              <strong>Site:</strong> www.piri.tr/ isimli alan adından ve bu alan adına bağlı alt alan adlarından oluşan
              internet sitesi.
            </p>
            <p>
              <strong>Kullanıcı/Kullanıcılar:</strong> Site’ye üye olsun veya olmasın Site’yi herhangi bir şekilde kullanan
              kullanıcılar.
            </p>
            <p>
              <strong>Üye/Üyeler:</strong> Site’ye üye olarak Site üzerinden sunulan hizmetlerden veya ürünlerden işbu
              Sözleşme’de belirtilen koşullar dahilinde yararlanan kişiler.
            </p>
            <p>
              <strong>Sözleşme:</strong> Üyelik Sözleşmesi.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">
              Sözleşme’nin Konusu ve Kapsamı
            </h4>
            <p>
              İşbu Sözleşme, Hizmetler’in veya Ürünler’in kapsamını, bu Hizmetler’den veya Ürünler’den yararlanma şartlarını
              ve Taraflar’ın hak ve yükümlülüklerini düzenleyerek Site içerisinde kullanıma, üyeliğe, Hizmetler’e veya
              Ürünler’e ilişkin olarak Site Sahibi tarafından yapılmış olan her türlü uyarı, yazı ve açıklama gibi beyanları
              içermektedir. Üye, işbu Sözleşme hükümlerini kabul etmekle, Site içinde yer alan ve Site Sahibi tarafından
              kullanıma, üyeliğe ve Hizmetler’e veya Ürünler’e ilişkin olarak açıklanan her türlü beyanı da kabul etmiş
              olmaktadır.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">
              Hizmet/Ürün ve Hizmet’in/Ürün’ün Kapsamı
            </h4>
            <p>
              Site Sahibi tarafından Site üzerinden sunulacak Hizmetler veya Ürünler, elektronik ortamda mevzuat kapsamında
              alışveriş imkanının sağlanması ve genel itibariyle mesafeli satış ve abonelik işlemlerinden ibarettir.
            </p>
            <p>
              Site’de yer alan her türlü İçerik ve Hizmet veya Ürün münhasıran Kullanıcılar/Üyeler’in kullanımı için
              sağlanmaktadır. Site Sahibi’nin önceden alınmış yazılı izni olmadıkça ve kaynak gösterilmedikçe İçerikler’in
              yeniden satışı, yeniden dağıtımı ve paylaşımı yasaktır.
            </p>
            <p>
              Site Sahibi, Üyeler’in/Kullanıcılar’ın işbu Sözleşme içerisinde ve Site’nin ilgili bölümlerinde kapsamı
              belirtilen iş ve işlemleri daha etkin şekilde gerçekleştirebilmelerini sağlamak üzere, Hizmetler’de veya
              Ürünler’de değişiklikler ve/veya uyarlamalar yapabilir. Site Sahibi tarafından yapılan bu değişiklikler ve/veya
              uyarlamalarla ilgili olarak Üyeler’in uymakla yükümlü olduğu kural ve koşullar, Site Sahibi tarafından Site’de
              yer almak üzere Üyeler’e duyurulur ve söz konusu değişiklikler/uyarlamalar duyuru tarihinden itibaren geçerli
              olur. Bu kapsamda, Site Sahibi, Hizmetler’in veya Ürünler’in sürekliliği hakkında herhangi bir garanti veya
              taahhüt vermemektedir.
            </p>
            <p>
              Site Sahibi tarafından Hizmetler’de veya Ürünler’de yukarıdaki fıkra gereği yapılan değişiklik ve/veya
              uyarlamalar, herhangi bir onay almaya gerek olmaksızın, Üye tarafından peşinen kabul edilmiş sayılır.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">
              Hizmet’ten veya Ürün’den Faydalanma Şartları
            </h4>
            <p>
              Üyelik, Site’nin ilgili bölümünden üye olmak isteyen kişi tarafından Site’ye üye olmak için gerekli kişisel
              bilgilerinin işlenmesi ve işbu Sözleşme’nin elektronik ortamda onaylanması suretiyle kayıt işleminin
              yaptırılması ile veya üçüncü taraflarca sunulan erişim araçları (Google ve Facebook dahil ancak bunlarla
              sınırlı olmamak üzere) vasıtasıyla ilk defa üye girişi yapılması anı itibariyle başlar. Üyelik işlemi
              tamamlanmadan işbu Sözleşme’de tanımlanan üye olma hak ve yetkisine sahip olunamaz. Site Sahibi, üyelik
              başvurusunu veya Üye tarafından iletilen her türlü içeriği reddedebilir ve ret halinde Üye’nin herhangi bir
              itiraz hakkı bulunmaz.
            </p>
            <p>
              Site’ye üye olabilmek için reşit olmak, işbu Sözleşme uyarınca Site tarafından geçici olarak üyelikten
              uzaklaştırılmış veya üyelikten süresiz yasaklanmış olmamak, Site Sahibi tarafından ayrıca belirlenebilecek ve
              Site’nin ilgili bölümünün içeriğinde belirtilecek özelliklere sahip olmak ve tüzel kişi Üyeler için ayrıca
              tüzel kişiyi temsil ve ilzam etmeye yetkili olmak gerekmektedir. İşbu maddede belirtilen özellikleri taşımayan
              kişilerin Site kayıt işlemlerini tamamlamış olmaları, Üye olmaları sonucunu doğurmayacak ve kendilerine bu
              kapsamda herhangi bir hak/menfaat sağlamayacaktır.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">
              Hak ve Yükümlülükler – Üye’nin Hak ve Yükümlülükleri
            </h4>
            <p>
              Üye, Site’ye üye olurken sağladığı tüm bilgileri doğru, eksiksiz ve güncel olarak sağlamakla yükümlüdür. Üye,
              bu bilgilerin gerçeğe aykırı olması durumunda Site Sahibi’nin bu nedenle uğrayacağı doğrudan ve dolaylı tüm
              zararları aynen ve derhal tazmin edeceğini kabul, beyan ve taahhüt eder. Site Sahibi, Üye tarafından kendisine
              iletilen veya Site üzerinden Üye tarafından yüklenen, değiştirilen veya sağlanan bilgi ve İçerikler’in
              doğruluğunu araştırmak ve bu bilgi ve İçerikler’in güvenli, doğru ve hukuka uygun olduğunu taahhüt ve garanti
              etmekle yükümlü değildir. Söz konusu bilgi ve İçerikler’in yanlış veya hatalı olmasından dolayı ortaya
              çıkacak tüm doğrudan ve dolaylı zararlardan münhasıran Üye sorumludur.
            </p>
            <p>
              Üye, üyelik prosedürlerini yerine getirirken, İçerik ve Hizmetler’den / Ürünler’den faydalanırken, İçerik ve
              Hizmetler/Ürünler ile ilgili herhangi bir işlemi yerine getirirken, Site’yi başka bir surette kullanırken ve
              Site’ye veya İçerik’e herhangi bir şekilde erişirken işbu Sözleşme içerisinde yer alan tüm şartlara, Site’nin
              ilgili yerlerinde belirtilen kurallara, genel ahlak ve adaba, yürürlükteki tüm ulusal ve uluslararası
              mevzuata ve iletişim ve internet güvenliğine ilişkin uygulanabilir diğer kurallara uygun hareket edeceğini
              kabul, beyan ve taahhüt eder.
            </p>
            <p>
              Üye, Site Sahibi tarafından kendisine sağlanmış olan sisteme erişim araçlarını (Kullanıcı ismi, şifre vb.)
              başka kişi ya da kuruluşlarla paylaşamaz, bunların kullanma hakkı münhasıran Üye’ye aittir. Üyeler’in, Site
              üzerinden sunulan Ürün ve Hizmetler’den yararlanabilmek amacıyla kullandıkları sisteme erişim araçlarının
              (Kullanıcı ismi, şifre vb.) güvenliği, saklanması, üçüncü kişilerin bilgisinden uzak tutulması, kullanılması
              durumlarıyla ilgili hususlar tamamen Üyeler’in sorumluluğundadır. Bu kapsamda doğabilecek zararlardan Site
              Sahibi’nin doğrudan veya dolaylı herhangi bir sorumluluğu yoktur.
            </p>
            <p>
              Üye, Site Sahibi’nin önceden alınmış yazılı onayı olmadan işbu Sözleşme’yi veya bu Sözleşme kapsamındaki hak
              ve yükümlülüklerini kısmen veya tamamen herhangi bir üçüncü kişiye devredemez.
            </p>
            <p>
              İçerik ve Hizmetler’den/Ürünler’den yararlananlar veya Site’yi herhangi bir şekilde kullananlar, Site üzerinde
              yalnızca hukuka uygun amaçlarla işlem yapabilirler. Üyeler’in/Kullanıcılar’ın, Site dahilinde yaptığı işlem ve
              eylemlerinden kaynaklanan hukuki ve cezai sorumluluk münhasıran kendilerine ait olup, Site Sahibi söz konusu
              işlem ve eylemler nedeniyle hiçbir surette sorumluluk kabul etmemektedir.
            </p>
            <p>
              Üye, Site Sahibi tarafından Site üzerinden satış için sergilenen Ürünler’i, Site Sahibi’nin belirlediği
              fiyattan ve Site Sahibi tarafından sunulan ödeme seçeneklerinden herhangi birini tercih etmek suretiyle satın
              alabilir. Üye’nin, Site’de sunulan herhangi bir Ürün’ü Site’de sunulan ödeme seçeneklerinden herhangi birini
              seçmesi ve ilgili sayfada sunulan diğer koşulları kabul etmesi ile, Üye ile Site Sahibi arasında hükümleri
              Site’de yer alan Mesafeli Satış Sözleşmesi kurulmuş olur.
            </p>
            <p>
              Üye, Mesafeli Satış Sözleşmesi’nin kurulması ile beraber Mesafeli Satış Sözleşmesi hükümlerini ve Site Sahibi
              tarafından Ürün’e ilişkin olarak yapılan açıklama, beyan, garanti koşulları, Ürün için belirlenmiş satış
              şartları ve usullerini de kabul etmiş sayılır.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">
              Hak ve Yükümlülükler – Site Sahibi&apos;nin Hak ve Yükümlülükleri
            </h4>
            <p>
              Site Sahibi, Üye&apos;nin Site&apos;yi kullanımı sırasında işbu Sözleşme&apos;ye ve mevzuata uygunluğunu
              denetleme hakkına sahiptir. Site Sahibi, gerekli gördüğü hallerde Üye&apos;den ek bilgi ve belge talep
              edebilir; Üye bu talebi yerine getirmekle yükümlüdür.
            </p>
            <p>
              Site Sahibi, Hizmetler&apos;in veya Ürünler&apos;in sunulması için gerekli teknik altyapıyı sağlamak, Site&apos;yi
              işletmek ve mevzuata uygun şekilde hizmet vermekle yükümlüdür. Site Sahibi, Üye&apos;nin kişisel verilerini
              Kişisel Verilerin Korunması ve Gizlilik Politikası&apos;nda belirtilen çerçevede işler.
            </p>
            <p>
              Site Sahibi, işbu Sözleşme&apos;de öngörülen yükümlülükleri makul özenle yerine getirmekle yükümlüdür; ancak
              sistem kesintileri, üçüncü taraf hizmet sağlayıcı kaynaklı aksaklıklar veya mücbir sebepler nedeniyle
              Hizmetler&apos;de/Ürünler&apos;de geçici aksaklıklar olması halinde, bu durumun makul sürede giderilmesi
              dışında ek bir sorumluluk kabul etmemektedir.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Fikri Mülkiyet</h4>
            <p>
              Site ve İçerikler üzerindeki fikri ve sınai mülkiyet hakları ile ticari haklar münhasıran Site Sahibi&apos;ne
              aittir veya Site Sahibi bunlardan yararlanmak için gerekli izin veya lisans sahibidir. Üye, Site Sahibi&apos;nin
              önceden yazılı izni olmaksızın bu hakları ihlal edecek hiçbir kullanım, kopyalama, çoğaltma, dağıtım veya türev
              çalışma yapamaz. Üye, Site ve İçerikler&apos;i yalnızca işbu Sözleşme ve Kullanım Koşulları çerçevesinde
              kişisel ve ticari olmayan amaçlarla kullanabilir.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Sözleşme Değişiklikleri</h4>
            <p>
              Site Sahibi, işbu Sözleşme&apos;de tek taraflı olarak değişiklik yapma hakkını saklı tutar. Değişiklikler,
              güncellenmiş metnin Site&apos;de yayımlanması ile yürürlüğe girer. Yürürlüğe giren değişiklikler, Üye&apos;nin
              Site&apos;yi kullanmaya devam etmesi veya Hizmetler&apos;den/Ürünler&apos;den yararlanmaya devam etmesi
              halinde Üye tarafından kabul edilmiş sayılır. Önemli değişikliklerde Site Sahibi, uygun vasıtalarla (e-posta,
              Site bildirimi vb.) Üye&apos;yi bilgilendirebilir; ancak bilgilendirme yükümlülğü, değişikliğin geçerliliği
              için şart değildir.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Gizlilik ve Kişisel Verilerin Korunması</h4>
            <p>
              Üye&apos;nin kişisel verileri, 6698 sayılı Kişisel Verilerin Korunması Kanunu ve Kişisel Verilerin Korunması
              ve Gizlilik Politikası kapsamında işlenir. Site Sahibi, kişisel verileri yalnızca Sözleşme&apos;nin ifası,
              mevzuatın gerektirdiği işlemler ve açık rıza verilen amaçlar doğrultusunda kullanır. Detaylı bilgi için
              Kişisel Verilerin Korunması ve Gizlilik Politikası metni geçerlidir.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Mücbir Sebepler</h4>
            <p>
              Taraflar&apos;dan hiçbiri, doğal afet, savaş, terör, salgın, grev, iletişim altyapısı arızaları, siber saldırı,
              kamu otoritelerinin kararları ve benzeri kontrol dışı ve öngörülemez mücbir sebep hallerinde, bu hallerin
              doğrudan sonucu olan temerrüt veya gecikmelerden sorumlu tutulamaz. Mücbir sebep halinde etkilenen Taraf,
              diğer Taraf&apos;a durumu yazılı veya elektronik ortamda bildirir; mücbir sebebin devamı süresince yükümlülükler
              askıda kalır.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Sözleşme&apos;nin Feshi</h4>
            <p>
              Üye, dilediği zaman üyeliğini sonlandırarak işbu Sözleşme&apos;yi feshedebilir; fesih, Site üzerinden üyelik
              sonlandırma işlemi veya Site Sahibi&apos;ne yazılı/elektronik bildirim ile yapılır. Site Sahibi, Üye&apos;nin
              işbu Sözleşme veya Kullanım Koşulları&apos;nı ihlal etmesi, genel ahlaka veya mevzuata aykırı davranması veya
              Site güvenliğini tehdit etmesi halinde üyeliği askıya alabilir veya tek taraflı olarak feshedebilir. Fesih
              halinde, devam eden Mesafeli Satış Sözleşmeleri&apos;nin ifasına ilişkin hak ve yükümlülükler saklı kalır.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Diğer Hükümler</h4>
            <p>
              İşbu Sözleşme&apos;nin tamamı veya bir hükmünün geçersiz veya uygulanamaz sayılması, diğer hükümlerin
              geçerliliğini etkilemez. Taraflar&apos;ın işbu Sözleşme&apos;den doğan haklarından feragat etmemesi, ilgili
              hakkın ileride kullanılamayacağı anlamına gelmez. Site Sahibi&apos;nin Sözleşme&apos;deki bir hakkını
              kullanmaması veya geç kullanması, o haktan feragat ettiği anlamına gelmez.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Uygulanacak Hukuk ve Yetki</h4>
            <p>
              İşbu Sözleşme&apos;den kaynaklanan uyuşmazlıklarda Türk hukuku uygulanır. İşbu Sözleşme&apos;den doğan
              uyuşmazlıklar için tüketici niteliğinde olmayan Üyeler bakımından İzmir mahkemeleri ve icra daireleri
              yetkilidir.
            </p>
            <p>
              Tüketici niteliğindeki Üyeler bakımından; 6502 sayılı Tüketicilerin Korunması Hakkında Kanun ve ilgili
              mevzuat uyarınca, Ticaret Bakanlığı&apos;nca ilan edilen değere kadar tüketicinin yerleşim yerindeki veya
              Sözleşme&apos;nin ifa edildiği yerdeki Tüketici Hakem Heyetleri, bu değerin üzerindeki uyuşmazlıklarda
              Tüketici Mahkemeleri yetkilidir. Tüketici Mahkemesi bulunmayan yerlerde Asliye Hukuk Mahkemeleri yetkilidir.
            </p>

            <h4 className="text-md font-semibold text-gray-900 pt-2">Ticari Elektronik İleti</h4>
            <p>
              Üye, Site Sahibi ve işbirliği yaptığı taraflar tarafından iletişim bilgilerine (elektronik posta, cep telefonu
              vb.) reklam, kampanya, promosyon ve bilgilendirme amaçlı ticari elektronik iletiler gönderilmesini, 6563
              sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve ilgili mevzuat kapsamında, üyelik/onay sürecinde
              veya Site ayarları üzerinden açıkça onaylayabilir. Üye, bu onayı dilediği zaman iletişim kanalları veya Site
              üzerinden geri alabilir; geri alma sonrasında ticari elektronik ileti gönderimi durdurulur.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
