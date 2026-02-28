import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function calculateRemaining(endTime) {
  if (!endTime) return null;
  const target = new Date(endTime).getTime();
  if (Number.isNaN(target)) return null;
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function MaintenanceScreen({ message, endTime, onRetry, isError }) {
  const [timer, setTimer] = useState(() => calculateRemaining(endTime));

  useEffect(() => {
    if (!endTime) return undefined;
    const interval = setInterval(() => {
      setTimer(calculateRemaining(endTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const countdown = useMemo(() => {
    if (!timer) return null;
    return [
      { label: "Gün", value: timer.days },
      { label: "Saat", value: timer.hours },
      { label: "Dakika", value: timer.minutes },
      { label: "Saniye", value: timer.seconds },
    ];
  }, [timer]);

  const statusPills = isError
    ? ["API Ulaşılamıyor", "Durum Bilgisi Yok"]
    : ["Altyapı Güncelleniyor", "Güvenlik İyileştirme", "Performans Testleri"];

  return (
    <div className="min-h-screen w-full text-white relative overflow-hidden flex items-center justify-center px-6 py-8">
      <div className="absolute inset-0 bg-[#020617]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.3),_transparent)]"></div>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\" viewBox=\"0 0 160 160\"%3E%3Cg fill=\"none\" stroke=\"%232256ff\" stroke-width=\"0.5\" opacity=\"0.25\"%3E%3Cpath d=\"M0 .5H160M0 20.5H160M0 40.5H160M0 60.5H160M0 80.5H160M0 100.5H160M0 120.5H160M0 140.5H160M0 160.5H160M.5 0V160M20.5 0V160M40.5 0V160M60.5 0V160M80.5 0V160M100.5 0V160M120.5 0V160M140.5 0V160M160.5 0V160\"/%3E%3C/g%3E%3C/svg%3E')" }}></div>
      <div className="absolute inset-0 pointer-events-none mix-blend-screen">
        <div className="absolute top-1/3 -left-10 w-60 h-60 bg-cyan-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>
        <div className="absolute inset-0 animate-pulse opacity-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_30px_120px_-40px_rgba(59,130,246,0.6)] overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-indigo-500/20 blur-3xl"></div>
            <div className="relative px-8 py-10 md:px-14 space-y-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="text-left">
                  <p className="text-xs uppercase tracking-[0.45em] text-cyan-200 font-semibold">
                    {isError ? "Bağlantı Sorunu" : "Bakım Modu Aktif"}
                  </p>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-3">
                    {isError ? "Sisteme Ulaşılamıyor" : "Platformu Yeniliyoruz"}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-200 max-w-2xl mt-4">
                    {message ||
                      (isError
                        ? "Bakım servislerine erişemiyoruz. Lütfen internet bağlantınızı kontrol ederek tekrar deneyin."
                        : "Performans iyileştirmeleri, güvenlik yamaları ve yeni özellikler için kısa süreliğine offline’ız.")}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-36 h-36 md:w-44 md:h-44 rounded-[32px] border border-white/20 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl flex items-center justify-center"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-4xl md:text-5xl">
                    ⚡
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {statusPills.map((pill) => (
                  <span
                    key={pill}
                    className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm text-slate-200 tracking-wide"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {countdown && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {countdown.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl py-5 px-3 text-center"
                    >
                      <p className="text-4xl font-black text-white drop-shadow">
                        {String(item.value).padStart(2, "0")}
                      </p>
                      <p className="text-sm tracking-[0.25em] text-slate-300 uppercase mt-2">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-2xl bg-white text-slate-900 font-semibold py-4 shadow-xl hover:-translate-y-0.5 transition"
                >
                  Sayfayı Yenile
                </button>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="rounded-2xl border border-white/20 bg-white/5 text-white font-semibold py-4 hover:bg-white/10 transition"
                  >
                    Durumu Yeniden Kontrol Et
                  </button>
                )}
                <a
                  href="mailto:support@work365.com"
                  className="rounded-2xl border border-white/10 bg-gradient-to-r from-transparent to-white/5 text-slate-200 font-semibold py-4 hover:text-white transition text-center"
                >
                  Destekle İletişime Geç
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

