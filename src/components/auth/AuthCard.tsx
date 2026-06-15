"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole, Mail, Phone, Trash2, UserRound } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import type { AuthMode } from "@/lib/auth-content";
import type { SelectedPackageSummary } from "@/lib/pricing";

type AuthCardProps = {
  initialMode: AuthMode;
  selectedPackage: SelectedPackageSummary | null;
};

type LoginFields = {
  email: string;
  password: string;
};

type SignupFields = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

type ValidationErrors = Partial<Record<keyof LoginFields | keyof SignupFields | "form", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const defaultLoginFields: LoginFields = {
  email: "",
  password: "",
};

const defaultSignupFields: SignupFields = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

export default function AuthCard({ initialMode, selectedPackage }: AuthCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loginFields, setLoginFields] = useState<LoginFields>(defaultLoginFields);
  const [signupFields, setSignupFields] = useState<SignupFields>(defaultSignupFields);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPackageVisible, setIsPackageVisible] = useState(Boolean(selectedPackage));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    setIsPackageVisible(Boolean(selectedPackage));
  }, [selectedPackage]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrors({});
    setFeedback(null);
    const nextQuery = new URLSearchParams(searchParams.toString());
    nextQuery.set("mode", nextMode);
    router.replace(`/kayit-ol?${nextQuery.toString()}`, { scroll: false });
  };

  const dismissSelectedPackage = () => {
    setIsPackageVisible(false);
    const nextQuery = new URLSearchParams(searchParams.toString());
    nextQuery.delete("company");
    nextQuery.delete("price");
    nextQuery.delete("label");
    nextQuery.delete("source");
    nextQuery.delete("term");
    nextQuery.delete("description");
    nextQuery.delete("features");
    const nextUrl = nextQuery.toString() ? `/kayit-ol?${nextQuery.toString()}` : "/kayit-ol";
    router.replace(nextUrl, { scroll: false });
  };

  const validateLogin = () => {
    const nextErrors: ValidationErrors = {};

    if (!loginFields.email.trim()) {
      nextErrors.email = "E-posta alanı zorunludur.";
    } else if (!EMAIL_PATTERN.test(loginFields.email)) {
      nextErrors.email = "Geçerli bir e-posta adresi girin.";
    }

    if (!loginFields.password) {
      nextErrors.password = "Şifre alanı zorunludur.";
    } else if (loginFields.password.length < 6) {
      nextErrors.password = "Şifre en az 6 karakter olmalıdır.";
    }

    return nextErrors;
  };

  const validateSignup = () => {
    const nextErrors: ValidationErrors = {};

    if (!signupFields.fullName.trim()) {
      nextErrors.fullName = "Ad soyad alanı zorunludur.";
    }

    if (!signupFields.phone.trim()) {
      nextErrors.phone = "Telefon alanı zorunludur.";
    }

    if (!signupFields.email.trim()) {
      nextErrors.email = "E-posta alanı zorunludur.";
    } else if (!EMAIL_PATTERN.test(signupFields.email)) {
      nextErrors.email = "Geçerli bir e-posta adresi girin.";
    }

    if (!signupFields.password) {
      nextErrors.password = "Şifre alanı zorunludur.";
    } else if (signupFields.password.length < 8) {
      nextErrors.password = "Şifre en az 8 karakter olmalıdır.";
    }

    if (!signupFields.confirmPassword) {
      nextErrors.confirmPassword = "Şifre tekrar alanı zorunludur.";
    } else if (signupFields.confirmPassword !== signupFields.password) {
      nextErrors.confirmPassword = "Şifreler birbiriyle eşleşmiyor.";
    }

    if (!signupFields.acceptedTerms) {
      nextErrors.acceptedTerms = "Devam etmek için koşulları onaylayın.";
    }

    return nextErrors;
  };

  const getSelectedPackagePayload = () => ({
    company: searchParams.get("company"),
    price: searchParams.get("price"),
    label: searchParams.get("label"),
    source: searchParams.get("source"),
    term: searchParams.get("term"),
    description: searchParams.get("description"),
    features: (() => {
      const rawFeatures = searchParams.get("features");
      if (!rawFeatures) {
        return null;
      }

      try {
        const parsed = JSON.parse(rawFeatures) as unknown;
        return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : null;
      } catch {
        return null;
      }
    })(),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = mode === "login" ? validateLogin() : validateSignup();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback(null);
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const next = searchParams.get("next");
      const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "login"
            ? {
                email: loginFields.email,
                password: loginFields.password,
                next,
                selectedPackage: getSelectedPackagePayload(),
              }
            : {
                fullName: signupFields.fullName,
                phone: signupFields.phone,
                email: signupFields.email,
                password: signupFields.password,
                next,
                selectedPackage: getSelectedPackagePayload(),
              }
        ),
      });

      const payload = (await response.json()) as { error?: string; redirectTo?: string };

      if (!response.ok) {
        setErrors({ form: payload.error || "İşlem sırasında bir hata oluştu." });
        return;
      }

      setFeedback(mode === "login" ? "Giriş tamamlandı. Panelinize yönlendiriliyorsunuz." : "Hesabınız oluşturuldu. Panel akışı başlatılıyor.");
      router.push(payload.redirectTo || "/panel");
      router.refresh();
    } catch {
      setErrors({ form: "İşlem sırasında beklenmeyen bir hata oluştu." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google ile giriş geçici olarak devre dışı bırakıldı (daha sonra gerçek OAuth ile eklenecek).

  return (
    <div className="mx-auto flex h-full w-full max-w-[760px] flex-col rounded-[32px] border border-black/8 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-7 lg:min-h-[calc(100vh-48px)] lg:p-8">
      <div className="mb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#F8FAFC] px-4 py-2.5 text-[13px] font-bold text-[#0F172A] transition-colors hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Ana Sayfaya Dön
        </Link>
      </div>

      <div className="mb-5">
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
          <Image src="/LOGO-END.svg" alt="Work365" width={150} height={40} className="h-10 w-auto" />
          <h2 className="text-[30px] font-bold tracking-[-0.04em] text-[#0F172A] sm:text-[34px]">
            Hoş Geldiniz
          </h2>
        </div>
        <p className="mt-3 text-center text-[15px] leading-7 text-[#64748B] sm:text-[16px]">
          Work365 ile şirket kuruluşunu, dijital altyapınızı ve ilk operasyon adımlarınızı tek akışta yönetin.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 rounded-full bg-[#EEF3F8] p-1">
        {[
          { key: "login", label: "Giriş Yap" },
          { key: "signup", label: "Üye Ol" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => switchMode(tab.key as AuthMode)}
            className={`rounded-full px-4 py-2.5 text-[15px] font-bold transition-all duration-200 ${
              mode === tab.key
                ? "bg-[#1B98D5] text-white shadow-[0_8px_20px_rgba(27,152,213,0.28)]"
                : "text-[#4B5563] hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {selectedPackage && isPackageVisible ? (
        <div className="mb-3 rounded-[16px] border border-[#D9E6F2] bg-[#F7FBFF] px-3.5 py-2.5">
          <div className="flex items-center justify-between gap-2.5">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1B98D5]">
                Seçtiğiniz Paket
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <p className="truncate text-[14px] font-bold text-[#0F172A]">{selectedPackage.company}</p>
                <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#0F172A] ring-1 ring-black/6">
                  {selectedPackage.priceLabel}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[11px] text-[#64748B]">{selectedPackage.detailLabel}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start">
              <button
                type="button"
                onClick={dismissSelectedPackage}
                aria-label="Seçilen paketi kaldır"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#64748B] ring-1 ring-black/6 transition-colors hover:text-[#DC2626]"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Google ile Giriş geçici olarak kaldırıldı — daha sonra geri eklenecek. */}

        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Field
                label="E-posta"
                icon={<Mail className="h-4 w-4" />}
                type="email"
                placeholder="ornek@marka.com"
                value={loginFields.email}
                error={errors.email}
                onChange={(value) => setLoginFields((current) => ({ ...current, email: value }))}
              />
              <Field
                label="Şifre"
                icon={<LockKeyhole className="h-4 w-4" />}
                type="password"
                placeholder="Şifrenizi girin"
                value={loginFields.password}
                error={errors.password}
                onChange={(value) => setLoginFields((current) => ({ ...current, password: value }))}
              />

              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#64748B]">Demo akışta şifre sıfırlama bağlı değil.</span>
                <button type="button" className="font-bold text-[#1B98D5] transition-opacity hover:opacity-75">
                  Şifremi Unuttum
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Ad Soyad"
                  icon={<UserRound className="h-4 w-4" />}
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={signupFields.fullName}
                  error={errors.fullName}
                  onChange={(value) => setSignupFields((current) => ({ ...current, fullName: value }))}
                />
                <Field
                  label="Telefon"
                  icon={<Phone className="h-4 w-4" />}
                  type="tel"
                  placeholder="05xx xxx xx xx"
                  value={signupFields.phone}
                  error={errors.phone}
                  onChange={(value) => setSignupFields((current) => ({ ...current, phone: value }))}
                />
              </div>
              <Field
                label="E-posta"
                icon={<Mail className="h-4 w-4" />}
                type="email"
                placeholder="kurucu@marka.com"
                value={signupFields.email}
                error={errors.email}
                onChange={(value) => setSignupFields((current) => ({ ...current, email: value }))}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Şifre"
                  icon={<LockKeyhole className="h-4 w-4" />}
                  type="password"
                  placeholder="En az 8 karakter"
                  value={signupFields.password}
                  error={errors.password}
                  onChange={(value) => setSignupFields((current) => ({ ...current, password: value }))}
                />
                <Field
                  label="Şifre Tekrar"
                  icon={<LockKeyhole className="h-4 w-4" />}
                  type="password"
                  placeholder="Şifrenizi tekrar girin"
                  value={signupFields.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={(value) => setSignupFields((current) => ({ ...current, confirmPassword: value }))}
                />
              </div>

              <label className="flex items-start gap-3 rounded-[20px] border border-[#DCE4EC] bg-[#F8FBFD] px-4 py-3.5 text-[14px] text-[#475569]">
                <input
                  type="checkbox"
                  checked={signupFields.acceptedTerms}
                  onChange={(event) =>
                    setSignupFields((current) => ({ ...current, acceptedTerms: event.target.checked }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-[#C7D2DA] text-[#1B98D5] focus:ring-[#1B98D5]"
                />
                <span>
                  <span className="font-semibold text-[#0F172A]">KVKK ve kullanım koşullarını</span> okudum,
                  Work365 demo hesabı oluşturmaya onay veriyorum.
                </span>
              </label>
              {errors.acceptedTerms ? (
                <p className="mt-2 text-[13px] font-medium text-[#DC2626]">{errors.acceptedTerms}</p>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {errors.form ? <p className="text-[13px] font-medium text-[#DC2626]">{errors.form}</p> : null}

        {feedback ? (
          <div className="rounded-[20px] border border-[#BDE7D1] bg-[#F1FBF6] px-4 py-4 text-[14px] text-[#166534]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{feedback}</p>
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-[18px] bg-[#0F172A] px-5 py-3.5 text-[15px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-black"
        >
          {isSubmitting ? "İşleniyor..." : mode === "login" ? "Giriş Yap" : "Ücretsiz Hesap Oluştur"}
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="border-t border-[#E2E8F0] pt-4 text-[14px] text-[#64748B]">
          <p>
            Sorun mu yaşıyorsunuz?{" "}
            <Link href="/hizmet-sartlari/para-iade-kosullari" className="font-bold text-[#1B98D5] hover:opacity-75">
              Yardım Alın
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-5">
            <Link href="#" className="transition-colors hover:text-black">
              KVKK
            </Link>
            <Link
              href="/hizmet-sartlari/para-iade-kosullari"
              className="transition-colors hover:text-black"
            >
              Para İade Koşulları
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  icon: ReactNode;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function Field({ label, icon, type, placeholder, value, error, onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-bold text-[#111827]">{label}</span>
      <div
        className={`flex items-center gap-3 rounded-[16px] border bg-white px-4 py-2.5 transition-shadow focus-within:shadow-[0_0_0_4px_rgba(27,152,213,0.12)] ${
          error ? "border-[#FCA5A5]" : "border-[#D7DFE8]"
        }`}
      >
        <span className="text-[#94A3B8]">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full border-none bg-transparent text-[15px] text-[#0F172A] outline-none placeholder:text-[#9CA3AF]"
        />
      </div>
      {error ? <p className="mt-2 text-[13px] font-medium text-[#DC2626]">{error}</p> : null}
    </label>
  );
}
