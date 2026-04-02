"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, Calendar, User } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CATEGORIES, BLOG_POSTS } from "@/lib/blog-data";
import Breadcrumb from "@/components/Breadcrumb";

/* ─── COMPONENTS ─── */

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.categoryId === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-white pt-[92px]">
      <Header />
      <Breadcrumb items={[{ label: "Blog & Rehberler", href: "/blog" }]} />

      {/* ─── HEADER SECTION ─── */}
      <section className="bg-white px-6 pb-12 pt-16 border-b border-black/5">
        <div className="mx-auto max-w-[1230px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-[720px]">
              <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[56px]">
                Work365 Blog & Rehberler
              </h1>
              <p className="mt-5 text-[18px] leading-[1.8] text-[#475569]">
                Şirket kuruluşu, devlet destekleri, e-Dönüşüm dünyası ve girişimcilik ekosistemine dair aradığınız her şey burada.
              </p>
            </div>

            <div className="w-full md:w-[320px] shrink-0">
              <div className="relative relative w-full flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Yazılarda ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-3.5 pl-11 pr-4 text-[14px] text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#1B98D5] focus:bg-white focus:ring-4 focus:ring-[#1B98D5]/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FILTER SECTION ─── */}
      <section className="sticky top-[92px] z-40 border-b border-black/5 bg-white/80 py-4 backdrop-blur-md px-6">
        <div className="mx-auto max-w-[1230px]">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:pb-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-300 ${
                    isActive ? "shadow-md" : "hover:bg-gray-100"
                  }`}
                  style={{
                    backgroundColor: isActive ? cat.bgColor : "transparent",
                    color: isActive ? cat.color : "#475569",
                    border: isActive ? `1px solid ${cat.color}33` : "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BLOG GRID ─── */}
      <section className="px-6 py-14 bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1230px]">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, i) => {
                const category = CATEGORIES.find((c) => c.id === post.categoryId);

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: "easeOut" }}
                  >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-[24px] bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Cover Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[24px]">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Category Badge over image */}
                      {category && (
                        <div
                          className="absolute left-5 top-5 inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] shadow-sm backdrop-blur-md"
                          style={{
                            backgroundColor: `${category.bgColor}e6`,
                            color: category.color,
                          }}
                        >
                          {category.name}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-[20px] font-bold leading-snug tracking-[-0.02em] text-[#0F172A] group-hover:text-[#1B98D5] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[#64748B] line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-6">
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                              <User className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-[#0F172A]">{post.author}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end text-[11px] font-medium text-[#64748B]">
                            <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {post.date}</span>
                            <span className="mt-0.5">{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-6 text-[22px] font-bold text-[#0F172A]">Sonuç bulunamadı</h3>
              <p className="mt-2 text-[#64748B] max-w-[400px]">
                Aramanızla eşleşen bir yazı bulamadık. Lütfen farklı anahtar kelimeler deneyin veya filtreyi sıfırlayın.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-6 rounded-full bg-[#1B98D5] px-6 py-3 text-[14px] font-bold text-white transition-all hover:bg-[#1580A5]"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-16 pt-4">
        <div className="relative mx-auto max-w-[1230px] overflow-hidden rounded-[40px] px-8 py-12 text-white md:px-12 md:py-14" style={{
          background: "linear-gradient(135deg, #0F172A 0%, #15803Dcc 100%)",
        }}>
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[680px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-emerald-300">BÜLTENE KATILIN</p>
              <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] text-white md:text-[44px]">
                Girişimcilik dünyasından haberler ilk size gelsin.
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-white/70">
                Yeni mevzuatlar, hibe programları ve şirket yönetimi ipuçlarını haftalık e-posta bültenimizle takip edin. Spam yok, sadece değer üreten içerikler.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <form className="flex w-full flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz" 
                  className="w-full sm:w-[280px] rounded-full border border-white/20 bg-white/10 px-5 py-4 text-[14px] text-white outline-none placeholder:text-white/60 focus:bg-white/20 focus:ring-2 focus:ring-white/30"
                  required
                />
                <button
                  type="button"
                  className="group/cta inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#0F172A] shadow-lg transition-all duration-300 hover:scale-[1.03]"
                >
                  Abone Ol <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Add global styles for scrollbar-hide */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />

      <Footer />
    </main>
  );
}
