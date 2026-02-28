import { useState, useEffect } from "react";
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";
import { notificationApi } from "../../../lib/api";
import { getToken } from "../../../lib/auth";

const getNotificationIcon = (type) => {
    switch (type) {
        case "success":
            return <FaCheckCircle className="w-5 h-5 text-green-500" />;
        case "warning":
            return <FaExclamationCircle className="w-5 h-5 text-amber-500" />;
        case "error":
            return <FaExclamationCircle className="w-5 h-5 text-red-500" />;
        default:
            return <FaInfoCircle className="w-5 h-5 text-blue-500" />;
    }
};

const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    } catch {
        return dateStr;
    }
};

export default function NotificationsTab() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        const token = getToken();
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await notificationApi.list(token);
            const list = res?.data || res || [];
            setNotifications(Array.isArray(list) ? list : []);
        } catch (e) {
            setError("Bildirimler yüklenirken bir hata oluştu.");
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        const token = getToken();
        if (!token) return;

        try {
            await notificationApi.read(token, { ids: [id] });
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n))
            );
        } catch (e) {
            console.error("Failed to mark notification as read:", e);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#799b38]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
                {error}
            </div>
        );
    }

    if (notifications.length === 0) {
        return (
            <div className="text-center py-12">
                <FaBell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Bildirim Yok</h3>
                <p className="text-sm text-gray-500 mt-1">Henüz bildiriminiz bulunmuyor.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Bildirimler</h2>
                <span className="text-sm text-gray-500">
                    {notifications.filter((n) => !n.read_at).length} okunmamış
                </span>
            </div>

            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-all ${notification.read_at
                        ? "bg-white border-gray-200"
                        : "bg-[#799b38]/5 border-[#799b38]/20"
                        }`}
                >
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <h4
                                    className={`text-sm font-medium ${notification.read_at ? "text-gray-700" : "text-gray-900"
                                        }`}
                                >
                                    {notification.title || "Bildirim"}
                                </h4>
                                {!notification.read_at && (
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="text-gray-400 hover:text-gray-600 p-1"
                                        title="Okundu olarak işaretle"
                                    >
                                        <FaTimes className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                {notification.message || notification.body}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                {formatDate(notification.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
