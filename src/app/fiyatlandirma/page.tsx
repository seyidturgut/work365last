"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { buildPackageSignupHref, parseTlString } from "@/lib/pricing";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, CheckCircle2, ChevronDown, CircleDollarSign, FileSignature, Globe, Landmark, Mail, Sparkles, TrendingUp } from "lucide-react";

type CompanyTypeKey = "sahis" | "limited" | "anonim" | "bilanco";
type OfficeTierKey = "do10" | "do30" | "do100" | "do300";
type SocialTierKey = "sm4" | "sm8" | "sm12";
type WebTierKey = "web1" | "web2" | "web3";

type CompanyPricing = {
  label: string;
  monthly: string;
  yearly: string;
  features: string[];
};

type SelectPlan = {
  key: string;
  label: string;
  price: string;
  sublabel: string;
  features: string[];
  description: string;
  term?: string;
  note?: string;
  quote?: boolean;
  ctaLabel?: string;
  source: string;
};

type StoreItem = {
  icon: typeof FileSignature;
  name: string;
  price: string;
  note: string;
  description: string;
  features: string[];
  href: string;
};

const discountRibbon = [
  { stepLabel: "1. hizmet", discountLabel: "İndirimli fiyat", tone: "text-white", bg: "bg-white/8 border-white/12" },
  { stepLabel: "2. hizmet", discountLabel: "%10 indirim", tone: "text-[#7DD3FC]", bg: "bg-[#0B2742] border-[#1B98D5]/35" },
  { stepLabel: "3. hizmet", discountLabel: "%15 indirim", tone: "text-[#86EFAC]", bg: "bg-[#0C2A20] border-[#16A34A]/35" },
  { stepLabel: "4. hizmet", discountLabel: "%20 indirim", tone: "text-[#FDBA74]", bg: "bg-[#3A250D] border-[#D97706]/35" },
] as const;

const companyPricing: Record<CompanyTypeKey, CompanyPricing> = {
  sahis: {
    label: "Şahıs Şirketi",
    monthly: "5.900",
    yearly: "3.200",
    features: [
      "Şirket kuruluşu (tescil + sicil)",
      "e-İmza (1 yıl dahil)",
      "Sanal ofis (1 yıl dahil)",
      "e-Fatura & e-Arşiv aktivasyonu",
      "Online muhasebe + ön muhasebe",
      "Dijital asistan (AI + insan)",
      "Marka tescil + teşvik ön analizi",
      "2.400 belge/yıl dahil",
    ],
  },
  limited: {
    label: "Limited Şirket",
    monthly: "9.900",
    yearly: "5.400",
    features: [
      "Limited şirket kuruluşu (tescil + sicil)",
      "e-İmza (1 yıl dahil)",
      "Sanal ofis (1 yıl dahil)",
      "e-Fatura & e-Arşiv aktivasyonu",
      "Online muhasebe + ön muhasebe",
      "Dijital asistan (AI + insan)",
      "Marka tescil + teşvik ön analizi",
      "2.400 belge/yıl dahil",
    ],
  },
  anonim: {
    label: "Anonim Şirket",
    monthly: "11.900",
    yearly: "6.500",
    features: [
      "Anonim şirket kuruluşu (tescil + sicil)",
      "e-İmza (1 yıl dahil)",
      "Sanal ofis (1 yıl dahil)",
      "e-Fatura & e-Arşiv aktivasyonu",
      "Online muhasebe + ön muhasebe",
      "Dijital asistan (AI + insan)",
      "Marka tescil + teşvik ön analizi",
      "2.400 belge/yıl dahil",
    ],
  },
  bilanco: {
    label: "Bilanço Şirketi",
    monthly: "7.400",
    yearly: "4.300",
    features: [
      "Bilanço esaslı kuruluş paketi",
      "e-İmza (1 yıl dahil)",
      "Sanal ofis (1 yıl dahil)",
      "e-Fatura & e-Arşiv aktivasyonu",
      "Online muhasebe + ön muhasebe",
      "Dijital asistan (AI + insan)",
      "Marka tescil + teşvik ön analizi",
      "2.400 belge/yıl dahil",
    ],
  },
};

