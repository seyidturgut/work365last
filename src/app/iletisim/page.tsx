import type { Metadata } from "next";
import IletisimContent from "@/components/IletisimContent";

export const metadata: Metadata = {
  title: "İletişim | Work365",
  description:
    "Work365 satış ekibiyle iletişime geçin. Şirket kuruluşu, dijital altyapı veya ekosistem modülleri hakkında size özel bir görüşme planlayalım.",
};

export default function IletisimPage() {
  return <IletisimContent />;
}
