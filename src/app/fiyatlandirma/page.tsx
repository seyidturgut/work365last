import type { Metadata } from "next";
import FiyatlandirmaContent from "./FiyatlandirmaContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Fiyatlandırma | Work365",
  description:
    "Şirket kuruluşu, dijital ofis, sosyal medya ve web sitesi paketlerinin tüm fiyatları tek sayfada. Şeffaf, KDV hariç fiyatlandırma.",
  path: "/fiyatlandirma",
});

export default function FiyatlandirmaPage() {
  return <FiyatlandirmaContent />;
}
