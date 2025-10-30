import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const CASES = {
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
export default function WorkDetail({ slug }) {
    const cs = CASES[slug];
    if (!cs) {
        return (_jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20", children: [_jsx("h1", { className: "text-2xl md:text-3xl font-semibold", children: "Case study not found" }), _jsx("a", { href: "/work", className: "underline mt-4 inline-block", children: "\u2190 Back to all work" })] }));
    }
    return (_jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12", children: [_jsx("a", { href: "/work", className: "text-sm underline text-white/70 hover:text-white", children: "\u2190 Back to all work" }), _jsx("h1", { className: "mt-2 text-3xl md:text-4xl font-semibold", children: cs.title }), cs.client && _jsx("div", { className: "text-white/60 mt-1", children: cs.client }), cs.cover && (_jsx("div", { className: "mt-6 overflow-hidden rounded-3xl border border-white/10", children: _jsx("img", { src: cs.cover, alt: cs.title, className: "w-full object-cover" }) })), _jsxs("div", { className: "mt-8 grid md:grid-cols-3 gap-8", children: [_jsxs("div", { className: "md:col-span-2 space-y-6", children: [cs.problem && (_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold", children: "Problem" }), _jsx("p", { className: "text-white/80 mt-2", children: cs.problem })] })), cs.approach && (_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold", children: "Approach" }), _jsx("ul", { className: "mt-2 space-y-2 text-white/80 list-disc pl-5", children: cs.approach.map((a) => _jsx("li", { children: a }, a)) })] }))] }), _jsxs("aside", { className: "space-y-4", children: [_jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-4", children: [_jsx("h4", { className: "font-semibold", children: "Results" }), _jsx("div", { className: "mt-3 grid grid-cols-2 gap-2", children: cs.results?.map((k) => (_jsxs("div", { className: "rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2", children: [_jsx("div", { className: "text-[10px] uppercase tracking-wide text-white/60", children: k.label }), _jsx("div", { className: "text-sm", children: k.value })] }, k.label))) || _jsx("div", { className: "text-white/60 text-sm", children: "In progress" }) })] }), _jsxs("div", { className: "rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4", children: [_jsx("div", { className: "font-semibold", children: "Want this outcome?" }), _jsx("div", { className: "text-white/70 text-sm mt-1", children: "15-min discovery \u2192 scoped plan \u2192 delivery." }), _jsxs("div", { className: "mt-3 flex gap-2", children: [_jsx("a", { href: "/contact", className: "rounded-xl bg-white text-neutral-900 px-4 py-2 text-sm", children: "Book consult" }), _jsx("a", { href: "mailto:curtis@example.com", className: "rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10", children: "Email" })] })] })] })] })] }));
}
