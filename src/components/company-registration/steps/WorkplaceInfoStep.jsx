import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaFileUpload } from "react-icons/fa";

export default function WorkplaceInfoStep({
  formData,
  handleInputChange,
  handleFileUpload,
  setStep,
  canContinue,
  cities,
  workplaceDistricts,
  loadingLocations,
  handleWorkplaceCitySelect,
  handleWorkplaceDistrictSelect,
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl shadow-md p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaMapMarkerAlt className="text-primary" />
        İşyeri Bilgileri
      </h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">İşyeri Durumu *</label>
        <div className="grid md:grid-cols-2 gap-3">
          {['kira', 'sahiplik'].map((type) => (
            <button
              key={type}
              onClick={() => handleInputChange('workplaceType', type)}
              className={`px-4 py-3 rounded-xl font-medium transition-all ${formData.workplaceType === type
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {type === 'kira' ? 'Kira' : 'Sahiplik'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { key: 'workplaceCity', label: 'İl *', required: true },
          { key: 'workplaceDistrict', label: 'İlçe *', required: true },
          { key: 'workplaceAddress', label: 'İşyeri Adresi *', span: 2, required: true },
        ].map((field, idx) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.02 * idx }}
            className={`relative ${field.span === 2 ? 'md:col-span-2' : ''}`}
          >
            {field.key === 'workplaceAddress' ? (
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
            ) : field.key === 'workplaceCity' ? (
              <>
                <select
                  className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm"
                  value={formData.workplaceCityId || ""}
                  onChange={(e) => handleWorkplaceCitySelect(e.target.value)}
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
            ) : field.key === 'workplaceDistrict' ? (
              <>
                <select
                  className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm"
                  value={formData.workplaceDistrictId || ""}
                  onChange={(e) => handleWorkplaceDistrictSelect(e.target.value)}
                  disabled={!formData.workplaceCityId || loadingLocations}
                >
                  <option value="">İlçe Seçin</option>
                  {workplaceDistricts.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all duration-200 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">
                  {field.label}
                </label>
              </>
            ) : null}
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">İşyeri Belgesi * (Kira Sözleşmesi veya Tapu)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
          <input
            type="file"
            id="workplaceDocument"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('workplaceDocument', e.target.files[0])}
            className="hidden"
          />
          <label htmlFor="workplaceDocument" className="cursor-pointer">
            {formData.workplaceDocument ? (
              <div className="text-green-600">
                <FaFileUpload className="text-4xl mx-auto mb-2" />
                <p className="font-semibold">{formData.workplaceDocument.name}</p>
                <p className="text-sm text-gray-500 mt-1">Belge yüklendi</p>
              </div>
            ) : (
              <div className="text-gray-500">
                <FaFileUpload className="text-4xl mx-auto mb-2" />
                <p className="font-semibold">Belge Yükleyin</p>
                <p className="text-sm mt-1">PDF, JPG, PNG (Max 5MB)</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <button onClick={() => setStep(4)} className="px-8 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5">
          Geri
        </button>
        <button
          onClick={() => setStep(6)}
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

