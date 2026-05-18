import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  schema?: object;
}

const BASE_URL = "https://www.stiemfield.com";

export default function SEOHead({ title, description, path, type = "website", schema }: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = `${title} | Stiemfield`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = url;

    if (schema) {
      let scriptEl = document.getElementById("page-schema") as HTMLScriptElement | null;
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = "page-schema";
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    }

    return () => {
      const scriptEl = document.getElementById("page-schema");
      if (scriptEl) scriptEl.remove();
    };
  }, [title, description, path, type, schema]);

  return null;
}
