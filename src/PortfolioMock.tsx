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
import { WORK } from "./data/work";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import ServicesPage from "@/pages/Services";
import Lightbox from "@/components/Lightbox";
import LazyImage from "@/components/LazyImage";
import QuoteDrawer from "@/components/QuoteDrawer";
import { useQuote } from "@/context/QuoteContext";

/* -------------------- ErrorBoundary -------------------- */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: unknown) {
    console.error("App crashed:", err);
  }
  render() {
  if (this.state.hasError) {
    return (
      <div style={{
        background: "#0a0a0a",
        color: "#fff",
        minHeight: "100vh",
        padding: 24,
        fontFamily: "ui-sans-serif, system-ui"
      }}>
        <h2 style={{fontSize: 20, marginBottom: 8}}>Something went wrong.</h2>
        <p>Open DevTools → Console for details.</p>
      </div>
    );
  }
  return this.props.children;

  }
}

/* ---------------- SPA NavLink (keeps it a single-page app) --------------- */
function NavLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      onClick={(e) => {
        const href = e.currentTarget.getAttribute("href") || "";
        if (href.startsWith("/")) {
          e.preventDefault();
          history.pushState(null, "", href);
          window.dispatchEvent(new PopStateEvent("popstate"));
        }
      }}
    />
  );
}

// Helper: decides if a link is "active" based on current route
function isActive(href: string, route: RouteKey) {
  if (href === "/") return route === "home";
  if (href === "/work") return route === "work" || route.startsWith("work:");
  if (href === "/services") return route === "services";
  if (href === "/tools") return route === "tools";
  if (href === "/about") return route === "about";
  if (href === "/contact") return route === "contact";
  return false;
}

/* ----------------------------- Types ------------------------------------- */
type TabKey = "model" | "drawings" | "gallery" | "video";
type RouteKey =
  | "home"
  | "work"
  | "services"
  | "tools"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "notfound"
  | "work:pyrevit"
  | `work:${string}`;

type ToolLogo = {
  name: string;
  src?: string;
  group?: string;
  years?: number;
  level?: "Expert" | "Advanced" | "Intermediate";
};
type CompanyLogo = { name: string; src?: string };

/* =============================== APP ===================================== */
export default function AppShell() {
  // Router state (single instance)
  const [route, setRoute] = useState<RouteKey>("home");
  const { lines, setOpen } = useQuote();

  // Scroll-to-top + focus target
const mainRef = useRef<HTMLElement | null>(null);

useEffect(() => {
  // when route changes, go to top and move focus to main for screen readers
  queueMicrotask(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    mainRef.current?.focus({ preventScroll: true });
  });
}, [route]);

