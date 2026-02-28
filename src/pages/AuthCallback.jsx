import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaGoogle } from "react-icons/fa";
import { saveToken } from "../lib/auth";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const [status, setStatus] = useState("loading");
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const hash = location.hash || "";
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const token = params.get("token");
    const error = params.get("error");

    if (error || !token) {
      setStatus("error");
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer);
    }

    saveToken(token);
    (async () => {
      try {
        await refresh();
      } catch { }
      setStatus("success");

      let count = 2;
      setCountdown(count);

      const countdownInterval = setInterval(() => {
        count--;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);

      const timer = setTimeout(() => navigate("/"), 2000);
      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    })();
  }, [location.hash, navigate, refresh]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-indigo-100/60" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#799b38]/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#29303e]/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 w-full max-w-md text-center border border-white/50"
      >
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/Logo.png"
            alt="Work365"
            className="h-12 w-auto mx-auto"
          />
        </div>

        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Google icon with pulse */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
              >
                <FaGoogle className="text-white text-3xl" />
              </motion.div>

              {/* Spinner */}
              <div className="relative">
                <div className="w-16 h-16 mx-auto border-4 border-gray-200 rounded-full" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Google ile Giriş
                </h2>
                <p className="text-gray-600">
                  Giriş işleminiz tamamlanıyor...
                </p>
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-6"
            >
              {/* Success icon with animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl">
                  <FaCheckCircle className="text-white text-5xl" />
                </div>
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Giriş Başarılı! 🎉
                </h2>
                <p className="text-gray-600 mb-4">
                  Hoş geldiniz! Ana sayfaya yönlendiriliyorsunuz...
                </p>

                {/* Countdown */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-green-700">
                    {countdown} saniye
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                />
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-6"
            >
              {/* Error icon with animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl">
                  <FaTimesCircle className="text-white text-5xl" />
                </div>
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Giriş Başarısız
                </h2>
                <p className="text-gray-600 mb-4">
                  Google ile giriş yapılırken bir hata oluştu.
                </p>
                <p className="text-sm text-gray-500">
                  Giriş sayfasına yönlendiriliyorsunuz...
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-red-500 to-red-600"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#799b38', animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#29303e', animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#799b38', animationDelay: '0.4s' }} />
        </div>
      </motion.div>
    </div>
  );
}



