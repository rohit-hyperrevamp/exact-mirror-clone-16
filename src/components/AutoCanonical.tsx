import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://www.aarvakdiagnostics.com";

/**
 * AutoCanonical
 * Guarantees every route has a self-referential canonical tag + og:url.
 * - Runs on every route change.
 * - Normalises the path (lowercase host, strip trailing slash except root,
 *   drop tracking query params, drop hash).
 * - If a page's useSEO() hook has already set the correct canonical for
 *   this path, this is a no-op. Otherwise it writes the fallback.
 *
 * This ensures future pages/links are auto-canonicalised even if a
 * developer forgets to call useSEO.
 */
const TRACKING_PARAMS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "mc_cid", "mc_eid", "ref", "ref_src",
];

const normalisePath = (pathname: string, search: string) => {
  let path = pathname || "/";
  // Collapse duplicate slashes
  path = path.replace(/\/{2,}/g, "/");
  // Strip trailing slash (except root)
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  // Filter tracking params but keep meaningful query strings
  if (search) {
    const params = new URLSearchParams(search);
    TRACKING_PARAMS.forEach((p) => params.delete(p));
    const remaining = params.toString();
    if (remaining) path += `?${remaining}`;
  }
  return path;
};

const setOrCreateLink = (rel: string, href: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
};

const setOrCreateMeta = (property: string, content: string) => {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
};

const AutoCanonical = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Skip admin/private routes — they shouldn't be indexed anyway
    if (pathname.startsWith("/admin") || pathname === "/hyperrevamp-reporting") {
      return;
    }

    const canonicalPath = normalisePath(pathname, search);
    const fullCanonical = `${BASE_URL}${canonicalPath}`;

    // Defer slightly so a page's own useSEO() (which also sets canonical)
    // can run first — we only fill the gap if it hasn't set one.
    const id = window.setTimeout(() => {
      const existing = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!existing || !existing.href) {
        setOrCreateLink("canonical", fullCanonical);
      }
      const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
      if (!ogUrl || !ogUrl.content) {
        setOrCreateMeta("og:url", fullCanonical);
      }
    }, 0);

    return () => window.clearTimeout(id);
  }, [pathname, search]);

  return null;
};

export default AutoCanonical;
