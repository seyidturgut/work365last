import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBell,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaChartBar,
  FaInbox,
  FaSearch,
  FaFilter,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { notificationApi } from "../lib/api";
import { getToken } from "../lib/auth";
import { useAuth } from "../context/AuthContext";

export default function Notifications() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 8,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });
  const [stats, setStats] = useState({
    pending_documents: 0,
    uploaded_documents: 0,
    total_unread: 0,
  });

  useEffect(() => {
    if (user) {
      fetchNotifications(1);
    }
  }, [user]);

  const fetchNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      const response = await notificationApi.list(token, page, 8);
      if (response) {
        setNotifications(response.data || []);
        if (response.meta) {
          setPagination({
            current_page: response.meta.current_page || 1,
            per_page: response.meta.per_page || 8,
            total: response.meta.total || 0,
            last_page: response.meta.last_page || 1,
            from: response.meta.from || 0,
            to: response.meta.to || 0,
          });
        }
        if (response.stats) {
          setStats(response.stats);
        }
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error fetching notifications:", error);
      }
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    if (typeFilter !== "all") {
      filtered = filtered.filter((notif) => notif.type === typeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((notif) => {
        const matchesTitle = notif.title?.toLowerCase().includes(query);
        const matchesMessage = notif.message?.toLowerCase().includes(query);
        const matchesDocumentType = notif.document_type?.toLowerCase().includes(query);
        const matchesAdminNotes = notif.admin_notes?.toLowerCase().includes(query);
        return matchesTitle || matchesMessage || matchesDocumentType || matchesAdminNotes;
      });
    }

    return filtered;
  }, [notifications, typeFilter, searchQuery]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      fetchNotifications(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    fetchNotifications(1);
  };

  const hasActiveFilters = typeFilter !== "all" || searchQuery.trim() !== "";

  const getTypeText = (type) => {
    switch (type) {
      case "document_request":
        return "Belge Talebi";
      case "document_uploaded":
        return "Belge Yüklendi";
      case "document_approved":
        return "Belge Onaylandı";
      case "document_rejected":
        return "Belge Reddedildi";
      default:
        return type;
    }
  };

  const getNotificationIcon = (type) => {
    const iconClass = "h-6 w-6";
    switch (type) {
      case "document_request":
        return <FaClock className={`${iconClass} text-yellow-600`} />;
      case "document_uploaded":
        return <FaFileAlt className={`${iconClass} text-blue-600`} />;
      case "document_approved":
        return <FaCheckCircle className={`${iconClass} text-green-600`} />;
      case "document_rejected":
        return <FaTimesCircle className={`${iconClass} text-red-600`} />;
      default:
        return <FaBell className={`${iconClass} text-gray-600`} />;
    }
  };

  const getNotificationConfig = (type) => {
    switch (type) {
      case "document_request":
        return {
          bg: "bg-gradient-to-br from-yellow-50 to-yellow-100",
          border: "border-yellow-300",
          iconBg: "bg-yellow-100",
          dot: "bg-yellow-500",
        };
      case "document_uploaded":
        return {
          bg: "bg-gradient-to-br from-blue-50 to-blue-100",
          border: "border-blue-300",
          iconBg: "bg-blue-100",
          dot: "bg-blue-500",
        };
      case "document_approved":
        return {
          bg: "bg-gradient-to-br from-green-50 to-green-100",
          border: "border-green-300",
          iconBg: "bg-green-100",
          dot: "bg-green-500",
        };
      case "document_rejected":
        return {
          bg: "bg-gradient-to-br from-red-50 to-red-100",
          border: "border-red-300",
          iconBg: "bg-red-100",
          dot: "bg-red-500",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-gray-50 to-gray-100",
          border: "border-gray-300",
          iconBg: "bg-gray-100",
          dot: "bg-gray-500",
        };
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
        console.error("Bildirim okundu işaretlenemedi:", error);
      }
    } finally {
      if (
        notification.type === "document_request" ||
        notification.type === "document_uploaded" ||
        notification.type === "document_approved" ||
        notification.type === "document_rejected"
      ) {
        navigate("/belgelerim");
      } else if (notification.action_url) {
        navigate(notification.action_url);
      }
    }
  };

  const handleMarkAsRead = async (notification, event) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      const token = getToken();
      if (!token || notification.is_read) return;
      await notificationApi.read(token, { ids: [notification.id] });
      fetchNotifications(pagination.current_page || 1);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Bildirim okundu işaretlenemedi:", error);
      }
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = getToken();
      if (!token) return;
      await notificationApi.read(token, { all: true });
      fetchNotifications(pagination.current_page || 1);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Tüm bildirimler okundu işaretlenemedi:", error);
      }
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
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} gün önce`;
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderPagination = () => {
    if (pagination.last_page <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, pagination.current_page - Math.floor(maxVisible / 2));
    let endPage = Math.min(pagination.last_page, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t-2 border-gray-200">
        <div className="text-sm text-gray-600">
          <span className="font-semibold">
            {pagination.from}-{pagination.to}
          </span>{" "}
          / <span className="font-semibold">{pagination.total}</span> bildirim
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="p-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
            aria-label="Önceki sayfa"
          >
            <FaChevronLeft className="h-4 w-4" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="px-2 text-gray-500">...</span>
              )}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg border-2 transition-all shadow-sm hover:shadow-md ${
                page === pagination.current_page
                  ? "bg-primary text-white border-primary shadow-lg"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          {endPage < pagination.last_page && (
            <>
              {endPage < pagination.last_page - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(pagination.last_page)}
                className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
              >
                {pagination.last_page}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
            className="p-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
            aria-label="Sonraki sayfa"
          >
            <FaChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      <section className="pt-28 pb-16 bg-work-navy-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <FaBell className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Bildirimler</h1>
              <p className="text-blue-100 text-lg mt-2">
                Tüm bildirimlerinizi buradan görüntüleyebilirsiniz.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 -mt-8">
        <div className="container mx-auto px-6 max-w-5xl">
          {stats.total_unread > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-200 rounded-xl">
                    <FaClock className="h-6 w-6 text-yellow-700" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-yellow-700 mb-1">Bekleyen Belgeler</p>
                    <p className="text-4xl font-bold text-yellow-900">{stats.pending_documents}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-200 rounded-xl">
                    <FaFileAlt className="h-6 w-6 text-blue-700" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-700 mb-1">Yüklenen Belgeler</p>
                    <p className="text-4xl font-bold text-blue-900">{stats.uploaded_documents}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-primary/10 to-primary/20 border-2 border-primary/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <FaInbox className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary mb-1">Toplam Okunmamış</p>
                    <p className="text-4xl font-bold text-primary">{stats.total_unread}</p>
                  </div>
                </div>
                <button
                  onClick={markAllAsRead}
                  disabled={stats.total_unread === 0}
                  className="mt-4 w-full px-4 py-2 rounded-xl bg-white/90 text-primary font-semibold text-sm hover:bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/90"
                >
                  Tümünü okundu işaretle
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Filtreler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 md:p-8 mb-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg">
                <FaFilter className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Filtreler</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Arama */}
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-primary transition-colors z-10" />
                  <input
                    type="text"
                    placeholder="Başlık, mesaj veya belge tipi ara..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    className="w-full pl-14 pr-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all shadow-sm hover:shadow-md text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Tip Filtresi */}
              <div className="lg:w-72 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => {
                      setTypeFilter(e.target.value);
                    }}
                    className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all appearance-none cursor-pointer shadow-sm hover:shadow-md text-gray-900 font-medium"
                  >
                    <option value="all">🔔 Tüm Bildirimler</option>
                    <option value="document_request">⏳ Belge Talebi</option>
                    <option value="document_uploaded">📤 Belge Yüklendi</option>
                    <option value="document_approved">✅ Belge Onaylandı</option>
                    <option value="document_rejected">❌ Belge Reddedildi</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Filtreleri Temizle */}
              {hasActiveFilters && (
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={clearFilters}
                  className="px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-2xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-gray-300"
                >
                  <FaTimes className="h-4 w-4" />
                  Temizle
                </motion.button>
              )}
            </div>

            {/* Aktif Filtre Bilgisi */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-6 border-t-2 border-gray-200/50"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl border border-primary/20">
                    <FaFilter className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-gray-700">
                      <span className="text-primary">{filteredNotifications.length}</span> sonuç bulundu
                    </span>
                  </div>
                  
                  {typeFilter !== "all" && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 rounded-xl text-sm font-semibold border border-yellow-200 shadow-sm flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      {getTypeText(typeFilter)}
                    </motion.span>
                  )}
                  
                  {searchQuery.trim() && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 rounded-xl text-sm font-semibold border border-blue-200 shadow-sm flex items-center gap-2"
                    >
                      <FaSearch className="h-3 w-3" />
                      "{searchQuery}"
                    </motion.span>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white rounded-2xl shadow-xl border border-gray-200"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {hasActiveFilters ? (
                  <FaSearch className="h-12 w-12 text-gray-400" />
                ) : (
                  <FaBell className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {hasActiveFilters ? "Sonuç Bulunamadı" : "Henüz Bildirim Yok"}
              </h3>
              <p className="text-gray-600 mb-4">
                {hasActiveFilters
                  ? "Arama kriterlerinize uygun bildirim bulunamadı. Filtreleri değiştirmeyi deneyin."
                  : "Yeni bildirimler burada görünecektir."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
                >
                  <FaTimes className="h-4 w-4" />
                  Filtreleri Temizle
                </button>
              )}
            </motion.div>
          ) : (
            <>
              <div className="space-y-4">
                {filteredNotifications.map((notification, index) => {
                  const config = getNotificationConfig(notification.type);
                  const dotColor = notification.is_read ? "bg-gray-300" : config.dot;
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      onClick={() => handleNotificationClick(notification)}
                      className={`border-2 rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-2xl transition-all ${config.bg} ${config.border} relative overflow-hidden group`}
                    >
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        {!notification.is_read && (
                          <button
                            type="button"
                            onClick={(e) => handleMarkAsRead(notification, e)}
                            className="px-2 py-1 text-xs rounded-lg bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center"
                          >
                            ✓
                          </button>
                        )}
                        <div className={`w-3 h-3 rounded-full ${dotColor} shadow-lg`}></div>
                      </div>
                      <div className="flex items-start gap-4 relative z-10">
                        <div className={`${config.iconBg} p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-bold text-lg text-gray-900">{notification.title}</h3>
                          </div>
                          <p className="text-gray-800 mb-4 leading-relaxed">{notification.message}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="flex items-center gap-2 text-gray-600 font-medium">
                              <FaClock className="h-3 w-3" />
                              {formatRelativeTime(notification.created_at)}
                            </span>
                            {notification.document_type && (
                              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                                {notification.document_type}
                              </span>
                            )}
                          </div>
                          {notification.admin_notes && (
                            <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-red-200 shadow-md">
                              <div className="flex items-start gap-2 mb-2">
                                <FaTimesCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-bold text-red-700">Admin Notu</p>
                              </div>
                              <p className="text-sm text-gray-800 leading-relaxed">{notification.admin_notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {renderPagination()}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
