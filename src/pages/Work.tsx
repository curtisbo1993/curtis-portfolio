// src/pages/Work.tsx
// @ts-nocheck
import React from "react";
import { WORK } from "@/data/work";

// Small SPA link helper so clicks don't full-reload (same behavior as your NavLink)
function go(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href") || "";
  if (href.startsWith("/")) {
    e.preventDefault();
    history.pushState(null, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
}

export default function WorkPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold">Work</h1>
        <p className="text-white/70 mt-2">
          Selected projects with measurable outcomes in BIM automation, analysis handoffs, and coordination.
        </p>
      </header>

      {/* Cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WORK.map((w) => (
          <article
            key={w.slug}
            className="group relative rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:bg-white/[0.06] transition"
          >
            <a href={`/work/${w.slug}`} onClick={go} className="absolute inset-0 z-10" aria-label={w.title} />
            {/* Thumb */}
            <div className="aspect-[16/9] bg-white/5">
              {w.thumb ? (
                <img
                  src={w.thumb}
                  alt={w.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full grid place-items-center text-white/50 text-sm">
                  No thumbnail
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-5">
              <h2 className="text-lg font-semibold">{w.title}</h2>
              {w.client && (
                <div className="mt-1 text-xs text-white/60">Client: {w.client}</div>
              )}
              <p className="mt-2 text-sm text-white/80 line-clamp-3">{w.summary}</p>

              {/* Tags */}
              {w.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {w.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] rounded-md border border-white/10 bg-white/[0.04] px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* KPI chips (top 2 if present) */}
              {w.metrics?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {w.metrics.slice(0, 2).map((m, i) => (
                    <span
                      key={`${m.label}-${i}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                      <span className="text-white/70">{m.label}:</span>
                      <span className="font-medium text-white/90">{m.value}</span>
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-5">
                <a
                  href={`/work/${w.slug}`}
                  onClick={go}
                  className="inline-flex items-center rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10"
                >
                  View case study →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
