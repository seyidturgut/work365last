import React, { useState, useEffect } from 'react';
import { useCampaigns } from '../../hooks/useCampaigns';
import { CampaignModal } from './CampaignModal';
import { CampaignBanner } from './CampaignBanner';

/**
 * CampaignManager Component
 * Main component that orchestrates all campaign displays
 * Manages both modal and banner campaigns
 */
export const CampaignManager = () => {
    const { campaigns, loading, error, handleView, handleDismiss } = useCampaigns();

    const [currentModalIndex, setCurrentModalIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    // Filter campaigns by display type
    const modalCampaigns = campaigns.filter(
        c => c.show_as === 'modal' || c.show_as === 'both'
    );

    const bannerCampaigns = campaigns.filter(
        c => c.show_as === 'banner' || c.show_as === 'both'
    );

    // Show first modal campaign after page load
    useEffect(() => {
        if (modalCampaigns.length > 0 && !loading) {
            // Delay modal display for better UX (1 second)
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [modalCampaigns.length, loading]);

    /**
     * Handle modal close
     * If there are more modal campaigns, show the next one after a delay
     */
    const handleModalClose = () => {
        setShowModal(false);

        // Check if there are more modal campaigns to show
        if (currentModalIndex < modalCampaigns.length - 1) {
            setTimeout(() => {
                setCurrentModalIndex(prev => prev + 1);
                setShowModal(true);
            }, 500); // 0.5 second delay between modals
        }
    };

    // Don't render anything while loading or if there's an error
    if (loading) return null;
    if (error) {
        console.error('Campaign error:', error);
        return null;
    }

    // No campaigns to display
    if (campaigns.length === 0) return null;

    return (
        <>
            {/* Modal Campaigns */}
            {showModal && modalCampaigns[currentModalIndex] && (
                <CampaignModal
                    campaign={modalCampaigns[currentModalIndex]}
                    onView={handleView}
                    onDismiss={handleDismiss}
                    onClose={handleModalClose}
                />
            )}

            {/* Banner Campaigns */}
            {bannerCampaigns.length > 0 && (
                <div className="campaign-banners-container">
                    {bannerCampaigns.map(campaign => (
                        <CampaignBanner
                            key={campaign.id}
                            campaign={campaign}
                            onView={handleView}
                            onDismiss={handleDismiss}
                        />
                    ))}
                </div>
            )}
        </>
    );
};
