import { FaCheckCircle, FaLock, FaShieldAlt } from "react-icons/fa";

const items = [
  { id: "secure-payments", icon: FaLock, label: "Secure payments" },
  { id: "data-encrypted", icon: FaShieldAlt, label: "Data encrypted" },
  { id: "gdpr-ready", icon: FaCheckCircle, label: "GDPR-ready" },
];

export default function SecurityBadges({ compact = false, className = "" }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${compact ? "text-[11px]" : "text-xs"} ${className}`}
      aria-label="Security and compliance indicators"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <span
            key={item.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-slate-200"
          >
            <Icon className="text-[10px] text-blue-200" aria-hidden="true" />
            {item.label}
          </span>
        );
      })}
    </div>
  );
}