const officePlans: SelectPlan[] = [
  {
    key: "do10",
    label: "1–10 kişi",
    price: "10.000",
    sublabel: "Başlangıç düzeyi ekipler için hazır kurulum",
    description: "Küçük ekipler için e-posta, dosya paylaşımı ve temel IT desteğini tek akışta kurun.",
    source: "Fiyatlandırma sayfasından seçildi",
    features: [
      "Microsoft 365 Business lisansları",
      "Kurumsal e-posta + Teams + OneDrive",
      "SharePoint ekip siteleri",
      "Güvenlik (MFA + yedekleme)",
      "Help desk desteği",
      "IT altyapı danışmanlığı",
      "Sıfırdan kurulum veya mevcut dönüşüm",
    ],
  },
  {
    key: "do30",
    label: "11–30 kişi",
    price: "15.000",
    sublabel: "Büyüyen ekipler için daha güçlü operasyon katmanı",
    description: "Lisans, güvenlik ve kullanıcı yönetimini büyüyen ekip yapısına uygun biçimde düzenleyin.",
    source: "Fiyatlandırma sayfasından seçildi",
    features: [
      "Microsoft 365 Business lisansları",
      "Kurumsal e-posta + Teams + OneDrive",
      "SharePoint ekip siteleri",
      "Güvenlik (MFA + yedekleme)",
      "Help desk desteği",
      "IT altyapı danışmanlığı",
      "Sıfırdan kurulum veya mevcut dönüşüm",
    ],
  },
  {
    key: "do100",
    label: "31–100 kişi",
    price: "20.000",
    sublabel: "Kurumsal ekipler için merkezi kontrol ve güvenlik",
    description: "Yetki yönetimi, güvenlik ve ekip iş birliğini daha kontrollü bir altyapıda toplayın.",
    source: "Fiyatlandırma sayfasından seçildi",
    features: [
      "Microsoft 365 Business lisansları",
      "Kurumsal e-posta + Teams + OneDrive",
      "SharePoint ekip siteleri",
      "Güvenlik (MFA + yedekleme)",
      "Help desk desteği",
      "IT altyapı danışmanlığı",
      "Sıfırdan kurulum veya mevcut dönüşüm",
    ],
  },
  {
    key: "do300",
    label: "100+ kişi",
    price: "Teklif",
    sublabel: "Büyük yapılara özel lisans ve geçiş planı",
    description: "Çok kullanıcılı yapılarda lisans, geçiş ve güvenlik mimarisini size özel tasarlıyoruz.",
    source: "Fiyatlandırma sayfasından seçildi",
    quote: true,
    ctaLabel: "Teklif Al",
    features: [
      "Microsoft 365 lisans planlaması",
      "Kurumsal e-posta + Teams + OneDrive",
      "SharePoint ekip siteleri",
      "Güvenlik ve yedekleme tasarımı",
      "Help desk desteği",
      "IT altyapı danışmanlığı",
      "Kurumsal geçiş planı",
    ],
  },
];

const socialPlans: SelectPlan[] = [
  {
    key: "sm4",
    label: "Haftada 1 paylaşım",
    price: "15.000",
    sublabel: "Temel görünürlük için düzenli içerik akışı",
    description: "Markanızı görünür kılacak ilk düzenli içerik ritmini profesyonel bir akışla başlatın.",
    source: "Fiyatlandırma sayfasından seçildi",
    term: "Aylık plan",
    features: [
      "Post veya reels formatında içerik",
      "Paylaşım takvimi + içerik planlaması",
      "Özel gün paylaşımları",
      "İmaj yönetimi",
      "İletişim ve marka danışmanlığı",
      "Tasarım ve içerik danışmanlığı",
    ],
  },
  {
    key: "sm8",
    label: "Haftada 2 paylaşım",
    price: "20.000",
    sublabel: "Sürekli görünürlük için dengeli içerik planı",
    description: "Daha sık içerik üretimiyle markanızın görünürlüğünü ve iletişim ritmini güçlendirin.",
    source: "Fiyatlandırma sayfasından seçildi",
    term: "Aylık plan",
    features: [
      "Post veya reels formatında içerik",
      "Paylaşım takvimi + içerik planlaması",
      "Özel gün paylaşımları",
      "İmaj yönetimi",
      "İletişim ve marka danışmanlığı",
      "Tasarım ve içerik danışmanlığı",
    ],
  },
  {
    key: "sm12",
    label: "Haftada 3 paylaşım",
    price: "30.000",
    sublabel: "Yüksek frekanslı iletişim için premium akış",
    description: "Yoğun paylaşım temposuyla markanızı daha güçlü, daha düzenli ve daha hatırlanır hale getirin.",
    source: "Fiyatlandırma sayfasından seçildi",
    term: "Aylık plan",
    features: [
      "Post veya reels formatında içerik",
      "Paylaşım takvimi + içerik planlaması",
      "Özel gün paylaşımları",
      "İmaj yönetimi",
      "İletişim ve marka danışmanlığı",
      "Tasarım ve içerik danışmanlığı",
    ],
  },
];

const webPlans: SelectPlan[] = [
  {
    key: "web1",
    label: "Landing Page",
    price: "20.000",
    sublabel: "Tek sayfalı hızlı başlangıç sitesi",
    description: "Hızlı yayına çıkmak isteyen markalar için net mesaj veren tek sayfalı bir web vitrini.",
    source: "Fiyatlandırma sayfasından seçildi",
    term: "Kurulum paketi",
    note: "kurulum · KDV hariç",
    features: [
      "Mobil uyumlu, hızlı tasarım",
      "SSL sertifikası + hosting dahil",
      "Temel SEO optimizasyonu",
      "İletişim formu + Google Analytics",
      "Aylık bakım + güncelleme",
      "Kendi alan adınızla yayın",
    ],
  },
  {
    key: "web2",
    label: "Kurumsal Site",
    price: "30.000",
    sublabel: "Kurumsal anlatım için çok sayfalı yapı",
    description: "Hizmetlerinizi ve markanızı daha güçlü anlatmak için kapsamlı kurumsal site kurgusu kurun.",
    source: "Fiyatlandırma sayfasından seçildi",
    term: "Kurulum paketi",
    note: "kurulum · KDV hariç",
    features: [
      "Mobil uyumlu, hızlı tasarım",
      "SSL sertifikası + hosting dahil",
      "Temel SEO optimizasyonu",
      "İletişim formu + Google Analytics",
      "Aylık bakım + güncelleme",
      "Kendi alan adınızla yayın",
    ],
  },
  {
    key: "web3",
    label: "Premium",
    price: "50.000",
    sublabel: "Özel tasarım ve görünürlük odaklı üst paket",
    description: "Daha güçlü tasarım, daha yüksek güven ve daha iyi görünürlük hedefi için premium web paketi seçin.",
    source: "Fiyatlandırma sayfasından seçildi",
    term: "Kurulum paketi",
    note: "kurulum · KDV hariç",
    features: [
      "Mobil uyumlu, hızlı tasarım",
      "SSL sertifikası + hosting dahil",
      "Temel SEO optimizasyonu",
      "İletişim formu + Google Analytics",
      "Aylık bakım + güncelleme",
      "Kendi alan adınızla yayın",
    ],
  },
];

