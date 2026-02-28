import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { customerApi, twoFactorApi } from "../lib/api";
import { getToken } from "../lib/auth";

export default function TwoFactor() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [twoFA, setTwoFA] = useState({ enabled: false, otpauth_url: "", secret: "" });
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (!token) { setLoading(false); return; }
      try {
        const details = await customerApi.details(token);
        const d = details?.data || details || {};
        const enabled = !!(d.two_factor_enabled || user?.two_factor_enabled);
        setTwoFA(prev => ({ ...prev, enabled }));
      } catch {}
      setLoading(false);
    })();
  }, [user]);

  const beginSetup = async () => {
    const token = getToken(); if (!token) return;
    setBusy(true); setMsg(""); setErr("");
    try {
      const res = await twoFactorApi.setup(token);
      const data = res?.data || res || {};
      setTwoFA({ enabled: false, otpauth_url: data.otpauth_url || "", secret: data.secret || "" });
      setMsg("Kurulum başlatıldı. QR kodunu tara ve 6 haneli kodu gir.");
    } catch (e) {
      setErr(e?.message || "Kurulum başlatılamadı.");
    }
    setBusy(false);
  };

  const enable2FA = async () => {
    const token = getToken(); if (!token) return;
    if (!code || code.length < 6) { setErr("Geçerli 6 haneli kod girin."); return; }
    setBusy(true); setMsg(""); setErr("");
    try {
      await twoFactorApi.enable(token, code);
      setTwoFA(prev => ({ ...prev, enabled: true }));
      setCode("");
      setMsg("2FA etkinleştirildi.");
    } catch (e) {
      setErr(e?.message || "Kod doğrulanamadı.");
    }
    setBusy(false);
  };

  const disable2FA = async () => {
    const token = getToken(); if (!token) return;
    if (!code || code.length < 6) { setErr("Geçerli 6 haneli kod girin."); return; }
    setBusy(true); setMsg(""); setErr("");
    try {
      await twoFactorApi.disable(token, code);
      setTwoFA({ enabled: false, otpauth_url: "", secret: "" });
      setCode("");
      setMsg("2FA devre dışı bırakıldı.");
    } catch (e) {
      setErr(e?.message || "Devre dışı bırakılamadı.");
    }
    setBusy(false);
  };

  if (loading) return null;

  return (
    <div className="bg-white min-h-[60vh]">
      <section className="pt-28 pb-8 bg-work-navy-500 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold">İki Aşamalı Doğrulama</h1>
          <p className="text-blue-100 mt-2">Hesabınızı TOTP tabanlı 2FA ile koruyun.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-white border rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Durum</h2>
              <span className={`px-2 py-0.5 rounded-full text-xs ${twoFA.enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                {twoFA.enabled ? 'Aktif' : 'Pasif'}
              </span>
            </div>

            {(msg || err) && (
              <div className={`mb-4 rounded-lg px-4 py-3 text-sm border ${msg? 'bg-green-50 text-green-700 border-green-200':'bg-red-50 text-red-600 border-red-200'}`}>{msg || err}</div>
            )}

            {!twoFA.enabled ? (
              <div className="space-y-5">
                {!twoFA.otpauth_url ? (
                  <button onClick={beginSetup} disabled={busy} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark shadow disabled:opacity-60">
                    {busy ? 'Yükleniyor...' : 'QR Oluştur'}
                  </button>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <img
                        alt="2FA QR"
                        className="w-40 h-40 rounded-lg border"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(twoFA.otpauth_url)}`}
                      />
                      <div className="text-xs text-gray-600 break-all">
                        <div className="font-semibold text-gray-800 mb-1">Secret</div>
                        <div className="select-all">{twoFA.secret || '-'}</div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Authenticator Kodu</label>
                      <div className="flex gap-2">
                        <input
                          inputMode="numeric"
                          maxLength={6}
                          value={code}
                          onChange={(e)=> setCode(e.target.value.replace(/\\D/g, '').slice(0,6))}
                          className="w-32 border rounded-lg px-3 py-2"
                          placeholder="123456"
                        />
                        <button onClick={enable2FA} disabled={busy || !code || code.length < 6} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow disabled:opacity-60">
                          Etkinleştir
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-700">2FA aktif. Devre dışı bırakmak için uygulamadaki 6 haneli kodu girin.</p>
                <div className="flex gap-2">
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    value={code}
                    onChange={(e)=> setCode(e.target.value.replace(/\\D/g, '').slice(0,6))}
                    className="w-32 border rounded-lg px-3 py-2"
                    placeholder="123456"
                  />
                  <button onClick={disable2FA} disabled={busy || !code || code.length < 6} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow disabled:opacity-60">
                    Devre Dışı Bırak
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button onClick={()=>navigate('/profil')} className="px-4 py-2 rounded-lg bg-white border text-primary hover:bg-primary/5">← Profile Dön</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


