import { motion } from "framer-motion";

export function OptionButton({ option, onClick }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(option)}
            className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group flex items-center justify-between"
        >
            <span className="font-medium text-gray-700 group-hover:text-indigo-700">
                {option.label}
            </span>
            <svg
                className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </motion.button>
    );
}
