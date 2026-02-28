import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-indigo-100/60 flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        <div className="absolute -inset-8 bg-gradient-to-tr from-[#799b38]/20 via-[#799b38]/10 to-[#29303e]/20 blur-3xl rounded-full animate-pulse" />

                        <div className="relative flex items-center justify-center gap-2 text-9xl font-bold">
                            <span style={{ color: '#799b38' }}>4</span>

                            <div
                                className="relative rounded-full flex items-center justify-center text-white"
                                style={{
                                    width: '7rem',
                                    height: '7rem',
                                    backgroundColor: '#799b38'
                                }}
                            >
                                0
                            </div>

                            <span style={{ color: '#29303e' }}>4</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4 mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Sayfa Bulunamadı
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Aradığınız sayfa mevcut değil veya taşınmış olabilir. Lütfen URL'yi kontrol edin veya ana sayfaya dönün.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="group px-6 py-3 rounded-xl font-semibold bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Geri Dön
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                        style={{
                            background: 'linear-gradient(135deg, #799b38 0%, #29303e 100%)'
                        }}
                    >
                        <FaHome />
                        Ana Sayfa
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-16 flex justify-center gap-2"
                >
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#799b38', animationDelay: '0s' }} />
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#29303e', animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#799b38', animationDelay: '0.4s' }} />
                </motion.div>
            </div>
        </div>
    );
}
