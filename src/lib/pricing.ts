export type SelectedPackageSummary = {
  company: string;
  priceLabel: string;
  detailLabel: string;
  description: string | null;
  features: string[];
};

type PackageSignupOptions = {
  label?: string;
  source?: string;
  term?: string;
  description?: string;
  features?: readonly string[];
};

function encodeFeatures(features?: readonly string[]) {
  if (!features || features.length === 0) {
    return null;
  }

  return JSON.stringify(features);
}

function decodeFeatures(features?: string | null) {
  if (!features) {
    return [];
  }

  try {
    const parsed = JSON.parse(features) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function formatTl(value: number) {
  return `${new Intl.NumberFormat("tr-TR").format(value)} TL`;
}

export function toCompanyQueryValue(company: string) {
  return company
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toCompanyLabel(queryValue?: string | null) {
  if (!queryValue) {
    return null;
  }

  const normalized = queryValue.trim().toLocaleLowerCase("tr-TR");

  switch (normalized) {
    case "sahis-sirketi":
      return "Şahıs Şirketi";
    case "limited-sirketi":
      return "Limited Şirketi";
    case "anonim-sirketi":
      return "Anonim Şirketi";
    case "bilanco-sirketi":
      return "Bilanço Şirketi";
    case "e-imza-1-yil":
      return "e-İmza 1 Yıl";
    case "e-imza-3-yil":
      return "e-İmza 3 Yıl";
    case "kep-0-kontor":
      return "KEP 0 Kontör";
    case "kep-20-kontor":
      return "KEP 20 Kontör";
    case "kep-50-kontor":
      return "KEP 50 Kontör";
    case "kep-100-kontor":
      return "KEP 100 Kontör";
    case "kep-250-1000-kontor":
      return "KEP 250–1000 Kontör";
    case "e-imza-kep-baslangic":
      return "e-İmza + KEP Başlangıç";
    case "e-imza-kep-standart":
      return "e-İmza + KEP Standart";
    case "m365-0-10-kullanici":
      return "M365 0–10 Kullanıcı";
    case "m365-10-50-kullanici":
      return "M365 10–50 Kullanıcı";
    case "m365-50-299-kullanici":
      return "M365 50–299 Kullanıcı";
    case "m365-300-kullanici":
      return "M365 300+ Kullanıcı";
    case "fikir-asamasi":
      return "Fikir Aşaması";
    case "mvp-gelistirme":
      return "MVP Geliştirme";
    case "piyasaya-suruldu":
      return "Piyasaya Sürüldü";
    case "kurumsal":
      return "Kurumsal";
    default:
      return null;
  }
}

export function getSelectedPackageSummary(
  company?: string | null,
  price?: string | null,
  label?: string | null,
  source?: string | null,
  term?: string | null,
  description?: string | null,
  features?: string | null
): SelectedPackageSummary | null {
  const companyLabel = label?.trim() || toCompanyLabel(company);
  const numericPrice = Number(price);

  if (!companyLabel || !Number.isFinite(numericPrice) || numericPrice <= 0) {
    return null;
  }

  const parts = [term?.trim(), source?.trim()].filter(Boolean);

  return {
    company: companyLabel,
    priceLabel: formatTl(numericPrice),
    detailLabel: parts.length > 0 ? parts.join(" · ") : "Seçilen paket",
    description: description?.trim() || null,
    features: decodeFeatures(features),
  };
}

export function parseTlString(value: string) {
  const numericValue = Number(value.replace(/[^\d]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function calculateSavingsPercent(monthlyValue: string | number, yearlyValue: string | number) {
  const monthly = typeof monthlyValue === "number" ? monthlyValue : parseTlString(monthlyValue);
  const yearly = typeof yearlyValue === "number" ? yearlyValue : parseTlString(yearlyValue);

  if (!Number.isFinite(monthly) || !Number.isFinite(yearly) || monthly <= 0 || yearly <= 0 || yearly >= monthly) {
    return 0;
  }

  return Math.round(((monthly - yearly) / monthly) * 100);
}

export function buildPackageSignupHref(
  company: string,
  price: number | string,
  options: PackageSignupOptions = {}
) {
  const numericPrice = typeof price === "number" ? price : parseTlString(price);
  const query = new URLSearchParams({
    company: toCompanyQueryValue(company),
    price: String(numericPrice),
  });

  if (options.label) {
    query.set("label", options.label);
  }

  if (options.source) {
    query.set("source", options.source);
  }

  if (options.term) {
    query.set("term", options.term);
  }

  if (options.description) {
    query.set("description", options.description);
  }

  const features = encodeFeatures(options.features);
  if (features) {
    query.set("features", features);
  }

  return `/kayit-ol?${query.toString()}`;
}
