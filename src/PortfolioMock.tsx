// @ts-nocheck
import { useEffect, useState, useRef } from 'react';

// Single-file, clean build of the portfolio mock with fixed JSX/TSX,
// no stray braces/tags, and small smoke tests in console.assert.
// Keep this file self-contained so it runs in ChatGPT canvas or any React sandbox.

// Types
 type TabKey = 'model' | 'drawings' | 'gallery' | 'video';
 type RouteKey = 'home' | 'work' | 'services' | 'tools' | 'about' | 'work:pyrevit';
 type ToolLogo = { name: string; src?: string; group?: string; years?: number; level?: 'Expert'|'Advanced'|'Intermediate' };
 type CompanyLogo = { name: string; src?: string };

export default function PortfolioMock() {
  // App state
  const [route, setRoute] = useState<RouteKey>('home');
  const [tab, setTab] = useState<TabKey>('model');
  const [preset, setPreset] = useState<'default'|'structure'|'section'|'exploded'>('default');
  const [showMEP, setShowMEP] = useState(true);
  const [showAnno, setShowAnno] = useState(true);
  const [sectionDepth, setSectionDepth] = useState(50);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const totalPages = 5;

  // Hero media (safe defaults)
  const HERO_VIDEO_SRC = '';
  const HERO_VIDEO_SRC_DESKTOP = '';
  const HERO_VIDEO_SRC_MOBILE = '';
  const HERO_POSTER_SRC = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='; // 1x1 transparent pixel
  const HAS_VIDEO_SOURCES = Boolean(HERO_VIDEO_SRC || HERO_VIDEO_SRC_DESKTOP || HERO_VIDEO_SRC_MOBILE);

  // Respect user motion/data settings
  const [canAutoplay, setCanAutoplay] = useState(true);
  useEffect(() => {
    try {
      const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      const reduced = !!mql?.matches;
      const conn: any = (navigator as any).connection || {};
      const saveData = !!conn.saveData;
      const slow = ['slow-2g', '2g'].includes(conn.effectiveType);
      setCanAutoplay(!(reduced || saveData || slow));
    } catch {
      setCanAutoplay(true);
    }
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
    { name: 'Autodesk Revit', src: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Autodesk_Revit_Logo.svg', level: 'Expert', years: 8, group: 'Modeling' },
    { name: 'AutoCAD', src: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/AutoCAD_logo.svg', level: 'Advanced', years: 8, group: 'Modeling' },
    { name: 'Navisworks', src: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Autodesk_Navisworks_logo.svg', level: 'Advanced', years: 6, group: 'Coordination' },
    { name: 'InfraWorks', src: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Autodesk_InfraWorks_logo.svg', level: 'Intermediate', years: 3, group: 'Infrastructure' },
    { name: 'Advance Steel', src: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Autodesk_Advance_Steel_logo.svg', years: 2, group: 'Steel' },
    { name: 'Inventor Professional', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Autodesk_Inventor_Logo.svg', years: 2, group: 'Manufacturing' },
    { name: 'Rhino 8', src: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Rhinoceros3dLogo.png', level: 'Advanced', years: 5, group: 'Modeling' },
    { name: 'Grasshopper', src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Grasshopper_logo.png', level: 'Advanced', years: 5, group: 'Modeling' },
    { name: 'Blender', src: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg', years: 3, group: 'Modeling' },
    { name: 'Dynamo', src: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Dynamo_logo.svg', level: 'Expert', years: 7, group: 'Automation' },
    { name: 'Python', src: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', level: 'Advanced', years: 7, group: 'Scripting' },
    { name: 'Power BI', src: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', years: 5, group: 'Data' },
  ];

  const companies: CompanyLogo[] = [
    { name: 'ACME Construction' },
    { name: 'Northbridge Engineering' },
    { name: 'Vertex Industries' },
    { name: 'Evergreen Labs' },
    { name: 'Lattice Structures' },
    { name: 'BluePeak Manufacturing' },
  ];

  const testimonials = [
    { quote: 'Curtis delivered a pyRevit suite that instantly saved our team hours every week. The validation checks alone paid for the engagement in the first month.', author: 'PM, Industrial Project (confidential)' },
    { quote: 'The analysis handoff stopped round‑trip data loss. Our engineers trust the pipeline now.', author: 'Structural Lead, Life Sciences' },
    { quote: 'Dashboard made coordination transparent—aging clashes dropped 47% in two sprints.', author: 'VDC Director, Manufacturing' },
  ];

  // Router (hash-based)
  useEffect(() => {
    const parse = () => {
      const h = window.location.hash.replace('#', '');
      if (!h || h === '/') setRoute('home');
      else if (h.startsWith('/work/pyrevit-sheet-suite')) setRoute('work:pyrevit');
      else if (h.startsWith('/work')) setRoute('work');
      else if (h.startsWith('/services')) setRoute('services');
      else if (h.startsWith('/tools')) setRoute('tools');
      else if (h.startsWith('/about')) setRoute('about');
      else setRoute('home');
    };
    parse();
    window.addEventListener('hashchange', parse);
    return () => window.removeEventListener('hashchange', parse);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['1','2','3','4'].includes(e.key)) {
        e.preventDefault();
        setTab(['model','drawings','gallery','video'][Number(e.key)-1] as TabKey);
      }
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Smoke tests (keep simple)
  useEffect(() => {
    console.assert(!!document.querySelector('header'), 'Smoke: header renders');
    if (route === 'home') console.assert(!!document.querySelector('#demo'), 'Smoke: demo theater renders');
  }, [route]);

  // Refs
  const servicesRef = useRef<HTMLDivElement|null>(null);
  const scrollServices = (dir: number) => servicesRef.current?.scrollBy({ left: dir*320, behavior: 'smooth' });

  // Hero visibility for play/pause
  const heroRef = useRef<HTMLDivElement|null>(null);
  const heroVideoRef = useRef<HTMLVideoElement|null>(null);
  const [heroReady, setHeroReady] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const node = heroRef.current; if (!node) return;
    const io = new IntersectionObserver((entries) => setHeroVisible(entries[0]?.isIntersecting ?? false), { threshold: 0.5 });
    io.observe(node); return () => io.disconnect();
  }, []);
  useEffect(() => {
    const v = heroVideoRef.current; if (!v) return;
    if (canAutoplay && HAS_VIDEO_SOURCES && heroVisible) v.play().catch(()=>{}); else v.pause();
  }, [canAutoplay, HAS_VIDEO_SOURCES, heroVisible]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <style>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#/" className="font-semibold tracking-tight text-lg">Curtis Bolden — Portfolio</a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#/" className="hover:text-white/90 text-white/70">Home</a>
            <a href="#/work" className="hover:text-white/90 text-white/70">Work</a>
            <a href="#/services" className="hover:text-white/90 text-white/70">Services</a>
            <a href="#/tools" className="hover:text-white/90 text-white/70">Tools</a>
            <a href="#/about" className="hover:text-white/90 text-white/70">About</a>
            <a href="#contact" className="rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10 transition">Book a consult</a>
          </nav>
        </div>
      </header>

      {/* HOME */}
      {route === 'home' && (
        <>
          {/* HERO */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(60%_40%_at_50%_0%,black,transparent)] bg-gradient-to-b from-indigo-500/20 via-fuchsia-500/10 to-transparent" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-12 gap-10">
              <div className="md:col-span-7">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Structural BIM • Dev • Automation</p>
                <h1 className="mt-4 text-4xl/tight md:text-6xl/tight font-semibold">Structural BIM + Automation that saves hours.</h1>
                <p className="mt-5 text-lg text-white/80 max-w-2xl">Revit tooling, analysis handoffs, and dashboards that cut friction—pyRevit/C# scripts, data pipelines, and QA/QC checks that teams actually use.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="inline-flex items-center rounded-2xl bg-white text-neutral-900 px-5 py-3 font-medium hover:opacity-90 transition">Book a 15‑min consult</a>
                  <a href="#work" className="inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 font-medium hover:bg-white/10 transition">See case studies</a>
                </div>
                <div className="mt-10 flex flex-wrap gap-2 text-xs">
                  {['Revit API (C#)','pyRevit','Dynamo','Python','ETABS / RISA / RAM','Power BI','Next.js'].map(t => (
                    <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80">{t}</span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-5">
                <div ref={heroRef} className="relative h-72 md:h-full rounded-3xl border border-white/10 overflow-hidden">
                  {canAutoplay && HAS_VIDEO_SOURCES ? (
                    <video
                      ref={heroVideoRef}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${heroReady ? 'opacity-100' : 'opacity-0'}`}
                      autoPlay muted loop playsInline preload="auto" poster={HERO_POSTER_SRC || undefined}
                      onCanPlay={() => setHeroReady(true)}
                      aria-hidden="true"
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
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-3xl" />
                </div>
              </div>
            </div>
          </section>

          {/* HIGHLIGHTS */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 -mt-12">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: 'pyRevit Tooling', desc: 'Parameter validators, sheet creators, exporters, view templates.' },
                { title: 'Revit ⇄ Analysis', desc: 'ETABS/RAM/RISA handoffs, QA/QC scripts, delta checkers.' },
                { title: 'Dashboards', desc: 'Model health, clashes by trade/level, issue aging (Power BI).' },
              ].map((c) => (
                <div key={c.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                  <p className="mt-2 text-white/75 text-sm">{c.desc}</p>
                  <div className="mt-4 h-24 rounded-2xl border border-white/10 bg-gradient-to-tr from-white/10 to-transparent" />
                </div>
              ))}
            </div>
          </section>

          {/* WORK GRID */}
          <section id="work" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">Selected Work</h2>
                <p className="text-white/70 mt-2">Case studies across BIM automation, plugins, and reporting.</p>
              </div>
              <a href="#/work" className="hidden md:inline-flex text-sm rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10">View all</a>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { tag: 'pyRevit', title: 'Cut sheet time by 32% with a sheet automation suite', blurb: 'Bulk create views/sheets, auto-parameters, and QC checks with one click.' },
                { tag: 'Revit ⇄ ETABS', title: 'Reliable analysis handoff & round‑trip checks', blurb: 'Exporter + validator to keep geometry/section data clean between tools.' },
                { tag: 'Power BI', title: 'Coordination dashboard for model health & clashes', blurb: 'Live KPIs: clash aging, by trade/level, and issue SLA compliance.' },
              ].map((p) => (
                <a key={p.title} href={p.title.includes('sheet') ? '#/work/pyrevit-sheet-suite' : '#/work'} className="group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]">
                  <div className="aspect-[16/10] bg-gradient-to-br from-indigo-400/20 to-fuchsia-400/10" />
                  <div className="p-5">
                    <span className="text-[11px] uppercase tracking-wider text-white/60">{p.tag}</span>
                    <h3 className="mt-2 font-semibold text-lg group-hover:underline underline-offset-4">{p.title}</h3>
                    <p className="mt-2 text-sm text-white/75">{p.blurb}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">Productized Services</h2>
                <p className="text-white/70 mt-2">Clear scope, timeline, and deliverables focused on outcomes.</p>
              </div>
              <a href="#/services" className="text-sm rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10">View all</a>
            </div>
            <div className="relative mt-6">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                <button onClick={() => scrollServices(-1)} className="rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20">‹</button>
              </div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                <button onClick={() => scrollServices(1)} className="rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20">›</button>
              </div>
              <div ref={servicesRef} className="mt-2 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                {services.map((s) => (
                  <div key={s.name} className="snap-start shrink-0 w-[320px] rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-lg">{s.name}</h3>
                      <span className="text-xs text-white/60">{s.time}</span>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-white/80">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />{b}</li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-white/90 font-medium">{s.price}</span>
                      <a href="#contact" className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10">Start</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT TEASER */}
          <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">About</h2>
                <p className="mt-4 text-white/80">I’m Curtis Bolden, a Structural BIM/VDC specialist and developer. I create reliable tools and workflows that help teams deliver faster with fewer RFIs.</p>
                <a href="#/about" className="mt-6 inline-flex text-sm rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10">Open full About →</a>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-400/20 to-indigo-400/20" />
                <div className="absolute -bottom-6 -left-6 w-40 h-28 rounded-xl border border-white/20 bg-white/10" />
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <TestimonialsCarousel items={testimonials} />

          {/* CONTACT CTA */}
          <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold">Let’s get you hours back every week.</h3>
                <p className="text-white/80 mt-2">Short discovery call → scoped plan → delivery you can measure.</p>
              </div>
              <div className="flex gap-3">
                <a href="#" className="rounded-2xl bg-white text-neutral-900 px-5 py-3 font-medium hover:opacity-90">Book consult</a>
                <a href="mailto:curtis@example.com" className="rounded-2xl border border-white/20 px-5 py-3 font-medium hover:bg-white/10">Email me</a>
              </div>
            </div>
          </section>

          {/* DEMO THEATER */}
          <DemoTheater
            tab={tab}
            setTab={setTab}
            preset={preset}
            setPreset={setPreset}
            showMEP={showMEP}
            setShowMEP={setShowMEP}
            showAnno={showAnno}
            setShowAnno={setShowAnno}
            sectionDepth={sectionDepth}
            setSectionDepth={setSectionDepth}
            page={page}
            setPage={setPage}
            zoom={zoom}
            setZoom={setZoom}
            totalPages={totalPages}
            lightboxIndex={lightboxIndex}
            setLightboxIndex={setLightboxIndex}
          />
        </>
      )}

      {/* SIMPLE PLACEHOLDER PAGES */}
      {route !== 'home' && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-3xl md:text-4xl font-semibold capitalize">{route.replace(':',' / ')}</h1>
          <p className="text-white/70 mt-2 max-w-2xl">This is a placeholder page in the mock router. Navigate back with the header links.</p>
          {route === 'about' && <AboutTabs toolLogos={toolLogos} companies={companies} />}
        </section>
      )}
    </div>
  );
}

// ===== Components =====
function TestimonialsCarousel({ items }: { items: { quote: string; author: string }[] }) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (hover) return;
    const id = setInterval(() => setIndex(i => (i + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [hover, items.length]);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="flex items-center justify-between gap-4">
          <button aria-label="Previous" className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10" onClick={() => setIndex(i => (i === 0 ? items.length - 1 : i - 1))}>‹</button>
          <div className="flex-1">
            <p className="text-lg md:text-xl italic text-white/90 text-center max-w-4xl mx-auto">“{items[index].quote}”</p>
            <div className="mt-4 text-white/70 text-sm text-center">— {items[index].author}</div>
            <div className="mt-6 flex items-center justify-center gap-2">
              {items.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`} />
              ))}
            </div>
          </div>
          <button aria-label="Next" className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10" onClick={() => setIndex(i => (i === items.length - 1 ? 0 : i + 1))}>›</button>
        </div>
      </div>
    </section>
  );
}

function DemoTheater(props: {
  tab: TabKey;
  setTab: (t: TabKey) => void;
  preset: 'default'|'structure'|'section'|'exploded';
  setPreset: (p: 'default'|'structure'|'section'|'exploded') => void;
  showMEP: boolean; setShowMEP: (v: boolean) => void;
  showAnno: boolean; setShowAnno: (v: boolean) => void;
  sectionDepth: number; setSectionDepth: (n: number) => void;
  page: number; setPage: (n: number) => void;
  zoom: number; setZoom: (n: number) => void;
  totalPages: number;
  lightboxIndex: number | null; setLightboxIndex: (n: number | null) => void;
}) {
  const { tab, setTab, preset, setPreset, showMEP, setShowMEP, showAnno, setShowAnno, sectionDepth, setSectionDepth, page, setPage, zoom, setZoom, totalPages, lightboxIndex, setLightboxIndex } = props;
  return (
    <section id="demo" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Interactive Project Theater (Demo)</h2>
          <p className="text-white/70 mt-2">Use the tabs or press <span className="font-mono">1–4</span>. View-only.</p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
        <div className="flex flex-wrap gap-2">
          {(['model','drawings','gallery','video'] as TabKey[]).map((k, i) => (
            <button key={k} onClick={() => setTab(k)} className={`px-3 py-2 rounded-xl text-sm border ${tab === k ? 'bg-white text-neutral-900' : 'border-white/15 text-white/80 hover:bg-white/10'}`}>{['3D Model','Drawings','Gallery','Video'][i]}</button>
          ))}
        </div>

        {/* MODEL TAB */}
        {tab === 'model' && (
          <div className="mt-6 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/60">Presets</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    { id: 'default', label: 'Default' },
                    { id: 'structure', label: 'Structure Only' },
                    { id: 'section', label: 'Section @ Grid D' },
                    { id: 'exploded', label: 'Exploded' },
                  ].map(p => (
                    <button key={p.id} onClick={() => setPreset(p.id as any)} className={`rounded-lg border px-3 py-1 text-sm ${preset === p.id ? 'bg-white text-neutral-900' : 'border-white/15 text-white/80 hover:bg-white/10'}`}>{p.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/60">Layers</div>
                <label className="mt-2 flex items-center gap-2 text-sm text-white/80"><input type="checkbox" checked={showMEP} onChange={(e) => setShowMEP(e.target.checked)} /> MEP</label>
                <label className="mt-1 flex items-center gap-2 text-sm text-white/80"><input type="checkbox" checked={showAnno} onChange={(e) => setShowAnno(e.target.checked)} /> Annotations</label>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/60">Section</div>
                <input type="range" min={0} max={100} value={sectionDepth} onChange={(e) => setSectionDepth(Number(e.target.value))} className="w-full" />
                <div className="text-xs text-white/60 mt-1">Depth: {sectionDepth}%</div>
              </div>
              <div className="text-xs text-white/60">Tip: Press <span className="font-mono">1</span>.</div>
            </div>

            <div className="lg:col-span-9">
              <div className="relative aspect-[16/9] rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-400/20 to-fuchsia-400/10 overflow-hidden">
                <div className="absolute inset-6 grid grid-cols-6 grid-rows-4 gap-2 opacity-80">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className={`rounded-lg border ${preset === 'exploded' && i % 6 === 0 ? 'translate-y-2 translate-x-1 border-white/30 bg-white/10' : 'border-white/10 bg-white/[0.06]'}`} />
                  ))}
                </div>
                {preset === 'section' && <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(0,0,0,.65) ${sectionDepth}%, transparent ${sectionDepth}%)` }} />}
                {showMEP && <div className="absolute bottom-6 left-6 right-6 h-2 rounded bg-white/40 blur-[1px]" />}
                {showAnno && <div className="absolute top-6 right-6 text-[11px] bg-white/20 border border-white/30 rounded px-2 py-1">Grid D</div>}
                <div className="absolute bottom-3 left-3 text-[11px] text-white/80">Preset: {preset}</div>
              </div>
            </div>
          </div>
        )}

        {/* DRAWINGS TAB */}
        {tab === 'drawings' && (
          <div className="mt-6 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <div className="text-xs uppercase tracking-wider text-white/60">Sheets</div>
              <div className="mt-2 grid gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`rounded-xl border px-3 py-2 text-left text-sm ${page === i + 1 ? 'bg-white text-neutral-900' : 'border-white/15 text-white/80 hover:bg-white/10'}`}>A{100 + i} – Plan {i + 1}</button>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wider text-white/60">Zoom</div>
                <input type="range" min={0.75} max={2} step={0.05} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full" />
                <div className="text-xs text-white/60 mt-1">{Math.round(zoom * 100)}%</div>
              </div>
              <div className="text-xs text-white/60 mt-4">Tip: Press <span className="font-mono">2</span>.</div>
            </div>
            <div className="lg:col-span-9">
              <div className="rounded-2xl border border-white/10 bg-neutral-900 overflow-auto p-4" style={{ height: '540px' }}>
                <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
                  <div className="w-[900px] h-[1200px] bg-white rounded-lg shadow relative">
                    <div className="absolute inset-6 border-2 border-neutral-300 rounded" />
                    <div className="absolute top-4 left-4 text-neutral-800 text-sm font-semibold">Sheet A{100 + page - 1}</div>
                    <div className="absolute bottom-4 right-4 text-neutral-700 text-xs">Page {page} / {totalPages}</div>
                    <div className="absolute left-6 top-20 right-6 bottom-20 grid grid-cols-3 gap-6">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border border-neutral-300 bg-neutral-50 rounded" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {tab === 'gallery' && (
          <div className="mt-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <button key={i} onClick={() => setLightboxIndex(i)} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 opacity-60">
                    {Array.from({ length: 24 }).map((_, j) => (
                      <div key={j} className="bg-white/10" />
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-2 text-[11px] bg-black/40 px-2 py-1 rounded">Image {i + 1}</div>
                </button>
              ))}
            </div>
            {lightboxIndex !== null && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setLightboxIndex(null)}>
                <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-indigo-400/20 to-fuchsia-400/10" />
                  <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-between text-sm">
                    <button className="rounded-xl border border-white/15 px-4 py-2" onClick={() => setLightboxIndex(i => (i! === 0 ? 7 : i! - 1))}>Prev</button>
                    <div className="text-white/80">{(lightboxIndex ?? 0) + 1} / 8</div>
                    <button className="rounded-xl border border-white/15 px-4 py-2" onClick={() => setLightboxIndex(i => (i! === 7 ? 0 : i! + 1))}>Next</button>
                  </div>
                  <button className="absolute -top-10 right-0 rounded-xl border border-white/15 px-3 py-1 text-sm" onClick={() => setLightboxIndex(null)}>Close</button>
                </div>
              </div>
            )}
            <div className="text-xs text-white/60 mt-3">Tip: Press <span className="font-mono">3</span>.</div>
          </div>
        )}

        {/* VIDEO TAB */}
        {tab === 'video' && (
          <div className="mt-6 grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                <video controls className="w-full h-full">
                  <source src="" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="lg:col-span-4 text-sm text-white/80">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-medium">Suggested talking points</div>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Problem and constraints</li>
                  <li>Stack and approach</li>
                  <li>Outcome metrics</li>
                  <li>Next steps / extensions</li>
                </ul>
              </div>
              <div className="text-xs text-white/60 mt-3">Tip: Press <span className="font-mono">4</span>.</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function AboutTabs({ toolLogos, companies }: { toolLogos: ToolLogo[]; companies: CompanyLogo[] }) {
  const [which, setWhich] = useState<'bio'|'skills'|'companies'>('bio');
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {(['bio','skills','companies'] as const).map(k => (
          <button key={k} onClick={() => setWhich(k)} className={`rounded-xl border px-3 py-2 text-sm ${which===k? 'bg-white text-neutral-900':'border-white/15 text-white/80 hover:bg-white/10'}`}>{k[0].toUpperCase()+k.slice(1)}</button>
        ))}
      </div>
      {which==='bio' && <BioBlock/>}
      {which==='skills' && <SkillsBlock toolLogos={toolLogos}/>} 
      {which==='companies' && <CompaniesBlock companies={companies}/>} 
    </div>
  );
}

function BioBlock(){
  return (
    <div className="mt-6 grid md:grid-cols-2 gap-10 items-start">
      <div>
        <h2 className="text-2xl font-semibold">Bio</h2>
        <p className="mt-3 text-white/80">I’m Curtis Bolden, a Structural BIM/VDC specialist and developer. I build pyRevit/C# tooling, dynamo graphs, and analysis handoffs that reduce friction and create measurable outcomes for project teams.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {['10+ yrs AEC/BIM', 'pyRevit/C# dev', 'Analysis handoffs', 'Dashboards & QA/QC'].map(k => (
            <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">{k}</div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-400/20 to-indigo-400/20 aspect-square"/>
    </div>
  );
}

function SkillsBlock({ toolLogos }: { toolLogos: ToolLogo[] }){
  return (
    <div className="mt-6">
      <div className="text-xs uppercase tracking-wider text-white/60">Software</div>
      <div className="mt-3 flex gap-3 overflow-x-auto hide-scrollbar pb-1" style={{ WebkitOverflowScrolling:'touch' }}>
        {toolLogos.slice(0,14).map(t=> (
          <span key={t.name} className="shrink-0 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="h-5 w-5 rounded-md overflow-hidden bg-white/10 flex items-center justify-center">
              {t.src? <img src={t.src} alt={t.name} className="h-5 w-5 object-contain" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'; (e.currentTarget.parentElement as HTMLElement).textContent=t.name[0];}}/> : <span className="text-[11px]">{t.name[0]}</span>}
            </span>
            <span className="text-xs text-white/85">{t.name}</span>
          </span>
        ))}
      </div>
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {toolLogos.map(t => (
            <div key={t.name} className="group rounded-xl border border-white/10 bg-white/[0.02] p-3 flex flex-col items-center justify-center hover:bg-white/10 transition">
              <div className="h-10 w-10 rounded-md overflow-hidden bg-white/10 flex items-center justify-center">
                {t.src? <img src={t.src} alt={t.name} className="h-10 w-10 object-contain" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'; (e.currentTarget.parentElement as HTMLElement).textContent=t.name[0];}}/> : <span className="text-sm">{t.name[0]}</span>}
              </div>
              <div className="mt-2 text-[11px] text-center text-white/70 leading-tight">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompaniesBlock({ companies }: { companies: CompanyLogo[] }){
  return (
    <div className="mt-6">
      <div className="text-xs uppercase tracking-wider text-white/60">Companies</div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {companies.map(c => (
          <div key={c.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-center">
            {c.src? <img src={c.src} alt={c.name} className="h-10 object-contain"/> : <span className="text-sm text-white/80">{c.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
