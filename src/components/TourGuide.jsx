import { useEffect, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOnboarding } from '../hooks/useOnboarding';

export default function TourGuide() {
    const { user } = useAuth();
    const { showTour, completeTour, skipTour } = useOnboarding(user);
    const navigate = useNavigate();
    const location = useLocation();
    const driverObj = useRef(null);
    const isPathChanging = useRef(false);

    const steps = [
        {
            popover: {
                title: '👋 Work365\'e Hoş Geldiniz!',
                description: 'İşletmenizi büyütmek için ihtiyacınız olan tüm araçlar burada. Hadi size kısa bir tur yapalım!',
            }
        },
        {
            element: '[data-tour="logo"]',
            popover: {
                title: '🏠 Ana Sayfa',
                description: 'Logo\'ya tıklayarak her zaman ana sayfaya dönebilirsiniz.',
                side: "bottom",
                align: 'start'
            }
        },
        {
            element: '[data-tour="services"]',
            popover: {
                title: '💼 Hizmetlerimiz',
                description: 'Kurumsal danışmanlık, KOBİ çözümleri ve daha fazlası için hizmetler menüsüne göz atın.',
                side: "bottom",
                align: 'start'
            }
        },
        {
            element: '[data-tour="pricing"]',
            popover: {
                title: '💳 Fiyatlandırma',
                description: 'İşletmeniz için en uygun paketi seçin. Şeffaf fiyatlandırma, gizli ücret yok!',
                side: "bottom",
                align: 'start'
            }
        },
        {
            element: '[data-tour="resources"]',
            popover: {
                title: '📚 Kaynaklar',
                description: 'Blog yazıları, rehberler ve daha fazlası için kaynaklar bölümünü ziyaret edin.',
                side: "bottom",
                align: 'start'
            }
        },
        {
            element: '[data-tour="library"]',
            popover: {
                title: '📖 Kütüphane',
                description: 'İşletmenizi yönetmek için faydalı dokümanlar ve şablonlar burada.',
                side: "bottom",
                align: 'start'
            }
        },
        {
            element: '[data-tour="cart"]',
            popover: {
                title: '🛒 Sepet',
                description: 'Seçtiğiniz hizmetleri sepetinize ekleyin ve satın alın.',
                side: "bottom",
                align: 'start'
            }
        },
        {
            element: '[data-tour="notifications"]',
            popover: {
                title: '🔔 Bildirimler',
                description: 'Önemli güncellemeler ve hatırlatmaları buradan takip edin.',
                side: "bottom",
                align: 'start'
            }
        },
        {
            element: '[data-tour="profile-menu"]',
            popover: {
                title: '👤 Profil Menüsü',
                description: 'Hesap ayarlarınız, siparişleriniz ve daha fazlası için profil menüsüne tıklayın.',
                side: "bottom",
                align: 'start'
            }
        },
        {
            element: '[data-tour="profile-page-content"]',
            popover: {
                title: '⚙️ Profil Sayfası',
                description: 'Profil bilgilerinizi ve hesap detaylarınızı buradan yönetebilirsiniz.',
                side: "top",
                align: 'center'
            }
        },
        {
            element: '[data-tour="profile-detail-overview"]',
            popover: {
                title: '📊 Profil Detay Özeti',
                description: 'Siparişleriniz, belge talepleri, faturalar ve adreslerinizin özetini buradan görebilirsiniz.',
                side: "top",
                align: 'center'
            }
        },
        {
            element: '[data-tour="orders-tab"]',
            popover: {
                title: '📦 Siparişlerim',
                description: 'Geçmiş ve aktif siparişlerinizi bu sekmeden takip edebilirsiniz.',
                side: "bottom",
                align: 'center'
            }
        },
        {
            element: '[data-tour="pending-tab"]',
            popover: {
                title: '⏳ Yarım Kalan Başvurular',
                description: 'Tamamlanmamış şirket başvurularınıza buradan devam edebilirsiniz.',
                side: "bottom",
                align: 'center'
            }
        },
        {
            element: '[data-tour="service-requests-tab"]',
            popover: {
                title: '🔧 Hizmet Talepleri',
                description: 'Aldığınız hizmetlerin durumunu takip edebilir ve yeni hizmet talebinde bulunabilirsiniz.',
                side: "bottom",
                align: 'center'
            }
        },
        {
            element: '[data-tour="document-requests-tab"]',
            popover: {
                title: '📄 Belge Talepleri',
                description: 'Eksik belgelerinizi buradan yükleyebilir ve belge taleplerinizi görüntüleyebilirsiniz.',
                side: "bottom",
                align: 'center'
            }
        },
        {
            element: '[data-tour="invoices-tab"]',
            popover: {
                title: '🧾 Faturalar',
                description: 'Kesilen faturaları görüntüleyin, indirin ve ödeme durumunu kontrol edin.',
                side: "bottom",
                align: 'center'
            }
        },
        {
            element: '[data-tour="addresses-tab"]',
            popover: {
                title: '📍 Adresler',
                description: 'Teslimat ve fatura adreslerinizi buradan yönetebilirsiniz.',
                side: "bottom",
                align: 'center'
            }
        },
        {
            element: '[data-tour="chatbot"]',
            popover: {
                title: '🤖 CorpAi Asistan',
                description: 'Sorularınız mı var? CorpAi size 7/24 yardımcı olmaya hazır! KDV hesaplama, vergi danışmanlığı ve daha fazlası...',
                side: "left",
                align: 'center'
            }
        },
        {
            popover: {
                title: '🎉 Tur Tamamlandı!',
                description: 'Artık Work365\'i kullanmaya hazırsınız. İyi çalışmalar!',
            }
        }
    ];

    useEffect(() => {
        const onboardingUiMode = typeof window !== "undefined"
            ? localStorage.getItem("onboarding_ui_mode") || "wizard"
            : "wizard";

        if (onboardingUiMode !== "tour") {
            return;
        }

        isPathChanging.current = false;

        if (!showTour || !user) {
            if (driverObj.current) {
                driverObj.current.destroy();
                driverObj.current = null;
            }
            return;
        }

        driverObj.current = driver({
            showProgress: true,
            animate: true,
            allowClose: true,
            popoverClass: 'driverjs-theme',
            doneBtnText: 'Bitir',
            closeBtnText: 'Kapat',
            nextBtnText: 'İleri',
            prevBtnText: 'Geri',
            steps: steps,
            onHighlightStarted: (element, step, options) => {
                const stepIndex = steps.findIndex(s => s.element === step.element && s.popover.title === step.popover.title);
                localStorage.setItem('tour_current_index', stepIndex);

                if (step.element === '[data-tour="profile-page-content"]' && window.location.pathname !== '/profil') {
                    navigate('/profil');
                }
                if (step.element === '[data-tour="profile-detail-overview"]' && !window.location.pathname.includes('/profil/detay')) {
                    navigate('/profil/detay');
                }
                if (step.element === '[data-tour="orders-tab"]' && !window.location.pathname.includes('/profil/detay')) {
                    navigate('/profil/detay?tab=orders');
                }
                if (step.element === '[data-tour="pending-tab"]' && !window.location.pathname.includes('/profil/detay')) {
                    navigate('/profil/detay?tab=pending');
                }
                if (step.element === '[data-tour="service-requests-tab"]' && !window.location.pathname.includes('/profil/detay')) {
                    navigate('/profil/detay?tab=service-requests');
                }
                if (step.element === '[data-tour="document-requests-tab"]' && !window.location.pathname.includes('/profil/detay')) {
                    navigate('/profil/detay?tab=document-requests');
                }
                if (step.element === '[data-tour="invoices-tab"]' && !window.location.pathname.includes('/profil/detay')) {
                    navigate('/profil/detay?tab=invoices');
                }
                if (step.element === '[data-tour="addresses-tab"]' && !window.location.pathname.includes('/profil/detay')) {
                    navigate('/profil/detay?tab=addresses');
                }
                if (step.element === '[data-tour="chatbot"]' && window.location.pathname !== '/') {
                    navigate('/');
                }
            },
            onDestroyed: () => {
                if (isPathChanging.current) {
                    console.log('🔄 Tour destroyed for navigation - keeping state active.');
                    return;
                }

                const isComplete = localStorage.getItem('tour_current_index') == '17';
                if (isComplete) {
                    completeTour();
                } else {
                    skipTour();
                }
                localStorage.removeItem('tour_current_index');
            },
            onCloseClick: () => {
                skipTour();
                localStorage.removeItem('tour_current_index');
                driverObj.current.destroy();
            },
            onNextClick: (element, step, opts) => {
                driverObj.current.moveNext();
            }
        });

        const savedIndex = parseInt(localStorage.getItem('tour_current_index') || '0');
        const currentStep = steps[savedIndex];

        console.log('🔄 Tour Navigation:', {
            path: location.pathname,
            stepIndex: savedIndex,
            target: currentStep?.element
        });

        const waitForElement = (selector, callback) => {
            if (!selector) {
                callback();
                return;
            }

            let attempts = 0;
            const maxAttempts = 50; // 5 seconds

            const interval = setInterval(() => {
                const element = document.querySelector(selector);
                attempts++;

                if (element) {
                    clearInterval(interval);
                    console.log('✅ Element found:', selector);
                    callback();
                } else if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    console.error('❌ Element not found after timeout:', selector);
                    callback();
                }
            }, 100);

            return () => clearInterval(interval);
        };

        const cleanup = waitForElement(currentStep?.element, () => {
            if (driverObj.current) {
                console.log('🚗 Starting driver at step:', savedIndex);
                driverObj.current.drive(savedIndex);
            }
        });

        return () => {
            isPathChanging.current = true;

            if (cleanup) cleanup();
            if (driverObj.current) {
                driverObj.current.destroy();
            }
        };
    }, [showTour, user, location.pathname]);

    return null;
}
