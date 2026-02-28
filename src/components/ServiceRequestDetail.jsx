import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serviceRequestApi, documentRequestApi } from "../lib/api";
import { getToken } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const turkishLabels = {
  company_name: "Şirket Adı",
  company_type: "Şirket Tipi",
  tax_number: "Vergi No",
  contact_name: "İletişim Adı",
  contact_email: "İletişim E-posta",
  contact_phone: "İletişim Telefon",
  service: "Hizmet",
  status: "Durum",
  payment_status: "Ödeme Durumu",
  pricing: "Fiyatlandırma",
  net_price: "Net Fiyat",
  vat: "KDV",
  gross_price: "Brüt Fiyat",
  meta: "Ek Bilgiler",
  created_at: "Oluşturulma Tarihi",
  updated_at: "Güncellenme Tarihi",
};

const getLabelTR = (key) => {
  return turkishLabels[key] || key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
};

const statusConfig = {
  draft: { label: 'Taslak', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  submitted: { label: 'Gönderildi', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  in_review: { label: 'İnceleniyor', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  approved: { label: 'Onaylandı', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  rejected: { label: 'Reddedildi', color: 'bg-red-100 text-red-700 border-red-200' },
  completed: { label: 'Tamamlandı', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
};

const paymentStatusConfig = {
  pending: { label: 'Ödeme Bekliyor', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  paid: { label: 'Ödendi', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  refunded: { label: 'İade Edildi', color: 'bg-blue-100 text-blue-700 border-blue-200' },
};

export default function ServiceRequestDetail({ onRefresh }) {
  const navigate = useNavigate();
  const { refresh: refreshCart } = useCart();
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentRequests, setDocumentRequests] = useState([]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [docLoading, setDocLoading] = useState(false);
  const [docForm, setDocForm] = useState({});
  const [uploadingDocs, setUploadingDocs] = useState(false);
  const [docMsg, setDocMsg] = useState("");
  const [docErr, setDocErr] = useState("");

  const loadServiceRequests = async () => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    setMsg("");
    setErr("");
    try {
      const res = await serviceRequestApi.list(token);
      const list = res?.data || res || [];
      setServiceRequests(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("Hizmet talepleri yüklenemedi:", e);
      setErr(e?.message || "Hizmet talepleri yüklenemedi.");
      setServiceRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServiceRequests();
    loadDocumentRequests();
  }, []);

  const loadDocumentRequests = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await documentRequestApi.list(token, 1, 100);
      const list = res?.data || res || [];
      setDocumentRequests(Array.isArray(list) ? list : []);
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error("Belge talepleri yüklenemedi:", e);
      }
      setDocumentRequests([]);
    }
  };

  const openDocumentsModal = async (request) => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    setDocErr("");
    setDocMsg("");
    setDocForm({});
    setSelectedRequest(null);
    setDocModalOpen(true);
    setDocLoading(true);

    try {
      const res = await serviceRequestApi.get(token, request.id);
      const data = res?.data || res;
      setSelectedRequest(data);
      
      if (data.documents && Array.isArray(data.documents)) {
        const formState = {};
        data.documents.forEach(doc => {
          formState[doc.document_type] = null;
        });
        setDocForm(formState);
      }
    } catch (e) {
      console.error("Hizmet talebi detayı alınamadı:", e);
      setDocErr(e?.message || "Detay getirilemedi.");
    } finally {
      setDocLoading(false);
    }
  };

  const closeDocumentsModal = () => {
    setDocModalOpen(false);
    setSelectedRequest(null);
    setDocForm({});
    setDocMsg("");
    setDocErr("");
    setDocLoading(false);
    setUploadingDocs(false);
  };

  const handleDocumentFile = (docType, file) => {
    setDocForm(prev => ({ ...prev, [docType]: file }));
  };

  const handleDocumentsSave = async () => {
    if (!selectedRequest) {
      setDocErr("Hizmet talebi bilgisi bulunamadı.");
      return;
    }

    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const filesToUpload = [];
    const filesToUpdate = [];

    Object.entries(docForm).forEach(([docType, file]) => {
      if (file instanceof File) {
        const existingDoc = selectedRequest.documents?.find(d => d.document_type === docType);
        if (existingDoc) {
          filesToUpdate.push({ documentId: existingDoc.id, docType, file });
        } else {
          filesToUpload.push({ docType, file });
        }
      }
    });

    if (filesToUpload.length === 0 && filesToUpdate.length === 0) {
      setDocErr("Lütfen güncellemek istediğiniz belgeleri seçin.");
      return;
    }

    setDocErr("");
    setDocMsg("");
    setUploadingDocs(true);

    try {
      if (filesToUpload.length > 0) {
        const uploadFormData = new FormData();
        filesToUpload.forEach(({ docType, file }) => {
          uploadFormData.append(docType, file);
        });
        await serviceRequestApi.uploadDocuments(token, selectedRequest.id, uploadFormData);
      }

      for (const { documentId, file } of filesToUpdate) {
        const updateFormData = new FormData();
        updateFormData.append('file', file);
        await serviceRequestApi.updateDocument(token, selectedRequest.id, documentId, updateFormData);
      }

      const updated = await serviceRequestApi.get(token, selectedRequest.id);
      setSelectedRequest(updated?.data || updated);
      setDocForm({});
      setDocMsg("Belgeler başarıyla güncellendi.");
      await loadServiceRequests();
      if (onRefresh) onRefresh();
    } catch (e) {
      console.error("Belgeler güncellenemedi:", e);
      setDocErr(e?.message || "Belgeler güncellenemedi.");
    } finally {
      setUploadingDocs(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!selectedRequest || !documentId) return;
    
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    if (!window.confirm("Bu belgeyi silmek istediğinize emin misiniz?")) {
      return;
    }

    setDocErr("");
    setDocMsg("");

    try {
      await serviceRequestApi.deleteDocument(token, selectedRequest.id, documentId);
      const updated = await serviceRequestApi.get(token, selectedRequest.id);
      setSelectedRequest(updated?.data || updated);
      setDocMsg("Belge başarıyla silindi.");
      await loadServiceRequests();
      if (onRefresh) onRefresh();
    } catch (e) {
      console.error("Belge silinemedi:", e);
      setDocErr(e?.message || "Belge silinemedi.");
    }
  };

  const openSummaryModal = async (request) => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    setSelectedRequest(null);
    setSummaryModalOpen(true);

    try {
      const res = await serviceRequestApi.get(token, request.id);
      const data = res?.data || res;
      setSelectedRequest(data);
    } catch (e) {
      console.error("Hizmet talebi detayı alınamadı:", e);
    }
  };

  const closeSummaryModal = () => {
    setSummaryModalOpen(false);
    setSelectedRequest(null);
  };

  const getDocumentTypeLabel = (docType) => {
    if (!docType) return "Belge";
    const labels = {
      trademark_logo: "Marka Logosu",
      company_signature_circular: "İmza Sirküleri",
      power_of_attorney: "Vekaletname",
      identity_document: "Kimlik Belgesi",
      company_document: "Şirket Belgesi",
    };
    return labels[docType] || String(docType).replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
  };

  const handleAddToCart = async (request) => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    setErr("");
    setMsg("");
    setAddingToCartId(request.id);

    try {
      await serviceRequestApi.addToCart(token, request.id);
      if (typeof refreshCart === "function") {
        await refreshCart();
      }
      await loadServiceRequests();
      setMsg("Hizmet talebi sepete eklendi. 3 saniye içinde ödeme sayfasına yönlendirileceksiniz...");
      setTimeout(() => {
        navigate("/odeme");
      }, 3000);
    } catch (e) {
      setErr(e?.message || "Hizmet talebi sepete eklenemedi.");
    } finally {
      setAddingToCartId(null);
    }
  };

  const openDeleteConfirmModal = (request) => {
    setRequestToDelete(request);
    setDeleteConfirmModalOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setDeleteConfirmModalOpen(false);
    setRequestToDelete(null);
  };

  const handleDelete = async () => {
    if (!requestToDelete) return;

    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    setErr("");
    setMsg("");
    setDeletingId(requestToDelete.id);

    try {
      await serviceRequestApi.delete(token, requestToDelete.id);
      if (typeof refreshCart === "function") {
        await refreshCart();
      }
      await loadServiceRequests();
      setMsg("Hizmet talebi başarıyla silindi.");
      closeDeleteConfirmModal();
    } catch (e) {
      setErr(e?.message || "Hizmet talebi silinemedi. Sadece ödeme bekleyen talepler silinebilir.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Hizmet Talepleri</h3>
            <p className="text-sm text-gray-500 mt-0.5">{serviceRequests.length} talep bulundu</p>
          </div>
        </div>
      </div>

      {(msg || err) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 rounded-xl px-4 py-3 text-sm border-2 shadow-sm ${msg ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}
        >
          {msg || err}
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
      ) : serviceRequests.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-purple-50/30 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600 font-medium mb-2">Henüz hizmet talebiniz bulunmuyor</p>
          <p className="text-sm text-gray-500">Yeni bir hizmet talebi oluşturmak için hizmetler sayfasını ziyaret edebilirsiniz.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {serviceRequests.map((request) => {
            const status = (request.status && statusConfig[request.status]) ? statusConfig[request.status] : statusConfig.draft;
            const paymentStatus = paymentStatusConfig[request.payment_status] || paymentStatusConfig.pending;
            const date = request.created_at ? new Date(request.created_at).toLocaleDateString('tr-TR') : '';
            const pricing = request.pricing || {};

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border-2 border-gray-200 hover:border-purple-400/70 bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">Talep #{request.id}</h4>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
                          {status.label}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${paymentStatus.color}`}>
                          {paymentStatus.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {Number(pricing.gross_price || 0).toLocaleString('tr-TR')} ₺
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        (KDV: {Number(pricing.vat || 0).toLocaleString('tr-TR')} ₺)
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{request.company_name || 'Şirket Adı'}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {request.service?.title || 'Hizmet'} • {request.company_type || 'N/A'}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-white border border-purple-200 text-purple-700 text-xs font-semibold">
                        {request.service?.key || 'service'}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11m0 0l-4-4m4 4l-4 4m6-9a9 9 0 110 18 9 9 0 010-18z" />
                      </svg>
                      <span>Durum: <span className="font-semibold text-gray-800">{status.label}</span></span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Ödeme: <span className="font-semibold text-gray-800">{paymentStatus.label}</span></span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Belgeler: <span className="font-semibold text-gray-800">{request.documents_count || 0}</span></span>
                    </div>
                  </div>

                  {/* Belge Talepleri */}
                  {(() => {
                    const relatedRequests = documentRequests.filter(req => {
                      const type = (req.requestable_type || '').toLowerCase();
                      return (type.includes('servicerequest') || type.includes('service_request')) && 
                             req.requestable_id === request.id;
                    });
                    
                    if (relatedRequests.length === 0) return null;
                    
                    return (
                      <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h5 className="font-semibold text-blue-900">Belge Talepleri ({relatedRequests.length})</h5>
                        </div>
                        <div className="space-y-2">
                          {relatedRequests.map((req) => {
                            const getStatusColor = (status) => {
                              switch (status) {
                                case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                                case 'uploaded': return 'bg-blue-100 text-blue-800 border-blue-200';
                                case 'approved': return 'bg-green-100 text-green-800 border-green-200';
                                case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
                                default: return 'bg-gray-100 text-gray-800 border-gray-200';
                              }
                            };
                            const getStatusText = (status) => {
                              switch (status) {
                                case 'pending': return 'Beklemede';
                                case 'uploaded': return 'Onay Bekleniyor';
                                case 'approved': return 'Onaylandı';
                                case 'rejected': return 'Reddedildi';
                                default: return status;
                              }
                            };
                            return (
                              <button
                                key={req.id}
                                onClick={() => navigate(`/belgelerim/${req.id}`)}
                                className="w-full text-left p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all group"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 group-hover:text-primary transition-colors truncate">{req.title}</p>
                                    {req.description && (
                                      <p className="text-xs text-gray-600 mt-1 line-clamp-1">{req.description}</p>
                                    )}
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
                    );
                  })()}

                  <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <p className="text-sm text-gray-500">
                      {request.payment_status === "pending" 
                        ? "Ödeme bekleyen hizmet talebiniz. Ödemeyi tamamlamak için sepete ekleyin."
                        : "Hizmet talebinizi tamamlamak için gerekli belgeleri yükleyin."}
                    </p>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <button
                        onClick={() => openSummaryModal(request)}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-purple-200 text-purple-600 hover:bg-purple-50 transition-all"
                      >
                        Özeti Görüntüle
                      </button>
                      <button
                        onClick={() => openDocumentsModal(request)}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-purple-200 text-purple-600 hover:bg-purple-50 transition-all"
                      >
                        Belgeleri Düzenle
                      </button>
                      {request.payment_status === "pending" && (
                        <>
                          <button
                            onClick={() => handleAddToCart(request)}
                            disabled={addingToCartId === request.id || deletingId === request.id}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {addingToCartId === request.id ? (
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
                            onClick={() => openDeleteConfirmModal(request)}
                            disabled={addingToCartId === request.id || deletingId === request.id}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Başvuruyu Sil
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Belgeleri Düzenle Modal */}
      <AnimatePresence>
        {docModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeDocumentsModal();
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 p-6 flex items-center justify-between flex-shrink-0">
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-1">Belgeleri Düzenle</h2>
                  <p className="text-purple-100 text-sm">Eksik belgeleri tamamlayın, mevcut olanları güncelleyin.</p>
                </div>
                <button
                  type="button"
                  onClick={closeDocumentsModal}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {docLoading ? (
                  <div className="flex items-center justify-center py-16 text-purple-600">
                    <svg className="w-10 h-10 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : selectedRequest ? (
                  <div className="space-y-6">
                    {(docMsg || docErr) && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-xl px-4 py-3 text-sm border-2 shadow-sm ${docMsg ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}
                      >
                        {docMsg || docErr}
                      </motion.div>
                    )}

                    <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-5 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-blue-700 mb-1">Hizmet Talebi Özeti</h3>
                        <p className="text-xs text-blue-600">Doldurduğunuz tüm bilgileri görüntülemek için özet modalını açın.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setDocModalOpen(false);
                          openSummaryModal(selectedRequest);
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Özeti Görüntüle
                      </button>
                    </div>

                    <div className="space-y-4">
                      {selectedRequest.documents && Array.isArray(selectedRequest.documents) && selectedRequest.documents.length > 0 ? (
                        selectedRequest.documents.map((doc) => {
                          if (!doc || !doc.document_type) return null;
                          const selectedFile = docForm[doc.document_type];
                          return (
                            <div key={doc.id} className="border border-gray-200 rounded-2xl p-5">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    {getDocumentTypeLabel(doc.document_type)}
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">Yüklendi</span>
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">{doc.file_name || 'belge.pdf'}</p>
                                  {doc.file_url && (
                                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                      <a
                                        href={doc.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-purple-300 hover:text-purple-600 transition-all"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Mevcut Belgeyi Aç
                                      </a>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteDocument(doc.id)}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-all"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Sil
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <div className="md:w-64 w-full">
                                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-purple-200 rounded-xl bg-purple-50/50 hover:bg-purple-50 transition-all cursor-pointer">
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        if (file && file.size > 10 * 1024 * 1024) {
                                          setDocErr("Dosya boyutu 10MB'ı aşamaz.");
                                          return;
                                        }
                                        handleDocumentFile(doc.document_type, file);
                                      }}
                                    />
                                    <svg className="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h10a4 4 0 004-4m-9-9v10m0 0l-3-3m3 3l3-3" />
                                    </svg>
                                    <p className="text-sm font-medium text-purple-700">
                                      {selectedFile ? selectedFile.name : 'Yeni Belge Seç'}
                                    </p>
                                    <p className="text-xs text-purple-500 mt-1">PDF veya Görsel (Max 10MB)</p>
                                  </label>
                                  {selectedFile && (
                                    <button
                                      type="button"
                                      onClick={() => handleDocumentFile(doc.document_type, null)}
                                      className="mt-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                                    >
                                      Seçimi Temizle
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>Henüz belge yüklenmemiş. Yeni belge yüklemek için hizmet detay sayfasını kullanın.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">Hizmet talebi bilgisi bulunamadı.</div>
                )}
              </div>

              <div className="bg-gray-50 border-t border-gray-200 p-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={closeDocumentsModal}
                  className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 font-semibold transition-all"
                >
                  Vazgeç
                </button>
                <button
                  type="button"
                  onClick={handleDocumentsSave}
                  disabled={uploadingDocs}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {uploadingDocs ? (
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

      {/* Özet Modal */}
      <AnimatePresence>
        {summaryModalOpen && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationStart={() => {
              setTimeout(() => {
                const modalElement = document.querySelector('[class*="rounded-3xl"][class*="max-w-5xl"]');
                if (modalElement) {
                  modalElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 100);
            }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeSummaryModal();
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 p-6 flex items-center justify-between flex-shrink-0">
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-1">Hizmet Talebi Bilgileri Özeti</h2>
                  <p className="text-blue-100 text-sm">Doldurduğunuz tüm bilgileri kontrol edin.</p>
                </div>
                <button
                  type="button"
                  onClick={closeSummaryModal}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-5">
                  {/* Genel Bilgiler */}
                  <div className="rounded-2xl border-2 border-blue-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 p-5">
                    <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Genel Bilgiler
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                      <div><span className="font-semibold text-gray-900">Hizmet:</span> {selectedRequest.service?.title || 'N/A'}</div>
                      <div><span className="font-semibold text-gray-900">Şirket Adı:</span> {selectedRequest.company_name || 'Belirtilmemiş'}</div>
                      <div><span className="font-semibold text-gray-900">Şirket Tipi:</span> {selectedRequest.company_type || 'N/A'}</div>
                      <div><span className="font-semibold text-gray-900">Durum:</span> <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">{statusConfig[selectedRequest.status]?.label || 'N/A'}</span></div>
                      <div><span className="font-semibold text-gray-900">Ödeme Durumu:</span> <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">{paymentStatusConfig[selectedRequest.payment_status]?.label || 'N/A'}</span></div>
                      {selectedRequest.pricing && (
                        <>
                          <div><span className="font-semibold text-gray-900">Net Fiyat:</span> {Number(selectedRequest.pricing.net_price || 0).toLocaleString('tr-TR')} ₺</div>
                          <div><span className="font-semibold text-gray-900">KDV:</span> {Number(selectedRequest.pricing.vat || 0).toLocaleString('tr-TR')} ₺</div>
                          <div><span className="font-semibold text-gray-900">Brüt Fiyat:</span> {Number(selectedRequest.pricing.gross_price || 0).toLocaleString('tr-TR')} ₺</div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* İletişim Bilgileri */}
                  <div className="border border-gray-200 rounded-2xl overflow-hidden">
                    <details className="group" open>
                      <summary className="cursor-pointer bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 font-bold px-5 py-4 flex items-center justify-between hover:from-gray-150 hover:to-gray-100 transition-all">
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          İletişim Bilgileri
                        </span>
                        <svg className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </summary>
                      <div className="px-5 py-5 bg-white">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          {selectedRequest.contact_name && (
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">İletişim Adı</span>
                              <span className="text-gray-700 mt-1">{selectedRequest.contact_name}</span>
                            </div>
                          )}
                          {selectedRequest.contact_email && (
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">İletişim E-posta</span>
                              <span className="text-gray-700 mt-1">{selectedRequest.contact_email}</span>
                            </div>
                          )}
                          {selectedRequest.contact_phone && (
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">İletişim Telefon</span>
                              <span className="text-gray-700 mt-1">{selectedRequest.contact_phone}</span>
                            </div>
                          )}
                          {selectedRequest.tax_number && (
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">Vergi No</span>
                              <span className="text-gray-700 mt-1">{selectedRequest.tax_number}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* Ek Bilgiler */}
                  {selectedRequest.meta && Object.keys(selectedRequest.meta).length > 0 && (
                    <div className="border border-gray-200 rounded-2xl overflow-hidden">
                      <details className="group">
                        <summary className="cursor-pointer bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 font-bold px-5 py-4 flex items-center justify-between hover:from-gray-150 hover:to-gray-100 transition-all">
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Ek Bilgiler
                          </span>
                          <svg className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </summary>
                        <div className="px-5 py-5 bg-white">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            {Object.entries(selectedRequest.meta).map(([key, value]) => (
                              value && (
                                <div key={key} className="flex flex-col">
                                  <span className="font-semibold text-gray-900">{getLabelTR(key)}</span>
                                  <span className="text-gray-700 mt-1">{String(value)}</span>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      </details>
                    </div>
                  )}

                  {/* Belgeler */}
                  {selectedRequest.documents && Array.isArray(selectedRequest.documents) && selectedRequest.documents.length > 0 && (
                    <div className="border border-gray-200 rounded-2xl overflow-hidden">
                      <details className="group">
                        <summary className="cursor-pointer bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 font-bold px-5 py-4 flex items-center justify-between hover:from-gray-150 hover:to-gray-100 transition-all">
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Belgeler ({selectedRequest.documents.length})
                          </span>
                          <svg className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </summary>
                        <div className="px-5 py-5 bg-white space-y-3">
                          {selectedRequest.documents.map((doc) => {
                            if (!doc || !doc.document_type) return null;
                            return (
                            <div key={doc.id} className="bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-xl p-4 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{getDocumentTypeLabel(doc.document_type)}</p>
                                  <p className="text-xs text-gray-600 mt-1">{doc.file_name || 'belge.pdf'}</p>
                                </div>
                                {doc.file_url && (
                                  <a
                                    href={doc.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-all text-sm"
                                  >
                                    Görüntüle
                                  </a>
                                )}
                              </div>
                            </div>
                            );
                          })}
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end flex-shrink-0">
                <button
                  type="button"
                  onClick={closeSummaryModal}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Silme Onay Modal */}
      <AnimatePresence>
        {deleteConfirmModalOpen && requestToDelete && (
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
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 flex items-center justify-between">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Başvuruyu Sil</h3>
                  <p className="text-red-100 text-sm mt-1">Bu işlem geri alınamaz</p>
                </div>
                <button
                  onClick={closeDeleteConfirmModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Kapat"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <p className="text-center text-gray-700 font-medium mb-2">
                    Bu hizmet talebini silmek istediğinizden emin misiniz?
                  </p>
                  <p className="text-center text-sm text-gray-500">
                    Tüm belgeler ve veriler kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                  </p>
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
                    onClick={handleDelete}
                    disabled={deletingId === requestToDelete.id}
                    className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {deletingId === requestToDelete.id ? (
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
    </>
  );
}

