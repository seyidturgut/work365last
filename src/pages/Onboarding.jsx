import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingWizard from "../components/onboarding/OnboardingWizard";
import { useOnboarding } from "../hooks/useOnboarding";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { completeTour } = useOnboarding();

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("onboarding_ui_mode", "wizard");
  }, []);

  const handleClose = () => {
    navigate("/");
  };

  const handleComplete = async () => {
    await completeTour();
  };

  const handleGoDashboard = () => {
    navigate("/profil/detay");
  };

  return (
    <div className="work365-light min-h-[calc(100vh-80px)] saas-mesh-bg px-4 py-24">
      <OnboardingWizard
        variant="page"
        onClose={handleClose}
        onComplete={handleComplete}
        onGoDashboard={handleGoDashboard}
      />
    </div>
  );
}
