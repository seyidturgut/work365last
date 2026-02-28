import { useCallback, useEffect, useMemo, useState } from "react";
import { maintenanceApi } from "../lib/api";
import MaintenanceScreen from "./MaintenanceScreen";
import Loading from "./Loading";

export default function MaintenanceGate({ children }) {
  const [status, setStatus] = useState({ loading: true, error: "", data: null });

  const fetchStatus = useCallback(async () => {
    const bypassToken = localStorage.getItem('maintenance_bypass_token');
    if (bypassToken) {
      setStatus({ loading: false, error: "", data: null });
      return;
    }

    setStatus((prev) => ({ ...prev, loading: prev.loading && prev.data == null, error: "" }));
    try {
      const response = await maintenanceApi.status();
      setStatus({ loading: false, error: "", data: response?.data ?? response });
    } catch (error) {
      setStatus((prev) => ({
        loading: false,
        error: error?.message || "Bakım durumu kontrol edilirken hata oluştu.",
        data: prev?.data ?? null,
      }));
    }
  }, []);

  const pollingDelay = useMemo(() => {
    if (status.error || status?.data?.enabled) {
      return 1000 * 30; 
    }
    return 1000 * 60 * 3; 
  }, [status]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    const interval = setInterval(fetchStatus, pollingDelay);
    return () => clearInterval(interval);
  }, [fetchStatus, pollingDelay]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchStatus();
      }
    };
    const handleFocus = () => fetchStatus();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleFocus);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchStatus]);

  if (status.loading && !status.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loading />
      </div>
    );
  }

  if (status.error && !status.data) {
    return (
      <MaintenanceScreen
        isError
        message={status.error}
        endTime={null}
        onRetry={fetchStatus}
      />
    );
  }

  if (status?.data?.enabled) {
    return (
      <MaintenanceScreen
        message={status?.data?.message}
        endTime={status?.data?.end_time}
        onRetry={fetchStatus}
      />
    );
  }

  return children;
}

