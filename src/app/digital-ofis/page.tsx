import type { Metadata } from "next";
import DijitalOfisContent from "@/components/DijitalOfisContent";

export const metadata: Metadata = {
  title: "Dijital Ofis | Work365",
  description:
    "IT departmanın biz olalım, sen işine odaklan. Microsoft 365, kurumsal e-posta, Teams, OneDrive ve help desk tek pakette.",
};

export default function DijitalOfisPage() {
  return <DijitalOfisContent />;
}
