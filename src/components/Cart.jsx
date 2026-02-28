import { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaTrash, FaTimes, FaBuilding } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Cart({ white }) {
  const [isOpen, setIsOpen] = useState(false);
  const { items: cartItems, removeItem, total } = useCart();
  const { user } = useAuth();
  const canCheckout = Array.isArray(cartItems) && cartItems.length > 0 && (total || 0) > 0;
  const cartRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${white ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
        aria-label="Sepet"
      >
        <FaShoppingCart className={`text-xl ${white ? "text-white" : "text-gray-900"}`} />
        {cartItems.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-md"
          >
            {cartItems.length}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={cartRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <FaShoppingCart className="text-base" />
                  Sepetim
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Kapat"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
              {cartItems.length > 0 && (
                <p className="text-xs text-white/90 mt-1">
                  {cartItems.length} {cartItems.length === 1 ? 'ürün' : 'ürün'}
                </p>
              )}
            </div>

            {/* Items */}
            <div className="max-h-[320px] overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                    <FaShoppingCart className="text-2xl text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium mb-1 text-sm">Sepetiniz boş</p>
                  <p className="text-xs text-gray-400">Hizmet ekleyerek başlayın</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
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
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-md"
                              />
                            );
                          }

                          if (isCompanyRegistration) {
                            return (
                              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                <FaBuilding className="text-xl text-white" />
                              </div>
                            );
                          }

                          return (
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-md">
                              <FaShoppingCart className="text-xl text-white" />
                            </div>
                          );
                        })()}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 leading-snug">
                            {item.service_request?.service_title || item.product?.title || item.name || 'Ürün'}
                            {item.tier && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-md font-medium">
                                {item.tier === 'standard' ? 'Ticaret-e Başla' : 'Plus'}
                              </span>
                            )}
                          </h4>
                          <div className="flex items-center justify-between mt-1.5">
                            <p className="text-primary font-bold text-sm">
                              {parseFloat(item.gross_price || item.net_price || item.price || 0).toLocaleString('tr-TR')} ₺
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                {item.quantity} adet
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all flex-shrink-0"
                          aria-label="Sil"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
                <div className="flex justify-between items-center mb-3 p-2.5 bg-white rounded-lg shadow-sm">
                  <span className="font-bold text-gray-800 text-sm">Toplam:</span>
                  <span className="font-bold text-xl text-primary">
                    {total.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/sepet"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-white border-2 border-primary text-primary hover:bg-primary/5 font-semibold py-2.5 rounded-lg transition-all text-center shadow-sm hover:shadow-md text-sm"
                  >
                    Sepeti Görüntüle
                  </Link>
                  {canCheckout ? (
                    <Link
                      to="/odeme"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all text-center shadow-md hover:shadow-lg text-sm"
                    >
                      Sepeti Onayla
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-200 text-gray-400 font-semibold py-2.5 rounded-lg cursor-not-allowed text-sm"
                    >
                      Sepeti Onayla
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
