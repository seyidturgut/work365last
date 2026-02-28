import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaIdCard, FaHome, FaBuilding, FaHandshake, FaFileSignature } from "react-icons/fa";
import { ordersApi, additionalDocumentsApi, companyRegistrationApi } from "../lib/api";
import { getToken } from "../lib/auth";

export default function OrderDocuments() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [companyRegistration, setCompanyRegistration] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [documentForm, setDocumentForm] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);

  useEffect(() => {
    loadOrder();
    loadDocuments();
  }, [orderId]);

  const loadOrder = async () => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const res = await ordersApi.get(token, orderId);
      setOrder(res?.data || res);
    } catch (e) {
      setErr(e?.message || "Sipariş yüklenemedi.");
      console.error("Sipariş yüklenemedi:", e);
    } finally {
      setLoading(false);
    }
  };

  const loadDocuments = async () => {
    const token = getToken();
    if (!token) return;
    setLoadingDocuments(true);
    try {
      let orderData = order;
      if (!orderData) {
        const res = await ordersApi.get(token, orderId);
        orderData = res?.data || res;
        setOrder(orderData);
      }
      const companyRegistrationId = orderData?.company_registration?.id;
      if (!companyRegistrationId) {
        setDocuments([]);
        setCompanyRegistration(null);
        return;
      }

      // Company registration detayını çek
      const companyRegRes = await companyRegistrationApi.get(token, companyRegistrationId);
      const companyRegData = companyRegRes?.data || companyRegRes;
      setCompanyRegistration(companyRegData);

      // Ek belgeleri çek
      const additionalRes = await additionalDocumentsApi.list(token, companyRegistrationId);
      const additionalList = additionalRes?.data || additionalRes || [];

      // Asıl belgeleri ek belgeler formatına dönüştür
      const mainDocuments = [];
      if (companyRegData?.documents) {
        const docs = companyRegData.documents;
        const documentMap = {
          identityDocument: { title: 'Kimlik Belgesi', key: 'identityDocument' },
          identityCopy: { title: 'Kimlik Fotokopisi', key: 'identityCopy' },
          residenceDocument: { title: 'İkametgah Belgesi', key: 'residenceDocument' },
          workplaceDocument: { title: 'İşyeri Belgesi', key: 'workplaceDocument' },
          partnershipAgreement: { title: 'Ortaklık Sözleşmesi', key: 'partnershipAgreement' },
          powerOfAttorney: { title: 'Vekaletname', key: 'powerOfAttorney' },
        };

        Object.entries(docs).forEach(([key, doc]) => {
          if (doc && doc.url) {
            mainDocuments.push({
              id: `main-${key}`,
              title: documentMap[key]?.title || key,
              description: 'Yüklenen belge',
              original_name: doc.name || `${key}.pdf`,
              mime_type: 'application/pdf',
              file_url: doc.url,
              is_main_document: true,
              document_type: key,
            });
          }
        });
      }

      // Tüm belgeleri birleştir (önce asıl belgeler, sonra ek belgeler)
      setDocuments([...mainDocuments, ...additionalList]);
    } catch (e) {
      console.error("Belgeler yüklenemedi:", e);
      setDocuments([]);
      setCompanyRegistration(null);
    } finally {
      setLoadingDocuments(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm("Bu belgeyi silmek istediğinize emin misiniz?")) return;

    const token = getToken();
    if (!token) return;

    try {
      let orderData = order;
      if (!orderData) {
        const res = await ordersApi.get(token, orderId);
        orderData = res?.data || res;
      }
      const companyRegistrationId = orderData?.company_registration?.id;
      if (!companyRegistrationId) return;

      await additionalDocumentsApi.delete(token, companyRegistrationId, documentId);
      await loadDocuments();
    } catch (e) {
      setErr(e?.message || "Belge silinemedi.");
    }
  };

  const openDocumentModal = () => {
    setDocumentForm({ title: "", description: "", file: null });
    setErr("");
    setMsg("");
    setDocumentModalOpen(true);
  };

  const handleDocumentUpload = async () => {
    const token = getToken();
    if (!token || !order) return;

    if (!documentForm.title || !documentForm.file) {
      setErr("Başlık ve dosya zorunludur.");
      return;
    }

    setUploadingDocument(true);
    setErr("");
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("file", documentForm.file);
      formData.append("title", documentForm.title);
      if (documentForm.description) {
        formData.append("description", documentForm.description);
      }

      const companyRegistrationId = order?.company_registration?.id;
      if (!companyRegistrationId) {
        setErr("Şirket kaydı bulunamadı.");
        return;
      }

      await additionalDocumentsApi.upload(token, companyRegistrationId, formData);
      setMsg("Belge başarıyla yüklendi.");
      setDocumentForm({ title: "", description: "", file: null });
      await loadDocuments();
      setTimeout(() => {
        setDocumentModalOpen(false);
        setMsg("");
      }, 1500);
    } catch (e) {
      setErr(e?.message || "Belge yüklenemedi.");
    } finally {
      setUploadingDocument(false);
    }
  };

  const openPreviewModal = (doc) => {
    setPreviewDocument(doc);
    setPreviewModalOpen(true);
  };

  const getFileIcon = (mimeType) => {
    if (mimeType?.includes("pdf")) {
      return (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6M9 12h6M9 16h3" />
        </svg>
      );
    }
    if (mimeType?.includes("image")) {
      return (
        <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L20 20M4 16v-8a2 2 0 012-2h12a2 2 0 012 2v12M4 16l4-4" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 8h.01M16 12l2 2" />
        </svg>
      );
    }
    return (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9h-5V4H7a2 2 0 00-2 2v13a2 2 0 002 2z" />
      </svg>
    );
  };

  const getMainDocumentIcon = (doc) => {
    const baseClass = "w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg";
    const resolveKey = () => {
      if (doc?.document_type) {
        return doc.document_type;
      }
      const title = (doc?.title || "").toLowerCase();
      if (title.includes("fotokopi")) return "identityCopy";
      if (title.includes("kimlik")) return "identityDocument";
      if (title.includes("ikamet")) return "residenceDocument";
      if (title.includes("işyeri")) return "workplaceDocument";
      if (title.includes("ortak")) return "partnershipAgreement";
      if (title.includes("vekalet")) return "powerOfAttorney";
      return "default";
    };

    const iconKey = resolveKey();
    const iconMap = {
      identityDocument: {
        bg: "bg-gradient-to-br from-blue-500 to-blue-700",
        icon: <FaIdCard className="w-6 h-6" />,
      },
      identityCopy: {
        bg: "bg-gradient-to-br from-blue-500 to-blue-700",
        icon: <FaIdCard className="w-6 h-6" />,
      },
      residenceDocument: {
        bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        icon: <FaHome className="w-6 h-6" />,
      },
      workplaceDocument: {
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        icon: <FaBuilding className="w-6 h-6" />,
      },
      partnershipAgreement: {
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        icon: <FaHandshake className="w-6 h-6" />,
      },
      powerOfAttorney: {
        bg: "bg-gradient-to-br from-amber-500 to-amber-600",
        icon: <FaFileSignature className="w-6 h-6" />,
      },
      default: {
        bg: "bg-gradient-to-br from-primary to-blue-600",
        icon: <FaIdCard className="w-6 h-6" />,
      },
    };

    const config = iconMap[iconKey] || iconMap.default;
    return (
      <div className={`${baseClass} ${config.bg}`}>
        {config.icon}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Sipariş bulunamadı.</p>
          <Link to="/profil/detay?tab=orders" className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark">
            Siparişlere Dön
          </Link>
        </div>
      </div>
    );
  }

  const companyReg = order.company_registration;
  const hasCompanyReg = companyReg && companyReg.id;

  return (
    <div className="bg-white min-h-[60vh]">
      <section className="pt-28 pb-12 bg-work-navy-500 text-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">Ek Belgeler</h1>
              <p className="text-blue-100 mt-2">Sipariş #{order.id} - Ek belgeleri görüntüleyin ve yönetin</p>
            </div>
            <Link to="/profil/detay?tab=orders" className="px-4 py-2 rounded-lg bg-white text-primary font-medium border border-gray-200 hover:bg-gray-100 hover:text-primary transition-colors">
              ← Siparişlere Dön
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          {err && (
            <div className="mb-6 rounded-xl px-4 py-3 text-sm border-2 bg-red-50 text-red-800 border-red-200">
              {err}
            </div>
          )}

          {!hasCompanyReg ? (
            <div className="bg-white border rounded-2xl shadow-sm p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 font-medium mb-2">Bu sipariş için ek belge yüklenemez</p>
              <p className="text-sm text-gray-500">Sadece şirket kuruluşu siparişleri için ek belge yüklenebilir.</p>
            </div>
          ) : (
            <>
              {/* Sipariş Bilgileri */}
              <div className="bg-white border rounded-2xl shadow-sm p-6 mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sipariş Bilgileri</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-semibold">Sipariş No:</span> #{order.id}</p>
                      <p><span className="font-semibold">Tutar:</span> {Number(order.amount || 0).toLocaleString('tr-TR')} {order.currency || '₺'}</p>
                      {companyReg && (
                        <>
                          <p><span className="font-semibold">Şirket:</span> {companyReg.company_name}</p>
                          <p><span className="font-semibold">Ürün:</span> {companyReg.product_title} • {companyReg.tier} • {companyReg.period}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Belgeler Listesi */}
              <div className="bg-white border rounded-2xl shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Belgeler</h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {documents.filter(d => d.is_main_document).length} yüklenen belge, {documents.filter(d => !d.is_main_document).length} ek belge
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={openDocumentModal}
                      className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-all"
                    >
                      Yeni Belge Yükle
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {loadingDocuments ? (
                    <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
                  ) : documents.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50/30 p-12 text-center">
                      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-600 font-medium mb-2">Henüz ek belge bulunmuyor</p>
                      <p className="text-sm text-gray-500 mb-6">İlk ek belgenizi yükleyerek başlayın</p>
                      <button
                        onClick={openDocumentModal}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary-dark hover:to-blue-700 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        İlk Belgeyi Yükle
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Yüklenen Belgeler */}
                      {documents.filter(d => d.is_main_document).length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Yüklenen Belgeler
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {documents.filter(d => d.is_main_document).map((doc) => (
                              <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl border-2 border-gray-200 hover:border-primary/50 bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden"
                              >
                                <div className="p-5">
                                  <div className="flex items-start gap-4 mb-4">
                                    <div className="flex-shrink-0">
                                      {getMainDocumentIcon(doc)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-lg font-bold text-gray-900 truncate">{doc.title}</h4>
                                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 flex-shrink-0">
                                          Yüklenen Belge
                                        </span>
                                      </div>
                                      {doc.description && (
                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{doc.description}</p>
                                      )}
                                      <div className="flex items-center gap-2 text-xs text-gray-500">
                                        {doc.size_human && <span>{doc.size_human}</span>}
                                        {doc.size_human && <span>•</span>}
                                        {doc.created_at && <span>{new Date(doc.created_at).toLocaleDateString('tr-TR')}</span>}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                    <button
                                      onClick={() => openPreviewModal(doc)}
                                      className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all text-center"
                                    >
                                      Görüntüle
                                    </button>
                                    <a
                                      href={doc.file_url}
                                      download
                                      className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Ek Belgeler */}
                      {documents.filter(d => !d.is_main_document).length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Ek Belgeler
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {documents.filter(d => !d.is_main_document).map((doc) => (
                              <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl border-2 border-gray-200 hover:border-primary/50 bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden"
                              >
                                <div className="p-5">
                                  <div className="flex items-start gap-4 mb-4">
                                    <div className="flex-shrink-0">
                                      {doc.is_main_document ? getMainDocumentIcon(doc) : getFileIcon(doc.mime_type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-lg font-bold text-gray-900 mb-1 truncate">{doc.title}</h4>
                                      {doc.description && (
                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{doc.description}</p>
                                      )}
                                      <div className="flex items-center gap-2 text-xs text-gray-500">
                                        {doc.size_human && <span>{doc.size_human}</span>}
                                        {doc.size_human && <span>•</span>}
                                        {doc.created_at && <span>{new Date(doc.created_at).toLocaleDateString('tr-TR')}</span>}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                    <button
                                      onClick={() => openPreviewModal(doc)}
                                      className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all text-center"
                                    >
                                      Görüntüle
                                    </button>
                                    <a
                                      href={doc.file_url}
                                      download
                                      className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                      </svg>
                                    </a>
                                    <button
                                      onClick={() => handleDeleteDocument(doc.id)}
                                      className="px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Ek Belge Yükleme Modali */}
      <AnimatePresence>
        {documentModalOpen && order && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            onClick={(e)=>{ 
              if (e.target === e.currentTarget) {
                setDocumentModalOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
              onClick={(e)=>e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary via-blue-600 to-primary p-6 flex items-center justify-between flex-shrink-0">
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-1">Ek Belge Yükle</h2>
                  <p className="text-blue-100 text-sm">Sipariş #{order.id} için ek belge yükleyin</p>
                </div>
                <button 
                  onClick={(e)=>{ 
                    e.stopPropagation();
                    setDocumentModalOpen(false);
                  }} 
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {(msg || err) && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-6 rounded-xl px-4 py-3 text-sm border-2 shadow-sm ${msg? 'bg-emerald-50 text-emerald-800 border-emerald-200':'bg-red-50 text-red-800 border-red-200'}`}
                    >
                      {msg || err}
                    </motion.div>
                  )}

                  <div className="space-y-6">
                    {/* Başlık */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Belge Başlığı <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={documentForm.title}
                        onChange={(e) => setDocumentForm({...documentForm, title: e.target.value})}
                        className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                        placeholder="Örn: Ek Sözleşme, Ek Belge..."
                        required
                      />
                    </div>

                    {/* Açıklama */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Açıklama (Opsiyonel)
                      </label>
                      <textarea
                        value={documentForm.description}
                        onChange={(e) => setDocumentForm({...documentForm, description: e.target.value})}
                        className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all resize-none bg-white text-gray-900 placeholder:text-gray-400"
                        rows={3}
                        placeholder="Belge hakkında açıklama..."
                      />
                    </div>

                    {/* Dosya Yükleme */}
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
                              const maxSize = 10 * 1024 * 1024; // 10MB
                              if (file.size > maxSize) {
                                setErr("Dosya boyutu 10MB'dan büyük olamaz.");
                                return;
                              }
                              const allowedTypes = [
                                'application/pdf',
                                'image/jpeg',
                                'image/jpg',
                                'image/png',
                                'application/msword',
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                              ];
                              if (!allowedTypes.includes(file.type)) {
                                setErr("Sadece PDF, resim (JPEG, PNG) veya Word dosyaları yüklenebilir.");
                                return;
                              }
                              setDocumentForm({...documentForm, file});
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
                              <p className="text-xs text-gray-500 mt-1">
                                {(documentForm.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <svg className="w-10 h-10 text-gray-400 group-hover:text-primary mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                                Dosya seçmek için tıklayın
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PDF, JPEG, PNG veya Word (Max: 10MB)
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Bilgi Kutusu */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-blue-800">
                          <p className="font-semibold mb-1">Desteklenen Dosya Türleri:</p>
                          <ul className="list-disc list-inside space-y-1 text-blue-700">
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

              {/* Footer */}
              <div className="bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-end gap-4 flex-shrink-0">
                <button 
                  onClick={(e)=>{ 
                    e.stopPropagation();
                    setDocumentModalOpen(false);
                    setDocumentForm({ title: "", description: "", file: null });
                  }} 
                  className="px-6 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all shadow-sm"
                >
                  İptal
                </button>
                <button 
                  onClick={(e)=>{
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

      {/* PDF Ön İzleme Modali */}
      <AnimatePresence>
        {previewModalOpen && previewDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-2"
            onClick={(e)=>{ 
              if (e.target === e.currentTarget) {
                setPreviewModalOpen(false);
                setPreviewDocument(null);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full h-full max-w-[98vw] max-h-[98vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
              onClick={(e)=>e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary via-blue-600 to-primary p-4 flex items-center justify-between flex-shrink-0">
                <div className="text-white flex-1 min-w-0">
                  <h2 className="text-xl font-bold mb-1 truncate">{previewDocument.title}</h2>
                  <p className="text-blue-100 text-xs truncate">
                    {previewDocument.description || 'Belge ön izleme'}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <a
                    href={previewDocument.file_url}
                    download
                    className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-all backdrop-blur-sm flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    İndir
                  </a>
                  <button 
                    onClick={(e)=>{ 
                      e.stopPropagation();
                      setPreviewModalOpen(false);
                      setPreviewDocument(null);
                    }} 
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden bg-gray-100 min-h-0">
                {previewDocument.mime_type?.includes("pdf") ? (
                  <iframe
                    src={previewDocument.file_url}
                    className="w-full h-full border-0 min-h-[calc(98vh-120px)]"
                    title={previewDocument.title}
                  />
                ) : previewDocument.mime_type?.includes("image") ? (
                  <div className="w-full h-full flex items-center justify-center p-4 min-h-[calc(98vh-120px)]">
                    <img
                      src={previewDocument.file_url}
                      alt={previewDocument.title}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4 min-h-[calc(98vh-120px)]">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-600 font-medium mb-2">Ön izleme mevcut değil</p>
                      <p className="text-sm text-gray-500 mb-4">Bu dosya türü için ön izleme desteklenmiyor</p>
                      <a
                        href={previewDocument.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary-dark hover:to-blue-700 font-semibold transition-all shadow-lg hover:shadow-xl"
                      >
                        Yeni Sekmede Aç
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

