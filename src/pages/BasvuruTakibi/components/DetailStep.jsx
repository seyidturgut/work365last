import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";
import { formatDate } from "../utils";

export default function DetailStep({ selectedDetail, onBack }) {
  const isCompany = selectedDetail.type === "company_registration";

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <FaArrowLeft />
        Başvurulara Dön
      </button>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {isCompany ? selectedDetail.company_name : selectedDetail.service?.title}
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={selectedDetail.status} />
          <PaymentBadge paymentStatus={selectedDetail.payment_status} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {isCompany ? (
          <>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Şirket Adı</p>
                <p className="font-semibold text-gray-900">{selectedDetail.company_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Şirket Tipi</p>
                <p className="font-semibold text-gray-900">{selectedDetail.company_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sermaye</p>
                <p className="font-semibold text-gray-900">
                  {selectedDetail.capital ? `₺${parseFloat(selectedDetail.capital).toLocaleString("tr-TR")}` : "-"}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">İletişim</p>
                <p className="font-semibold text-gray-900">
                  {selectedDetail.first_name} {selectedDetail.last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{selectedDetail.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefon</p>
                <p className="font-semibold text-gray-900">{selectedDetail.phone}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Hizmet</p>
                <p className="font-semibold text-gray-900">{selectedDetail.service?.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Şirket</p>
                <p className="font-semibold text-gray-900">{selectedDetail.company_name}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Fiyat</p>
                <p className="font-semibold text-gray-900">
                  ₺{parseFloat(selectedDetail.service?.base_price || 0).toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Başvuru ID</p>
            <p className="font-semibold text-gray-900">#{selectedDetail.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Oluşturulma</p>
            <p className="font-semibold text-gray-900">{formatDate(selectedDetail.created_at)}</p>
          </div>
          {selectedDetail.product && (
            <div>
              <p className="text-sm text-gray-600">Paket</p>
              <p className="font-semibold text-gray-900">{selectedDetail.product.name}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