// Compute SEO for current route
function getSeoForRoute(route: RouteKey) {
  // Default
  let title = "CB Design Consultants — Structural BIM • Dev • Automation";
  let description =
    "Structural BIM/VDC + automation: pyRevit/C# tools, analysis handoffs, and dashboards that save teams hours.";
  let image = "/thumbnail.jpg";

  if (route === "home") {
    // keep defaults or customize
  } else if (route === "work") {
    title = "Work — Case Studies | CB Design Consultants";
    description = "Selected projects with measurable outcomes in BIM automation, analysis handoffs, and coordination.";
  } else if (route.startsWith("work:")) {
  const slug = route.split(":")[1];
  const item = WORK.find(w => w.slug === slug);
  title = `${item?.title ?? slug.replace(/-/g, " ")} — Case Study | CB Design Consultants`;
  description = item?.summary ?? "Project details, outcomes, and lessons learned.";
  image = item?.og ?? "/thumbnail.jpg";
  } else if (route === "services") {
    title = "Services — Productized BIM/Dev | CB Design Consultants";
    description = "Clear scope and deliverables: automation sprints, Revit↔Analysis sync, dashboards, and more.";
  } else if (route === "tools") {
    title = "Tools — pyRevit, Dynamo, Exporters | CB Design Consultants";
    description = "Reusable tools and validators that reduce manual work and prevent data loss.";
  } else if (route === "about") {
    title = "About — Curtis Bolden | CB Design Consultants";
    description = "Structural BIM/VDC specialist and developer—skills, background, and companies supported.";
  } else if (route === "contact") {
    title = "Contact — Book a Consult | CB Design Consultants";
    description = "Quick discovery call to map problems → outcomes. Let’s get you hours back every week.";
  } else if (route === "privacy") {
  title = "Privacy Policy | CB Design Consultants";
  description = "How we handle personal data, cookies, analytics, and your rights.";
  } else if (route === "terms") {
    title = "Terms of Service | CB Design Consultants";
    description = "Service scope, IP, payment, and legal terms for working together.";
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
  const [tab, setTab] = useState<TabKey>("model");

  // Hero media
  const HERO_VIDEO_SRC = "/hero/hero-video.mp4";
  const HERO_VIDEO_SRC_DESKTOP = "/hero/hero-video.mp4";
  const HERO_VIDEO_SRC_MOBILE = "/hero/trailer-720.mp4";
  const HERO_POSTER_SRC = "/thumbnail.jpg";
  const HAS_VIDEO_SOURCES = Boolean(
    HERO_VIDEO_SRC || HERO_VIDEO_SRC_DESKTOP || HERO_VIDEO_SRC_MOBILE
  );

  // Respect user motion / data settings
  const [canAutoplay, setCanAutoplay] = useState(true);
  useEffect(() => {
    try {
      const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
      const reduced = !!mql?.matches;
      const conn: any = (navigator as any).connection || {};
      const saveData = !!conn.saveData;
      const slow = ["slow-2g", "2g"].includes(conn.effectiveType);
      setCanAutoplay(!(reduced || saveData || slow));
    } catch {
      setCanAutoplay(true);
    }
  }, []);

  // Router (path-based with graceful #/about → /about migration)
useEffect(() => {
  const parse = () => {
    // 1) migrate hash routes like #/about → /about
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("/")) history.replaceState(null, "", hash);

    // 2) get pathname once
    const p = window.location.pathname;
    if (p.startsWith("/privacy"))  return setRoute("privacy");
    if (p.startsWith("/terms"))    return setRoute("terms");


    // 3) route matching (order matters)
    if (!p || p === "/") {
      setRoute("home");
      return;
    }

    // /work/:slug (detail pages)
    if (p.startsWith("/work/")) {
      const slug = p.split("/")[2] || "";
      if (slug === "pyrevit-sheet-suite") setRoute("work:pyrevit");
      else setRoute(`work:${slug}` as RouteKey);
      return;
    }

    // top-level sections
    if (p.startsWith("/work"))     return setRoute("work");
    if (p.startsWith("/services")) return setRoute("services");
    if (p.startsWith("/tools"))    return setRoute("tools");
    if (p.startsWith("/about"))    return setRoute("about");
    if (p.startsWith("/contact"))  return setRoute("contact");

    // explicit /404 → notfound
    if (p === "/404") return setRoute("notfound");

    // fallback
    setRoute("notfound");
  };

  parse();
  window.addEventListener("popstate", parse);
  return () => window.removeEventListener("popstate", parse);
}, []);

  // Data — services / tools / companies / testimonials
  const services = [
  {
    name: "BIM Automation Sprint",
    time: "2 weeks",
    price: "from $4,800",
    bullets: [
      "Backlog audit → priority scoring",
      "Ship 1–2 pyRevit/Dynamo tools with docs",
      "Loom walkthroughs + handoff"
    ]
  },
  {
    name: "Revit ↔ Analysis Sync",
    time: "4–6 weeks",
    price: "from $8,500",
    bullets: [
      "Exporter/validator design with round-trip checks",
      "Parameter maps + guardrails to prevent data loss",
      "Pilot integration on a live project"
    ]
  },
  {
    name: "Coordination Dashboard",
    time: "3–4 weeks",
    price: "from $6,500",
    bullets: [
      "Clash/issue KPI design (aging buckets)",
      "Model health signals (discipline/area)",
      "Power BI delivery + refresh schedule"
    ]
  },
  {
    name: "Model Health Audit & Standards",
    time: "2 weeks",
    price: "from $3,800",
    bullets: [
      "Views/sheets/families audit",
      "Naming & parameter standards",
      "Fix list + quick wins"
    ]
  },
  {
    name: "Revit Family Library Build",
    time: "3–5 weeks",
    price: "from $7,200",
    bullets: [
      "Parametric families + type catalogs",
      "QA checklist + sample sheets",
      "Documentation & training"
    ]
  }
];

  const toolLogos: ToolLogo[] = [
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
  ];

  const companies: CompanyLogo[] = [
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
  ];

  const testimonials = [
    { quote: "Curtis delivered a pyRevit suite that instantly saved our team hours every week.", author: "PM, Industrial Project (confidential)" },
    { quote: "The analysis handoff stopped round-trip data loss. Our engineers trust the pipeline now.", author: "Structural Lead, Life Sciences" },
    { quote: "Dashboard made coordination transparent—aging clashes dropped 47% in two sprints.", author: "VDC Director, Manufacturing" },
  ];

// --- Education & Certifications data ---------------------------------------
  const EDUCATION = [
    {
      school: "Western Governors University (WGU)",
      program: "B.S. Computer Science (ABET)",
      dates: "In progress",
      notes: "Focus: software engineering, data structures, algorithms",
    },
    {
      school: "Professional Development (AEC/BIM)",
      program: "Structural/BIM specialization",
      dates: "2013–Present",
      notes: "Industry courses, on-the-job training, and independent study",
    },
  ];

  const CERTS = [
    { name: "Series 65 (Planned)", org: "NASAA / State", status: "Studying" },
    { name: "CSCP (Planned)", org: "APICS / ASCM", status: "Studying" },
    { name: "CLTD (Planned)", org: "APICS / ASCM", status: "Studying" },
    { name: "CSSGB (Planned)", org: "ASQ", status: "Studying" },
  ];

  // Services scroller
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const scrollServices = (dir: number) =>
    servicesRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  // Hero visibility
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [heroReady, setHeroReady] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => setHeroVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.5 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    if (canAutoplay && HAS_VIDEO_SOURCES && heroVisible) v.play().catch(() => {});
    else v.pause();
  }, [canAutoplay, HAS_VIDEO_SOURCES, heroVisible]);

   return (
    <ErrorBoundary>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <SkipToContent />
        {/* Route-aware SEO */}
        {(() => {
          const { title, description, image } = getSeoForRoute(route);
          return <SEO title={title} description={description} image={image} />;
        })()}
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-18 md:h-20 flex items-center justify-between">
            {/* Brand/logo */}
            <a href="/" aria-label="CB Design Consultants — Home" className="flex items-center gap-3">
              <img
                src="/assets/brand/co-logo-white.png"
                alt="CB Design Consultants"
                className="h-9 w-auto md:h-10 select-none"
                loading="eager"
                decoding="async"
              />
              <span className="sr-only">CB Design Consultants</span>
            </a>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/work", label: "Work" },
                { href: "/services", label: "Services" },
                { href: "/tools", label: "Tools" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => {
                const active = isActive(link.href, route);
                return (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "text-white font-medium underline underline-offset-4"
                        : "hover:text-white/90 text-white/70"
                    }
                  >
                    {link.label}
                  </NavLink>
                );
              })}

              <button
                onClick={() => setOpen(true)}
                className="ml-3 rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
                aria-label={`Open cart (${lines.length} selected)`}
              >
                Cart • {lines.length}
              </button>

              <a
                href="/contact"
                className="rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10 transition"
              >
                Book a consult
              </a>
            </nav>
          </div>
        </header>

      {/* 👇 main wrapper for content */}
      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className="outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
      >

