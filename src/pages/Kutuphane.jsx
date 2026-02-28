import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import {
  FaBook,
  FaDownload,
  FaChartLine,
  FaArrowRight,
  FaSearch,
  FaExternalLinkAlt,
  FaTimes,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
} from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { libraryApi, API_BASE_URL } from "../lib/api";

const statIconMap = {
  resources: FaBook,
  downloads: FaDownload,
  categories: FaChartLine,
};

const resourceVisuals = {
  guides: {
    color: "from-sky-500 to-sky-600",
    bgColor: "from-sky-50 to-white",
  },
  calculators: {
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-50 to-white",
  },
  forms: {
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-white",
  },
  templates: {
    color: "from-orange-500 to-amber-600",
    bgColor: "from-orange-50 to-white",
  },
  default: {
    color: "from-primary to-blue-600",
    bgColor: "from-blue-50 to-white",
  },
};

const getIconComponent = (name) => {
  if (!name) return FaBook;
  return FaIcons[name] || FaBook;
};

const resolveApiLink = (link) => {
  if (!link) return "";
  if (link.startsWith("http")) return link;
  return `${API_BASE_URL.replace(/\/$/, "")}${link}`;
};

export default function Kutuphane() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 6,
    total: 0,
  });
  const [viewModal, setViewModal] = useState({
    open: false,
    resource: null,
    content: null,
    loading: false,
    error: null,
  });
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await libraryApi.list({
          category: selectedCategory || undefined,
          search: debouncedSearch || undefined,
          page: currentPage,
          per_page: paginationMeta.per_page,
        });
        const payload = response?.data || response;
        setStats(payload?.stats || []);
        setCategories(payload?.categories || []);
        setResources(payload?.resources || []);
        const meta = response?.meta || {};
        setPaginationMeta({
          current_page: meta.current_page || currentPage,
          last_page: meta.last_page || 1,
          per_page: meta.per_page || paginationMeta.per_page,
          total: meta.total || payload?.resources?.length || 0,
        });
      } catch (err) {
        setError(err?.message || "Kütüphane verileri yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory, debouncedSearch, currentPage]);

  const categoryMap = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    }, {});
  }, [categories]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? "" : categoryId));
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > paginationMeta.last_page || page === currentPage) return;
    setCurrentPage(page);
  };

  const openViewModal = async (resource) => {
    setViewModal({
      open: true,
      resource,
      content: null,
      loading: true,
      error: null,
    });
    try {
      const response = await libraryApi.view(resource.id);
      const data = response?.data || response;
      setViewModal((prev) => ({
        ...prev,
        content: data?.content || "",
        loading: false,
      }));
    } catch (err) {
      setViewModal((prev) => ({
        ...prev,
        loading: false,
        error: err?.message || "Kaynak görüntülenemedi.",
      }));
    }
  };

  const closeViewModal = () => {
    setViewModal({
      open: false,
      resource: null,
      content: null,
      loading: false,
      error: null,
    });
  };

  const handleDownload = async (resource) => {
    try {
      const { blob, filename } = await libraryApi.download(resource.id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || `${resource.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setActionMessage("Dosya indirilmeye başladı.");
    } catch (err) {
      setActionMessage(err?.message || "Dosya indirilemedi.");
    } finally {
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleResourceAction = (resource) => {
    if (!resource?.ctaLink) return;
    if (resource.ctaLink.includes("/view")) {
      openViewModal(resource);
      return;
    }
    if (resource.ctaLink.includes("/download")) {
      handleDownload(resource);
      return;
    }
    if (resource.ctaLink.startsWith("/api/")) {
      window.open(resolveApiLink(resource.ctaLink), "_blank");
      return;
    }
    if (resource.ctaLink.startsWith("/")) {
      navigate(resource.ctaLink);
      return;
    }
    window.open(resource.ctaLink, "_blank");
  };

  const statsToRender = stats.length
    ? stats
    : [
        { id: "resources", label: "Toplam Kaynak", value: "—" },
        { id: "downloads", label: "İndirme Sayısı", value: "—" },
        { id: "categories", label: "Kategori", value: "—" },
      ];

  const categoriesWithAll = useMemo(() => {
    return [
      { id: "", label: "Tümü", icon: "FaBook", count: paginationMeta.total },
      ...categories,
    ];
  }, [categories, paginationMeta.total]);

  const paginationNumbers = useMemo(() => {
    const totalPages = paginationMeta.last_page || 1;
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const result = [1];
    if (currentPage > 3) {
      result.push("left-ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let page = start; page <= end; page += 1) {
      result.push(page);
    }

    if (currentPage < totalPages - 2) {
      result.push("right-ellipsis");
    }

    result.push(totalPages);
    return result;
  }, [currentPage, paginationMeta.last_page]);

  const renderResources = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-64 rounded-2xl border border-gray-100 bg-gray-50 animate-pulse"
            />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-16">
          <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setCurrentPage(1);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Yeniden Dene
          </button>
        </div>
      );
    }

    if (!resources.length) {
      return (
        <div className="text-center py-16">
          <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600">
            Aradığınız kriterlere uygun kaynak bulunamadı.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => {
            const visuals =
              resourceVisuals[resource.category] || resourceVisuals.default;
            const CategoryIcon = getIconComponent(
              categoryMap[resource.category]?.icon
            );
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-white/90 backdrop-blur-md rounded-[24px] border border-white/70 shadow-[0_20px_40px_rgba(15,23,42,0.12)] hover:shadow-[0_25px_70px_rgba(15,23,42,0.2)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${visuals.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="absolute -top-16 -right-8 w-28 h-28 bg-white/60 blur-3xl rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                </div>

                <div className="relative z-10 p-6 flex flex-col h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${visuals.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <CategoryIcon className="text-2xl text-white" />
                  </div>

                  {resource.badge && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full border border-primary/20 bg-white/90 text-primary shadow-[0_8px_20px_rgba(79,70,229,0.25)]">
                        <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-gradient-to-br from-primary to-blue-500 text-white text-[10px] font-bold">
                          ★
                        </span>
                        {resource.badge}
                      </span>
                    </div>
                  )}

                  <span className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-white/70 bg-white/80 text-xs font-semibold text-gray-700 shadow-sm">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    {resource.categoryLabel || categoryMap[resource.category]?.label || "Kaynak"}
                  </span>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-1">
                    {resource.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 border border-gray-100 text-gray-600">
                      <FaBook className="text-primary" />
                      <span>{resource.readingTime || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 border border-gray-100 text-gray-600">
                      <FaEye className="text-primary" />
                      <span>{(resource.viewCount || 0).toLocaleString("tr-TR")}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 border border-gray-100 text-gray-600">
                      <FaDownload className="text-primary" />
                      <span>{(resource.downloadCount || 0).toLocaleString("tr-TR")} indirme</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleResourceAction(resource)}
                    className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl font-semibold bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                  >
                    {resource.ctaLabel || "İncele"}
                    {resource.ctaLink?.startsWith("http") ? (
                      <FaExternalLinkAlt className="text-xs" />
                    ) : (
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {paginationMeta.last_page > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-full border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-100 cursor-not-allowed"
                  : "text-gray-700 border-gray-200 hover:border-primary/40 hover:text-primary"
              }`}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
              <span className="text-sm">Önceki</span>
            </button>

            {paginationNumbers.map((item, idx) =>
              typeof item === "string" ? (
                <span key={`${item}-${idx}`} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => handlePageChange(item)}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                    item === currentPage
                      ? "bg-primary text-white shadow-lg shadow-primary/40"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-full border ${
                currentPage === paginationMeta.last_page
                  ? "text-gray-400 border-gray-100 cursor-not-allowed"
                  : "text-gray-700 border-gray-200 hover:border-primary/40 hover:text-primary"
              }`}
              disabled={currentPage === paginationMeta.last_page}
            >
              <span className="text-sm">Sonraki</span>
              <FaChevronRight />
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-work-navy-500 text-white py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bilgi Kütüphanesi
              <span className="block text-blue-200">İşinizi Büyütün</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Rehberler, şablonlar, hesaplayıcılar ve daha fazlası. İşletmeniz için ihtiyacınız olan tüm kaynaklar tek yerde.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsToRender.map((stat, index) => {
              const Icon = statIconMap[stat.id] || FaChartLine;
              return (
                <motion.div
                  key={`${stat.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                    <Icon className="text-2xl text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Kaynak ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categoriesWithAll.map((category) => {
              const Icon = getIconComponent(category.icon);
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Icon className={isActive ? "text-white" : "text-primary"} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {renderResources()}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-work-navy-500 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Aradığınızı Bulamadınız mı?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              İhtiyacınız olan kaynak için bizimle iletişime geçin. Ekibimiz size yardımcı olmaktan mutluluk duyar.
            </p>
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              İletişime Geç
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Resource Content Modal */}
      <AnimatePresence>
        {viewModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
            >
              <button
                onClick={closeViewModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4 pr-8">
                {viewModal.resource?.title}
              </h3>

              {viewModal.loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-100 rounded-lg" />
                  <div className="h-6 bg-gray-100 rounded-lg" />
                  <div className="h-6 bg-gray-100 rounded-lg" />
                </div>
              ) : viewModal.error ? (
                <p className="text-red-600">{viewModal.error}</p>
              ) : (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: viewModal.content || "" }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {actionMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 px-4 py-3 bg-gray-900 text-white rounded-xl shadow-lg text-sm"
          >
            {actionMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

