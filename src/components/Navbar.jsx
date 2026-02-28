import { Link, NavLink, useLocation } from "react-router-dom";
import Cart from "../components/Cart";
import NotificationBadge from "../components/NotificationBadge";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaChevronDown,
  FaBuilding,
  FaRocket,
  FaBook,
  FaEnvelope,
  FaInfoCircle,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaCalculator,
  FaUserCircle,
  FaShoppingBag,
  FaClock,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaSearch,
  FaRedo,
  FaFileAlt,
  FaHome,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useOnboarding } from "../hooks/useOnboarding";
import { customerApi } from "../lib/api";
import { useCampaigns } from "../hooks/useCampaigns";
import { getToken } from "../lib/auth";

const Logo = ({ white }) => (
  <div className="flex items-center gap-3">
    <img
      src={white ? "/Logo-white.png" : "/Logo.png"}
      alt="Work365"
      className="h-7 sm:h-8 w-auto hover:opacity-90 transition-opacity duration-300"
    />
  </div>
);

const servicesMenu = [
  {
    to: "/kurumsal-danismanlik",
    label: "Kurumsal Danışmanlık",
    icon: FaBuilding,
    description: "Büyük ölçekli şirketler için danışmanlık hizmetleri",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
  },
  {
    to: "/kobi-startup",
    label: "KOBİ & Start-up",
    icon: FaRocket,
    description: "Küçük ve orta ölçekli işletmeler için çözümler",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop"
  },
  {
    to: "/basvuru-takibi",
    label: "Başvuru Takibi",
    icon: FaSearch,
    description: "Başvurularınızı email ve kod ile takip edin",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
  }
];

