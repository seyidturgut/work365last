import { motion } from "framer-motion";
import { MessageList } from "./MessageList";
import { X, RefreshCw, ArrowLeft, Sparkles, Headphones, Receipt, Package, FileText, Bell, Wrench, Calculator, Tag, HelpCircle, ChevronRight, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export function ChatWindow({ messages, onOptionClick, onClose, onReset, onBack, canGoBack, isTyping, currentOptions, inputMode, onInputSubmit, inputPlaceholder }) {
    const [inputText, setInputText] = useState("");

    const handleSend = () => {
        if (inputText.trim()) {
            onInputSubmit(inputText);
            setInputText("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const getOptionIcon = (key) => {
        if (!key) return <Sparkles size={18} className="text-violet-500" />;

        if (key.startsWith('contact:submit:technical_support')) return <Wrench size={18} className="text-violet-500" />;
        if (key.startsWith('contact:submit:accounting')) return <Calculator size={18} className="text-violet-500" />;
        if (key.startsWith('contact:submit:sales')) return <Tag size={18} className="text-violet-500" />;
        if (key.startsWith('contact:submit:other')) return <HelpCircle size={18} className="text-violet-500" />;

        if (key.startsWith('contact:root')) return <Headphones size={18} className="text-violet-500" />;
        if (key.startsWith('invoice:')) return <Receipt size={18} className="text-violet-500" />;
        if (key.startsWith('service:')) return <Package size={18} className="text-violet-500" />;
        if (key.startsWith('application:')) return <FileText size={18} className="text-violet-500" />;
        if (key.startsWith('notification:')) return <Bell size={18} className="text-violet-500" />;
        if (key === 'root:main') return <MessageCircle size={18} className="text-violet-500" />;

        return <Sparkles size={18} className="text-violet-500" />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-6 right-4 left-4 sm:left-auto sm:right-6 sm:w-[380px] h-[480px] sm:h-[580px] max-h-[75vh] bg-white/95 backdrop-blur-md rounded-[28px] shadow-[0_20px_60px_rgba(99,102,241,0.15)] flex flex-col overflow-hidden border border-indigo-100/50 z-50"
        >
            <div className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 px-6 py-5 flex items-center justify-between shrink-0 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-10 -translate-y-10" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl transform -translate-x-10 translate-y-10" />
                </div>

                <div className="relative flex items-center space-x-3 z-10">
                    <motion.div
                        className="relative bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                        animate={{
                            boxShadow: [
                                "0 4px 12px rgba(255,255,255,0.2)",
                                "0 8px 20px rgba(255,255,255,0.3)",
                                "0 4px 12px rgba(255,255,255,0.2)"
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                        <h3 className="text-white font-bold text-xl tracking-tight leading-none flex items-center gap-2">
                            CorpAi
                            <span className="text-xs font-normal bg-white/20 px-2 py-0.5 rounded-full">Assistant</span>
                        </h3>
                        <p className="text-indigo-100 text-xs font-medium mt-1 flex items-center gap-1.5">
                            <motion.span
                                className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            Online
                        </p>
                    </div>
                </div>

                <div className="relative flex items-center space-x-1 z-10">
                    {canGoBack && (
                        <motion.button
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={onBack}
                            className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-200"
                            title="Geri"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeft size={18} />
                        </motion.button>
                    )}
                    <button
                        onClick={onReset}
                        className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-200 group"
                        title="Sohbeti Sıfırla"
                    >
                        <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-200"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                <MessageList messages={messages} onOptionClick={onOptionClick} isTyping={isTyping} />
            </div>

            <div className="p-4 border-t border-indigo-100/50 bg-white/90 backdrop-blur-md shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                {inputMode ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-2"
                    >
                        <div className="relative">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={inputPlaceholder || "Mesajınızı yazınız..."}
                                className="w-full bg-indigo-50/50 border border-indigo-100 rounded-2xl py-3 px-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none min-h-[80px]"
                                autoFocus
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputText.trim()}
                                className="absolute bottom-3 right-3 p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-gray-400 font-medium">
                            Enter tuşuna basarak gönderebilirsiniz
                        </p>
                    </motion.div>
                ) : (
                    <>
                        {currentOptions && currentOptions.length > 0 ? (
                            <div className="flex flex-col gap-2 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent pr-1">
                                <div className="flex items-center justify-between mb-1 px-1">
                                    <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <Sparkles size={10} />
                                        Önerilen İşlemler
                                    </p>
                                </div>
                                {currentOptions.map((option, idx) => (
                                    <motion.button
                                        key={option.value || idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => onOptionClick(option)}
                                        className="group w-full text-left bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-100 hover:border-indigo-200 text-gray-700 hover:text-indigo-900 text-sm font-medium py-3.5 px-4 rounded-2xl transition-all duration-200 flex items-center justify-between shadow-sm hover:shadow-md"
                                        whileHover={{ scale: 1.01, x: 2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-white rounded-lg border border-indigo-100 shadow-sm group-hover:border-indigo-200 transition-colors">
                                                {getOptionIcon(option.key)}
                                            </div>
                                            <span className="font-semibold">{option.label}</span>
                                        </div>

                                        <ChevronRight className="w-4 h-4 text-indigo-300 group-hover:text-indigo-500 transition-colors" />
                                    </motion.button>
                                ))}
                            </div>
                        ) : (
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Seçeneklerden birini seçiniz..."
                                    disabled
                                    className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl py-3.5 px-4 text-sm text-gray-400 shadow-inner focus:outline-none cursor-not-allowed"
                                />
                            </div>
                        )}

                        <p className="text-[10px] text-center text-gray-400 mt-3 flex items-center justify-center gap-1.5 font-medium">
                            <Sparkles size={10} className="text-indigo-400" />
                            CorpAi Assistant
                        </p>
                    </>
                )}
            </div>
        </motion.div>
    );
}
