import React from "react";
import { motion } from "framer-motion";
import ServiceRequestDetail from "../../ServiceRequestDetail";

export default function ServiceRequestsTab({ onRefresh }) {
  return (
    <motion.div key="service-requests" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <ServiceRequestDetail onRefresh={onRefresh} />
    </motion.div>
  );
}

