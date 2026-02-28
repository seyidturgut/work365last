import React from "react";
import { motion } from "framer-motion";
import { FaFilePdf, FaDownload, FaEye } from "react-icons/fa";

export default function DeclarationsTab({
    declarations,
    loading,
    error,
    pagination,
    onPageChange,
    onViewClick,
}) {
    return (
        <motion.div
            key="declarations"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center shadow-lg">
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
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Beyannameler</h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {pagination.total || declarations.length} kayıt bulundu
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
            ) : declarations.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50/30 p-12 text-center">
                    <svg
                        className="w-16 h-16 mx-auto text-blue-400 mb-4"
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
                        Henüz beyannameniz bulunmuyor
                    </p>
                    <p className="text-sm text-gray-500">
                        Muhasebeciniz beyannamelerinizi yüklediğinde burada görebilirsiniz.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {declarations.map((decl) => {
                        const statusConfig = {
                            uploaded: {
                                label: "Yeni",
                                color: "bg-blue-100 text-blue-700 border-blue-200",
                            },
                            viewed: {
                                label: "Görüldü",
                                color: "bg-gray-100 text-gray-700 border-gray-200",
                            },
                        };

                        const status = statusConfig[decl.status] || statusConfig.uploaded;
                        const date = decl.created_at
                            ? new Date(decl.created_at).toLocaleDateString("tr-TR")
                            : "";

                        return (
                            <motion.div
                                key={decl.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl border-2 border-gray-200 hover:border-blue-400/70 bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden group"
                            >
                                <div className="p-5 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                                            <FaFilePdf size={24} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-lg font-bold text-gray-900 truncate group-hover:text-primary transition-colors">
                                                {decl.name}
                                            </h4>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${status.color}`}>
                                                    {status.label}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {date}
                                                </span>
                                                {decl.accountant && (
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                        {decl.accountant.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onViewClick(decl)}
                                            className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100"
                                            title="Görüntüle"
                                        >
                                            <FaEye size={18} />
                                        </button>
                                        <a
                                            href={decl.file_url || `${import.meta.env.VITE_STORAGE_URL}/${decl.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => decl.status === 'uploaded' && onViewClick(decl)}
                                            className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                                            title="İndir"
                                        >
                                            <FaDownload size={18} />
                                        </a>
                                    </div>
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
                        {" kayıt"}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onPageChange(pagination.current_page - 1)}
                            disabled={pagination.current_page === 1 || loading}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            Önceki
                        </button>
                        <button
                            onClick={() => onPageChange(pagination.current_page + 1)}
                            disabled={
                                pagination.current_page === pagination.last_page || loading
                            }
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            Sonraki
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
