import React, { useState, useEffect, useRef } from 'react';

/**
 * CampaignModal Component
 * Displays campaign as a modern, responsive modal with banner image, description, and discount codes.
 * 
 * @param {Object} props
 * @param {Object} props.campaign - Campaign data
 * @param {Function} props.onView - Callback when modal is viewed
 * @param {Function} props.onDismiss - Callback when campaign is dismissed
 * @param {Function} props.onClose - Callback when modal is closed
 */
export const CampaignModal = ({ campaign, onView, onDismiss, onClose }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [viewLogged, setViewLogged] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen && !viewLogged) {
            onView(campaign.id);
            setViewLogged(true);
        }
    }, [isOpen, viewLogged, campaign.id, onView]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleAnimationClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleAnimationClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            onClose();
        }, 300);
    };

    const handleDismiss = async () => {
        try {
            await onDismiss(campaign.id);
            handleAnimationClose();
        } catch (err) {
            console.error('Dismiss failed:', err);
            handleAnimationClose();
        }
    };

    const handleCopyCode = async (code) => {
        try {
            await navigator.clipboard.writeText(code);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
        } catch (err) {
            console.error('Failed to copy code:', err);
            prompt('Kopyalamak için Ctrl+C yapınız:', code);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleAnimationClose();
        }
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'
                }`}
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={handleOverlayClick}
            />

            {/* Modal Content */}
            <div
                ref={modalRef}
                className={`w-full max-w-4xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative transform transition-all duration-300 ${isClosing ? 'scale-95 translate-y-4' : 'scale-100 translate-y-0'
                    }`}
            >
                {/* Close Button - Mobile: Inside content, Desktop: Top-right hanging or inside */}
                <button
                    onClick={handleAnimationClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 md:bg-gray-100 md:hover:bg-gray-200 text-white md:text-gray-500 rounded-full transition-colors"
                    aria-label="Kapat"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Side: Image */}
                {/* Left Side: Image */}
                <div className="relative w-full md:w-2/5 h-48 md:h-auto bg-gray-100 p-0 overflow-hidden flex items-center justify-center">
                    {campaign.banner_url ? (
                        <>
                            {/* Blurry Background for fill effect */}
                            <div
                                className="absolute inset-0 bg-cover bg-center blur-md scale-110 opacity-60"
                                style={{ backgroundImage: `url(${campaign.banner_url})` }}
                            />
                            {/* Main Image - contained to show full content */}
                            <img
                                src={campaign.banner_url}
                                alt={campaign.title}
                                className="relative w-full h-full object-contain z-10"
                            />
                        </>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-primary/40 text-4xl font-bold">
                            Work365
                        </div>
                    )}

                    {/* Badge/Tag if needed */}
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-gray-100">
                        Kampanya
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-3/5 p-6 md:p-8 md:pl-10 flex flex-col justify-center">
                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                            {campaign.title}
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                            {campaign.description}
                        </p>
                    </div>

                    {/* Extra Content */}
                    {campaign.modal_content && Object.keys(campaign.modal_content).length > 0 && (
                        <div className="mb-6 bg-primary/5 rounded-xl p-4 border border-primary/20 space-y-2">
                            {Object.entries(campaign.modal_content).map(([key, value], index) => (
                                <div key={index}>
                                    <h3 className="font-semibold text-primary mb-0.5">
                                        {key}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Discount Codes */}
                    {campaign.discount_codes && campaign.discount_codes.length > 0 && (
                        <div className="space-y-3 mb-8">
                            {campaign.discount_codes.map(code => (
                                <div
                                    key={code.id}
                                    className="group flex items-center justify-between p-3 pl-4 bg-gray-50 hover:bg-white border border-gray-200 border-dashed hover:border-primary/30 rounded-xl transition-all duration-200"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 font-medium">İndirim Kodu</span>
                                        <div className="font-mono text-lg font-bold text-primary tracking-wide">
                                            {code.code}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCopyCode(code.code)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all"
                                        title="Kodu Kopyala"
                                    >
                                        <span className="text-sm font-semibold text-gray-700">Kopyala</span>
                                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {campaign.can_dismiss && (
                            <button
                                onClick={handleDismiss}
                                className="w-full px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors text-center"
                            >
                                Kapat
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <div
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-900 text-white rounded-full shadow-xl flex items-center gap-2 transition-all duration-300 pointer-events-none ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
            >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span className="text-sm font-medium">Kod panoya kopyalandı!</span>
            </div>
        </div>
    );
};
