import { motion, useReducedMotion } from "framer-motion";

const defaultMetrics = [
  { id: "companies-formed", label: "Companies formed", value: "12,500+" },
  { id: "avg-setup-time", label: "Avg. setup time", value: "7 days" },
  { id: "countries-supported", label: "Countries supported", value: "40+" },
];

export default function MetricsRow({ metrics = defaultMetrics, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={`mx-auto w-full max-w-[1400px] px-6 ${className}`} aria-label="Core metrics">
      <div className="grid gap-3 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <motion.article
            key={metric.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
            className="glass-card rounded-2xl p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/80">
              {metric.label}
            </p>
            <p className="mt-2 text-3xl font-black text-white">{metric.value}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
