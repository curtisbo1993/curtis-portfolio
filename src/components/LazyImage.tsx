// src/components/LazyImage.tsx
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;        // required
  alt: string;        // required
  threshold?: number; // intersection threshold (default 0.1)
};

export default function LazyImage({ src, alt, className = "", threshold = 0.1, ...imgProps }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;

    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!cancelled && e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "200px 0px 200px 0px", threshold }
    );

    io.observe(node);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [threshold]);

  return (
    <img
      ref={imgRef}
      src={inView ? src : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={[
        className,
        // smooth fade-in once loaded
        "transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0",
        // keep space even before load
        inView ? "" : "opacity-0"
      ].join(" ")}
      {...imgProps}
    />
  );
}
