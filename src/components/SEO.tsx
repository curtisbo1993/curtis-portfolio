import { useEffect } from "react";

type Props = { title: string; description: string; image?: string; url?: string };

export default function SEO({ title, description, image = "/thumbnail.jpg", url = location.href }: Props) {
  useEffect(() => {
    document.title = title;
    const set = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    set("description", description);

    const og = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    og("og:title", title);
    og("og:description", description);
    og("og:image", image);
    og("og:url", url);
    og("og:type", "website");
  }, [title, description, image, url]);

  return null;
}
