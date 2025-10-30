import { useEffect } from "react";
export function useReveal(selector = "[data-reveal]", refreshKey) {
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        if (typeof document === "undefined")
            return;
        if (!("IntersectionObserver" in window))
            return;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)
            return;
        let io = null;
        const t = window.setTimeout(() => {
            const els = Array.from(document.querySelectorAll(selector));
            els.forEach((el) => el.style.setProperty("--reveal-delay", el.dataset.delay || "0ms"));
            io = new IntersectionObserver((entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        e.target.classList.add("reveal-in");
                        io.unobserve(e.target);
                    }
                }
            }, { threshold: 0.15 });
            els.forEach((el) => io.observe(el));
        }, 0);
        return () => {
            window.clearTimeout(t);
            io?.disconnect();
        };
    }, [selector, refreshKey]);
}
