import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { customerApi } from "../lib/api";
import SEO from "../components/SEO";

export default function ResetPassword() {
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const initialEmail = sp.get("email") || "";
  const token = sp.get("token") || "";
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setErr("");
    if (!token) { setErr("Geçersiz veya eksik token."); return; }
    if (password !== password2) { setErr("Şifreler uyuşmuyor."); return; }
    setLoading(true);
    try {
      await customerApi.resetPassword({ email, token, password, password_confirmation: password2 });
      setMsg("Şifre başarıyla güncellendi. Giriş yapabilirsiniz.");
      setTimeout(() => navigate('/login'), 900);
    } catch (e2) {
      setErr(e2?.message || "Şifre sıfırlanamadı.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12 px-4 overflow-hidden">
      <SEO />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&q=80" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-amber-700/85 to-yellow-900/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.15),transparent_50%)]"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-400/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-white/5 rounded-full mix-blend-overlay filter blur-2xl animate-pulse delay-3000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Şifre Sıfırla</h1>
            <p className="text-text-light">E‑posta ve yeni şifrenizi girin</p>
          </div>

          {msg && <div className="mb-4 rounded-lg border border-green-200 bg-green-50 text-green-700 px-4 py-3 text-sm">{msg}</div>}
          {err && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-600 px-4 py-3 text-sm">{err}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">E‑posta</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none" placeholder="ornek@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Yeni Şifre</label>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Yeni Şifre (Tekrar)</label>
              <input type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 disabled:bg-gray-300">
              {loading ? "Gönderiliyor..." : "Şifreyi Güncelle"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-2 items-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary px-4 py-2 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:text-primary transition-all duration-200 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Giriş sayfasına dön
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary px-4 py-2 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:text-primary transition-all duration-200 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


