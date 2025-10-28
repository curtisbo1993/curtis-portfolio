import { useEffect } from "react";

export function useReveal(selector: string = "[data-reveal]", refreshKey?: unknown) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof document === "undefined") return;
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

    let io: IntersectionObserver | null = null;
    const t = window.setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
      els.forEach((el) => el.style.setProperty("--reveal-delay", el.dataset.delay || "0ms"));

      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("reveal-in");
              io!.unobserve(e.target);
            }
          }
        },
        { threshold: 0.15 }
      );

      els.forEach((el) => io!.observe(el));
    }, 0);

    return () => {
      window.clearTimeout(t);
      io?.disconnect();
    };
  }, [selector, refreshKey]);
}
