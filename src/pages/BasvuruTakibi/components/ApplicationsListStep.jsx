import { motion } from "framer-motion";
import { FaBuilding, FaFileAlt, FaEye } from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";
import { formatDate } from "../utils";

export default function ApplicationsListStep({ applicationsData, onViewDetail, onDifferentEmail }) {
  return (
    <motion.div
      key="applications"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-2">Hoş geldiniz, {applicationsData.customer.name}!</h2>
        <p className="text-blue-100">{applicationsData.customer.email}</p>
      </div>

      {applicationsData.company_registrations?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-2xl text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Şirket Kuruluşları</h3>
              <p className="text-gray-600">{applicationsData.company_registrations.length} başvuru</p>
            </div>
          </div>

          <div className="space-y-4">
            {applicationsData.company_registrations.map((app) => (
              <div
                key={app.id}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => onViewDetail("company_registration", app.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                      {app.company_name}
                    </h4>
                    <p className="text-gray-600 mb-3">{app.company_type}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={app.status} />
                      <PaymentBadge paymentStatus={app.payment_status} />
                    </div>
                  </div>
                  <button type="button" className="text-primary hover:text-primary-dark transition-colors">
                    <FaEye className="text-xl" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Paket</p>
                    <p className="font-semibold text-gray-900">{app.product?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Başvuru Tarihi</p>
                    <p className="font-semibold text-gray-900">{formatDate(app.created_at)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {applicationsData.service_requests?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaFileAlt className="text-2xl text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Hizmet Talepleri</h3>
              <p className="text-gray-600">{applicationsData.service_requests.length} talep</p>
            </div>
          </div>

          <div className="space-y-4">
            {applicationsData.service_requests.map((app) => (
              <div
                key={app.id}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => onViewDetail("service_request", app.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                      {app.service?.title}
                    </h4>
                    <p className="text-gray-600 mb-3">{app.company_name}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={app.status} />
                      <PaymentBadge paymentStatus={app.payment_status} />
                    </div>
                  </div>
                  <button type="button" className="text-primary hover:text-primary-dark transition-colors">
                    <FaEye className="text-xl" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Hizmet</p>
                    <p className="font-semibold text-gray-900">{app.service?.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Talep Tarihi</p>
                    <p className="font-semibold text-gray-900">{formatDate(app.created_at)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onDifferentEmail}
        className="w-full text-gray-600 hover:text-gray-900 font-medium py-3 hover:underline"
      >
        Farklı email ile sorgula
      </button>
    </motion.div>
  );
}
