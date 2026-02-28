import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  organizationInfo,
  getBreadcrumbSchema,
  getWebsiteSchema,
  seoDefaults,
} from "../config/seo";

function injectStructuredData(id, schema) {
  let script = document.getElementById(id);
  if (script) {
    script.textContent = JSON.stringify(schema);
  } else {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}

function removeStructuredData(id) {
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}

export default function StructuredData({
  type = "auto",
  schema = null,
  article = null,
  breadcrumbTitle = null,
  showOrganization = true,
  showWebsite = false,
  showBreadcrumb = true,
}) {
  const location = useLocation();

  useEffect(() => {
    const schemas = [];

    if (showOrganization && (location.pathname === "/" || location.pathname === "/hakkimizda")) {
      schemas.push({ id: "organization-schema", data: organizationInfo });
    }

    if (showWebsite && location.pathname === "/") {
      schemas.push({ id: "website-schema", data: getWebsiteSchema() });
    }

    if (showBreadcrumb && location.pathname !== "/") {
      schemas.push({
        id: "breadcrumb-schema",
        data: getBreadcrumbSchema(location.pathname, breadcrumbTitle),
      });
    }

    if (type === "article" && article) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt || article.summary || article.description,
        image: article.image || article.featured_image || seoDefaults.image,
        datePublished: article.published_at || article.created_at,
        dateModified: article.updated_at || article.published_at || article.created_at,
        author: {
          "@type": "Organization",
          name: seoDefaults.siteName,
        },
        publisher: {
          "@type": "Organization",
          name: seoDefaults.siteName,
          logo: {
            "@type": "ImageObject",
            url: organizationInfo.logo,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${seoDefaults.baseUrl}${location.pathname}`,
        },
      };
      schemas.push({ id: "article-schema", data: articleSchema });
    }

    if (schema) {
      schemas.push({ id: "custom-schema", data: schema });
    }

    schemas.forEach(({ id, data }) => {
      injectStructuredData(id, data);
    });

    return () => {
      schemas.forEach(({ id }) => {
        removeStructuredData(id);
      });
    };
  }, [
    location.pathname,
    type,
    schema,
    article,
    breadcrumbTitle,
    showOrganization,
    showWebsite,
    showBreadcrumb,
  ]);

  return null;
}
