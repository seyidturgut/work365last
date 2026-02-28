import React from "react";
import { motion } from "framer-motion";

export default function InvoicesTab({
  invoiceSearch,
  setInvoiceSearch,
  invoiceStatusFilter,
  setInvoiceStatusFilter,
  loadingInvoices,
  invoices,
  invoicesPagination,
  loadInvoices,
  setPdfPreview,
}) {
  return (
    <motion.div key="invoices" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Kesilen Faturalar</h3>
            <p className="text-sm text-gray-600 mt-1">Faturaları görüntüleyebilir ve indirebilirsiniz.</p>
          </div>
        </div>
      </div>

      {/* Filtreler */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 md:p-8 mb-8 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">Fatura Filtreleri</h4>
            <p className="text-sm text-gray-500">Arama ve durum filtresi</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Arama */}
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-primary transition-colors z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Fatura no, sipariş no, ürün adı, sipariş adı veya tutar ara..."
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                className="w-full pl-14 pr-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all shadow-sm hover:shadow-md text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Durum Filtresi */}
          <div className="lg:w-64 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <select
                value={invoiceStatusFilter}
                onChange={(e) => setInvoiceStatusFilter(e.target.value)}
                className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all appearance-none cursor-pointer shadow-sm hover:shadow-md text-gray-900 font-medium"
              >
                <option value="all">📄 Tüm Faturalar</option>
                <option value="e_archive">✅ E-Arşiv</option>
                <option value="e_billing">📧 E-Fatura</option>
                <option value="failed">❌ Başarısız</option>
                <option value="cancelled">🚫 İptal</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {loadingInvoices ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Yükleniyor...</p>
        </div>
      ) : invoices.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl shadow-xl border-2 border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz Fatura Yok</h3>
          <p className="text-gray-600">Yeni faturalar burada görünecektir.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {invoices
              .filter((inv) => {
                if (invoiceStatusFilter !== "all") {
                  const status = inv.status || inv.type || "";
                  if (invoiceStatusFilter === "e_archive" && !status.includes("e_archive")) return false;
                  if (invoiceStatusFilter === "e_billing" && !status.includes("e_billing")) return false;
                  if (invoiceStatusFilter === "failed" && status !== "failed") return false;
                  if (invoiceStatusFilter === "cancelled" && status !== "cancelled") return false;
                }
                if (invoiceSearch.trim()) {
                  const query = invoiceSearch.toLowerCase();
                  const number = String(inv.number || inv.no || inv.id || "").toLowerCase();
                  const orderNo = String(inv.order_number || inv.order_no || inv.order_id || inv.order?.number || inv.order?.id || "").toLowerCase();
                  const productName = String(inv.product_name || "").toLowerCase();
                  let orderTitle = String(inv.order_title || inv.order?.title || inv.order?.name || "").toLowerCase();
                  if (!orderTitle && inv.order?.items && Array.isArray(inv.order.items) && inv.order.items.length > 0) {
                    orderTitle = inv.order.items.map((item) => String(item.name || item.title || "")).filter(Boolean).join(", ").toLowerCase();
                  }
                  if (!orderTitle && inv.order) {
                    orderTitle = String(inv.order.description || inv.order.product_title || inv.order.product_name || "").toLowerCase();
                  }
                  const amount = String(inv.total || inv.amount || 0).toLowerCase();
                  if (!number.includes(query) && !orderNo.includes(query) && !orderTitle.includes(query) && !productName.includes(query) && !amount.includes(query)) {
                    return false;
                  }
                }
                return true;
              })
              .map((inv, index) => {
                const number = inv.number || inv.no || inv.id;
                const date = inv.date || inv.issued_at || inv.created_at || "";
                const amount = inv.total || inv.amount || 0;
                const pdfUrl = inv.pdf_url || inv.file_url || inv.url || "";
                const orderNo = inv.order_number || inv.order_no || inv.order_id || inv.order?.number || inv.order?.id;
                const productName = inv.product_name || "";
                let orderTitle = inv.order_title || inv.order?.title || inv.order?.name || "";
                if (!orderTitle && inv.order?.items && Array.isArray(inv.order.items) && inv.order.items.length > 0) {
                  orderTitle = inv.order.items.map((item) => item.name || item.title || "").filter(Boolean).join(", ");
                }
                if (!orderTitle && inv.order) {
                  orderTitle = inv.order.description || inv.order.product_title || inv.order.product_name || "";
                }
                const status = inv.status || inv.type || "";
                const getStatusConfig = () => {
                  if (status.includes("e_archive") || status.includes("e_billing")) {
                    return {
                      bg: "bg-gradient-to-br from-green-50 to-emerald-100",
                      border: "border-green-300",
                      badge: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md",
                      icon: "text-green-600",
                      label: "Başarılı",
                    };
                  }
                  if (status === "failed") {
                    return {
                      bg: "bg-gradient-to-br from-red-50 to-red-100",
                      border: "border-red-300",
                      badge: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md",
                      icon: "text-red-600",
                      label: "Başarısız",
                    };
                  }
                  if (status === "cancelled") {
                    return {
                      bg: "bg-gradient-to-br from-gray-50 to-gray-100",
                      border: "border-gray-300",
                      badge: "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-md",
                      icon: "text-gray-600",
                      label: "İptal",
                    };
                  }
                  return {
                    bg: "bg-gradient-to-br from-blue-50 to-blue-100",
                    border: "border-blue-300",
                    badge: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md",
                    icon: "text-blue-600",
                    label: "Beklemede",
                  };
                };
                const statusConfig = getStatusConfig();
                const formatDate = (dateString) => {
                  if (!dateString) return "";
                  const d = new Date(dateString);
                  return d.toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                };
                const handleView = (e) => {
                  e.stopPropagation();
                  if (!pdfUrl) return;
                  let urlWithParams = pdfUrl;
                  if (urlWithParams.includes("#")) {
                    const hashIndex = urlWithParams.indexOf("#");
                    const baseUrl = urlWithParams.substring(0, hashIndex);
                    urlWithParams = `${baseUrl}#toolbar=0&navpanes=0`;
                  } else {
                    urlWithParams = `${pdfUrl}#toolbar=0&navpanes=0`;
                  }
                  setPdfPreview({
                    show: true,
                    url: urlWithParams,
                    title: `Fatura #${number}`,
                    invoiceId: inv.id,
                    originalUrl: pdfUrl,
                  });
                };
                return (
                  <motion.div
                    key={inv.id || number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    className={`border-2 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all ${statusConfig.bg} ${statusConfig.border} relative overflow-hidden group`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <div className={`p-3 ${statusConfig.bg} rounded-xl shadow-md border-2 ${statusConfig.border}`}>
                            <svg className={`w-6 h-6 ${statusConfig.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <div>
                                <h4 className="text-lg font-bold text-gray-900">Fatura #{number}</h4>
                                <p className="text-sm text-gray-600 mt-1">{formatDate(date)}</p>
                                {productName && <p className="text-sm text-gray-700 mt-1 font-medium">{productName}</p>}
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.badge} whitespace-nowrap`}>{statusConfig.label}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                          {orderNo && (
                            <span className="flex items-center gap-2 text-gray-600">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                              <span>
                                Sipariş: <strong>#{orderNo}</strong>
                                {orderTitle && <span className="ml-2 text-gray-500">({orderTitle})</span>}
                              </span>
                            </span>
                          )}
                          <span className="flex items-center gap-2 text-primary font-bold text-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {Number(amount).toLocaleString("tr-TR")} ₺
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {pdfUrl || inv.id ? (
                          <button
                            onClick={handleView}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary-dark hover:to-blue-700 font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Görüntüle
                          </button>
                        ) : (
                          <span className="px-4 py-2 text-sm text-gray-500 text-center">PDF hazırlanıyor...</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>

          {/* Pagination */}
          {invoicesPagination.last_page > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-gray-200">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">
                  {invoicesPagination.from}-{invoicesPagination.to}
                </span>{" "}
                / <span className="font-semibold">{invoicesPagination.total}</span> fatura
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadInvoices(invoicesPagination.current_page - 1)}
                  disabled={invoicesPagination.current_page === 1 || loadingInvoices}
                  className="p-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                  aria-label="Önceki sayfa"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {Array.from({ length: Math.min(5, invoicesPagination.last_page) }, (_, i) => {
                  let pageNum;
                  if (invoicesPagination.last_page <= 5) {
                    pageNum = i + 1;
                  } else if (invoicesPagination.current_page <= 3) {
                    pageNum = i + 1;
                  } else if (invoicesPagination.current_page >= invoicesPagination.last_page - 2) {
                    pageNum = invoicesPagination.last_page - 4 + i;
                  } else {
                    pageNum = invoicesPagination.current_page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => loadInvoices(pageNum)}
                      disabled={loadingInvoices}
                      className={`px-4 py-2 rounded-lg border-2 transition-all shadow-sm hover:shadow-md ${
                        pageNum === invoicesPagination.current_page ? "bg-primary text-white border-primary shadow-lg" : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => loadInvoices(invoicesPagination.current_page + 1)}
                  disabled={invoicesPagination.current_page === invoicesPagination.last_page || loadingInvoices}
                  className="p-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                  aria-label="Sonraki sayfa"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