const growthItems = [
  {
    icon: Sparkles,
    title: "Teşvik Analizi",
    description: "İşletmeniz için uygun teşvik başlıklarını hızlıca netleştirip doğru başvuru zeminini kurun.",
    tag: "990 TL tek seferlik + ayda 290 TL takip",
  },
  {
    icon: CircleDollarSign,
    title: "Hibe Başvuru Desteği",
    description: "Başvuru dosyası hazırlığını ve süreç takibini proje bazlı uzman desteğiyle ilerletin.",
    tag: "Proje bazlı teklif",
  },
  {
    icon: TrendingUp,
    title: "Yatırımcı Erişimi",
    description: "Yatırım görüşmeleri öncesinde daha doğru hazırlıkla daha güçlü yatırımcı teması kurun.",
    tag: "Randevu ile detay",
  },
  {
    icon: Landmark,
    title: "Uzman Kiralama & İşe Alım",
    description: "Operasyon, destek ve danışmanlık ihtiyaçlarınızı esnek uzman modeliyle hızla tamamlayın.",
    tag: "Saat / gün / pozisyon bazlı",
  },
];

const storeItems: StoreItem[] = [
  {
    icon: FileSignature,
    name: "e-İmza",
    price: "2.300 TL",
    note: "1 yıllık · E-Tuğra Nitelikli",
    description: "Resmi işlemler için gerekli e-İmza sürecini güvenli ve hızlı biçimde tamamlayın.",
    features: ["Başvuru ve kimlik doğrulama takibi", "Yenileme hatırlatması", "Abonelere ilk yıl dahil"],
    href: buildPackageSignupHref("e-İmza 1 Yıl", 2300, {
      label: "e-İmza",
      source: "Fiyatlandırma sayfasından seçildi",
      term: "1 yıllık paket",
      description: "Resmi işlemleriniz için gerekli e-İmza başvurusunu hızlı ve güvenli şekilde tamamlayın.",
      features: ["Başvuru ve kimlik doğrulama takibi", "Yenileme hatırlatması", "Abonelere ilk yıl dahil"],
    }),
  },
  {
    icon: Mail,
    name: "KEP",
    price: "520 TL'den",
    note: "1 yıllık · 4 paket seçeneği",
    description: "Resmi tebligat ve kayıtlı e-posta süreçlerini işletmeniz için hızlıca aktive edin.",
    features: ["Başlangıç: 520 TL", "Standart: 855 TL", "Pro: 1.149 TL", "Kurumsal: 1.779 TL"],
    href: buildPackageSignupHref("KEP Başlangıç", 520, {
      label: "KEP Başlangıç",
      source: "Fiyatlandırma sayfasından seçildi",
      term: "1 yıllık paket",
      description: "Resmi bildirim süreçleri için KEP hesabınızı kısa sürede devreye alın.",
      features: ["Başlangıç: 520 TL", "Standart: 855 TL", "Pro: 1.149 TL", "Kurumsal: 1.779 TL"],
    }),
  },
  {
    icon: CheckCircle2,
    name: "Marka Tescil",
    price: "4.900 TL",
    note: "TPE harcı dahil",
    description: "Markanızı başvurudan takibe kadar tek akışta koruma altına alın.",
    features: ["TPE harcı dahil", "Benzerlik araştırması", "Başvuru takibi"],
    href: buildPackageSignupHref("Marka Tescil", 4900, {
      label: "Marka Tescil",
      source: "Fiyatlandırma sayfasından seçildi",
      term: "Tek seferlik hizmet",
      description: "Marka araştırmasını ve TPE başvuru sürecini tek ekiple güvenle ilerletin.",
      features: ["TPE harcı dahil", "Benzerlik araştırması", "Başvuru takibi"],
    }),
  },
  {
    icon: Globe,
    name: "Sanal Ofis",
    price: "490 TL / ay",
    note: "Yıllık ödemede: ayda 345 TL",
    description: "Prestijli iş adresi ve tebligat yönetimini fiziksel ofis yükü olmadan kullanın.",
    features: ["Ticaret sicil kaydı için uygun", "Tebligat + posta + kargo alımı", "Yıllık ödeme avantajı"],
    href: buildPackageSignupHref("Sanal Ofis", 490, {
      label: "Sanal Ofis",
      source: "Fiyatlandırma sayfasından seçildi",
      term: "Aylık plan",
      description: "İş adresi ve tebligat yönetimini sanal ofis modeliyle hemen kullanmaya başlayın.",
      features: ["Ticaret sicil kaydı için uygun", "Tebligat + posta + kargo alımı", "Yıllık ödeme avantajı"],
    }),
  },
];

