import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DeleteConfirmModal({
  deleteConfirmModalOpen,
  pendingToDelete,
  closeDeleteConfirmModal,
  handleDeletePendingRegistration,
  deletingPendingId,
}) {
  return (
    <AnimatePresence>
      {deleteConfirmModalOpen && pendingToDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeDeleteConfirmModal();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Başvuruyu Sil</h3>
                  <p className="text-red-100 text-sm mt-1">Bu işlem geri alınamaz</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-5">
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold text-gray-900">{pendingToDelete.company_name || "Bu başvuru"}</span> için taslak başvurunuzu silmek üzeresiniz.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-red-800">
                      <p className="font-semibold mb-1">Silinecek veriler:</p>
                      <ul className="list-disc list-inside space-y-1 text-red-700">
                        <li>Kişisel ve şirket bilgileri</li>
                        <li>Yüklenen tüm belgeler</li>
                        <li>Ortak kayıtları</li>
                        <li>Sepetteki ilgili ürün (varsa)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeDeleteConfirmModal}
                  className="flex-1 px-5 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all"
                >
                  Vazgeç
                </button>
                <button
                  type="button"
                  onClick={handleDeletePendingRegistration}
                  disabled={deletingPendingId === pendingToDelete.id}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deletingPendingId === pendingToDelete.id ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Siliniyor...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Evet, Sil
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

