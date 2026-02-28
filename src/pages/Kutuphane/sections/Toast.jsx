import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 px-4 py-3 bg-gray-900 text-white rounded-xl shadow-lg text-sm"
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
}
