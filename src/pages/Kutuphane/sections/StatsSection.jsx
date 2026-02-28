import { motion } from "framer-motion";
import { statIconMap } from "../constants";
import { FaChartLine } from "react-icons/fa";

export default function StatsSection({ statsToRender }) {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsToRender.map((stat, index) => {
            const Icon = statIconMap[stat.id] || FaChartLine;
            return (
              <motion.div
                key={`${stat.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                  <Icon className="text-2xl text-primary" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
