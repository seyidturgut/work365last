import React from "react";
import { motion } from "framer-motion";

export default function PendingTab({
  pendingRegistrations,
  pendingMsg,
  pendingErr,
  loadingPending,
  documentRequests,
  navigate,
  openPendingDocumentsModal,
  handlePendingAddToCart,
  addingPendingId,
  openDeleteConfirmModal,
  deletingPendingId,
}) {
  return (
    <motion.div key="pending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Taslak Şirket Başvuruları</h3>
            <p className="text-sm text-gray-500 mt-0.5">{pendingRegistrations.length} başvuru bulundu</p>
          </div>
        </div>
      </div>

      {(pendingMsg || pendingErr) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 rounded-xl px-4 py-3 text-sm border-2 shadow-sm ${pendingMsg ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}
        >
          {pendingMsg || pendingErr}
        </motion.div>
      )}

      {loadingPending ? (
        <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
      ) : pendingRegistrations.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-amber-50/30 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-amber-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 font-medium mb-2">Taslak şirket başvurunuz bulunmuyor</p>
          <p className="text-sm text-gray-500">Yeni bir başvuru başlatmak için hizmetler sayfasını ziyaret edebilirsiniz.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingRegistrations.map((registration) => {
            const statusConfig = {
              draft: { label: "Taslak", color: "bg-gray-100 text-gray-700 border-gray-200" },
              submitted: { label: "Gönderildi", color: "bg-primary/10 text-primary border-primary/20" },
              in_review: { label: "İnceleniyor", color: "bg-amber-100 text-amber-700 border-amber-200" },
              approved: { label: "Onaylandı", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
              rejected: { label: "Reddedildi", color: "bg-red-100 text-red-700 border-red-200" },
              completed: { label: "Tamamlandı", color: "bg-primary/10 text-primary border-primary/30" },
            };
            const paymentStatusConfig = {
              pending: { label: "Ödeme Bekleniyor", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
              paid: { label: "Ödendi", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
              failed: { label: "Ödeme Başarısız", color: "bg-red-100 text-red-700 border-red-200" },
              refunded: { label: "İade Edildi", color: "bg-primary/10 text-primary border-primary/20" },
            };

            const status = statusConfig[registration.status] || statusConfig.draft;
            const paymentStatus = paymentStatusConfig[registration.payment_status] || paymentStatusConfig.pending;
            const date = registration.created_at ? new Date(registration.created_at).toLocaleDateString("tr-TR") : "";
            const price = registration.price || {};

            const relatedRequests = documentRequests.filter((req) => {
              const type = (req.requestable_type || "").toLowerCase();
              return (type.includes("companyregistration") || type.includes("company_registration")) && req.requestable_id === registration.id;
            });

            return (
              <motion.div
                key={registration.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border-2 border-gray-200 hover:border-amber-400/70 bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">Başvuru #{registration.id}</h4>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${status.color}`}>{status.label}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${paymentStatus.color}`}>{paymentStatus.label}</span>
                      </div>
                      <p className="text-sm text-gray-500">{date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-600">{Number(price.gross_price || 0).toLocaleString("tr-TR")} ₺</div>
                      <p className="text-xs text-gray-500 mt-1">(KDV: {Number(price.vat || 0).toLocaleString("tr-TR")} ₺)</p>
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{registration.company_name || "Şirket Adı"}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {registration.product?.title || "Ürün"} • {registration.tier || "N/A"} • {registration.period || "N/A"}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-white border border-amber-200 text-amber-700 text-xs font-semibold">
                        {registration.product?.key || "company-registration"}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11m0 0l-4-4m4 4l-4 4m6-9a9 9 0 110 18 9 9 0 010-18z" />
                      </svg>
                      <span>
                        Durum: <span className="font-semibold text-gray-800">{status.label}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        Ödeme: <span className="font-semibold text-gray-800">{paymentStatus.label}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m9-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        Net: <span className="font-semibold text-gray-800">{Number(price.net_price || 0).toLocaleString("tr-TR")} ₺</span>
                      </span>
                    </div>
                  </div>

                  {relatedRequests.length > 0 && (
                    <div className="mb-4 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/20">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h5 className="font-semibold text-primary">Belge Talepleri ({relatedRequests.length})</h5>
                      </div>
                      <div className="space-y-2">
                        {relatedRequests.map((req) => {
                          const getStatusColor = (status) => {
                            switch (status) {
                              case "pending":
                                return "bg-yellow-100 text-yellow-800 border-yellow-200";
                              case "uploaded":
                                return "bg-primary/10 text-primary border-primary/20";
                              case "approved":
                                return "bg-green-100 text-green-800 border-green-200";
                              case "rejected":
                                return "bg-red-100 text-red-800 border-red-200";
                              default:
                                return "bg-gray-100 text-gray-800 border-gray-200";
                            }
                          };
                          const getStatusText = (status) => {
                            switch (status) {
                              case "pending":
                                return "Beklemede";
                              case "uploaded":
                                return "Onay Bekleniyor";
                              case "approved":
                                return "Onaylandı";
                              case "rejected":
                                return "Reddedildi";
                              default:
                                return status;
                            }
                          };
                          return (
                            <button
                              key={req.id}
                              onClick={() => navigate(`/belgelerim/${req.id}`)}
                              className="w-full text-left p-3 bg-white rounded-lg border border-primary/20 hover:border-primary/40 hover:shadow-md transition-all group"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-900 group-hover:text-primary transition-colors truncate">{req.title}</p>
                                  {req.description && <p className="text-xs text-gray-600 mt-1 line-clamp-1">{req.description}</p>}
                                </div>
                                <div className="ml-3 flex items-center gap-2 flex-shrink-0">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(req.status)}`}>
                                    {getStatusText(req.status)}
                                  </span>
                                  <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <p className="text-sm text-gray-500">Başvurunuzu tamamlamak için gerekli belgeleri yükleyin ve ödeme adımına geçin.</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openPendingDocumentsModal(registration)}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-amber-200 text-amber-600 hover:bg-amber-50 transition-all"
                      >
                        Belgeleri Düzenle
                      </button>
                      <button
                        onClick={() => handlePendingAddToCart(registration)}
                        disabled={addingPendingId === registration.id}
                        className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {addingPendingId === registration.id ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            İşleniyor...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            Ödemeyi Tamamla
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => openDeleteConfirmModal(registration)}
                        disabled={deletingPendingId === registration.id}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

