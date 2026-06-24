import { useEffect } from "react";

export type Lang = "ru" | "en";

export const seoConfig: Record<
  Lang,
  { title: string; description: string; keywords: string }
> = {
  ru: {
    title: "devs-for-hire — команда разработчиков | боты, fullstack, Java, React",
    description:
      "Небольшая команда разработчиков: Telegram-боты, fullstack-приложения, бэкенд на Java и Spring Boot, фронтенд на React. Прямой контакт, честные сроки.",
    keywords:
      "разработка на заказ, команда разработчиков, telegram боты, fullstack, Java Spring Boot, React TypeScript, веб-разработка",
  },
  en: {
    title: "devs-for-hire — developer team | bots, fullstack, Java, React",
    description:
      "A small developer team: Telegram bots, fullstack apps, Java & Spring Boot backends, React frontends. Direct contact, honest timelines.",
    keywords:
      "software development, developer team, telegram bots, fullstack, Java Spring Boot, React TypeScript, web development",
  },
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra?.type
    ? `link[rel="${rel}"][type="${extra.type}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (extra?.type) el.setAttribute("type", extra.type);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  if (extra?.sizes) el.setAttribute("sizes", extra.sizes);
}

export function Seo({ lang }: { lang: Lang }) {
  useEffect(() => {
    const seo = seoConfig[lang];
    const siteUrl = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
    const canonical = siteUrl || window.location.href.split("#")[0];
    const faviconUrl = siteUrl ? `${siteUrl}/favicon.png` : "/favicon.png";

    document.documentElement.lang = lang;
    document.title = seo.title;

    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "keywords", seo.keywords);
    upsertMeta("name", "robots", "index, follow");
    upsertLink("canonical", canonical);
    upsertLink("icon", siteUrl ? `${siteUrl}/favicon.ico` : "/favicon.ico", { sizes: "48x48" });
    upsertLink("icon", siteUrl ? `${siteUrl}/images/Logo-blue.svg` : "/images/Logo-blue.svg", {
      type: "image/svg+xml",
    });
    upsertLink("icon", faviconUrl, { type: "image/png", sizes: "512x512" });

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:locale", lang === "ru" ? "ru_RU" : "en_US");
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", faviconUrl);
    upsertMeta("property", "og:image:width", "512");
    upsertMeta("property", "og:image:height", "512");

    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", faviconUrl);

    const scriptId = "json-ld-org";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "devs-for-hire",
      description: seo.description,
      email: "p@x128.ru",
      ...(siteUrl && { url: siteUrl, logo: faviconUrl, image: faviconUrl }),
      sameAs: ["https://t.me/devs_for_hire"],
      areaServed: ["RU", "Worldwide"],
      knowsAbout: [
        "React",
        "TypeScript",
        "Java",
        "Spring Boot",
        "Telegram bots",
        "Fullstack development",
      ],
    });
  }, [lang]);

  return null;
}
