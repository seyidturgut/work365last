import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const status = searchParams.get("status");
    const orderId = searchParams.get("order_id");
    const paymentStatus = searchParams.get("payment_status");
    const message = searchParams.get("message");

    if (status === "success") {
      setResult({
        success: true,
        orderId,
        paymentStatus,
      });
      if (typeof clearCart === "function") clearCart();
      localStorage.removeItem("current_order_id");
    } else {
      setResult({
        success: false,
        message: message ? decodeURIComponent(message) : "Ödeme tamamlanamadı",
      });
    }
    setLoading(false);
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-sm text-white/70">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const isSuccess = result?.success;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-16 w-80 h-80 bg-primary/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-20 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-8 md:p-10"
        >
          {isSuccess ? (
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/15 text-green-200 border border-green-400/30">
                  <span className="text-lg">✅</span>
                  <span className="text-sm font-semibold">Ödeme Onaylandı</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Ödemeniz başarıyla tamamlandı!
                </h1>
                <p className="text-white/70">
                  Siparişiniz alındı ve işleme alındı. Şirket kuruluşu formu için gerekli
                  bağlantı e-posta adresinize gönderilmiştir. Sipariş detaylarınızı profilinizden
                  görüntüleyebilirsiniz.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {result?.orderId && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-white/60 text-sm mb-1">Sipariş No</p>
                      <p className="text-xl font-semibold text-white">#{result.orderId}</p>
                    </div>
                  )}
                  {result?.paymentStatus && (
                    <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-4">
                      <p className="text-white/70 text-sm mb-1">Ödeme Durumu</p>
                      <p className="text-lg font-semibold text-green-100">{result.paymentStatus}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {result?.orderId && (
                    <button
                      onClick={() => navigate(`/profil/detay?tab=orders`)}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                      Siparişlerimi Görüntüle
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/")}
                    className="px-5 py-3 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 font-semibold transition-all"
                  >
                    Ana Sayfaya Dön
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-6 text-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">
                      Ödeme Özeti
                    </p>
                    <p className="text-lg font-bold text-gray-900">Work365</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-xl">💳</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Ödeme Durumu</span>
                    <span className="text-sm font-semibold text-green-600">Başarılı</span>
                  </div>
                  {result?.orderId && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Sipariş No</span>
                      <span className="text-sm font-semibold text-gray-900">#{result.orderId}</span>
                    </div>
                  )}
                  {result?.paymentStatus && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Durum</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {result.paymentStatus}
                      </span>
                    </div>
                  )}
                  <div className="pt-4">
                    <p className="text-xs text-gray-500 mb-1">İşlem Güvenliği</p>
                    <p className="text-sm text-gray-700">
                      Ödemeniz 256-bit SSL ve 3D Secure ile tamamlandı.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-500/15 text-red-200 border border-red-400/30">
                  <span className="text-lg">⚠️</span>
                  <span className="text-sm font-semibold">Ödeme Başarısız</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Ödeme tamamlanamadı, lütfen tekrar deneyin.
                </h1>
                <p className="text-white/70">
                  {result?.message || "Ödeme işlemi sırasında bir hata oluştu. Tekrar deneyebilir veya destek ekibimizle iletişime geçebilirsiniz."}
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h4 className="text-white font-semibold mb-3">Olası Nedenler</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Kart bilgileri hatalı olabilir</li>
                    <li>• Bakiye / limit yetersiz olabilir</li>
                    <li>• 3D Secure doğrulaması başarısız olmuş olabilir</li>
                    <li>• Banka tarafından işlem engellenmiş olabilir</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/odeme")}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    Tekrar Dene
                  </button>
                  <button
                    onClick={() => navigate("/sepet")}
                    className="px-5 py-3 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 font-semibold transition-all"
                  >
                    Sepete Dön
                  </button>
                  <button
                    onClick={() => navigate("/iletisim")}
                    className="px-5 py-3 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 font-semibold transition-all"
                  >
                    Destek ile İletişime Geç
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-6 text-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">
                      Hata Özeti
                    </p>
                    <p className="text-lg font-bold text-gray-900">Ödeme Reddedildi</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <span className="text-xl">❌</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Durum</span>
                    <span className="text-sm font-semibold text-red-600">Başarısız</span>
                  </div>
                  {result?.message && (
                    <div className="py-2 border-b border-gray-100">
                      <p className="text-sm text-gray-600 mb-1">Hata Mesajı</p>
                      <p className="text-sm font-semibold text-gray-900">{result.message}</p>
                    </div>
                  )}
                  <div className="pt-4">
                    <p className="text-xs text-gray-500 mb-1">İpucu</p>
                    <p className="text-sm text-gray-700">
                      Kart bilgilerinizi ve 3D Secure onayını yeniden kontrol ederek tekrar deneyin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

