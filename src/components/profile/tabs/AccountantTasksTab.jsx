import React from "react";
import { motion } from "framer-motion";

export default function AccountantTasksTab({
    tasks,
    loading,
    error,
    pagination,
    onPageChange,
    onTaskClick,
}) {
    return (
        <motion.div
            key="accountant-tasks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            Muhasebe Görevleri
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {pagination.total || tasks.length} görev bulundu
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-xl px-4 py-3 text-sm border-2 shadow-sm bg-red-50 text-red-800 border-red-200"
                >
                    {error}
                </motion.div>
            )}

            {loading ? (
                <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
            ) : tasks.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-orange-50/30 p-12 text-center">
                    <svg
                        className="w-16 h-16 mx-auto text-orange-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <p className="text-gray-600 font-medium mb-2">
                        Zorunlu bir muhasebe göreviniz bulunmuyor
                    </p>
                    <p className="text-sm text-gray-500">
                        Muhasebeciniz size bir görev atadığında burada görünecektir.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {tasks.map((task) => {
                        const statusConfig = {
                            open: {
                                label: "Açık",
                                color: "bg-blue-100 text-blue-700 border-blue-200",
                            },
                            closed: {
                                label: "Kapalı",
                                color: "bg-gray-100 text-gray-700 border-gray-200",
                            },
                            completed: {
                                label: "Tamamlandı",
                                color: "bg-emerald-100 text-emerald-700 border-emerald-200",
                            },
                        };

                        const status = statusConfig[task.status] || statusConfig.open;
                        const date = task.created_at
                            ? new Date(task.created_at).toLocaleDateString("tr-TR")
                            : "";

                        return (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => onTaskClick(task)}
                                className="cursor-pointer rounded-2xl border-2 border-gray-200 hover:border-orange-400/70 bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden group"
                            >
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                                                    {task.title}
                                                </h4>
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${status.color}`}
                                                >
                                                    {status.label}
                                                </span>
                                                {task.is_file_required && (
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-red-100 text-red-700 border-red-200">
                                                        Dosya Yükleme Gerekli
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Oluşturulma Tarihi: {date}
                                            </p>
                                            {task.accountant && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Atayan: {task.accountant.name}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <svg
                                                className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {task.description && (
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-2">
                                            <p className="text-sm text-gray-700 line-clamp-2">
                                                {task.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {pagination.last_page > 1 && (
                <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
                    <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{pagination.from}</span>
                        {" - "}
                        <span className="font-medium text-gray-900">{pagination.to}</span>
                        {" / "}
                        <span className="font-medium text-gray-900">{pagination.total}</span>
                        {" görev"}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onPageChange(pagination.current_page - 1)}
                            disabled={pagination.current_page === 1 || loading}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Önceki
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
                                (pageNum) => {
                                    const showPage =
                                        pageNum === 1 ||
                                        pageNum === pagination.last_page ||
                                        (pageNum >= pagination.current_page - 1 &&
                                            pageNum <= pagination.current_page + 1);

                                    if (!showPage) {
                                        if (
                                            pageNum === pagination.current_page - 2 ||
                                            pageNum === pagination.current_page + 2
                                        ) {
                                            return (
                                                <span key={pageNum} className="px-2 text-gray-400">
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => onPageChange(pageNum)}
                                            disabled={loading}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pageNum === pagination.current_page
                                                    ? "bg-primary text-white shadow-lg"
                                                    : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        <button
                            onClick={() => onPageChange(pagination.current_page + 1)}
                            disabled={
                                pagination.current_page === pagination.last_page || loading
                            }
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            Sonraki
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
