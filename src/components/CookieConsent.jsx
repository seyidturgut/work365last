import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { cookieConsentApi } from "../lib/api";
import { getToken, getOrCreateSessionId } from "../lib/auth";
import { useAuth } from "../context/AuthContext";

export default function CookieConsent() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [consentData, setConsentData] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkConsent();
  }, [user]);

  const checkConsent = async () => {
    try {
      const token = getToken();
      const sessionId = getOrCreateSessionId();
      const tokenToSend = token && token.trim() ? token : null;
      const response = await cookieConsentApi.check(tokenToSend, sessionId);
      
      if (response && response.has_consent && response.data) {
        setConsentData(response.data.consent_data || consentData);
        setIsVisible(false);
        return;
      }
    } catch (error) {
      console.error("Çerez onay durumu kontrol edilemedi:", error);
      
      if (error.isNetworkError) {
        console.warn("API'ye bağlanılamadı, localStorage kontrol ediliyor...");
        const localConsent = localStorage.getItem("cookieConsent");
        if (localConsent) {
          try {
            const parsed = JSON.parse(localConsent);
            if (parsed.data) {
              setConsentData(parsed.data);
              setIsVisible(false);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error("localStorage'dan çerez onayı okunamadı:", e);
          }
        }
      }
    }
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    setLoading(false);
    return () => clearTimeout(timer);
  };

  const handleAccept = async () => {
    await saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }, true);
  };

  const handleReject = async () => {
    await saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }, false);
  };

  const handleCustomSave = async () => {
    await saveConsent(consentData, true);
  };

  const saveConsent = async (data, accepted) => {
    setSaving(true);
    try {
      const token = getToken();
      const sessionId = getOrCreateSessionId();
      const tokenToSend = token && token.trim() ? token : null;
      
      if (import.meta.env.DEV) {
        console.log("Çerez onayı kaydediliyor:", { tokenToSend: tokenToSend ? "var" : "yok", sessionId, data, accepted });
      }
      
      const response = await cookieConsentApi.save(tokenToSend, sessionId, data, accepted);
      
      if (import.meta.env.DEV) {
        console.log("Çerez onayı kaydedildi:", response);
      }
      
      setConsentData(data);
      localStorage.setItem("cookieConsent", JSON.stringify({ data, accepted, timestamp: Date.now() }));
      setIsVisible(false);
    } catch (error) {
      console.error("Çerez onayı kaydedilemedi:", error);
      console.error("Hata detayları:", {
        message: error.message,
        status: error.status,
        data: error.data,
        isNetworkError: error.isNetworkError,
      });
      
      if (error.isNetworkError) {
        console.warn("API'ye bağlanılamadı, localStorage'a kaydediliyor...");
        localStorage.setItem("cookieConsent", JSON.stringify({ data, accepted, timestamp: Date.now() }));
        setConsentData(data);
        setIsVisible(false);
      } else {
        alert(`Çerez tercihleriniz kaydedilirken bir hata oluştu: ${error.message || "Bilinmeyen hata"}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const toggleConsent = (key, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (key === "necessary") return;
    setConsentData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[100] px-4 py-4 sm:px-6 sm:py-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  🍪 Çerez Kullanımı
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Bu web sitesi, size en iyi deneyimi sunmak için çerezler kullanmaktadır. 
                  Çerez tercihlerinizi yönetebilir ve daha fazla bilgi için{" "}
                  <Link 
                    to="/cerez-politikasi" 
                    className="text-primary hover:underline font-medium"
                  >
                    Çerez Politikamızı
                  </Link>{" "}
                  inceleyebilirsiniz.
                </p>

                <div className="space-y-3 mt-4">
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-not-allowed">
                    <div>
                      <span className="font-semibold text-gray-900">Zorunlu Çerezler</span>
                      <p className="text-xs text-gray-500 mt-1">Sitenin çalışması için gerekli çerezler</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Her zaman aktif</span>
                      <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </label>

                  <label 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={(e) => toggleConsent("analytics", e)}
                  >
                    <div>
                      <span className="font-semibold text-gray-900">Analitik Çerezler</span>
                      <p className="text-xs text-gray-500 mt-1">Site kullanımını analiz etmek için</p>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                          consentData.analytics ? "bg-primary" : "bg-gray-300"
                        }`}
                        style={{ justifyContent: consentData.analytics ? "flex-end" : "flex-start" }}
                      >
                        <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                      </div>
                    </div>
                  </label>

                  <label 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={(e) => toggleConsent("marketing", e)}
                  >
                    <div>
                      <span className="font-semibold text-gray-900">Pazarlama Çerezleri</span>
                      <p className="text-xs text-gray-500 mt-1">Kişiselleştirilmiş reklamlar için</p>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                          consentData.marketing ? "bg-primary" : "bg-gray-300"
                        }`}
                        style={{ justifyContent: consentData.marketing ? "flex-end" : "flex-start" }}
                      >
                        <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                      </div>
                    </div>
                  </label>

                  <label 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={(e) => toggleConsent("preferences", e)}
                  >
                    <div>
                      <span className="font-semibold text-gray-900">Tercih Çerezleri</span>
                      <p className="text-xs text-gray-500 mt-1">Kullanıcı tercihlerini hatırlamak için</p>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                          consentData.preferences ? "bg-primary" : "bg-gray-300"
                        }`}
                        style={{ justifyContent: consentData.preferences ? "flex-end" : "flex-start" }}
                      >
                        <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleReject();
                  }}
                  disabled={saving}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Kaydediliyor..." : "Sadece Zorunlu"}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCustomSave();
                  }}
                  disabled={saving}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Kaydediliyor..." : "Seçimleri Kaydet"}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAccept();
                  }}
                  disabled={saving}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-md whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Kaydediliyor..." : "Tümünü Kabul Et"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
