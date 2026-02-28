import { paymentStatusConfig, statusColorClasses } from "../constants";

export default function PaymentBadge({ paymentStatus }) {
  const config = paymentStatusConfig[paymentStatus] || paymentStatusConfig.pending;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusColorClasses[config.color]}`}>
      {config.label}
    </span>
  );
}
