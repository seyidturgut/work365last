export const statusConfig = {
  draft: { label: "Taslak", color: "gray" },
  pending: { label: "Beklemede", color: "yellow" },
  submitted: { label: "Gönderildi", color: "blue" },
  in_progress: { label: "İşlemde", color: "indigo" },
  completed: { label: "Tamamlandı", color: "green" },
  cancelled: { label: "İptal Edildi", color: "red" },
};

export const paymentStatusConfig = {
  pending: { label: "Ödeme Bekliyor", color: "yellow" },
  paid: { label: "Ödendi", color: "green" },
  failed: { label: "Ödeme Başarısız", color: "red" },
  refunded: { label: "İade Edildi", color: "gray" },
};

export const statusColorClasses = {
  gray: "bg-gray-100 text-gray-700",
  yellow: "bg-yellow-100 text-yellow-700",
  blue: "bg-blue-100 text-blue-700",
  indigo: "bg-indigo-100 text-indigo-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
};
