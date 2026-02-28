import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Toast({ toast, setToast }) {
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -100, x: "-50%" }}
          className={`fixed top-24 left-1/2 z-50 max-w-md w-full mx-4 ${
            toast.type === "success"
              ? "bg-gradient-to-r from-green-500 to-green-600"
              : "bg-gradient-to-r from-red-500 to-red-600"
          } text-white rounded-xl shadow-2xl p-4 flex items-center gap-4`}
        >
          <div className="flex-shrink-0">
            {toast.type === "success" ? <FaCheckCircle className="h-6 w-6" /> : <FaTimesCircle className="h-6 w-6" />}
          </div>
          <p className="flex-1 font-medium">{toast.message}</p>
          <button
            onClick={() => setToast({ show: false, message: "", type: "success" })}
            className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <FaTimesCircle className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

