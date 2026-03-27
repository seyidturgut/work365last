import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JourneyCards from "@/components/JourneyCards";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import WhyWork365 from "@/components/WhyWork365";
import Stats from "@/components/Stats";
import Rewards from "@/components/Rewards";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <JourneyCards />
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

