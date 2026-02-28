import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

export default function ContactInfoStep({
  formData,
  handleInputChange,
  setStep,
  canContinue,
  addresses,
  selectedAddressId,
  loadingAddresses,
  handleAddressSelect,
  cities,
  districts,
  loadingLocations,
  handleCitySelect,
  handleDistrictSelect,
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl shadow-md p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaEnvelope className="text-primary" />
        İletişim Bilgileri
      </h3>

      {!loadingAddresses && addresses.length > 0 && (
        <div className="mb-6 pb-6 border-b">
          <label className="block text-sm font-medium text-gray-700 mb-3">Kayıtlı Adresler</label>
          <div className="space-y-2">
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedAddressId === addr.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50'
                  }`}
              >
                <input
                  type="radio"
                  name="selectedAddress"
                  value={addr.id}
                  checked={selectedAddressId === addr.id}
                  onChange={() => handleAddressSelect(addr.id)}
                  className="mt-1 accent-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{addr.label || 'Adres'}</span>
                    <div className="flex items-center gap-2 text-xs">
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
                  <div className="text-sm text-gray-600 mt-1">
                    {addr.name} • {addr.phone}
                  </div>
                  <div className="text-sm text-gray-500">
                    {addr.address}, {addr.district} {addr.city} / {addr.country}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { key: 'email', label: 'E-posta Adresi *', type: 'email', required: true },
          { key: 'phone', label: 'Telefon *', numeric: true, required: true },
          { key: 'mobile', label: 'Cep Telefonu', numeric: true },
          { key: 'city', label: 'İl *', required: true },
          { key: 'district', label: 'İlçe *', required: true },
          { key: 'postalCode', label: 'Posta Kodu', numeric: true, maxLength: 5 },
          { key: 'address', label: 'Adres *', span: 2, required: true },
        ].map((field, idx) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.02 * idx }}
            className={`relative ${field.span === 2 ? 'md:col-span-2' : ''}`}
          >
            {field.key === 'address' ? (
              <>
                <textarea
                  className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm"
                  placeholder=" "
                  rows={3}
                  value={formData[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                />
                <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all duration-200
                  peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500
                  peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">
                  {field.label}
                </label>
              </>
            ) : field.key === 'city' ? (
              <>
                <select
                  className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm"
                  value={formData.cityId || ""}
                  onChange={(e) => handleCitySelect(e.target.value)}
                  disabled={loadingLocations}
                >
                  <option value="">İl Seçin</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all duration-200 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">
                  {field.label}
                </label>
              </>
            ) : field.key === 'district' ? (
              <>
                <select
                  className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm"
                  value={formData.districtId || ""}
                  onChange={(e) => handleDistrictSelect(e.target.value)}
                  disabled={!formData.cityId || loadingLocations}
                >
                  <option value="">İlçe Seçin</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all duration-200 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">
                  {field.label}
                </label>
              </>
            ) : (
              <>
                <input
                  className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm"
                  placeholder=" "
                  type={field.type || 'text'}
                  inputMode={field.numeric ? 'numeric' : undefined}
                  maxLength={field.maxLength}
                  value={formData[field.key]}
                  onChange={(e) => {
                    const val = field.numeric ? e.target.value.replace(/\D/g, '') : e.target.value;
                    handleInputChange(field.key, val);
                  }}
                />
                <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all duration-200
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500
                  peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">
                  {field.label}
                </label>
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8">
        <button onClick={() => setStep(1)} className="px-8 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5">
          Geri
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!canContinue}
          className={`px-8 py-3 rounded-xl font-semibold shadow transition-all ${canContinue
            ? 'bg-primary text-white hover:bg-primary-dark'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          Devam Et
        </button>
      </div>
    </motion.div>
  );
}

