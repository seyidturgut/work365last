import { createContext, useContext, useState, useEffect } from 'react';
import { customerApi } from '../lib/api';
import { getToken } from '../lib/auth';
import { useAuth } from './AuthContext';

export const OnboardingContext = createContext();

// Set to true to test without backend
const MOCK_MODE = false;

export const OnboardingProvider = ({ children }) => {
    const { user } = useAuth();
    const [showTour, setShowTour] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            if (MOCK_MODE) {
                const completed = localStorage.getItem('onboarding_completed');
                setShowTour(!completed);
                setLoading(false);
                return;
            }

            try {
                const token = getToken();
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await customerApi.getOnboardingStatus(token);
                if (response && !response.completed) {
                    setShowTour(true);
                }
            } catch (error) {
                console.error('Error checking onboarding status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkOnboardingStatus();
    }, [user]);

    const completeTour = async () => {
        try {
            if (MOCK_MODE) {
                localStorage.setItem('onboarding_completed', 'true');
                setShowTour(false);
                return;
            }

            const token = getToken();
            if (!token) return;

            await customerApi.completeOnboarding(token, {
                completed_at: new Date().toISOString()
            });

            setShowTour(false);
        } catch (error) {
            console.error('Error completing onboarding:', error);
            setShowTour(false);
        }
    };

    const skipTour = () => {
        setShowTour(false);
        completeTour();
    };

    const restartTour = async () => {
        try {
            localStorage.removeItem('tour_current_index');

            if (!MOCK_MODE) {
                const token = getToken();
                if (token) {
                    await customerApi.resetOnboarding(token);
                }
            }

            setShowTour(true);
        } catch (error) {
            console.error('Error restarting tour:', error);
            setShowTour(true);
        }
    };

    return (
        <OnboardingContext.Provider value={{
            showTour,
            loading,
            completeTour,
            skipTour,
            restartTour,
            setShowTour
        }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};
