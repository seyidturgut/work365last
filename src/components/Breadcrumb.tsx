import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: "Ana Sayfa", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="border-b border-black/5 bg-white px-6 py-3"
      >
        <div className="mx-auto flex max-w-[1230px] items-center gap-1.5 text-[13px] text-[#64748B]">
          <Link
            href="/"
            aria-label="Ana Sayfa"
            className="flex items-center rounded p-0.5 text-[#64748B] transition-colors hover:text-[#1B98D5]"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <span key={index} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-black/20" />
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#1B98D5] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="max-w-[260px] truncate font-medium text-[#0F172A]">
                    {item.label}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </nav>
    </>
  );
}
