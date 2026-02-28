import { v4 as uuidv4 } from 'uuid';

const SESSION_ID_KEY = 'campaign_session_id';

/**
 * Get existing session ID or create a new one
 * @returns {string} Session ID in UUID v4 format
 */
export const getSessionId = () => {
    try {
        // Check for existing session ID in localStorage
        let sessionId = localStorage.getItem(SESSION_ID_KEY);

        if (!sessionId) {
            // Generate new UUID v4 session ID
            sessionId = uuidv4();
            localStorage.setItem(SESSION_ID_KEY, sessionId);
        }

        return sessionId;
    } catch (error) {
        // Fallback if localStorage is not available
        console.warn('localStorage not available, using temporary session ID:', error);
        return uuidv4();
    }
};

/**
 * Clear the current session ID (useful for testing)
 */
export const clearSessionId = () => {
    try {
        localStorage.removeItem(SESSION_ID_KEY);
    } catch (error) {
        console.warn('Failed to clear session ID:', error);
    }
};
