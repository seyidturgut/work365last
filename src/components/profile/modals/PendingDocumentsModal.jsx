import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PendingDocumentsModal({
  pendingDocModalOpen,
  pendingDocRegistration,
  pendingDocLoading,
  pendingDocMsg,
  pendingDocErr,
  pendingDocumentDefinitions,
  pendingDocForm,
  closePendingDocumentsModal,
  setPendingSummaryModalOpen,
  handlePendingDocumentFile,
  uploadingPendingDocs,
  handlePendingDocumentsSave,
  setPendingDocErr,
}) {
  return (
    <AnimatePresence>
      {pendingDocModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePendingDocumentsModal();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 flex items-center justify-between flex-shrink-0">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">Belgeleri Düzenle</h2>
                <p className="text-amber-100 text-sm">Eksik belgeleri tamamlayın, mevcut olanları güncelleyin.</p>
              </div>
              <button
                type="button"
                onClick={closePendingDocumentsModal}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {pendingDocLoading ? (
                <div className="flex items-center justify-center py-16 text-amber-600">
                  <svg className="w-10 h-10 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : pendingDocRegistration ? (
                <div className="space-y-6">
                  {(pendingDocMsg || pendingDocErr) && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-xl px-4 py-3 text-sm border-2 shadow-sm ${pendingDocMsg ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"
                        }`}
                    >
                      {pendingDocMsg || pendingDocErr}
                    </motion.div>
                  )}

                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-primary mb-1">Başvuru Özeti</h3>
                      <p className="text-xs text-gray-600">Doldurduğunuz tüm bilgileri görüntülemek için özet modalını açın.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPendingSummaryModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Özeti Görüntüle
                    </button>
                  </div>

                  <div className="space-y-4">
                    {pendingDocumentDefinitions.map((docDef) => {
                      const existingDoc = pendingDocRegistration?.documents?.[docDef.key];
                      const selectedFile = pendingDocForm[docDef.key];
                      return (
                        <div key={docDef.key} className="border border-gray-200 rounded-2xl p-5">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                {docDef.label}
                                {existingDoc?.url && (
                                  <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">Yüklendi</span>
                                )}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">{docDef.description}</p>
                              {existingDoc?.url && (
                                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                  <a
                                    href={existingDoc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-amber-300 hover:text-amber-600 transition-all"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Mevcut Belgeyi Aç
                                  </a>
                                  <span className="text-xs text-gray-500">{existingDoc.name || "belge.pdf"}</span>
                                </div>
                              )}
                            </div>
                            <div className="md:w-64 w-full">
                              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-amber-200 rounded-xl bg-amber-50/50 hover:bg-amber-50 transition-all cursor-pointer">
                                <input
                                  type="file"
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    if (file && file.size > 10 * 1024 * 1024) {
                                      setPendingDocErr("Dosya boyutu 10MB'ı aşamaz.");
                                      return;
                                    }
                                    handlePendingDocumentFile(docDef.key, file);
                                  }}
                                />
                                <svg className="w-8 h-8 text-amber-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h10a4 4 0 004-4m-9-9v10m0 0l-3-3m3 3l3-3" />
                                </svg>
                                <p className="text-sm font-medium text-amber-700">{selectedFile ? selectedFile.name : "Belge Seç"}</p>
                                <p className="text-xs text-amber-500 mt-1">PDF veya Görsel (Max 10MB)</p>
                              </label>
                              {selectedFile && (
                                <button
                                  type="button"
                                  onClick={() => handlePendingDocumentFile(docDef.key, null)}
                                  className="mt-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                                >
                                  Seçimi Temizle
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">Başvuru bilgisi bulunamadı.</div>
              )}
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={closePendingDocumentsModal}
                className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 font-semibold transition-all"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handlePendingDocumentsSave}
                disabled={uploadingPendingDocs}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploadingPendingDocs ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Belgeleri Güncelle
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

