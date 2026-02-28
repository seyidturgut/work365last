import { Link } from "react-router-dom";
import { FaClock, FaArrowRight } from "react-icons/fa";

export default function BlogCard({ slug, image, title, excerpt, category, date, readTime }) {
  return (
    <Link 
      to={`/blog/${slug}`} 
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-200 hover:border-primary/50 hover:-translate-y-2"
    >
      <div className="h-48 bg-gradient-to-br from-primary to-blue-600 relative overflow-hidden">
        {image && (
          <>
            <img 
              src={image} 
              alt={title} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </>
        )}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-primary rounded-full uppercase tracking-wide">
              {category}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-xl text-text mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {title}
        </h3>
        
        {excerpt && (
          <p className="text-text-light mb-4 line-clamp-3 flex-1 leading-relaxed">
            {excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-text-light">
            {date && <span>{date}</span>}
            {readTime && (
              <div className="flex items-center gap-1">
                <FaClock className="text-xs" />
                <span>{readTime}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
            Oku
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
