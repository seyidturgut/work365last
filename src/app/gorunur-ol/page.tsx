import type { Metadata } from "next";
import GorunurOlContent from "@/components/GorunurOlContent";

export const metadata: Metadata = {
  title: "Görünür Ol | Work365",
  description:
    "Markayı tanıt, müşterine ulaş. Web sitesi ve sosyal medya yönetimiyle markanı dijitalde büyüt.",
};

export default function GorunurOlPage() {
  return <GorunurOlContent />;
}
