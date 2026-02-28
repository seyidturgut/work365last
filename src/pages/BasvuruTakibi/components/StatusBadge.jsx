import { FaClock, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { statusConfig, statusColorClasses } from "../constants";

const statusIcons = {
  draft: FaClock,
  pending: FaClock,
  submitted: FaCheckCircle,
  in_progress: FaSpinner,
  completed: FaCheckCircle,
  cancelled: FaTimesCircle,
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.draft;
  const Icon = statusIcons[status] || FaClock;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${statusColorClasses[config.color]}`}>
      <Icon />
      {config.label}
    </span>
  );
}
