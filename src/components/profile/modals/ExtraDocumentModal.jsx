import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ExtraDocumentModal({
  documentModalOpen,
  selectedOrder,
  setDocumentModalOpen,
  setSelectedOrder,
  documentForm,
  setDocumentForm,
  uploadingDocument,
  handleDocumentUpload,
  msg,
  err,
  setErr,
}) {
  return (
    <AnimatePresence>
      {documentModalOpen && selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setDocumentModalOpen(false);
              setSelectedOrder(null);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-primary via-blue-600 to-primary p-6 flex items-center justify-between flex-shrink-0">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">Ek Belge Yükle</h2>
                <p className="text-white/80 text-sm">Sipariş #{selectedOrder.id} için ek belge yükleyin</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDocumentModalOpen(false);
                  setSelectedOrder(null);
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

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Belge Başlığı <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={documentForm.title}
                      onChange={(e) => setDocumentForm({ ...documentForm, title: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                      placeholder="Örn: Ek Sözleşme, Ek Belge..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Açıklama (Opsiyonel)</label>
                    <textarea
                      value={documentForm.description}
                      onChange={(e) => setDocumentForm({ ...documentForm, description: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all resize-none bg-white text-gray-900 placeholder:text-gray-400"
                      rows={3}
                      placeholder="Belge hakkında açıklama..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Dosya <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const maxSize = 10 * 1024 * 1024;
                            if (file.size > maxSize) {
                              setErr("Dosya boyutu 10MB'dan büyük olamaz.");
                              return;
                            }
                            const allowedTypes = [
                              "application/pdf",
                              "image/jpeg",
                              "image/jpg",
                              "image/png",
                              "application/msword",
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ];
                            if (!allowedTypes.includes(file.type)) {
                              setErr("Sadece PDF, resim (JPEG, PNG) veya Word dosyaları yüklenebilir.");
                              return;
                            }
                            setDocumentForm({ ...documentForm, file });
                            setErr("");
                          }
                        }}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="hidden"
                        id="document-file-input"
                      />
                      <label
                        htmlFor="document-file-input"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 hover:border-primary/50 cursor-pointer transition-all group"
                      >
                        {documentForm.file ? (
                          <div className="flex flex-col items-center">
                            <svg className="w-12 h-12 text-emerald-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium text-gray-900">{documentForm.file.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{(documentForm.file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <svg className="w-10 h-10 text-gray-400 group-hover:text-primary mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">Dosya seçmek için tıklayın</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG veya Word (Max: 10MB)</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm text-gray-800">
                        <p className="font-semibold mb-1">Belge gereksinimleri:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>PDF dosyaları</li>
                          <li>Resim dosyaları (JPEG, PNG)</li>
                          <li>Word belgeleri (.doc, .docx)</li>
                          <li>Maksimum dosya boyutu: 10MB</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-end gap-4 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDocumentModalOpen(false);
                  setSelectedOrder(null);
                  setDocumentForm({ title: "", description: "", file: null });
                }}
                className="px-6 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all shadow-sm"
              >
                İptal
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDocumentUpload();
                }}
                disabled={uploadingDocument || !documentForm.title || !documentForm.file}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary-dark hover:to-blue-700 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
              >
                {uploadingDocument ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Yükle
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

