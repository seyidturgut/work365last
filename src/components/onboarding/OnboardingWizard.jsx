import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaBuilding,
  FaCheck,
  FaCheckCircle,
  FaGlobeAmericas,
  FaListAlt,
  FaRegSmile,
  FaTasks,
  FaTimes,
  FaUserTie,
} from "react-icons/fa";

import StepWelcome from "./steps/StepWelcome";
import StepBusinessType from "./steps/StepBusinessType";
import StepJurisdiction from "./steps/StepJurisdiction";
import StepServices from "./steps/StepServices";
import StepPersonalDetails from "./steps/StepPersonalDetails";
import StepReview from "./steps/StepReview";
import StepSuccess from "./steps/StepSuccess";
import SecurityBadges from "../conversion/SecurityBadges";
import WizardSidePanel from "./WizardSidePanel";

const DRAFT_KEY = "work365_onboarding_draft_v1";

const COUNTRIES = [
  "Turkey",
  "United States",
  "United Kingdom",
  "Germany",
  "Netherlands",
  "Estonia",
  "Singapore",
  "United Arab Emirates",
  "Canada",
  "Spain",
  "Portugal",
  "France",
  "Italy",
];

const STEP_META = [
  { id: "welcome", label: "Welcome", icon: FaRegSmile },
  { id: "business", label: "Business", icon: FaBuilding },
  { id: "jurisdiction", label: "Jurisdiction", icon: FaGlobeAmericas },
  { id: "services", label: "Services", icon: FaTasks },
  { id: "details", label: "Details", icon: FaUserTie },
  { id: "review", label: "Review", icon: FaListAlt },
  { id: "success", label: "Success", icon: FaCheckCircle },
];

const defaultData = {
  businessType: "",
  jurisdiction: "",
  services: [],
  personal: {
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
  },
};

function validatePersonal(data) {
  const errors = {};
  if (!data.fullName?.trim() || data.fullName.trim().length < 2) {
    errors.fullName = "Lütfen geçerli bir ad soyad girin.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email || "")) {
    errors.email = "Geçerli bir e-posta adresi girin.";
  }
  const digits = (data.phone || "").replace(/\D/g, "");
  if (digits.length < 10) {
    errors.phone = "Telefon numarası en az 10 hane olmalı.";
  }
  if (!data.companyName?.trim()) {
    errors.companyName = "Şirket adını girin.";
  }
  return errors;
}

function estimatePricePreview(data) {
  const businessBase = data.businessType === "global" ? 169 : data.businessType === "llc" ? 129 : 89;
  const servicesAdd = data.services.length * 24;
  const monthly = businessBase + servicesAdd;
  return {
    monthly,
    yearly: Math.round(monthly * 10.4),
  };
}

