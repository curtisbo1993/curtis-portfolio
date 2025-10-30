import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Contact.tsx
// @ts-nocheck
import { useState } from "react";
export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        services: [],
        budget: "",
        message: "",
    });
    const toggleService = (s) => setForm((f) => {
        const has = f.services.includes(s);
        return { ...f, services: has ? f.services.filter(x => x !== s) : [...f.services, s] };
    });
    const onSubmit = (e) => {
        e.preventDefault();
        const subject = `Consult: ${form.name || "New inquiry"}`;
        const lines = [
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Company: ${form.company}`,
            `Services: ${form.services.join(", ") || "—"}`,
            `Budget: ${form.budget || "—"}`,
            "",
            "Message:",
            form.message || "—",
        ];
        const body = encodeURIComponent(lines.join("\n"));
        window.location.href = `mailto:curtis@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    };
    const svc = [
        "BIM Automation Sprint",
        "Revit ↔ Analysis Sync",
        "Coordination Dashboard",
        "Model Health Audit",
        "Revit Family Library",
        "Clash Coordination Playbook",
        "Parametric Connection Generator",
        "Revit → Power BI Exporter",
    ];
    return (_jsxs("section", { className: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-semibold", children: "Book a consult" }), _jsx("p", { className: "text-white/70 mt-2", children: "15-minute discovery to scope the fastest path to value." }), _jsxs("form", { onSubmit: onSubmit, className: "mt-8 space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm text-white/80", children: "Name" }), _jsx("input", { required: true, value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), className: "mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm text-white/80", children: "Email" }), _jsx("input", { type: "email", required: true, value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }), className: "mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20" })] })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm text-white/80", children: "Company (optional)" }), _jsx("input", { value: form.company, onChange: (e) => setForm({ ...form, company: e.target.value }), className: "mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20" })] }), _jsxs("fieldset", { children: [_jsx("legend", { className: "text-sm text-white/80", children: "What do you need?" }), _jsx("div", { className: "mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2", children: svc.map((s) => (_jsx("button", { type: "button", onClick: () => toggleService(s), className: `text-left rounded-xl border px-3 py-2 text-sm ${form.services.includes(s)
                                        ? "bg-white text-neutral-900"
                                        : "border-white/15 text-white/80 hover:bg-white/10"}`, children: s }, s))) })] }), _jsxs("fieldset", { children: [_jsx("legend", { className: "text-sm text-white/80", children: "Budget range" }), _jsx("div", { className: "mt-3 flex flex-wrap gap-2 text-sm", children: ["<$5k", "$5–10k", "$10–25k", "$25–50k", "$50k+"].map((b) => (_jsxs("label", { className: "inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 hover:bg-white/10", children: [_jsx("input", { type: "radio", name: "budget", value: b, checked: form.budget === b, onChange: (e) => setForm({ ...form, budget: e.target.value }) }), b] }, b))) })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm text-white/80", children: "Message" }), _jsx("textarea", { rows: 6, value: form.message, onChange: (e) => setForm({ ...form, message: e.target.value }), placeholder: "What problem are we solving? Timeline? Stack?", className: "mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { type: "submit", className: "rounded-2xl bg-white text-neutral-900 px-5 py-3 font-medium hover:opacity-90", children: "Send email" }), _jsx("a", { href: "mailto:curtis@example.com", className: "rounded-2xl border border-white/20 px-5 py-3 font-medium hover:bg-white/10", children: "Or email directly" })] })] })] }));
}
