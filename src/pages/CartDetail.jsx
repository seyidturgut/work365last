import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaTrash, FaShoppingCart, FaArrowRight, FaPercent, FaTimes, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cartApi } from "../lib/api";
import { getToken } from "../lib/auth";

export default function CartDetail() {
  const { items, removeItem, updateQuantity, total, rawTotal, clear, summary, refresh } = useCart();
  const { user } = useAuth();
  const [discountCode, setDiscountCode] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountError, setDiscountError] = useState("");
  const [discountSuccess, setDiscountSuccess] = useState("");
  const [discountExpiredNotice, setDiscountExpiredNotice] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const discountExpiryHandled = useRef(false);
  const canCheckout = Array.isArray(items) && items.length > 0 && (total || 0) > 0;
  const isEmpty = !Array.isArray(items) || items.length === 0;

  useEffect(() => {
    if (!user) {
      window.location.replace("/");
    }
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const lastCode = window.localStorage.getItem("cart_last_discount_code");
    if (lastCode && !summary?.discount) {
      setDiscountExpiredNotice("Kupon süresi doldu veya kaldırıldı.");
      window.localStorage.removeItem("cart_last_discount_code");
    }
  }, [summary?.discount]);

  useEffect(() => {
    discountExpiryHandled.current = false;
    if (!summary?.discount?.expires_at) {
      setRemainingTime("");
      return;
    }
    const expiresAt = new Date(summary.discount.expires_at);

    const updateRemaining = () => {
      const now = new Date();
      const diffMs = expiresAt.getTime() - now.getTime();
      if (diffMs <= 0) {
        setRemainingTime("Süre doldu");
        if (!discountExpiryHandled.current) {
          discountExpiryHandled.current = true;
          setDiscountExpiredNotice("Kupon süresi doldu veya kaldırıldı.");
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("cart_last_discount_code");
          }
          refresh();
        }
        return;
      }
      const totalSec = Math.floor(diffMs / 1000);
      const minutes = Math.floor(totalSec / 60);
      const seconds = totalSec % 60;
      setRemainingTime(`${minutes} dk ${seconds.toString().padStart(2, "0")} sn`);
    };

    updateRemaining();
    const id = setInterval(updateRemaining, 1000);
    return () => clearInterval(id);
  }, [summary?.discount?.code, summary?.discount?.expires_at, refresh]);

  if (!user) return null;

  const appliedDiscount = summary?.discount;
  const discountAmount = summary?.total?.discount_amount
    ? parseFloat(summary.total.discount_amount)
    : appliedDiscount?.amount
      ? parseFloat(appliedDiscount.amount)
      : 0;

  const handleApplyDiscount = async () => {
    setDiscountError("");
    setDiscountSuccess("");
    const code = discountCode.trim();
    if (!code) {
      setDiscountError("Lütfen bir indirim kodu girin.");
      return;
    }
    const token = getToken();
    if (!token) {
      setDiscountError("İndirim kodu kullanmak için giriş yapmalısınız.");
      return;
    }
    setDiscountLoading(true);
    try {
      const res = await cartApi.applyDiscount(token, code);
      setDiscountSuccess(res?.message || "İndirim kodu başarıyla uygulandı.");
      await refresh();
      if (typeof window !== "undefined") {
        window.localStorage.setItem("cart_last_discount_code", code);
      }
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "İndirim kodu uygulanırken bir hata oluştu.";
      setDiscountError(msg);
    } finally {
      setDiscountLoading(false);
    }
  };

  const handleRemoveDiscount = async () => {
    setDiscountError("");
    setDiscountSuccess("");
    const token = getToken();
    if (!token) return;
    setDiscountLoading(true);
    try {
      const res = await cartApi.removeDiscount(token);
      setDiscountSuccess(res?.message || "İndirim kodu kaldırıldı.");
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("cart_last_discount_code");
      }
      setDiscountExpiredNotice("");
      await refresh();
      setDiscountCode("");
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "İndirim kodu kaldırılırken bir hata oluştu.";
      setDiscountError(msg);
    } finally {
      setDiscountLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <section className="pt-28 pb-12 bg-work-navy-500 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-3">Sepetim</h1>
            <p className="text-blue-100 text-lg">Seçtiğiniz hizmetlerin özetini ve toplamı görüntüleyin.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
                  <FaShoppingCart className="text-6xl text-primary/40" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz boş</h3>
                <p className="text-gray-500 mb-8">Hizmet ekleyerek başlayın.</p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Alışverişe Devam Et
                  <FaArrowRight />
                </Link>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FaShoppingCart className="text-primary" />
                    Sepetteki Ürünler ({items.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-6">
                        {(() => {
                          const productKey = item.product?.key || item.service_request?.service_key || "";
                          const isCompanyRegistration = ["sahis", "limited", "anonim", "bilanco"].includes(productKey);

                          if (item.image) {
                            return (
                              <img
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                decoding="async"
                                className="w-28 h-28 rounded-2xl object-cover flex-shrink-0 shadow-md"
                              />
                            );
                          }

                          if (isCompanyRegistration) {
                            return (
                              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                <FaBuilding className="text-4xl text-white" />
                              </div>
                            );
                          }

                          return (
                            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-md">
                              <FaShoppingCart className="text-3xl text-white" />
                            </div>
                          );
                        })()}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-lg text-gray-900 mb-2">
                            {item.service_request?.service_title || item.product?.title || item.name || 'Ürün'}
                          </h4>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {item.tier && (
                              <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-lg font-semibold">
                                {item.tier === 'standard' ? 'Ticaret-e Başla' : 'Plus'}
                              </span>
                            )}
                            {item.period && (
                              <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg font-semibold">
                                {item.period === 'monthly' ? 'Aylık' : 'Yıllık'}
                              </span>
                            )}
                            {item.quantity > 1 && (
                              <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg font-semibold">
                                {item.quantity} adet
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            Birim Fiyat: <span className="font-semibold text-gray-900">{parseFloat(item.gross_price || item.net_price || item.price || 0).toLocaleString('tr-TR')} ₺</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl text-primary mb-4">
                            {(parseFloat(item.gross_price || item.net_price || item.price || 0) * (item.quantity || 1)).toLocaleString('tr-TR')} ₺
                          </div>
                          <button
                            aria-label="Sil"
                            onClick={() => removeItem(item.id)}
                            className="px-4 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium text-sm flex items-center gap-2"
                          >
                            <FaTrash className="text-sm" />
                            Kaldır
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-primary to-blue-600 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FaShoppingCart />
                  Sipariş Özeti
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Ara Toplam</span>
                  <span className="font-bold text-gray-900 text-lg">
                    {(summary?.total?.total_gross != null
                      ? parseFloat(summary.total.total_gross)
                      : rawTotal || total
                    ).toLocaleString("tr-TR")}{" "}
                    ₺
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-500">KDV (%20)</span>
                  <span className="text-gray-600 font-medium">Dahil</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-emerald-600 font-medium flex items-center gap-2">
                      <FaPercent />
                      İndirim ({appliedDiscount?.code})
                    </span>
                    <span className="font-semibold text-emerald-600">
                      -{discountAmount.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                )}
                {appliedDiscount?.code && remainingTime && remainingTime !== "Süre doldu" && (
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Kupon kalan süre</span>
                    <span className="font-medium text-emerald-700">{remainingTime}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-bold text-gray-900">Genel Toplam</span>
                  <span className="text-2xl font-bold text-primary">
                    {total.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              </div>
              <div className="p-6 pt-0 space-y-3">
                {!isEmpty && (
                  <div className="mb-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      İndirim Kodu
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) =>
                          setDiscountCode(e.target.value.toUpperCase())
                        }
                        placeholder="Örn: YIL2024"
                        className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={handleApplyDiscount}
                        disabled={discountLoading || !discountCode.trim()}
                        className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <FaPercent />
                        Uygula
                      </button>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          onClick={handleRemoveDiscount}
                          disabled={discountLoading}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-red-600"
                        >
                          <FaTimes className="text-[10px]" />
                          İndirim Kodunu Kaldır
                        </button>
                      </div>
                    )}
                    {discountError && (
                      <p className="text-xs text-red-600">{discountError}</p>
                    )}
                    {discountSuccess && (
                      <p className="text-xs text-emerald-600">{discountSuccess}</p>
                    )}
                    {discountExpiredNotice && !appliedDiscount && (
                      <p className="text-xs text-amber-600">{discountExpiredNotice}</p>
                    )}
                  </div>
                )}
                {canCheckout ? (
                  <Link
                    to="/odeme"
                    className="block w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white font-semibold text-center py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    Ödemeye Geç
                    <FaArrowRight />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="block w-full bg-gray-200 text-gray-400 font-semibold text-center py-4 rounded-xl cursor-not-allowed"
                  >
                    Ödemeye Geç
                  </button>
                )}
                <button
                  onClick={clear}
                  disabled={isEmpty}
                  className={`w-full font-semibold py-3 rounded-xl transition-all ${isEmpty
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                    }`}
                >
                  Sepeti Temizle
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}


