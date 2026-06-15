"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ChevronRight,
  Globe,
  Landmark,
  Layers,
  Menu,
  Monitor,
  Megaphone,
  Share2,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const companyItems = [
  {
    href: "/sirketini-kur/sahis-sirketi",
    label: "Şahıs Şirketi",
    description: "Hızlı başlangıç ve düşük operasyon yükü",
    icon: UserRound,
  },
  {
    href: "/sirketini-kur/limited-sirketi",
    label: "Limited Şirketi",
    description: "Dengeli büyüme ve ortaklı kullanım",
    icon: Building2,
  },
  {
    href: "/sirketini-kur/anonim-sirketi",
    label: "Anonim Şirketi",
    description: "Kurumsal yapı ve yatırım odaklı kullanım",
    icon: Landmark,
  },
  {
    href: "/sirketini-kur/bilanco-sirketi",
    label: "Bilanço Şirketi",
    description: "Yoğun operasyon ve kayıt disiplini",
    icon: BriefcaseBusiness,
  },
] as const;

const gorunurOlItems = [
  {
    href: "/gorunur-ol/web-sitesi",
    label: "Web Sitesi",
    description: "Kurumsal web sitesi tasarım ve bakımı",
    icon: Monitor,
  },
  {
    href: "/gorunur-ol/sosyal-medya",
    label: "Sosyal Medya",
    description: "İçerik üretimi ve marka yönetimi",
    icon: Share2,
  },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const [isGorunurOlMenuOpen, setIsGorunurOlMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const [isMobileGorunurOlOpen, setIsMobileGorunurOlOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { user: unknown }) => {
        if (active) setLoggedIn(Boolean(d.user));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    setIsCompanyMenuOpen(false);
    setIsGorunurOlMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileCompanyOpen(false);
    setIsMobileGorunurOlOpen(false);
  }, [pathname]);

  const isCompanyPage = useMemo(
    () => companyItems.some((item) => pathname?.startsWith(item.href)),
    [pathname]
  );

  const isGorunurOlPage = useMemo(
    () => gorunurOlItems.some((item) => pathname?.startsWith(item.href)) || pathname?.startsWith("/gorunur-ol"),
    [pathname]
  );

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 bg-white py-3 ${isScrolled ? "shadow-sm" : ""}`}
    >
      <div className="mx-auto flex max-w-[1230px] items-center justify-between gap-6 px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" className="flex shrink-0 items-center">
            <img src="/LOGO-END.svg" alt="Work365 Logo" className="h-8 w-auto" />
          </Link>

          <nav className="hidden items-center space-x-7 text-[14px] font-semibold text-Work365-text xl:flex">
            {/* Şirketini Kur dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCompanyMenuOpen(true)}
              onMouseLeave={() => setIsCompanyMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCompanyMenuOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 whitespace-nowrap tracking-[-0.01em] transition-opacity hover:opacity-70 ${
                  isCompanyPage ? "text-black" : ""
                }`}
              >
                <span>Şirketini Kur</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isCompanyMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute left-0 top-full pt-4 transition-all duration-200 ${
                  isCompanyMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="w-[360px] rounded-[28px] bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-black/6">
                  {companyItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-start gap-3 rounded-[18px] px-3 py-3 transition-colors ${
                          active ? "bg-[#F7FAFF]" : "hover:bg-[#F7FAFF]"
                        }`}
                      >
                        <div className="mt-0.5 rounded-[16px] bg-[#FEF3C7] p-2.5 text-[#D97706]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-black">{item.label}</p>
                          <p className="mt-1 text-[12px] leading-5 text-black/58">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="mt-1 border-t border-black/5 pt-2">
                    <Link
                      href="/sirketini-kur"
                      className="flex items-center gap-2 rounded-[18px] px-3 py-2.5 text-[13px] font-semibold text-[#1b98d5] hover:bg-[#F0F7FF] transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                      Hangisini seçmeliyim? Rehber
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dijital Ofis — tek link */}
            <Link
              href="/digital-ofis"
              className={`whitespace-nowrap tracking-[-0.01em] transition-opacity hover:opacity-70 ${
                pathname === "/digital-ofis" ? "text-black" : ""
              }`}
            >
              Dijital Ofis
            </Link>

            {/* Görünür Ol dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsGorunurOlMenuOpen(true)}
              onMouseLeave={() => setIsGorunurOlMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsGorunurOlMenuOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 whitespace-nowrap tracking-[-0.01em] transition-opacity hover:opacity-70 ${
                  isGorunurOlPage ? "text-black" : ""
                }`}
              >
                <span>Görünür Ol</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isGorunurOlMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute left-0 top-full pt-4 transition-all duration-200 ${
                  isGorunurOlMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="w-[320px] rounded-[28px] bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-black/6">
                  {gorunurOlItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-start gap-3 rounded-[18px] px-3 py-3 transition-colors ${
                          active ? "bg-[#F7FAFF]" : "hover:bg-[#F7FAFF]"
                        }`}
                      >
                        <div className="mt-0.5 rounded-[16px] bg-[#DBEAFE] p-2.5 text-[#1b98d5]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-black">{item.label}</p>
                          <p className="mt-1 text-[12px] leading-5 text-black/58">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                  {/* Roadmap item */}
                  <div className="flex items-start gap-3 rounded-[18px] px-3 py-3 opacity-50 cursor-not-allowed">
                    <div className="mt-0.5 rounded-[16px] bg-[#F4F4F5] p-2.5 text-black/40">
                      <Megaphone className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[15px] font-bold text-black">Reklam Yönetimi</p>
                        <span className="rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[10px] font-bold text-black/50">Yakında</span>
                      </div>
                      <p className="mt-1 text-[12px] leading-5 text-black/40">Dijital reklam kampanya yönetimi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* İşini Büyüt — tek link */}
            <Link
              href="/buyut"
              className={`whitespace-nowrap tracking-[-0.01em] transition-opacity hover:opacity-70 ${
                pathname === "/buyut" ? "text-black" : ""
              }`}
            >
              İşini Büyüt
            </Link>

            {/* Fiyatlandırma */}
            <Link
              href="/fiyatlandirma"
              className={`whitespace-nowrap tracking-[-0.01em] transition-opacity hover:opacity-70 ${
                pathname === "/fiyatlandirma" ? "text-black" : ""
              }`}
            >
              Fiyatlandırma
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href={loggedIn ? "/hesabim" : "/giris"}
            className="whitespace-nowrap text-[13px] font-semibold text-Work365-text transition-opacity hover:opacity-70"
          >
            {loggedIn ? "Hesabım" : "Giriş"}
          </Link>
          <Link
            href="/sirketini-kur"
            className="whitespace-nowrap rounded-full bg-[#1b98d5] px-5 py-3 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#1580b3]"
          >
            Hemen Başla →
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="shrink-0 p-2 xl:hidden"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-black/5 bg-white xl:hidden">
          <div className="mx-auto max-w-[1230px] px-6 py-4">
            <div className="space-y-2">
              {/* Şirketini Kur mobile */}
              <button
                type="button"
                onClick={() => setIsMobileCompanyOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-[18px] bg-[#F7F9FC] px-4 py-3 text-left text-[14px] font-bold text-black"
              >
                <span className="flex items-center gap-3">
                  <BriefcaseBusiness className="h-5 w-5" />
                  Şirketini Kur
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isMobileCompanyOpen ? "rotate-180" : ""}`} />
              </button>

              {isMobileCompanyOpen ? (
                <div className="space-y-2 rounded-[20px] bg-[#FAFBFD] p-2">
                  {companyItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-[16px] px-3 py-3 transition-colors hover:bg-white"
                      >
                        <div className="rounded-xl bg-white p-2.5 ring-1 ring-black/5">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-black">{item.label}</p>
                          <p className="mt-1 text-[12px] leading-5 text-black/58">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                  <Link
                    href="/sirketini-kur"
                    className="flex items-center gap-2 rounded-[16px] px-3 py-2.5 text-[13px] font-semibold text-[#1b98d5] hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Hangisini seçmeliyim? Rehber
                  </Link>
                </div>
              ) : null}

              {/* Dijital Ofis mobile */}
              <Link
                href="/digital-ofis"
                className="flex items-center justify-between rounded-[18px] bg-[#F7F9FC] px-4 py-3 text-[14px] font-bold text-black"
              >
                <span className="flex items-center gap-3">
                  <Monitor className="h-5 w-5" />
                  Dijital Ofis
                </span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              {/* Görünür Ol mobile */}
              <button
                type="button"
                onClick={() => setIsMobileGorunurOlOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-[18px] bg-[#F7F9FC] px-4 py-3 text-left text-[14px] font-bold text-black"
              >
                <span className="flex items-center gap-3">
                  <Share2 className="h-5 w-5" />
                  Görünür Ol
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isMobileGorunurOlOpen ? "rotate-180" : ""}`} />
              </button>

              {isMobileGorunurOlOpen ? (
                <div className="space-y-2 rounded-[20px] bg-[#FAFBFD] p-2">
                  {gorunurOlItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-[16px] px-3 py-3 transition-colors hover:bg-white"
                      >
                        <div className="rounded-xl bg-white p-2.5 ring-1 ring-black/5">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-black">{item.label}</p>
                          <p className="mt-1 text-[12px] leading-5 text-black/58">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="flex items-start gap-3 rounded-[16px] px-3 py-3 opacity-50">
                    <div className="rounded-xl bg-white p-2.5 ring-1 ring-black/5">
                      <Megaphone className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-bold text-black">Reklam Yönetimi</p>
                        <span className="rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[10px] font-bold text-black/50">Yakında</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* İşini Büyüt mobile */}
              <Link
                href="/buyut"
                className="flex items-center justify-between rounded-[18px] bg-[#F7F9FC] px-4 py-3 text-[14px] font-bold text-black"
              >
                <span className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5" />
                  İşini Büyüt
                </span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              {/* Fiyatlandırma mobile */}
              <Link
                href="/fiyatlandirma"
                className="flex items-center justify-between rounded-[18px] bg-[#F7F9FC] px-4 py-3 text-[14px] font-bold text-black"
              >
                Fiyatlandırma
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-4 flex gap-3">
              <Link
                href={loggedIn ? "/hesabim" : "/giris"}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-black/10 px-5 py-3 text-[13px] font-bold text-black"
              >
                {loggedIn ? "Hesabım" : "Giriş"}
              </Link>
              <Link
                href="/sirketini-kur"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#1b98d5] px-5 py-3 text-[13px] font-bold text-white"
              >
                Hemen Başla →
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
