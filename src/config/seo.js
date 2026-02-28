const SITE_NAME = "Work365";
const DEFAULT_DESCRIPTION =
  "Work365 ile muhasebe, vergi, SGK ve kurumsal danışmanlık hizmetlerinizi dijitalleştirin. KOBİ ve startup'lar için tek platform.";
const DEFAULT_OG_IMAGE = "/og-default.png";
const DEFAULT_KEYWORDS = [
  "muhasebe",
  "vergi danışmanlığı",
  "SGK",
  "kurumsal danışmanlık",
  "KOBİ",
  "startup",
  "dijital muhasebe",
  "mali müşavirlik",
  "iş danışmanlığı",
  "vergi hesaplama",
  "e-fatura",
  "e-defter",
  "KVKK",
  "iş kuruluşu",
  "şirket kuruluşu",
].join(", ");

const BASE_URL = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");

export const organizationInfo = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
  logo: BASE_URL ? `${BASE_URL}/piri-fav-150x150.png` : "/piri-fav-150x150.png",
  description: DEFAULT_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Adalet Mah. Manas Blv. Folkart Towers B Kule No:39 Kat:25/2511",
    addressLocality: "Bayraklı",
    addressRegion: "İzmir",
    postalCode: "35530",
    addressCountry: "TR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-850-123-45-67",
    contactType: "customer service",
    areaServed: "TR",
    availableLanguage: ["Turkish"],
  },
  sameAs: [
    "https://www.instagram.com/piridijital",
    "https://twitter.com/piridijital",
    "https://www.linkedin.com/company/piridijital",
    "https://www.facebook.com/piridijital",
    "https://www.youtube.com/@piridijital",
  ],
};

export const seoDefaults = {
  siteName: SITE_NAME,
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  image: DEFAULT_OG_IMAGE,
  baseUrl: BASE_URL,
  locale: "tr_TR",
  twitterCard: "summary_large_image",
  author: SITE_NAME,
  themeColor: "#799b38",
};

const fullUrl = (path) => {
  const base = BASE_URL || "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base.replace(/\/$/, "")}${p}` : p;
};

export const getCanonicalUrl = (path) => fullUrl(path || (typeof window !== "undefined" ? window.location.pathname : "/"));

