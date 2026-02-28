import { useState } from "react";
import { applicationTrackingApi } from "../../../lib/api";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export default function useBasvuruTakibi() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [applicationsData, setApplicationsData] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [lastEmailSent, setLastEmailSent] = useState(null);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSendToken = async (e) => {
    e.preventDefault();

    if (lastEmailSent) {
      const elapsed = Date.now() - lastEmailSent;
      if (elapsed < FIVE_MINUTES_MS) {
        const remaining = Math.ceil((FIVE_MINUTES_MS - elapsed) / 1000);
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        setError(`Lütfen ${minutes} dakika ${seconds} saniye sonra tekrar deneyin.`);
        return;
      }
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await applicationTrackingApi.sendToken(email);
      if (response.success) {
        setSuccess(response.message);
        setStep("verify");
        setLastEmailSent(Date.now());
        scrollTop();
      } else {
        setError(response.message || "Bir hata oluştu");
      }
    } catch (err) {
      setError(err?.message || err?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await applicationTrackingApi.verify(email, token);
      if (response.success) {
        setApplicationsData(response.data);
        setStep("applications");
        scrollTop();
      } else {
        setError(response.message || "Geçersiz kod");
      }
    } catch (err) {
      setError(err?.message || err?.data?.message || "Kod doğrulanamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (type, id) => {
    setLoading(true);
    setError("");

    try {
      const response = await applicationTrackingApi.getDetail(email, token, type, id);
      if (response.success) {
        setSelectedDetail({ ...response.data, type });
        setStep("detail");
        scrollTop();
      } else {
        setError(response.message || "Detay getirilemedi");
      }
    } catch (err) {
      setError(err?.message || err?.data?.message || "Detay getirilemedi");
    } finally {
      setLoading(false);
    }
  };

  const goToEmail = () => {
    setStep("email");
    setError("");
    setSuccess("");
    scrollTop();
  };

  const goToVerify = () => {
    setStep("verify");
    setError("");
    setSuccess("");
    scrollTop();
  };

  const goToApplications = () => {
    setStep("applications");
    setSelectedDetail(null);
    setError("");
    scrollTop();
  };

  const resetForDifferentEmail = () => {
    setStep("email");
    setEmail("");
    setToken("");
    setApplicationsData(null);
    setError("");
  };

  const clearVerifyAndGoEmail = () => {
    setStep("email");
    setToken("");
    setError("");
  };

  return {
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
  };
}
