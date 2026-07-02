import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog-data";

const COMPANY_SLUGS = ["sahis-sirketi", "limited-sirketi", "anonim-sirketi", "bilanco-sirketi"];

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/fiyatlandirma", priority: 0.9, changeFrequency: "weekly" },
  { path: "/sirketini-kur", priority: 0.8, changeFrequency: "monthly" },
  { path: "/digital-ofis", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gorunur-ol", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gorunur-ol/web-sitesi", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gorunur-ol/sosyal-medya", priority: 0.7, changeFrequency: "monthly" },
  { path: "/buyut", priority: 0.6, changeFrequency: "monthly" },
  { path: "/karsilastir", priority: 0.6, changeFrequency: "monthly" },
  { path: "/iletisim", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/hizmet-sartlari/para-iade-kosullari", priority: 0.3, changeFrequency: "yearly" },
  { path: "/sozlesmeler/mesafeli-satis", priority: 0.3, changeFrequency: "yearly" },
  { path: "/sozlesmeler/on-bilgilendirme", priority: 0.3, changeFrequency: "yearly" },
];

function parseBlogDate(value: string, fallback: Date): Date {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const companyEntries: MetadataRoute.Sitemap = COMPANY_SLUGS.map((slug) => ({
    url: `${SITE_URL}/sirketini-kur/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: parseBlogDate(post.date, now),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...companyEntries, ...blogEntries];
}
