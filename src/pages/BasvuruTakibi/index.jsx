import { motion, AnimatePresence } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import useBasvuruTakibi from "./hooks/useBasvuruTakibi";
import EmailStep from "./components/EmailStep";
import VerifyStep from "./components/VerifyStep";
import ApplicationsListStep from "./components/ApplicationsListStep";
import DetailStep from "./components/DetailStep";
import Hyperspeed from "../../components/common/Hyperspeed/Hyperspeed";

export default function BasvuruTakibi() {
  const {
    step,
    email,
    setEmail,
    token,
    setToken,
    loading,
    error,
    success,
    applicationsData,
    selectedDetail,
    handleSendToken,
    handleVerifyToken,
    handleViewDetail,
    goToEmail,
    goToVerify,
    goToApplications,
    resetForDifferentEmail,
    clearVerifyAndGoEmail,
  } = useBasvuruTakibi();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] text-white py-24 pt-40 overflow-hidden">
        <Hyperspeed />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Başvuru <span className="text-primary-light">Takibi</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Email adresinize gönderilen 8 haneli takip kodu ile tüm süreçlerinizi anlık olarak izleyin.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 -mt-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatePresence mode="wait">
            {step === "email" && (
              <EmailStep
                email={email}
                setEmail={setEmail}
                error={error}
                success={success}
                loading={loading}
                onSendToken={handleSendToken}
                onHasCode={goToVerify}
              />
            )}

            {step === "verify" && (
              <VerifyStep
                email={email}
                token={token}
                setToken={setToken}
                error={error}
                loading={loading}
                onVerify={handleVerifyToken}
                onBack={goToEmail}
                onRequestNewCode={clearVerifyAndGoEmail}
              />
            )}

            {step === "applications" && applicationsData && (
              <ApplicationsListStep
                applicationsData={applicationsData}
                onViewDetail={handleViewDetail}
                onDifferentEmail={resetForDifferentEmail}
              />
            )}

            {step === "detail" && selectedDetail && (
              <DetailStep selectedDetail={selectedDetail} onBack={goToApplications} />
            )}
          </AnimatePresence>

          {loading && step !== "email" && step !== "verify" && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
                <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
                <p className="text-gray-600 font-medium">Yükleniyor...</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
