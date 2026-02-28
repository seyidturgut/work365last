import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalculator } from "react-icons/fa";
import { calculatorsApi } from "../lib/api";

const formatCurrency = (value) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(
    Number(value ?? 0)
  );

const labelTranslations = {
  amount: "Tutar",
  amount_type: "Tutar Tipi",
  rate: "Oran",
  type: "Tür",
  vat_amount: "KDV Tutarı",
  net_amount: "Net Tutar",
  gross_amount: "Brüt Tutar",
  vat_rate: "KDV Oranı",
  calculation_type: "Hesaplama Tipi",
  gross_rent: "Brüt Kira",
  withholding_amount: "Stopaj Tutarı",
  net_rent: "Net Kira",
  withholding_rate: "Stopaj Oranı",
  rent_amount: "Kira Tutarı",
  gross_salary: "Brüt Maaş",
  net_salary: "Net Maaş",
  sgk_rate: "SGK Oranı",
  sgk_deduction: "SGK Kesintisi",
  unemployment_rate: "İşsizlik Sigorta Oranı",
  unemployment_deduction: "İşsizlik Kesintisi",
  tax_base: "Vergi Matrahı",
  income_tax: "Gelir Vergisi",
  stamp_tax: "Damga Vergisi",
  total_deductions: "Toplam Kesintiler",
  tax_brackets_used: "Vergi Dilimleri",
  profit: "Dönem Karı",
  corporate_tax_rate: "Kurumlar Vergi Oranı",
  corporate_tax: "Kurumlar Vergisi",
  temporary_tax_paid: "Ödenen Geçici Vergi",
  deductible_temporary_tax: "Mahsup Edilen Geçici Vergi",
  payable_amount: "Ödenecek Tutar",
  refundable_amount: "İade Edilecek Tutar",
  net_profit: "Net Kar",
  period: "Dönem",
  period_name: "Dönem Adı",
  period_profit: "Dönem Karı",
  temporary_tax_rate: "Geçici Vergi Oranı",
  temporary_tax: "Geçici Vergi",
  net_period_profit: "Net Dönem Karı",
  goods_value: "Mal Bedeli",
  freight: "Navlun",
  insurance: "Sigorta",
  cif_value: "CIF Değeri",
  customs_rate: "Gümrük Vergi Oranı",
  customs_tax: "Gümrük Vergisi",
  sc_tax_rate: "ÖTV Oranı",
  sc_tax: "ÖTV",
  vat: "KDV",
  total_taxes: "Toplam Vergiler",
  total_cost: "Toplam Maliyet",
  contract_amount: "Sözleşme Tutarı",
  document_type: "Belge Türü",
  document_type_name: "Belge Türü",
  stamp_tax_rate: "Damga Vergisi Oranı",
  total_amount: "Toplam Tutar",
  debt_amount: "Borç Tutarı",
  due_date: "Vade Tarihi",
  payment_date: "Ödeme Tarihi",
  delay_days: "Gecikme Gün Sayısı",
  annual_rate: "Yıllık Oran",
  daily_rate: "Günlük Oran",
  late_fee: "Gecikme Zammı",
  is_overdue: "Gecikme Durumu",
};

