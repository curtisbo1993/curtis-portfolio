// src/data/work.ts
export type WorkItem = {
  slug: string;
  title: string;
  client?: string;
  summary: string;
  tags: string[];
  og?: string;           // Open Graph image for SEO
  thumb?: string;        // grid thumbnail
  metrics?: { label: string; value: string }[];
  images?: string[];     // detail gallery paths
  problem?: string;
  solution?: string;
  outcomes?: string[];
  stack?: string[];
};

export const WORK: WorkItem[] = [
  {
    slug: "pyrevit-sheet-suite",
    title: "pyRevit Sheet Suite",
    client: "Internal Tooling",
    summary:
      "Automates sheet creation, title block population, view placement, and QA checks across multi-discipline sets.",
    tags: ["Revit", "pyRevit", "Automation"],
    og: "/work/og/pyrevit-sheet-suite.jpg",
    thumb: "/work/pyrevit.jpg",
    metrics: [
      { label: "Time saved", value: "3–6 hrs/wk per user" },
      { label: "Adoption", value: "85% of team" }
    ],
    images: ["/work/pyrevit/1.jpg", "/work/pyrevit/2.jpg", "/work/pyrevit/3.jpg"],
    problem:
      "Manual sheet setup and view placement were error-prone and slow, causing rework and inconsistent deliverables.",
    solution:
      "A pyRevit toolset with guardrails: sheet/batch creation, titleblock binding, view placement rules, and pre-issue QA.",
    outcomes: [
      "Consistent sheets across projects",
      "Reduced missed parameters and titleblock errors",
      "Documented workflow with Loom walkthroughs"
    ],
    stack: ["pyRevit", "Revit API", "C#", "YAML configs"]
  },
  {
    slug: "revit-powerbi-exporter",
    title: "Revit → Power BI Exporter",
    client: "Manufacturing Portfolio",
    summary: "Delta export of model health + issue KPIs with refreshable Power BI dashboards.",
    tags: ["Revit API", "ETL", "Power BI"],
    og: "/work/og/revit-powerbi-exporter.jpg",
    thumb: "/work/revit-powerbi.jpg",
    metrics: [
      { label: "Issue age ↓", value: "31%" },
      { label: "Visibility ↑", value: "Site & exec-ready" }
    ],
    images: ["/work/powerbi/1.jpg", "/work/powerbi/2.jpg"],
    problem:
      "Leads couldn’t see model health or issue trends over time; weekly screenshots were stale within hours.",
    solution:
      "An exporter that maps model parameters to a tidy schema, pushes deltas to a lightweight store, and feeds Power BI.",
    outcomes: [
      "Live health/issue KPIs by area/discipline",
      "Owner-visible dashboards without manual exports",
      "Baseline established for continuous improvement"
    ],
    stack: ["Revit API", "C#", "CSV/Parquet", "Power BI"]
  },
  {
    slug: "coordination-dashboard",
    title: "Coordination Dashboard",
    client: "Industrial",
    summary:
      "Navisworks clash metrics with aging buckets and closer-to-live rollups for transparent coordination.",
    tags: ["Navisworks", "Dashboards", "KPIs"],
    og: "/work/og/coordination-dashboard.jpg",
    thumb: "/work/coord-dashboard.jpg",
    metrics: [
      { label: "Unresolved clashes ↓", value: "47%" },
      { label: "Review cycle time ↓", value: "~2 weeks → ~4 days" }
    ],
    images: ["/work/coord/1.jpg", "/work/coord/2.jpg"],
    problem:
      "Stakeholders didn’t know if coordination was getting better; spreadsheets died in email threads.",
    solution:
      "Standardized exports + transform to a clash fact table, surfaced in a simple dashboard with aging KPIs.",
    outcomes: [
      "Fewer meetings explaining status",
      "Early detection of problem zones",
      "Owner confidence improved"
    ],
    stack: ["Navisworks", "Power BI", "CSV/ETL"]
  }
];
