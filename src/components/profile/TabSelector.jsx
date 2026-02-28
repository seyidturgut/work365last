import React from "react";
import { motion } from "framer-motion";

export default function TabSelector({ tabs = [], active, onSelect }) {
  return (
    <section className="pb-10">
      <div className="container mx-auto px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {tabs.map((widget) => (
            <motion.button
              key={widget.key}
              data-tour={`${widget.key}-tab`}
              onClick={() => onSelect(widget.key)}
              whileHover={{ y: -4 }}
              className={`rounded-2xl bg-gradient-to-br ${widget.gradient} p-5 text-left shadow-lg transition flex items-center gap-3 text-white ${active === widget.key ? "ring-4 ring-white/70 scale-[1.01]" : "opacity-85 hover:opacity-100"
                }`}
            >
              <div>
                <p className="text-base font-semibold">{widget.label}</p>
                <p className="text-xs text-white/80">{widget.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

