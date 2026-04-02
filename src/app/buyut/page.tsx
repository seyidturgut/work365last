import type { Metadata } from "next";
import BuyutContent from "@/components/BuyutContent";

export const metadata: Metadata = {
  title: "İşini Büyüt | Work365",
  description:
    "Tam zamanlı çalışan almadan, uzman desteğiyle şirketini güçlendir. Teşvik, hibe, yatırımcı erişimi ve uzman kiralama.",
};

export default function IsIniBuyutPage() {
  return <BuyutContent />;
}
