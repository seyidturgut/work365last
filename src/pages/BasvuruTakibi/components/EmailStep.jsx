import { motion } from "framer-motion";
import { FaEnvelope, FaKey, FaCheckCircle, FaTimesCircle, FaSpinner, FaClock } from "react-icons/fa";

export default function EmailStep({ email, setEmail, error, success, loading, onSendToken, onHasCode }) {
  return (
    <motion.div
      key="email"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaEnvelope className="text-3xl text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Adresinizi Girin</h2>
        <p className="text-gray-600">Başvuru yaparken kullandığınız email adresini girin</p>
      </div>

      <form onSubmit={onSendToken} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Adresi</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
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

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3.5 rounded-xl flex items-start gap-3 shadow-sm"
          >
            <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium flex-1">{success}</p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Gönderiliyor...
            </>
          ) : (
            <>
              <FaKey />
              Takip Kodu Gönder
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onHasCode}
          className="w-full text-primary font-medium py-3 hover:underline transition-all"
        >
          Mevcut Kodum Var
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200 flex items-start gap-3">
        <FaClock className="text-blue-500 text-lg flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          <strong>Not:</strong> Email adresinize 8 haneli bir takip kodu gönderilecektir. Bu kod 30 dakika geçerlidir.
        </p>
      </div>
    </motion.div>
  );
}
