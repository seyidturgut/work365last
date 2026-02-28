import { motion } from "framer-motion";
import {
  FaBook,
  FaDownload,
  FaArrowRight,
  FaExternalLinkAlt,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { resourceVisuals } from "../constants";
import { getIconComponent } from "../utils";

export default function ResourcesGridSection({
  loading,
  error,
  resources,
  categoryMap,
  paginationMeta,
  paginationNumbers,
  currentPage,
  handlePageChange,
  handleResourceAction,
  onReset,
}) {
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
          onClick={onReset}
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
        <p className="text-xl text-gray-600">Aradığınız kriterlere uygun kaynak bulunamadı.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource, index) => {
          const visuals =
            resourceVisuals[resource.category] || resourceVisuals.default;
          const CategoryIcon = getIconComponent(categoryMap[resource.category]?.icon);
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
}