export const routeMeta = {
  "/": {
    title: `${SITE_NAME} | Muhasebe, Vergi ve Kurumsal Danışmanlık`,
    description:
      "Muhasebe, vergi, SGK, kurumsal danışmanlık ve dijital hizmetler tek çatı altında. KOBİ ve startup'lar için Work365.",
  },
  "/fiyatlar": {
    title: `Fiyatlar | ${SITE_NAME}`,
    description: "Work365 paket fiyatları ve hizmet seçenekleri. İhtiyacınıza uygun paketi seçin.",
  },
  "/hakkimizda": {
    title: `Hakkımızda | ${SITE_NAME}`,
    description:
      "Work365 ekibi ve misyonumuz. Muhasebe, vergi ve kurumsal danışmanlıkta dijital çözüm ortağınız.",
  },
  "/blog": {
    title: `Blog | ${SITE_NAME}`,
    description: "Muhasebe, vergi, SGK ve iş dünyasına dair güncel yazılar ve rehberler.",
  },
  "/kutuphane": {
    title: `Kütüphane | ${SITE_NAME}`,
    description: "Rehberler, şablonlar ve kaynaklar. İş süreçlerinizi kolaylaştıracak dökümanlar.",
  },
  "/araclar": {
    title: `Araçlar | ${SITE_NAME}`,
    description: "Vergi hesaplama ve faydalı iş araçları. Gelir vergisi ve diğer hesaplayıcılar.",
  },
  "/iletisim": {
    title: `İletişim | ${SITE_NAME}`,
    description: "Work365 ile iletişime geçin. Sorularınız ve talepleriniz için bize ulaşın.",
  },
  "/kurumsal-danismanlik": {
    title: `Kurumsal Danışmanlık | ${SITE_NAME}`,
    description: "Kurumsal danışmanlık hizmetleri. Strateji, süreç ve dijital dönüşüm desteği.",
  },
  "/kobi-startup": {
    title: `KOBİ & Startup | ${SITE_NAME}`,
    description: "KOBİ ve startup'lar için muhasebe, vergi ve büyüme danışmanlığı.",
  },
  "/sirket-kurulusu": {
    title: `Şirket Kuruluşu | ${SITE_NAME}`,
    description: "Limited veya anonim şirket kuruluş sürecinizi Work365 ile dijitalle yönetin, belgeleri ve adımları tek panelden takip edin.",
  },
  "/hizmet-basvuru": {
    title: `Hizmet Başvuru | ${SITE_NAME}`,
    description: "Hizmet talebi oluşturun. Muhasebe, vergi ve danışmanlık başvuruları.",
  },
  "/basvuru-takibi": {
    title: `Başvuru Takibi | ${SITE_NAME}`,
    description: "Hizmet başvurularınızı takip edin.",
  },
  "/belge-yukleme": {
    title: `Belge Yükleme | ${SITE_NAME}`,
    description: "Belgelerinizi güvenle yükleyin.",
  },
  "/kullanim-sartlari": {
    title: `Kullanım Şartları | ${SITE_NAME}`,
    description: "Work365 kullanım şartları ve koşulları.",
  },
  "/gizlilik-politikasi": {
    title: `Gizlilik Politikası | ${SITE_NAME}`,
    description: "Gizlilik politikamız ve kişisel verilerinizin korunması.",
  },
  "/gizlilik-sozlesmesi": {
    title: `Gizlilik Sözleşmesi | ${SITE_NAME}`,
    description: "Piri Dijital A.Ş. ile gizlilik ve gizli bilgi koruma sözleşmesi.",
  },
  "/mesafeli-satis-sozlesmesi": {
    title: `Mesafeli Satış Sözleşmesi | ${SITE_NAME}`,
    description: "Piri Dijital A.Ş. mesafeli satış sözleşmesi ve ön bilgilendirme koşulları.",
  },
  "/cerez-politikasi": {
    title: `Çerez Politikası | ${SITE_NAME}`,
    description: "Çerez kullanımı ve tercihleriniz.",
  },
  "/veri-sahibi-basvuru-formu": {
    title: `Veri Sahibi Başvuru Formu | ${SITE_NAME}`,
    description: "KVKK kapsamında veri sahibi başvuru formu.",
  },
  "/iade-politikasi": {
    title: `İade Politikası | ${SITE_NAME}`,
    description: "İade ve iptal koşulları.",
  },
  "/login": {
    title: `Giriş Yap | ${SITE_NAME}`,
    description: "Work365 hesabınıza giriş yapın ve muhasebe, vergi ve kurumsal danışmanlık hizmetlerinizi yönetin.",
    noindex: true,
  },
  "/register": {
    title: `Kayıt Ol | ${SITE_NAME}`,
    description: "Work365'e kayıt olun, dijital muhasebe ve danışmanlık hizmetlerinden yararlanmaya başlayın.",
    noindex: true,
  },
  "/forgot-password": {
    title: `Şifremi Unuttum | ${SITE_NAME}`,
    description: "Work365 hesabınız için şifre sıfırlama bağlantısı talep edin.",
    noindex: true,
  },
  "/sifre-sifirla": {
    title: `Şifre Sıfırlama | ${SITE_NAME}`,
    description: "Work365 hesabınızın şifresini güvenle sıfırlayın.",
    noindex: true,
  },
  "/giris/iki-asamali-dogrulama": {
    title: `İki Aşamalı Doğrulama | ${SITE_NAME}`,
    description: "Work365 hesabınız için iki aşamalı doğrulama kodunu girin.",
    noindex: true,
  },
  "/auth/admin-login": {
    title: `Admin Girişi | ${SITE_NAME}`,
    description: "Yönetici girişi doğrulanıyor.",
    noindex: true,
  },
  "/auth/callback": {
    title: `Giriş Doğrulanıyor | ${SITE_NAME}`,
    description: "Üçüncü parti hesap ile giriş işleminiz doğrulanıyor.",
    noindex: true,
  },
  "/maintenance": {
    title: `Bakım Modu | ${SITE_NAME}`,
    description: "Work365 kısa süreli bakım modunda. Lütfen daha sonra tekrar deneyin.",
    noindex: true,
  },
  "/payment-result": {
    title: `Ödeme Sonucu | ${SITE_NAME}`,
    description: "Ödeme işleminizin sonucu hakkında bilgi alın.",
    noindex: true,
  },
  "/3ds-verify": {
    title: `3D Secure Doğrulama | ${SITE_NAME}`,
    description: "Ödeme işlemi için 3D Secure doğrulama ekranı.",
    noindex: true,
  },
  "/profil": {
    title: `Profilim | ${SITE_NAME}`,
    description: "Work365 profil bilgilerinizi ve ayarlarınızı yönetin.",
    noindex: true,
  },
  "/sepet": {
    title: `Sepetim | ${SITE_NAME}`,
    description: "Sepetinizdeki Work365 hizmetlerini görüntüleyin ve yönetin.",
    noindex: true,
  },
  "/odeme": {
    title: `Ödeme | ${SITE_NAME}`,
    description: "Work365 hizmetleriniz için güvenli ödeme adımını tamamlayın.",
    noindex: true,
  },
};

const exactPaths = Object.keys(routeMeta);

export function getMetaForPath(pathname) {
  const path = pathname?.replace(/\/$/, "") || "/";
  const exact = routeMeta[path];
  if (exact) return { ...seoDefaults, ...exact };

  if (path.startsWith("/blog/")) {
    return {
      ...seoDefaults,
      title: `Blog | ${SITE_NAME}`,
      description: seoDefaults.description,
    };
  }

  return seoDefaults;
}

export function getPublicPathsForSitemap() {
  return exactPaths.filter(
    (p) =>
      ![
        "/profil",
        "/profil/detay",
        "/sepet",
        "/odeme",
        "/belgelerim",
        "/bildirimler",
        "/siparis",
        "/guvenlik",
        "/auth",
        "/login",
        "/register",
        "/sifre-sifirla",
        "/forgot-password",
        "/maintenance",
        "/payment-result",
        "/3ds-verify",
      ].some((auth) => p.startsWith(auth))
  );
}

export function getBreadcrumbSchema(pathname, title) {
  const path = pathname?.replace(/\/$/, "") || "/";
  const segments = path.split("/").filter(Boolean);
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana Sayfa",
      item: BASE_URL || "/",
    },
  ];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const routeTitle = routeMeta[currentPath]?.title?.replace(` | ${SITE_NAME}`, "") || segment;
    breadcrumbs.push({
      "@type": "ListItem",
      position: index + 2,
      name: routeTitle,
      item: `${BASE_URL}${currentPath}`,
    });
  });

  if (title && title !== breadcrumbs[breadcrumbs.length - 1]?.name) {
    breadcrumbs[breadcrumbs.length - 1].name = title;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/araclar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
