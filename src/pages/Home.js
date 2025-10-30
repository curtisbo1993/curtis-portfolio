import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useReveal } from "@/hooks/useReveal";
export default function HomePage() {
    useReveal();
    return (_jsxs(_Fragment, { children: [_jsxs("section", { "data-reveal": true, className: "rounded-3xl border border-white/10 bg-white/5 p-8", children: [_jsx("h2", { className: "text-2xl font-semibold", children: "Welcome to My Portfolio" }), _jsx("p", { className: "mt-4 text-white/70", children: "Intro text\u2026" })] }), _jsxs("section", { "data-reveal": true, "data-delay": "120ms", className: "mt-10 rounded-3xl border border-white/10 bg-white/5 p-8", children: [_jsx("h2", { className: "text-2xl font-semibold", children: "Featured Work" }), _jsx("p", { className: "mt-4 text-white/70", children: "Showcase some projects\u2026" })] })] }));
}
