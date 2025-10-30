// src/pages/Work.tsx
// @ts-nocheck
import React from "react";

type Project = {
  slug: string;
  title: string;
  client?: string;
  tags: string[];
  thumb?: string; // public path (e.g. /work/pyrevit.jpg)
  summary: string;
  cta?: string;
};

const projects: Project[] = [
  {
    slug: "pyrevit-sheet-suite",                    // routes to route "work:pyrevit"
    title: "pyRevit Sheet Suite",
    client: "Internal Tooling",
    tags: ["Revit", "pyRevit", "C#"],
    thumb: "/work/pyrevit.jpg",
    summary:
      "Automates sheet creation, titleblock population, view placement, and QA checks.",
    cta: "Open case study",
  },
  {
    slug: "revit-powerbi-exporter",
    title: "Revit → Power BI Exporter",
    client: "Manufacturing Portfolio",
    tags: ["Revit API", "Power BI", "ETL"],
    thumb: "/work/revit-powerbi.jpg",
    summary:
      "Delta export of model health + issue KPIs for Power BI dashboards.",
    cta: "Read summary",
  },
  {
    slug: "coordination-dashboard",
    title: "Coordination Dashboard",
    client: "Industrial",
    tags: ["Navisworks", "Clash KPIs", "Dashboards"],
    thumb: "/work/coord-dashboard.jpg",
    summary:
      "Aging clashes + owner-visible trends. Reduced unresolved issues by 47%.",
    cta: "See details",
  },
];

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
        {projects.map((p) => (
          <article key={p.slug} className="group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
            <div className="aspect-[16/9] bg-white/5">
              {p.thumb ? (
                <img
                  src={p.thumb}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  onError={(e) => ((e.currentTarget.style.display = "none"))}
                />
              ) : null}
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                {p.client && <span className="text-xs text-white/60">{p.client}</span>}
              </div>
              <p className="mt-2 text-sm text-white/80">{p.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-[11px] rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>

              {/* Link behavior: pyRevit opens sub-route "work:pyrevit". Others can be stubs for now. */}
              <div className="mt-5">
                {p.slug === "pyrevit-sheet-suite" ? (
                  <a
                    href="/work/pyrevit-sheet-suite"
                    className="text-sm rounded-xl border border-white/15 px-3 py-2 hover:bg-white/10"
                    onClick={(e) => {
                      e.preventDefault();
                      history.pushState(null, "", "/work/pyrevit-sheet-suite");
                      window.dispatchEvent(new PopStateEvent("popstate"));
                    }}
                  >
                    {p.cta ?? "Open"}
                  </a>
                ) : (
                  <span className="text-sm text-white/60">Write-up coming</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
