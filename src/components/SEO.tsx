import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  canonical?: string;
  twitter?: { handle?: string; site?: string };
};

export default function SEO({
  title,
  description,
  image = "/thumbnail.jpg",
  url = typeof location !== "undefined" ? location.href : "",
  canonical,
  twitter = { handle: "@cbdesign", site: "@cbdesign" },
}: Props) {
  useEffect(() => {
    const head = document.head;

    const setName = (name: string, content: string) => {
      let el = head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setProp = (property: string, content: string) => {
      let el = head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // title
    document.title = title;

    // description
    setName("description", description);

    // Open Graph
    setProp("og:title", title);
    setProp("og:description", description);
    setProp("og:image", image);
    setProp("og:url", url);
    setProp("og:type", "website");

    // Twitter Card
    setName("twitter:card", "summary_large_image");
    setName("twitter:title", title);
    setName("twitter:description", description);
    setName("twitter:image", image);
    if (twitter.handle) setName("twitter:creator", twitter.handle);
    if (twitter.site) setName("twitter:site", twitter.site);

    // Canonical
    const href = canonical || url;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      head.appendChild(link);
    }
    link.setAttribute("href", href);
  }, [title, description, image, url, canonical, twitter.handle, twitter.site]);

  return null;
}
