import { Link } from "react-router-dom";
import { FaLinkedin, FaYoutube, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { useEffect, useState } from "react";
import { newsletterApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consentEmail, setConsentEmail] = useState(true);
  const [consentSms, setConsentSms] = useState(false);
  const [consentWa, setConsentWa] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.email) setEmail((prev) => prev || user.email);
      if (user.name) setName((prev) => prev || user.name);
    }
  }, [user]);

  useEffect(() => {
    let t;
    if (email && /.+@.+\..+/.test(email)) {
      t = setTimeout(async () => {
        try {
          const st = await newsletterApi.status(email);
          const data = st?.data || st;
          if (data && typeof data.subscribed === 'boolean') {
            setSubscribed(!!data.subscribed);
            if (data.subscribed) {
              setMsg("Bu e‑posta zaten abonedir.");
            } else {
              setMsg("");
            }
          }
        } catch { }
      }, 500);
    }
    return () => t && clearTimeout(t);
  }, [email]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setErr(""); setLoading(true);
    try {
      await newsletterApi.subscribe({
        email,
        name,
        consent_email: !!consentEmail,
        consent_sms: !!consentSms,
        consent_whatsapp: !!consentWa,
        kvkk_consent: true,
        profiling_consent: true,
        international_transfer_consent: true,
        source: "footer",
      });
      setSubscribed(true);
      setMsg("Bültene kaydınız alındı.");
      setEmail(""); setName(""); setConsentSms(false); setConsentWa(false);
    } catch (e) {
      setErr(e?.message || "Abonelik başarısız.");
    }
    setLoading(false);
  };

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Newsletter Section */}
        {!subscribed && (
          <div className="text-center mb-16 pb-16 border-b border-gray-800">
            <h2 className="text-3xl font-bold mb-4">Bültenimize Abone Olun 📪</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Girişimci adaylarını ve şirket sahiplerini ilgilendiren tüm haberler aylık bültenimizde.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-2xl mx-auto space-y-4">
              {(msg || err) && (
                <div className={`rounded-lg px-4 py-3 text-sm border ${msg ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>{msg || err}</div>
              )}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ad Soyad (opsiyonel)"
                  className="px-6 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="px-6 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300">
                <label className="flex items-center gap-2"><input type="checkbox" checked={consentEmail} onChange={(e) => setConsentEmail(e.target.checked)} className="accent-primary" /> E‑posta ile bilgilendirme</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={consentSms} onChange={(e) => setConsentSms(e.target.checked)} className="accent-primary" /> SMS</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={consentWa} onChange={(e) => setConsentWa(e.target.checked)} className="accent-primary" /> WhatsApp</label>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-work-green-500 text-white font-semibold rounded-xl hover:bg-work-green-600 transition-colors disabled:opacity-60"
                >
                  {loading ? 'Gönderiliyor...' : 'Abone Ol'}
                </button>
              </div>
            </form>
            <p className="mt-4 text-xs text-gray-400 max-w-2xl mx-auto">
              Kişisel verilerinizin işlenmesine ve ticari elektronik iletilere ilişkin detaylar için{" "}
              <Link
                to="/kisisel-verilerin-islenmesine-iliskin-aydinlatma-ve-riza-metni"
                className="underline text-gray-300 hover:text-white transition-colors"
              >
                Kişisel Verilerin İşlenmesine İlişkin Aydınlatma ve Rıza Metni
              </Link>{" "}
              sayfasını inceleyebilirsiniz.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/Logo-white.png"
                alt="Work365"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              İşinizle ilgili tüm süreçlerin tek bir platformdan online olarak takip edilmesini sağlayarak şirket kurmayı, yönetmeyi ve büyütmeyi kolaylaştıracak uçtan uca çözümler sunar.
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="font-bold text-lg mb-6">Hizmetler</h3>
            <ul className="space-y-3">
              <li><Link to="/kurumsal-danismanlik" className="text-gray-300 hover:text-white transition-colors text-sm">Kurumsal Danışmanlık</Link></li>
              <li><Link to="/kobi-startup" className="text-gray-300 hover:text-white transition-colors text-sm">KOBİ & Start-up</Link></li>
              <li><Link to="/hakkimizda" className="text-gray-300 hover:text-white transition-colors text-sm">Hakkımızda</Link></li>
              <li><Link to="/iletisim" className="text-gray-300 hover:text-white transition-colors text-sm">İletişim</Link></li>
            </ul>
          </div>

          {/* Çözümler */}
          <div>
            <h3 className="font-bold text-lg mb-6">Çözümler</h3>
            <ul className="space-y-3">
              <li><span className="text-gray-300 text-sm">Şirket Kuruluş</span></li>
              <li><span className="text-gray-300 text-sm">Belge Yükleme</span></li>
              <li><Link to="/basvuru-takibi" className="text-gray-300 hover:text-white transition-colors text-sm">Başvuru Takibi</Link></li>
              <li><Link to="/hizmet-basvuru" className="text-gray-300 hover:text-white transition-colors text-sm">Ek Hizmetler</Link></li>
            </ul>
          </div>

          {/* Kaynaklar */}
          <div>
            <h3 className="font-bold text-lg mb-6">Kaynaklar</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link to="/profil" className="text-gray-300 hover:text-white transition-colors text-sm">Profil</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm">Giriş Yap</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors text-sm">Üye Ol</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-8 border-t border-gray-800">
          <div className="flex items-center gap-6">
            <span className="text-gray-300 font-medium">Takipte Kalın</span>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://twitter.com/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="https://www.linkedin.com/company/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="https://www.facebook.com/piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://www.youtube.com/@piridijital" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Logos */}
        <div className="pt-8 border-t border-gray-800 mb-8">
          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-400 text-sm">Güvenli Ödeme</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <img
                src="/images/iyzico_ile_ode_colored_horizontal.png"
                alt="iyzico ile öde"
                className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
              <img
                src="/images/MasterCard_Logo.svg.png"
                alt="MasterCard"
                className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
              <img
                src="/images/VISA-logo.png"
                alt="VISA"
                className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
              <img
                src="/images/Troy-logo-sloganli.png"
                alt="Troy - Türkiye'nin Ödeme Yöntemi"
                className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Work365 - Tüm Hakları Saklıdır
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/kullanim-sartlari" className="text-gray-400 hover:text-white transition-colors">
              Kullanım Şartları
            </Link>
            <Link to="/gizlilik-sozlesmesi" className="text-gray-400 hover:text-white transition-colors">
              Kişisel Verilerin Korunması ve Gizlilik Politikası
            </Link>
            <Link to="/cerez-politikasi" className="text-gray-400 hover:text-white transition-colors">
              Çerez Politikası
            </Link>
            <Link to="/veri-sahibi-basvuru-formu" className="text-gray-400 hover:text-white transition-colors">
              Veri Sahibi Başvuru Formu
            </Link>
            <Link to="/iade-politikasi" className="text-gray-400 hover:text-white transition-colors">
              İade Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
