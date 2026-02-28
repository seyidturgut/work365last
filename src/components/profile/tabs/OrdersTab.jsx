import React from "react";
import { motion } from "framer-motion";

export default function OrdersTab({
  orders,
  filteredOrders,
  orderSearch,
  setOrderSearch,
  loadingOrders,
  ordersPagination,
  navigate,
  openDocumentModal,
  loadOrders,
}) {
  return (
    <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Siparişlerim</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {orderSearch.trim()
                  ? `${filteredOrders.length} sonuç`
                  : `${ordersPagination.total || orders.length} sipariş bulundu`}
              </p>
            </div>
          </div>
          <div className="w-full md:w-auto flex items-center gap-2">
            <div className="relative w-full md:w-72">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Sipariş numarası, şirket veya ürün ara"
                className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
              />
            </div>
            {orderSearch && (
              <button
                onClick={() => setOrderSearch("")}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:text-gray-800 transition-all"
              >
                Temizle
              </button>
            )}
          </div>
        </div>
      </div>

      {loadingOrders ? (
        <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-primary/5 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-gray-600 font-medium mb-2">Henüz sipariş bulunmuyor</p>
          <p className="text-sm text-gray-500">İlk siparişinizi vermek için ürünler sayfasına gidin</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-primary/5 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
          </svg>
          <p className="text-gray-600 font-medium mb-2">Aramanızla eşleşen sipariş bulunamadı</p>
          <p className="text-sm text-gray-500 mb-4">Farklı bir anahtar kelime deneyebilir veya filtreyi temizleyebilirsiniz.</p>
          <button
            onClick={() => setOrderSearch("")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Filtreyi Temizle
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusConfig = {
              draft: { label: "Taslak", color: "bg-gray-100 text-gray-700 border-gray-200" },
              pending: { label: "Beklemede", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
              processing: { label: "İşleniyor", color: "bg-primary/10 text-primary border-primary/20" },
              completed: { label: "Tamamlandı", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
              failed: { label: "Başarısız", color: "bg-red-100 text-red-700 border-red-200" },
              cancelled: { label: "İptal Edildi", color: "bg-gray-100 text-gray-700 border-gray-200" },
            };
            const status = statusConfig[order.status] || statusConfig.pending;
            const date = order.created_at ? new Date(order.created_at).toLocaleDateString("tr-TR") : "";
            const companyReg = order.company_registration;
            const hasCompanyReg = companyReg && companyReg.id;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border-2 border-gray-200 hover:border-primary/50 bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">Sipariş #{order.id}</h4>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${status.color}`}>{status.label}</span>
                      </div>
                      <p className="text-sm text-gray-500">{date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {Number(order.amount || 0).toLocaleString("tr-TR")} {order.currency || "₺"}
                      </div>
                    </div>
                  </div>

                  {companyReg && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{companyReg.company_name || "Şirket Adı"}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {companyReg.product_title || "Ürün"} • {companyReg.tier || "N/A"} • {companyReg.period || "N/A"}
                          </p>
                        </div>
                        {hasCompanyReg && (
                          <button
                            onClick={() => navigate(`/siparis/${order.id}/belgeler`)}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-primary text-primary hover:bg-primary/5 transition-all"
                          >
                            Belgeleri Görüntüle
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {order.items && order.items.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Sipariş Öğeleri:</p>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                            <span className="text-gray-700">{item.name}</span>
                            <span className="font-semibold text-gray-900">
                              {Number(item.total || 0).toLocaleString("tr-TR")} {order.currency || "₺"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hasCompanyReg && (
                    <div className="pt-4 border-t border-gray-100">
                      <button
                        onClick={() => openDocumentModal(order)}
                        className="w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Ek Belge Yükle
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {ordersPagination.last_page > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{ordersPagination.from}</span>
            {" - "}
            <span className="font-medium text-gray-900">{ordersPagination.to}</span>
            {" / "}
            <span className="font-medium text-gray-900">{ordersPagination.total}</span>
            {" sipariş"}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => loadOrders(ordersPagination.current_page - 1)}
              disabled={ordersPagination.current_page === 1 || loadingOrders}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Önceki
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: ordersPagination.last_page }, (_, i) => i + 1).map((pageNum) => {
                const showPage =
                  pageNum === 1 ||
                  pageNum === ordersPagination.last_page ||
                  (pageNum >= ordersPagination.current_page - 1 && pageNum <= ordersPagination.current_page + 1);

                if (!showPage) {
                  if (pageNum === ordersPagination.current_page - 2 || pageNum === ordersPagination.current_page + 2) {
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
                    onClick={() => loadOrders(pageNum)}
                    disabled={loadingOrders}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pageNum === ordersPagination.current_page
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => loadOrders(ordersPagination.current_page + 1)}
              disabled={ordersPagination.current_page === ordersPagination.last_page || loadingOrders}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Sonraki
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

