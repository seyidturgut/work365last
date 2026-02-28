import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function AddressModal({
  showAddressModal,
  closeAddressModal,
  addressError,
  addressSuccess,
  addressForm,
  setAddressForm,
  cities,
  districts,
  loadingCities,
  loadingDistricts,
  savingAddress,
  handleSaveAddress,
  editingAddress,
  addresses,
}) {
  return (
    <AnimatePresence>
      {showAddressModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeAddressModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
          >
            <div className="bg-gradient-to-r from-primary via-blue-600 to-primary p-6 flex items-center justify-between flex-shrink-0">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">{editingAddress ? "Adres Düzenle" : "Yeni Adres Oluştur"}</h2>
                <p className="text-blue-100 text-sm">
                  {editingAddress ? "Kayıtlı adres bilgilerinizi güncelleyin" : "Fatura bilgilerinizi girin"}
                </p>
              </div>
              <button
                onClick={closeAddressModal}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {addressError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
                >
                  {addressError}
                </motion.div>
              )}

              {addressSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700"
                >
                  {addressSuccess}
                </motion.div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Ad Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={addressForm.name}
                      onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                      placeholder="Ad Soyad"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={addressForm.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                        setAddressForm({ ...addressForm, phone: val });
                      }}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                      placeholder="5XX XXX XX XX"
                      type="tel"
                      inputMode="numeric"
                      maxLength={11}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Adres <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={addressForm.address}
                    onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                    rows={3}
                    placeholder="Adres bilgisi"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Şehir <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={addressForm.city_id}
                      onChange={(e) => {
                        const cityId = e.target.value;
                        const city = cities.find((c) => String(c.id) === String(cityId));
                        setAddressForm({
                          ...addressForm,
                          city_id: cityId,
                          city: city?.name || "",
                          district_id: "",
                          district: "",
                        });
                      }}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                      required
                      disabled={loadingCities}
                    >
                      <option value="">Şehir Seçin</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      İlçe <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={addressForm.district_id}
                      onChange={(e) => {
                        const districtId = e.target.value;
                        const district = districts.find((d) => String(d.id) === String(districtId));
                        setAddressForm({
                          ...addressForm,
                          district_id: districtId,
                          district: district?.name || "",
                        });
                      }}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                      required
                      disabled={!addressForm.city_id || loadingDistricts}
                    >
                      <option value="">İlçe Seçin</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Posta Kodu</label>
                    <input
                      value={addressForm.postal_code}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                        setAddressForm({ ...addressForm, postal_code: val });
                      }}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                      placeholder="34000"
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Ülke</label>
                    <input
                      value={addressForm.country}
                      onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                      placeholder="Türkiye"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Vergi No (VKN)</label>
                    <input
                      value={addressForm.tax_number}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setAddressForm({ ...addressForm, tax_number: val });
                      }}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                      placeholder="Vergi No"
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">TC Kimlik No</label>
                    <input
                      value={addressForm.national_id}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                        setAddressForm({ ...addressForm, national_id: val });
                      }}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                      placeholder="TC Kimlik No"
                      type="text"
                      inputMode="numeric"
                      maxLength={11}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Adres Etiketi</label>
                  <input
                    value={addressForm.label}
                    onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                    className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                    placeholder="Örn: Ev, İş, Fatura Adresi"
                  />
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl p-4 border border-gray-200">
                  <div className="flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={addresses.length === 0 ? true : addressForm.is_default}
                        disabled={addresses.length === 0}
                        onChange={(e) => {
                          if (addresses.length === 0) return;
                          setAddressForm({ ...addressForm, is_default: e.target.checked });
                        }}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary disabled:opacity-60"
                      />
                      <span className="text-sm font-medium text-gray-800">Varsayılan Adres</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={addressForm.is_billing}
                        onChange={(e) => setAddressForm({ ...addressForm, is_billing: e.target.checked })}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-gray-800">Fatura Adresi</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-end gap-4 flex-shrink-0">
              <button
                onClick={closeAddressModal}
                className="px-6 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all shadow-sm"
              >
                Vazgeç
              </button>
              <button
                onClick={handleSaveAddress}
                disabled={savingAddress}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary-dark hover:to-blue-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingAddress ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Kaydet
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

