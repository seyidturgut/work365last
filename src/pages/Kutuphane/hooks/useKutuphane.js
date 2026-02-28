import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { libraryApi } from "../../../lib/api";
import { resolveApiLink } from "../utils";

const DEFAULT_PAGINATION = {
  current_page: 1,
  last_page: 1,
  per_page: 6,
  total: 0,
};

export default function useKutuphane() {
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
  const [paginationMeta, setPaginationMeta] = useState(DEFAULT_PAGINATION);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const closeViewModal = () => {
    setViewModal({
      open: false,
      resource: null,
      content: null,
      loading: false,
      error: null,
    });
  };

  const statsToRender = stats.length
    ? stats
    : [
        { id: "resources", label: "Toplam Kaynak", value: "—" },
        { id: "downloads", label: "İndirme Sayısı", value: "—" },
        { id: "categories", label: "Kategori", value: "—" },
      ];

  const categoriesWithAll = useMemo(
    () => [
      { id: "", label: "Tümü", icon: "FaBook", count: paginationMeta.total },
      ...categories,
    ],
    [categories, paginationMeta.total]
  );

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

  return {
    statsToRender,
    categoriesWithAll,
    categoryMap,
    resources,
    paginationMeta,
    paginationNumbers,
    viewModal,
    actionMessage,
    loading,
    error,
    searchTerm,
    selectedCategory,
    currentPage,
    setSearchTerm,
    handleCategorySelect,
    handlePageChange,
    handleResourceAction,
    closeViewModal,
  };
}
