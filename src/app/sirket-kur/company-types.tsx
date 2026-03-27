import {
  Building2,
  BriefcaseBusiness,
  Globe,
  Landmark,
  Laptop,
  LucideIcon,
  Megaphone,
  ReceiptText,
  Rocket,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export type CompanyTypeConfig = {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  accent: string;
  softAccent: string;
  badge: string;
  price: string;
  yearly: string;
  heroTitle: string;
  heroBody: string;
  highlightLabel: string;
  highlights: readonly string[];
  suitableFor: readonly string[];
  includedItems: readonly string[];
  processSteps: readonly string[];
  ecosystemModules?: readonly {
    code: string;
    title: string;
    price: string;
    subtitle: string;
    points: readonly string[];
    icon: LucideIcon;
    accent?: boolean;
  }[];
  packages: readonly {
    name: string;
    monthlyPrice: string;
    yearlyPrice: string;
    popular: boolean;
  }[];
  faq: readonly { question: string; answer: string }[];
};

const commonPackage = [
  "Kuruluş",
  "e-İmza 1Y",
  "KEP Başlangıç 1Y",
  "Sanal Ofis 1Y",
  "e-Dönüşüm",
] as const;

export const companyTypeConfigs: readonly CompanyTypeConfig[] = [
  {
    slug: "sahis-sirketi",
    name: "Şahıs Şirketi",
    shortName: "Şahıs",
    icon: UserRound,
    accent: "#B37A08",
    softAccent: "bg-[#FFF6DD]",
    badge: "Hızlı Başlangıç",
    price: "5.900 TL +KDV",
    yearly: "3.200 TL/ay +KDV",
    heroTitle: "Türkiye'de en hızlı kurulan şirket yapısı: Şahıs Şirketi.",
    heroBody:
      "Vergi dairesine tek başvuruyla mükellefiyet açın, e-Devlet üzerinden sürecinizi takip edin. Serbest meslek erbapları, freelancerlar ve küçük esnaf için noter şartı olmadan, düşük maliyetle hemen faaliyete geçin.",
    highlightLabel: "Basit ve hızlı kuruluş",
    highlights: [
      "Türkiye'de noter onayı gerektirmeden kurulur; sadece vergi dairesi başvurusu yeterlidir.",
      "Basit usul veya gerçek usulde vergilendirme seçeneğiyle esnek yapı sunar.",
      "SGK Bağ-Kur kaydı otomatik başlar, ek işlem gerektirmez.",
    ],
    suitableFor: [
      "Serbest meslek erbapları ve freelancerlar",
      "Küçük esnaf ve zanaatkârlar",
      "İlk kez mükellefiyet açan girişimciler",
    ],
    includedItems: commonPackage,
    processSteps: [
      "Vergi dairesi başvurusu ve mükellefiyet açılışı",
      "e-İmza, KEP ve e-Devlet entegrasyonu",
      "SGK Bağ-Kur kaydı ve defter tasdiki",
      "Fatura kesim ve operasyon başlangıcı",
    ],
    packages: [
      { name: "Şirketini Kur", monthlyPrice: "5.900", yearlyPrice: "3.200", popular: false },
      { name: "Şirketini + Dijital Ofisini Kur", monthlyPrice: "15.900", yearlyPrice: "13.200", popular: true },
      { name: "Şirketini + Dijital Ofisini Kur + İşini Büyüt", monthlyPrice: "Teklif", yearlyPrice: "Teklif", popular: false },
    ],
    ecosystemModules: [
      {
        code: "M1",
        title: "Dijital Ofis & IT Yönetimi",
        price: "10k – 30k TL/ay",
        subtitle: "Kullanıcı sayısına göre ölçeklenir",
        points: [
          "M365 lisans + kurulum",
          "Kurumsal e-posta + Teams",
          "OneDrive + MFA",
          "0-10 / 10-50 / 50-299 / 300+ kişi",
        ],
        icon: Laptop,
      },
      {
        code: "M2",
        title: "Web Sitesi & Dijital Varlık",
        price: "500 – 5k TL/ay",
        subtitle: "Kurulum + aylık bakım modeli",
        points: [
          "Serbest Meslek: 12k + 500/ay",
          "Özelleşmiş WP: 24k + 1k/ay",
          "KOBİ Performans: 50k + 5k/ay",
        ],
        icon: Globe,
      },
      {
        code: "M3",
        title: "Sosyal Medya & İçerik",
        price: "15k – 35k TL/ay",
        subtitle: "İçerik tier bazlı fiyatlama",
        points: [
          "Başlangıç: 1 Post + Story/hafta",
          "Büyüme: 2 Post + Story/hafta",
          "Pro: 3 Post + Reels/hafta",
          "Work365'ten onay akışı",
        ],
        icon: Megaphone,
      },
      {
        code: "M4",
        title: "İşini Büyüt",
        price: "Teklif bazlı",
        subtitle: "Dövize endeksli · ~35 TL/$ · 3 ayda kur revizesi",
        points: [
          "Fikir: AI değerlendirme, BMC, Cap table",
          "MVP: Pitch deck, veri odası, mentor",
          "Piyasa: Yatırım turu, SAFE/nota",
          "Büyüme: SPK uyum, VC köprüsü, PR",
        ],
        icon: Rocket,
        accent: true,
      },
    ],
    faq: [
      {
        question: "Türkiye'de şahıs şirketi kurmak için ne gerekiyor?",
        answer:
          "Türkiye'de şahıs şirketi kurmak için noter onayına gerek yoktur. Bağlı olduğunuz vergi dairesine kimlik, ikametgâh belgesi ve işe başlama dilekçesi ile başvurmanız yeterlidir. Başvuru sonrası mükellefiyet hemen açılır ve faaliyete başlayabilirsiniz.",
      },
      {
        question: "Basit usul ve gerçek usul arasındaki fark nedir?",
        answer:
          "Basit usulde KDV'den muaf olursunuz, defter tutma yükümlülüğünüz yoktur ve yıllık kazancınız belirli sınırı aşmazsa bu usulde kalırsınız. Gerçek usulde ise KDV mükellefi olursunuz, defter tutarsınız ve gider belgelerinizi düşerek vergi avantajı sağlayabilirsiniz. Yıllık cironuza göre hangisinin uygun olduğunu birlikte değerlendiriyoruz.",
      },
      {
        question: "SGK Bağ-Kur primi ne kadardır?",
        answer:
          "Şahıs şirketi sahipleri 4/b (Bağ-Kur) kapsamında sigortalı sayılır. 2025 yılı itibarıyla aylık prim tutarı brüt asgari ücretin %34,5'i üzerinden hesaplanır. Priminiz mükellefiyet açılışıyla birlikte otomatik olarak tahakkuk ettirilir.",
      },
      {
        question: "e-Fatura ve e-Arşiv fatura zorunlu mu?",
        answer:
          "Brüt satış hasılatı GİB tarafından belirlenen limiti aşan şahıs şirketi mükellefleri e-Fatura ve e-Arşiv fatura uygulamasına geçmek zorundadır. Limit altında kalsanız bile e-Arşiv fatura üzerinden dijital fatura kesebilirsiniz. Başlangıç paketimizde e-Dönüşüm altyapısı hazır olarak sunulur.",
      },
      {
        question: "Şahıs şirketinden limited şirkete geçiş yapılabilir mi?",
        answer:
          "Evet, işletmeniz büyüdükçe şahıs şirketinizi nevi değişikliği ile limited veya anonim şirkete dönüştürebilirsiniz. Bu süreçte mevcut vergi numaranız korunur ve müşteri/tedarikçi ilişkileriniz etkilenmez. Work365 olarak bu dönüşüm sürecini de uçtan uca yönetiyoruz.",
      },
      {
        question: "Başlangıç paketinde neler dahil?",
        answer:
          "Paketimize vergi dairesi mükellefiyet açılışı, e-İmza (1 yıllık), KEP hesabı (1 yıllık başlangıç), sanal ofis adresi (1 yıllık) ve e-Dönüşüm (e-Fatura/e-Arşiv) altyapısı dahildir. Tüm bu kalemler tek başvuruyla ve tek akışta tamamlanır.",
      },
    ],
  },
  {
    slug: "limited-sirketi",
    name: "Limited Şirketi",
    shortName: "Limited",
    icon: Building2,
    accent: "#1B98D5",
    softAccent: "bg-[#EEF7FF]",
    badge: "En Dengeli",
    price: "9.900 TL +KDV",
    yearly: "5.400 TL/ay +KDV",
    heroTitle: "Büyüme planı olan işler için dengeli şirket yapısı.",
    heroBody:
      "Ortaklı yapı, marka büyütme ve daha düzenli operasyon yönetimi isteyen girişimler için en dengeli başlangıç seçeneği.",
    highlightLabel: "Büyüme odaklı yapı",
    highlights: [
      "Ortaklı kurulumlara uyum sağlar.",
      "Kurumsallık ile operasyon kolaylığı arasında dengeli yapı sunar.",
      "Büyümeye hazırlanan girişimler için güçlü başlangıç sağlar.",
    ],
    suitableFor: [
      "Ortaklı girişimler",
      "Marka ve ekip büyütmek isteyen işletmeler",
      "Şeffaf operasyon isteyen KOBİ'ler",
    ],
    includedItems: commonPackage,
    processSteps: ["Kuruluş başvurusu", "Şirket sözleşme akışı", "Dijital altyapı kurulumu", "Operasyon paneli başlangıcı"],
    packages: [
      { name: "Şirketini Kur", monthlyPrice: "9.900", yearlyPrice: "5.400", popular: false },
      { name: "Şirketini + Dijital Ofisini Kur", monthlyPrice: "19.900", yearlyPrice: "15.400", popular: true },
      { name: "Şirketini + Dijital Ofisini Kur + İşini Büyüt", monthlyPrice: "Teklif", yearlyPrice: "Teklif", popular: false },
    ],
    ecosystemModules: [
      {
        code: "M1",
        title: "Dijital Ofis & IT Yönetimi",
        price: "10k – 30k TL/ay",
        subtitle: "Kullanıcı sayısına göre ölçeklenir",
        points: [
          "M365 lisans + kurulum",
          "Kurumsal e-posta + Teams",
          "OneDrive + MFA",
          "0-10 / 10-50 / 50-299 / 300+ kişi",
        ],
        icon: Laptop,
      },
      {
        code: "M2",
        title: "Web Sitesi & Dijital Varlık",
        price: "500 – 5k TL/ay",
        subtitle: "Kurulum + aylık bakım modeli",
        points: [
          "Serbest Meslek: 12k + 500/ay",
          "Özelleşmiş WP: 24k + 1k/ay",
          "KOBİ Performans: 50k + 5k/ay",
        ],
        icon: Globe,
      },
      {
        code: "M3",
        title: "Sosyal Medya & İçerik",
        price: "15k – 35k TL/ay",
        subtitle: "İçerik tier bazlı fiyatlama",
        points: [
          "Başlangıç: 1 Post + Story/hafta",
          "Büyüme: 2 Post + Story/hafta",
          "Pro: 3 Post + Reels/hafta",
          "Work365'ten onay akışı",
        ],
        icon: Megaphone,
      },
      {
        code: "M4",
        title: "İşini Büyüt",
        price: "Teklif bazlı",
        subtitle: "Dövize endeksli · ~35 TL/$ · 3 ayda kur revizesi",
        points: [
          "Fikir: AI değerlendirme, BMC, Cap table",
          "MVP: Pitch deck, veri odası, mentor",
          "Piyasa: Yatırım turu, SAFE/nota",
          "Büyüme: SPK uyum, VC köprüsü, PR",
        ],
        icon: Rocket,
        accent: true,
      },
    ],
    faq: [
      {
        question: "Limited şirket ne zaman tercih edilmeli?",
        answer:
          "Ortaklı yapıya geçmek, marka büyütmek ve daha dengeli kurumsal yapı kurmak isteyen işletmeler için güçlü bir seçenektir.",
      },
      {
        question: "Başlangıç paketi hangi kalemleri içerir?",
        answer:
          "Kuruluş, e-İmza 1Y, KEP Başlangıç 1Y, sanal ofis 1Y ve e-Dönüşüm kalemleri tek başlangıç paketi içinde yer alır.",
      },
      {
        question: "Work365 burada neyi kolaylaştırıyor?",
        answer:
          "Kuruluş, dijital altyapı ve ilk operasyon adımlarını tek yerden görünür hale getirir; dağınık süreçleri azaltır.",
      },
    ],
  },
  {
    slug: "anonim-sirketi",
    name: "Anonim Şirketi",
    shortName: "Anonim",
    icon: Landmark,
    accent: "#15803D",
    softAccent: "bg-[#EEF9F1]",
    badge: "Kurumsal Yapı",
    price: "11.900 TL +KDV",
    yearly: "6.500 TL/ay +KDV",
    heroTitle: "Kurumsal yapı ve ölçeklenme hedefi olan şirketler için.",
    heroBody:
      "Hisseli yapı, yatırım süreci ve daha kurumsal operasyon ihtiyacı olan şirketlerde daha uygun hareket alanı sağlayan yapı.",
    highlightLabel: "Yatırım ve ölçeklenme uyumu",
    highlights: [
      "Kurumsal görünüm ve organizasyon yapısı güçlenir.",
      "Yatırım ve hissedarlık senaryolarına daha uygun zemin sağlar.",
      "Daha büyük ölçekli yapı kurmak isteyen ekipler için idealdir.",
    ],
    suitableFor: [
      "Kurumsal yapılanma hedefi olan şirketler",
      "Yatırım veya hissedarlık planı olan girişimler",
      "Daha büyük operasyon kurmak isteyen ekipler",
    ],
    includedItems: commonPackage,
    processSteps: ["Yapı planlama", "Kuruluş evrakları", "Dijital altyapı ve resmi akış", "Operasyon görünürlüğü başlangıcı"],
    packages: [
      { name: "Şirketini Kur", monthlyPrice: "11.900", yearlyPrice: "6.500", popular: false },
      { name: "Şirketini + Dijital Ofisini Kur", monthlyPrice: "21.900", yearlyPrice: "16.500", popular: true },
      { name: "Şirketini + Dijital Ofisini Kur + İşini Büyüt", monthlyPrice: "Teklif", yearlyPrice: "Teklif", popular: false },
    ],
    ecosystemModules: [
      {
        code: "M1",
        title: "Dijital Ofis & IT Yönetimi",
        price: "10k – 30k TL/ay",
        subtitle: "Kullanıcı sayısına göre ölçeklenir",
        points: [
          "M365 lisans + kurulum",
          "Kurumsal e-posta + Teams",
          "OneDrive + MFA",
          "0-10 / 10-50 / 50-299 / 300+ kişi",
        ],
        icon: Laptop,
      },
      {
        code: "M2",
        title: "Web Sitesi & Dijital Varlık",
        price: "500 – 5k TL/ay",
        subtitle: "Kurulum + aylık bakım modeli",
        points: [
          "Serbest Meslek: 12k + 500/ay",
          "Özelleşmiş WP: 24k + 1k/ay",
          "KOBİ Performans: 50k + 5k/ay",
        ],
        icon: Globe,
      },
      {
        code: "M3",
        title: "Sosyal Medya & İçerik",
        price: "15k – 35k TL/ay",
        subtitle: "İçerik tier bazlı fiyatlama",
        points: [
          "Başlangıç: 1 Post + Story/hafta",
          "Büyüme: 2 Post + Story/hafta",
          "Pro: 3 Post + Reels/hafta",
          "Work365'ten onay akışı",
        ],
        icon: Megaphone,
      },
      {
        code: "M4",
        title: "İşini Büyüt",
        price: "Teklif bazlı",
        subtitle: "Dövize endeksli · ~35 TL/$ · 3 ayda kur revizesi",
        points: [
          "Fikir: AI değerlendirme, BMC, Cap table",
          "MVP: Pitch deck, veri odası, mentor",
          "Piyasa: Yatırım turu, SAFE/nota",
          "Büyüme: SPK uyum, VC köprüsü, PR",
        ],
        icon: Rocket,
        accent: true,
      },
    ],
    faq: [
      {
        question: "Anonim şirket kimler için uygun?",
        answer:
          "Kurumsal yapı, hissedarlık planı ve daha büyük ölçekli operasyon hedefi olan girişimler için uygundur.",
      },
      {
        question: "Başlangıç paketinde hangi hizmetler var?",
        answer:
          "Kuruluş, e-İmza 1Y, KEP Başlangıç 1Y, sanal ofis 1Y ve e-Dönüşüm kalemleri başlangıçta birlikte sunulur.",
      },
      {
        question: "Kuruluş sonrası süreç nasıl yönetiliyor?",
        answer:
          "Başvuru durumu, dijital altyapı ve ilk operasyon adımları tek panel akışı içinde daha görünür şekilde ilerler.",
      },
    ],
  },
  {
    slug: "bilanco-sirketi",
    name: "Bilanço Şirketi",
    shortName: "Bilanço",
    icon: ReceiptText,
    accent: "#B84C6C",
    softAccent: "bg-[#FFF1F5]",
    badge: "Operasyon Odaklı",
    price: "7.400 TL +KDV",
    yearly: "4.300 TL/ay +KDV",
    heroTitle: "Kayıt disiplini ve yoğun operasyon akışı olan işler için.",
    heroBody:
      "Muhasebe düzeni, evrak yönetimi ve operasyon takibi güçlü ilerlemesi gereken işletmeler için daha kontrollü bir kurgu sunar.",
    highlightLabel: "Kayıt ve operasyon disiplini",
    highlights: [
      "Muhasebe ve evrak takibi daha düzenli zeminde başlar.",
      "Operasyon yoğunluğu yüksek işler için daha kontrollü akış sağlar.",
      "Başlangıç paketiyle dijital altyapı ve süreç görünürlüğü birlikte kurulur.",
    ],
    suitableFor: [
      "Düzenli evrak ve kayıt akışı olan işletmeler",
      "Muhasebe disiplini kritik olan yapılar",
      "Yoğun operasyon yöneten ekipler",
    ],
    includedItems: commonPackage,
    processSteps: ["Yapı doğrulama", "Kuruluş ve belge akışı", "e-İmza / KEP aktivasyonu", "Muhasebe başlangıç görünümü"],
    packages: [
      { name: "Şirketini Kur", monthlyPrice: "7.400", yearlyPrice: "4.300", popular: false },
      { name: "Şirketini + Dijital Ofisini Kur", monthlyPrice: "17.400", yearlyPrice: "14.300", popular: true },
      { name: "Şirketini + Dijital Ofisini Kur + İşini Büyüt", monthlyPrice: "Teklif", yearlyPrice: "Teklif", popular: false },
    ],
    ecosystemModules: [
      {
        code: "M1",
        title: "Dijital Ofis & IT Yönetimi",
        price: "10k – 30k TL/ay",
        subtitle: "Kullanıcı sayısına göre ölçeklenir",
        points: [
          "M365 lisans + kurulum",
          "Kurumsal e-posta + Teams",
          "OneDrive + MFA",
          "0-10 / 10-50 / 50-299 / 300+ kişi",
        ],
        icon: Laptop,
      },
      {
        code: "M2",
        title: "Web Sitesi & Dijital Varlık",
        price: "500 – 5k TL/ay",
        subtitle: "Kurulum + aylık bakım modeli",
        points: [
          "Serbest Meslek: 12k + 500/ay",
          "Özelleşmiş WP: 24k + 1k/ay",
          "KOBİ Performans: 50k + 5k/ay",
        ],
        icon: Globe,
      },
      {
        code: "M3",
        title: "Sosyal Medya & İçerik",
        price: "15k – 35k TL/ay",
        subtitle: "İçerik tier bazlı fiyatlama",
        points: [
          "Başlangıç: 1 Post + Story/hafta",
          "Büyüme: 2 Post + Story/hafta",
          "Pro: 3 Post + Reels/hafta",
          "Work365'ten onay akışı",
        ],
        icon: Megaphone,
      },
      {
        code: "M4",
        title: "İşini Büyüt",
        price: "Teklif bazlı",
        subtitle: "Dövize endeksli · ~35 TL/$ · 3 ayda kur revizesi",
        points: [
          "Fikir: AI değerlendirme, BMC, Cap table",
          "MVP: Pitch deck, veri odası, mentor",
          "Piyasa: Yatırım turu, SAFE/nota",
          "Büyüme: SPK uyum, VC köprüsü, PR",
        ],
        icon: Rocket,
        accent: true,
      },
    ],
    faq: [
      {
        question: "Bilanço şirketi hangi ihtiyaçta öne çıkar?",
        answer:
          "Muhasebe disiplini, belge takibi ve düzenli finansal görünüm gerektiren işletmeler için daha uygun bir başlangıç yapısı sunar.",
      },
      {
        question: "Paket kapsamı diğer yapılardan farklı mı?",
        answer:
          "Temel başlangıç paketi aynıdır; kuruluş, e-İmza 1Y, KEP Başlangıç 1Y, sanal ofis 1Y ve e-Dönüşüm birlikte sunulur.",
      },
      {
        question: "Work365 burada ne kazandırır?",
        answer:
          "Kuruluş sonrası muhasebe ve operasyon tarafını tek panelde daha görünür hale getirerek düzenli başlangıç sağlar.",
      },
    ],
  },
] as const;

export const companyTypeConfigMap = Object.fromEntries(
  companyTypeConfigs.map((item) => [item.slug, item])
) as Record<string, CompanyTypeConfig>;
