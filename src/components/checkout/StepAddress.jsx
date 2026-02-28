import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function StepAddress({
  error,
  loadingAddresses,
  addresses,
  selectedAddressId,
  handleAddressSelect,
  openAddressModal,
  canContinue,
  setStep,
}) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border rounded-2xl shadow-md p-6"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-900">Adres ve Fatura Bilgileri</h3>

      {!loadingAddresses && addresses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-2">Adres Bilgisi Gerekli</h4>
              <p className="text-gray-700 mb-4">Ödeme işlemini tamamlamak için önce bir adres oluşturmanız gerekiyor.</p>
              <button
                onClick={() => openAddressModal()}
                className="px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Adres Oluştur
              </button>
            </div>
          </div>
        </motion.div>
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

      {!loadingAddresses && addresses.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Kayıtlı Adresler</p>
              <p className="text-xs text-gray-500">
                Kullanmak istediğiniz adres kartına tıklayın, düzenlemek için kartın sağ üstündeki düğmeyi kullanın.
              </p>
            </div>
            <button
              onClick={() => openAddressModal()}
              className="px-4 py-2 rounded-xl border border-dashed border-primary/50 text-primary text-sm font-semibold hover:bg-primary/5 transition"
            >
              + Yeni Adres Ekle
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((addr) => {
              const isSelected = selectedAddressId === addr.id;
              return (
                <div
                  key={addr.id}
                  className={`relative rounded-2xl border-2 p-4 transition-all cursor-pointer focus-within:ring-2 focus-within:ring-primary ${
                    isSelected
                      ? 'border-primary/70 bg-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-primary/40 hover:shadow'
                  }`}
                  onClick={() => handleAddressSelect(addr.id)}
                >
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openAddressModal(addr);
                      }}
                      className="text-xs font-semibold text-primary/80 hover:text-primary bg-white/80 backdrop-blur px-2 py-1 rounded-lg border border-primary/20 shadow-sm"
                    >
                      Düzenle
                    </button>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition ${
                        isSelected
                          ? 'border-primary bg-primary text-white shadow'
                          : 'border-gray-300 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-gray-900">{addr.label || 'Adres'}</p>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide">
                          {addr.is_default && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              Varsayılan
                            </span>
                          )}
                          {addr.is_billing && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Fatura
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">
                        {addr.name} • {addr.phone}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {addr.address}
                        <br />
                        {addr.district} / {addr.city} • {addr.country}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Kartı tıklayarak seçebilir, sağ üstten düzenleyebilirsiniz.
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="absolute bottom-3 right-3 text-xs font-semibold text-primary">Seçili</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {addresses.length > 0 && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-6">
          <p className="text-sm text-gray-500">
            Seçtiğiniz adres fatura bilgileriniz olarak kullanılacaktır.
          </p>
          <button
            disabled={!canContinue}
            onClick={() => canContinue && setStep(2)}
            className={`px-6 py-3 rounded-xl font-semibold shadow ${
              canContinue ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Devam Et
          </button>
        </div>
      )}
    </motion.div>
  );
}

