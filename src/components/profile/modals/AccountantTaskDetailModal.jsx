import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimes, FaUser, FaBuilding, FaPaperclip, FaUpload } from "react-icons/fa";
import { getToken } from "../../../lib/auth";
import { accountantTasksApi } from "../../../lib/api";

export default function AccountantTaskDetailModal({
    isOpen,
    onClose,
    taskId,
    refreshTasks,
}) {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [replyMessage, setReplyMessage] = useState("");
    const [replyFile, setReplyFile] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (isOpen && taskId) {
            loadTaskDetails();
        } else {
            setTask(null);
            setError("");
            setSuccessMsg("");
            setReplyMessage("");
            setReplyFile(null);
            setValidationErrors({});
        }
    }, [isOpen, taskId]);

    const loadTaskDetails = async () => {
        const token = getToken();
        if (!token) return;
        setLoading(true);
        try {
            const res = await accountantTasksApi.get(token, taskId);
            setTask(res?.data || res || null);
        } catch (e) {
            setError(e.response?.data?.message || e.message || "Görev detayları yüklenemedi.");
        } finally {
            setLoading(false);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        const token = getToken();
        if (!token || !task) return;

        if (task.is_file_required && !replyFile) {
            setValidationErrors({ file: ["Dosya yüklemeniz zorunludur."] });
            return;
        }

        if (!task.is_file_required && !replyMessage && !replyFile) {
            setValidationErrors({ message: ["Mesaj veya dosya girmelisiniz."] });
            return;
        }

        setSending(true);
        setValidationErrors({});
        setError("");

        try {
            const formData = new FormData();
            if (replyMessage) formData.append("message", replyMessage);
            if (replyFile) formData.append("file", replyFile);

            const res = await accountantTasksApi.reply(token, task.id, formData);

            setSuccessMsg("Yanıtınız başarıyla gönderildi.");
            setReplyMessage("");
            setReplyFile(null);

            await loadTaskDetails();
            if (refreshTasks) refreshTasks();

            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setValidationErrors(e.response.data.errors || {});
                setError(e.response.data.message || "Validasyon hatası.");
            } else {
                setError(e.response?.data?.message || e.message || "Yanıt gönderilemedi.");
            }
        } finally {
            setSending(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                {loading ? "Yükleniyor..." : task?.title || "Görev Detayı"}
                            </h3>
                            {task && (
                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${task.status === 'open' ? 'bg-primary/10 text-blue-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {task.status === 'open' ? 'Açık' : task.status}
                                    </span>
                                    <span>•</span>
                                    <span>{new Date(task.created_at).toLocaleDateString("tr-TR")}</span>
                                    {task.accountant && (
                                        <>
                                            <span>•</span>
                                            <span>{task.accountant.name}</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {loading ? (
                            <div className="flex items-center justify-center h-48">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        ) : error && !task ? (
                            <div className="text-center text-red-600 py-10">{error}</div>
                        ) : task ? (
                            <div className="space-y-8">
                                {/* Description */}
                                <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
                                    <h4 className="font-semibold text-primary mb-2">Açıklama</h4>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {task.description}
                                    </p>
                                    {task.is_file_required && (
                                        <div className="mt-4 flex items-center gap-2 text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg inline-block border border-red-100">
                                            <FaPaperclip />
                                            Bu görev için dosya yüklemeniz gerekmektedir.
                                        </div>
                                    )}
                                </div>

                                {/* Conversation / Replies */}
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-primary rounded-full"></span>
                                        İletişim Geçmişi
                                    </h4>

                                    <div className="space-y-4 mb-6">
                                        {task.replies && task.replies.length > 0 ? (
                                            task.replies.map((reply) => {
                                                const isCustomer = !reply.author || reply.author_id === task.accountant_id
                                                    ? false
                                                    : true;


                                                const isAccountant = reply.author?.id === task.accountant_id;

                                                return (
                                                    <div key={reply.id} className={`flex gap-4 ${!isAccountant ? "flex-row-reverse" : ""}`}>
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isAccountant ? "bg-gray-200 text-gray-600" : "bg-primary text-white"
                                                            }`}>
                                                            <FaUser />
                                                        </div>
                                                        <div className={`max-w-[80%] rounded-2xl p-4 ${isAccountant ? "bg-gray-100 text-gray-800 rounded-tl-none" : "bg-primary/10 text-gray-800 rounded-tr-none"
                                                            }`}>
                                                            <div className="flex items-center gap-2 mb-1 justify-between">
                                                                <span className={`text-xs font-bold ${isAccountant ? "text-gray-600" : "text-primary"}`}>
                                                                    {reply.author?.name || (isAccountant ? "Muhasebeci" : "Siz")}
                                                                </span>
                                                                <span className="text-xs text-gray-400">
                                                                    {new Date(reply.created_at).toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            </div>
                                                            {reply.message && <p className="text-sm whitespace-pre-wrap">{reply.message}</p>}
                                                            {reply.file_url && (
                                                                <a
                                                                    href={reply.file_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="mt-2 flex items-center gap-2 text-xs bg-white/50 p-2 rounded-lg hover:bg-white/80 transition-colors border border-black/5"
                                                                >
                                                                    <FaPaperclip className="text-gray-500" />
                                                                    Dosyayı Görüntüle
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className="text-gray-500 text-sm text-center py-4 italic">Henüz bir yanıt yok.</p>
                                        )}
                                    </div>

                                    {/* Reply Form */}
                                    <form onSubmit={handleReplySubmit} className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                                        {successMsg && (
                                            <div className="mb-4 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
                                                <FaCheckCircle /> {successMsg}
                                            </div>
                                        )}
                                        {error && (
                                            <div className="mb-4 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                                                <FaTimes /> {error}
                                            </div>
                                        )}

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</label>
                                            <textarea
                                                rows="3"
                                                value={replyMessage}
                                                onChange={(e) => setReplyMessage(e.target.value)}
                                                className={`w-full rounded-xl border ${validationErrors.message ? 'border-red-500' : 'border-gray-200'} p-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all`}
                                                placeholder="Mesajınızı yazın..."
                                            ></textarea>
                                            {validationErrors.message && (
                                                <p className="text-red-500 text-xs mt-1">{validationErrors.message[0]}</p>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Dosya Ekle {task.is_file_required && <span className="text-red-500">*</span>}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    id="replyFile"
                                                    onChange={(e) => setReplyFile(e.target.files[0])}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor="replyFile"
                                                    className={`flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${validationErrors.file ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                        }`}
                                                >
                                                    <FaUpload className={validationErrors.file ? "text-red-400" : "text-gray-400"} />
                                                    <span className={validationErrors.file ? "text-red-600" : "text-gray-600"}>
                                                        {replyFile ? replyFile.name : (task.is_file_required ? "Dosya seçmek zorunludur" : "Dosya seçmek için tıklayın")}
                                                    </span>
                                                </label>
                                                {validationErrors.file && (
                                                    <p className="text-red-500 text-xs mt-1">{validationErrors.file[0]}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={sending}
                                                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center gap-2"
                                            >
                                                {sending ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                        Gönderiliyor...
                                                    </>
                                                ) : (
                                                    "Yanıtla ve Gönder"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
