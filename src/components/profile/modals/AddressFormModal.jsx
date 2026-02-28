import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AddressFormModal({
  formModalOpen,
  setFormModalOpen,
  editing,
  setEditing,
  form,
  setForm,
  cities,
  districts,
  loadingCities,
  loadingDistricts,
  loadDistricts,
  getToken,
  customerApi,
  loadAddresses,
  setErr,
  setMsg,
  setSavedNotice,
  setDistricts,
}) {
  const handleSave = async (e) => {
    e.stopPropagation();
    const token = getToken();
    if (!token) return;
    setErr("");
    setMsg("");
    try {
      if (editing) {
        const fields = ["label", "name", "phone", "address", "city", "district", "country", "postal_code", "tax_number", "national_id", "is_default", "is_billing"];
        const hasChanges = fields.some((k) => (editing[k] ?? "") !== (form[k] ?? ""));
        if (!hasChanges) {
          setFormModalOpen(false);
          setEditing(null);
          return;
        }
        await customerApi.updateAddress(token, editing.id, form);
        setMsg("Adres güncellendi.");
      } else {
        await customerApi.createAddress(token, form);
        setMsg("Adres oluşturuldu.");
      }
      await loadAddresses();
      setFormModalOpen(false);
      setEditing(null);
      setSavedNotice("Değişiklikler kaydedildi.");
      setTimeout(() => setSavedNotice(""), 5000);
    } catch (e) {
      setErr(e?.message || "Kaydedilemedi.");
    }
  };

  return (
    <AnimatePresence>
      {formModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setFormModalOpen(false);
              setEditing(null);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-blue-600 to-primary p-6 text-white flex items-center justify-between flex-shrink-0">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/80 font-semibold mb-1">{editing ? "Adres Güncelle" : "Yeni Adres Ekle"}</p>
                <h2 className="text-2xl font-bold">{editing ? editing.label || "Adres" : "Adres Bilgileri"}</h2>
              </div>
              <button
                onClick={() => {
                  setFormModalOpen(false);
                  setEditing(null);
                }}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 md:p-8 space-y-8">
                {/* İsim - Telefon - Ülke */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Başlık <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.label}
                      onChange={(e) => setForm({ ...form, label: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                      placeholder="Ev, İş vb."
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      İsim Soyisim <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                      placeholder="Ad Soyad"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => {
                        const numeric = e.target.value.replace(/[^\d+]/g, "");
                        setForm({ ...form, phone: numeric });
                      }}
                      className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                      placeholder="+90 555 123 45 67"
                      type="tel"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Ülke <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                      placeholder="Türkiye"
                    />
                  </div>
                </div>

                {/* Adres Bilgileri */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Adres Bilgileri</h3>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Şehir <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={form.city_id}
                          onChange={(e) => {
                            const selectedCity = cities.find((c) => String(c.id) === String(e.target.value));
                            if (selectedCity) {
                              setForm({ ...form, city: selectedCity.name, city_id: selectedCity.id, district: "", district_id: "" });
                              loadDistricts(selectedCity.id);
                            } else {
                              setForm({ ...form, city: "", city_id: "", district: "", district_id: "" });
                              if (setDistricts) setDistricts([]);
                            }
                          }}
                          className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
                          disabled={loadingCities}
                        >
                          <option value="">{loadingCities ? "Yükleniyor..." : cities.length === 0 ? "Şehir bulunamadı" : "Şehir Seçiniz"}</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">İlçe</label>
                        <select
                          value={form.district_id}
                          onChange={(e) => {
                            const selectedDistrict = districts.find((d) => String(d.id) === String(e.target.value));
                            if (selectedDistrict) {
                              setForm({ ...form, district: selectedDistrict.name, district_id: selectedDistrict.id });
                            } else {
                              setForm({ ...form, district: "", district_id: "" });
                            }
                          }}
                          className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
                          disabled={loadingDistricts || !form.city_id || districts.length === 0}
                        >
                          <option value="">
                            {!form.city_id ? "Önce şehir seçiniz" : loadingDistricts ? "Yükleniyor..." : districts.length === 0 ? "İlçe bulunamadı" : "İlçe Seçiniz"}
                          </option>
                          {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">Posta Kodu</label>
                        <input
                          value={form.postal_code}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            setForm({ ...form, postal_code: val });
                          }}
                          className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                          placeholder="34000"
                          type="text"
                          maxLength={5}
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Adres <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all resize-none bg-white text-gray-900 placeholder:text-gray-400"
                        rows={3}
                        placeholder="Mahalle, Sokak, Bina No, Daire No..."
                      />
                    </div>
                  </div>
                </div>

                {/* Vergi Bilgileri */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Vergi Bilgileri (Opsiyonel)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Vergi No (VKN)</label>
                      <input
                        value={form.tax_number}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setForm({ ...form, tax_number: val });
                        }}
                        maxLength={10}
                        inputMode="numeric"
                        className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                        placeholder="Vergi No"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-800 mb-2">TC Kimlik No</label>
                      <input
                        value={form.national_id}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "").slice(0, 11);
                          setForm({ ...form, national_id: val });
                        }}
                        maxLength={11}
                        inputMode="numeric"
                        className="w-full rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 px-4 py-3.5 transition-all bg-white text-gray-900 placeholder:text-gray-400"
                        placeholder="TC Kimlik No"
                      />
                    </div>
                  </div>
                </div>

                {/* Seçenekler */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-5 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Adres Seçenekleri</h3>
                  <div className="flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" checked={form.is_default} onChange={(e) => setForm({ ...form, is_default: e.target.checked })} className="sr-only peer" />
                        <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center group-hover:border-primary">
                          {form.is_default && (
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">Varsayılan Adres</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" checked={form.is_billing} onChange={(e) => setForm({ ...form, is_billing: e.target.checked })} className="sr-only peer" />
                        <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center group-hover:border-primary">
                          {form.is_billing && (
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">Fatura Adresi</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-end gap-4 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFormModalOpen(false);
                  setEditing(null);
                }}
                className="px-6 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all shadow-sm"
              >
                Vazgeç
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary-dark hover:to-blue-700 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {editing ? "Güncelle" : "Kaydet"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

