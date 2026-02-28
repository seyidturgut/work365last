import { motion } from "framer-motion";
import { FaBuilding } from "react-icons/fa";
import { formatCurrencyDisplay } from "../../../utils/companyRegistrationUtils";

export default function CompanyInfoStep({
  formData,
  handleInputChange,
  setStep,
  canContinue,
  companyType,
  setCompanyType,
  preselectedFromQuery,
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl shadow-md p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaBuilding className="text-primary" />
        Şirket Bilgileri
      </h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Şirket Türü *</label>
        {preselectedFromQuery ? (
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 text-primary font-semibold">
            {companyType === 'sahis' ? 'Şahıs Şirketi' : companyType === 'limited' ? 'Limited Şirket' : companyType === 'anonim' ? 'Anonim Şirket' : 'Bilanço Şirketi'}
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-3">
            {[
              { key: 'sahis', label: 'Şahıs Şirketi' },
              { key: 'limited', label: 'Limited Şirket' },
              { key: 'anonim', label: 'Anonim Şirket' },
              { key: 'bilanco', label: 'Bilanço Şirketi' },
            ].map((type) => (
              <button
                key={type.key}
                onClick={() => setCompanyType(type.key)}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${companyType === type.key
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { key: 'companyName', label: 'Şirket Adı *', required: true, span: 2 },
          { key: 'companyActivity', label: 'Faaliyet Alanı *', required: true, span: 2 },
          { key: 'capital', label: 'Sermaye (₺) *', numeric: true, required: true },
          { key: 'partnerCount', label: 'Ortak Sayısı', numeric: true },
        ].map((field, idx) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.02 * idx }}
            className={`relative ${field.span === 2 ? 'md:col-span-2' : ''}`}
          >
            <input
              className="peer w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-sm"
              placeholder=" "
              type="text"
              inputMode={field.numeric ? 'numeric' : undefined}
              value={field.key === 'capital' ? formatCurrencyDisplay(formData[field.key]) : formData[field.key]}
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
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8">
        <button onClick={() => setStep(2)} className="px-8 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5">
          Geri
        </button>
        <button
          onClick={() => setStep(4)}
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

