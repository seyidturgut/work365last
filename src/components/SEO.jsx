import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  seoDefaults,
  getCanonicalUrl,
  getMetaForPath,
} from "../config/seo";
import StructuredData from "./StructuredData";

function setMetaTag(name, content, attribute = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkRel(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"][href]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  image,
  canonicalPath,
  noindex = false,
  useRouteMeta = true,
  keywords,
  author,
  article = null,
  structuredData = null,
  breadcrumbTitle = null,
  showOrganization = null,
  showWebsite = null,
  showBreadcrumb = true,
}) {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const baseUrl = seoDefaults.baseUrl || window.location.origin;
    const routeMeta = useRouteMeta ? getMetaForPath(path) : {};
    const finalTitle = title ?? routeMeta.title ?? seoDefaults.title;
    const finalDescription =
      description ?? routeMeta.description ?? seoDefaults.description;
    const finalImage = image ?? routeMeta.image ?? seoDefaults.image;
    const finalKeywords = keywords ?? seoDefaults.keywords;
    const finalAuthor = author ?? seoDefaults.author;
    const imageUrl = finalImage.startsWith("http")
      ? finalImage
      : `${baseUrl.replace(/\/$/, "")}${finalImage.startsWith("/") ? finalImage : `/${finalImage}`}`;
    const canonical = getCanonicalUrl(canonicalPath ?? path);
    const finalNoindex = noindex || routeMeta.noindex;

    document.title = finalTitle;

    setMetaTag("description", finalDescription);
    setMetaTag("keywords", finalKeywords);
    setMetaTag("author", finalAuthor);
    setMetaTag("theme-color", seoDefaults.themeColor);
    setMetaTag("robots", finalNoindex ? "noindex, nofollow" : "index, follow");

    setLinkRel("canonical", canonical);

    setMetaTag("og:title", finalTitle, "property");
    setMetaTag("og:description", finalDescription, "property");
    setMetaTag("og:image", imageUrl, "property");
    setMetaTag("og:url", canonical, "property");
    setMetaTag("og:type", article ? "article" : "website", "property");
    setMetaTag("og:site_name", seoDefaults.siteName, "property");
    setMetaTag("og:locale", seoDefaults.locale, "property");

    if (article) {
      setMetaTag("article:published_time", article.published_at || article.created_at, "property");
      setMetaTag("article:modified_time", article.updated_at || article.published_at || article.created_at, "property");
      if (article.author) {
        setMetaTag("article:author", article.author, "property");
      }
      if (article.category) {
        setMetaTag("article:section", article.category, "property");
      }
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach((tag) => {
          setMetaTag("article:tag", tag, "property");
        });
      }
    }

    setMetaTag("twitter:card", seoDefaults.twitterCard);
    setMetaTag("twitter:title", finalTitle);
    setMetaTag("twitter:description", finalDescription);
    setMetaTag("twitter:image", imageUrl);
  }, [
    path,
    title,
    description,
    image,
    canonicalPath,
    noindex,
    useRouteMeta,
    keywords,
    author,
    article,
  ]);

  const shouldShowOrg = showOrganization !== null ? showOrganization : path === "/" || path === "/hakkimizda";
  const shouldShowWebsite = showWebsite !== null ? showWebsite : path === "/";

  return (
    <>
      <StructuredData
        type={article ? "article" : "auto"}
        schema={structuredData}
        article={article}
        breadcrumbTitle={breadcrumbTitle ?? title}
        showOrganization={shouldShowOrg}
        showWebsite={shouldShowWebsite}
        showBreadcrumb={showBreadcrumb && path !== "/"}
      />
    </>
  );
}
