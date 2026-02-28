import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { blogApi, newsletterApi } from "../lib/api";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const perPage = 12;
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterErr, setNewsletterErr] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBlogs();
    }, searchTerm ? 500 : 0);
    
    return () => clearTimeout(timer);
  }, [currentPage, searchTerm]);

  const loadBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await blogApi.list(currentPage, perPage, searchTerm);
      const data = response?.data || response;
      const meta = response?.meta || null;
      const links = response?.links || null;
      
      if (Array.isArray(data)) {
        setBlogs(data);
      } else if (data && Array.isArray(data.data)) {
        setBlogs(data.data);
      } else {
        setBlogs([]);
      }
      
      if (meta) {
        setPagination({ ...meta, links });
      }
    } catch (e) {
      setError(e?.message || "Blog yazıları yüklenemedi.");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const cats = new Set(blogs.map(blog => blog.category || blog.category_name).filter(Boolean));
    return ["Tümü", ...Array.from(cats).sort()];
  }, [blogs]);

  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const blogCategory = blog.category || blog.category_name || "";
      const matchesCategory = selectedCategory === "Tümü" || blogCategory === selectedCategory;
      return matchesCategory;
    });
  }, [blogs, selectedCategory]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatBlogData = (blog) => {
    return {
      slug: blog.slug,
      image: blog.featured_image || blog.image || blog.featured_image_url || null,
      title: blog.title,
      excerpt: blog.summary || blog.excerpt || blog.content?.substring(0, 150) || "",
      category: blog.category || blog.category_name || null,
      date: formatDate(blog.published_at || blog.created_at),
      readTime: blog.read_time || blog.readTime || null,
    };
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-work-navy-500 text-white py-24 pt-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog & İçgörüler
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              İş dünyasındaki son gelişmeler, uzman görüşleri ve praktik rehberler ile bilginizi güncel tutun.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Blog yazılarında ara..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-text-light hover:bg-primary hover:text-white border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 text-text-light">
            {loading ? (
              <span>Yükleniyor...</span>
            ) : (
              <>
                <span className="font-medium">{pagination?.total || filteredBlogs.length}</span> yazı bulundu
                {pagination && (
                  <span className="ml-2 text-sm">
                    (Sayfa {pagination.current_page} / {pagination.last_page})
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-16">
              <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
              <p className="text-text-light">Blog yazıları yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-text mb-2">Hata</h3>
              <p className="text-text-light">{error}</p>
              <button
                onClick={loadBlogs}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Tekrar Dene
              </button>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-text mb-2">Sonuç bulunamadı</h3>
              <p className="text-text-light">Arama kriterlerinizi değiştirip tekrar deneyin.</p>
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id || blog.slug || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <BlogCard {...formatBlogData(blog)} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Önceki
                  </button>
                  
                  {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
                    .filter(page => {
                      if (pagination.last_page <= 7) return true;
                      return page === 1 || 
                             page === pagination.last_page || 
                             (page >= currentPage - 1 && page <= currentPage + 1);
                    })
                    .map((page, idx, arr) => (
                      <div key={page} className="flex items-center gap-2">
                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                          <span className="px-2 text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            currentPage === page
                              ? "bg-primary text-white border-primary"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    ))}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(pagination.last_page, p + 1))}
                    disabled={currentPage === pagination.last_page}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Sonraki
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Haftalık İçgörüler Bültenimize Abone Olun
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              İş dünyasındaki son gelişmeler, uzman analizleri ve pratik ipuçları doğrudan inbox'unuza gelsin.
            </p>
            {newsletterDone ? (
              <p className="text-white font-medium">Bültene kaydınız alındı. Teşekkür ederiz!</p>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setNewsletterErr("");
                  if (!newsletterEmail.trim()) return;
                  setNewsletterLoading(true);
                  try {
                    await newsletterApi.subscribe({
                      email: newsletterEmail.trim(),
                      consent_email: true,
                      profiling_consent: true,
                      kvkk_consent: true,
                      international_transfer_consent: true,
                      source: "blog",
                    });
                    setNewsletterDone(true);
                    setNewsletterEmail("");
                  } catch (err) {
                    setNewsletterErr(err?.message || "Abonelik başarısız.");
                  } finally {
                    setNewsletterLoading(false);
                  }
                }}
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  disabled={newsletterLoading}
                  className="flex-1 px-6 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-70"
                />
                <button
                  type="submit"
                  disabled={newsletterLoading}
                  className="px-8 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-70"
                >
                  {newsletterLoading ? "Gönderiliyor..." : "Abone Ol"}
                </button>
              </form>
            )}
            {newsletterErr && (
              <p className="mt-3 text-red-200 text-sm">{newsletterErr}</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}