import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatWindow } from "./ChatWindow";
import { CalculatorModal } from "./CalculatorModal";
import { botApi } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { getToken } from "../../lib/auth";

const CorpAiIcon = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 12V24L18 30L30 24V12L18 6Z" fill="url(#corpai-gradient)" fillOpacity="0.1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 12V24" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12L18 18L30 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 24L18 18L30 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="3" fill="white" />
        <circle cx="18" cy="6" r="1.5" fill="white" />
        <circle cx="6" cy="12" r="1.5" fill="white" />
        <circle cx="30" cy="12" r="1.5" fill="white" />
        <circle cx="30" cy="24" r="1.5" fill="white" />
        <circle cx="6" cy="24" r="1.5" fill="white" />
        <circle cx="18" cy="30" r="1.5" fill="white" />
        <defs>
            <linearGradient id="corpai-gradient" x1="6" y1="6" x2="30" y2="30">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
        </defs>
    </svg>
);

export default function Chatbot() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [currentOptions, setCurrentOptions] = useState([]);
    const [navigationHistory, setNavigationHistory] = useState([]);
    const [inputMode, setInputMode] = useState(false);
    const [submitKey, setSubmitKey] = useState(null);
    const [inputPlaceholder, setInputPlaceholder] = useState("");
    const [activeCalculator, setActiveCalculator] = useState(null);
    const inactivityTimerRef = useRef(null);

    useEffect(() => {
        if (user && !isOpen && !hasInitialized) {
            const timer = setTimeout(() => {
                setIsHovered(true);
                setTimeout(() => setIsHovered(false), 5000);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [user, isOpen, hasInitialized]);

    useEffect(() => {
        if (!isOpen || messages.length === 0 || isTyping) return;

        const resetTimer = () => {
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

            inactivityTimerRef.current = setTimeout(() => {
                const lastMsg = messages[messages.length - 1];
                if (lastMsg?.options || inputMode) return;

                setMessages(prev => [...prev, {
                    id: Date.now(),
                    type: "options",
                    text: "Size başka nasıl yardımcı olabilirim?",
                    sender: "bot",
                    options: [{ label: "Ana Menü", value: "main_menu", key: "root:main" }]
                }]);
                setCurrentOptions([{ label: "Ana Menü", value: "main_menu", key: "root:main" }]);
            }, 30000);
        };

        resetTimer();
        return () => {
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        };
    }, [messages, isOpen, isTyping, inputMode]);

    const initChat = async (force = false) => {
        if (!force && messages.length > 0) return;

        const token = getToken();
        if (!token) return;

        setIsTyping(true);
        try {
            const response = await botApi.sendMessage(token, { key: "root:main" });
            setMessages([{
                id: Date.now(),
                type: response.type,
                text: response.text,
                options: response.options,
                sender: 'bot'
            }]);
            setCurrentOptions(response.options || []);
            setNavigationHistory([{ key: "root:main", label: "Ana Menü" }]);
            setHasInitialized(true);
        } catch (error) {
            console.error("CorpAi hatası:", error);
            setMessages([{
                id: Date.now(),
                type: "text",
                text: "Üzgünüm, şu anda bağlantı kurulamadı. Lütfen daha sonra tekrar deneyin.",
                sender: 'bot'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (newState && messages.length === 0) {
            initChat();
        }
    };

    const handleReset = () => {
        setMessages([]);
        setCurrentOptions([]);
        setNavigationHistory([]);
        setHasInitialized(false);
        setInputMode(false);
        setSubmitKey(null);
        setActiveCalculator(null);
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        // Force initialization even if state hasn't fully updated yet
        initChat(true);
    };

    const handleBack = () => {
        if (inputMode) {
            setInputMode(false);
            setSubmitKey(null);
            // Optionally restore previous options
            return;
        }

        if (navigationHistory.length <= 1) return;

        const newHistory = [...navigationHistory];
        newHistory.pop();
        const previous = newHistory[newHistory.length - 1];

        if (previous) {
            handleOptionClick({ ...previous, isBack: true });
        }
    };

    const handleOptionClick = async (option) => {
        const userMsgId = Date.now();

        if (!option.isBack) {
            setMessages(prev => [...prev, {
                id: userMsgId,
                type: "text",
                text: option.label,
                sender: "user"
            }]);
        }

        setCurrentOptions([]);
        setInputMode(false);

        const token = getToken();
        if (!token) {
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: "text",
                text: "Oturum süreniz dolmuş olabilir. Lütfen sayfayı yenileyin.",
                sender: "bot"
            }]);
            return;
        }

        setIsTyping(true);

        try {
            const payload = { key: option.key || option.value };
            const response = await botApi.sendMessage(token, payload);

            setMessages(prev => [...prev, {
                id: Date.now(),
                type: response.type,
                text: response.text,
                options: response.options,
                action: response.action,
                data: response.data,
                sender: "bot"
            }]);

            // Handle input request action
            if (response.action === "request_contact_input" && response.data?.submit_key) {
                setInputMode(true);
                setSubmitKey(response.data.submit_key);
                setInputPlaceholder(response.text.includes(":") ? response.text.split(":")[0] : "Mesajınızı yazınız...");
            }

            // Handle open_calculator action
            if (response.action === "open_calculator" && response.data?.calculator_type) {
                setActiveCalculator(response.data.calculator_type);
            }

            if (!option.isBack) {
                setNavigationHistory(prev => [...prev, { key: option.key || option.value, label: option.label }]);
            } else {
                const newHistory = [...navigationHistory];
                newHistory.pop();
                setNavigationHistory(newHistory);
            }

            if (response.options && response.options.length > 0) {
                setCurrentOptions(response.options);
            } else if (!inputMode && (!response.action || response.action !== "request_contact_input")) {
                // Only show main menu fallback if NOT in input mode and NOT requesting input
                setCurrentOptions([{ label: "Ana Menü", value: "main_menu", key: "root:main" }]);
            }

        } catch (error) {
            console.error("CorpAi hatası:", error);
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: "text",
                text: "Bir hata oluştu. Lütfen tekrar deneyin.",
                sender: "bot",
                options: [{ label: "Ana Menü", value: "main_menu", key: "root:main" }]
            }]);
            setCurrentOptions([{ label: "Ana Menü", value: "main_menu", key: "root:main" }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleInputSubmit = async (text) => {
        if (!text.trim() || !submitKey) return;

        setMessages(prev => [...prev, {
            id: Date.now(),
            type: "text",
            text: text,
            sender: "user"
        }]);

        setInputMode(false);
        const token = getToken();
        setIsTyping(true);

        try {
            const response = await botApi.sendMessage(token, { key: submitKey, message: text });

            setMessages(prev => [...prev, {
                id: Date.now(),
                type: response.type,
                text: response.text,
                options: response.options,
                sender: 'bot'
            }]);

            if (response.options && response.options.length > 0) {
                setCurrentOptions(response.options);
            } else {
                setCurrentOptions([{ label: "Ana Menü", value: "main_menu", key: "root:main" }]);
            }

            setSubmitKey(null);
        } catch (error) {
            console.error("CorpAi submission error:", error);
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: "text",
                text: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
                sender: "bot",
                options: [{ label: "Ana Menü", value: "main_menu", key: "root:main" }]
            }]);
            setCurrentOptions([{ label: "Ana Menü", value: "main_menu", key: "root:main" }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!user) return null;

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <ChatWindow
                        messages={messages}
                        onOptionClick={handleOptionClick}
                        onClose={() => setIsOpen(false)}
                        onReset={handleReset}
                        onBack={handleBack}
                        canGoBack={(navigationHistory.length > 1 && navigationHistory[navigationHistory.length - 1]?.key !== 'root:main') || inputMode}
                        isTyping={isTyping}
                        currentOptions={currentOptions}
                        inputMode={inputMode}
                        onInputSubmit={handleInputSubmit}
                        inputPlaceholder={inputPlaceholder}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activeCalculator && (
                    <CalculatorModal
                        type={activeCalculator}
                        isOpen={!!activeCalculator}
                        onClose={() => setActiveCalculator(null)}
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-6 right-6 z-50 hidden md:flex items-center" data-tour="chatbot">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center"
                        >
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 10, scale: 0.9 }}
                                    className="mr-3 bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 rounded-2xl shadow-[0_8px_30px_rgba(99,102,241,0.4)] text-white text-sm font-bold whitespace-nowrap relative flex items-center gap-2"
                                >
                                    <span className="text-base">🤖</span>
                                    Merhaba, ben CorpAi!
                                    <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-gradient-to-br from-indigo-500 to-purple-500 transform -translate-y-1/2 rotate-45"></div>
                                </motion.div>
                            )}
                            <motion.button
                                onClick={handleToggle}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                className="relative p-0 w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-white rounded-full shadow-[0_10px_40px_rgba(99,102,241,0.5)] transition-all duration-300 flex items-center justify-center overflow-hidden group"
                                animate={{
                                    boxShadow: [
                                        "0 10px 40px rgba(99,102,241,0.5)",
                                        "0 10px 50px rgba(99,102,241,0.7)",
                                        "0 10px 40px rgba(99,102,241,0.5)"
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                                <motion.div
                                    className="absolute inset-0"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-white/10 blur-xl" />
                                </motion.div>

                                <div className="relative z-10">
                                    <CorpAiIcon />
                                </div>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
