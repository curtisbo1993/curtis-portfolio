// src/PortfolioMock.tsx
// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import SkipToContent from "@/components/SkipToContent";
import Footer from "@/components/Footer";

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
        <div style={{ color: "#fff", padding: 24 }}>
          <h2>Something went wrong.</h2>
          <p>Open DevTools → Console for the error details.</p>
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

/* ----------------------------- Types ------------------------------------- */
type TabKey = "model" | "drawings" | "gallery" | "video";
type RouteKey = "home" | "work" | "services" | "tools" | "about" | "work:pyrevit";
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

  // If you actually have this hook file, keep it; otherwise delete this line.
  useReveal("[data-reveal]", route);

  // Tabs (used on About)
  const [tab, setTab] = useState<TabKey>("model");

  // Hero media
  const HERO_VIDEO_SRC = "/hero/Hero Video.mp4";
  const HERO_VIDEO_SRC_DESKTOP = "/hero/Hero Video.mp4";
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
      const hash = window.location.hash.replace("#", "");
      if (hash.startsWith("/")) history.replaceState(null, "", hash);

      const p = window.location.pathname;
      if (!p || p === "/") setRoute("home");
      else if (p.startsWith("/work/pyrevit-sheet-suite")) setRoute("work:pyrevit");
      else if (p.startsWith("/work")) setRoute("work");
      else if (p.startsWith("/services")) setRoute("services");
      else if (p.startsWith("/tools")) setRoute("tools");
      else if (p.startsWith("/about")) setRoute("about");
      else setRoute("home");
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
    // add the rest...***FIX AND UPDATE!!!!!
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
    // add the rest...
  ];

  const testimonials = [
    { quote: "Curtis delivered a pyRevit suite that instantly saved our team hours every week.", author: "PM, Industrial Project (confidential)" },
    { quote: "The analysis handoff stopped round-trip data loss. Our engineers trust the pipeline now.", author: "Structural Lead, Life Sciences" },
    { quote: "Dashboard made coordination transparent—aging clashes dropped 47% in two sprints.", author: "VDC Director, Manufacturing" },
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

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="font-semibold tracking-tight text-lg">
            Curtis Bolden — Portfolio
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <NavLink href="/" className="hover:text-white/90 text-white/70">Home</NavLink>
            <NavLink href="/work" className="hover:text-white/90 text-white/70">Work</NavLink>
            <NavLink href="/services" className="hover:text-white/90 text-white/70">Services</NavLink>
            <NavLink href="/tools" className="hover:text-white/90 text-white/70">Tools</NavLink>
            <NavLink href="/about" className="hover:text-white/90 text-white/70">About</NavLink>
            <a href="/contact" className="rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10 transition">
              Book a consult
            </a>
          </nav>
        </div>
      </header>

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
                  Structural BIM + Automation that saves hours.
                </h1>
                <p className="mt-5 max-w-2xl text-lg text-white/80">
                  Revit tooling, analysis handoffs, and dashboards that cut friction—pyRevit/C# scripts, data pipelines,
                  and QA/QC checks that teams actually use.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="/contact" className="inline-flex items-center rounded-2xl bg-white px-5 py-3 font-medium text-neutral-900 transition hover:opacity-90">
                    Book a 15-min consult
                  </a>
                  <a href="/work" className="inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 font-medium transition hover:bg-white/10">
                    See case studies
                  </a>
                </div>
              </div>

              {/* RIGHT: video */}
              <div className="relative md:col-span-6">
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl md:scale-[1.07] md:translate-x-2 md:-translate-y-1">
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
                <button onClick={() => scrollServices(-1)} className="rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20">‹</button>
              </div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                <button onClick={() => scrollServices(1)} className="rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20">›</button>
              </div>

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

          {/* ABOUT TEASER */}
          <section id="about" data-reveal data-delay="240ms" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">About</h2>
                <p className="mt-4 text-white/80">
                  I’m Curtis Bolden, a Structural BIM/VDC specialist and developer. I create reliable tools and
                  workflows that help teams deliver faster with fewer RFIs.
                </p>
                <a href="/about" className="mt-6 inline-flex text-sm rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10">Open full About →</a>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-400/20 to-indigo-400/20" />
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
                <a href="mailto:curtis@example.com" className="rounded-2xl border border-white/20 px-5 py-3 font-medium hover:bg-white/10">Email me</a>
              </div>
            </div>
          </section>
        </>
      )}

      {/* NON-HOME ROUTES */}
      {route !== "home" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-3xl md:text-4xl font-semibold capitalize">{route.replace(":", " / ")}</h1>
          <p className="text-white/70 mt-2 max-w-2xl">
            This is a placeholder page in the mock router. Navigate back with the header links.
          </p>
          {route === "about" && <AboutTabs toolLogos={toolLogos} companies={companies} />}
        </section>
      )}

      <Footer />
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

