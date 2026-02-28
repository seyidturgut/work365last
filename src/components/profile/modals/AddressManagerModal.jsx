import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AddressManagerModal({
  modalOpen,
  setModalOpen,
  addresses,
  msg,
  err,
  setMsg,
  setErr,
  openFormModal,
  getToken,
  customerApi,
  loadAddresses,
}) {
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-8"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-primary via-primary-dark to-primary p-6 flex items-center justify-between flex-shrink-0">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">Adresleri Yönet</h2>
                <p className="text-white/80 text-sm">Adres ekleyin, düzenleyin, varsayılan/fatura olarak işaretleyin</p>
              </div>
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {(msg || err) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 rounded-xl px-4 py-3 text-sm border-2 shadow-sm ${msg ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}
                  >
                    {msg || err}
                  </motion.div>
                )}

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Kayıtlı Adresler</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{addresses.length} adres kayıtlı</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setModalOpen(false);
                        openFormModal();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 group"
                    >
                      <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Yeni Adres Ekle
                    </button>
                  </div>
                </div>

                {addresses.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 bg-gradient-to-br from-gray-50 to-primary/5 rounded-2xl border-2 border-dashed border-gray-300"
                  >
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-600 font-medium mb-2">Henüz adres eklenmemiş</p>
                    <p className="text-sm text-gray-500 mb-6">İlk adresinizi ekleyerek başlayın</p>
                    <button
                      onClick={() => {
                        setModalOpen(false);
                        openFormModal();
                      }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      İlk Adresinizi Ekleyin
                    </button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(addresses || []).map((a) => (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative rounded-2xl border-2 border-gray-200 hover:border-primary/50 bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden"
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-bold text-gray-900">{a.label || "Adres"}</h4>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {a.is_default && (
                                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                                  Varsayılan
                                </span>
                              )}
                              {a.is_billing && (
                                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200">
                                  Fatura
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="font-medium">{a.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span>{a.phone}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div>
                                <div>{a.address}</div>
                                <div className="text-gray-500">
                                  {a.district ? `${a.district}, ` : ""}
                                  {a.city} / {a.country}
                                  {a.postal_code ? ` • ${a.postal_code}` : ""}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-4 border-top border-gray-100">
                            <button
                              onClick={() => {
                                setModalOpen(false);
                                openFormModal(a);
                              }}
                              className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                            >
                              Düzenle
                            </button>
                            {!a.is_default && (
                              <button
                                onClick={async () => {
                                  const token = getToken();
                                  if (!token) return;
                                  setErr("");
                                  setMsg("");
                                  try {
                                    await customerApi.setDefaultAddress(token, a.id);
                                    setMsg("Varsayılan adres güncellendi.");
                                    loadAddresses();
                                  } catch (e) {
                                    setErr(e?.message || "İşlem başarısız.");
                                  }
                                }}
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-primary/5 text-primary hover:bg-primary/10 transition-all"
                              >
                                Varsayılan
                              </button>
                            )}
                            {!a.is_billing && (
                              <button
                                onClick={async () => {
                                  const token = getToken();
                                  if (!token) return;
                                  setErr("");
                                  setMsg("");
                                  try {
                                    await customerApi.setBillingAddress(token, a.id);
                                    setMsg("Fatura adresi güncellendi.");
                                    loadAddresses();
                                  } catch (e) {
                                    setErr(e?.message || "İşlem başarısız.");
                                  }
                                }}
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all"
                              >
                                Fatura
                              </button>
                            )}
                            <button
                              onClick={async () => {
                                const token = getToken();
                                if (!token) return;
                                setErr("");
                                setMsg("");
                                try {
                                  await customerApi.deleteAddress(token, a.id);
                                  setMsg("Adres silindi.");
                                  loadAddresses();
                                } catch (e) {
                                  setErr(e?.message || "Silinemedi.");
                                }
                              }}
                              className="px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                            >
                              Sil
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

