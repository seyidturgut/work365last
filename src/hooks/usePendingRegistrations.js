import { useState, useCallback } from "react";

export default function usePendingRegistrations({ getToken, navigate, refreshCart, companyRegistrationApi }) {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [pendingMsg, setPendingMsg] = useState("");
  const [pendingErr, setPendingErr] = useState("");
  const [addingPendingId, setAddingPendingId] = useState(null);
  const [deletingPendingId, setDeletingPendingId] = useState(null);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [pendingToDelete, setPendingToDelete] = useState(null);

  const loadPendingRegistrations = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    setPendingMsg("");
    setPendingErr("");
    setLoadingPending(true);
    try {
      const res = await companyRegistrationApi.pendingWithoutOrders(token);
      const list = res?.data || res || [];
      setPendingRegistrations(Array.isArray(list) ? list : []);
    } catch (e) {
      setPendingRegistrations([]);
    } finally {
      setLoadingPending(false);
    }
  }, [companyRegistrationApi, getToken]);

  const handlePendingAddToCart = useCallback(
    async (registration) => {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      setPendingErr("");
      setPendingMsg("");
      setAddingPendingId(registration.id);

      try {
        await companyRegistrationApi.addToCart(token, registration.id);
        if (typeof refreshCart === "function") {
          await refreshCart();
        }
        await loadPendingRegistrations();
        setPendingMsg("Başvuru sepete eklendi. 3 saniye içinde ödeme sayfasına yönlendirileceksiniz...");
        setTimeout(() => {
          navigate("/odeme");
        }, 3000);
      } catch (e) {
        setPendingErr(e?.message || "Başvuru sepete eklenemedi.");
      } finally {
        setAddingPendingId(null);
      }
    },
    [companyRegistrationApi, getToken, loadPendingRegistrations, navigate, refreshCart]
  );

  const openDeleteConfirmModal = useCallback((registration) => {
    setPendingToDelete(registration);
    setDeleteConfirmModalOpen(true);
  }, []);

  const closeDeleteConfirmModal = useCallback(() => {
    setDeleteConfirmModalOpen(false);
    setPendingToDelete(null);
  }, []);

  const handleDeletePendingRegistration = useCallback(async () => {
    if (!pendingToDelete) return;

    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    setPendingErr("");
    setPendingMsg("");
    setDeletingPendingId(pendingToDelete.id);

    try {
      await companyRegistrationApi.delete(token, pendingToDelete.id);
      if (typeof refreshCart === "function") {
        await refreshCart();
      }
      await loadPendingRegistrations();
      setPendingMsg("Başvuru başarıyla silindi.");
      closeDeleteConfirmModal();
    } catch (e) {
      setPendingErr(e?.message || "Başvuru silinemedi. Sadece taslak başvurular silinebilir.");
    } finally {
      setDeletingPendingId(null);
    }
  }, [closeDeleteConfirmModal, companyRegistrationApi, getToken, loadPendingRegistrations, navigate, pendingToDelete, refreshCart]);

  return {
    pendingRegistrations,
    loadingPending,
    pendingMsg,
    pendingErr,
    addingPendingId,
    deletingPendingId,
    deleteConfirmModalOpen,
    pendingToDelete,
    setPendingMsg,
    setPendingErr,
    loadPendingRegistrations,
    handlePendingAddToCart,
    openDeleteConfirmModal,
    closeDeleteConfirmModal,
    handleDeletePendingRegistration,
  };
}

