import { motion } from "framer-motion";
import { FaFileUpload, FaIdCard } from "react-icons/fa";

export default function DocumentsStep({
  formData,
  handleFileUpload,
  setStep,
  canContinue,
  submitting,
  error,
  handleSubmit,
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl shadow-md p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaFileUpload className="text-primary" />
        Gerekli Belgeler
      </h3>

      <div className="space-y-6">
        {[
          {
            key: 'identityDocument',
            label: 'Kimlik Fotokopisi *',
            description: 'TC Kimlik belgesinin ön ve arka yüzü',
            required: true
          },
          {
            key: 'residenceDocument',
            label: 'İkametgâh Belgesi *',
            description: 'Son 6 ay içinde alınmış ikametgâh belgesi',
            required: true
          },
          {
            key: 'partnershipAgreement',
            label: 'Ortaklık Sözleşmesi',
            description: 'Birden fazla ortak varsa ortaklık sözleşmesi',
            required: false
          },
          {
            key: 'powerOfAttorney',
            label: 'Vekâletname',
            description: 'İşlemleri vekil ile yapacaksanız vekâletname',
            required: false
          },
        ].map((doc, idx) => (
          <motion.div
            key={doc.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-primary transition-colors"
          >
            <label htmlFor={doc.key} className="cursor-pointer block">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FaIdCard className="text-2xl text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{doc.label}</h4>
                    {doc.required && <span className="text-red-500 text-sm">*</span>}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                  <input
                    type="file"
                    id={doc.key}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(doc.key, e.target.files[0])}
                    className="hidden"
                  />
                  {formData[doc.key] ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <FaFileUpload />
                      <span className="font-medium text-sm">{formData[doc.key].name}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors">
                      <FaFileUpload />
                      Belge Yükle
                    </div>
                  )}
                </div>
              </div>
            </label>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-2">Önemli Notlar:</h4>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Belgeler PDF, JPG veya PNG formatında olmalıdır</li>
          <li>Her belge maksimum 5MB olabilir</li>
          <li>Kimlik fotokopisinin ön ve arka yüzü birleşik olarak yüklenebilir</li>
          <li>İkametgâh belgesi son 6 ay içinde alınmış olmalıdır</li>
        </ul>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mt-8">
        <button onClick={() => setStep(5)} className="px-8 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5">
          Geri
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canContinue || submitting}
          className={`px-8 py-3 rounded-xl font-semibold shadow transition-all ${canContinue && !submitting
            ? 'bg-primary text-white hover:bg-primary-dark'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          {submitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
        </button>
      </div>
    </motion.div>
  );
}