function AboutTabs({ toolLogos, companies }: { toolLogos: ToolLogo[]; companies: CompanyLogo[] }) {
  const [which, setWhich] = useState<"bio" | "skills" | "companies">("bio");
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {(["bio", "skills", "companies"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setWhich(k)}
            className={`rounded-xl border px-3 py-2 text-sm ${
              which === k ? "bg-white text-neutral-900" : "border-white/15 text-white/80 hover:bg-white/10"
            }`}
          >
            {k[0].toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>
      {which === "bio" && <BioBlock />}
      {which === "skills" && <SkillsBlock toolLogos={toolLogos} />}
      {which === "companies" && <CompaniesBlock companies={companies} />}
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
            <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              {k}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-400/20 to-indigo-400/20 aspect-square" />
    </div>
  );
}

function SkillsBlock({ toolLogos }: { toolLogos: ToolLogo[] }) {
  return (
    <div className="mt-6">
      <div className="text-xs uppercase tracking-wider text-white/60">Software</div>
      <div className="mt-3 flex gap-3 overflow-x-auto hide-scrollbar pb-1" style={{ WebkitOverflowScrolling: "touch" }}>
        {toolLogos.slice(0, 14).map((t) => (
          <span key={t.name} className="shrink-0 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="h-5 w-5 rounded-md overflow-hidden bg-white/10 flex items-center justify-center">
              {t.src ? (
                <img
                  src={t.src}
                  alt={t.name}
                  className="h-5 w-5 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    (e.currentTarget.parentElement as HTMLElement).textContent = t.name[0];
                  }}
                />
              ) : (
                <span className="text-[11px]">{t.name[0]}</span>
              )}
            </span>
            <span className="text-xs text-white/85">{t.name}</span>
          </span>
        ))}
      </div>
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {toolLogos.map((t) => (
            <div key={t.name} className="group rounded-xl border border-white/10 bg-white/[0.02] p-3 flex flex-col items-center justify-center hover:bg-white/10 transition">
              <div className="h-10 w-10 rounded-md overflow-hidden bg-white/10 flex items-center justify-center">
                {t.src ? (
                  <img
                    src={t.src}
                    alt={t.name}
                    className="h-10 w-10 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      (e.currentTarget.parentElement as HTMLElement).textContent = t.name[0];
                    }}
                  />
                ) : (
                  <span className="text-sm">{t.name[0]}</span>
                )}
              </div>
              <div className="mt-2 text-[11px] text-center text-white/70 leading-tight">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompaniesBlock({ companies }: { companies: CompanyLogo[] }) {
  return (
    <div className="mt-6">
      <div className="text-xs uppercase tracking-wider text-white/60">Companies</div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {companies.map((c) => (
          <div key={c.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-center">
            {c.src ? <img src={c.src} alt={c.name} className="h-10 object-contain" /> : <span className="text-sm text-white/80">{c.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
