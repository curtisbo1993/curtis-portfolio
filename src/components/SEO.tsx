// src/components/SEO.tsx
// @ts-nocheck
import React from "react";

export default function SEO({ title, description, image }: { title: string; description: string; image?: string }) {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.cb-designconsultants.com";
  const path   = typeof window !== "undefined" ? window.location.pathname + window.location.search : "/";
  const url    = `${origin}${path}`;
  const ogImg  = image?.startsWith("http") ? image : `${origin}${image || "/thumbnail.jpg"}`;

  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImg} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImg} />
    </>
  );
}
