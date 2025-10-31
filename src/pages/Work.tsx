// src/pages/Work.tsx
// @ts-nocheck
import React from "react";
import { WORK } from "@/data/work";

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Case studies</h1>
        <p className="text-white/70 mt-2 max-w-2xl">
          A few highlights across pyRevit, Revit API, data pipelines, and coordination.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WORK.map((w) => (
          <article
            key={w.slug}
            className="group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden"
          >
            <a
              href={`/work/${w.slug}`}
              onClick={(e) => {
                // SPA-style navigation (no full reload)
                if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  history.pushState(null, "", `/work/${w.slug}`);
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }
              }}
              className="block"
            >
              <div className="aspect-[16/9] bg-white/5">
                {w.hero ? (
                  <img
                    src={w.hero}
                    alt={w.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-white/80">{w.summary}</p>
                {w.stack?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {w.stack.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="mt-5">
                  <span className="text-sm rounded-xl border border-white/15 px-3 py-2 inline-block group-hover:bg-white/10">
                    Open case study
                  </span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
