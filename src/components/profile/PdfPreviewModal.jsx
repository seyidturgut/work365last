import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PdfPreviewModal({
  pdfPreview,
  setPdfPreview,
  getToken,
  customerApi,
  showToast,
}) {
  if (!pdfPreview) return null;

  const handleClose = () => {
    setPdfPreview({ show: false, url: "", title: "", invoiceId: null, originalUrl: "" });
  };

  const handleDownload = async () => {
    if (!pdfPreview.originalUrl) return;
    try {
      const response = await fetch(pdfPreview.originalUrl);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${pdfPreview.title.replace(/#/g, "").replace(/\s+/g, "_")}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const a = document.createElement("a");
        a.href = pdfPreview.originalUrl;
        a.download = `${pdfPreview.title.replace(/#/g, "").replace(/\s+/g, "_")}.pdf`;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      const a = document.createElement("a");
      a.href = pdfPreview.originalUrl;
      a.download = `${pdfPreview.title.replace(/#/g, "").replace(/\s+/g, "_")}.pdf`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleSendEmail = async () => {
    const token = getToken();
    if (!token || !pdfPreview.invoiceId) return;
    try {
      const response = await customerApi.invoiceSendEmail(token, pdfPreview.invoiceId);
      if (response && response.message) {
        showToast(response.message, "success");
      } else {
        showToast("Fatura e-posta ile başarıyla gönderildi.", "success");
      }
    } catch (error) {
      const errorMessage = error?.message || "E-posta gönderilirken bir hata oluştu.";
      showToast(errorMessage, "error");
    }
  };

  return (
    <AnimatePresence>
      {pdfPreview.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full h-full max-w-[98vw] max-h-[98vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-blue-600 text-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">{pdfPreview.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                {pdfPreview.invoiceId && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload();
                      }}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold"
                      title="Faturayı İndir"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      İndir
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSendEmail();
                      }}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold"
                      title="E-posta ile Gönder"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      E-posta Gönder
                    </button>
                  </>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Kapat"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {pdfPreview.url ? (
                <iframe
                  src={pdfPreview.url}
                  className="w-full h-full border-0"
                  title={pdfPreview.title}
                  style={{ border: "none", display: "block" }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">PDF yükleniyor...</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

