import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, PieChart, TrendingUp, Building, Clock, ChevronRight, ArrowLeft, Loader2, Save } from "lucide-react";
import { calculatorApi } from "../../lib/api";

const CalculatorTypes = {
    vat: { label: "KDV Hesaplama", icon: PieChart, color: "from-blue-500 to-cyan-500" },
    income_tax: { label: "Gelir Vergisi", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
    rent_withholding: { label: "Kira Stopajı", icon: Building, color: "from-orange-500 to-amber-500" },
    corporate_tax: { label: "Kurumlar Vergisi", icon: Calculator, color: "from-purple-500 to-pink-500" },
    late_tax: { label: "Gecikme Zammı", icon: Clock, color: "from-red-500 to-rose-500" },
};

export function CalculatorModal({ type, isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});

    // Reset state when type changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({});
            setResult(null);
            setError(null);

            // Set defaults based on type
            const defaults = {};
            if (type === 'vat') {
                defaults.rate = 20;
                defaults.type = 'gross';
            } else if (type === 'income_tax') {
                defaults.sgk_rate = 14;
                defaults.unemployment_rate = 1;
            } else if (type === 'rent_withholding') {
                defaults.rate = 20;
                defaults.amount_type = 'net';
            } else if (type === 'corporate_tax') {
                defaults.rate = 25;
            } else if (type === 'late_tax') {
                defaults.rate = 2.5;
            }
            setFormData(defaults);
        }
    }, [isOpen, type]);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            // Convert string inputs to numbers
            const payload = {};
            Object.keys(formData).forEach(key => {
                const value = formData[key];
                // Try to convert to number if it's a numeric string
                if (typeof value === 'string' && value !== '' && !isNaN(value)) {
                    payload[key] = parseFloat(value);
                } else {
                    payload[key] = value;
                }
            });

            let res;
            if (type === 'vat') res = await calculatorApi.calculateVat(payload);
            else if (type === 'income_tax') res = await calculatorApi.calculateIncomeTax(payload);
            else if (type === 'rent_withholding') res = await calculatorApi.calculateRentWithholding(payload);
            else if (type === 'corporate_tax') res = await calculatorApi.calculateCorporateTax(payload);
            else if (type === 'late_tax') res = await calculatorApi.calculateLateTax(payload);

            if (res) {
                if (res.success && res.data) {
                    setResult(res.data);
                } else {
                    setResult(res);
                }
            }
        } catch (err) {
            console.error(err);
            setError("Hesaplama sırasında bir hata oluştu. Lütfen değerleri kontrol ediniz.");
        } finally {
            setLoading(false);
        }
    };

    const config = CalculatorTypes[type] || { label: "Hesaplama Aracı", icon: Calculator, color: "from-gray-500 to-slate-500" };
    const Icon = config.icon;

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`bg-gradient-to-r ${config.color} p-6 text-white relative overflow-hidden shrink-0`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors z-20 cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md shadow-inner">
                            <Icon size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{config.label}</h2>
                            <p className="text-white/80 text-xs font-medium mt-0.5">Hesaplama Aracı</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col gap-4">
                        {type === 'vat' && (
                            <>
                                <Input label="Tutar" type="number" value={formData.amount} onChange={v => handleChange('amount', v)} placeholder="0.00" />
                                <Select label="KDV Oranı" value={formData.rate} onChange={v => handleChange('rate', v)} options={[
                                    { value: 1, label: "%1" },
                                    { value: 10, label: "%10" },
                                    { value: 20, label: "%20" },
                                ]} />
                                <RadioGroup label="Hesaplama Yöntemi" value={formData.type || 'gross'} onChange={v => handleChange('type', v)} options={[
                                    { value: 'gross', label: 'Hariçten Dahile' },
                                    { value: 'net', label: 'Dahil' },
                                ]} />
                            </>
                        )}

                        {type === 'income_tax' && (
                            <>
                                <Input label="Brüt Maaş" type="number" value={formData.gross_salary} onChange={v => handleChange('gross_salary', v)} placeholder="0.00" />
                                <Input label="SGK İşçi Payı (%)" type="number" value={formData.sgk_rate || 14} onChange={v => handleChange('sgk_rate', v)} placeholder="14" />
                                <Input label="İşsizlik Sig. İşçi Payı (%)" type="number" value={formData.unemployment_rate || 1} onChange={v => handleChange('unemployment_rate', v)} placeholder="1" />
                            </>
                        )}

                        {type === 'rent_withholding' && (
                            <>
                                <Input label="Kira Tutarı" type="number" value={formData.rent_amount} onChange={v => handleChange('rent_amount', v)} placeholder="0.00" />
                                <Input label="Stopaj Oranı (%)" type="number" value={formData.rate || 20} onChange={v => handleChange('rate', v)} placeholder="20" />
                                <RadioGroup label="Tutar Türü" value={formData.amount_type || 'net'} onChange={v => handleChange('amount_type', v)} options={[
                                    { value: 'net', label: 'Net' },
                                    { value: 'gross', label: 'Brüt' },
                                ]} />
                            </>
                        )}

                        {type === 'corporate_tax' && (
                            <>
                                <Input label="Ticari Kar (Matrah)" type="number" value={formData.profit} onChange={v => handleChange('profit', v)} placeholder="0.00" />
                                <Input label="Vergi Oranı (%)" type="number" value={formData.rate || 25} onChange={v => handleChange('rate', v)} placeholder="25" />
                            </>
                        )}

                        {type === 'late_tax' && (
                            <>
                                <Input label="Borç Tutarı" type="number" value={formData.debt_amount} onChange={v => handleChange('debt_amount', v)} placeholder="0.00" />
                                <Input label="Son Ödeme Tarihi" type="date" value={formData.due_date} onChange={v => handleChange('due_date', v)} />
                                <Input label="Hesaplama Tarihi" type="date" value={formData.payment_date} onChange={v => handleChange('payment_date', v)} />
                                <Input label="Aylık Faiz Oranı (%)" type="number" value={formData.rate || 2.5} onChange={v => handleChange('rate', v)} placeholder="2.5" />
                            </>
                        )}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`mt-4 w-full py-3.5 px-4 bg-gradient-to-r ${config.color} text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2`}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Hesapla"}
                        </button>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2">
                                <span className="font-bold">Hata:</span> {error}
                            </div>
                        )}

                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 p-5 bg-gray-50 border border-gray-100 rounded-2xl"
                            >
                                <h4 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
                                    <Calculator size={18} className="text-gray-500" />
                                    Sonuçlar
                                </h4>
                                <div className="space-y-2 text-sm">
                                    {Object.entries(result).map(([key, val]) => {
                                        if (typeof val === 'object' && val !== null) return null;
                                        return (
                                            <div key={key} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0 last:pb-0">
                                                <span className="text-gray-500 capitalize">{key.replace(/_/g, " ")}</span>
                                                <span className="font-bold text-gray-800">{typeof val === 'number' ? val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : val}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Helper Components

function Input({ label, type = "text", value, onChange, placeholder }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
            <input
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            />
        </div>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
            <div className="relative">
                <select
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                >
                    <option value="" disabled>Seçiniz</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={16} />
            </div>
        </div>
    );
}

function RadioGroup({ label, value, onChange, options }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => onChange(opt.value)}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${value === opt.value
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
