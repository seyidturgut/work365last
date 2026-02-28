import { motion } from "framer-motion";
import { FaFileUpload, FaBuilding, FaUser, FaMapMarkerAlt, FaEnvelope, FaUsers } from "react-icons/fa";

const steps = [
  { id: 1, title: "Kişisel Bilgiler", icon: <FaUser /> },
  { id: 2, title: "İletişim Bilgileri", icon: <FaEnvelope /> },
  { id: 3, title: "Şirket Bilgileri", icon: <FaBuilding /> },
  { id: 4, title: "Ortak Bilgileri", icon: <FaUsers /> },
  { id: 5, title: "İşyeri Bilgileri", icon: <FaMapMarkerAlt /> },
  { id: 6, title: "Belgeler", icon: <FaFileUpload /> },
];

export default function CompanyRegistrationHeader({ step, setStep }) {
  return (
    <section className="pt-28 pb-12 bg-work-navy-500 text-white">
      <div className="container mx-auto px-6">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
          Şirket Kuruluşu
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-blue-100 text-lg">
          Şirket kuruluşu için gerekli bilgileri ve belgeleri doldurun.
        </motion.p>

        <div className="mt-8">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center flex-1">
                <button
                  onClick={() => step >= s.id && setStep(s.id)}
                  disabled={step < s.id}
                  className="relative z-10 flex flex-col items-center gap-2 group"
                >
                  <motion.div
                    animate={{
                      scale: step >= s.id ? 1 : 0.85,
                      backgroundColor: step > s.id ? '#fff' : step === s.id ? '#fff' : 'rgba(255,255,255,0.3)',
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 font-semibold text-sm ${step >= s.id ? 'text-primary' : 'text-white/60'
                      }`}
                  >
                    {step > s.id ? (
                      <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </motion.svg>
                    ) : (
                      <span className="text-lg">{s.id}</span>
                    )}
                  </motion.div>
                  <span className={`text-xs font-medium whitespace-nowrap transition-colors ${step >= s.id ? 'text-white' : 'text-white/60'}`}>
                    {s.title}
                  </span>
                </button>
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-white/20">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: step > s.id ? 1 : 0 }}
                      className="h-full bg-white origin-left"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

