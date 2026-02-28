import React from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle, FaCloudUploadAlt, FaLink } from "react-icons/fa";

export default function DocumentRequestsTab({ 
  loadingDocumentRequests, 
  documentRequests, 
  navigate,
  documentRequestsPagination,
  loadDocumentRequests,
}) {
  return (
    <motion.div key="document-requests" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
            <FaFileAlt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Belge Talepleri</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {documentRequestsPagination?.total 
                ? `${documentRequestsPagination.total} belge talebi bulundu`
                : "Talep edilen belgelerinizi yükleyin ve durumlarını takip edin."}
            </p>
          </div>
        </div>
      </div>
      {loadingDocumentRequests ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Yükleniyor...</p>
        </div>
      ) : documentRequests.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl shadow-xl border-2 border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz Belge Talebi Yok</h3>
          <p className="text-gray-600">Yeni belge talepleri burada görünecektir.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {documentRequests.map((request, index) => {
            const getStatusConfig = (status) => {
              switch (status) {
                case "pending":
                  return {
                    bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
                    border: "border-amber-300",
                    badge: "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md",
                    iconBg: "bg-gradient-to-br from-amber-500 to-yellow-600",
                    icon: <FaClock className="w-6 h-6 text-white" />,
                    label: "Beklemede",
                    dot: "bg-amber-500",
                  };
                case "uploaded":
                  return {
                    bg: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
                    border: "border-blue-300",
                    badge: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md",
                    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
                    icon: <FaCloudUploadAlt className="w-6 h-6 text-white" />,
                    label: "Onay Bekleniyor",
                    dot: "bg-blue-500",
                  };
                case "approved":
                  return {
                    bg: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
                    border: "border-emerald-300",
                    badge: "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md",
                    iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
                    icon: <FaCheckCircle className="w-6 h-6 text-white" />,
                    label: "Onaylandı",
                    dot: "bg-emerald-500",
                  };
                case "rejected":
                  return {
                    bg: "bg-gradient-to-br from-red-50 via-rose-50 to-pink-50",
                    border: "border-red-300",
                    badge: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md",
                    iconBg: "bg-gradient-to-br from-red-500 to-rose-600",
                    icon: <FaTimesCircle className="w-6 h-6 text-white" />,
                    label: "Reddedildi",
                    dot: "bg-red-500",
                  };
                default:
                  return {
                    bg: "bg-gradient-to-br from-gray-50 to-slate-50",
                    border: "border-gray-300",
                    badge: "bg-gradient-to-r from-gray-500 to-slate-600 text-white shadow-md",
                    iconBg: "bg-gradient-to-br from-gray-500 to-slate-600",
                    icon: <FaFileAlt className="w-6 h-6 text-white" />,
                    label: status,
                    dot: "bg-gray-500",
                  };
              }
            };
            
            const statusConfig = getStatusConfig(request.status);
            const formatDate = (dateString) => {
              if (!dateString) return "";
              const d = new Date(dateString);
              return d.toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
            };
            
            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
                onClick={() => navigate(`/belgelerim/${request.id}`)}
                className={`border-2 rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-2xl transition-all ${statusConfig.bg} ${statusConfig.border} relative overflow-hidden group`}
              >
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${statusConfig.dot} shadow-lg animate-pulse`}></div>
                </div>
                
                <div className="flex items-start gap-5 relative z-10">
                  <div className={`${statusConfig.iconBg} p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform border-2 ${statusConfig.border} flex-shrink-0`}>
                    {statusConfig.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {request.title}
                          </h3>
                          {request.is_required && (
                            <span className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full font-semibold border border-red-200 shadow-sm whitespace-nowrap">
                              Zorunlu
                            </span>
                          )}
                        </div>
                        {request.description && (
                          <p className="text-gray-700 mb-3 leading-relaxed text-sm line-clamp-2">
                            {request.description}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusConfig.badge} whitespace-nowrap`}>
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm pt-3 border-t border-gray-200/50">
                      <span className="flex items-center gap-2 text-gray-600 font-medium">
                        <FaLink className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">
                          <strong>Bağlı Kayıt:</strong> {request.requestable_title}
                        </span>
                      </span>
                      {request.files_count > 0 && (
                        <span className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-primary font-semibold shadow-sm border border-primary/20">
                          <FaFileAlt className="w-3.5 h-3.5" />
                          {request.files_count} dosya
                        </span>
                      )}
                      {request.created_at && (
                        <span className="text-xs text-gray-500">
                          {formatDate(request.created_at)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {documentRequestsPagination && documentRequestsPagination.last_page > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-gray-200 mt-8">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">
                {documentRequestsPagination.from}-{documentRequestsPagination.to}
              </span>{" "}
              / <span className="font-semibold">{documentRequestsPagination.total}</span> belge talebi
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (documentRequestsPagination.current_page > 1) {
                    loadDocumentRequests(documentRequestsPagination.current_page - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                disabled={documentRequestsPagination.current_page === 1}
                className="p-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                aria-label="Önceki sayfa"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>

              {(() => {
                const pages = [];
                const maxVisible = 5;
                let startPage = Math.max(1, documentRequestsPagination.current_page - Math.floor(maxVisible / 2));
                let endPage = Math.min(documentRequestsPagination.last_page, startPage + maxVisible - 1);

                if (endPage - startPage < maxVisible - 1) {
                  startPage = Math.max(1, endPage - maxVisible + 1);
                }

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(i);
                }

                return (
                  <>
                    {startPage > 1 && (
                      <>
                        <button
                          onClick={() => {
                            loadDocumentRequests(1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
                        >
                          1
                        </button>
                        {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
                      </>
                    )}

                    {pages.map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          loadDocumentRequests(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`px-4 py-2 rounded-lg border-2 transition-all shadow-sm hover:shadow-md ${
                          page === documentRequestsPagination.current_page
                            ? "bg-primary text-white border-primary shadow-lg"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {endPage < documentRequestsPagination.last_page && (
                      <>
                        {endPage < documentRequestsPagination.last_page - 1 && (
                          <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => {
                            loadDocumentRequests(documentRequestsPagination.last_page);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
                        >
                          {documentRequestsPagination.last_page}
                        </button>
                      </>
                    )}
                  </>
                );
              })()}

              <button
                onClick={() => {
                  if (documentRequestsPagination.current_page < documentRequestsPagination.last_page) {
                    loadDocumentRequests(documentRequestsPagination.current_page + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                disabled={documentRequestsPagination.current_page === documentRequestsPagination.last_page}
                className="p-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                aria-label="Sonraki sayfa"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
      )}
    </motion.div>
  );
}

