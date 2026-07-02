import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBand from "@/components/TrustBand";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import WhyWork365 from "@/components/WhyWork365";
import Stats from "@/components/Stats";
import Rewards from "@/components/Rewards";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work365 | Şirketini Kur, Dijitalleş, İşini Büyüt",
  description:
    "Kurucular için hepsi bir arada iş platformu. Şahıs, Limited, Anonim veya Bilanço şirketini dijital olarak kur; Microsoft 365 dijital ofisini, web sitesi ve sosyal medyanı tek yerden yönet.",
  path: "/",
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustBand />
      <Features />
      <HowItWorks />
      <WhyWork365 />
      <Stats />
      <Rewards />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