export default function OnboardingWizard({
  variant = "modal",
  onClose,
  onComplete,
  onGoDashboard,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(defaultData);
  const [jurisdictionSearch, setJurisdictionSearch] = useState("");
  const [stepError, setStepError] = useState("");
  const [personalErrors, setPersonalErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState("saved");
  const [completing, setCompleting] = useState(false);
  const [errorTick, setErrorTick] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const draft = localStorage.getItem(DRAFT_KEY);
    if (!draft) return;
    try {
      const parsed = JSON.parse(draft);
      setFormData((prev) => ({ ...prev, ...parsed }));
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (currentStep === 0 || currentStep === STEP_META.length - 1) return;

    setSaveStatus("saving");
    const timeout = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
      setSaveStatus("saved");
    }, 600);

    return () => clearTimeout(timeout);
  }, [formData, currentStep]);

  const countries = useMemo(() => {
    const query = jurisdictionSearch.trim().toLowerCase();
    if (!query) return COUNTRIES;
    return COUNTRIES.filter((country) => country.toLowerCase().includes(query));
  }, [jurisdictionSearch]);

  const pricePreview = useMemo(() => estimatePricePreview(formData), [formData]);

  const progress = (currentStep / (STEP_META.length - 1)) * 100;

  const setBusinessType = (businessType) => {
    setFormData((prev) => ({ ...prev, businessType }));
  };

  const setJurisdiction = (jurisdiction) => {
    setFormData((prev) => ({ ...prev, jurisdiction }));
  };

  const toggleService = (serviceId) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceId);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((service) => service !== serviceId)
          : [...prev.services, serviceId],
      };
    });
  };

  const setPersonalField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
    setPersonalErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const nextLabel = currentStep === 5 ? "Onboarding'i Tamamla" : "Devam Et";
  const showErrorFeedback = Boolean(stepError);
  const showNavigation = currentStep > 0 && currentStep < 6;
  const triggerStepError = (message) => {
    setStepError(message);
    setErrorTick((prev) => prev + 1);
  };

  const validateStep = () => {
    if (currentStep === 1 && !formData.businessType) {
      triggerStepError("Lütfen bir işletme tipi seçin.");
      return false;
    }
    if (currentStep === 2 && !formData.jurisdiction) {
      triggerStepError("Lütfen bir ülke seçin.");
      return false;
    }
    if (currentStep === 3 && !formData.services.length) {
      triggerStepError("Lütfen en az bir hizmet seçin.");
      return false;
    }
    if (currentStep === 4) {
      const errors = validatePersonal(formData.personal);
      setPersonalErrors(errors);
      if (Object.keys(errors).length) {
        triggerStepError("Lütfen kişisel bilgi alanlarını kontrol edin.");
        return false;
      }
    }
    setStepError("");
    return true;
  };

  const goNext = async () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }

    if (!validateStep()) return;

    if (currentStep === 5) {
      setCompleting(true);
      try {
        await onComplete?.(formData);
      } finally {
        setCompleting(false);
      }
      if (typeof window !== "undefined") {
        localStorage.removeItem(DRAFT_KEY);
      }
      setCurrentStep(6);
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, STEP_META.length - 1));
  };

  const goBack = () => {
    setStepError("");
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
    setStepError("");
  };

  const handleClose = () => {
    onClose?.();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepWelcome onStart={goNext} />;
      case 1:
        return <StepBusinessType value={formData.businessType} onChange={setBusinessType} error={stepError} />;
      case 2:
        return (
          <StepJurisdiction
            value={formData.jurisdiction}
            search={jurisdictionSearch}
            countries={countries}
            onSearch={setJurisdictionSearch}
            onChange={setJurisdiction}
            error={stepError}
          />
        );
      case 3:
        return <StepServices values={formData.services} onToggle={toggleService} error={stepError} />;
      case 4:
        return (
          <StepPersonalDetails
            values={formData.personal}
            errors={personalErrors}
            saveStatus={saveStatus}
            onChange={setPersonalField}
          />
        );
      case 5:
        return <StepReview data={formData} pricePreview={pricePreview} onEdit={goToStep} />;
      case 6:
        return <StepSuccess onGoDashboard={onGoDashboard} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative w-full ${variant === "modal"
          ? "work365-light onboarding-motion max-w-5xl rounded-3xl border border-white/20 bg-[#071228]/90 p-5 md:p-7 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
          : "work365-light onboarding-motion mx-auto max-w-6xl rounded-3xl border border-white/20 bg-[#071228]/85 p-5 md:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
        }`}
    >
      {variant === "modal" && onClose ? (
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 rounded-lg border border-white/15 bg-white/10 p-2 text-slate-200 transition hover:bg-white/20 hover:-translate-y-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071228]"
          aria-label="Onboarding kapat"
        >
          <FaTimes />
        </button>
      ) : null}

      <div className="mb-6 space-y-4">
        <div className="h-2 overflow-hidden rounded-full bg-slate-800/80">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 120, damping: 28, mass: 0.6 }
            }
            className="h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-purple-400"
          />
        </div>

        <div className="grid grid-cols-4 gap-2 md:grid-cols-7">
          {STEP_META.map((step, index) => {
            const Icon = step.icon;
            const active = index === currentStep;
            const complete = index < currentStep;

            return (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  aria-label={`Step ${index + 1}: ${step.label}${active ? " (active)" : complete ? " (completed)" : ""}`}
                  aria-current={active ? "step" : undefined}
                  role="img"
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs ${complete
                      ? "border-emerald-300/50 bg-emerald-500/25 text-emerald-200"
                      : active
                        ? "border-primary/50 bg-primary/25 text-white"
                        : "border-white/15 bg-white/5 text-slate-300"
                    }`}
                >
                  {complete ? <FaCheck /> : <Icon />}
                </div>
                <span className={`hidden text-[11px] font-semibold uppercase tracking-wide md:inline ${active ? "text-white" : "text-slate-400"}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_272px]">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentStep}-${errorTick}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                    opacity: 1,
                    y: 0,
                    x: showErrorFeedback ? [0, -3, 3, -2, 2, 0] : 0,
                  }
              }
              exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
              className={`min-h-[360px] rounded-2xl border bg-slate-950/30 p-5 md:p-7 transition-shadow ${showErrorFeedback
                  ? "border-red-300/45 shadow-[0_0_0_1px_rgba(252,165,165,0.25),0_0_22px_rgba(248,113,113,0.16)]"
                  : "border-white/10"
                }`}
              aria-live="polite"
              aria-relevant="additions text"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {currentStep < 6 ? (
            <SecurityBadges compact className="mt-4 justify-center md:justify-start" />
          ) : null}

          {showNavigation ? (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={goBack}
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/20 hover:-translate-y-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071228]"
                aria-label="Önceki adıma dön"
              >
                Geri
              </button>

              <div className="flex items-center gap-3">
                {stepError ? (
                  <motion.span
                    key={`err-${errorTick}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -2 }}
                    animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-red-300"
                    role="alert"
                  >
                    {stepError}
                  </motion.span>
                ) : null}
                <button
                  onClick={goNext}
                  disabled={completing}
                  className="rounded-xl border border-primary/40 bg-gradient-to-r from-[#65A30D] to-[#799B38] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(101,163,13,0.3)] transition hover:-translate-y-[1px] hover:shadow-[0_14px_28px_rgba(121,155,56,0.36)] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071228] disabled:cursor-not-allowed disabled:opacity-70"
                  aria-label={nextLabel}
                >
                  {completing ? "Tamamlanıyor..." : nextLabel}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <WizardSidePanel currentStep={currentStep} />
      </div>
    </div>
  );
}
