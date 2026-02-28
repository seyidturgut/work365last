import { RouterProvider } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import router from "./router";
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { OnboardingProvider } from './context/OnboardingContext';

import MaintenanceGate from './components/MaintenanceGate';
import { CampaignManager } from './components/campaigns/CampaignManager';
import Chatbot from './components/Chatbot/Chatbot';

export default function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bypassToken = urlParams.get('bypass');

    if (bypassToken) {
      localStorage.setItem('maintenance_bypass_token', bypassToken);

      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);

      if (window.location.pathname === '/maintenance') {
        window.location.href = '/';
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <OnboardingProvider>
          <CampaignManager />

          {/* Chatbot - Global */}
          <Chatbot />

          <MaintenanceGate>
            <Suspense fallback={<Loading />}>
              <RouterProvider router={router} />
            </Suspense>
          </MaintenanceGate>
        </OnboardingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
