import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import { CartProvider } from "../context/CartContext";
import TourGuide from "../components/TourGuide";
import OnboardingModal from "../components/onboarding/OnboardingModal";

const MainLayout = () => (
  <CartProvider>
    <SEO />
    <ScrollToTop />
    <TourGuide />
    <OnboardingModal />
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  </CartProvider>
);
export default MainLayout;
