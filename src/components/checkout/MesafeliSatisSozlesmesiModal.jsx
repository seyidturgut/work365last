import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import MesafeliSatisSozlesmesiContent from "../MesafeliSatisSozlesmesiContent";

export default function MesafeliSatisSozlesmesiModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
          >
            <div className="flex-shrink-0 bg-gradient-to-r from-slate-800 via-blue-900 to-blue-950 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Mesafeli Satış Sözleşmesi</h2>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all"
                aria-label="Kapat"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <MesafeliSatisSozlesmesiContent embedded />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