const resourcesMenu = [
  {
    to: "/blog",
    label: "Blog",
    icon: FaBook,
    description: "Girişimciler için en faydalı bilgi kaynağı",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop"
  },
  {
    to: "/kutuphane",
    label: "Rehberler",
    icon: FaBook,
    description: "İşletmenizi güçlendirecek ücretsiz kaynaklar",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
  },
  {
    to: "/hakkimizda",
    label: "Hakkımızda",
    icon: FaInfoCircle,
    description: "Work365 ekibi ve vizyonumuz hakkında bilgi alın",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400&h=300&fit=crop"
  },
  {
    to: "/araclar",
    label: "Araçlar",
    icon: FaCalculator,
    description: "Girişimcilerin işini kolaylaştıracak hesaplama araçları",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  },
  {
    to: "/iletisim",
    label: "İletişim",
    icon: FaEnvelope,
    description: "Bizimle iletişime geçin, sorularınızı yanıtlayalım",
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=300&fit=crop"
  }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [externalLoginLoading, setExternalLoginLoading] = useState(false);
  const [externalLoginEnabled, setExternalLoginEnabled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const servicesRef = useRef(null);
  const resourcesRef = useRef(null);
  const userMenuRef = useRef(null);
  const { user, logout } = useAuth();
  const { restartTour } = useOnboarding(user);
  const { campaigns } = useCampaigns();
  const location = useLocation();
  const latestCampaign = campaigns && campaigns.length > 0 ? campaigns[0] : null;

  // Determine if we should use white text/logo
  // On Home, Kurumsal Danismanlik, Kobi Startup, etc., we want white header when NOT scrolled
  const isDarkHeroPage = ["/kurumsal-danismanlik", "/kobi-startup", "/hakkimizda", "/basvuru-takibi"].includes(location.pathname);
  const useWhiteHeader = !scrolled && isDarkHeroPage;

  const handleExternalLogin = async () => {
    if (externalLoginLoading || !externalLoginEnabled) return;
    const token = getToken();
    if (!token) {
      return;
    }
    setExternalLoginLoading(true);
    try {
      const res = await customerApi.externalLogin(token);
      if (res?.success) {
        const externalToken = res?.external_token || res?.data?.external_token;
        const redirectUrl = res?.redirect_url || res?.data?.redirect_url;
        if (redirectUrl) {
          let finalUrl = redirectUrl;
          if (externalToken) {
            const urlObj = new URL(redirectUrl);
            urlObj.searchParams.set("token", externalToken);
            finalUrl = urlObj.toString();
          }
          window.open(finalUrl, "_blank");
        }
      }
    } catch {
    }
    setExternalLoginLoading(false);
    setUserMenuOpen(false);
    setOpen(false);
  };

  useEffect(() => {
    const checkExternalLoginStatus = async () => {
      const token = getToken();
      if (!token) {
        setExternalLoginEnabled(false);
        return;
      }
      try {
        const res = await customerApi.getExternalLoginStatus(token);
        setExternalLoginEnabled(!!res?.can_access);
      } catch {
        setExternalLoginEnabled(false);
      }
    };
    if (user) {
      checkExternalLoginStatus();
    } else {
      setExternalLoginEnabled(false);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
      if (
        servicesOpen &&
        servicesRef.current &&
        !servicesRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
      if (
        resourcesOpen &&
        resourcesRef.current &&
        !resourcesRef.current.contains(event.target)
      ) {
        setResourcesOpen(false);
      }
    };

    if (open || servicesOpen || resourcesOpen || userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, servicesOpen, resourcesOpen, userMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      <nav
        className={`w-full transition-all duration-300 ${scrolled
          ? "bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-4"
          : "bg-transparent py-6 lg:py-8"
          }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 cursor-pointer" data-tour="logo">
            <Logo white={useWhiteHeader} />
          </Link>

          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center ml-16">
            <Link
              to="/"
              className={`flex items-center transition-colors py-2 text-xl ${useWhiteHeader ? "text-white hover:text-white/80" : "text-slate-700 hover:text-primary"}`}
              title="Ana Sayfa"
            >
              <FaHome />
            </Link>

            {/* Hizmetler Dropdown */}
            <div className="relative" ref={servicesRef} data-tour="services">
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className={`flex items-center gap-1 font-medium text-sm transition-colors py-2 ${useWhiteHeader ? "text-white hover:text-white/80" : "text-slate-700 hover:text-primary"}`}
              >
                Hizmetler
                <FaChevronDown className={`text-xs transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="fixed inset-x-0 top-[76px] z-50 px-4"
                  >
                    <div className="w-full min-h-[50vh] max-h-[80vh] bg-white rounded-b-[32px] shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="flex h-full overflow-y-auto">
                        {/* Sol taraf - Resimler */}
                        <div className="w-1/4 bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col gap-4">
                          {servicesMenu.map((item, index) => (
                            <div
                              key={item.to}
                              className="relative rounded-xl overflow-hidden group/image"
                            >
                              <img
                                src={item.image}
                                alt={item.label}
                                className="w-full h-24 object-cover group-hover/image:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                              <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-white text-xs font-semibold drop-shadow-lg">
                                  {item.label}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Orta - Menü öğeleri */}
                        <div className="flex-1 p-6">
                          <div className="space-y-3">
                            {servicesMenu.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.to}
                                  to={item.to}
                                  onClick={() => setServicesOpen(false)}
                                  className="group block p-4 rounded-2xl border border-gray-100 hover:border-primary/30 hover:bg-gray-50 transition-all"
                                >
                                  <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                      <Icon className="text-primary text-xl" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                                        {item.label}
                                      </p>
                                      <p className="text-sm text-gray-600 leading-relaxed">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Sağ taraf - Ek bilgiler */}
                        <div className="w-80 bg-gray-50 p-6 flex flex-col gap-4">
                          <Link
                            to="/iletisim"
                            onClick={() => setServicesOpen(false)}
                            className="block p-5 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all"
                          >
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">Destek</p>
                            <p className="text-lg font-semibold text-gray-900 mb-2">Destek Merkezi</p>
                            <p className="text-sm text-gray-600 mb-3">SSS, formlar ve canlı destek kanallarına buradan ulaşın.</p>
                            <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm">
                              Destek Sayfası
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </span>
                          </Link>

                          {/* Dynamic Campaign Display */}
                          {latestCampaign && (
                            <div className="p-5 bg-gradient-to-br from-primary to-primary-dark rounded-2xl text-white shadow-lg relative overflow-hidden group">
                              {latestCampaign.banner_url && (
                                <>
                                  <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundImage: `url(${latestCampaign.banner_url})` }}></div>
                                  <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95"></div>
                                </>
                              )}
                              <div className="relative z-10">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-2">Fırsat</p>
                                <p className="text-lg font-semibold mb-2 line-clamp-2">{latestCampaign.title}</p>
                                <p className="text-sm text-white/80 mb-4 line-clamp-2">{latestCampaign.description}</p>
                                <Link to="/fiyatlar" onClick={() => setServicesOpen(false)} className="inline-flex items-center gap-1 text-sm font-semibold bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                  Fiyatları Gör
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </Link>
                              </div>
                            </div>
                          )}

                          <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <p className="text-xs font-semibold text-gray-700 mb-3 text-center">Takipte Kalın</p>
                            <div className="flex justify-center gap-3">
                              <a href="https://www.instagram.com/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                                <FaInstagram className="text-lg" />
                              </a>
                              <a href="https://twitter.com/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                                <FaTwitter className="text-lg" />
                              </a>
                              <a href="https://www.linkedin.com/company/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                                <FaLinkedin className="text-lg" />
                              </a>
                              <a href="https://www.facebook.com/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                                <FaFacebook className="text-lg" />
                              </a>
                              <a href="https://www.youtube.com/@piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                                <FaYoutube className="text-lg" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fiyatlar */}
            <NavLink
              to="/fiyatlar"
              className={({ isActive }) =>
                `font-medium text-sm transition-colors py-2 whitespace-nowrap ${useWhiteHeader
                  ? (isActive ? "text-white border-b-2 border-white" : "text-white hover:text-white/80")
                  : (isActive ? "text-primary border-b-2 border-primary" : "text-slate-700 hover:text-primary")
                }`
              }
              data-tour="pricing"
            >
              Fiyatlar
            </NavLink>

            {/* Kaynaklar Dropdown */}
            <div className="relative" ref={resourcesRef} data-tour="resources">
              <button
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
                className={`flex items-center gap-1 font-medium text-sm transition-colors py-2 ${useWhiteHeader ? "text-white hover:text-white/80" : "text-slate-700 hover:text-primary"}`}
              >
                Kaynaklar
                <FaChevronDown className={`text-xs transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setResourcesOpen(true)}
                    onMouseLeave={() => setResourcesOpen(false)}
                    className="fixed inset-x-0 top-[76px] z-50 px-4"
                  >
                    <div className="w-full min-h-[50vh] max-h-[80vh] bg-white rounded-b-[32px] shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="container mx-auto px-6 py-8 h-full overflow-y-auto flex gap-8">
                        <div className="flex-1 grid md:grid-cols-3 gap-6">
                          {resourcesMenu.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={() => setResourcesOpen(false)}
                              className="group rounded-2xl border border-gray-100 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
                            >
                              <div className="relative h-36 overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.label}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-2 left-3 right-3">
                                  <p className="text-white font-semibold text-lg drop-shadow">{item.label}</p>
                                </div>
                              </div>
                              <div className="p-4">
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="w-80 flex-shrink-0 bg-gray-50 p-6 flex flex-col gap-4">
                          <Link
                            to="/iletisim"
                            onClick={() => setResourcesOpen(false)}
                            className="block p-5 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all"
                          >
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">Destek</p>
                            <p className="text-lg font-semibold text-gray-900 mb-2">Destek Merkezi</p>
                            <p className="text-sm text-gray-600 mb-3">SSS, rehberler ve canlı destek kanallarına buradan ulaşın.</p>
                            <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm">
                              Destek Sayfası
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </span>
                          </Link>

                          <Link
                            to="/kutuphane"
                            onClick={() => setResourcesOpen(false)}
                            className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all"
                          >
                            <p className="text-sm font-semibold text-gray-900 mb-3">En Çok İndirilen Rehber</p>
                            <hr className="mb-3 border-gray-200" />
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-primary-light/10 rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop"
                                  alt="Rehber"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 mb-1">Şirket Türlerine Göre Vergi Oranları Rehberi</p>
                                <p className="text-xs text-gray-600">Sizin için hazırladığımız rehberi şimdi inceleyin.</p>
                              </div>
                            </div>
                          </Link>

                          <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <p className="text-xs font-semibold text-gray-700 mb-3 text-center">Takipte Kalın</p>
                            <div className="flex justify-center gap-3">
                              <a href="https://www.instagram.com/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                                <FaInstagram className="text-lg" />
                              </a>
                              <a href="https://twitter.com/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                                <FaTwitter className="text-lg" />
                              </a>
                              <a href="https://www.linkedin.com/company/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                                <FaLinkedin className="text-lg" />
                              </a>
                              <a href="https://www.facebook.com/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                                <FaFacebook className="text-lg" />
                              </a>
                              <a href="https://www.youtube.com/@piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                                <FaYoutube className="text-lg" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Kütüphane */}
            <NavLink
              to="/kutuphane"
              className={({ isActive }) =>
                `font-medium text-sm transition-colors py-2 whitespace-nowrap ${useWhiteHeader
                  ? (isActive ? "text-white border-b-2 border-white" : "text-white hover:text-white/80")
                  : (isActive ? "text-primary border-b-2 border-primary" : "text-slate-700 hover:text-primary")
                }`
              }
              data-tour="library"
            >
              Kütüphane
            </NavLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <NotificationBadge white={useWhiteHeader} />
            <Cart white={useWhiteHeader} />
            <button
              ref={buttonRef}
              className={`p-1 rounded-lg transition-colors ${useWhiteHeader ? "text-white hover:bg-white/10" : "text-primary hover:bg-primary/10"}`}
              onClick={() => setOpen(!open)}
              aria-label="Menüyü Aç"
            >
              {open ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-5 pl-8">
            <div data-tour="cart"><Cart white={useWhiteHeader} /></div>
            {user ? (
              <div className="flex items-center gap-3" ref={userMenuRef}>
                <div data-tour="notifications"><NotificationBadge white={useWhiteHeader} /></div>
                <div className="relative" data-tour="profile-menu">
                  <button
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${useWhiteHeader ? "text-white hover:bg-white/10" : "hover:bg-secondary"}`}
                  >
                    <FaUser className={useWhiteHeader ? "text-white" : "text-primary"} />
                    <span className={`font-medium text-sm ${useWhiteHeader ? "text-white" : "text-slate-700"}`}>
                      {user?.name || "Hesabım"}
                    </span>
                    <FaChevronDown
                      className={`text-xs transition-transform ${userMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                      >
                        <Link
                          to="/profil"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary"
                          data-tour="profile-link"
                        >
                          <FaUserCircle className="text-primary" />
                          <span>Profilim</span>
                        </Link>
                        <Link
                          to="/profil/detay?tab=orders"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary"
                          data-tour="orders"
                        >
                          <FaShoppingBag className="text-primary" />
                          <span>Siparişlerim</span>
                        </Link>
                        <Link
                          to="/profil/detay?tab=pending"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary"
                          data-tour="pending"
                        >
                          <FaClock className="text-primary" />
                          <span>Yarım Kalan Başvurular</span>
                        </Link>
                        <Link
                          to="/profil/detay?tab=accountant-tasks"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary"
                        >
                          <FaCalculator className="text-primary" />
                          <span>Muhasebe Görevleri</span>
                        </Link>
                        <Link
                          to="/profil/detay?tab=declarations"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary"
                        >
                          <FaFileAlt className="text-primary" />
                          <span>Beyannameler</span>
                        </Link>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            restartTour();
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary flex items-center gap-2"
                        >
                          <FaRedo className="text-primary" />
                          <span>Turu Tekrar İzle</span>
                        </button>
                        <button
                          onClick={handleExternalLogin}
                          disabled={externalLoginLoading || !externalLoginEnabled}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary flex items-center justify-between gap-2 ${externalLoginLoading || !externalLoginEnabled
                            ? "opacity-60 cursor-not-allowed text-gray-400"
                            : "text-gray-700"
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            <FaExternalLinkAlt className="text-primary" />
                            <span>Ön Muhasebe Paneline Git</span>
                          </span>
                          {externalLoginLoading && <span className="text-xs">Yönlendiriliyor...</span>}
                        </button>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-secondary flex items-center gap-2"
                        >
                          <FaSignOutAlt />
                          <span>Çıkış</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className={`px-5 py-2.5 font-semibold rounded-xl border transition-all duration-300 ${useWhiteHeader
                    ? "text-white border-white/40 hover:border-white hover:bg-white/10"
                    : "text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-[#65A30D] text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(101,163,13,0.25)] hover:shadow-[0_8px_18px_rgba(101,163,13,0.35)] transform hover:-translate-y-0.5"
                >
                  Üye Ol
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed top-[72px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
                {/* Ana Sayfa Mobile */}
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? "text-primary bg-secondary" : ""
                    }`
                  }
                >
                  <FaHome className="text-xl text-primary" />
                  Ana Sayfa
                </NavLink>

                {/* Hizmetler Mobile */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center justify-between text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    <span>Hizmetler</span>
                    <FaChevronDown className={`text-xs transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pt-2 space-y-2">
                          {servicesMenu.map((item) => {
                            const Icon = item.icon;
                            return (
                              <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => {
                                  setOpen(false);
                                  setServicesOpen(false);
                                }}
                                className={({ isActive }) =>
                                  `flex items-center gap-3 text-left text-text hover:bg-secondary px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? "text-primary bg-secondary" : ""
                                  }`
                                }
                              >
                                <Icon className="text-primary" />
                                {item.label}
                              </NavLink>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fiyatlar Mobile */}
                <NavLink
                  to="/fiyatlar"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? "text-primary bg-secondary" : ""
                    }`
                  }
                >
                  Fiyatlar
                </NavLink>

                {/* Kaynaklar Mobile */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setResourcesOpen(!resourcesOpen)}
                    className="flex items-center justify-between text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    <span>Kaynaklar</span>
                    <FaChevronDown className={`text-xs transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {resourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pt-2 space-y-2">
                          {resourcesMenu.map((item) => {
                            const Icon = item.icon;
                            return (
                              <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => {
                                  setOpen(false);
                                  setResourcesOpen(false);
                                }}
                                className={({ isActive }) =>
                                  `flex items-center gap-3 text-left text-text hover:bg-secondary px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? "text-primary bg-secondary" : ""
                                  }`
                                }
                              >
                                <Icon className="text-primary" />
                                {item.label}
                              </NavLink>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Kütüphane Mobile */}
                <NavLink
                  to="/kutuphane"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? "text-primary bg-secondary" : ""
                    }`
                  }
                >
                  Kütüphane
                </NavLink>
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
                  {user ? (
                    <>
                      <Link
                        to="/profil"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors"
                      >
                        <FaUser className="text-primary" /> {user?.name || "Profil"}
                      </Link>
                      <Link
                        to="/profil/detay?tab=orders"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors"
                      >
                        <FaShoppingBag className="text-primary" /> Siparişlerim
                      </Link>
                      <Link
                        to="/profil/detay?tab=pending"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors"
                      >
                        <FaClock className="text-primary" /> Yarım Kalan Başvurular
                      </Link>
                      <Link
                        to="/profil/detay?tab=accountant-tasks"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors"
                      >
                        <FaCalculator className="text-primary" /> Muhasebe Görevleri
                      </Link>
                      <Link
                        to="/profil/detay?tab=declarations"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors"
                      >
                        <FaFileAlt className="text-primary" /> Beyannameler
                      </Link>
                      <button
                        onClick={handleExternalLogin}
                        disabled={externalLoginLoading || !externalLoginEnabled}
                        className={`flex items-center gap-3 w-full text-left text-text hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors ${externalLoginLoading || !externalLoginEnabled
                          ? "opacity-60 cursor-not-allowed text-gray-400"
                          : ""
                          }`}
                      >
                        <div className="flex items-center justify-between flex-1">
                          <span className="flex items-center gap-3">
                            <FaExternalLinkAlt className="text-primary" />
                            <span>Ön Muhasebe Paneline Git</span>
                          </span>
                          {externalLoginLoading && <span className="text-xs">Yönlendiriliyor...</span>}
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-3 text-left text-red-600 hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors"
                      >
                        <FaSignOutAlt />
                        Çıkış
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="px-5 py-3 text-primary hover:text-primary-dark font-semibold rounded-xl border-2 border-primary/20 hover:border-primary/30 transition-all duration-300 hover:bg-primary/5 text-center"
                      >
                        Giriş Yap
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setOpen(false)}
                        className="px-5 py-3 bg-[#65A30D] text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(101,163,13,0.25)] hover:shadow-[0_8px_18px_rgba(101,163,13,0.35)] text-center"
                      >
                        Üye Ol
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
