import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function ResourceModal({ viewModal, closeViewModal }) {
  if (!viewModal.open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
        >
          <button
            onClick={closeViewModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4 pr-8">
            {viewModal.resource?.title}
          </h3>

          {viewModal.loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-100 rounded-lg" />
              <div className="h-6 bg-gray-100 rounded-lg" />
              <div className="h-6 bg-gray-100 rounded-lg" />
            </div>
          ) : viewModal.error ? (
            <p className="text-red-600">{viewModal.error}</p>
          ) : (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: viewModal.content || "" }}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
