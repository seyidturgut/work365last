import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { getMaxBirthDate, isAtLeast18YearsOld } from "../../../utils/companyRegistrationUtils";

export default function PersonalInfoStep({ formData, handleInputChange, setStep, canContinue }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl shadow-md p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaUser className="text-primary" />
        Kişisel Bilgiler
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { key: 'firstName', label: 'Ad *', required: true },
          { key: 'lastName', label: 'Soyad *', required: true },
          { key: 'tcKimlikNo', label: 'TC Kimlik No *', numeric: true, maxLength: 11, required: true },
          { key: 'birthDate', label: 'Doğum Tarihi *', type: 'date', required: true },
          { key: 'birthPlace', label: 'Doğum Yeri *', required: true },
          { key: 'maritalStatus', label: 'Medeni Durum', options: ['Bekar', 'Evli', 'Boşanmış', 'Dul'] },
          { key: 'motherName', label: 'Anne Adı' },
          { key: 'fatherName', label: 'Baba Adı' },
        ].map((field, idx) => (
          <motion.div key={field.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.02 * idx }} className="relative">
            {field.options ? (
              <div className="relative">
                <select
                  className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm"
                  value={formData[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  {field.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all duration-200 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary">
                  {field.label}
                </label>
              </div>
            ) : (
              <>
                <input
                  className={`peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 transition-all shadow-sm ${field.key === 'birthDate' && formData.birthDate && !isAtLeast18YearsOld(formData.birthDate)
                    ? 'border-red-500 focus:ring-red-500/60'
                    : 'focus:ring-primary/60'
                    }`}
                  placeholder=" "
                  type={field.type || 'text'}
                  inputMode={field.numeric ? 'numeric' : undefined}
                  maxLength={field.maxLength}
                  max={field.key === 'birthDate' ? getMaxBirthDate() : undefined}
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
                {field.key === 'birthDate' && formData.birthDate && !isAtLeast18YearsOld(formData.birthDate) && (
                  <p className="mt-1 text-xs text-red-600">18 yaşından büyük olmalısınız</p>
                )}
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => setStep(2)}
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

