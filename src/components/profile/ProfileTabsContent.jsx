import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PendingTab from "./tabs/PendingTab";
import ServiceRequestsTab from "./tabs/ServiceRequestsTab";
import DocumentRequestsTab from "./tabs/DocumentRequestsTab";
import InvoicesTab from "./tabs/InvoicesTab";
import AddressesTab from "./tabs/AddressesTab";
import AccountantTasksTab from "./tabs/AccountantTasksTab";
import DeclarationsTab from "./tabs/DeclarationsTab";
import NotificationsTab from "./tabs/NotificationsTab";
import SecurityTab from "./tabs/SecurityTab";

export default function ProfileTabsContent({
  tabs,
  active,
  setActive,
  orderSearch,
  setOrderSearch,
  filteredOrders,
  ordersPagination,
  orders,
  loadingOrders,
  navigate,
  openDocumentModal,
  loadOrders,
  pendingRegistrations,
  pendingMsg,
  pendingErr,
  loadingPending,
  documentRequests,
  openPendingDocumentsModal,
  handlePendingAddToCart,
  addingPendingId,
  openDeleteConfirmModal,
  deletingPendingId,
  loadingDocumentRequests,
  documentRequestsPagination,
  loadDocumentRequests,
  invoiceSearch,
  setInvoiceSearch,
  invoiceStatusFilter,
  setInvoiceStatusFilter,
  loadingInvoices,
  invoices,
  invoicesPagination,
  loadInvoices,
  setPdfPreview,
  addresses,
  savedNotice,
  msg,
  err,
  setMsg,
  setErr,
  loading,
  openManageModal,
  openFormModal,
  setModalOpen,
  loadAddresses,
  getToken,
  customerApi,
  ...props
}) {
  return (
    <div>
      <AnimatePresence mode="wait">
        {active === "orders" && (
          <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#799b38] to-[#4a6323] flex items-center justify-center shadow-lg">
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
              <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-[#799b38]/5 p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-600 font-medium mb-2">Henüz sipariş bulunmuyor</p>
                <p className="text-sm text-gray-500">İlk siparişinizi vermek için ürünler sayfasına gidin</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-[#799b38]/5 p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
                </svg>
                <p className="text-gray-600 font-medium mb-2">Aramanızla eşleşen sipariş bulunamadı</p>
                <p className="text-sm text-gray-500 mb-4">Farklı bir anahtar kelime deneyebilir veya filtreyi temizleyebilirsiniz.</p>
                <button
                  onClick={() => setOrderSearch("")}
                  className="px-6 py-3 rounded-xl bg-[#799b38] text-white hover:bg-[#5f7d2d] font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
                    processing: { label: "İşleniyor", color: "bg-[#799b38]/10 text-[#799b38] border-[#799b38]/20" },
                    completed: { label: "Tamamlandı", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
                    failed: { label: "Başarısız", color: "bg-red-100 text-red-700 border-red-200" },
                    cancelled: { label: "İptal Edildi", color: "bg-gray-100 text-gray-700 border-gray-200" },
                  };
                  const status = statusConfig[order.status] || statusConfig.pending;
                  const date = order.created_at ? new Date(order.created_at).toLocaleDateString("tr-TR") : "";
                  const companyReg = order.company_registration;
                  const hasCompanyReg = companyReg && companyReg.id;

                  const orderItem = order.items && order.items.length > 0 ? order.items[0] : null;

                  const _nameOrTitle = (orderItem?.name || companyReg?.product_title || '').toLowerCase();
                  const _companyTypeFromName = _nameOrTitle.includes('limited') ? 'limited'
                    : _nameOrTitle.includes('anonim') ? 'anonim'
                    : _nameOrTitle.includes('şahıs') || _nameOrTitle.includes('sahis') ? 'sahis'
                    : null;

                  const _companyType = orderItem?.product_key || orderItem?.company_type || companyReg?.product_key || _companyTypeFromName;
                  const _tier = orderItem?.tier || companyReg?.tier || null;
                  const _period = orderItem?.period || companyReg?.period || 'monthly';

                  const formUrl = _companyType && _tier
                    ? `/sirket-kurulusu?companyType=${encodeURIComponent(_companyType)}&tier=${encodeURIComponent(_tier)}&period=${encodeURIComponent(_period)}`
                    : null;

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
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
                                {status.label}
                              </span>
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
                          <div className="mb-4 p-4 bg-gradient-to-r from-[#799b38]/10 to-[#799b38]/5 rounded-xl border border-[#799b38]/20">
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

                        <div className="pt-4 border-t border-gray-100 space-y-2">
                          {hasCompanyReg ? (
                            /* Form doldurulmuş — belge butonları göster */
                            <button
                              onClick={() => openDocumentModal(order)}
                              className="w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              Ek Belge Yükle
                            </button>
                          ) : formUrl && order.status !== 'failed' && order.status !== 'cancelled' ? (
                            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/70 rounded-xl p-4">
                              <div className="flex items-start gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-amber-900">Başvuru formunuz henüz doldurulmadı</p>
                                  <p className="text-xs text-amber-700 mt-0.5">
                                    Şirket kuruluş işleminizin tamamlanması için lütfen başvuru formunu doldurun.
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => navigate(formUrl)}
                                className="group w-full px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-emerald-200/50 hover:shadow-lg hover:shadow-emerald-300/50 hover:-translate-y-0.5"
                              >
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Başvuru Formunu Doldur
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          ) : null}
                        </div>
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
        )}

        {active === "pending" && (
          <PendingTab
            pendingRegistrations={pendingRegistrations}
            pendingMsg={pendingMsg}
            pendingErr={pendingErr}
            loadingPending={loadingPending}
            documentRequests={documentRequests}
            navigate={navigate}
            openPendingDocumentsModal={openPendingDocumentsModal}
            handlePendingAddToCart={handlePendingAddToCart}
            addingPendingId={addingPendingId}
            openDeleteConfirmModal={openDeleteConfirmModal}
            deletingPendingId={deletingPendingId}
          />
        )}

        {active === "service-requests" && <ServiceRequestsTab onRefresh={() => { }} />}

        {active === "document-requests" && (
          <DocumentRequestsTab
            loadingDocumentRequests={loadingDocumentRequests}
            documentRequests={documentRequests}
            navigate={navigate}
            documentRequestsPagination={documentRequestsPagination}
            loadDocumentRequests={loadDocumentRequests}
          />
        )}

        {active === "invoices" && (
          <InvoicesTab
            invoiceSearch={invoiceSearch}
            setInvoiceSearch={setInvoiceSearch}
            invoiceStatusFilter={invoiceStatusFilter}
            setInvoiceStatusFilter={setInvoiceStatusFilter}
            loadingInvoices={loadingInvoices}
            invoices={invoices}
            invoicesPagination={invoicesPagination}
            loadInvoices={loadInvoices}
            setPdfPreview={setPdfPreview}
          />
        )}

        {active === "addresses" && (
          <AddressesTab
            addresses={addresses}
            savedNotice={savedNotice}
            msg={msg}
            err={err}
            setMsg={setMsg}
            setErr={setErr}
            loading={loading}
            openManageModal={openManageModal}
            openFormModal={openFormModal}
            setActive={setActive}
            setModalOpen={setModalOpen}
            loadAddresses={loadAddresses}
            getToken={getToken}
            customerApi={customerApi}
          />
        )}

        {active === "accountant-tasks" && (
          <AccountantTasksTab
            tasks={props.accountantTasks}
            loading={props.loadingAccountantTasks}
            error={props.accountantTasksError}
            pagination={props.accountantTasksPagination}
            onPageChange={props.loadAccountantTasks}
            onTaskClick={props.openAccountantTaskModal}
          />
        )}

        {active === "declarations" && (
          <DeclarationsTab
            declarations={props.declarations}
            loading={props.loadingDeclarations}
            error={props.declarationsError}
            pagination={props.declarationsPagination}
            onPageChange={props.loadDeclarations}
            onViewClick={props.handleViewDeclaration}
          />
        )}

        {active === "notifications" && (
          <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <NotificationsTab />
          </motion.div>
        )}

        {active === "security" && (
          <SecurityTab />
        )}
      </AnimatePresence>
    </div>
  );
}
