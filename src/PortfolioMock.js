import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/PortfolioMock.tsx
// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { useReveal } from "./hooks/useReveal";
import SkipToContent from "./components/SkipToContent";
import Footer from "./components/Footer";
import WorkPage from "@/pages/Work";
import ContactPage from "./pages/Contact";
import WorkDetail from "@/pages/WorkDetail";
import SEO from "./components/SEO";
/* -------------------- ErrorBoundary -------------------- */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(err) {
        console.error("App crashed:", err);
    }
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { style: {
                    background: "#0a0a0a",
                    color: "#fff",
                    minHeight: "100vh",
                    padding: 24,
                    fontFamily: "ui-sans-serif, system-ui"
                }, children: [_jsx("h2", { style: { fontSize: 20, marginBottom: 8 }, children: "Something went wrong." }), _jsx("p", { children: "Open DevTools \u2192 Console for details." })] }));
        }
        return this.props.children;
    }
}
/* ---------------- SPA NavLink (keeps it a single-page app) --------------- */
function NavLink(props) {
    return (_jsx("a", { ...props, onClick: (e) => {
            const href = e.currentTarget.getAttribute("href") || "";
            if (href.startsWith("/")) {
                e.preventDefault();
                history.pushState(null, "", href);
                window.dispatchEvent(new PopStateEvent("popstate"));
            }
        } }));
}
// Helper: decides if a link is "active" based on current route
function isActive(href, route) {
    if (href === "/")
        return route === "home";
    if (href === "/work")
        return route === "work" || route.startsWith("work:");
    if (href === "/services")
        return route === "services";
    if (href === "/tools")
        return route === "tools";
    if (href === "/about")
        return route === "about";
    if (href === "/contact")
        return route === "contact";
    return false;
}
/* =============================== APP ===================================== */
export default function AppShell() {
    // Router state (single instance)
    const [route, setRoute] = useState("home");
    // Scroll-to-top + focus target
    const mainRef = useRef(null);
    useEffect(() => {
        // when route changes, go to top and move focus to main for screen readers
        queueMicrotask(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            mainRef.current?.focus({ preventScroll: true });
        });
    }, [route]);
    // Compute SEO for current route
    function getSeoForRoute(route) {
        // Default
        let title = "CB Design Consultants — Structural BIM • Dev • Automation";
        let description = "Structural BIM/VDC + automation: pyRevit/C# tools, analysis handoffs, and dashboards that save teams hours.";
        let image = "/thumbnail.jpg";
        if (route === "home") {
            // keep defaults or customize
        }
        else if (route === "work") {
            title = "Work — Case Studies | CB Design Consultants";
            description = "Selected projects with measurable outcomes in BIM automation, analysis handoffs, and coordination.";
        }
        else if (route.startsWith("work:")) {
            const slug = route.split(":")[1];
            if (slug === "pyrevit-sheet-suite") {
                title = "pyRevit Sheet Suite — Case Study | CB Design Consultants";
                description =
                    "A focused pyRevit toolset that automates sheet creation, naming, and QA checks—hours saved weekly.";
                image = "/assets/work/pyrevit-sheet-suite/og.jpg";
            }
            else {
                // Generic work detail
                title = `${slug.replace(/-/g, " ")} — Case Study | CB Design Consultants`;
                description = "Project details, outcomes, and lessons learned.";
                image = "/thumbnail.jpg";
            }
        }
        else if (route === "services") {
            title = "Services — Productized BIM/Dev | CB Design Consultants";
            description = "Clear scope and deliverables: automation sprints, Revit↔Analysis sync, dashboards, and more.";
        }
        else if (route === "tools") {
            title = "Tools — pyRevit, Dynamo, Exporters | CB Design Consultants";
            description = "Reusable tools and validators that reduce manual work and prevent data loss.";
        }
        else if (route === "about") {
            title = "About — Curtis Bolden | CB Design Consultants";
            description = "Structural BIM/VDC specialist and developer—skills, background, and companies supported.";
        }
        else if (route === "contact") {
            title = "Contact — Book a Consult | CB Design Consultants";
            description = "Quick discovery call to map problems → outcomes. Let’s get you hours back every week.";
        }
        return { title, description, image };
    }
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "CB Design Consultants",
        url: "https://www.cb-designconsultants.com",
        logo: "/assets/brand/co-logo-white.png",
        sameAs: [
            "https://www.linkedin.com/in/curtisaboldenjr/",
            // add other profiles as you create them
        ],
    };
    // If you actually have this hook file, keep it; otherwise delete this line.
    useReveal("[data-reveal]", route);
    // Tabs (used on About)
    const [tab, setTab] = useState("model");
    // Hero media
    const HERO_VIDEO_SRC = "/hero/Hero Video.mp4";
    const HERO_VIDEO_SRC_DESKTOP = "/hero/Hero Video.mp4";
    const HERO_VIDEO_SRC_MOBILE = "/hero/trailer-720.mp4";
    const HERO_POSTER_SRC = "/thumbnail.jpg";
    const HAS_VIDEO_SOURCES = Boolean(HERO_VIDEO_SRC || HERO_VIDEO_SRC_DESKTOP || HERO_VIDEO_SRC_MOBILE);
    // Respect user motion / data settings
    const [canAutoplay, setCanAutoplay] = useState(true);
    useEffect(() => {
        try {
            const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
            const reduced = !!mql?.matches;
            const conn = navigator.connection || {};
            const saveData = !!conn.saveData;
            const slow = ["slow-2g", "2g"].includes(conn.effectiveType);
            setCanAutoplay(!(reduced || saveData || slow));
        }
        catch {
            setCanAutoplay(true);
        }
    }, []);
    // Router (path-based with graceful #/about → /about migration)
    useEffect(() => {
        const parse = () => {
            // 1) migrate hash routes like #/about → /about
            const hash = window.location.hash.replace("#", "");
            if (hash.startsWith("/"))
                history.replaceState(null, "", hash);
            // 2) get pathname ONCE, before any checks
            const p = window.location.pathname;
            // 3) route matching (order matters)
            if (!p || p === "/") {
                setRoute("home");
                return;
            }
            // /work/:slug (detail pages)
            if (p.startsWith("/work/")) {
                const slug = p.split("/")[2] || "";
                if (slug === "pyrevit-sheet-suite") {
                    setRoute("work:pyrevit");
                }
                else {
                    setRoute(`work:${slug}`);
                }
                return;
            }
            // top-level sections
            if (p.startsWith("/work"))
                return setRoute("work");
            if (p.startsWith("/services"))
                return setRoute("services");
            if (p.startsWith("/tools"))
                return setRoute("tools");
            if (p.startsWith("/about"))
                return setRoute("about");
            if (p.startsWith("/contact"))
                return setRoute("contact");
            // fallback
            setRoute("home");
        };
        parse();
        window.addEventListener("popstate", parse);
        return () => window.removeEventListener("popstate", parse);
    }, []);
    // Data — services / tools / companies / testimonials
    const services = [
        { name: 'BIM Automation Sprint', time: '2 weeks', price: 'from $4,800', bullets: ['Backlog audit & prioritization', 'Ship 1–2 pyRevit/Dynamo tools', 'Docs + Loom walkthroughs'] },
        { name: 'Revit ↔ Analysis Sync', time: '4–6 weeks', price: 'from $8,500', bullets: ['Exporter/validator design', 'Round‑trip data checks', 'Pilot on a live project'] },
        { name: 'Coordination Dashboard', time: '3–4 weeks', price: 'from $6,500', bullets: ['Model health metrics', 'Clash/issue KPIs', 'Power BI delivery + refresh'] },
        { name: 'Model Health Audit & Standards', time: '2 weeks', price: 'from $3,800', bullets: ['Audit views/sheets/families', 'Naming & parameter standards', 'Fix list + training'] },
        { name: 'Revit Family Library Build', time: '3–5 weeks', price: 'from $7,200', bullets: ['Parametric families', 'Type catalogs', 'QA checklist + docs'] },
        { name: 'Clash Coordination Playbook', time: '2–3 weeks', price: 'from $5,200', bullets: ['Workflow design', 'Issue aging KPIs', 'Navis/BCF handoff'] },
        { name: 'Parametric Connection Generator', time: '3–4 weeks', price: 'from $9,000', bullets: ['Rules-based components', 'Schedules/Tagging', 'Shop drawing helpers'] },
        { name: 'Revit → Power BI Data Exporter', time: '1–2 weeks', price: 'from $2,900', bullets: ['Parameter mapping', 'Delta export', 'Refresh scheduling'] },
    ];
    const toolLogos = [
        { name: 'Revit', src: '/assets/badges/rvt.png', level: 'Expert' },
        { name: 'AutoCAD', src: '/assets/badges/cad.png', level: 'Advanced' },
        { name: 'Navisworks', src: '/assets/badges/man.png', level: 'Advanced' },
        { name: 'Civil 3D', src: '/assets/badges/c3d.png', level: 'Advanced' },
        { name: 'Advance Steel', src: '/assets/badges/ads.png', level: 'Advanced' },
        { name: 'ReCap Pro', src: '/assets/badges/pro.png', level: 'Advanced' },
        { name: 'Infraworks', src: '/assets/badges/iwx.png', level: 'Advanced' },
        { name: 'Plant 3D', src: '/assets/badges/p3d.png', level: 'Advanced' },
        { name: 'Inventor Pro', src: '/assets/badges/inv.png', level: 'Advanced' },
        { name: 'Fusion 360', src: '/assets/badges/fus.png', level: 'Advanced' },
        { name: 'Workshop XR', src: '/assets/badges/xr.png', level: 'Advanced' },
        { name: 'Maya', src: '/assets/badges/maya.png', level: 'Advanced' },
        { name: '3ds Max', src: '/assets/badges/3dsmax.png', level: 'Advanced' },
        { name: 'Alias', src: '/assets/badges/ast.png', level: 'Advanced' },
        { name: 'Forma', src: '/assets/badges/forma.png', level: 'Advanced' },
        { name: 'Blender', src: '/assets/badges/blender.png', level: 'Advanced' },
        { name: 'Tekla', src: '/assets/badges/tekla.png', level: 'Advanced' },
        { name: 'Rhino', src: '/assets/badges/rhino.png', level: 'Advanced' },
        { name: 'Sketchup', src: '/assets/badges/sketchup.png', level: 'Advanced' },
        { name: 'Solidworks', src: '/assets/badges/sw.png', level: 'Advanced' },
        { name: 'Google Earth Pro', src: '/assets/badges/earth-pro.png', level: 'Advanced' },
        { name: 'Sitescan ArcGIS', src: '/assets/badges/sitescan-arcgis.png', level: 'Advanced' },
        { name: 'D5 Render', src: '/assets/badges/d5-render.png', level: 'Advanced' },
        { name: 'Enscape', src: '/assets/badges/enscape.png', level: 'Advanced' },
        { name: 'Lumion', src: '/assets/badges/lumion.png', level: 'Advanced' },
        { name: 'Dynamo', src: '/assets/badges/dynamo.png', level: 'Advanced' },
        { name: 'Grasshopper', src: '/assets/badges/grasshpper.png', level: 'Advanced' },
        { name: 'Revit API', src: '/assets/badges/revit-api.png', level: 'Advanced' },
        { name: 'C#', src: '/assets/badges/csharp.png', level: 'Advanced' },
        { name: 'html', src: '/assets/badges/html.png', level: 'Advanced' },
        { name: 'Java', src: '/assets/badges/java.png', level: 'Advanced' },
        { name: 'Python', src: '/assets/badges/python.png', level: 'Advanced' },
        { name: 'SQL', src: '/assets/badges/sql.png', level: 'Advanced' },
        { name: 'iTwins', src: '/assets/badges/itwins.png', level: 'Advanced' },
        { name: 'Microstation', src: '/assets/badges/microstation.png', level: 'Advanced' },
        { name: 'Synchro Pro 4D', src: '/assets/badges/sychpro.png', level: 'Advanced' },
        { name: 'Ideate Software', src: '/assets/badges/ideate.png', level: 'Advanced' },
        { name: 'pyRevit', src: '/assets/badges/pyrevit.png', level: 'Advanced' },
        { name: 'Photoshop', src: '/assets/badges/ps.png', level: 'Advanced' },
        { name: 'Premiere Pro', src: '/assets/badges/pr.png', level: 'Advanced' },
        { name: 'Illustrator', src: '/assets/badges/ai.png', level: 'Advanced' },
        { name: 'After Effects', src: '/assets/badges/ae.png', level: 'Advanced' },
        { name: 'Microsoft Suites', src: '/assets/badges/microsoft.png', level: 'Advanced' },
        { name: 'PowerBI', src: '/assets/badges/powerbi.png', level: 'Advanced' },
        // add the rest...***FIX AND UPDATE!!!!!
    ];
    const companies = [
        { name: 'Ardurra', src: '/assets/logos/ardurra.png' },
        { name: 'Axiom', src: '/assets/logos/axiom.png' },
        { name: 'BSB Design', src: '/assets/logos/bsb-design.png' },
        { name: 'CSA Group', src: '/assets/logos/csa-group.png' },
        { name: 'Farnsworth Group', src: '/assets/logos/farnsworth-group.png' },
        { name: 'Fluor', src: '/assets/logos/fluor.png' },
        { name: 'Ghafari', src: '/assets/logos/ghafari.png' },
        { name: 'ICC', src: '/assets/logos/icc.png' },
        { name: 'LAFP', src: '/assets/logos/lafp.png' },
        { name: 'Luchini Trujillo SE', src: '/assets/logos/luchini-trujillo-se.png' },
        { name: 'MKA', src: '/assets/logos/mka.png' },
        { name: 'Ponce Fuess SE', src: '/assets/logos/ponce-fuess-se.png' },
        { name: 'Select Structural', src: '/assets/logos/select-structural.png' },
        { name: 'Tesla', src: '/assets/logos/tesla.png' },
        { name: 'TK Architects International', src: '/assets/logos/tk-architects-international.png' },
        { name: 'Wade Trim', src: '/assets/logos/wade-trim.png' },
        // add the rest...
    ];
    const testimonials = [
        { quote: "Curtis delivered a pyRevit suite that instantly saved our team hours every week.", author: "PM, Industrial Project (confidential)" },
        { quote: "The analysis handoff stopped round-trip data loss. Our engineers trust the pipeline now.", author: "Structural Lead, Life Sciences" },
        { quote: "Dashboard made coordination transparent—aging clashes dropped 47% in two sprints.", author: "VDC Director, Manufacturing" },
    ];
    // Services scroller
    const servicesRef = useRef(null);
    const scrollServices = (dir) => servicesRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
    // Hero visibility
    const heroRef = useRef(null);
    const heroVideoRef = useRef(null);
    const [heroReady, setHeroReady] = useState(false);
    const [heroVisible, setHeroVisible] = useState(false);
    useEffect(() => {
        const node = heroRef.current;
        if (!node)
            return;
        const io = new IntersectionObserver((entries) => setHeroVisible(entries[0]?.isIntersecting ?? false), { threshold: 0.5 });
        io.observe(node);
        return () => io.disconnect();
    }, []);
    useEffect(() => {
        const v = heroVideoRef.current;
        if (!v)
            return;
        if (canAutoplay && HAS_VIDEO_SOURCES && heroVisible)
            v.play().catch(() => { });
        else
            v.pause();
    }, [canAutoplay, HAS_VIDEO_SOURCES, heroVisible]);
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "min-h-screen bg-neutral-950 text-neutral-100 antialiased", children: [_jsx(SkipToContent, {}), (() => {
                    const { title, description, image } = getSeoForRoute(route);
                    return _jsx(SEO, { title: title, description: description, image: image });
                })(), _jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) } }), _jsx("header", { className: "sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-white/10", children: _jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-18 md:h-20 flex items-center justify-between", children: [_jsxs("a", { href: "/", "aria-label": "CB Design Consultants \u2014 Home", className: "flex items-center gap-3", children: [_jsx("img", { src: "/assets/brand/co-logo-white.png", alt: "CB Design Consultants", className: "h-9 w-auto md:h-10 select-none", loading: "eager", decoding: "async" }), _jsx("span", { className: "sr-only", children: "CB Design Consultants" })] }), _jsxs("nav", { className: "hidden md:flex items-center gap-8 text-sm", children: [[
                                        { href: "/", label: "Home" },
                                        { href: "/work", label: "Work" },
                                        { href: "/services", label: "Services" },
                                        { href: "/tools", label: "Tools" },
                                        { href: "/about", label: "About" },
                                        { href: "/contact", label: "Contact" },
                                    ].map((link) => {
                                        const active = isActive(link.href, route);
                                        return (_jsx(NavLink, { href: link.href, "aria-current": active ? "page" : undefined, className: active
                                                ? "text-white font-medium underline underline-offset-4"
                                                : "hover:text-white/90 text-white/70", children: link.label }, link.href));
                                    }), _jsx("a", { href: "/contact", className: "rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10 transition", children: "Book a consult" })] })] }) }), _jsxs("main", { id: "main", ref: mainRef, tabIndex: -1, className: "outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500", children: [route === "home" && (_jsxs(_Fragment, { children: [_jsxs("section", { ref: heroRef, "data-reveal": true, className: "relative overflow-hidden bg-grid min-h-[86vh] flex items-center", children: [_jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 md:h-80 bg-gradient-to-b from-transparent via-transparent to-black/80" }), _jsxs("div", { className: "relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:px-8 md:grid-cols-12", children: [_jsxs("div", { className: "md:col-span-6", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-white/60", children: "Structural BIM \u2022 Dev \u2022 Automation" }), _jsx("h1", { className: "mt-4 text-4xl/tight font-semibold md:text-6xl/tight", children: "Structural BIM + Automation that saves hours." }), _jsx("p", { className: "mt-5 max-w-2xl text-lg text-white/80", children: "Revit tooling, analysis handoffs, and dashboards that cut friction\u2014pyRevit/C# scripts, data pipelines, and QA/QC checks that teams actually use." }), _jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [_jsx("a", { href: "/contact", className: "inline-flex items-center rounded-2xl bg-white px-5 py-3 font-medium text-neutral-900 transition hover:opacity-90", children: "Book a 15-min consult" }), _jsx("a", { href: "/work", className: "inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 font-medium transition hover:bg-white/10", children: "See case studies" })] })] }), _jsxs("div", { className: "relative md:col-span-6", children: [_jsxs("div", { className: "relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl md:scale-[1.15] md:translate-x-3 md:-translate-y-1", children: [canAutoplay && HAS_VIDEO_SOURCES ? (_jsxs("video", { ref: heroVideoRef, className: `absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${heroReady ? "opacity-100" : "opacity-0"}`, autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto", poster: HERO_POSTER_SRC || undefined, onCanPlay: () => setHeroReady(true), children: [HERO_VIDEO_SRC_MOBILE && (_jsx("source", { src: HERO_VIDEO_SRC_MOBILE, media: "(max-width: 767px)", type: "video/mp4" })), (HERO_VIDEO_SRC_DESKTOP || HERO_VIDEO_SRC) && (_jsx("source", { src: HERO_VIDEO_SRC_DESKTOP || HERO_VIDEO_SRC, type: "video/mp4" }))] })) : (_jsx("img", { src: HERO_POSTER_SRC, alt: "Portfolio trailer preview", className: "absolute inset-0 h-full w-full object-cover" })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" }), _jsx("div", { className: "pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" })] }), _jsx("div", { className: "absolute -bottom-2 left-1/2 -translate-x-1/2 text-white/60 text-xs animate-bounce", children: "\u2193 Scroll" })] })] })] }), _jsxs("section", { id: "services", "data-reveal": true, "data-delay": "120ms", className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16", children: [_jsxs("div", { className: "flex items-end justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl md:text-3xl font-semibold", children: "Productized Services" }), _jsx("p", { className: "text-white/70 mt-2", children: "Clear scope, timeline, and deliverables focused on outcomes." })] }), _jsx("a", { href: "/services", className: "text-sm rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10", children: "View all" })] }), _jsxs("div", { className: "relative mt-6", children: [_jsx("div", { className: "absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden md:block", children: _jsx("button", { onClick: () => scrollServices(-1), className: "rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20", children: "\u2039" }) }), _jsx("div", { className: "absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:block", children: _jsx("button", { onClick: () => scrollServices(1), className: "rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20", children: "\u203A" }) }), _jsx("div", { ref: servicesRef, className: "mt-2 flex gap-6 overflow-hidden snap-x snap-mandatory pb-2 hide-scrollbar", children: services.map((s) => (_jsxs("div", { className: "snap-start shrink-0 w-[320px] rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("h3", { className: "font-semibold text-lg", children: s.name }), _jsx("span", { className: "text-xs text-white/60", children: s.time })] }), _jsx("ul", { className: "mt-4 space-y-2 text-sm text-white/80", children: s.bullets.map((b) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "mt-1 h-1.5 w-1.5 rounded-full bg-white/60" }), b] }, b))) }), _jsxs("div", { className: "mt-6 flex items-center justify-between", children: [_jsx("span", { className: "text-white/90 font-medium", children: s.price }), _jsx("a", { href: "/contact", className: "rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10", children: "Start" })] })] }, s.name))) })] })] }), _jsx("section", { id: "about", "data-reveal": true, "data-delay": "240ms", className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-center", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl md:text-3xl font-semibold", children: "About" }), _jsx("p", { className: "mt-4 text-white/80", children: "I\u2019m Curtis Bolden, a Structural BIM/VDC specialist and developer. I create reliable tools and workflows that help teams deliver faster with fewer RFIs." }), _jsx("a", { href: "/about", className: "mt-6 inline-flex text-sm rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10", children: "Open full About \u2192" })] }), _jsxs("div", { className: "relative", children: [_jsx("img", { src: "/headshots/curtis.png", alt: "Curtis Bolden headshot", className: "aspect-square rounded-3xl border border-white/10 object-cover object-top w-full bg-black/20", loading: "eager", decoding: "async", onError: (e) => {
                                                            const box = e.currentTarget.parentElement;
                                                            if (box) {
                                                                box.innerHTML = "";
                                                                box.className =
                                                                    "relative aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-400/20 to-indigo-400/20";
                                                            }
                                                        } }), _jsx("div", { className: "absolute -bottom-6 -left-6 w-40 h-28 rounded-xl border border-white/20 bg-white/10" })] })] }) }), _jsx(TestimonialsCarousel, { items: testimonials }), _jsx("section", { id: "contact", "data-reveal": true, "data-delay": "360ms", className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-semibold", children: "Let\u2019s get you hours back every week." }), _jsx("p", { className: "text-white/80 mt-2", children: "Short discovery call \u2192 scoped plan \u2192 delivery you can measure." })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("a", { href: "/contact", className: "rounded-2xl bg-white text-neutral-900 px-5 py-3 font-medium hover:opacity-90", children: "Book consult" }), _jsx("a", { href: "mailto:curtis@example.com", className: "rounded-2xl border border-white/20 px-5 py-3 font-medium hover:bg-white/10", children: "Email me" })] })] }) })] })), route !== "home" && (_jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20", children: [route === "work" && _jsx(WorkPage, {}), route.startsWith("work:") && route !== "work" && (_jsx(WorkDetail, { slug: route.split(":")[1] })), route === "contact" && _jsx(ContactPage, {}), route === "services" && (_jsxs(_Fragment, { children: [_jsx("h1", { className: "text-3xl md:text-4xl font-semibold", children: "Services" }), _jsx("p", { className: "text-white/70 mt-2 max-w-2xl", children: "Clear scope, timelines, and deliverables focused on measurable outcomes." }), _jsx("div", { className: "mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((s) => (_jsx(ServiceCard, { service: s }, s.name))) })] })), route === "about" && (_jsxs(_Fragment, { children: [_jsx("h1", { className: "text-3xl md:text-4xl font-semibold", children: "About" }), _jsx("p", { className: "text-white/70 mt-2 max-w-2xl", children: "Bio, skills, and companies I\u2019ve contributed to." }), _jsx(AboutTabs, { toolLogos: toolLogos, companies: companies })] })), route === "tools" && (_jsxs(_Fragment, { children: [_jsx("h1", { className: "text-3xl md:text-4xl font-semibold", children: "Tools" }), _jsx("div", { className: "mt-4 text-white/70", children: "pyRevit/Dynamo tools, exporters, and validators \u2014 catalog coming soon." })] }))] }))] }), _jsx(Footer, {})] }) }));
}
/* ========================== Subcomponents ================================ */
function TestimonialsCarousel({ items }) {
    const [index, setIndex] = useState(0);
    const [hover, setHover] = useState(false);
    useEffect(() => {
        if (hover)
            return;
        const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
        return () => clearInterval(id);
    }, [hover, items.length]);
    return (_jsx("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16", children: _jsx("div", { className: "rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10", onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), children: _jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx("button", { "aria-label": "Previous", className: "rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10", onClick: () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1)), children: "\u2039" }), _jsxs("div", { className: "flex-1", children: [_jsxs("p", { className: "text-lg md:text-xl italic text-white/90 text-center max-w-4xl mx-auto", children: ["\u201C", items[index].quote, "\u201D"] }), _jsxs("div", { className: "mt-4 text-white/70 text-sm text-center", children: ["\u2014 ", items[index].author] }), _jsx("div", { className: "mt-6 flex items-center justify-center gap-2", children: items.map((_, i) => (_jsx("button", { onClick: () => setIndex(i), className: `h-1.5 w-6 rounded-full ${i === index ? "bg-white" : "bg-white/30 hover:bg-white/50"}` }, i))) })] }), _jsx("button", { "aria-label": "Next", className: "rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10", onClick: () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1)), children: "\u203A" })] }) }) }));
}
function AboutTabs({ toolLogos, companies }) {
    const [which, setWhich] = useState("bio");
    return (_jsxs("div", { className: "mt-6", children: [_jsx("div", { className: "flex flex-wrap gap-2", children: ["bio", "skills", "companies"].map((k) => (_jsx("button", { onClick: () => setWhich(k), className: `rounded-xl border px-3 py-2 text-sm ${which === k ? "bg-white text-neutral-900" : "border-white/15 text-white/80 hover:bg-white/10"}`, children: k[0].toUpperCase() + k.slice(1) }, k))) }), which === "bio" && _jsx(BioBlock, {}), which === "skills" && _jsx(SkillsBlock, { toolLogos: toolLogos }), which === "companies" && _jsx(CompaniesBlock, { companies: companies })] }));
}
function BioBlock() {
    return (_jsxs("div", { className: "mt-6 grid md:grid-cols-2 gap-10 items-start", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold", children: "Bio" }), _jsx("p", { className: "mt-3 text-white/80", children: "I\u2019m Curtis Bolden, a Structural BIM/VDC specialist and developer. I build pyRevit/C# tooling, dynamo graphs, and analysis handoffs that reduce friction and create measurable outcomes for project teams." }), _jsx("div", { className: "mt-4 grid grid-cols-2 gap-3 text-sm", children: ["10+ yrs AEC/BIM", "pyRevit/C# dev", "Analysis handoffs", "Dashboards & QA/QC"].map((k) => (_jsx("div", { className: "rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3", children: k }, k))) })] }), _jsxs("div", { className: "relative", children: [_jsx("img", { src: "/headshots/curtis.png", alt: "Curtis Bolden", className: "aspect-square w-full rounded-3xl border border-white/10 bg-black/20 object-cover object-[50%_18%] md:object-[50%_2%]", loading: "lazy", onError: (e) => {
                            const box = e.currentTarget.parentElement;
                            if (box) {
                                box.innerHTML = "";
                                box.className =
                                    "relative aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-400/20 to-indigo-400/20";
                            }
                        } }), _jsx("div", { className: "absolute -bottom-6 -left-6 w-40 h-28 rounded-xl border border-white/20 bg-white/10" })] })] }));
}
function SkillsBlock({ toolLogos }) {
    return (_jsxs("div", { className: "mt-6", children: [_jsx("div", { className: "text-xs uppercase tracking-wider text-white/60", children: "Software" }), _jsx("div", { className: "mt-3 flex gap-3 overflow-x-auto hide-scrollbar pb-1", style: { WebkitOverflowScrolling: "touch" }, children: toolLogos.slice(0, 14).map((t) => (_jsxs("span", { className: "shrink-0 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2", children: [_jsx("span", { className: "h-5 w-5 rounded-md overflow-hidden bg-white/10 flex items-center justify-center", children: t.src ? (_jsx("img", { src: t.src, alt: t.name, className: "h-5 w-5 object-contain", onError: (e) => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.parentElement.textContent = t.name[0];
                                } })) : (_jsx("span", { className: "text-[11px]", children: t.name[0] })) }), _jsx("span", { className: "text-xs text-white/85", children: t.name })] }, t.name))) }), _jsx("div", { className: "mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6", children: _jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4", children: toolLogos.map((t) => (_jsxs("div", { className: "group rounded-xl border border-white/10 bg-white/[0.02] p-3 flex flex-col items-center justify-center hover:bg-white/10 transition", children: [_jsx("div", { className: "h-10 w-10 rounded-md overflow-hidden bg-white/10 flex items-center justify-center", children: t.src ? (_jsx("img", { src: t.src, alt: t.name, className: "h-10 w-10 object-contain", onError: (e) => {
                                        e.currentTarget.style.display = "none";
                                        e.currentTarget.parentElement.textContent = t.name[0];
                                    } })) : (_jsx("span", { className: "text-sm", children: t.name[0] })) }), _jsx("div", { className: "mt-2 text-[11px] text-center text-white/70 leading-tight", children: t.name })] }, t.name))) }) })] }));
}
function CompaniesBlock({ companies }) {
    return (_jsxs("div", { className: "mt-6", children: [_jsx("div", { className: "text-xs uppercase tracking-wider text-white/60", children: "Companies" }), _jsx("div", { className: "mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: companies.map((c) => (_jsx("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-center", children: c.src ? _jsx("img", { src: c.src, alt: c.name, className: "h-10 object-contain" }) : _jsx("span", { className: "text-sm text-white/80", children: c.name }) }, c.name))) })] }));
}
function ServiceCard({ service }) {
    return (_jsxs("div", { className: "rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("h3", { className: "font-semibold text-lg", children: service.name }), _jsx("span", { className: "text-xs text-white/60", children: service.time })] }), _jsx("ul", { className: "mt-4 space-y-2 text-sm text-white/80", children: service.bullets.map((b) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "mt-1 h-1.5 w-1.5 rounded-full bg-white/60" }), b] }, b))) }), _jsxs("div", { className: "mt-6 flex items-center justify-between", children: [_jsx("span", { className: "text-white/90 font-medium", children: service.price }), _jsx("a", { href: "/contact", className: "rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10", children: "Start" })] })] }));
}