const formatLabel = (key) => {
  if (!key) return "";
  const normalized = key.toLowerCase();
  if (labelTranslations[key]) return labelTranslations[key];
  if (labelTranslations[normalized]) return labelTranslations[normalized];
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const isCurrencyKey = (key) =>
  /(amount|tax|salary|profit|value|cost|rent|withholding|net)/i.test(key);

const calculatorConfigs = [
  {
    key: "vat",
    title: "KDV Hesaplama",
    description: "Net veya brüt tutardan KDV dahil, hariç hesaplamalar yapın.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    api: calculatorsApi.vat,
    defaults: { amount: 1000, rate: 18, type: "net" },
    fields: [
      { name: "amount", label: "Tutar", type: "number", step: "0.01", min: 0 },
      { name: "rate", label: "KDV Oranı (%)", type: "number", step: "0.1", min: 0 },
      {
        name: "type",
        label: "Tutar Tipi",
        type: "select",
        options: [
          { value: "net", label: "Net Tutar" },
          { value: "gross", label: "Brüt Tutar" },
        ],
      },
    ],
  },
  {
    key: "incomeTax",
    title: "Gelir Vergisi Hesaplama",
    description: "Brüt maaştan net maaş ve kesintileri hesaplayın.",
    image: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=800&h=600&fit=crop",
    api: calculatorsApi.incomeTax,
    defaults: { gross_salary: 20000, sgk_rate: 0.14, unemployment_rate: 0.01 },
    fields: [
      { name: "gross_salary", label: "Brüt Maaş", type: "number", step: "0.01", min: 0 },
      { name: "sgk_rate", label: "SGK Oranı", type: "number", step: "0.001", min: 0 },
      { name: "unemployment_rate", label: "İşsizlik Sigorta Oranı", type: "number", step: "0.001", min: 0 },
    ],
  },
  {
    key: "rentWithholding",
    title: "Kira Stopajı Hesaplama",
    description: "Net veya brüt kira tutarından stopaj hesaplayın.",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=600&fit=crop",
    api: calculatorsApi.rentWithholding,
    defaults: { rent_amount: 5000, amount_type: "gross", rate: 20 },
    fields: [
      { name: "rent_amount", label: "Kira Tutarı", type: "number", step: "0.01", min: 0 },
      {
        name: "amount_type",
        label: "Tutar Tipi",
        type: "select",
        options: [
          { value: "gross", label: "Brüt" },
          { value: "net", label: "Net" },
        ],
      },
      { name: "rate", label: "Stopaj Oranı (%)", type: "number", step: "0.1", min: 0 },
    ],
  },
  {
    key: "corporateTax",
    title: "Kurumlar Vergisi Hesaplama",
    description: "Dönem karı üzerinden ödenecek vergiyi hesaplayın.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    api: calculatorsApi.corporateTax,
    defaults: { profit: 100000, temporary_tax: 5000, rate: 25 },
    fields: [
      { name: "profit", label: "Dönem Karı", type: "number", step: "0.01", min: 0 },
      { name: "temporary_tax", label: "Ödenen Geçici Vergi", type: "number", step: "0.01", min: 0 },
      { name: "rate", label: "Kurumlar Vergisi Oranı (%)", type: "number", step: "0.1", min: 0 },
    ],
  },
  {
    key: "temporaryTax",
    title: "Geçici Vergi Hesaplama",
    description: "Çeyreklik dönem kazancınıza göre geçici vergiyi hesaplayın.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
    api: calculatorsApi.temporaryTax,
    defaults: { period_profit: 50000, period: 1, rate: 25 },
    fields: [
      { name: "period_profit", label: "Dönem Karı", type: "number", step: "0.01", min: 0 },
      {
        name: "period",
        label: "Dönem",
        type: "select",
        options: [
          { value: 1, label: "1. Dönem" },
          { value: 2, label: "2. Dönem" },
          { value: 3, label: "3. Dönem" },
        ],
      },
      { name: "rate", label: "Vergi Oranı (%)", type: "number", step: "0.1", min: 0 },
    ],
  },
  {
    key: "stampTax",
    title: "Damga Vergisi Hesaplama",
    description: "Sözleşme ve belgeler için damga vergisini hesaplayın.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
    api: calculatorsApi.stampTax,
    defaults: { contract_amount: 10000, document_type: "contract", rate: 0.948 },
    fields: [
      { name: "contract_amount", label: "Belge/Sözleşme Tutarı", type: "number", step: "0.01", min: 0 },
      {
        name: "document_type",
        label: "Belge Türü",
        type: "select",
        options: [
          { value: "contract", label: "Sözleşme" },
          { value: "general", label: "Genel Belge" },
          { value: "payroll", label: "Bordro" },
          { value: "receipt", label: "Makbuz" },
          { value: "promissory_note", label: "Senet" },
        ],
      },
      { name: "rate", label: "Damga Vergisi Oranı", type: "number", step: "0.001", min: 0 },
    ],
  },
  {
    key: "customsTax",
    title: "Gümrük Vergisi Hesaplama",
    description: "İthalat işlemlerinde vergileri kalem kalem hesaplayın.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop",
    api: calculatorsApi.customsTax,
    defaults: {
      goods_value: 10000,
      freight: 500,
      insurance: 200,
      customs_rate: 10,
      sc_tax_rate: 0,
      vat_rate: 20,
    },
    fields: [
      { name: "goods_value", label: "Mal Bedeli", type: "number", step: "0.01", min: 0 },
      { name: "freight", label: "Navlun (Freight)", type: "number", step: "0.01", min: 0 },
      { name: "insurance", label: "Sigorta", type: "number", step: "0.01", min: 0 },
      { name: "customs_rate", label: "Gümrük Vergisi Oranı (%)", type: "number", step: "0.1", min: 0 },
      { name: "sc_tax_rate", label: "ÖTV Oranı (%)", type: "number", step: "0.1", min: 0 },
      { name: "vat_rate", label: "KDV Oranı (%)", type: "number", step: "0.1", min: 0 },
    ],
  },
  {
    key: "lateTax",
    title: "Vergi Gecikme Zammı",
    description: "Borç tutarı ve tarihlere göre gecikme zammını hesaplayın.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
    api: calculatorsApi.lateTax,
    defaults: { debt_amount: 10000, due_date: "2024-01-01", payment_date: "2024-02-01", rate: 50 },
    fields: [
      { name: "debt_amount", label: "Borç Tutarı", type: "number", step: "0.01", min: 0 },
      { name: "due_date", label: "Vade Tarihi", type: "date" },
      { name: "payment_date", label: "Ödeme Tarihi", type: "date" },
      { name: "rate", label: "Yıllık Gecikme Oranı (%)", type: "number", step: "0.1", min: 0 },
    ],
  },
];

export default function Araclar() {
  const [forms, setForms] = useState(() =>
    calculatorConfigs.reduce((acc, calc) => {
      acc[calc.key] = { ...calc.defaults };
      return acc;
    }, {})
  );
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const [activeCalcKey, setActiveCalcKey] = useState(null);

  const handleInputChange = (calcKey, fieldName, value) => {
    setForms((prev) => ({
      ...prev,
      [calcKey]: {
        ...prev[calcKey],
        [fieldName]: value,
      },
    }));
  };

  const buildPayload = (calc, values) => {
    const payload = {};
    calc.fields.forEach((field) => {
      const val = values[field.name];
      if (val === "" || val === undefined || val === null) return;
      if (field.type === "number") {
        payload[field.name] = Number(val);
      } else if (field.type === "select") {
        payload[field.name] =
          typeof field.options[0]?.value === "number" ? Number(val) : val;
      } else {
        payload[field.name] = val;
      }
    });
    return payload;
  };

  const handleSubmit = async (calc) => {
    setLoading((prev) => ({ ...prev, [calc.key]: true }));
    setErrors((prev) => ({ ...prev, [calc.key]: null }));
    setResults((prev) => ({ ...prev, [calc.key]: null }));
    try {
      const payload = buildPayload(calc, forms[calc.key]);
      const response = await calc.api(payload);
      const data = response?.data || response;
      setResults((prev) => ({ ...prev, [calc.key]: data }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [calc.key]:
          error?.data?.message ||
          error?.message ||
          "Hesaplama yapılırken bir hata oluştu.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [calc.key]: false }));
    }
  };

  const handleReset = (calc) => {
    setForms((prev) => ({ ...prev, [calc.key]: { ...calc.defaults } }));
    setResults((prev) => ({ ...prev, [calc.key]: null }));
    setErrors((prev) => ({ ...prev, [calc.key]: null }));
  };

  const renderValue = (key, value) => {
    if (Array.isArray(value)) {
      return (
        <div className="space-y-2">
          {value.map((item, idx) =>
            typeof item === "object" && item !== null ? (
              <div
                key={`${key}-${idx}`}
                className="bg-white/70 border border-gray-100 rounded-lg p-3 space-y-1"
              >
                {Object.entries(item).map(([subKey, subVal]) => (
                  <div
                    key={subKey}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-gray-500">{formatLabel(subKey)}</span>
                    <span className="text-gray-900 font-medium">
                      {typeof subVal === "boolean"
                        ? subVal
                          ? "Evet"
                          : "Hayır"
                        : isCurrencyKey(subKey)
                          ? formatCurrency(subVal)
                          : String(subVal)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div key={`${key}-${idx}`} className="text-gray-900 font-medium">
                {String(item)}
              </div>
            )
          )}
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([subKey, subVal]) => (
            <div
              key={subKey}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="text-gray-500">{formatLabel(subKey)}</span>
              <span className="text-gray-900 font-medium">
                {typeof subVal === "boolean"
                  ? subVal
                    ? "Evet"
                    : "Hayır"
                  : isCurrencyKey(subKey)
                    ? formatCurrency(subVal)
                    : String(subVal)}
              </span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <p className="text-gray-900 font-medium">
        {typeof value === "boolean"
          ? value
            ? "Evet"
            : "Hayır"
          : isCurrencyKey(key)
            ? formatCurrency(value)
            : String(value)}
      </p>
    );
  };

  const renderResult = (calcKey) => {
    const data = results[calcKey];
    if (!data) return null;
    return (
      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm max-h-64 overflow-y-auto space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="pb-2 border-b border-gray-100 last:border-b-0 last:pb-0"
          >
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              {formatLabel(key)}
            </p>
            {renderValue(key, value)}
          </div>
        ))}
      </div>
    );
  };

  const activeCalc = calculatorConfigs.find((calc) => calc.key === activeCalcKey);

  return (
    <div className="pt-20">
      <section className="relative bg-work-navy-500 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-sm uppercase tracking-[0.5em] text-white/70 mb-4">
              Vergi Araçları
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tüm Vergi Hesaplamaları Tek Panelde
            </h1>
            <p className="text-blue-100 text-lg">
              2024 Türkiye vergi oranlarıyla güncel hesaplamalar yapın. KDV'den
              damga vergisine kadar tüm vergi araçları burada.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {calculatorConfigs.map((calc, index) => (
            <motion.button
              key={calc.key}
              onClick={() => setActiveCalcKey(calc.key)}
              className="group flex flex-col items-start text-left bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="relative w-full h-40 overflow-hidden">
                <img
                  src={calc.image}
                  alt={calc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white text-lg font-semibold">{calc.title}</p>
                  <p className="text-white/80 text-sm">{calc.description}</p>
                </div>
              </div>
              <div className="p-5 w-full flex items-center justify-between text-primary font-semibold">
                Detaylı Hesapla
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <AnimatePresence>
        {activeCalc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveCalcKey(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-white/[0.98] border border-white/60 rounded-[28px] shadow-[0_20px_80px_rgba(15,23,42,0.25)] w-full max-w-4xl overflow-hidden relative"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-10 -left-24 w-72 h-72 bg-blue-100/70 blur-3xl rounded-full"></div>
              </div>

              <div className="relative flex flex-col lg:flex-row">
                <div className="lg:w-2/5 border-r border-gray-100 bg-gradient-to-b from-white to-gray-50 p-8">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-inner">
                    <img
                      src={activeCalc.image}
                      alt={activeCalc.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    {activeCalc.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {activeCalc.description}
                  </p>
                </div>

                <div className="lg:w-3/5 p-8 space-y-4">
                  <div className="grid gap-4">
                    {activeCalc.fields.map((field) => (
                      <div key={field.name} className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                          {field.label}
                        </label>
                        {field.type === "select" ? (
                          <select
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            value={forms[activeCalc.key][field.name]}
                            onChange={(e) =>
                              handleInputChange(activeCalc.key, field.name, e.target.value)
                            }
                          >
                            {field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            step={field.step}
                            min={field.min}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            value={forms[activeCalc.key][field.name]}
                            onChange={(e) =>
                              handleInputChange(activeCalc.key, field.name, e.target.value)
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {errors[activeCalc.key] && (
                    <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">
                      {errors[activeCalc.key]}
                    </div>
                  )}

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => handleSubmit(activeCalc)}
                      disabled={loading[activeCalc.key]}
                      className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                      {loading[activeCalc.key] ? "Hesaplanıyor..." : "Hesapla"}
                    </button>
                    <button
                      onClick={() => handleReset(activeCalc)}
                      className="text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      Sıfırla
                    </button>
                  </div>

                  {renderResult(activeCalc.key)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

