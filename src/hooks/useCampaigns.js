import { useState, useEffect, useCallback } from 'react';
import { campaignApi } from '../lib/api';
import { getSessionId } from '../utils/sessionUtils';
import { getToken } from '../lib/auth';

/**
 * Custom hook for managing campaigns
 * Handles fetching, viewing, and dismissing campaigns
 * Supports both authenticated and guest users
 * 
 * @returns {Object} Campaign state and actions
 */
export const useCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Load campaigns from API
     */
    const loadCampaigns = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken() || null;
            const sessionId = getSessionId();

            const data = await campaignApi.active(token, sessionId);

            const rawCampaigns = data?.campaigns
                ? (Array.isArray(data.campaigns) ? data.campaigns : Object.values(data.campaigns))
                : [];

            const sortedCampaigns = rawCampaigns.sort((a, b) => b.priority - a.priority);
            setCampaigns(sortedCampaigns);
        } catch (err) {
            console.error('Failed to load campaigns:', err);
            setError(err.message || 'Kampanyalar yüklenirken bir hata oluştu');
            setCampaigns([]);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Log campaign view
     * @param {number} campaignId - ID of the campaign being viewed
     */
    const handleView = useCallback(async (campaignId) => {
        try {
            const token = getToken() || null;
            const sessionId = getSessionId();

            await campaignApi.logView(campaignId, token, sessionId);
        } catch (err) {
            console.error('Failed to log campaign view:', err);
            // Don't throw error - view logging is not critical
        }
    }, []);

    /**
     * Dismiss campaign permanently
     * @param {number} campaignId - ID of the campaign to dismiss
     */
    const handleDismiss = useCallback(async (campaignId) => {
        try {
            const token = getToken() || null;
            const sessionId = getSessionId();

            await campaignApi.dismiss(campaignId, token, sessionId);

            // Remove from UI immediately
            setCampaigns(prev => prev.filter(c => c.id !== campaignId));
        } catch (err) {
            console.error('Failed to dismiss campaign:', err);
            setError(err.message || 'Kampanya kapatılırken bir hata oluştu');
            throw err;
        }
    }, []);

    // Load campaigns on mount
    useEffect(() => {
        loadCampaigns();
    }, [loadCampaigns]);

    return {
        campaigns,
        loading,
        error,
        handleView,
        handleDismiss,
        refresh: loadCampaigns,
    };
};
