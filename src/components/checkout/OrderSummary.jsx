import React from "react";
import { FaShoppingCart, FaBuilding, FaPercent, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function OrderSummary({
  items = [],
  summary,
  total = 0,
  rawTotal = 0,
  remainingTime = "",
  selectedInstallment = 1,
  installments = [],
}) {
  const discountAmount =
    summary?.total?.discount_amount && !Number.isNaN(parseFloat(summary.total.discount_amount))
      ? parseFloat(summary.total.discount_amount)
      : 0;

  const getItemImage = (item) => {
    const productKey = item.product?.key || item.service_request?.service_key || "";
    const isCompanyRegistration = ["sahis", "limited", "anonim", "bilanco"].includes(productKey);

    if (item.image) {
      return (
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-md"
        />
      );
    }

    if (isCompanyRegistration) {
      return (
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
          <FaBuilding className="text-lg text-white" />
        </div>
      );
    }

    return (
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-md">
        <FaShoppingCart className="text-lg text-white" />
      </div>
    );
  };

  return (
    <aside className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-fit sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <FaShoppingCart className="text-lg" />
          Sipariş Özeti
        </h3>
        {items.length > 0 && (
          <p className="text-sm text-white/90 mt-1">
            {items.length} {items.length === 1 ? 'ürün' : 'ürün'}
          </p>
        )}
      </div>

      {/* Items */}
      <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FaShoppingCart className="text-4xl mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Sepet boş</p>
          </div>
        ) : (
          items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {getItemImage(item)}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                  {item.service_request?.service_title || item.product?.title || item.name || 'Ürün'}
                </h4>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {item.tier && (
                    <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-md font-medium">
                      {item.tier === 'standard' ? 'Ticaret-e Başla' : 'Plus'}
                    </span>
                  )}
                  {item.period && (
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-md font-medium">
                      {item.period === 'monthly' ? 'Aylık' : 'Yıllık'}
                    </span>
                  )}
                  {item.quantity > 1 && (
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-md font-medium">
                      {item.quantity} adet
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Birim: {parseFloat(item.gross_price || item.net_price || item.price || 0).toLocaleString('tr-TR')} ₺
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-primary text-sm">
                  {(parseFloat(item.gross_price || item.net_price || item.price || 0) * (item.quantity || 1)).toLocaleString('tr-TR')} ₺
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="border-t border-gray-200 p-6 space-y-3 bg-gradient-to-b from-gray-50 to-white">
        <div className="flex items-center justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600 font-medium">Ara Toplam</span>
          <span className="font-bold text-gray-900">
            {(summary?.total?.total_gross != null
              ? parseFloat(summary.total.total_gross)
              : rawTotal || total
            ).toLocaleString('tr-TR')} ₺
          </span>
        </div>

        <div className="flex items-center justify-between py-2 text-sm">
          <span className="text-gray-500">KDV (%20)</span>
          <span className="text-gray-600 font-medium">Dahil</span>
        </div>

        {discountAmount > 0 && (
          <>
            <div className="flex items-center justify-between py-2 bg-emerald-50 rounded-lg px-3 -mx-3">
              <span className="text-emerald-700 font-semibold flex items-center gap-2 text-sm">
                <FaPercent className="text-xs" />
                İndirim {summary?.discount?.code && `(${summary.discount.code})`}
              </span>
              <span className="font-bold text-emerald-700">
                -{discountAmount.toLocaleString('tr-TR')} ₺
              </span>
            </div>
            {summary?.discount?.code && remainingTime && remainingTime !== "Süre doldu" && (
              <div className="flex items-center justify-between text-xs text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2 -mx-3">
                <span className="flex items-center gap-1">
                  <FaClock className="text-[10px]" />
                  Kupon kalan süre
                </span>
                <span className="font-semibold">{remainingTime}</span>
              </div>
            )}
          </>
        )}

        {selectedInstallment > 1 && installments.length > 0 && (() => {
          const selectedInst = installments.find(inst => inst.installment_number === selectedInstallment);
          const monthlyPayment = selectedInst?.installment_price ? parseFloat(selectedInst.installment_price) : 0;

          return (
            <div className="flex items-center justify-between py-2 bg-blue-50 rounded-lg px-3 -mx-3 text-sm">
              <span className="text-blue-700 font-semibold">Aylık Taksit</span>
              <span className="font-bold text-blue-700">
                {monthlyPayment.toLocaleString('tr-TR')} ₺
              </span>
            </div>
          );
        })()}

        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-300 mt-4">
          <span className="text-lg font-bold text-gray-900">
            {selectedInstallment > 1 ? 'Toplam Tutar' : 'Genel Toplam'}
          </span>
          <span className="text-2xl font-bold text-primary">
            {total.toLocaleString('tr-TR')} ₺
          </span>
        </div>
      </div>
    </aside>
  );
}

