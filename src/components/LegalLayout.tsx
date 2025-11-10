// src/components/LegalLayout.tsx
// @ts-nocheck
import React from "react";

export default function LegalLayout({
  title,
  lastUpdated = new Date().toLocaleDateString(),
  toc = [], // [{ href: "#section-id", label: "Section Title" }]
  children,
  className = "",
}) {
  return (
    <section
      className={`legal-page prose prose-invert mx-auto max-w-[760px] px-4 sm:px-6 lg:px-8 py-16 ${className}`}
      aria-labelledby="legal-title"
    >
      <h1 id="legal-title" className="mb-1">{title}</h1>
      <p className="mt-0 text-sm opacity-70">Last updated: {lastUpdated}</p>

      {toc.length > 0 && (
        <nav aria-label="Sections" className="mt-8 border-t border-white/10 pt-6">
          <ol className="list-decimal pl-6 space-y-2">
            {toc.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="mt-8">{children}</div>
    </section>
  );
}
