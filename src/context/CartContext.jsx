import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { cartApi } from "../lib/api";
import { getToken } from "../lib/auth";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ total: null, discount: null });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      setItems([]);
      setSummary({ total: null, discount: null });
      return;
    }
    try {
      const res = await cartApi.list(token);
      const cartItems = res?.items || res?.data || res || [];
      setItems(Array.isArray(cartItems) ? cartItems : []);
      const totalInfo = res?.total || null;
      const discountInfo = Object.prototype.hasOwnProperty.call(res || {}, "discount")
        ? res.discount
        : null;
      setSummary({ total: totalInfo, discount: discountInfo });
    } catch (err) {
      console.error("Sepet yüklenemedi:", err);
      setItems([]);
      setSummary({ total: null, discount: null });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item) => {
    const token = getToken();
    if (!token) {
      setItems((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        const existing = prevArray.find((x) => x.id === item.id);
        if (existing) {
          return prevArray.map((x) => (x.id === item.id ? { ...x, quantity: x.quantity + (item.quantity || 1) } : x));
        }
        return [...prevArray, { ...item, quantity: item.quantity || 1 }];
      });
      return;
    }

    try {
      let payload = {};
      if (item.service_request_id) {
        payload = { service_request_id: item.service_request_id };
      } else {
        payload = {
          product_id: item.product_id,
          tier: item.tier,
          period: item.period,
        };
      }
      await cartApi.add(token, payload);
      await loadCart();
    } catch (err) {
      console.error("Sepete ekleme hatası:", err);
      throw err;
    }
  };

  const removeItem = async (id) => {
    const token = getToken();
    if (!token) {
      setItems((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return prevArray.filter((x) => x.id !== id);
      });
      return;
    }

    try {
      await cartApi.remove(token, id);
      await loadCart();
    } catch (err) {
      console.error("Sepetten silme hatası:", err);
      throw err;
    }
  };

  const updateQuantity = async (id, quantity) => {
    const token = getToken();
    if (!token) {
      setItems((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return prevArray.map((x) => (x.id === id ? { ...x, quantity: Math.max(1, quantity) } : x));
      });
      return;
    }

    try {
      const payload = { quantity: Math.max(1, quantity) };
      await cartApi.update(token, id, payload);
      await loadCart();
    } catch (err) {
      console.error("Miktar güncelleme hatası:", err);
      throw err;
    }
  };

  const clear = async () => {
    const token = getToken();
    if (!token) {
      setItems([]);
      return;
    }

    try {
      await cartApi.clear(token);
      await loadCart();
    } catch (err) {
      console.error("Sepet temizleme hatası:", err);
      throw err;
    }
  };

  const total = useMemo(() => {
    if (summary?.total && summary.total.final_gross != null) {
      const val = parseFloat(summary.total.final_gross);
      return isNaN(val) ? 0 : val;
    }
    if (!Array.isArray(items)) {
      return 0;
    }
    return items.reduce((sum, i) => {
      const price = parseFloat(i.gross_price || i.net_price || i.price || 0);
      const qty = parseInt(i.quantity || 1);
      return sum + price * qty;
    }, 0);
  }, [items, summary]);

  const rawTotal = useMemo(() => {
    if (summary?.total && summary.total.total_gross != null) {
      const val = parseFloat(summary.total.total_gross);
      return isNaN(val) ? total : val;
    }
    return total;
  }, [summary, total]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      total,
      rawTotal,
      loading,
      summary,
      discount: summary.discount,
      refresh: loadCart,
    }),
    [items, total, rawTotal, loading, summary]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


