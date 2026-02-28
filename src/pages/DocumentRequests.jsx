import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { documentRequestApi } from "../lib/api";
import { getToken } from "../lib/auth";
import { useAuth } from "../context/AuthContext";

export default function DocumentRequests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 8,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });

  useEffect(() => {
    if (user) {
      fetchAllDocumentRequests();
    }
  }, [user]);

  const fetchAllDocumentRequests = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      let allData = [];
      let currentPage = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await documentRequestApi.list(token, currentPage, 50);
        if (response && response.data) {
          allData = [...allData, ...response.data];
          if (response.meta && currentPage < response.meta.last_page) {
            currentPage++;
          } else {
            hasMore = false;
          }
        } else {
          hasMore = false;
        }
      }

      setAllRequests(allData);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error fetching document requests:", error);
      }
      setAllRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = useMemo(() => {
    let filtered = [...allRequests];

    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((req) => {
        const matchesTitle = req.title?.toLowerCase().includes(query);
        const matchesDescription = req.description?.toLowerCase().includes(query);
        const matchesRequestable = req.requestable_title?.toLowerCase().includes(query);
        return matchesTitle || matchesDescription || matchesRequestable;
      });
    }

    return filtered;
  }, [allRequests, statusFilter, searchQuery]);

  useEffect(() => {
    const total = filteredRequests.length;
    const lastPage = Math.ceil(total / pagination.per_page) || 1;
    const currentPage = Math.min(pagination.current_page, lastPage) || 1;
    const from = total === 0 ? 0 : (currentPage - 1) * pagination.per_page + 1;
    const to = Math.min(currentPage * pagination.per_page, total);

    const paginated = filteredRequests.slice(
      (currentPage - 1) * pagination.per_page,
      currentPage * pagination.per_page
    );

    setRequests(paginated);
    setPagination((prev) => ({
      ...prev,
      current_page: currentPage,
      total,
      last_page: lastPage,
      from,
      to,
    }));
  }, [filteredRequests, pagination.per_page, pagination.current_page]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setPagination({ ...pagination, current_page: page });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPagination({ ...pagination, current_page: 1 });
  };

  const hasActiveFilters = statusFilter !== "all" || searchQuery.trim() !== "";


  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="h-5 w-5 text-yellow-500" />;
      case "uploaded":
        return <FaFileAlt className="h-5 w-5 text-blue-500" />;
      case "approved":
        return <FaCheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <FaTimesCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Beklemede";
      case "uploaded":
        return "Onay Bekleniyor";
      case "approved":
        return "Onaylandı";
      case "rejected":
        return "Reddedildi";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "uploaded":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <span className="font-semibold">
            {pagination.from}-{pagination.to}
          </span>{" "}
          / <span className="font-semibold">{pagination.total}</span> kayıt
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Önceki sayfa"
          >
            <FaChevronLeft className="h-4 w-4" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
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
              className={`px-4 py-2 rounded-lg border transition-all ${page === pagination.current_page
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
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
              >
                {pagination.last_page}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
            className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/profil/detay")}
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-all hover:gap-3 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Profil Detayına Dön</span>
          </motion.button>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
          >
            Belge Talepleri
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-lg mt-3 max-w-3xl leading-relaxed"
          >
            Talep edilen belgelerinizi yükleyin ve durumlarını takip edin.
          </motion.p>
        </div>
      </section>

      <section className="py-12 -mt-8">
        <div className="container mx-auto px-6 max-w-6xl">
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
                    placeholder="Başlık, açıklama veya bağlı kayıt ara..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPagination({ ...pagination, current_page: 1 });
                    }}
                    className="w-full pl-14 pr-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all shadow-sm hover:shadow-md text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Durum Filtresi */}
              <div className="lg:w-72 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPagination({ ...pagination, current_page: 1 });
                    }}
                    className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all appearance-none cursor-pointer shadow-sm hover:shadow-md text-gray-900 font-medium"
                  >
                    <option value="all">🔍 Tüm Durumlar</option>
                    <option value="pending">⏳ Beklemede</option>
                    <option value="uploaded">📤 Onay Bekleniyor</option>
                    <option value="approved">✅ Onaylandı</option>
                    <option value="rejected">❌ Reddedildi</option>
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
                      <span className="text-primary">{filteredRequests.length}</span> sonuç bulundu
                    </span>
                  </div>

                  {statusFilter !== "all" && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 rounded-xl text-sm font-semibold border border-yellow-200 shadow-sm flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      {getStatusText(statusFilter)}
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

          {requests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white rounded-2xl shadow-xl border border-gray-200"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {hasActiveFilters ? (
                  <FaSearch className="h-12 w-12 text-gray-400" />
                ) : (
                  <FaFileAlt className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {hasActiveFilters ? "Sonuç Bulunamadı" : "Henüz Belge Talebi Yok"}
              </h3>
              <p className="text-gray-600 mb-4">
                {hasActiveFilters
                  ? "Arama kriterlerinize uygun belge talebi bulunamadı. Filtreleri değiştirmeyi deneyin."
                  : "Yeni belge talepleri burada görünecektir."}
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
                {requests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => navigate(`/belgelerim/${request.id}`)}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer bg-white hover:border-primary/30 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {getStatusIcon(request.status)}
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {request.title}
                          </h3>
                          {request.is_required && (
                            <span className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full font-semibold">
                              Zorunlu
                            </span>
                          )}
                        </div>

                        {request.description && (
                          <p className="text-gray-600 mb-4 leading-relaxed">{request.description}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span>
                            <strong>Bağlı Kayıt:</strong> {request.requestable_title}
                          </span>
                          <span>
                            <strong>Talep Tarihi:</strong> {formatDate(request.requested_at)}
                          </span>
                          {request.uploaded_at && (
                            <span>
                              <strong>Yüklenme:</strong> {formatDate(request.uploaded_at)}
                            </span>
                          )}
                        </div>

                        {request.files_count > 0 && (
                          <div className="mt-3 text-sm text-primary font-semibold">
                            {request.files_count} dosya yüklendi
                          </div>
                        )}
                      </div>

                      <div className="ml-4">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {getStatusText(request.status)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {renderPagination()}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
