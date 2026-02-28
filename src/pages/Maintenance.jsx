import React from 'react';
import { motion } from 'framer-motion';
import { FaTools } from 'react-icons/fa';
import SEO from '../components/SEO';

export default function Maintenance() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <SEO />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
            >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaTools className="text-4xl text-primary" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    Bakım Modu
                </h1>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Sizlere daha iyi hizmet verebilmek için sistemlerimizde kısa süreli bir bakım çalışması yapıyoruz. Lütfen daha sonra tekrar deneyin.
                </p>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mb-6">
                    <p className="text-sm text-blue-800 font-medium">
                        Anlayışınız için teşekkür ederiz.
                    </p>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                    Sayfayı Yenile
                </button>
            </motion.div>
        </div>
    );
}
