import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { libraryApi, API_BASE_URL } from "../../../lib/api";

const resolveApiLink = (link) => {
    if (!link) return "";
    if (link.startsWith("http")) return link;
    return `${API_BASE_URL.replace(/\/$/, "")}${link}`;
};

export default function LatestGuidesSection() {
    const navigate = useNavigate();
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                // Fetch from API for category 1 (Rehberler)
                let response = await libraryApi.list({
                    category: 1,
                    per_page: 5,
                });
                let payload = response?.data || response;

                // Fallback if category 1 is completely empty (maybe ID changed)
                if (!payload?.resources || payload.resources.length === 0) {
                    response = await libraryApi.list({
                        per_page: 5,
                    });
                    payload = response?.data || response;
                }

                if (payload?.resources && payload.resources.length > 0) {
                    setGuides(payload.resources);
                }
            } catch (err) {
                console.error("Failed to fetch guides:", err);
            }
        };
        fetchGuides();
    }, []);

    const formatDate = (dateString, fallbackText) => {
        if (!dateString) return fallbackText || "Rehber";
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const handleResourceClick = (e, resource) => {
        if (!resource?.ctaLink) {
            e.preventDefault();
            return;
        }

        if (resource.ctaLink.startsWith("/api/")) {
            e.preventDefault();
            window.open(resolveApiLink(resource.ctaLink), "_blank");
            return;
        }
        if (resource.ctaLink.startsWith("/")) {
            // Let the simple href handle it if it's a relative link, or explicitly navigate
            e.preventDefault();
            navigate(resource.ctaLink);
            return;
        }
        // Let normal a href handle external links
    };

    // If no guides are loaded yet, show placeholders with visible text styling
    const displayGuides = guides.length > 0 ? guides : Array(5).fill({
        title: "Yükleniyor...",
        dateText: "BEKLENİYOR",
        category: "Rehber",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
        ctaLink: "/kutuphane"
    });

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-[#2A3441] leading-tight tracking-tight">
                            Şirketin Henüz Kurulmadan<br className="hidden md:block" />
                            Sana Çözümler Üretmeye<br className="hidden md:block" />
                            Başlıyoruz!
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                    >
                        <div>
                            <h3 className="text-[#2A3441] font-bold text-lg mb-4">Çözüm Odaklı Yaklaşım</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Burada her şey; karmaşıklıktan uzak, net.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#2A3441] font-bold text-lg mb-4">Uzman Ekip</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Alanında uzman ekiplerimiz her zaman senin yanında!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Carousel Section using bleed technique */}
            <div className="w-full pl-6 xl:pl-[calc(50vw-616px)] pr-0">
                <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pr-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {displayGuides.map((guide, index) => (
                        <motion.div
                            key={guide.id || index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="snap-start shrink-0 w-[280px] md:w-[320px]"
                        >
                            <a
                                href={guide.ctaLink || "#"}
                                onClick={(e) => handleResourceClick(e, guide)}
                                className="block group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300"
                            >
                                {/* Image */}
                                <img
                                    src={guide.image || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"}
                                    alt={guide.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                />

                                {/* Dark Gradient Overlay for optimal text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent pointer-events-none"></div>

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end pointer-events-none">
                                    {/* Date / Reading Time */}
                                    <div className="flex items-center gap-2 mb-3 text-[#10b981] text-xs font-bold tracking-widest uppercase">
                                        <span>{formatDate(guide.created_at, guide.dateText)}</span>
                                    </div>

                                    <h3 className="text-white text-xl font-medium leading-snug mb-6 drop-shadow-md">
                                        {guide.title}
                                    </h3>

                                    {guide.ctaLabel && (
                                        <div className="self-start px-4 py-2 bg-[#10b981]/20 border border-[#10b981]/50 text-[#10b981] text-[10px] sm:text-xs font-bold tracking-widest rounded transition-colors duration-300 backdrop-blur-sm">
                                            {guide.ctaLabel}
                                        </div>
                                    )}
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
