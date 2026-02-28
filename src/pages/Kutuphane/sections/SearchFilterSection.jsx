import { FaSearch } from "react-icons/fa";
import { getIconComponent } from "../utils";

export default function SearchFilterSection({
  searchTerm,
  setSearchTerm,
  categoriesWithAll,
  selectedCategory,
  handleCategorySelect,
}) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
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
  );
}
