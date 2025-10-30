// @ts-nocheck
import React from "react";

export type CaseStudy = {
  slug: string;
  title: string;
  client?: string;
  problem?: string;
  approach?: string[];
  results?: { label: string; value: string }[];
  cover?: string;
  gallery?: string[];
};

export const CASES: Record<string, CaseStudy> = {
  "pyrevit-sheet-suite": {
    slug: "pyrevit-sheet-suite",
    title: "pyRevit Sheet Suite",
    client: "Confidential (Industrial)",
    problem: "Manual sheet creation / parameters / batch print cost hours every week.",
    approach: [
      "Requirements capture with leads → spec for titleblock params",
      "pyRevit panel: Create Sheets, Batch Rename, Batch Print (PDF/DWG)",
      "Config-driven mapping + logs, Loom walkthroughs & docs"
    ],
    results: [
      { label: "Hours saved / wk", value: "6–10" },
      { label: "Adoption", value: "90%+" }
    ],
    cover: "/assets/work/pyrevit-sheet-suite.jpg",
    gallery: ["/assets/work/pyrevit-sheet-suite.jpg"]
  },
  "analysis-handoff": {
    slug: "analysis-handoff",
    title: "Revit ↔ Analysis Handoff",
    client: "Life Sciences",
    problem: "Parameters lost on round-trip; engineers didn’t trust the pipeline.",
    approach: [
      "Exporter → CSV + validation rules",
      "Re-ingest with error report; delta checks",
      "Pilot on live project; train & document"
    ],
    results: [{ label: "Data loss", value: "0%" }, { label: "Rework", value: "−40%" }],
    cover: "/assets/work/analysis-handoff.jpg"
  },
  "coordination-dashboard": {
    slug: "coordination-dashboard",
    title: "Coordination Dashboard",
    client: "Manufacturing",
    problem: "Clash aging + model health lacked visibility across trades.",
    approach: [
      "Power BI dataset; scheduled refresh",
      "KPIs: aging, issue burn-down, model health",
      "Rollout playbook; ownership & cadence"
    ],
    results: [{ label: "Aging clashes", value: "−47%" }],
    cover: "/assets/work/coordination-dashboard.jpg"
  }
};

export default function WorkDetail({ slug }: { slug: string }) {
  const cs = CASES[slug];
  if (!cs) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-2xl md:text-3xl font-semibold">Case study not found</h1>
        <a href="/work" className="underline mt-4 inline-block">← Back to all work</a>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <a href="/work" className="text-sm underline text-white/70 hover:text-white">← Back to all work</a>
      <h1 className="mt-2 text-3xl md:text-4xl font-semibold">{cs.title}</h1>
      {cs.client && <div className="text-white/60 mt-1">{cs.client}</div>}

      {cs.cover && (
        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
          <img src={cs.cover} alt={cs.title} className="w-full object-cover" />
        </div>
      )}

      <div className="mt-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {cs.problem && (
            <div>
              <h3 className="text-xl font-semibold">Problem</h3>
              <p className="text-white/80 mt-2">{cs.problem}</p>
            </div>
          )}
          {cs.approach && (
            <div>
              <h3 className="text-xl font-semibold">Approach</h3>
              <ul className="mt-2 space-y-2 text-white/80 list-disc pl-5">
                {cs.approach.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <h4 className="font-semibold">Results</h4>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {cs.results?.map((k) => (
                <div key={k.label} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                  <div className="text-[10px] uppercase tracking-wide text-white/60">{k.label}</div>
                  <div className="text-sm">{k.value}</div>
                </div>
              )) || <div className="text-white/60 text-sm">In progress</div>}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4">
            <div className="font-semibold">Want this outcome?</div>
            <div className="text-white/70 text-sm mt-1">15-min discovery → scoped plan → delivery.</div>
            <div className="mt-3 flex gap-2">
              <a href="/contact" className="rounded-xl bg-white text-neutral-900 px-4 py-2 text-sm">Book consult</a>
              <a href="mailto:curtis@example.com" className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Email</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
