import React, { useEffect, useRef, useState } from 'react';

/**
 * CampaignBanner Component
 * Displays campaign as a premium sticky banner with dark gradient optimization.
 * 
 * @param {Object} props
 * @param {Object} props.campaign - Campaign data
 * @param {Function} props.onView - Callback when banner is viewed
 * @param {Function} props.onDismiss - Callback when banner is dismissed
 */
export const CampaignBanner = ({ campaign, onView, onDismiss }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [viewLogged, setViewLogged] = useState(false);
    const bannerRef = useRef(null);

    // Intersection Observer for view tracking
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !viewLogged) {
                        onView(campaign.id);
                        setViewLogged(true);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (bannerRef.current) observer.observe(bannerRef.current);

        return () => observer.disconnect();
    }, [viewLogged, campaign.id, onView]);

    const handleDismiss = async (e) => {
        e.stopPropagation();
        try {
            await onDismiss(campaign.id);
            setIsVisible(false);
        } catch (err) {
            console.error('Dismiss failed:', err);
            setIsVisible(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={bannerRef}
            className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-gray-900 via-primary-dark to-primary border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]"
            role="banner"
            aria-label="Kampanya duyurusu"
        >
            <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Content Section */}
                    <div className="flex items-center gap-4 flex-1 w-full sm:w-auto overflow-hidden">
                        {/* Image */}
                        {campaign.banner_url && (
                            <div className="w-16 h-16 shrink-0 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                                <img
                                    src={campaign.banner_url}
                                    alt=""
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}

                        {/* Text */}
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3 flex-wrap mb-0.5">
                                <h3 className="text-white font-bold text-base sm:text-lg truncate">
                                    {campaign.title}
                                </h3>
                                {/* Codes */}
                                {campaign.discount_codes?.map(code => (
                                    <span
                                        key={code.id}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-white/10 ring-1 ring-white/20 text-white backdrop-blur-sm"
                                    >
                                        {code.code}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-300 text-sm line-clamp-1 sm:line-clamp-2">
                                {campaign.description}
                            </p>
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center gap-3 w-full sm:w-auto mt-1 sm:mt-0 justify-end">
                        {campaign.can_dismiss && (
                            <button
                                onClick={handleDismiss}
                                className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-2"
                                aria-label="Kapat"
                                title="Kapat"
                            >
                                <span className="text-sm font-medium">Kapat</span>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
