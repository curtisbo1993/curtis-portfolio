// src/pages/WorkDetail.tsx
// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { WORK } from "@/data/work";
import LazyImage from "@/components/LazyImage";
import Lightbox from "@/components/Lightbox";

type Props = { slug: string };

// SPA link helper (same behavior as your NavLink)
function go(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href") || "";
  if (href.startsWith("/")) {
    e.preventDefault();
    history.pushState(null, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
}

export default function WorkDetail({ slug }: Props) {
  const item = useMemo(() => WORK.find((w) => w.slug === slug), [slug]);
  const [activeId, setActiveId] = useState<string>("overview");
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);


  if (!item) {
    return (
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">Case study not found</h1>
        <p className="text-white/70 mt-2">We couldn’t find “{slug}”.</p>
        <div className="mt-6">
          <a href="/work" onClick={go} className="rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10">
            ← Back to Work
          </a>
        </div>
      </section>
    );
  }

  // Define all potential sections
  const sections: Array<{ id: string; label: string; show: boolean }> = [
    { id: "overview", label: "Overview", show: true },
    { id: "problem", label: "Problem", show: !!item.problem },
    { id: "solution", label: "Solution", show: !!item.solution },
    { id: "impact", label: "Impact", show: !!item.metrics?.length },
    { id: "outcomes", label: "Outcomes", show: !!item.outcomes?.length },
    { id: "stack", label: "Tech stack", show: !!item.stack?.length },
    { id: "gallery", label: "Gallery", show: !!item.images?.length },
  ];

  // Observe sections to set "activeId" for sticky TOC highlight
  useEffect(() => {
    const visibleIds = new Map<string, number>(); // id -> intersectionRatio
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-section='true']"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id") || "";
          if (!id) return;
          if (entry.isIntersecting) {
            visibleIds.set(id, entry.intersectionRatio);
          } else {
            visibleIds.delete(id);
          }
        });

        // Choose the most visible section, fallback to closest
        if (visibleIds.size > 0) {
          let bestId = activeId;
          let bestRatio = -1;
          visibleIds.forEach((ratio, id) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = id;
            }
          });
          if (bestId !== activeId) setActiveId(bestId);
        } else {
          // Fallback: find the topmost section above the fold
          let closestId = activeId;
          let closestDist = Number.POSITIVE_INFINITY;
          targets.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const dist = Math.abs(rect.top);
            if (rect.top <= 100 && dist < closestDist) {
              closestDist = dist;
              closestId = el.id || closestId;
            }
          });
          if (closestId && closestId !== activeId) setActiveId(closestId);
        }
      },
      {
        root: null,
        // top offset ~ header height; bottom a bit so next section doesn't flip too early
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [activeId]);

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      {/* Sticky TOC */}
      <aside className="hidden lg:block" aria-label="Page section navigation">
        <div className="sticky top-24">
          <div className="text-xs uppercase tracking-wider text-white/60">On this page</div>
          <nav className="mt-3 space-y-1.5" role="navigation">
            {sections.filter((s) => s.show).map((s) => {
              const isActive = activeId === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "relative block rounded-lg border-l-4 px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/40",
                    isActive
                      ? "border-l-[#2D9CDB] bg-[#2D9CDB]/10 text-[#EAF6FF] shadow-[inset_2px_0_8px_rgba(45,156,219,0.3)]"
                      : "border-l-transparent border border-white/10 bg-white/[0.02] text-white/80 hover:bg-white/10 hover:border-l-[#2D9CDB]/40"
                  ].join(" ")}
                  onClick={(e) => {
                    const href = e.currentTarget.getAttribute("href") || "";
                    if (href.startsWith("#")) return; // native hash scroll
                    go(e);
                  }}
                >
                  {s.label}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <article>
        {/* Header / hero */}
        <header id="overview" data-section="true">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold">{item.title}</h1>
              {item.client && <div className="text-white/60 mt-1 text-sm">Client: {item.client}</div>}
            </div>

            {/* Tags */}
            {item.tags?.length ? (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-md border border-white/10 bg-white/[0.04] px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {/* Summary */}
          <p className="mt-3 text-white/80">{item.summary}</p>

          {/* KPI chips */}
          {item.metrics?.length ? (
            <div id="impact" data-section="true" className="mt-5 flex flex-wrap gap-2">
              {item.metrics.map((m, i) => (
                <span
                  key={`${m.label}-${i}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                  <span className="text-white/70">{m.label}:</span>
                  <span className="font-medium text-white/90">{m.value}</span>
                </span>
              ))}
            </div>
          ) : null}

          {/* Actions: shareable link */}
            <div className="mt-4 flex gap-2">
              <button
                className="rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10"
                onClick={async () => {
                  const url = window.location.origin + window.location.pathname;
                  try {
                    if (navigator.share) {
                      await navigator.share({ title: item.title, text: item.summary, url });
                    } else {
                      await navigator.clipboard.writeText(url);
                      alert("Link copied to clipboard.");
                    }
                  } catch {}
                }}
              >
                Share / Copy link
              </button>
            </div>

          {/* Optional og/hero visual (prefer thumb if present) */}
          {(item.thumb || item.og) && (
            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <LazyImage
                src={item.thumb || item.og}
                alt={item.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </header>

        {/* Problem */}
        {item.problem ? (
          <section id="problem" data-section="true" className="mt-10">
            <h2 className="text-2xl font-semibold">Problem</h2>
            <p className="mt-3 text-white/80">{item.problem}</p>
          </section>
        ) : null}

        {/* Solution */}
        {item.solution ? (
          <section id="solution" data-section="true" className="mt-10">
            <h2 className="text-2xl font-semibold">Solution</h2>
            <p className="mt-3 text-white/80">{item.solution}</p>
          </section>
        ) : null}

        {/* Outcomes */}
        {item.outcomes?.length ? (
          <section id="outcomes" data-section="true" className="mt-10">
            <h2 className="text-2xl font-semibold">Outcomes</h2>
            <ul className="mt-3 space-y-2 text-white/80">
              {item.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Stack */}
        {item.stack?.length ? (
          <section id="stack" data-section="true" className="mt-10">
            <h2 className="text-2xl font-semibold">Tech stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.stack.map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className="text-sm rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {/* Back link */}
        <div className="mt-12">
          <a
            href="/work"
            onClick={go}
            className="inline-flex items-center rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10"
          >
            ← Back to Work
          </a>
        </div>
      </article>
    </div>
  );
}
       