import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const projects = [
    {
        slug: "pyrevit-sheet-suite", // routes to route "work:pyrevit"
        title: "pyRevit Sheet Suite",
        client: "Internal Tooling",
        tags: ["Revit", "pyRevit", "C#"],
        thumb: "/work/pyrevit.jpg",
        summary: "Automates sheet creation, titleblock population, view placement, and QA checks.",
        cta: "Open case study",
    },
    {
        slug: "revit-powerbi-exporter",
        title: "Revit → Power BI Exporter",
        client: "Manufacturing Portfolio",
        tags: ["Revit API", "Power BI", "ETL"],
        thumb: "/work/revit-powerbi.jpg",
        summary: "Delta export of model health + issue KPIs for Power BI dashboards.",
        cta: "Read summary",
    },
    {
        slug: "coordination-dashboard",
        title: "Coordination Dashboard",
        client: "Industrial",
        tags: ["Navisworks", "Clash KPIs", "Dashboards"],
        thumb: "/work/coord-dashboard.jpg",
        summary: "Aging clashes + owner-visible trends. Reduced unresolved issues by 47%.",
        cta: "See details",
    },
];
export default function WorkPage() {
    return (_jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("header", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-semibold", children: "Case studies" }), _jsx("p", { className: "text-white/70 mt-2 max-w-2xl", children: "A few highlights across pyRevit, Revit API, data pipelines, and coordination." })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: projects.map((p) => (_jsxs("article", { className: "group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden", children: [_jsx("div", { className: "aspect-[16/9] bg-white/5", children: p.thumb ? (_jsx("img", { src: p.thumb, alt: p.title, className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]", onError: (e) => ((e.currentTarget.style.display = "none")) })) : null }), _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("h3", { className: "text-lg font-semibold", children: p.title }), p.client && _jsx("span", { className: "text-xs text-white/60", children: p.client })] }), _jsx("p", { className: "mt-2 text-sm text-white/80", children: p.summary }), _jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: p.tags.map((t) => (_jsx("span", { className: "text-[11px] rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1", children: t }, t))) }), _jsx("div", { className: "mt-5", children: p.slug === "pyrevit-sheet-suite" ? (_jsx("a", { href: "/work/pyrevit-sheet-suite", className: "text-sm rounded-xl border border-white/15 px-3 py-2 hover:bg-white/10", onClick: (e) => {
                                            e.preventDefault();
                                            history.pushState(null, "", "/work/pyrevit-sheet-suite");
                                            window.dispatchEvent(new PopStateEvent("popstate"));
                                        }, children: p.cta ?? "Open" })) : (_jsx("span", { className: "text-sm text-white/60", children: "Write-up coming" })) })] })] }, p.slug))) })] }));
}
