import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUpload,
  FaTrash,
  FaEye,
  FaDownload,
  FaArrowLeft,
  FaFileAlt,
  FaCalendarAlt,
  FaTag,
  FaLink,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationCircle,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { documentRequestApi } from "../lib/api";
import { getToken } from "../lib/auth";
import { useAuth } from "../context/AuthContext";
import RelatedRecordModal from "../components/RelatedRecordModal";

export default function DocumentRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, fileId: null });
  const [relatedRecordModal, setRelatedRecordModal] = useState({ show: false, type: null, id: null, title: null });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user && id) {
      fetchDocumentRequest();
    }
  }, [user, id]);

  const fetchDocumentRequest = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await documentRequestApi.get(token, id);
      if (response && response.data) {
        setRequest(response.data);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error fetching document request:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 5000);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!fileInputRef.current || !fileInputRef.current.files[0]) {
      showToast("Lütfen bir dosya seçin", "error");
      return;
    }

    setUploading(true);
    try {
      const token = getToken();
      if (!token) return;

      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);

      await documentRequestApi.upload(token, id, formData);
      showToast("Belge başarıyla yüklendi. Admin onayından sonra işleme alınacaktır.", "success");
      fetchDocumentRequest();
      fileInputRef.current.value = "";
    } catch (error) {
      const errorMessage =
        error.data?.message ||
        error.message ||
        "Belge yüklenirken bir hata oluştu";
      showToast(errorMessage, "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    setDeleteConfirm({ show: true, fileId });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.fileId) return;

    try {
      const token = getToken();
      if (!token) return;

      await documentRequestApi.deleteFile(token, id, deleteConfirm.fileId);
      showToast("Dosya başarıyla silindi", "success");
      fetchDocumentRequest();
      setDeleteConfirm({ show: false, fileId: null });
    } catch (error) {
      showToast("Dosya silinirken bir hata oluştu", "error");
      setDeleteConfirm({ show: false, fileId: null });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Belge Talebi Bulunamadı</h2>
          <p className="text-gray-600 mb-6">Aradığınız belge talebi bulunamadı veya erişim yetkiniz bulunmamaktadır.</p>
          <button
            onClick={() => navigate("/belgelerim")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
          >
            <FaArrowLeft />
            Belge Talepleri Listesine Dön
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = {
    pending: {
      bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
      border: "border-amber-300",
      icon: <FaClock className="h-6 w-6 text-white" />,
      text: "Belge yüklenmesi bekleniyor",
      badge: "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg",
      label: "Beklemede",
      iconBg: "bg-gradient-to-br from-amber-500 to-yellow-600",
      dot: "bg-amber-500",
    },
    uploaded: {
      bg: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
      border: "border-blue-300",
      icon: <FaCloudUploadAlt className="h-6 w-6 text-white" />,
      text: "Belge yüklendi, admin onayı bekleniyor",
      badge: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg",
      label: "Onay Bekleniyor",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
      dot: "bg-blue-500",
    },
    approved: {
      bg: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
      border: "border-emerald-300",
      icon: <FaCheckCircle className="h-6 w-6 text-white" />,
      text: "Belge onaylandı ✓",
      badge: "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg",
      label: "Onaylandı",
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
      dot: "bg-emerald-500",
    },
    rejected: {
      bg: "bg-gradient-to-br from-red-50 via-rose-50 to-pink-50",
      border: "border-red-300",
      icon: <FaTimesCircle className="h-6 w-6 text-white" />,
      text: "Belge reddedildi ✗",
      badge: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg",
      label: "Reddedildi",
      iconBg: "bg-gradient-to-br from-red-500 to-rose-600",
      dot: "bg-red-500",
    },
  };

  const status = statusConfig[request.status] || statusConfig.pending;

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -100, x: "-50%" }}
            className={`fixed top-24 left-1/2 z-50 max-w-md w-full mx-4 ${
              toast.type === "success"
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-red-500 to-red-600"
            } text-white rounded-xl shadow-2xl p-4 flex items-center gap-4`}
          >
            <div className="flex-shrink-0">
              {toast.type === "success" ? (
                <FaCheckCircle className="h-6 w-6" />
              ) : (
                <FaTimesCircle className="h-6 w-6" />
              )}
            </div>
            <p className="flex-1 font-medium">{toast.message}</p>
            <button
              onClick={() => setToast({ show: false, message: "", type: "success" })}
              className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FaTimesCircle className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setDeleteConfirm({ show: false, fileId: null })}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 flex items-center justify-between">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Dosyayı Sil</h3>
                  <p className="text-red-100 text-sm mt-1">Bu işlem geri alınamaz</p>
                </div>
                <button
                  onClick={() => setDeleteConfirm({ show: false, fileId: null })}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Kapat"
                >
                  <FaTimesCircle className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    <FaTrash className="w-8 h-8 text-red-600" />
                  </div>
                  <p className="text-center text-gray-700 font-medium mb-2">
                    Bu dosyayı silmek istediğinizden emin misiniz?
                  </p>
                  <p className="text-center text-sm text-gray-500">
                    Dosya kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm({ show: false, fileId: null })}
                    className="flex-1 px-5 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pt-28 pb-20 bg-work-navy-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/belgelerim")}
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-all hover:gap-3 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Geri Dön</span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <FaFileAlt className="h-6 w-6" />
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                Belge Talebi Detayı
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {request.title}
            </h1>
            {request.description && (
              <p className="text-blue-100 text-lg max-w-3xl leading-relaxed mb-6">
                {request.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <FaLink className="h-4 w-4" />
                <span className="font-medium">{request.requestable_title}</span>
              </div>
              {request.document_type && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <FaTag className="h-4 w-4" />
                  <span className="font-medium">{request.document_type}</span>
                </div>
              )}
              {request.is_required && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-500/30 backdrop-blur-sm rounded-lg border border-red-400/50">
                  <FaExclamationCircle className="h-4 w-4" />
                  <span className="font-semibold">Zorunlu Belge</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 -mt-8">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-2xl border-2 shadow-xl mb-8 ${status.bg} ${status.border} relative overflow-hidden`}
          >
            <div className="absolute top-4 right-4">
              <div className={`w-3 h-3 rounded-full ${status.dot} shadow-lg animate-pulse`}></div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-start gap-5 flex-1">
                <div className={`${status.iconBg} p-5 rounded-xl shadow-lg border-2 ${status.border} flex-shrink-0`}>
                  {status.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="font-bold text-xl text-gray-900">Durum</h3>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${status.badge} whitespace-nowrap`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium text-lg mb-4">{status.text}</p>
                  {request.admin_notes && (
                    <div className="mt-4 p-5 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-red-200 shadow-md">
                      <div className="flex items-start gap-3 mb-3">
                        <FaExclamationCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-bold text-red-700">Admin Notu</p>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed pl-8">{request.admin_notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                  <FaLink className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Bağlı Kayıt</p>
              </div>
              {request.requestable_id && request.requestable_type ? (
                <button
                  onClick={() => {
                    setRelatedRecordModal({
                      show: true,
                      type: request.requestable_type,
                      id: request.requestable_id,
                      title: request.requestable_title
                    });
                  }}
                  className="text-left group w-full"
                >
                  <p className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center gap-2">
                    {request.requestable_title}
                    <svg className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Detayları görmek için tıklayın</p>
                </button>
              ) : (
                <p className="text-lg font-bold text-gray-900">{request.requestable_title}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                  <FaTag className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Belge Türü</p>
              </div>
              <p className="text-lg font-bold text-gray-900">{request.document_type}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                  <FaCalendarAlt className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Talep Tarihi</p>
              </div>
              <p className="text-lg font-bold text-gray-900">{formatDate(request.requested_at)}</p>
            </motion.div>

            {request.uploaded_at && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                    <FaUpload className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Yüklenme Tarihi</p>
                </div>
                <p className="text-lg font-bold text-gray-900">{formatDate(request.uploaded_at)}</p>
              </motion.div>
            )}
          </div>

          {(request.status === "pending" || request.status === "rejected") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-8"
            >
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="p-4 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg">
                  <FaUpload className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Belge Yükle</h2>
                  <p className="text-sm text-gray-600 mt-1">Belgenizi yükleyerek onay sürecini başlatın</p>
                </div>
              </div>
              <form onSubmit={handleFileUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Dosya Seç
                  </label>
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-primary file:to-blue-600 file:text-white hover:file:from-primary-dark hover:file:to-blue-700 file:transition-all file:cursor-pointer file:shadow-lg file:hover:shadow-xl"
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Desteklenen formatlar: PDF, JPG, PNG, DOC, DOCX (Maksimum 10MB)
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl font-bold hover:from-primary-dark hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Yükleniyor...</span>
                    </>
                  ) : (
                    <>
                      <FaUpload className="h-5 w-5" />
                      <span>Belgeyi Yükle</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {request.files && request.files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-white via-green-50/30 to-white rounded-2xl shadow-xl border-2 border-gray-200 p-8"
            >
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                  <FaFileAlt className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">Yüklenen Belgeler</h2>
                  <p className="text-sm text-gray-600 mt-1">Yüklediğiniz belgelerin listesi</p>
                </div>
                <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full text-sm font-semibold shadow-md">
                  {request.files.length} dosya
                </span>
              </div>
              <div className="space-y-4">
                {request.files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between p-6 bg-white rounded-xl border-2 border-gray-200 hover:shadow-xl hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="p-4 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                        <FaFileAlt className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-lg text-gray-900 mb-2 truncate">{file.file_name}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-gray-700 font-semibold">
                            <span>{formatFileSize(file.file_size)}</span>
                          </span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold">
                            {file.mime_type}
                          </span>
                          <span className="flex items-center gap-2 text-gray-500">
                            <FaCalendarAlt className="h-3.5 w-3.5" />
                            {formatDate(file.uploaded_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-primary hover:bg-primary/10 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                        title="Görüntüle"
                      >
                        <FaEye className="h-5 w-5" />
                      </a>
                      <a
                        href={file.file_url}
                        download
                        className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                        title="İndir"
                      >
                        <FaDownload className="h-5 w-5" />
                      </a>
                      {request.status !== "approved" && (
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                          title="Sil"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Record Modal */}
      <RelatedRecordModal
        show={relatedRecordModal.show}
        onClose={() => setRelatedRecordModal({ show: false, type: null, id: null, title: null })}
        recordType={relatedRecordModal.type}
        recordId={relatedRecordModal.id}
        recordTitle={relatedRecordModal.title}
      />
    </div>
  );
}

