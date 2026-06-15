import catalogData from "../../db/catalog.json";

export type CatalogTerm = "monthly" | "yearly" | "once";

export type CatalogProduct = {
  sku: string;
  companyType: string;
  tier: string;
  term: CatalogTerm;
  title: string;
  subtitle: string;
  priceKurus: number;
  sort: number;
};

export const catalog: CatalogProduct[] = catalogData as CatalogProduct[];

const bySku = new Map(catalog.map((item) => [item.sku, item]));

export function getCatalogProduct(sku: string): CatalogProduct | null {
  return bySku.get(sku) ?? null;
}

export function getAllCatalogProducts(): CatalogProduct[] {
  return catalog;
}

/** company-types.tsx paket adı -> katalog tier anahtarı */
export function tierKeyFromPackageName(name: string): "baslangic" | "profesyonel" | "kurumsal" {
  if (name === "Şirketini Kur") return "baslangic";
  if (name === "Şirketini + Dijital Ofisini Kur") return "profesyonel";
  return "kurumsal";
}

/** Bir paket + term için satılabilir SKU; satılamazsa (Teklif tier) null */
export function skuFor(companySlug: string, packageName: string, term: "monthly" | "yearly"): string | null {
  const tier = tierKeyFromPackageName(packageName);
  if (tier === "kurumsal") return null;
  const sku = `${companySlug}-${tier}-${term}`;
  return bySku.has(sku) ? sku : null;
}

export function formatKurus(priceKurus: number): string {
  return `${new Intl.NumberFormat("tr-TR").format(Math.round(priceKurus / 100))} TL`;
}

/** PayTR payment_amount: kuruş (tam sayı string) */
export function kurusToPaytrAmount(priceKurus: number): string {
  return String(Math.round(priceKurus));
}

/** PayTR user_basket için birim fiyat: TL ondalıklı string ("5900.00") */
export function kurusToBasketPrice(priceKurus: number): string {
  return (priceKurus / 100).toFixed(2);
}
