import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type BuildMetadataInput = {
  /** Tam sayfa başlığı, örn. "Dijital Ofis | Work365" */
  title: string;
  description: string;
  /** Kök göreli yol, örn. "/digital-ofis" */
  path: string;
  /** OG görseli — verilmezse sitewide opengraph-image.tsx kullanılır */
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({ title, description, path, image, noIndex }: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "tr_TR",
      type: "website",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
