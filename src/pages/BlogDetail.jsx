import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaClock, FaCalendar, FaUser, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import { blogApi } from "../lib/api";
import SEO from "../components/SEO";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      loadBlog();
    }
  }, [slug]);

  const loadBlog = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await blogApi.get(slug);
      if (import.meta.env.DEV) {
        console.log('Blog API Response:', response);
        console.log('Slug:', slug);
      }
      const data = response?.data || response;
      if (!data || (!data.title && !data.slug)) {
        throw new Error("Blog yazısı bulunamadı. Geçersiz veri formatı.");
      }
      setBlog(data);
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error('Blog load error:', e);
      }
      setError(e?.message || "Blog yazısı yüklenemedi.");
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
          <p className="text-gray-600">Blog yazısı yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog yazısı bulunamadı</h1>
          <p className="text-gray-600 mb-6">{error || "Aradığınız blog yazısı bulunamadı."}</p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/blog" 
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Blog sayfasına dön
            </Link>
            <button
              onClick={loadBlog}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

  const excerpt = blog.excerpt || blog.summary || (blog.content ? String(blog.content).slice(0, 160) : "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <SEO
        title={blog.title}
        description={excerpt}
        image={blog.featured_image || blog.image || blog.featured_image_url}
        canonicalPath={`/blog/${blog.slug || slug}`}
        useRouteMeta={false}
        article={{
          title: blog.title,
          excerpt: excerpt,
          summary: blog.summary || excerpt,
          description: excerpt,
          image: blog.featured_image || blog.image || blog.featured_image_url,
          published_at: blog.published_at || blog.created_at,
          updated_at: blog.updated_at || blog.published_at || blog.created_at,
          author: blog.author?.name || blog.author_name || "Work365",
          category: blog.category || blog.category_name,
          tags: blog.tags || blog.tag_list || [],
        }}
        breadcrumbTitle={blog.title}
        showBreadcrumb={true}
      />
      {/* Hero Section with Featured Image */}
      {(blog.featured_image || blog.image || blog.featured_image_url) ? (
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-work-navy-500/90 z-10"></div>
          <img
            src={blog.featured_image || blog.image || blog.featured_image_url}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20"></div>
          
          {/* Breadcrumb */}
          <div className="absolute top-6 left-0 right-0 z-30">
            <div className="container mx-auto px-6">
              <nav className="flex items-center space-x-2 text-sm text-white/90">
                <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-white font-medium truncate max-w-md">{blog.title}</span>
              </nav>
            </div>
          </div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-20 left-6 z-30"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span className="font-medium">Geri Dön</span>
            </Link>
          </motion.div>

          {/* Header Content */}
          <div className="absolute bottom-0 left-0 right-0 z-30 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-4">
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full border border-white/30">
                    {blog.category || blog.category_name || "Genel"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                  {blog.title}
                </h1>
                {(blog.summary || blog.excerpt) && (
                  <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed drop-shadow-md max-w-3xl">
                    {blog.summary || blog.excerpt}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  {blog.author && (
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                      <FaUser className="w-4 h-4" />
                      <span className="font-medium">{blog.author?.name || blog.author?.full_name || blog.author || "Yazar"}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                    <FaCalendar className="w-4 h-4" />
                    <span className="font-medium">{formatDate(blog.published_at || blog.created_at)}</span>
                  </div>
                  {(blog.read_time || blog.readTime) && (
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                      <FaClock className="w-4 h-4" />
                      <span className="font-medium">{blog.read_time || blog.readTime}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-work-navy-500 text-white py-24 pt-32">
          <div className="container mx-auto px-6">
            <nav className="flex items-center space-x-2 text-sm text-white/90 mb-8">
              <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white font-medium">{blog.title}</span>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full">
                  {blog.category || blog.category_name || "Genel"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>
              {(blog.summary || blog.excerpt) && (
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                  {blog.summary || blog.excerpt}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-6">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <FaUser className="w-4 h-4" />
                    <span>{blog.author?.name || blog.author?.full_name || blog.author || "Yazar"}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-4 h-4" />
                  <span>{formatDate(blog.published_at || blog.created_at)}</span>
                </div>
                {(blog.read_time || blog.readTime) && (
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4" />
                    <span>{blog.read_time || blog.readTime}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <article className="container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8"
          >
            <div 
              className="blog-content prose prose-lg prose-slate max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-8 prose-headings:mb-4
                prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:font-extrabold prose-h1:text-gray-900 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-3
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:font-bold prose-h3:text-gray-900 prose-h3:mt-6 prose-h3:mb-3
                prose-h4:text-lg prose-h4:md:text-xl prose-h4:font-semibold prose-h4:text-gray-900
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base prose-p:md:text-lg
                prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-ul:text-gray-700 prose-ul:my-4 prose-ul:pl-6
                prose-ol:text-gray-700 prose-ol:my-4 prose-ol:pl-6
                prose-li:text-gray-700 prose-li:my-2 prose-li:leading-relaxed
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-6
                prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-gray-800 prose-code:font-mono
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6 prose-img:w-full prose-img:h-auto
                prose-hr:border-gray-200 prose-hr:my-8
                prose-table:w-full prose-table:my-6
                prose-th:bg-gray-100 prose-th:font-semibold prose-th:text-gray-900 prose-th:p-3
                prose-td:p-3 prose-td:border-t prose-td:border-gray-200"
              dangerouslySetInnerHTML={{ __html: blog.content || blog.body || "" }}
            />
          </motion.div>

          {/* Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-primary/5 to-blue-600/5 rounded-2xl p-6 mb-8 border border-primary/10"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-blue-600 rounded-full"></span>
                Etiketler
              </h3>
              <div className="flex flex-wrap gap-3">
                {(Array.isArray(blog.tags) ? blog.tags : []).map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-full hover:bg-primary hover:text-white transition-all shadow-sm border border-gray-200 hover:border-primary cursor-pointer"
                  >
                    {typeof tag === 'string' ? tag : tag.name || tag.title || tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 mb-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FaShare className="w-5 h-5 text-primary" />
              </div>
              Bu yazıyı paylaş
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <FaFacebook className="w-5 h-5" />
                <span className="font-semibold">Facebook</span>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-sky-400 text-white rounded-xl hover:bg-sky-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <FaTwitter className="w-5 h-5" />
                <span className="font-semibold">Twitter</span>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-blue-800 text-white rounded-xl hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <FaLinkedin className="w-5 h-5" />
                <span className="font-semibold">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl hover:from-primary-dark hover:to-blue-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <FaArrowLeft className="w-5 h-5" />
              <span>Diğer Blog Yazılarını İncele</span>
            </Link>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
