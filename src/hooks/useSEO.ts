import { useEffect } from "react";

interface SEOConfig {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = "https://www.aarvakdiagnostics.com";
const DEFAULT_IMAGE = `${BASE_URL}/images/aarvak-logo.webp`;

const useSEO = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  jsonLd,
}: SEOConfig) => {
  useEffect(() => {
    const fullCanonical = canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`;

    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:url", fullCanonical, "property");
    setMeta("og:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`, "property");
    setMeta("og:locale", "en_IN", "property");
    setMeta("og:site_name", "Aarvak Diagnostics", "property");
    setMeta("twitter:card", "summary_large_image");

    // Social profile schema (sameAs for GMB/Facebook/Instagram)
    const socialSchemaId = "social-profiles-schema";
    let socialEl = document.getElementById(socialSchemaId);
    if (!socialEl) {
      socialEl = document.createElement("script");
      socialEl.id = socialSchemaId;
      socialEl.setAttribute("type", "application/ld+json");
      document.head.appendChild(socialEl);
    }
    socialEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Aarvak Diagnostics",
      "url": "https://www.aarvakdiagnostics.com",
      "logo": "https://www.aarvakdiagnostics.com/images/aarvak-logo.webp",
      "sameAs": [
        "https://www.facebook.com/AarvakDiagnostics",
        "https://www.instagram.com/aarvakdiagnostics/"
      ]
    });
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = fullCanonical;

    // JSON-LD
    const schemaId = "page-schema";
    let schemaEl = document.getElementById(schemaId);
    if (jsonLd) {
      if (!schemaEl) {
        schemaEl = document.createElement("script");
        schemaEl.id = schemaId;
        schemaEl.setAttribute("type", "application/ld+json");
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(jsonLd);
    }

    // Intentionally no cleanup: the next route's useSEO() will overwrite
    // title/meta/canonical. Resetting on unmount briefly flashes the
    // homepage title during route transitions.
  }, [title, description, canonical, ogType, ogImage, noindex, jsonLd]);
};

export default useSEO;
