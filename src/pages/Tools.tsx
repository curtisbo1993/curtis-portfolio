// src/pages/Tools.tsx
import React from "react";

export default function ToolsPage() {
  const tools = [
    {
      name: "pyRevit Sheet Suite",
      description: "Batch sheet creation, title block population, view placement, and pre-issue QA checks",
      category: "Revit Automation",
      status: "Production",
    },
    {
      name: "Revit → Power BI Exporter",
      description: "Delta export of model health + issue KPIs with refreshable Power BI dashboards",
      category: "Data Export",
      status: "Production",
    },
    {
      name: "View/Sheet Validators",
      description: "Parameter guardrails and naming convention enforcement",
      category: "Quality Control",
      status: "Production",
    },
    {
      name: "Dynamo Parameter Sync",
      description: "Automated parameter synchronization and naming checks across families",
      category: "Dynamo Helpers",
      status: "Production",
    },
    {
      name: "Revit ↔ Analysis Round-trip",
      description: "Bi-directional data exchange with structural analysis software",
      category: "Integration",
      status: "WIP",
    },
  ];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold">Tools</h1>
        <p className="text-white/70 mt-2">
          pyRevit/Dynamo tools, exporters, and validators built to reduce manual work and prevent data loss.
        </p>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, idx) => (
          <article
            key={idx}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold">{tool.name}</h2>
              <span
                className={`text-xs px-2 py-1 rounded-md ${
                  tool.status === "Production"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {tool.status}
              </span>
            </div>
            <div className="mt-1 text-xs text-white/60">{tool.category}</div>
            <p className="mt-3 text-sm text-white/80">{tool.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="text-xl font-semibold">Custom Tool Development</h2>
        <p className="mt-3 text-white/80">
          Need a specific automation or workflow tool for your team? I build custom pyRevit extensions, Dynamo graphs,
          and Revit API integrations tailored to your processes.
        </p>
        <div className="mt-5">
          <a
            href="/contact"
            className="inline-flex items-center rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10"
          >
            Discuss custom tools →
          </a>
        </div>
      </div>
    </div>
  );
}

