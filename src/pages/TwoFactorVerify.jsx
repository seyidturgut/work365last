import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { customerApi } from "../lib/api";
import { saveToken } from "../lib/auth";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

export default function TwoFactorVerify() {
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("pending_login");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.email && parsed?.password) {
          setPending(parsed);
          return;
        }
      }
    } catch {}
    navigate("/login");
  }, [navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    if (!code || code.length < 6) {
      setError("Geçerli 6 haneli kod girin.");
      return;
    }
    setLoading(true);
    try {
      const res = await customerApi.login({ email: pending.email, password: pending.password, device_name: "web",  "2fa_code": code });
      const token = res?.token || res?.data?.token || res?.plainTextToken;
      if (token) {
        saveToken(token);
        try { sessionStorage.removeItem("pending_login"); } catch {}
      }
      await refresh();
      navigate("/profil");
    } catch (err) {
      setError(err?.message || "Kod doğrulanamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4">
      <SEO />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">İki Aşamalı Doğrulama</h1>
            <p className="text-text-light mt-1">Authenticator uygulamanızdaki 6 haneli kodu girin.</p>
          </div>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">2FA Kodu</label>
              <input
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e)=>setCode(e.target.value.replace(/\\D/g,'').slice(0,6))}
                placeholder="123456"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors tracking-widest text-center text-lg"
                autoFocus
              />
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 disabled:bg-gray-300 shadow-lg">
              {loading ? "Doğrulanıyor..." : "Doğrula ve Giriş Yap"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-text-light hover:text-primary text-sm">← Geri dön</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