{/* HOME */}
{route === "home" && (
  <>
    {/* HERO */}
    <section ref={heroRef} data-reveal className="relative overflow-hidden bg-grid min-h-[86vh] flex items-center">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 md:h-80 bg-gradient-to-b from-transparent via-transparent to-black/80" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:px-8 md:grid-cols-12">
        {/* LEFT */}
        <div className="md:col-span-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Structural BIM • Dev • Automation</p>
          <h1 className="mt-4 text-4xl/tight font-semibold md:text-6xl/tight">
            BIM automation and structural workflows that save hours every week.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            I design tools and workflows that teams actually use: pyRevit/C# scripts, Revit→Power BI data pipelines,
            and clean handoffs to analysis. Fewer RFIs, faster submittals, better visibility.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contact" className="inline-flex items-center rounded-2xl bg-white px-5 py-3 font-medium text-neutral-900 transition hover:opacity-90" onClick={()=>{
              try{ window.plausible?.("Book consult (Hero)"); }catch{}
            }}>
              Book a 15-min consult
            </a>
            <a href="/work" className="inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 font-medium transition hover:bg-white/10">
              See case studies
            </a>
          </div>
        </div>

        {/* RIGHT: video */}
        <div className="relative md:col-span-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl md:scale-[1.15] md:translate-x-3 md:-translate-y-1">
            {canAutoplay && HAS_VIDEO_SOURCES ? (
              <video
                ref={heroVideoRef}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${heroReady ? "opacity-100" : "opacity-0"}`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={HERO_POSTER_SRC || undefined}
                onCanPlay={() => setHeroReady(true)}
              >
                {HERO_VIDEO_SRC_MOBILE && (
                  <source src={HERO_VIDEO_SRC_MOBILE} media="(max-width: 767px)" type="video/mp4" />
                )}
                {(HERO_VIDEO_SRC_DESKTOP || HERO_VIDEO_SRC) && (
                  <source src={HERO_VIDEO_SRC_DESKTOP || HERO_VIDEO_SRC} type="video/mp4" />
                )}
              </video>
            ) : (
              <img src={HERO_POSTER_SRC} alt="Portfolio trailer preview" className="absolute inset-0 h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-white/60 text-xs animate-bounce">↓ Scroll</div>
        </div>
      </div>
    </section>

    {/* SERVICES */}
    <section id="services" data-reveal data-delay="120ms" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Productized Services</h2>
          <p className="text-white/70 mt-2">Clear scope, timeline, and deliverables focused on outcomes.</p>
        </div>
        <a href="/services" className="text-sm rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10">View all</a>
      </div>

      <div className="relative mt-6">
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <button onClick={() => scrollServices(-1)} className="rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20">
            ‹
          </button>
        </div>
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <button onClick={() => scrollServices(1)} className="rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20">
            ›
          </button>
        </div>

        {/* no user-scrollbar; only side buttons */}
        <div ref={servicesRef} className="mt-2 flex gap-6 overflow-hidden snap-x snap-mandatory pb-2 hide-scrollbar">
          {services.map((s) => (
            <div key={s.name} className="snap-start shrink-0 w-[320px] rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-lg">{s.name}</h3>
                <span className="text-xs text-white/60">{s.time}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-white/90 font-medium">{s.price}</span>
                <a href="/contact" className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10">Start</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ABOUT TEASER (with headshot) */}
    <section id="about" data-reveal data-delay="240ms" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">About</h2>
          <p className="mt-4 text-white/80">
            I’m Curtis Bolden, a Structural BIM/VDC specialist and developer. I create reliable tools and
            workflows that help teams deliver faster with fewer RFIs.
          </p>
          <a href="/about" className="mt-6 inline-flex text-sm rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10">
            Open full About →
          </a>
        </div>

        {/* Headshot box */}
        <div className="relative">
          <img
            src="/headshots/curtis.png"
            alt="Curtis Bolden headshot"
            className="aspect-square rounded-3xl border border-white/10 object-cover object-top w-full bg-black/20"
            loading="eager"
            decoding="async"
            onError={(e) => {
              const box = e.currentTarget.parentElement;
              if (box) {
                box.innerHTML = "";
                box.className =
                  "relative aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-400/20 to-indigo-400/20";
              }
            }}
          />
          <div className="absolute -bottom-6 -left-6 w-40 h-28 rounded-xl border border-white/20 bg-white/10" />
        </div>
      </div>
    </section>

    <TestimonialsCarousel items={testimonials} />

    {/* CONTACT CTA */}
    <section id="contact" data-reveal data-delay="360ms" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold">Let’s get you hours back every week.</h3>
          <p className="text-white/80 mt-2">Short discovery call → scoped plan → delivery you can measure.</p>
        </div>
        <div className="flex gap-3">
          <a href="/contact" className="rounded-2xl bg-white text-neutral-900 px-5 py-3 font-medium hover:opacity-90">Book consult</a>
          <a href="mailto:cbolden@cb-designconsultants.com" className="rounded-2xl border border-white/20 px-5 py-3 font-medium hover:bg-white/10">
            Email me
          </a>
        </div>
      </div>
    </section>
  </>
)}

{/* NON-HOME ROUTES */}
{route !== "home" && (
  <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
    {route === "work" && <WorkPage />}

    {route.startsWith("work:") && route !== "work" && (
      <WorkDetail slug={route.split(":")[1]} />
    )}

    {route === "contact" && <ContactPage />}
    {route === "privacy" && <PrivacyPage />}
    {route === "terms" && <TermsPage />}
    {route === "notfound" && (
      <>
        <SEO
          title="Page Not Found | CB Design Consultants"
          description="The page you’re looking for doesn’t exist."
          image="/thumbnail.jpg"
        />
        <NotFound />
      </>
    )}
    {route === "services" && (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "BIM Automation Sprint",
              "provider": { "@type": "Organization", "name": "CB Design Consultants" },
              "areaServed": "US",
              "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "4800" }
            })
          }}
        />
        <ServicesPage services={services} />
      </>
    )}

        {route === "about" && (
      <>
        <h1 className="text-3xl md:text-4xl font-semibold">About</h1>
        <p className="text-white/70 mt-2 max-w-2xl">
          Bio, skills, and companies I’ve contributed to.
        </p>

        {/* CTA buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/docs/Curtis_Bolden_Resume.pdf"
            download
            className="rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10"
          >
            Résumé (PDF)
          </a>
          <a
            href="/docs/CB-Design-Consultants_Portfolio.pdf"
            download
            className="rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10"
          >
            Portfolio (PDF)
          </a>
          <a
            href="/docs/CB-Design-Consultants_Brochure.pdf"
            download
            className="rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10"
          >
            Brochure (PDF)
          </a>
          {/* Future: <a href="/resume-builder" className="rounded-xl bg-white text-neutral-900 px-4 py-2 font-medium hover:opacity-90">Custom Résumé Builder</a> */}
        </div>

        <AboutTabs
          toolLogos={toolLogos}
          companies={companies}
          education={EDUCATION}
          certs={CERTS}
        />
      </>
    )}

    {route === "tools" && (
      <>
        <h1 className="text-3xl md:text-4xl font-semibold">Tools</h1>
        <div className="mt-4 text-white/70">
          pyRevit/Dynamo tools, exporters, and validators — catalog coming soon.
        </div>
      </>
    )}
  </section>
)}

      </main>
      
      <Footer />
      <QuoteDrawer />
    </div>
  </ErrorBoundary>
);
}

/* ========================== Subcomponents ================================ */

function TestimonialsCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (hover) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [hover, items.length]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center justify-between gap-4">
          <button
            aria-label="Previous"
            className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10"
            onClick={() => setIndex((i) => (i === 0 ? items.length - 1 : i - 1))}
          >
            ‹
          </button>
          <div className="flex-1">
            <p className="text-lg md:text-xl italic text-white/90 text-center max-w-4xl mx-auto">
              “{items[index].quote}”
            </p>
            <div className="mt-4 text-white/70 text-sm text-center">— {items[index].author}</div>
            <div className="mt-6 flex items-center justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-6 rounded-full ${i === index ? "bg-white" : "bg-white/30 hover:bg-white/50"}`}
                />
              ))}
            </div>
          </div>
          <button
            aria-label="Next"
            className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10"
            onClick={() => setIndex((i) => (i === items.length - 1 ? 0 : i + 1))}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

    function AboutTabs({
      toolLogos,
      companies,
      education,
      certs,
    }: {
      toolLogos: ToolLogo[];
      companies: CompanyLogo[];
      education: Array<{ school: string; program: string; dates: string; notes?: string }>;
      certs: Array<{ name: string; org?: string; status?: string }>;
    }) {
      const [which, setWhich] = useState<"bio" | "skills" | "companies" | "education" | "vision">("bio");

      const tabs: Array<{ key: typeof which; label: string }> = [
        { key: "bio", label: "Bio" },
        { key: "skills", label: "Skills" },
        { key: "companies", label: "Companies" },
        { key: "education", label: "Education & Certifications" },
        { key: "vision", label: "Vision / Mission" },
      ];

      return (
        <div className="mt-6">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setWhich(t.key)}
                className={`rounded-xl border px-3 py-2 text-sm transition
                ${which === t.key
                  ? "bg-white text-neutral-900 shadow"
                  : "border-white/15 text-white/80 hover:bg-white/10 hover:border-white/25"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Panels */}
          {which === "bio" && <BioBlock />}
          {which === "skills" && <SkillsBlock toolLogos={toolLogos} />}
          {which === "companies" && <CompaniesBlock companies={companies} />}
          {which === "education" && <EducationBlock education={education} certs={certs} />}
          {which === "vision" && <VisionBlock />}
        </div>
      );
    }

function BioBlock() {
  return (
    <div className="mt-6 grid md:grid-cols-2 gap-10 items-start">
      <div>
        <h2 className="text-2xl font-semibold">Bio</h2>
        <p className="mt-3 text-white/80">
          I’m Curtis Bolden, a Structural BIM/VDC specialist and developer. I build pyRevit/C# tooling, dynamo graphs,
          and analysis handoffs that reduce friction and create measurable outcomes for project teams.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {["10+ yrs AEC/BIM", "pyRevit/C# dev", "Analysis handoffs", "Dashboards & QA/QC"].map((k) => (
            <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">{k}</div>
          ))}
        </div>
      </div>

      <div className="relative">
        <img
          src="/headshots/curtis.png"
          alt="Curtis Bolden"
          className="aspect-square w-full rounded-3xl border border-white/10 bg-black/20 object-cover object-[50%_18%] md:object-[50%_2%]"
          loading="lazy"
          onError={(e) => {
            const box = e.currentTarget.parentElement;
            if (box) {
              box.innerHTML = "";
              box.className =
                "relative aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-400/20 to-indigo-400/20";
            }
          }}
        />
        <div className="absolute -bottom-6 -left-6 w-40 h-28 rounded-xl border border-white/20 bg-white/10" />
      </div>
    </div>
  );
}

function SkillsBlock({ toolLogos }: { toolLogos: ToolLogo[] }) {
  return (
    <div className="mt-6">
      <div className="text-xs uppercase tracking-wider text-white/60">Software</div>

      {/* Clean grid — no outer background box */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 md:gap-6">
        {toolLogos.map((t) => (
          <div
            key={t.name}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5 flex flex-col items-center justify-center
                       hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-out transform hover:-translate-y-1"
          >
            <div className="h-25 w-25 md:h-27 md:w-27 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
              {t.src ? (
                <img
                  src={t.src}
                  alt={t.name}
                  className="h-25 w-25 md:h-27 md:w-27 object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    (e.currentTarget.parentElement as HTMLElement).textContent = t.name[0];
                  }}
                />
              ) : (
                <span className="text-lg md:text-xl">{t.name[0]}</span>
              )}
            </div>
            <div className="mt-3 text-sm md:text-base text-center text-white/80 leading-tight group-hover:text-white transition-colors duration-300">
              {t.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompaniesBlock({ companies }: { companies: CompanyLogo[] }) {
  return (
    <div className="mt-10">
      <div className="text-xs uppercase tracking-wider text-white/60">Companies</div>
      <p className="mt-2 text-white/70 text-sm">
        Organizations I’ve supported across AEC, manufacturing, and tech.
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
        {companies.map((c) => (
          <div
            key={c.name}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 flex items-center justify-center 
                       hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-out transform hover:-translate-y-1"
          >
            {c.src ? (
              <img
                src={c.src}
                alt={c.name}
                className="h-30 md:h-32 lg:h-34 object-contain transition-transform duration-300 group-hover:scale-[1.05]"
              />
            ) : (
              <span className="text-base md:text-lg text-white/80 text-center group-hover:text-white transition-colors duration-300">
                {c.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationBlock({
  education,
  certs,
}: {
  education: Array<{ school: string; program: string; dates: string; notes?: string }>;
  certs: Array<{ name: string; org?: string; status?: string }>;
}) {
  return (
    <div className="mt-6 grid md:grid-cols-2 gap-10">
      {/* Education */}
      <div>
        <div className="text-xs uppercase tracking-wider text-white/60">Education</div>
        <div className="mt-3 space-y-3">
          {education.map((e, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-white/90 font-medium">{e.school}</div>
              <div className="text-white/80">{e.program}</div>
              <div className="text-white/60 text-sm">{e.dates}</div>
              {e.notes && <div className="text-white/60 text-sm mt-1">{e.notes}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <div className="text-xs uppercase tracking-wider text-white/60">Certifications</div>
        <div className="mt-3 grid grid-cols-1 gap-3">
          {certs.map((c, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between">
              <div>
                <div className="text-white/90 font-medium">{c.name}</div>
                {c.org && <div className="text-white/70 text-sm">{c.org}</div>}
              </div>
              {c.status && <span className="text-xs text-white/60">{c.status}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisionBlock() {
  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-2xl font-semibold">Leadership Vision & Mission</h2>
      <p className="mt-3 text-white/80">
        <span className="font-medium">Vision:</span> Deliver structural BIM and automation that removes friction,
        increases clarity, and helps teams ship safer, faster projects with measurable impact.
      </p>
      <p className="mt-3 text-white/80">
        <span className="font-medium">Mission:</span> Build clean workflows and tools—pyRevit/C#, Dynamo, analysis handoffs,
        and dashboards—that save hours weekly, reduce RFIs, and elevate coordination across disciplines.
      </p>
      <ul className="mt-4 space-y-2 text-white/75 text-sm">
        <li>• Outcomes over output: show time saved, quality improved, and risks reduced.</li>
        <li>• Teach and document so teams become self-sufficient.</li>
        <li>• Design with data integrity: guardrails that prevent loss and misalignment.</li>
      </ul>
    </div>
  );
}

function ServiceCard({ service }: { service: { name: string; time: string; price: string; bullets: string[] } }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-lg">{service.name}</h3>
        <span className="text-xs text-white/60">{service.time}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-white/80">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-white/90 font-medium">{service.price}</span>
        <a
          href="/contact"
          onClick={() => window.plausible && window.plausible(`CTA: Start (${service.name})`)}
          className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
        >
          Start
        </a>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl md:text-4xl font-semibold">We couldn’t find that page.</h1>
      <p className="text-white/70 mt-2">Try Home or see recent Work.</p>
      <div className="mt-6 flex gap-3">
        <a href="/" className="rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10">← Back Home</a>
        <a href="/work" className="rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10">See Work</a>
      </div>
    </section>
  );
}
