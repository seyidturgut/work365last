import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FaArrowRight, FaArrowLeft, FaRegFileAlt } from "react-icons/fa";
import { servicesApi, serviceRequestApi } from "../lib/api";
import { getToken } from "../lib/auth";

export default function HizmetBasvuru() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState([]); // BE'den gelecek
  const [selected, setSelected] = useState(null); // service_key
  const [selectedService, setSelectedService] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [requiredDocuments, setRequiredDocuments] = useState([]); // [{key, optional}]
  const [metaSchema, setMetaSchema] = useState([]); // dinamik alan şemaları

  const [company, setCompany] = useState({
    name: "",
    type: "",
    taxNumber: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [serviceFields, setServiceFields] = useState({}); 

  const [docs, setDocs] = useState({});
  const [prefillData, setPrefillData] = useState(null);

  const setDoc = (key, file) => setDocs(prev => ({ ...prev, [key]: file }));

  useEffect(() => {
    const token = getToken();
    if (!token) {
      const redirectTo = `${location.pathname}${location.search}`;
      navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`, { replace: true });
    }
  }, [location, navigate]);

  const isDocumentOptional = (doc) => {
    if (!doc || typeof doc !== 'object') return false;
    if (doc.optional !== undefined) return !!doc.optional;
    if (doc.required !== undefined) return !doc.required;
    if (doc.is_required !== undefined) return !doc.is_required;
    return false;
  };

  const handleCompanyInputChange = (field) => (event) => {
    const raw = event.target.value;
    let value = raw;

    if (field.numeric) {
      value = raw.replace(/\D/g, "");
    }

    if (field.key === "taxNumber" || field.key === "contactPhone") {
      value = value.slice(0, 11);
    }

    setCompany((prev) => ({
      ...prev,
      [field.key]: value,
    }));
  };

  // Servisleri yükle
  useEffect(() => {
    (async () => {
      setLoading(true); setError("");
      try {
        const res = await servicesApi.list();
        const payload = res?.data ?? res;
        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];
        setServices(normalized);
        const pre = new URLSearchParams(location.search).get('service');
        if (pre) {
          const svc = normalized.find((s) => s?.key === pre);
          if (svc) {
            setSelected(pre);
            setSelectedService(svc);
            setMetaSchema(Array.isArray(svc.meta_schema) ? svc.meta_schema : []);
          }
        }
      } catch (e) {
        console.error('Hizmetler yükleme hatası:', e);
        setError(e?.message || "Hizmetler yüklenemedi");
      }
      setLoading(false);
    })();
  }, [location.search]);

  useEffect(() => {
    if (!selected) { setSelectedService(null); setMetaSchema([]); return; }
    const svc = Array.isArray(services) ? services.find((s) => s?.key === selected) : null;
    if (!svc) {
      console.warn('Seçilen hizmet bulunamadı:', selected, 'Mevcut hizmetler:', services);
    }
    setSelectedService(svc);
    setMetaSchema(Array.isArray(svc?.meta_schema) ? svc.meta_schema : []);
  }, [selected, services]);

  useEffect(() => {
    const loadPrefill = async () => {
      if (!selected) {
        setPrefillData(null);
        return;
      }

      const token = getToken();
      if (!token) {
        setPrefillData(null);
        return;
      }

      try {
        const res = await serviceRequestApi.prefill(token, selected);
        const data = res?.data || res;
        if (data && typeof data === "object") {
          setPrefillData(data);
        } else {
          setPrefillData(null);
        }
      } catch (e) {
        setPrefillData(null);
      }
    };

    loadPrefill();
  }, [selected]);

  const renderServiceIcon = (icon) => {
    if (!icon || typeof icon !== 'string') return <FaRegFileAlt />;
    const isUrl = /^(https?:)?\/\//i.test(icon) || /\.(svg|png|jpe?g|webp)$/i.test(icon) || /^data:/i.test(icon);
    if (isUrl) {
      return <img src={icon} alt="icon" className="w-6 h-6 object-contain" />;
    }

    return <FaRegFileAlt />;
  };

  const canNext1 = !!selected;
  const serviceSpecificValid = useMemo(() => {
    if (!Array.isArray(metaSchema) || metaSchema.length === 0) return true; 
    for (const field of metaSchema) {
      if (field.required) {
        const fk = field.key || field.name;
        const val = serviceFields[fk];
        if (val === undefined || val === null || String(val).trim() === "") return false;
      }
    }
    return true;
  }, [metaSchema, serviceFields]);

  const getMetaFieldLabel = (field, idx = 0) => {
    return (
      (typeof field.label === 'string' && field.label.trim()) ||
      (typeof field.name === 'string' && field.name.trim()) ||
      (typeof field.key === 'string' && field.key.trim()) ||
      `Alan ${idx + 1}`
    );
  };

  const missingRequiredMeta = useMemo(() => {
    if (!Array.isArray(metaSchema) || metaSchema.length === 0) return [];
    const missing = [];
    metaSchema.forEach((field, idx) => {
      if (!field.required) return;
      const fk = field.key || field.name;
      const val = serviceFields[fk];
      const label = getMetaFieldLabel(field, idx);

      if (field.type === 'boolean') {
        if (val !== true) missing.push(label);
        return;
      }

      if (val === undefined || val === null || String(val).trim() === "") {
        missing.push(label);
      }
    });
    return missing;
  }, [metaSchema, serviceFields]);

  const canNext2 = company.name
    && company.type
    && company.taxNumber
    && company.contactName
    && company.contactEmail
    && company.contactPhone
    && missingRequiredMeta.length === 0;

  const docsValid = useMemo(() => {
    if (!Array.isArray(requiredDocuments) || requiredDocuments.length === 0) return true;
    for (const d of requiredDocuments) {
      if (!isDocumentOptional(d)) {
        if (!docs[d.key]) return false;
      }
    }
    return true;
  }, [requiredDocuments, docs]);

  const handleApplyPrefill = () => {
    if (!prefillData) return;
    if (prefillData.company && typeof prefillData.company === "object") {
      setCompany((prev) => ({
        ...prev,
        ...prefillData.company,
      }));
    }
    if (prefillData.meta && typeof prefillData.meta === "object" && Array.isArray(metaSchema)) {
      setServiceFields((prev) => {
        const next = { ...prev };
        metaSchema.forEach((field) => {
          const fk = field.key || field.name;
          if (fk && Object.prototype.hasOwnProperty.call(prefillData.meta, fk)) {
            next[fk] = prefillData.meta[fk];
          }
        });
        return next;
      });
    }
  };

  const handleCreateRequest = async () => {
    const token = getToken();
    if (!token) { navigate('/login?redirect=/hizmet-basvuru'); return; }
    if (!selected) {
      setError('Lütfen bir hizmet seçin.');
      return;
    }

    if (missingRequiredMeta.length > 0) {
      setError("");
      return;
    }
    
    const currentService = Array.isArray(services) ? services.find((s) => s?.key === selected) : null;
    if (!currentService) {
      setError('Seçilen hizmet bulunamadı. Lütfen sayfayı yenileyip tekrar deneyin.');
      return;
    }
    
    const serviceKeyToSend = currentService.key || selected;
    if (!serviceKeyToSend) {
      setError('Hizmet anahtarı bulunamadı. Lütfen sayfayı yenileyip tekrar deneyin.');
      return;
    }
    
    setLoading(true); setError("");
    try {
      const payload = {
        service_key: serviceKeyToSend,
        company: {
          name: company.name,
          type: company.type,
          tax_number: company.taxNumber,
          contact_name: company.contactName,
          contact_email: company.contactEmail,
          contact_phone: company.contactPhone,
        },
        meta: { ...serviceFields },
      };
      
      const res = await serviceRequestApi.create(token, payload);
      const data = res?.data || res || {};
      setRequestId(data.id);
      setPricing(data.pricing || null);
      const reqDocs = Array.isArray(data.required_documents) ? data.required_documents : [];
      const reqDocsWithLabels = reqDocs.map(doc => {
        const serviceDoc = Array.isArray(selectedService?.required_documents) 
          ? selectedService.required_documents.find(sd => sd.key === doc.key)
          : null;
        return {
          ...doc,
          label: doc.label || serviceDoc?.label || doc.key,
        };
      });
      setRequiredDocuments(reqDocsWithLabels);
      const initDocs = {};
      reqDocs.forEach(r => { initDocs[r.key] = null; });
      setDocs(prev => ({ ...initDocs, ...prev }));
      setStep(3);
    } catch (e) {

      
      let errorMessage = 'Başvuru oluşturulamadı';
      if (e?.response?.data?.errors?.service_key?.[0]) {
        errorMessage = `Hizmet anahtarı hatası: ${e.response.data.errors.service_key[0]}`;
      } else if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
      } else if (e?.data?.message) {
        errorMessage = e.data.message;
      } else if (e?.message) {
        errorMessage = e.message;
      }
      
      setError(errorMessage);
    }
    setLoading(false);
  };

  const handleAddToCartAndPay = async () => {
    const token = getToken();
    if (!token) { navigate('/login?redirect=/hizmet-basvuru'); return; }
    if (!requestId) return;
    if (!docsValid) {
      setError("Lütfen zorunlu belgeleri yükleyin.");
      return;
    }
    setLoading(true); setError("");
    try {
      const form = new FormData();
      Object.entries(docs).forEach(([k, v]) => {
        if (v instanceof File) {
          const originalKey = typeof k === "string" ? k : String(k);
          const slugKey = originalKey
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9_]/g, "");

          form.append(originalKey, v);
          if (slugKey && slugKey !== originalKey) {
            form.append(slugKey, v);
          }

          const extraMap = {
            "Çalışan Listesi": ["Çalışan Listesi", "Calisan Listesi", "calisan_listesi"],
            "İş Sözleşmeleri": ["İş Sözleşmeleri", "Is Sozlesmeleri", "is_sozlesmeleri"],
          };

          if (extraMap[originalKey]) {
            extraMap[originalKey].forEach((alias) => {
              if (alias && alias !== originalKey && alias !== slugKey) {
                form.append(alias, v);
              }
            });
          }
        }
      });
      if ([...form.keys()].length > 0) {
        await serviceRequestApi.uploadDocuments(token, requestId, form);
      }
      await serviceRequestApi.submit(token, requestId);

      await addItem({ service_request_id: requestId });
      navigate('/odeme?redirect=/basvuru-takibi');
    } catch (e) {
      setError(e?.message || 'Sepete eklenemedi veya gönderilemedi');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="relative bg-work-navy-500 text-white py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Hizmet Başvurusu
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Hizmet seçin, şirket bilgilerini girin ve ödemeyi tamamlayın.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white via-gray-50/30 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Modern Stepper */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full -z-0">
                <motion.div
                  className="h-1 bg-gradient-to-r from-primary to-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step - 1) / 3) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              {[{id:1,label:'Hizmet Seçimi'},{id:2,label:'Şirket Bilgileri'},{id:3,label:'Belgeler'},{id:4,label:'Ödeme'}].map(s => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: s.id * 0.1 }}
                  className="text-center relative z-10 flex-1"
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300 ${
                      step >= s.id
                        ? 'bg-gradient-to-br from-primary to-blue-600 text-white scale-110'
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }`}
                    whileHover={{ scale: 1.15 }}
                  >
                    {step > s.id ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      s.id
                    )}
                  </motion.div>
                  <div className={`mt-3 text-sm font-semibold ${step >= s.id ? 'text-primary' : 'text-gray-400'}`}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Hizmet Seçimi</h3>
                <p className="text-gray-600">İhtiyacınıza uygun hizmeti seçin</p>
              </div>
              
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
                >
                  {error}
                </motion.div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                {(Array.isArray(services) ? services : []).map((svc, idx) => {
                  if (!svc || !svc.key) {
                    return null;
                  }
                  const priceValue = Number(svc?.base_price ?? 0);
                  const formattedPrice = Number.isFinite(priceValue) ? priceValue.toLocaleString('tr-TR') : '—';
                  const isSelected = selected === svc.key;
                  const gradients = [
                    'from-blue-500 to-blue-600',
                    'from-emerald-500 to-emerald-600',
                    'from-purple-500 to-purple-600',
                    'from-orange-500 to-orange-600'
                  ];
                  const bgGradients = [
                    'from-blue-50 to-white',
                    'from-emerald-50 to-white',
                    'from-purple-50 to-white',
                    'from-orange-50 to-white'
                  ];
                  const gradient = gradients[idx % gradients.length];
                  const bgGradient = bgGradients[idx % bgGradients.length];
                  
                  return (
                    <motion.button
                      key={svc.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      onClick={() => {
                        setSelected(svc.key);
                        setError("");
                      }}
                      className={`group relative text-left rounded-2xl p-6 border-2 transition-all duration-300 overflow-hidden ${
                        isSelected
                          ? `border-primary shadow-xl ring-4 ring-primary/20 bg-gradient-to-br ${bgGradient}`
                          : 'border-gray-200 hover:border-primary/50 hover:shadow-lg bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8`}></div>
                      )}
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-4 rounded-xl shadow-lg ${
                            isSelected
                              ? `bg-gradient-to-br ${gradient}`
                              : 'bg-gray-100 group-hover:bg-primary/10'
                          } transition-all duration-300`}>
                            <div className={isSelected ? 'text-white' : 'text-primary'}>
                              {renderServiceIcon(svc.icon)}
                            </div>
                          </div>
                          <h4 className={`text-xl font-bold ${isSelected ? 'text-primary' : 'text-gray-900'} group-hover:text-primary transition-colors`}>
                            {svc.title}
                          </h4>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-gray-600 text-sm mb-1">Başlangıç fiyatı</div>
                          <div className={`text-3xl font-extrabold ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                            {formattedPrice} ₺
                          </div>
                        </div>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2 text-primary font-semibold text-sm"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Seçildi
                          </motion.div>
                        )}
                      </div>
                      
                      {isSelected && (
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}></div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              {selectedService && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-md"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Hizmet Özeti</h4>
                      <p className="text-gray-700 mb-4 leading-relaxed">{selectedService.description || '—'}</p>
                      {Array.isArray(selectedService.required_documents) && selectedService.required_documents.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-800 mb-3">Gerekli Belgeler:</h5>
                          <ul className="space-y-2">
                            {selectedService.required_documents.map(d => (
                              <li key={d.key} className="flex items-center gap-2 text-sm text-gray-700">
                                <div className={`w-2 h-2 rounded-full ${isDocumentOptional(d) ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                <span>{d.label || d.key}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${isDocumentOptional(d) ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                  {isDocumentOptional(d) ? 'Opsiyonel' : 'Zorunlu'}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {!selected && services.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3"
                >
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-amber-800">Lütfen devam etmek için bir hizmet seçin.</p>
                </motion.div>
              )}
              
              <div className="flex justify-end mt-8">
                <motion.button
                  whileHover={{ scale: canNext1 ? 1.05 : 1 }}
                  whileTap={{ scale: canNext1 ? 0.95 : 1 }}
                  disabled={!canNext1}
                  onClick={() => {
                    if (!selected) {
                      setError('Lütfen bir hizmet seçin.');
                      return;
                    }
                    setStep(2);
                  }}
                  className={`px-8 py-4 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all ${
                    canNext1
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Devam Et
                  <FaArrowRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Şirket Bilgileri</h3>
                <p className="text-gray-600">Şirket bilgilerinizi eksiksiz doldurun</p>
                {prefillData && (Object.keys(prefillData.company || {}).length > 0 || Object.keys(prefillData.meta || {}).length > 0) && (
                  <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="text-sm text-blue-800">
                      Daha önce bu hizmet için doldurduğunuz şirket ve alan bilgilerini otomatik kullanabilirsiniz.
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyPrefill}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
                    >
                      Önceki başvurudan doldur
                    </button>
                  </div>
                )}
              </div>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
                >
                  {error}
                </motion.div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {[{key:'name',label:'Şirket Adı *', autoComplete:'organization', icon: '🏢'},
                  {key:'type',label:'Şirket Türü *', autoComplete:'off', icon: '📋'},
                  {key:'taxNumber',label:'Vergi No / VKN *', numeric:true, autoComplete:'off', icon: '🔢'},
                  {key:'contactName',label:'Yetkili Kişi *', autoComplete:'name', icon: '👤'},
                  {key:'contactEmail',label:'E-posta *', type:'email', autoComplete:'email', icon: '📧'},
                  {key:'contactPhone',label:'Telefon *', numeric:true, autoComplete:'tel', icon: '📱'}].map((f)=> (
                  <div key={f.key} className="group">
                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      {f.icon && <span>{f.icon}</span>}
                      {f.label}
                    </label>
                    <input
                      className="w-full h-14 border-2 border-gray-200 rounded-xl px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary placeholder:text-gray-400 transition-all group-hover:border-primary/50"
                      placeholder={f.placeholder || f.label.replace(' *', '')}
                      type={f.type || 'text'}
                      inputMode={f.numeric ? 'numeric' : undefined}
                      maxLength={f.key === 'taxNumber' || f.key === 'contactPhone' ? 11 : undefined}
                      autoComplete={f.autoComplete}
                      value={company[f.key]}
                      onChange={handleCompanyInputChange(f)}
                    />
                  </div>
                ))}
              </div>
              {/* Hizmete özel alanlar - meta_schema */}
              {Array.isArray(metaSchema) && metaSchema.length > 0 && (
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  {metaSchema.map((f, idx)=> {
                    const fieldKey = (typeof f.key === 'string' && f.key) || (typeof f.name === 'string' && f.name) || `field_${idx}`;
                    const labelText = (typeof f.label === 'string' && f.label.trim()) || (typeof f.name === 'string' && f.name.trim()) || (typeof f.key === 'string' && f.key.trim()) || 'Seçim';
                    const placeholderText = f.placeholder || labelText;
                    const val = serviceFields[fieldKey];
                    const isMissing = f.required && (
                      f.type === 'boolean'
                        ? val !== true // required boolean için mutlaka true olmalı
                        : val === undefined || val === null || String(val).trim() === ""
                    );
                    return (
                    <div key={fieldKey} className="relative min-h-[64px]">
                      {f.type === 'select' ? (
                        <>
                          <label className={`block text-sm font-medium mb-2 ${isMissing ? 'text-red-600' : 'text-gray-800'}`}>{labelText}{f.required ? ' *' : ''}</label>
                          <select
                            aria-label={labelText}
                            className={`w-full h-12 border rounded-xl px-4 bg-white focus:outline-none transition-all ${
                              isMissing
                                ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                                : 'focus:ring-2 focus:ring-primary/60 focus:border-primary'
                            }`}
                            value={serviceFields[fieldKey] || ''}
                            onChange={(e)=> setServiceFields(prev=> ({...prev, [fieldKey]: e.target.value}))}
                          >
                            <option value="">Seçiniz</option>
                            {(f.options || []).map(o=> <option key={o.value || o} value={(o.value||o)}>{o.label || o}</option>)}
                          </select>
                          {f.help && <p className="mt-1 text-xs text-gray-500">{f.help}</p>}
                        </>
                      ) : f.type === 'boolean' ? (
                        <label className={`flex items-center gap-2 text-sm ${isMissing ? 'text-red-600' : 'text-gray-800'}`}>
                          <input
                            aria-label={labelText}
                            type="checkbox"
                            checked={!!serviceFields[fieldKey]}
                            onChange={(e)=> setServiceFields(prev=> ({...prev, [fieldKey]: e.target.checked}))}
                            className={`${isMissing ? 'ring-1 ring-red-300 border-red-300' : ''}`}
                          />
                          <span>{labelText}{f.required ? ' *' : ''}</span>
                        </label>
                      ) : (
                        <>
                          <label className={`block text-sm font-medium mb-2 ${isMissing ? 'text-red-600' : 'text-gray-800'}`}>{labelText}{f.required ? ' *' : ''}</label>
                          <input
                            className={`w-full h-12 border rounded-xl px-4 bg-white focus:outline-none transition-all ${
                              isMissing
                                ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                                : 'focus:ring-2 focus:ring-primary/60 focus:border-primary'
                            }`}
                            placeholder={placeholderText}
                            inputMode={f.type==='number'?'numeric':undefined}
                            value={serviceFields[fieldKey] || ''}
                            onChange={(e)=> setServiceFields(prev=> ({...prev, [fieldKey]: f.type==='number' ? e.target.value.replace(/\D/g,'') : e.target.value}))}
                          />
                          {f.help && <p className="mt-1 text-xs text-gray-500">{f.help}</p>}
                        </>
                      )}
                    </div>
                  );})}
                </div>
              )}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setError(""); setStep(1); }}
                  className="px-8 py-4 rounded-xl font-semibold bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary flex items-center gap-2 transition-all shadow-sm"
                >
                  <FaArrowLeft /> Geri
                </motion.button>
                <motion.button
                  whileHover={{ scale: canNext2 && !loading && selected ? 1.05 : 1 }}
                  whileTap={{ scale: canNext2 && !loading && selected ? 0.95 : 1 }}
                  disabled={!canNext2 || loading || !selected}
                  onClick={handleCreateRequest}
                  className={`px-8 py-4 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all ${
                    canNext2 && !loading && selected
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      Devam Et <FaArrowRight />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Hizmete Özel Belgeler</h3>
                <p className="text-gray-600">Gerekli belgeleri yükleyin</p>
              </div>
              
              <div className="space-y-6">
                {(requiredDocuments || []).map((d, idx) => {
                  const hasFile = !!docs[d.key];
                  return (
                    <motion.div
                      key={d.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`border-2 border-dashed rounded-2xl p-6 transition-all duration-300 ${
                        hasFile
                          ? 'border-green-300 bg-gradient-to-br from-green-50 to-white'
                          : 'border-gray-300 bg-gradient-to-br from-white to-blue-50/30 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              hasFile ? 'bg-green-500' : 'bg-gray-200'
                            }`}>
                              <svg className={`w-6 h-6 ${hasFile ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <label className="block text-base font-bold text-gray-900">
                                {d.label || d.key}
                              </label>
                              <span className={`inline-block mt-1 text-xs px-3 py-1 rounded-full font-semibold ${
                                isDocumentOptional(d)
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {isDocumentOptional(d) ? 'Opsiyonel' : 'Zorunlu'}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 ml-13">Desteklenen: PDF, JPG, PNG, ZIP, DOC</p>
                        </div>
                        <div>
                          <input
                            id={`file-${d.key}`}
                            type="file"
                            onChange={e => setDoc(d.key, e.target.files[0])}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png,.zip,.doc,.docx"
                          />
                          <label
                            htmlFor={`file-${d.key}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-semibold cursor-pointer hover:shadow-lg transition-all shadow-md"
                          >
                            {hasFile ? 'Değiştir' : 'Dosya Seç'}
                          </label>
                        </div>
                      </div>
                      
                      {hasFile && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-green-900">{docs[d.key].name}</p>
                            <p className="text-xs text-green-700">Dosya başarıyla seçildi</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(2)}
                  className="px-8 py-4 rounded-xl font-semibold bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary flex items-center gap-2 transition-all shadow-sm"
                >
                  <FaArrowLeft /> Geri
                </motion.button>
                <motion.button
                  whileHover={{ scale: docsValid ? 1.05 : 1 }}
                  whileTap={{ scale: docsValid ? 0.95 : 1 }}
                  disabled={!docsValid}
                  onClick={() => setStep(4)}
                  className={`px-8 py-4 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all ${
                    docsValid
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Ödemeye Geç <FaArrowRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Ödeme Özeti</h3>
                <p className="text-gray-600">Seçili hizmet sepetinize eklenecek ve ödeme sayfasına yönlendirileceksiniz.</p>
              </div>
              
              {pricing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                      <span className="text-gray-700 font-medium">Net Tutar</span>
                      <span className="text-gray-900 font-semibold text-lg">
                        {parseFloat(pricing.net_price || 0).toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                      <span className="text-gray-700 font-medium">
                        KDV (%{pricing.vat_rate || 20})
                      </span>
                      <span className="text-gray-900 font-semibold text-lg">
                        {parseFloat(pricing.vat || 0).toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-900 font-bold text-xl">Toplam</span>
                      <span className="text-primary font-extrabold text-2xl">
                        {parseFloat(pricing.gross_price || 0).toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(3)}
                  className="px-8 py-4 rounded-xl font-semibold bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary flex items-center gap-2 transition-all shadow-sm"
                >
                  <FaArrowLeft /> Geri
                </motion.button>
                <motion.button
                  whileHover={{ scale: !requestId || loading ? 1 : 1.05 }}
                  whileTap={{ scale: !requestId || loading ? 1 : 0.95 }}
                  onClick={handleAddToCartAndPay}
                  disabled={!requestId || loading}
                  className={`px-8 py-4 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all ${
                    !requestId || loading
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      Ödemeye Git <FaArrowRight />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

