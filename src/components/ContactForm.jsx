import { useState, useEffect } from "react";
import { contactApi, captchaApi } from "../lib/api";
import { FaSyncAlt, FaQuestionCircle, FaPalette, FaCalculator, FaFont, FaShieldAlt } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    captcha_answer: "",
  });
  const [captcha, setCaptcha] = useState(null);
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    loadCaptcha();
  }, []);

  const loadCaptcha = async () => {
    setLoadingCaptcha(true);
    try {
      const response = await captchaApi.generate();
      if (response.success) {
        setCaptcha(response.data);
        setFormData(prev => ({ ...prev, captcha_answer: "" }));
      }
    } catch (error) {
      console.error("CAPTCHA yüklenemedi:", error);
      setGeneralError("CAPTCHA yüklenemedi. Lütfen sayfayı yenileyin.");
    } finally {
      setLoadingCaptcha(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErrors({});
    setGeneralError("");
    setSuccess(false);
    setSuccessMessage("");

    if (!captcha) {
      setGeneralError("CAPTCHA yüklenemedi. Lütfen sayfayı yenileyin.");
      setSending(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        captcha_token: captcha.token,
        captcha_answer: formData.captcha_answer.trim(),
      };

      if (formData.phone) {
        payload.phone = formData.phone;
      }

      const response = await contactApi.send(payload);
      
      setSuccess(true);
      setSuccessMessage(response.message || "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", captcha_answer: "" });
      loadCaptcha();
    } catch (err) {
      if (err.data && err.data.errors) {
        setErrors(err.data.errors);
      } else {
        setGeneralError(err.message || "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      }
      
      if (err.message?.includes("Doğrulama") || err.message?.includes("captcha")) {
        loadCaptcha();
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input
          required
          autoComplete="name"
          disabled={sending}
          type="text"
          placeholder="Ad Soyad *"
          maxLength={255}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-primary/30 transition ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-600 text-xs mt-1">{errors.name[0]}</p>
        )}
      </div>

      <div>
        <input
          required
          autoComplete="email"
          disabled={sending}
          type="email"
          placeholder="E-posta *"
          maxLength={255}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-primary/30 transition ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email[0]}</p>
        )}
      </div>

      <div>
        <input
          autoComplete="tel"
          disabled={sending}
          type="tel"
          placeholder="Telefon (Opsiyonel)"
          maxLength={20}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-primary/30 transition ${
            errors.phone ? "border-red-500" : ""
          }`}
        />
        {errors.phone && (
          <p className="text-red-600 text-xs mt-1">{errors.phone[0]}</p>
        )}
      </div>

      <div>
        <input
          required
          autoComplete="off"
          disabled={sending}
          type="text"
          placeholder="Konu *"
          maxLength={255}
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-primary/30 transition ${
            errors.subject ? "border-red-500" : ""
          }`}
        />
        {errors.subject && (
          <p className="text-red-600 text-xs mt-1">{errors.subject[0]}</p>
        )}
      </div>

      <div>
        <textarea
          required
          minLength={10}
          maxLength={5000}
          disabled={sending}
          placeholder="Mesajınız *"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`w-full rounded-lg border px-4 py-2 text-sm h-32 focus:outline-none focus:ring focus:ring-primary/30 transition ${
            errors.message ? "border-red-500" : ""
          }`}
        ></textarea>
        <div className="flex justify-between items-center mt-1">
          {errors.message && (
            <p className="text-red-600 text-xs">{errors.message[0]}</p>
          )}
          <p className="text-gray-500 text-xs ml-auto">
            {formData.message.length}/5000
          </p>
        </div>
      </div>

      {captcha && (() => {
        const captchaConfig = {
          general_knowledge: {
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 via-indigo-50/50 to-white",
            borderColor: "border-blue-200",
            icon: FaQuestionCircle,
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
            label: "Genel Kültür",
          },
          color_question: {
            gradient: "from-pink-500 to-rose-600",
            bgGradient: "from-pink-50 via-rose-50/50 to-white",
            borderColor: "border-pink-200",
            icon: FaPalette,
            iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
            label: "Renk Sorusu",
          },
          simple_math: {
            gradient: "from-emerald-500 to-teal-600",
            bgGradient: "from-emerald-50 via-teal-50/50 to-white",
            borderColor: "border-emerald-200",
            icon: FaCalculator,
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
            label: "Matematik",
          },
          word_question: {
            gradient: "from-purple-500 to-violet-600",
            bgGradient: "from-purple-50 via-violet-50/50 to-white",
            borderColor: "border-purple-200",
            icon: FaFont,
            iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
            label: "Kelime Sorusu",
          },
        };

        const config = captchaConfig[captcha.type] || captchaConfig.general_knowledge;
        const IconComponent = config.icon;

        return (
          <div className={`relative rounded-xl border-2 ${config.borderColor} bg-gradient-to-br ${config.bgGradient} p-5 shadow-lg overflow-hidden`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${config.gradient} opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8`}></div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`${config.iconBg} p-3 rounded-xl shadow-md flex-shrink-0`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FaShieldAlt className="w-4 h-4 text-gray-600" />
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        {config.label}
                      </span>
                    </div>
                    <label className="text-base font-semibold text-gray-800 leading-relaxed block">
                      {captcha.question}
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={loadCaptcha}
                  disabled={loadingCaptcha || sending}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-white border ${config.borderColor} text-sm font-medium text-gray-700 hover:bg-gradient-to-r ${config.gradient} hover:text-white hover:border-transparent disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex-shrink-0 shadow-sm`}
                  title="CAPTCHA'yı yenile"
                >
                  <FaSyncAlt className={`w-3.5 h-3.5 ${loadingCaptcha ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">Yenile</span>
                </button>
              </div>

              <div className="space-y-2">
                <input
                  required
                  autoComplete="off"
                  disabled={sending || loadingCaptcha}
                  type="text"
                  placeholder={captcha.type === "simple_math" ? "Sayısal cevap girin (örn: 12)" : "Cevabınızı yazın"}
                  value={formData.captcha_answer}
                  onChange={(e) => setFormData({ ...formData, captcha_answer: e.target.value })}
                  className={`w-full rounded-lg border-2 ${errors.captcha_answer || errors.captcha_token ? "border-red-400" : config.borderColor} bg-white px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-opacity-50 transition-all shadow-sm ${
                    captcha.type === "simple_math" 
                      ? `focus:ring-emerald-500` 
                      : captcha.type === "color_question"
                      ? `focus:ring-pink-500`
                      : captcha.type === "word_question"
                      ? `focus:ring-purple-500`
                      : `focus:ring-blue-500`
                  }`}
                />
                {errors.captcha_answer && (
                  <p className="text-red-600 text-xs font-medium mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.captcha_answer[0]}
                  </p>
                )}
                {errors.captcha_token && (
                  <p className="text-red-600 text-xs font-medium mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.captcha_token[0]}
                  </p>
                )}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 border ${config.borderColor} shadow-sm`}>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`}></div>
                  <small className="text-gray-600 text-xs font-medium">
                    {captcha.type === "simple_math" 
                      ? "💡 Sayısal cevap girin" 
                      : "💡 Cevabınızı küçük harfle yazabilirsiniz"}
                  </small>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {loadingCaptcha && !captcha && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-600 text-sm">CAPTCHA yükleniyor...</p>
        </div>
      )}

      {generalError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{generalError}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{successMessage}</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-primary text-white font-semibold py-2 transition hover:bg-blue-900 disabled:bg-gray-300 dark:disabled:bg-neutral-800"
        disabled={sending || !captcha || loadingCaptcha}
      >
        {sending ? "Gönderiliyor..." : success ? "Gönderildi!" : "Gönder"}
      </button>
    </form>
  );
}
