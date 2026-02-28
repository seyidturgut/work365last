import useKutuphane from "./hooks/useKutuphane";
import LibraryHeroSection from "./sections/LibraryHeroSection";
import StatsSection from "./sections/StatsSection";
import SearchFilterSection from "./sections/SearchFilterSection";
import ResourcesGridSection from "./sections/ResourcesGridSection";
import LibraryCtaSection from "./sections/LibraryCtaSection";
import ResourceModal from "./sections/ResourceModal";
import Toast from "./sections/Toast";

export default function Kutuphane() {
  const {
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
  } = useKutuphane();

  const handleReset = () => {
    setSearchTerm("");
    handleCategorySelect("");
    handlePageChange(1);
  };

  return (
    <div className="pt-20">
      <LibraryHeroSection />
      <StatsSection statsToRender={statsToRender} />
      <SearchFilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoriesWithAll={categoriesWithAll}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
      />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <ResourcesGridSection
            loading={loading}
            error={error}
            resources={resources}
            categoryMap={categoryMap}
            paginationMeta={paginationMeta}
            paginationNumbers={paginationNumbers}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            handleResourceAction={handleResourceAction}
            onReset={handleReset}
          />
        </div>
      </section>
      <LibraryCtaSection />
      <ResourceModal viewModal={viewModal} closeViewModal={closeViewModal} />
      <Toast message={actionMessage} />
    </div>
  );
}
