// src/components/SEO.tsx
// @ts-nocheck
import React from "react";

type Props = {
  title: string;
  description: string;
  image?: string; // full or root-relative
  url?: string;   // optional absolute override
};

const SITE = "https://cb-designconsultants.com";

export default function SEO({ title, description, image = "/thumbnail.jpg", url }: Props) {
  const absImage = image.startsWith("http") ? image : `${SITE}${image}`;
  const absUrl =
    url || `${SITE}${(typeof window !== "undefined" ? window.location.pathname : "/")}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={absUrl} />

      {/* Favicons & PWA */}
      <link rel="icon" href="/favicon/cbdc-favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon/cbdc-32.png" sizes="32x32" />
      <link rel="icon" href="/favicon/cbdc-16.png" sizes="16x16" />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#0ea5e9" />
      <meta name="theme-color" content="#0a0a0a" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="CB Design Consultants" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={absUrl} />
      <meta property="og:image" content={absImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absImage} />
    </>
  );
}
