import { useState, useCallback } from "react";

export const pendingDocumentDefinitions = [
  {
    key: "identityDocument",
    label: "Kimlik Belgesi",
    description: "TC kimlik kartının önlü arkalı taranmış kopyası.",
  },
  {
    key: "identityCopy",
    label: "Kimlik Fotokopisi",
    description: "Kurucu ortağın kimlik fotokopisi.",
  },
  {
    key: "residenceDocument",
    label: "İkametgah Belgesi",
    description: "E-Devlet üzerinden alınmış güncel ikametgah belgesi.",
  },
  {
    key: "workplaceDocument",
    label: "İşyeri Belgesi",
    description: "Kira kontratı veya tapu fotokopisi.",
  },
  {
    key: "partnershipAgreement",
    label: "Ortaklık Sözleşmesi",
    description: "Ortaklar arasında imzalanmış sözleşme.",
  },
  {
    key: "powerOfAttorney",
    label: "Vekaletname",
    description: "Yetkili kişiye verilen vekaletname (varsa).",
  },
];

export default function usePendingDocuments({ getToken, navigate, companyRegistrationApi, loadPendingRegistrations }) {
  const [pendingDocModalOpen, setPendingDocModalOpen] = useState(false);
  const [pendingDocLoading, setPendingDocLoading] = useState(false);
  const [pendingDocRegistration, setPendingDocRegistration] = useState(null);
  const [pendingDocForm, setPendingDocForm] = useState({
    identityDocument: null,
    identityCopy: null,
    residenceDocument: null,
    workplaceDocument: null,
    partnershipAgreement: null,
    powerOfAttorney: null,
  });
  const [pendingDocMsg, setPendingDocMsg] = useState("");
  const [pendingDocErr, setPendingDocErr] = useState("");
  const [uploadingPendingDocs, setUploadingPendingDocs] = useState(false);
  const [pendingSummaryModalOpen, setPendingSummaryModalOpen] = useState(false);

  const resetPendingDocForm = useCallback(() => {
    setPendingDocForm({
      identityDocument: null,
      identityCopy: null,
      residenceDocument: null,
      workplaceDocument: null,
      partnershipAgreement: null,
      powerOfAttorney: null,
    });
  }, []);

  const openPendingDocumentsModal = useCallback(
    async (registration) => {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      setPendingDocErr("");
      setPendingDocMsg("");
      resetPendingDocForm();
      setPendingDocRegistration(null);
      setPendingDocModalOpen(true);
      setPendingDocLoading(true);

      try {
        const res = await companyRegistrationApi.get(token, registration.id);
        const data = res?.data || res;
        setPendingDocRegistration(data);
      } catch (e) {
        setPendingDocErr(e?.message || "Belgeler getirilemedi.");
      } finally {
        setPendingDocLoading(false);
      }
    },
    [companyRegistrationApi, getToken, navigate, resetPendingDocForm]
  );

  const closePendingDocumentsModal = useCallback(() => {
    setPendingDocModalOpen(false);
    setPendingDocRegistration(null);
    resetPendingDocForm();
    setPendingDocMsg("");
    setPendingDocErr("");
    setPendingDocLoading(false);
    setUploadingPendingDocs(false);
  }, [resetPendingDocForm]);

  const handlePendingDocumentFile = useCallback((key, file) => {
    setPendingDocForm((prev) => ({ ...prev, [key]: file }));
  }, []);

  const handlePendingDocumentsSave = useCallback(async () => {
    if (!pendingDocRegistration) {
      setPendingDocErr("Başvuru bilgisi bulunamadı.");
      return;
    }

    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    let hasFile = false;
    Object.entries(pendingDocForm).forEach(([key, file]) => {
      if (file instanceof File) {
        formData.append(key, file);
        hasFile = true;
      }
    });

    if (!hasFile) {
      setPendingDocErr("Lütfen güncellemek istediğiniz belgeleri seçin.");
      return;
    }

    setPendingDocErr("");
    setPendingDocMsg("");
    setUploadingPendingDocs(true);

    try {
      await companyRegistrationApi.uploadDocuments(token, pendingDocRegistration.id, formData);
      const updated = await companyRegistrationApi.get(token, pendingDocRegistration.id);
      setPendingDocRegistration(updated?.data || updated);
      resetPendingDocForm();
      setPendingDocMsg("Belgeler başarıyla güncellendi.");
      if (typeof loadPendingRegistrations === "function") {
        await loadPendingRegistrations();
      }
    } catch (e) {
      setPendingDocErr(e?.message || "Belgeler güncellenemedi.");
    } finally {
      setUploadingPendingDocs(false);
    }
  }, [companyRegistrationApi, getToken, loadPendingRegistrations, navigate, pendingDocForm, pendingDocRegistration, resetPendingDocForm]);

  return {
    pendingDocModalOpen,
    pendingDocLoading,
    pendingDocRegistration,
    pendingDocForm,
    pendingDocMsg,
    pendingDocErr,
    uploadingPendingDocs,
    pendingSummaryModalOpen,
    setPendingSummaryModalOpen,
    openPendingDocumentsModal,
    closePendingDocumentsModal,
    handlePendingDocumentFile,
    handlePendingDocumentsSave,
    setPendingDocErr,
    setPendingDocMsg,
  };
}

