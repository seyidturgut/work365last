import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGoogle, FaLinkedin, FaEye, FaEyeSlash } from "react-icons/fa";
import { customerApi } from "../lib/api";
import { saveToken } from "../lib/auth";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refresh } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [linkedInLoading, setLinkedInLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const res = await customerApi.googleRedirect();
      const url = res?.url || res?.data?.url;
      if (url) {
        window.location.href = url;
        return;
      }
      throw new Error("Google yönlendirme URL'si alınamadı.");
    } catch (err) {
      setError(err?.message || "Google ile giriş başlatılamadı.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLinkedInLogin = async () => {
    setError("");
    setLinkedInLoading(true);
    try {
      const res = await customerApi.linkedinRedirect();
      const url = res?.url || res?.data?.url;
      if (url) {
        window.location.href = url;
        return;
      }
      throw new Error("LinkedIn yönlendirme URL'si alınamadı.");
    } catch (err) {
      setError(err?.message || "LinkedIn ile giriş başlatılamadı.");
    } finally {
      setLinkedInLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await customerApi.login({ email, password, device_name: "web" });
      const token = res?.token || res?.data?.token || res?.plainTextToken;
      if (token) {
        saveToken(token);
      }
      setSuccess(true);
      await refresh();

      const redirectTo = searchParams.get("redirect") || "/";
      setTimeout(() => navigate(redirectTo), 500);
    } catch (err) {
      const msg = err?.message || "Giriş yapılamadı";
      const data = err?.data || {};
      if (data.two_factor_required) {
        try {
          sessionStorage.setItem("pending_login", JSON.stringify({ email, password }));
        } catch { }
        navigate("/giris/iki-asamali-dogrulama");
        return;
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const marketingSlides = [
    {
      title: "İşinizi Work365 ile Sıfırdan Zirveye Taşıyın",
      description: "Şirket kuruluşundan büyüme stratejilerine kadar tüm süreçlerinizde yanınızdayız. Modern araçlarımızla operasyonel yükü sıfırlayın.",
    },
    {
      title: "Hızlı, Güvenilir ve Tamamen Dijital",
      description: "Evrak işleriyle vakit kaybetmeyin. Tüm başvurularınızı ve yönetim süreçlerinizi tek panelden, saniyeler içinde halledin.",
    },
    {
      title: "Geleceğin Şirket Yönetim Platformu",
      description: "E-dönüşüm, marka tescili ve sanal ofis desteğiyle şirketiniz her zaman bir adım önde olsun.",
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      <SEO />

      {/* Left Side: Decorative & Marketing */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F8FAFC] relative flex-col justify-between p-6 xl:p-10 overflow-hidden">
        {/* Background Subtle Shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        {/* Brand Logo */}
        <div className="relative z-10">
          <Link to="/">
            <img src="/Logo.png" alt="Work365" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Content Carousel */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-4"
          >
            <img
              src="/illustrations/auth_illustration.png"
              alt="Work365 Illustration"
              className="w-full h-auto max-h-[260px] object-contain mb-4 drop-shadow-2xl"
            />
            <h2 className="text-xl xl:text-2xl font-bold text-slate-900 mb-2 leading-tight">
              {marketingSlides[currentSlide].title}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {marketingSlides[currentSlide].description}
            </p>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {marketingSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-primary' : 'w-2 bg-slate-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Helper */}
        <div className="relative z-10 text-slate-400 text-sm italic">
          © {new Date().getFullYear()} Work365. Güvenle büyütün.
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <div className="p-6 flex justify-between items-center lg:justify-end gap-6 text-sm">
          <Link to="/" className="lg:hidden">
            <img src="/Logo.png" alt="Work365" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 hidden sm:inline">Sorun mu yaşıyorsunuz? <Link to="/iletisim" className="text-primary font-bold hover:underline">Yardım alın</Link></span>
            <div className="flex items-center gap-2 cursor-pointer group">
              <img src="https://flagcdn.com/w20/tr.png" alt="TR" className="w-5 h-auto rounded-sm" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Türkçe</span>
            </div>
          </div>
        </div>

        {/* Center Form Area */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 xl:p-8">
          <div className="w-full max-w-[420px]">
            {/* Tab Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-full mb-4 w-fit mx-auto sm:mx-0">
              <button
                className="px-8 py-2.5 rounded-full text-sm font-bold bg-primary text-white shadow-lg shadow-primary/20"
              >
                Giriş Yap
              </button>
              <Link
                to="/register"
                className="px-8 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-slate-700 transition-all"
              >
                Üye Ol
              </Link>
            </div>

            <div className="text-center sm:text-left mb-4">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-1 tracking-tight">Hoşgeldin</h1>
              <p className="text-slate-500 text-sm font-medium">Şirketinizin büyümesini Work365 ile takip edin.</p>
            </div>

            {/* Social Auth Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="flex items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 font-semibold text-slate-700 text-sm disabled:opacity-60"
              >
                <FaGoogle className="text-red-500" />
                Google
              </button>
              <button
                onClick={handleLinkedInLogin}
                disabled={linkedInLoading}
                className="flex items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 font-semibold text-slate-700 text-sm disabled:opacity-60"
              >
                <FaLinkedin className="text-blue-600" />
                LinkedIn
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
                <span className="px-4 bg-white">Veya E-posta ile</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  E-posta Adresi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e-posta@adresiniz.com"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:text-slate-300 text-base font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Şifre <span className="text-red-500">*</span>
                  </label>
                  <Link to="/forgot-password" className="text-xs font-bold text-primary hover:underline">
                    Şifrenizi mi unuttunuz?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifrenizi girin"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:text-slate-300 text-base font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember" className="ml-3 text-sm text-slate-500 font-bold">
                  Beni Hatırla
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-3 py-2 rounded-xl text-xs font-medium animate-shake">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary py-4 rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/25 hover:bg-primary-dark hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-60"
              >
                {loading ? "Giriş Yapılıyor..." : success ? "Başarılı!" : "Giriş Yap"}
              </button>
            </form>

            <div className="mt-8 text-center sm:text-left">
              <p className="text-slate-600 font-bold">
                Hesabınız yok mu? <Link to="/register" className="text-primary hover:underline">Üye Ol</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
