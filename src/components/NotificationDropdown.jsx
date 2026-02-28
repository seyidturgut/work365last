import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { notificationApi } from "../lib/api";
import { getToken } from "../lib/auth";

export default function NotificationDropdown({ isOpen, onClose, onNavigate, onReadChange }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      const response = await notificationApi.list(token);
      if (response && response.data) {
        setNotifications(response.data.slice(0, 5));
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error fetching notifications:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      const token = getToken();
      if (token && !notification.is_read) {
        await notificationApi.read(token, { ids: [notification.id] });
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Dropdown bildirim okundu işaretlenemedi:", error);
      }
    } finally {
      if (
        notification.type === "document_request" ||
        notification.type === "document_uploaded" ||
        notification.type === "document_approved" ||
        notification.type === "document_rejected"
      ) {
        onNavigate(`/belgelerim`);
      } else if (notification.action_url) {
        onNavigate(notification.action_url);
      }
      onClose();
    }
  };

  const handleMarkAsRead = async (notification, event) => {
    event.stopPropagation();
    try {
      const token = getToken();
      if (!token || notification.is_read) return;
      await notificationApi.read(token, { ids: [notification.id] });
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notification.id ? { ...n, is_read: true } : n
        )
      );
      if (onReadChange) onReadChange();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Dropdown bildirim okundu işaretlenemedi:", error);
      }
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "document_request":
        return "bg-yellow-500";
      case "document_uploaded":
        return "bg-primary";
      case "document_approved":
        return "bg-green-500";
      case "document_rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Az önce";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Bildirimler</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Yükleniyor...</div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Bildirim bulunmamaktadır
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${getNotificationColor(
                    notification.type
                  )}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatRelativeTime(notification.created_at)}
                  </p>
                </div>
                {!notification.is_read && (
                  <button
                    onClick={(e) => handleMarkAsRead(notification, e)}
                    className="ml-2 p-1 text-xs rounded-lg bg-primary/10 text-primary hover:bg-primary/20 whitespace-nowrap flex items-center justify-center"
                  >
                    ✓
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center justify-between gap-3">
        <button
          onClick={async () => {
            try {
              const token = getToken();
              if (!token) return;
              await notificationApi.read(token, { all: true });
              if (onReadChange) onReadChange();
              fetchNotifications();
            } catch (error) {
              if (import.meta.env.DEV) {
                console.error("Dropdown tümünü okundu işaretle hata:", error);
              }
            }
          }}
          disabled={!notifications.some(n => !n.is_read)}
          className="text-xs text-gray-600 hover:text-primary font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-600"
        >
          Hepsini Okundu Yap
        </button>
        <button
          onClick={() => {
            onNavigate("/bildirimler");
            onClose();
          }}
          className="text-primary hover:text-primary-dark text-sm font-semibold transition-colors"
        >
          Tümünü Gör
        </button>
      </div>
    </motion.div>
  );
}

