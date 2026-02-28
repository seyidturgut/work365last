import { motion } from "framer-motion";
import { FaArrowLeft, FaKey, FaCheckCircle, FaTimesCircle, FaSpinner, FaClock } from "react-icons/fa";

export default function VerifyStep({
  email,
  token,
  setToken,
  error,
  loading,
  onVerify,
  onBack,
  onRequestNewCode,
}) {
  return (
    <motion.div
      key="verify"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <FaArrowLeft />
        Geri Dön
      </button>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaKey className="text-3xl text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Takip Kodunu Girin</h2>
        <p className="text-gray-600">
          <strong>{email}</strong> adresine gönderilen 8 haneli kodu girin
        </p>
      </div>

      <form onSubmit={onVerify} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Takip Kodu</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value.replace(/\D/g, "").slice(0, 8))}
            placeholder="12345678"
            maxLength={8}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-center text-2xl font-mono tracking-widest"
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3.5 rounded-xl flex items-start gap-3 shadow-sm"
          >
            <FaTimesCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium flex-1">{error}</p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading || token.length !== 8}
          className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Doğrulanıyor...
            </>
          ) : (
            <>
              <FaCheckCircle />
              Doğrula ve Devam Et
            </>
          )}
        </button>

        <button type="button" onClick={onRequestNewCode} className="w-full text-primary font-medium py-2 hover:underline">
          Yeni kod talep et
        </button>
      </form>

      <div className="mt-6 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200 flex items-start gap-3">
        <FaClock className="text-yellow-600 text-lg flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800">
          <strong>Dikkat:</strong> Kod 30 dakika geçerlidir. Süre dolmuşsa yeni kod talep edin.
        </p>
      </div>
    </motion.div>
  );
}
