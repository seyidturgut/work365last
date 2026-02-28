import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Receipt, FileText } from "lucide-react";

export function MessageList({ messages, onOptionClick, isTyping }) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    return (
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
                {messages.map((msg, index) => (
                    <motion.div
                        key={msg.id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                        <div
                            className={`max-w-[90%] rounded-2xl p-4 shadow-sm ${msg.sender === "user"
                                ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-tr-none"
                                : "bg-white border border-violet-100 text-gray-800 rounded-tl-none"
                                }`}
                        >
                            {msg.text && <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>}

                            {msg.type === "data" && msg.action === "list_invoices" && msg.data && (
                                <div className="mt-3 space-y-2">
                                    {msg.data.length === 0 ? (
                                        <p className="text-xs opacity-70 italic">Kayıt bulunamadı.</p>
                                    ) : (
                                        msg.data.slice(0, 5).map((item, i) => (
                                            <div key={i} className="p-3 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-xl text-xs border border-violet-100">
                                                <div className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <Receipt size={14} className="text-violet-500" />
                                                    {item.invoiceNumber || `Fatura #${i + 1}`}
                                                </div>
                                                <div className="text-gray-600 flex justify-between mt-1.5">
                                                    <span className="font-medium">{item.amount || "0"} TL</span>
                                                    <span className={item.status === 'paid' ? 'text-green-600 font-semibold' : 'text-orange-600 font-semibold'}>
                                                        {item.status === 'paid' ? '✓ Ödendi' : '⏳ Ödenmedi'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    {msg.data.length > 5 && (
                                        <div className="text-xs text-center text-violet-600 font-semibold cursor-pointer hover:underline pt-1">
                                            + {msg.data.length - 5} fatura daha
                                        </div>
                                    )}
                                </div>
                            )}

                            {msg.type === "data" && msg.action === "list_services" && msg.data && (
                                <div className="mt-3 space-y-2">
                                    {msg.data.length === 0 ? (
                                        <p className="text-xs opacity-70 italic">Hizmet bulunamadı.</p>
                                    ) : (
                                        msg.data.map((item, i) => (
                                            <motion.div
                                                key={item.id || i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="p-3 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-xl border border-violet-100 shadow-sm"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1">
                                                        <div className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                                                            <Package size={15} className="text-violet-500 flex-shrink-0" />
                                                            {item.title}
                                                        </div>
                                                        {item.description && (
                                                            <p className="text-[11px] text-gray-600 mt-1.5 leading-relaxed">{item.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <div className="text-xs font-bold text-violet-600 whitespace-nowrap bg-white px-2 py-1 rounded-lg">{item.price}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            )}

                            {msg.type === "data" && msg.action === "list_applications" && msg.data && (
                                <div className="mt-3 space-y-2">
                                    {msg.data.length === 0 ? (
                                        <p className="text-xs opacity-70 italic">Başvuru bulunamadı.</p>
                                    ) : (
                                        msg.data.map((item, i) => (
                                            <motion.div
                                                key={item.id || i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="p-3 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-xl border border-violet-100 shadow-sm"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1">
                                                        <div className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                                                            <FileText size={15} className="text-violet-500 flex-shrink-0" />
                                                            {item.title}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wide border ${item.status === 'submitted' ? 'bg-sky-50 text-sky-600 border-sky-100' :
                                                                    item.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                                        item.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                                            'bg-gray-50 text-gray-600 border-gray-100'
                                                                }`}>
                                                                {item.status === 'submitted' ? 'İletildi' :
                                                                    item.status === 'approved' ? 'Onaylandı' :
                                                                        item.status === 'rejected' ? 'Reddedildi' : item.status}
                                                            </span>
                                                            {item.date && (
                                                                <span className="text-[10px] text-gray-400 font-medium">
                                                                    {new Date(item.date).toLocaleDateString('tr-TR')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {isTyping && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start"
                >
                    <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex space-x-1">
                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                </motion.div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}
