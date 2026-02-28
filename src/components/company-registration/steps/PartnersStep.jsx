import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";

export default function PartnersStep({
  formData,
  handlePartnerChange,
  addPartner,
  removePartner,
  setStep,
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl shadow-md p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaUsers className="text-primary" />
        Ortak Bilgileri
      </h3>

      <p className="text-gray-600 mb-6">Şirketinize ortak eklemek istemiyorsanız bu adımı atlayabilirsiniz.</p>

      {formData.partners.map((partner, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Ortak {index + 1}</h4>
            {formData.partners.length > 1 && (
              <button
                onClick={() => removePartner(index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Kaldır
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { key: 'name', label: 'Ad Soyad' },
              { key: 'tcKimlikNo', label: 'TC Kimlik No', numeric: true, maxLength: 11 },
              { key: 'share', label: 'Hisse Oranı (%)', numeric: true },
              { key: 'address', label: 'Adres', span: 2 },
            ].map((field) => (
              <div key={field.key} className={field.span === 2 ? 'md:col-span-2' : ''}>
                {field.key === 'address' ? (
                  <div className="relative">
                    <textarea
                      className="peer w-full border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm"
                      placeholder=" "
                      rows={2}
                      value={partner[field.key]}
                      onChange={(e) => handlePartnerChange(index, field.key, e.target.value)}
                    />
                    <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-gray-50 px-1 text-xs text-gray-700 transition-all duration-200
                      peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500
                      peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">
                      {field.label}
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      className="peer w-full border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm"
                      placeholder=" "
                      type="text"
                      inputMode={field.numeric ? 'numeric' : undefined}
                      maxLength={field.maxLength}
                      value={partner[field.key]}
                      onChange={(e) => {
                        const val = field.numeric ? e.target.value.replace(/\D/g, '') : e.target.value;
                        handlePartnerChange(index, field.key, val);
                      }}
                    />
                    <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-gray-50 px-1 text-xs text-gray-700 transition-all duration-200
                      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500
                      peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">
                      {field.label}
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <button
        onClick={addPartner}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-colors font-medium"
      >
        + Ortak Ekle
      </button>

      <div className="flex items-center justify-between mt-8">
        <button onClick={() => setStep(3)} className="px-8 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5">
          Geri
        </button>
        <button
          onClick={() => setStep(5)}
          className="px-8 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-dark shadow"
        >
          Devam Et
        </button>
      </div>
    </motion.div>
  );
}

