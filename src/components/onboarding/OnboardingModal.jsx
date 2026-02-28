import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useOnboarding } from "../../hooks/useOnboarding";
import OnboardingWizard from "./OnboardingWizard";

export default function OnboardingModal() {
  const { user } = useAuth();
  const { showTour, loading, completeTour, skipTour } = useOnboarding();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("onboarding_ui_mode", "wizard");
  }, []);

  const open = Boolean(user && !loading && showTour && location.pathname !== "/onboarding");

  const handleClose = () => {
    skipTour();
  };

  const handleComplete = async () => {
    await completeTour();
  };

  const handleGoDashboard = () => {
    navigate("/profil/detay");
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Work365 onboarding sihirbazı"
        >
          <div className="absolute inset-0 bg-[#020712]/78 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="relative z-10 w-full"
          >
            <OnboardingWizard
              variant="modal"
              onClose={handleClose}
              onComplete={handleComplete}
              onGoDashboard={handleGoDashboard}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
