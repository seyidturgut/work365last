import React from "react";
import { motion } from "framer-motion";

export default function AddressesTab({
  addresses,
  savedNotice,
  msg,
  err,
  setMsg,
  setErr,
  loading,
  openManageModal,
  openFormModal,
  setActive,
  setModalOpen,
  loadAddresses,
  getToken,
  customerApi,
}) {
  const handleSetDefault = async (id) => {
    const token = getToken();
    if (!token) return;
    setErr("");
    setMsg("");
    try {
      await customerApi.updateAddress(token, id, { is_default: true });
      setMsg("Varsayılan adres güncellendi.");
      loadAddresses();
    } catch (e) {
      setErr(e?.message || "İşlem başarısız.");
    }
  };

  const handleSetBilling = async (id) => {
    const token = getToken();
    if (!token) return;
    setErr("");
    setMsg("");
    try {
      await customerApi.updateAddress(token, id, { is_billing: true });
      setMsg("Fatura adresi güncellendi.");
      loadAddresses();
    } catch (e) {
      setErr(e?.message || "İşlem başarısız.");
    }
  };

  const handleDelete = async (id) => {
    const token = getToken();
    if (!token) return;
    setErr("");
    setMsg("");
    try {
      await customerApi.deleteAddress(token, id);
      setMsg("Adres silindi.");
      loadAddresses();
    } catch (e) {
      setErr(e?.message || "Silinemedi.");
    }
  };

  const billingAddress = (addresses || []).find((x) => x.is_billing);

  return (
    <>
      <motion.div key="addresses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
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
              onClick={() => openManageModal()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary-dark hover:to-blue-700 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Adresleri Yönet
            </button>
          </div>
        </div>
        {savedNotice && <div className="mb-3 rounded-lg px-4 py-2 text-sm border bg-green-50 text-green-700 border-green-200">{savedNotice}</div>}
        {(msg || err) && (
          <div className={`mb-4 rounded-lg px-4 py-3 text-sm border ${msg ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
            {msg || err}
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-4">
          {(addresses || []).map((a) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group relative rounded-2xl border-2 border-gray-200 hover:border-primary/50 bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-900">{a.label || "Adres"}</h4>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {a.is_default && (
                      <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200">Varsayılan</span>
                    )}
                    {a.is_billing && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200">Fatura</span>
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
                  {(a.tax_number || a.national_id) && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                      {a.tax_number && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          VKN: {a.tax_number}
                        </span>
                      )}
                      {a.tax_number && a.national_id && <span>•</span>}
                      {a.national_id && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          TCKN: {a.national_id}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
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
                    <button onClick={() => handleSetDefault(a.id)} className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all">
                      Varsayılan
                    </button>
                  )}
                  {!a.is_billing && (
                    <button onClick={() => handleSetBilling(a.id)} className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all">
                      Fatura
                    </button>
                  )}
                  <button onClick={() => handleDelete(a.id)} className="px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all">
                    Sil
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Billing summary */}
      
    </>
  );
}

