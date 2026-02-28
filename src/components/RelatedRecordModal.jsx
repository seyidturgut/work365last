import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { companyRegistrationApi, serviceRequestApi } from "../lib/api";
import { getToken } from "../lib/auth";

export default function RelatedRecordModal({ show, onClose, recordType, recordId, recordTitle }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show && recordId) {
      loadRecord();
    } else {
      setData(null);
      setError("");
    }
  }, [show, recordId, recordType]);

  const loadRecord = async () => {
    const token = getToken();
    if (!token) return;

    setLoading(true);
    setError("");
    try {
      let response;
      if (recordType?.toLowerCase().includes('company') || recordType?.toLowerCase().includes('company_registration')) {
        response = await companyRegistrationApi.get(token, recordId);
      } else if (recordType?.toLowerCase().includes('service') || recordType?.toLowerCase().includes('service_request')) {
        response = await serviceRequestApi.get(token, recordId);
      } else {
        setError("Geçersiz kayıt tipi");
        return;
      }

      const recordData = response?.data || response;
      setData(recordData);
    } catch (e) {
      setError(e?.message || "Kayıt yüklenemedi.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const formatFieldLabel = (key) => {
    const labels = {
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
      price: "Fiyatlandırma",
      net_price: "Net Fiyat",
      vat: "KDV",
      gross_price: "Brüt Fiyat",
      created_at: "Oluşturulma Tarihi",
      updated_at: "Güncellenme Tarihi",
      tier: "Paket",
      period: "Dönem",
      product_title: "Ürün",
      product: "Ürün",
      personal_info: "Kişisel Bilgiler",
      contact_info: "İletişim Bilgileri",
      company_info: "Şirket Bilgileri",
      workplace_info: "İşyeri Bilgileri",
      partners: "Ortaklar",
      additional_documents: "Ek Belgeler",
      order: "Sipariş",
      meta: "Meta Bilgileri",
    };
    return labels[key] || key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
  };

  const formatMetaLabel = (key) => {
    const labels = {
      kapsam: 'Kapsam',
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
  };

  const getStatusConfig = (status) => {
    const configs = {
      draft: { label: 'Taslak', color: 'bg-gray-100 text-gray-700 border-gray-200' },
      submitted: { label: 'Gönderildi', color: 'bg-primary/10 text-primary border-primary/20' },
      in_review: { label: 'İnceleniyor', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      approved: { label: 'Onaylandı', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      rejected: { label: 'Reddedildi', color: 'bg-red-100 text-red-700 border-red-200' },
      completed: { label: 'Tamamlandı', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      pending: { label: 'Beklemede', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      processing: { label: 'İşleniyor', color: 'bg-primary/10 text-primary border-primary/20' },
      failed: { label: 'Başarısız', color: 'bg-red-100 text-red-700 border-red-200' },
      cancelled: { label: 'İptal Edildi', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    };
    return configs[status] || { label: status, color: 'bg-gray-100 text-gray-700 border-gray-200' };
  };

  const getPaymentStatusConfig = (status) => {
    const configs = {
      pending: { label: 'Ödeme Bekliyor', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      paid: { label: 'Ödendi', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      refunded: { label: 'İade Edildi', color: 'bg-primary/10 text-primary border-primary/20' },
    };
    return configs[status] || { label: status, color: 'bg-gray-100 text-gray-700 border-gray-200' };
  };

  const renderValue = (key, value) => {
    if (value === null || value === undefined) return '-';

    if (key === 'status') {
      const config = getStatusConfig(value);
      return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
          {config.label}
        </span>
      );
    }

    if (key === 'payment_status') {
      const config = getPaymentStatusConfig(value);
      return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
          {config.label}
        </span>
      );
    }

    if (key === 'created_at' || key === 'updated_at') {
      return new Date(value).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    // Hizmet bilgisi
    if (key === 'service' && typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div className="space-y-2">
          {value.title && (
            <div className="font-semibold text-gray-900">{value.title}</div>
          )}
          {value.description && (
            <div className="text-sm text-gray-600">{value.description}</div>
          )}
          {value.key && (
            <div className="text-xs text-gray-500">Key: {value.key}</div>
          )}
        </div>
      );
    }

    // Ürün bilgisi
    if (key === 'product' && typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          {value.title && (
            <div className="font-semibold text-gray-900">{value.title}</div>
          )}
          {value.key && (
            <div className="text-xs text-gray-500 mt-1">Key: {value.key}</div>
          )}
          {value.id && (
            <div className="text-xs text-gray-500">ID: {value.id}</div>
          )}
        </div>
      );
    }

    if (key === 'pricing' && typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          {value.net_price && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Net Fiyat:</span>
              <span className="font-semibold text-gray-900">
                {Number(value.net_price).toLocaleString('tr-TR')} {value.currency || '₺'}
              </span>
            </div>
          )}
          {value.vat && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">KDV ({value.vat_rate || '20'}%):</span>
              <span className="font-semibold text-gray-900">
                {Number(value.vat).toLocaleString('tr-TR')} {value.currency || '₺'}
              </span>
            </div>
          )}
          {value.gross_price && (
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-sm font-semibold text-gray-900">Brüt Fiyat:</span>
              <span className="font-bold text-primary text-lg">
                {Number(value.gross_price).toLocaleString('tr-TR')} {value.currency || '₺'}
              </span>
            </div>
          )}
        </div>
      );
    }

    // Price bilgisi (pricing ile aynı format)
    if (key === 'price' && typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          {value.net_price && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Net Fiyat:</span>
              <span className="font-semibold text-gray-900">
                {Number(value.net_price).toLocaleString('tr-TR')} {value.currency || '₺'}
              </span>
            </div>
          )}
          {value.vat && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">KDV ({value.vat_rate || '20'}%):</span>
              <span className="font-semibold text-gray-900">
                {Number(value.vat).toLocaleString('tr-TR')} {value.currency || '₺'}
              </span>
            </div>
          )}
          {value.gross_price && (
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-sm font-semibold text-gray-900">Brüt Fiyat:</span>
              <span className="font-bold text-primary text-lg">
                {Number(value.gross_price).toLocaleString('tr-TR')} {value.currency || '₺'}
              </span>
            </div>
          )}
        </div>
      );
    }

    if (key === 'personal_info' && typeof value === 'object' && !Array.isArray(value)) {
      const personalLabels = {
        firstName: 'Ad',
        lastName: 'Soyad',
        tcKimlikNo: 'TC Kimlik No',
        birthDate: 'Doğum Tarihi',
        birthPlace: 'Doğum Yeri',
        maritalStatus: 'Medeni Durum',
        motherName: 'Anne Adı',
        fatherName: 'Baba Adı',
      };
      const hasData = Object.values(value).some(v => v !== null && v !== undefined && v !== '');
      if (!hasData) return <span className="text-gray-400">Bilgi girilmemiş</span>;

      return (
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          {Object.entries(value).map(([k, v]) => {
            if (v === null || v === undefined || v === '') return null;
            return (
              <div key={k} className="flex justify-between items-start gap-4">
                <span className="text-sm text-gray-600">{personalLabels[k] || k}:</span>
                <span className="text-sm font-medium text-gray-900 text-right">{String(v)}</span>
              </div>
            );
          })}
        </div>
      );
    }

    if (key === 'contact_info' && typeof value === 'object' && !Array.isArray(value)) {
      const contactLabels = {
        email: 'E-posta',
        phone: 'Telefon',
        mobile: 'Cep Telefonu',
        address: 'Adres',
        city: 'Şehir',
        district: 'İlçe',
        postalCode: 'Posta Kodu',
      };
      const hasData = Object.values(value).some(v => v !== null && v !== undefined && v !== '');
      if (!hasData) return <span className="text-gray-400">Bilgi girilmemiş</span>;

      return (
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          {Object.entries(value).map(([k, v]) => {
            if (v === null || v === undefined || v === '') return null;
            return (
              <div key={k} className="flex justify-between items-start gap-4">
                <span className="text-sm text-gray-600">{contactLabels[k] || k}:</span>
                <span className="text-sm font-medium text-gray-900 text-right">{String(v)}</span>
              </div>
            );
          })}
        </div>
      );
    }

    if (key === 'company_info' && typeof value === 'object' && !Array.isArray(value)) {
      const companyLabels = {
        companyName: 'Şirket Adı',
        companyActivity: 'Şirket Faaliyeti',
        capital: 'Sermaye',
        partnerCount: 'Ortak Sayısı',
      };
      const hasData = Object.values(value).some(v => v !== null && v !== undefined && v !== '');
      if (!hasData) return <span className="text-gray-400">Bilgi girilmemiş</span>;

      return (
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          {Object.entries(value).map(([k, v]) => {
            if (v === null || v === undefined || v === '') return null;
            let displayValue = String(v);
            if (k === 'capital' && v) {
              displayValue = Number(v).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
            }
            return (
              <div key={k} className="flex justify-between items-start gap-4">
                <span className="text-sm text-gray-600">{companyLabels[k] || k}:</span>
                <span className="text-sm font-medium text-gray-900 text-right">{displayValue}</span>
              </div>
            );
          })}
        </div>
      );
    }

    if (key === 'workplace_info' && typeof value === 'object' && !Array.isArray(value)) {
      const workplaceLabels = {
        workplaceAddress: 'İşyeri Adresi',
        workplaceCity: 'İşyeri Şehri',
        workplaceDistrict: 'İşyeri İlçesi',
        workplaceType: 'İşyeri Tipi',
      };
      const hasData = Object.values(value).some(v => v !== null && v !== undefined && v !== '');
      if (!hasData) return <span className="text-gray-400">Bilgi girilmemiş</span>;

      return (
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          {Object.entries(value).map(([k, v]) => {
            if (v === null || v === undefined || v === '') return null;
            return (
              <div key={k} className="flex justify-between items-start gap-4">
                <span className="text-sm text-gray-600">{workplaceLabels[k] || k}:</span>
                <span className="text-sm font-medium text-gray-900 text-right">{String(v)}</span>
              </div>
            );
          })}
        </div>
      );
    }

    // Ortaklar
    if (key === 'partners' && Array.isArray(value)) {
      if (value.length === 0) return <span className="text-gray-400">Ortak bilgisi girilmemiş</span>;

      return (
        <div className="space-y-3">
          {value.map((partner, idx) => (
            <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="font-semibold text-sm text-gray-700 mb-2">Ortak #{idx + 1}</div>
              <div className="space-y-1.5">
                {partner.name && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs text-gray-600">Ad:</span>
                    <span className="text-xs font-medium text-gray-900 text-right">{partner.name}</span>
                  </div>
                )}
                {partner.share && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs text-gray-600">Pay Oranı:</span>
                    <span className="text-xs font-medium text-gray-900 text-right">%{partner.share}</span>
                  </div>
                )}
                {partner.address && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs text-gray-600">Adres:</span>
                    <span className="text-xs font-medium text-gray-900 text-right">{partner.address}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Ek Belgeler
    if (key === 'additional_documents' && Array.isArray(value)) {
      if (value.length === 0) return <span className="text-gray-400">Ek belge yüklenmemiş</span>;

      return (
        <div className="space-y-2">
          {value.map((doc, idx) => (
            <div key={idx} className="p-2 bg-gray-50 rounded border border-gray-200 text-sm">
              {doc.name || doc.file_name || `Belge ${idx + 1}`}
            </div>
          ))}
        </div>
      );
    }

    // Meta Bilgileri
    if (key === 'meta' && typeof value === 'object' && !Array.isArray(value)) {
      const hasData = Object.values(value).some(v => v !== null && v !== undefined && v !== '');
      if (!hasData) return <span className="text-gray-400">Meta bilgisi girilmemiş</span>;

      return (
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          {Object.entries(value).map(([k, v]) => {
            if (v === null || v === undefined || v === '') return null;
            return (
              <div key={k} className="flex justify-between items-start gap-4">
                <span className="text-sm text-gray-600">{formatMetaLabel(k)}:</span>
                <span className="text-sm font-medium text-gray-900 text-right">{String(v)}</span>
              </div>
            );
          })}
        </div>
      );
    }

    // Sipariş Bilgisi
    if (key === 'order' && typeof value === 'object' && !Array.isArray(value)) {
      const orderLabels = {
        id: 'Sipariş ID',
        amount: 'Tutar',
        currency: 'Para Birimi',
        status: 'Durum',
        provider: 'Ödeme Sağlayıcı',
        createdAt: 'Oluşturulma Tarihi',
      };

      return (
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          {value.id && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sipariş ID:</span>
              <span className="text-sm font-semibold text-gray-900">#{value.id}</span>
            </div>
          )}
          {value.amount && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tutar:</span>
              <span className="text-sm font-semibold text-gray-900">
                {Number(value.amount).toLocaleString('tr-TR')} {value.currency || '₺'}
              </span>
            </div>
          )}
          {value.status && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Durum:</span>
              <span className="text-sm">
                {renderValue('status', value.status)}
              </span>
            </div>
          )}
          {value.provider && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ödeme Sağlayıcı:</span>
              <span className="text-sm font-medium text-gray-900 capitalize">{value.provider}</span>
            </div>
          )}
          {value.createdAt && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Oluşturulma Tarihi:</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date(value.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}
        </div>
      );
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      return JSON.stringify(value, null, 2);
    }

    if (Array.isArray(value)) {
      return value.map((item, idx) => (
        <div key={idx} className="mb-2 p-2 bg-gray-50 rounded">
          {typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)}
        </div>
      ));
    }

    return String(value);
  };

  const renderData = () => {
    if (!data) return null;

    const excludeKeys = ['id', 'customer_id', 'documents', 'form_data'];
    const entries = Object.entries(data).filter(([key]) => !excludeKeys.includes(key));

    return (
      <div className="space-y-4">
        {entries.map(([key, value]) => {
          if (value === null || value === undefined || value === '') return null;
          return (
            <div key={key} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="text-sm font-semibold text-gray-700">
                  {formatFieldLabel(key)}:
                </div>
                <div className="text-sm text-gray-900 sm:text-right flex-1">
                  {renderValue(key, value)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary to-primary-dark text-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Kayıt Detayları</h3>
                  {recordTitle && (
                    <p className="text-sm text-white/80 mt-1">{recordTitle}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Kapat"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Yükleniyor...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">Hata</p>
                  <p className="text-sm text-gray-500">{error}</p>
                </div>
              ) : data ? (
                <div className="space-y-6">
                  {renderData()}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500">Kayıt bulunamadı</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

