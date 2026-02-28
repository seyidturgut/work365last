import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { customerApi, twoFactorApi } from "../lib/api";
import { getToken } from "../lib/auth";
import { FaUserShield, FaUserEdit, FaListAlt } from "react-icons/fa";

export default function Profil() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    tax_number: "",
    billing_email: "",
    billing_address: "",
    billing_city: "",
    billing_country: "",
    billing_postal_code: "",
    extra: {},
  });
  const [activities, setActivities] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveErr, setSaveErr] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const [pwd, setPwd] = useState({ current_password: "", password: "", password_confirmation: "" });
  const [active, setActive] = useState('overview');
  const [toast, setToast] = useState({ show: false, text: '', type: 'success' });
  const [twoFA, setTwoFA] = useState({ enabled: false, otpauth_url: "", secret: "" });
  const [twoFACode, setTwoFACode] = useState("");
  const [twoFALoading, setTwoFALoading] = useState(false);

  const showToast = (text, type = 'success') => {
    setToast({ show: true, text, type });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2000);
  };
  const [badges, setBadges] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarMsg, setAvatarMsg] = useState("");
  const [avatarErr, setAvatarErr] = useState("");
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [externalLoginLoading, setExternalLoginLoading] = useState(false);

  const formatDateTR = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d);
    } catch {
      return iso;
    }
  };

  const actionWidgets = [
    {
      key: "overview",
      title: "Genel Bakış",
      description: "Aktiviteler ve rozetler",
      icon: FaListAlt,
      gradient: "from-blue-600 via-blue-500 to-indigo-500",
      onClick: () => setActive("overview"),
    },
    {
      key: "security",
      title: "Güvenlik",
      description: "Şifre ve 2FA ayarları",
      icon: FaUserShield,
      gradient: "from-emerald-500 via-teal-500 to-emerald-400",
      onClick: () => setActive("security"),
    },
    {
      key: "detail",
      title: "Şirket Kurulum Paneli",
      description: "Şirket kurulum ve yönetim dashboard'u",
      icon: FaUserEdit,
      gradient: "from-amber-500 via-orange-500 to-pink-500",
      onClick: () => navigate("/profil/detay"),
    },
  ];

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (!token) return;
      try {
        if (user?.avatar_url) setAvatarUrl(user.avatar_url);
        const details = await customerApi.details(token);
        const data = (details && (details.data || details)) || {};
        setProfile({
          name: data.name || user?.name || "",
          email: data.email || user?.email || "",
          phone: (data.phone ?? data.phone_number ?? data.gsm ?? user?.phone ?? ""),
          company_name: data.company_name || user?.company_name || "",
          tax_number: data.tax_number || "",
          billing_email: data.billing_email || data.email || "",
          billing_address: data.billing_address || "",
          billing_city: data.billing_city || "",
          billing_country: data.billing_country || "",
          billing_postal_code: data.billing_postal_code || "",
          extra: data.extra || {},
        });
        if (data.avatar_url) setAvatarUrl(data.avatar_url);
        const tfEnabled = !!(data.two_factor_enabled || data.twoFactorEnabled || data?.security?.two_factor_enabled || user?.two_factor_enabled || user?.twoFactorEnabled);
        setTwoFA((prev) => ({ ...prev, enabled: tfEnabled }));
        const acts = await customerApi.activities(token);
        setActivities((acts && (acts.data || acts)) || []);
        try {
          const mine = await customerApi.myBadges(token);
          setBadges((mine && (mine.data || mine)) || []);
        } catch { }
      } catch { }
    })();
  }, [user]);

  return (
    <div className="bg-white min-h-[60vh]">
      <section className="pt-28 pb-0 bg-work-navy-500 text-white">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold">Profil</h1>
            <p className="text-blue-100 mt-2">Hesap bilgilerinizi görüntüleyin ve kişiselleştirin.</p>
          </div>

          <div className="relative -mb-16" data-tour="profile-page-content">
            <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-primary to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(600px_200px_at_10%_-20%,white,transparent)]" />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(600px_200px_at_90%_120%,white,transparent)]" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }} className="relative -mt-14 md:-mt-16">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary via-blue-500 to-indigo-500 blur opacity-30 animate-pulse" />
                      <img src={avatarUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(profile.name || "Kullanıcı")}`} alt={profile.name} className="relative w-20 h-20 rounded-2xl ring-4 ring-white shadow-lg bg-white object-cover" />
                    </motion.div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">{profile.name || "—"}</div>
                      <div className="text-sm text-text-light">{profile.email || "—"}</div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <input id="avatar-input" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden" onChange={async (e) => {
                      const file = e.target.files && e.target.files[0];
                      if (!file) return;
                      setAvatarMsg(""); setAvatarErr(""); setAvatarUploading(true);
                      try {
                        const token = getToken();
                        if (!token) throw new Error("Oturum bulunamadı");
                        const res = await customerApi.uploadAvatar(token, file);
                        const url = res?.url || res?.data?.url;
                        if (url) setAvatarUrl(url);
                        setAvatarMsg("Avatar güncellendi.");
                      } catch (er) {
                        setAvatarErr(er?.message || "Avatar yüklenemedi.");
                      }
                      setAvatarUploading(false);
                    }} />
                    <button onClick={() => document.getElementById('avatar-input').click()} disabled={avatarUploading} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark shadow disabled:opacity-60">{avatarUploading ? 'Yükleniyor...' : 'Avatar Değiştir'}</button>
                    <a
                      href="/api/customer/external-login"
                      onClick={async (e) => {
                        e.preventDefault();
                        const token = getToken();
                        if (!token) {
                          showToast("Oturum bulunamadı", 'error');
                          return;
                        }
                        setExternalLoginLoading(true);
                        try {
                          const res = await customerApi.externalLogin(token);
                          if (res?.success) {
                            const externalToken = res?.external_token || res?.data?.external_token;
                            const redirectUrl = res?.redirect_url || res?.data?.redirect_url;

                            if (redirectUrl) {
                              let finalUrl = redirectUrl;
                              if (externalToken) {
                                const urlObj = new URL(redirectUrl);
                                urlObj.searchParams.set('token', externalToken);
                                finalUrl = urlObj.toString();
                              }
                              window.open(finalUrl, '_blank');
                              setExternalLoginLoading(false);
                            } else {
                              showToast("Yönlendirme URL'i alınamadı", 'error');
                              setExternalLoginLoading(false);
                            }
                          } else {
                            const errorMessage = res?.message || "Şirket yönetim paneline bağlanılamadı";
                            showToast(errorMessage, 'error');
                            setExternalLoginLoading(false);
                          }
                        } catch (er) {
                          const errorMessage = er?.data?.message || er?.message || "Şirket yönetim paneline bağlanılamadı";
                          showToast(errorMessage, 'error');
                          setExternalLoginLoading(false);
                        }
                      }}
                      className={`px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark shadow flex items-center gap-2 ${externalLoginLoading ? 'opacity-60 pointer-events-none' : ''}`}
                    >
                      {externalLoginLoading ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          <span>Yönlendiriliyor...</span>
                        </>
                      ) : (
                        <>
                          <span>🏢</span>
                          <span>Ön Muhasebe Paneline Git</span>
                        </>
                      )}
                    </a>
                  </div>
                </div>
                {(avatarMsg || avatarErr) && (
                  <div className={`mt-3 rounded-lg px-4 py-3 text-sm border ${avatarMsg ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>{avatarMsg || avatarErr}</div>
                )}

                {toast.show && (
                  <div className={`fixed bottom-6 right-6 z-[70] px-4 py-3 rounded-xl shadow-lg border text-sm ${toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
                    {toast.text}
                  </div>
                )}

                <div className="mt-6 grid sm:grid-cols-3 gap-4">
                  <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }} className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-200/50 shadow-sm">
                    <div className="text-xs font-medium text-black">Telefon</div>
                    <div className="font-semibold text-black mt-1">{profile.phone || '—'}</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }} className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-200/50 shadow-sm">
                    <div className="text-xs font-medium text-black">Şirket</div>
                    <div className="font-semibold text-black mt-1">{profile.company_name || '—'}</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }} className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-200/50 shadow-sm">
                    <div className="text-xs font-medium text-black">Üyelik</div>
                    <div className="font-semibold text-primary mt-1">Standart</div>
                  </motion.div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-24 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {actionWidgets.map((widget) => (
              <motion.button
                key={widget.key}
                onClick={widget.onClick}
                whileHover={{ y: -4 }}
                className={`rounded-2xl bg-gradient-to-br ${widget.gradient} p-5 text-left transition flex items-center gap-4 text-white ${widget.key === active
                  ? "ring-4 ring-white/80 shadow-[0_12px_45px_rgba(0,0,0,0.35)] scale-[1.01]"
                  : "opacity-85 hover:opacity-100 shadow-lg"
                  }`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center text-xl shadow">
                  <widget.icon />
                </div>
                <div>
                  <p className="text-base font-semibold">{widget.title}</p>
                  <p className="text-xs text-white/80">{widget.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8 pb-12">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <AnimatePresence mode="wait">
              {active === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-white to-blue-50/30 border rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Aktivite Özeti</h3>
                    <div className="space-y-4 text-sm">
                      {(activities || []).slice(0, 6).map((a, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} className="flex items-start gap-3">
                          <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-blue-500"></span>
                          <div>
                            <div className="text-gray-800 font-medium">{a.summary || a.title || a.type || 'Aktivite'}</div>
                            <div className="text-gray-500 text-xs mt-0.5">{formatDateTR(a.created_at)}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-white to-blue-50/30 border rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Rozetler</h3>
                    <div className="flex flex-wrap gap-2">
                      {(badges || []).map((b) => (
                        <motion.span key={b.id || b.key} whileHover={{ scale: 1.06 }} className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/15 to-blue-500/15 text-primary font-medium text-sm border border-primary/30 shadow-sm" title={b.description || ''}>{b.title || b.key}</motion.span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}

              {active === 'security' && (
                <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-white to-blue-50/30 border rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Şifreyi Güncelle</h3>
                    {pwdMsg && (
                      <div className="mb-4 rounded-lg border border-green-200 bg-green-50 text-green-700 px-4 py-3 text-sm">{pwdMsg}</div>
                    )}
                    {pwdErr && (
                      <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-600 px-4 py-3 text-sm">{pwdErr}</div>
                    )}
                    <div className="space-y-3">
                      <div className="relative">
                        <input value={pwd.current_password} onChange={(e) => setPwd({ ...pwd, current_password: e.target.value })} className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm" placeholder=" " type="password" />
                        <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">Mevcut Şifre</label>
                      </div>
                      <div className="relative">
                        <input value={pwd.password} onChange={(e) => setPwd({ ...pwd, password: e.target.value })} className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm" placeholder=" " type="password" />
                        <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">Yeni Şifre</label>
                      </div>
                      <div className="relative">
                        <input value={pwd.password_confirmation} onChange={(e) => setPwd({ ...pwd, password_confirmation: e.target.value })} className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm" placeholder=" " type="password" />
                        <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">Yeni Şifre (Tekrar)</label>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <button
                        disabled={pwdSaving}
                        onClick={async () => {
                          const token = getToken();
                          if (!token) return;
                          setPwdSaving(true);
                          setPwdMsg("");
                          setPwdErr("");
                          try {
                            await customerApi.updatePassword(token, pwd);
                            setPwd({ current_password: "", password: "", password_confirmation: "" });
                            setPwdMsg("Şifre başarıyla güncellendi.");
                            showToast("Şifre güncellendi", 'success');
                          } catch (e) {
                            const m = e?.message || "Şifre güncellenemedi.";
                            setPwdErr(m);
                            showToast(m, 'error');
                          }
                          setPwdSaving(false);
                        }}
                        className="px-6 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-dark shadow disabled:opacity-60"
                      >{pwdSaving ? 'Kaydediliyor...' : 'Şifreyi Kaydet'}</button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-white to-blue-50/30 border rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Güvenlik</h3>
                    <div className="space-y-5 text-sm">
                      <div className="flex items-center justify-between text-gray-800">
                        <span className="font-medium">İki Aşamalı Doğrulama (TOTP)</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${twoFA.enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                          {twoFA.enabled ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>

                      {!twoFA.enabled ? (
                        <div className="rounded-xl border p-4 bg-white">
                          <p className="text-gray-700 mb-3">Google Authenticator veya benzeri bir uygulama ile 2FA kurmak için QR kodu oluşturun.</p>
                          {twoFA.otpauth_url ? (
                            <div className="flex items-center gap-4">
                              <img
                                alt="2FA QR"
                                className="w-36 h-36 rounded-lg border"
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(twoFA.otpauth_url)}`}
                              />
                              <div className="text-xs text-gray-600 break-all">
                                <div className="font-semibold text-gray-800 mb-1">Secret</div>
                                <div className="select-all">{twoFA.secret || '-'}</div>
                              </div>
                            </div>
                          ) : (
                            <button
                              disabled={twoFALoading}
                              onClick={async () => {
                                const token = getToken(); if (!token) return;
                                setTwoFALoading(true);
                                try {
                                  const res = await twoFactorApi.setup(token);
                                  const data = res?.data || res || {};
                                  setTwoFA({ enabled: false, otpauth_url: data.otpauth_url || "", secret: data.secret || "" });
                                  setToast({ show: true, text: '2FA kurulumu başlatıldı', type: 'success' });
                                } catch (e) {
                                  setToast({ show: true, text: e?.message || '2FA kurulumu başlatılamadı', type: 'error' });
                                }
                                setTwoFALoading(false);
                              }}
                              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark shadow disabled:opacity-60"
                            >{twoFALoading ? 'Yükleniyor...' : 'QR Oluştur'}</button>
                          )}
                          {twoFA.otpauth_url && (
                            <div className="mt-4">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Authenticator Kodu</label>
                              <div className="flex gap-2">
                                <input
                                  inputMode="numeric"
                                  maxLength={6}
                                  value={twoFACode}
                                  onChange={(e) => setTwoFACode(e.target.value.replace(/\\D/g, '').slice(0, 6))}
                                  className="w-32 border rounded-lg px-3 py-2"
                                  placeholder="123456"
                                />
                                <button
                                  disabled={twoFALoading || !twoFACode || twoFACode.length < 6}
                                  onClick={async () => {
                                    const token = getToken(); if (!token) return;
                                    setTwoFALoading(true);
                                    try {
                                      await twoFactorApi.enable(token, twoFACode);
                                      setTwoFA(prev => ({ ...prev, enabled: true }));
                                      setTwoFACode("");
                                      setToast({ show: true, text: '2FA etkinleştirildi', type: 'success' });
                                    } catch (e) {
                                      setToast({ show: true, text: e?.message || 'Kod doğrulanamadı', type: 'error' });
                                    }
                                    setTwoFALoading(false);
                                  }}
                                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow disabled:opacity-60"
                                >Etkinleştir</button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="rounded-xl border p-4 bg-white">
                          <p className="text-gray-700 mb-3">2FA aktif. Devre dışı bırakmak için uygulamanızdaki kodu girin.</p>
                          <div className="flex gap-2">
                            <input
                              inputMode="numeric"
                              maxLength={6}
                              value={twoFACode}
                              onChange={(e) => setTwoFACode(e.target.value.replace(/\\D/g, '').slice(0, 6))}
                              className="w-32 border rounded-lg px-3 py-2"
                              placeholder="123456"
                            />
                            <button
                              disabled={twoFALoading || !twoFACode || twoFACode.length < 6}
                              onClick={async () => {
                                const token = getToken(); if (!token) return;
                                setTwoFALoading(true);
                                try {
                                  await twoFactorApi.disable(token, twoFACode);
                                  setTwoFA({ enabled: false, otpauth_url: "", secret: "" });
                                  setTwoFACode("");
                                  setToast({ show: true, text: '2FA devre dışı bırakıldı', type: 'success' });
                                } catch (e) {
                                  setToast({ show: true, text: e?.message || 'Devre dışı bırakılamadı', type: 'error' });
                                }
                                setTwoFALoading(false);
                              }}
                              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow disabled:opacity-60"
                            >Devre Dışı Bırak</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


