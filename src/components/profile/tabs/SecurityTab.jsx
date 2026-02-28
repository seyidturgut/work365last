import { useState, useEffect } from "react";
import { FaShieldAlt, FaKey, FaCheck, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { twoFactorApi } from "../../../lib/api";
import { getToken } from "../../../lib/auth";

export default function SecurityTab() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [setupData, setSetupData] = useState(null);
    const [verificationCode, setVerificationCode] = useState("");

    useEffect(() => {
        checkTwoFactorStatus();
    }, []);

    const checkTwoFactorStatus = async () => {
        const token = getToken();
        if (!token) return;

        try {
            const res = await twoFactorApi.status(token);
            const data = res?.data || res || {};
            setTwoFactorEnabled(!!(data.enabled || data.two_factor_enabled));
        } catch (e) {
            console.error("Failed to check 2FA status:", e);
            setTwoFactorEnabled(false);
        }
    };

    const handleSetup2FA = async () => {
        const token = getToken();
        if (!token) return;

        setLoading(true);
        setError("");

        try {
            const res = await twoFactorApi.setup(token);
            const data = res?.data || res || {};
            setSetupData({
                otpauth_url: data.otpauth_url || "",
                secret: data.secret || "",
                qr_code: data.qr_code || null
            });
        } catch (e) {
            setError(e?.message || "2FA kurulumu başlatılırken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleEnable2FA = async () => {
        const token = getToken();
        if (!token || !verificationCode) return;

        setLoading(true);
        setError("");

        try {
            await twoFactorApi.enable(token, verificationCode);
            setTwoFactorEnabled(true);
            setSetupData(null);
            setVerificationCode("");
            setSuccess("İki aşamalı doğrulama başarıyla etkinleştirildi.");
            setTimeout(() => setSuccess(""), 5000);
        } catch (e) {
            setError(e?.message || "Doğrulama kodu yanlış. Lütfen tekrar deneyin.");
            setTimeout(() => setError(""), 5000);
        } finally {
            setLoading(false);
        }
    };

    const handleDisable2FA = async () => {
        const token = getToken();
        if (!token || !verificationCode) return;

        setLoading(true);
        setError("");

        try {
            await twoFactorApi.disable(token, verificationCode);
            setTwoFactorEnabled(false);
            setVerificationCode("");
            setSuccess("İki aşamalı doğrulama devre dışı bırakıldı.");
            setTimeout(() => setSuccess(""), 5000);
        } catch (e) {
            setError(e?.message || "Doğrulama kodu yanlış. Lütfen tekrar deneyin.");
            setTimeout(() => setError(""), 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            key="security"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#799b38] to-[#4a6323] flex items-center justify-center shadow-lg">
                        <FaShieldAlt className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Güvenlik Ayarları</h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Hesabınızı güvende tutun
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mb-4 rounded-xl px-4 py-3 text-sm border-2 bg-red-50 text-red-800 border-red-200">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 rounded-xl px-4 py-3 text-sm border-2 bg-green-50 text-green-800 border-green-200">
                    {success}
                </div>
            )}

            <div className="space-y-6">
                {/* Two-Factor Authentication */}
                <div className="rounded-2xl border-2 border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#799b38]/10 flex items-center justify-center">
                                <FaKey className="w-6 h-6 text-[#799b38]" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900">
                                    İki Aşamalı Doğrulama (2FA)
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    Hesabınıza giriş yaparken ekstra bir güvenlik katmanı ekleyin.
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    {twoFactorEnabled ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                                            <FaCheck className="w-3 h-3" /> Etkin
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                                            <FaTimes className="w-3 h-3" /> Devre Dışı
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {!twoFactorEnabled && !setupData && (
                        <button
                            onClick={handleSetup2FA}
                            disabled={loading}
                            className="mt-4 px-6 py-2.5 rounded-xl bg-[#799b38] text-white hover:bg-[#5f7d2d] font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Yükleniyor..." : "2FA Kurulumunu Başlat"}
                        </button>
                    )}

                    {setupData && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-700 mb-4">
                                Google Authenticator veya benzeri bir uygulama ile 2FA kurmak için QR kodu oluşturun.
                            </p>
                            {setupData.otpauth_url ? (
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        alt="2FA QR"
                                        className="w-36 h-36 rounded-lg border"
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupData.otpauth_url)}`}
                                    />
                                    <div className="text-xs text-gray-600 break-all">
                                        <div className="font-semibold text-gray-800 mb-1">Secret</div>
                                        <div className="select-all">{setupData.secret || '-'}</div>
                                    </div>
                                </div>
                            ) : setupData.qr_code ? (
                                <div className="mb-4 flex justify-center">
                                    <img
                                        src={setupData.qr_code}
                                        alt="2FA QR Code"
                                        className="w-48 h-48 border rounded-lg"
                                    />
                                </div>
                            ) : null}
                            {setupData.otpauth_url && (
                                <div className="space-y-3">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Authenticator Kodu</label>
                                    <div className="flex gap-2">
                                        <input
                                            inputMode="numeric"
                                            maxLength={6}
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            placeholder="123456"
                                            className="w-32 border rounded-lg px-3 py-2 focus:border-[#799b38] focus:ring-2 focus:ring-[#799b38]/20"
                                        />
                                        <button
                                            onClick={handleEnable2FA}
                                            disabled={loading || !verificationCode || verificationCode.length < 6}
                                            className="px-4 py-2 rounded-lg bg-[#799b38] text-white hover:bg-[#5f7d2d] font-semibold shadow disabled:opacity-60"
                                        >
                                            {loading ? "Doğrulanıyor..." : "Etkinleştir"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {twoFactorEnabled && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-700 mb-4">
                                2FA aktif. Devre dışı bırakmak için uygulamanızdaki kodu girin.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="123456"
                                    className="w-32 border rounded-lg px-3 py-2 focus:border-[#799b38] focus:ring-2 focus:ring-[#799b38]/20"
                                />
                                <button
                                    onClick={handleDisable2FA}
                                    disabled={loading || !verificationCode || verificationCode.length < 6}
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold shadow disabled:opacity-60"
                                >
                                    {loading ? "İşleniyor..." : "Devre Dışı Bırak"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