const faqs = [
  {
    question: "Fiyatlar KDV dahil mi?",
    answer: "Hayır. Tüm fiyatlar KDV hariçtir.",
  },
  {
    question: "Aboneliği erken sonlandırırsam ne olur?",
    answer: "Kuruluş maliyeti pakete yayıldığı için ilk yıl dolmadan ayrılmalarda kuruluş bedeli ayrıca yansıtılır.",
  },
  {
    question: "Belge limitim yetmezse ne olur?",
    answer: "İşletmenizin hacmine göre daha uygun bir planı birlikte netleştiriyoruz.",
  },
  {
    question: "Çoklu hizmet indirimi nasıl işler?",
    answer: "İkinci hizmette %10, üçüncü hizmette %15, dördüncü hizmette %20 indirim uygulanır. İndirim yeni eklenen hizmete yansır.",
  },
  {
    question: "Sanal ofis kullanmak istemezsem?",
    answer: "Kendi adresinizi kullanabiliyorsanız paket yapısını buna göre yeniden düzenleyebiliriz.",
  },
  {
    question: "Destek ekibine nasıl ulaşırım?",
    answer: "Süreç boyunca panel üzerinden veya iletişim akışından ekibimize doğrudan ulaşabilirsiniz.",
  },
];

export default function FiyatlandirmaPage() {
  const [companyType, setCompanyType] = useState<CompanyTypeKey>("sahis");
  const [yearly, setYearly] = useState(false);
  const [officeKey, setOfficeKey] = useState<OfficeTierKey>("do10");
  const [socialKey, setSocialKey] = useState<SocialTierKey>("sm4");
  const [webKey, setWebKey] = useState<WebTierKey>("web1");
  const [openFaq, setOpenFaq] = useState(0);
  const [activeStoreItem, setActiveStoreItem] = useState<StoreItem | null>(null);
  const [activeSection, setActiveSection] = useState("sirketini-kur");
  const [isStickyPinned, setIsStickyPinned] = useState(false);
  const stickySentinelRef = useRef<HTMLDivElement | null>(null);

  const trPlan = companyPricing[companyType];
  const trPrice = yearly ? trPlan.yearly : trPlan.monthly;
  const trPriceValue = parseTlString(trPrice);
  const trSignupHref = buildPackageSignupHref(trPlan.label, trPriceValue, {
    label: trPlan.label,
    source: "Fiyatlandırma sayfasından seçildi",
    term: yearly ? "Yıllık plan" : "Aylık plan",
    description: "Kuruluşu, muhasebe başlangıcını ve ilk operasyon ihtiyaçlarını tek pakette tamamlayın.",
    features: trPlan.features,
  });

  const activeOffice = officePlans.find((plan) => plan.key === officeKey)!;
  const activeSocial = socialPlans.find((plan) => plan.key === socialKey)!;
  const activeWeb = webPlans.find((plan) => plan.key === webKey)!;

  const officeHref = activeOffice.quote
    ? "/contact"
    : buildPackageSignupHref(`Dijital Ofis ${activeOffice.label}`, activeOffice.price, {
        label: `Dijital Ofis ${activeOffice.label}`,
        source: activeOffice.source,
        term: "Aylık plan",
        description: activeOffice.description,
        features: activeOffice.features,
      });

  const socialHref = buildPackageSignupHref(`Sosyal Medya ${activeSocial.label}`, activeSocial.price, {
    label: `Sosyal Medya ${activeSocial.label}`,
    source: activeSocial.source,
    term: activeSocial.term,
    description: activeSocial.description,
    features: activeSocial.features,
  });

  const webHref = buildPackageSignupHref(`Web Sitesi ${activeWeb.label}`, activeWeb.price, {
    label: `Web Sitesi ${activeWeb.label}`,
    source: activeWeb.source,
    term: activeWeb.term,
    description: activeWeb.description,
    features: activeWeb.features,
  });

  const heroTags = useMemo(
    () => ["Şirketini Kur", "Dijital Ofis", "Görünür Ol", "İşini Büyüt"],
    []
  );

  const stickyNavItems = useMemo(
    () => [
      { id: "sirketini-kur", label: "Şirketini Kur" },
      { id: "dijital-ofis", label: "Dijital Ofis" },
      { id: "sosyal-medya", label: "Sosyal Medya" },
      { id: "web-sitesi", label: "Web Sitesi" },
      { id: "magaza", label: "Mağaza" },
      { id: "isini-buyut", label: "İşini Büyüt" },
    ],
    []
  );

  useEffect(() => {
    const targets = stickyNavItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.55, 0.75],
      }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [stickyNavItems]);

  useEffect(() => {
    if (!stickySentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsStickyPinned(!entry.isIntersecting);
      },
      {
        rootMargin: "-88px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(stickySentinelRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const stickyOffset = 170;
    const top = element.getBoundingClientRect().top + window.scrollY - stickyOffset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(sectionId);
  };

  const renderDesktopStickyNav = () => (
    <div className="hidden items-center gap-2 md:flex">
      {stickyNavItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all ${
              isActive
                ? "border-[#1B98D5] bg-[#1B98D5] text-white shadow-[0_6px_18px_rgba(27,152,213,0.24)]"
                : "border-black/10 bg-[#F8FAFC] text-[#475569] hover:border-[#1B98D5]/35"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <main className="bg-[#FAFBFC] pt-[92px] text-[#0F172A]">
      <Header />

      <section className="relative overflow-hidden px-6 pb-8 pt-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(27,152,213,0.11)_0%,transparent_68%)]" />
        <div className="mx-auto max-w-[1230px]">
          <div className="relative overflow-hidden rounded-[40px] border border-black/6 bg-white px-8 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.05)] md:px-12 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[#15803D]">
                  <Check className="h-4 w-4" />
                  Net fiyat, sürpriz maliyet yok
                </div>
                <h1 className="mt-6 max-w-[14ch] text-[34px] font-extrabold leading-[1.04] tracking-[-0.05em] text-[#0F172A] md:text-[52px]">
                  Tum fiyatlari net gorun,
                  <span className="bg-[linear-gradient(135deg,#1B98D5,#7C3AED)] bg-clip-text text-transparent"> size en uygun paketi hemen secin.</span>
                </h1>
                <p className="mt-4 max-w-[54ch] text-[16px] leading-8 text-[#64748B]">
                  Kurulus, dijital ofis ve gorunurluk paketlerini tek ekranda karsilastirin. Uygun paketi secip sureci aninda baslatin.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {heroTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/8 bg-[#F8FAFC] px-4 py-2 text-[13px] font-semibold text-[#475569]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7">
                  <a
                    href="#sirketini-kur"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B98D5] px-7 py-3.5 text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5"
                  >
                    Paketleri incele
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full rounded-[30px] border border-[#D9E8F6] bg-[linear-gradient(180deg,#F8FBFF_0%,#EEF6FF_100%)] p-7 shadow-[0_20px_60px_rgba(27,152,213,0.10)]">
                  <div className="relative h-[210px] w-full overflow-hidden rounded-[22px]">
                    <Image
                      src="/auth-modern-office.jpg"
                      alt="Fiyatlandirma hero gorseli"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/45 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/90">Tek panelde net secim</p>
                  </div>
                  <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#1B98D5]">Doğru başlangıç</p>
                  <h2 className="mt-3 text-[24px] font-bold tracking-[-0.04em] text-[#0F172A]">
                    Ihtiyaciniz kadar alin, gereksiz maliyetten kacinin.
                  </h2>
                  <div className="mt-5 space-y-3">
                    {[
                      "Abonelik modullerini ihtiyaciniza gore birlestirin.",
                      "Tek seferlik urunleri ayri satin alin.",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-[18px] bg-white px-4 py-3 text-[14px] text-[#475569]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-bold text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
                    >
                      Uzmanla görüş
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div ref={stickySentinelRef} className="h-px w-full" />

      <section className="hidden px-6 pb-4 md:block">
        <div className="mx-auto max-w-[1230px]">
          <div className="rounded-[20px] border border-black/8 bg-white/90 p-2 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur">
            {renderDesktopStickyNav()}
          </div>
        </div>
      </section>
      {isStickyPinned ? (
        <div className="fixed left-1/2 top-[88px] z-40 hidden w-[calc(100%-3rem)] max-w-[1230px] -translate-x-1/2 px-0 md:block">
          <div className="rounded-[20px] border border-black/8 bg-white/95 p-2 shadow-[0_14px_34px_rgba(15,23,42,0.14)] backdrop-blur">
            {renderDesktopStickyNav()}
          </div>
        </div>
      ) : null}

      <section id="sirketini-kur" className="px-6 py-12">
        <div className="mx-auto max-w-[1230px]">
          <SectionHead
            badge="Şirketini Kur"
            badgeTone="bg-[#FEF3C7] text-[#92400E]"
            title="Şirketinizi kurmak için en doğru paketi tek ekranda seçin."
            description="Kuruluş süreci, muhasebe başlangıcı ve temel dijital ihtiyaçlar tek pakette net şekilde görünür."
            motto="Kuruluşu hızlandırın, ilk operasyonu sadeleştirin."
          />

          <div className="overflow-hidden rounded-[30px] border border-[#F59E0B]/30 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
            <div className="p-7 md:p-10">
              <div className="mb-5 flex flex-wrap gap-2">
                {(Object.entries(companyPricing) as [CompanyTypeKey, CompanyPricing][]).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCompanyType(key)}
                    className={`rounded-[12px] border px-4 py-2.5 text-[13px] font-semibold transition-all ${
                      companyType === key
                        ? "border-[#1B98D5] bg-[#EBF6FF] text-[#1B98D5]"
                        : "border-black/10 bg-white text-[#64748B] hover:border-black/20"
                    }`}
                  >
                    {value.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-stretch">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setYearly(false)}
                      className={`rounded-full px-4 py-2 text-[13px] font-bold transition-all ${
                        !yearly ? "bg-[#0F172A] text-white" : "bg-black/5 text-[#64748B]"
                      }`}
                    >
                      Aylık
                    </button>
                    <button
                      type="button"
                      onClick={() => setYearly(true)}
                      className={`rounded-full px-4 py-2 text-[13px] font-bold transition-all ${
                        yearly ? "bg-[#0F172A] text-white" : "bg-black/5 text-[#64748B]"
                      }`}
                    >
                      Yıllık
                    </button>
                    <span className="rounded-full bg-[#DCFCE7] px-3 py-1.5 text-[11px] font-bold text-[#15803D]">
                      ~%40 tasarruf
                    </span>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
                    <div>
                      <div className="min-h-[20px] text-[14px] text-[#94A3B8]">{yearly ? `₺${trPlan.monthly}/ay` : "\u00A0"}</div>
                      <div className="mt-1 flex flex-wrap items-end gap-2">
                        <span className="text-[18px] font-bold text-[#0F172A]">₺</span>
                        <span className="text-[46px] font-extrabold leading-none tracking-[-0.05em] text-[#0F172A]">{trPrice}</span>
                        <span className="pb-1 text-[14px] text-[#64748B]">{yearly ? "/ ay · Yıllık ödeme" : "/ ay · Aylık ödeme"}</span>
                      </div>
                      <p className="mt-2 text-[13px] text-[#64748B]">
                        {trPlan.label} · {yearly ? "Yıllık ödeme" : "Aylık ödeme"} · KDV hariç
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <Link
                        href={trSignupHref}
                        className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-[#1B98D5] px-6 py-3.5 text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5"
                      >
                        Hemen Başla
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-[16px] border border-black/10 bg-white px-6 py-3.5 text-[14px] font-bold text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
                      >
                        Teklif Al
                      </Link>
                    </div>
                  </div>

                  <p className="max-w-[64ch] text-[15px] leading-7 text-[#64748B]">
                    Kuruluş paketi içinde ilk resmi adımları, muhasebe başlangıcını ve dijital operasyon ihtiyaçlarını aynı akışta görün.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {trPlan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 rounded-[18px] border border-black/6 bg-[#F8FAFC] px-4 py-3 text-[14px] leading-6 text-[#475569]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="-mx-7 mt-2 border-t border-black/6 bg-[#F8FAFC] px-4 pb-4 pt-4 xl:-my-10 xl:ml-0 xl:mr-0 xl:mt-0 xl:border-l xl:border-t-0 xl:px-5 xl:py-5">
                  <SectionVisual
                    imageSrc="/happy_founder.png"
                    imageAlt="Kuruluş paketleri için Work365 kurucu görseli"
                    eyebrow="Hazır başlangıç"
                    copy="Kuruluş sürecini güven veren net bir paketle başlatın."
                    overlayClassName="from-[#0F172A]/72 via-[#0F172A]/28 to-transparent"
                    accentClassName="text-[#FCD34D]"
                    compact
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-[1230px] space-y-12">
          <div id="dijital-ofis">
            <UnifiedPlanSection
              badge="Dijital Ofis"
              badgeTone="bg-[#CCFBF1] text-[#115E59]"
              motto="Ekibiniz için daha düzenli, daha güvenli bir dijital çalışma alanı kurun."
              plans={officePlans}
              activeKey={officeKey}
              onChange={(key) => setOfficeKey(key as OfficeTierKey)}
              accent="teal"
              ctaHref={officeHref}
              imageSrc="/auth-modern-office.jpg"
              imageAlt="Dijital ofis paketi için modern ofis görseli"
              visualEyebrow="Merkezi yönetim"
              visualCopy="E-posta, dosya paylaşımı ve kullanıcı yönetimini tek bir düzenli ofis katmanında toplayın."
            />
          </div>

          <div id="sosyal-medya">
            <UnifiedPlanSection
              badge="Görünür Ol · Sosyal Medya"
              badgeTone="bg-[#DBEAFE] text-[#1E3A8A]"
              motto="Markanızı daha düzenli, daha görünür ve daha hatırlanır hale getirin."
              plans={socialPlans}
              activeKey={socialKey}
              onChange={(key) => setSocialKey(key as SocialTierKey)}
              accent="blue"
              ctaHref={socialHref}
              imageSrc="/founder_2.png"
              imageAlt="Sosyal medya görünürlüğü için marka odaklı görsel"
              visualEyebrow="Sürekli görünürlük"
              visualCopy="Markanız için düzenli bir içerik ritmi kurun, görünürlüğü tesadüfe bırakmayın."
            />
          </div>

          <div id="web-sitesi">
            <UnifiedPlanSection
              badge="Görünür Ol · Web Sitesi"
              badgeTone="bg-[#DBEAFE] text-[#1E3A8A]"
              motto="Güven veren bir web yüzeyiyle markanızı güçlü gösterin."
              plans={webPlans}
              activeKey={webKey}
              onChange={(key) => setWebKey(key as WebTierKey)}
              accent="blue"
              ctaHref={webHref}
              imageSrc="/hero_male.png"
              imageAlt="Web sitesi paketi için dijital ürün odaklı görsel"
              visualEyebrow="Dijital vitrin"
              visualCopy="Markanızı güçlü anlatan, hızlı yayına çıkan ve güven veren bir web yüzeyiyle ilerleyin."
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-[1230px] rounded-[34px] bg-[linear-gradient(135deg,#0F172A_0%,#1E3A5F_55%,#0F172A_100%)] px-8 py-10 text-white shadow-[0_24px_70px_rgba(15,23,42,0.20)] md:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-[28px] font-extrabold tracking-[-0.04em] text-white">Modül indirimi sadece abonelik servislerinde geçerlidir.</h2>
              <p className="mt-2 max-w-[54ch] text-[15px] text-white/78">
                Yalnızca Dijital Ofis ve Sosyal Medya birlikte alındığında modül indirimi uygulanır. Web Sitesi, Şirketini Kur, İşini Büyüt ve Mağaza ürünleri bu kapsama dahil değildir.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {discountRibbon.map((item) => (
                <div key={item.stepLabel} className={`rounded-[18px] border px-5 py-4 ${item.bg}`}>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{item.stepLabel}</div>
                  <div className={`mt-3 text-[24px] font-extrabold tracking-[-0.04em] ${item.tone}`}>{item.discountLabel}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 text-[13px] text-white/58">Örnek: Dijital Ofis + Sosyal Medya kombinasyonunda indirim devreye girer.</p>
        </div>
      </section>

      <section id="magaza" className="px-6 py-12">
        <div className="mx-auto max-w-[1230px]">
          <SectionHead
            badge="Mağaza"
            badgeTone="bg-[#EEF3F8] text-[#334155]"
            title="İhtiyacınız olan tek seferlik ürünleri hemen seçin."
            description="Abonelikten bağımsız satın alabileceğiniz temel ürünleri tek yerde topladık."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {storeItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="rounded-[24px] border border-black/8 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.04)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#EEF6FF] text-[#1B98D5]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-[20px] font-bold tracking-[-0.03em] text-[#0F172A]">{item.name}</h3>
                  <p className="mt-2 text-[24px] font-extrabold tracking-[-0.04em] text-[#1B98D5]">{item.price}</p>
                  <p className="mt-1 text-[12px] text-[#94A3B8]">{item.note}</p>
                  <p className="mt-4 line-clamp-3 text-[14px] leading-7 text-[#64748B]">{item.description}</p>
                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveStoreItem(item)}
                      className="flex-1 rounded-[14px] bg-[#F1F5F9] px-4 py-2.5 text-[13px] font-semibold text-[#334155] transition-colors hover:bg-[#E2E8F0]"
                    >
                      İncele
                    </button>
                    <Link
                      href={item.href}
                      className="flex-1 rounded-[14px] bg-[#1B98D5] px-4 py-2.5 text-center text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                    >
                      Başvur
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="isini-buyut" className="px-6 py-12">
        <div className="mx-auto max-w-[1230px]">
          <SectionHead
            badge="İşini Büyüt"
            badgeTone="bg-[#D1FAE5] text-[#065F46]"
            title="Büyüme adımlarında doğru uzman desteğini yanınıza alın."
            description="Teşvikten yatırımcı hazırlığına kadar büyüme odaklı ihtiyaçları tek alanda toparladık."
            motto="Tam zamanlı ekip kurmadan doğru uzmanlığa erişin."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {growthItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-black/8 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.07)]"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#D1FAE5] text-[#059669]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold tracking-[-0.03em] text-[#0F172A]">{item.title}</h3>
                      <p className="mt-2 text-[14px] leading-7 text-[#64748B]">{item.description}</p>
                      <span className="mt-3 inline-flex rounded-full bg-[#ECFDF5] px-3 py-1.5 text-[11px] font-semibold text-[#15803D]">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16A34A] px-8 py-3.5 text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Randevu Al
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[760px]">
          <h2 className="text-center text-[28px] font-extrabold tracking-[-0.04em] text-[#0F172A]">
            Karar vermeden önce en çok merak edilenler
          </h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="overflow-hidden rounded-[22px] border border-black/8 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-bold text-[#0F172A]">{faq.question}</span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${openFaq === index ? "bg-[#EBF6FF] text-[#1B98D5] rotate-180" : "bg-black/5 text-[#64748B]"}`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                {openFaq === index ? (
                  <div className="border-t border-black/6 bg-[#F8FAFC] px-6 py-5 text-[14px] leading-7 text-[#64748B]">
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-4">
        <div className="mx-auto max-w-[1230px] rounded-[38px] bg-[#1B98D5] px-8 py-14 text-center text-white shadow-[0_24px_70px_rgba(27,152,213,0.20)] md:px-12">
          <h2 className="text-[32px] font-extrabold tracking-[-0.04em]">Hazırsanız doğru paketle bugün başlayın.</h2>
          <p className="mx-auto mt-3 max-w-[42ch] text-[17px] leading-8 text-white/78">
            Kuruluş, muhasebe ve dijital operasyon ihtiyaçlarını tek akışta toplayan yapı ile süreci gecikmeden başlatın.
          </p>
          <Link
            href={trSignupHref}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#1B98D5] transition-transform hover:-translate-y-0.5"
          >
            Hemen Başla
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {activeStoreItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0F172A]/55 px-5 py-8 backdrop-blur-[3px]"
            onClick={() => setActiveStoreItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-[560px] rounded-[28px] bg-white p-7 shadow-[0_24px_90px_rgba(15,23,42,0.20)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#1B98D5]">Ürün detayı</p>
                  <h3 className="mt-3 text-[28px] font-bold tracking-[-0.04em] text-[#0F172A]">{activeStoreItem.name}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#64748B]">{activeStoreItem.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStoreItem(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B]"
                >
                  ×
                </button>
              </div>
              <p className="mt-5 text-[30px] font-extrabold tracking-[-0.04em] text-[#1B98D5]">{activeStoreItem.price}</p>
              <p className="mt-1 text-[13px] text-[#94A3B8]">{activeStoreItem.note}</p>
              <div className="mt-6 space-y-2.5">
                {activeStoreItem.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-[14px] leading-7 text-[#475569]">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#16A34A]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                href={activeStoreItem.href}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[16px] bg-[#1B98D5] px-6 py-3.5 text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Hemen Başvur
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

function SectionHead({
  badge,
  badgeTone,
  title,
  description,
  motto,
}: {
  badge: string;
  badgeTone: string;
  title: string;
  description?: string;
  motto?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] ${badgeTone}`}>
          {badge}
        </span>
        {motto ? <span className="text-[14px] italic text-[#64748B]">{motto}</span> : null}
      </div>
      <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.04em] text-[#0F172A] md:text-[42px]">{title}</h2>
      {description ? <p className="mt-3 max-w-[62ch] text-[15px] leading-7 text-[#64748B]">{description}</p> : null}
    </div>
  );
}

function UnifiedPlanSection({
  badge,
  badgeTone,
  motto,
  plans,
  activeKey,
  onChange,
  accent,
  ctaHref,
  imageSrc,
  imageAlt,
  visualEyebrow,
  visualCopy,
}: {
  badge: string;
  badgeTone: string;
  motto: string;
  plans: SelectPlan[];
  activeKey: string;
  onChange: (key: string) => void;
  accent: "teal" | "blue";
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  visualEyebrow: string;
  visualCopy: string;
}) {
  const activePlan = plans.find((plan) => plan.key === activeKey)!;
  const accentClasses =
    accent === "teal"
      ? {
          border: "border-[#0D9488]/30",
          bg: "bg-[#CCFBF1]",
          text: "text-[#115E59]",
          button: "bg-[#0D9488]",
        }
      : {
          border: "border-[#2563EB]/25",
          bg: "bg-[#DBEAFE]",
          text: "text-[#1E3A8A]",
          button: "bg-[#2563EB]",
        };

  return (
    <div>
      <SectionHead badge={badge} badgeTone={badgeTone} title={badge} description={activePlan.description} motto={motto} />
      <div className={`overflow-hidden rounded-[30px] border bg-white shadow-[0_18px_60px_rgba(15,23,42,0.05)] ${accentClasses.border}`}>
        <div className="p-7 md:p-10">
          <div className="mb-5 flex flex-wrap gap-2">
            {plans.map((plan) => (
              <button
                key={plan.key}
                type="button"
                onClick={() => onChange(plan.key)}
                className={`rounded-[12px] border px-4 py-2.5 text-[13px] font-semibold transition-all ${
                  activeKey === plan.key
                    ? `${accentClasses.bg} ${accentClasses.text} border-current`
                    : "border-black/10 bg-white text-[#64748B] hover:border-black/20"
                }`}
              >
                {plan.label}
              </button>
            ))}
          </div>

          <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-stretch">
            <div className="space-y-6">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
                <div>
                  <div className="mt-1 flex flex-wrap items-end gap-2">
                    {!activePlan.quote ? <span className="text-[18px] font-bold text-[#0F172A]">₺</span> : null}
                    <span className="text-[44px] font-extrabold leading-none tracking-[-0.05em] text-[#0F172A]">{activePlan.price}</span>
                    <span className="pb-1 text-[14px] text-[#64748B]">{activePlan.note || "/ ay · KDV hariç"}</span>
                  </div>
                  <p className="mt-2 text-[13px] text-[#64748B]">{activePlan.sublabel}</p>
                </div>

                <Link
                  href={ctaHref}
                  className={`inline-flex items-center justify-center gap-2 rounded-[16px] px-6 py-3.5 text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5 ${accentClasses.button}`}
                >
                  {activePlan.quote ? activePlan.ctaLabel || "Teklif Al" : activePlan.ctaLabel || "Hemen Başla"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="max-w-[62ch] text-[15px] leading-7 text-[#64748B]">{activePlan.description}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                {activePlan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-[18px] border border-black/6 bg-[#F8FAFC] px-4 py-3 text-[14px] leading-6 text-[#475569]">
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${accentClasses.text}`} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="-mx-7 mt-2 border-t border-black/6 bg-[#F8FAFC] px-4 pb-4 pt-4 xl:-my-10 xl:ml-0 xl:mr-0 xl:mt-0 xl:border-l xl:border-t-0 xl:px-5 xl:py-5">
              <SectionVisual
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                eyebrow={visualEyebrow}
                copy={visualCopy}
                overlayClassName={accent === "teal" ? "from-[#0F172A]/76 via-[#0F172A]/28 to-transparent" : "from-[#0F172A]/70 via-[#0F172A]/22 to-transparent"}
                accentClassName={accent === "teal" ? "text-[#99F6E4]" : "text-[#BFDBFE]"}
                compact
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionVisual({
  imageSrc,
  imageAlt,
  eyebrow,
  copy,
  overlayClassName,
  accentClassName,
  compact = false,
}: {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  copy: string;
  overlayClassName: string;
  accentClassName: string;
  compact?: boolean;
}) {
  return (
    <div className={`${compact ? "h-full" : "mb-7 overflow-hidden rounded-[24px] border border-black/6 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.08)]"}`}>
      <div
        className={`relative w-full overflow-hidden ${
          compact
            ? "h-[220px] rounded-[22px] xl:h-full xl:min-h-[390px] xl:rounded-[24px]"
            : "h-[220px] rounded-[24px]"
        }`}
      >
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 36vw" />
        <div className={`absolute inset-0 bg-gradient-to-t ${overlayClassName}`} />
        <div className={`absolute inset-x-0 bottom-0 ${compact ? "p-4 md:p-5" : "p-5"}`}>
          <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${accentClassName}`}>{eyebrow}</p>
          <p className={`mt-2 max-w-[26ch] text-white ${compact ? "text-[14px] font-medium leading-5" : "text-[15px] font-semibold leading-6"}`}>{copy}</p>
        </div>
      </div>
    </div>
  );
}
