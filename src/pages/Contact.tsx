// src/pages/Contact.tsx
// @ts-nocheck
import React, { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzzkvdyk"; // replace if you make a new form

export default function ContactPage() {
  const [state, setState] = useState<{ ok?: boolean; msg?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        form.reset();
        setState({ ok: true, msg: "Thanks! I’ll get back to you shortly." });

        // ✅ Plausible goal: Contact form submitted
        try {
          const svc = String(data.get("service") || "");
          (window as any).plausible?.("Contact Form Submitted", {
            props: svc ? { service: svc } : undefined,
          });
        } catch {}
        return;
      } else {
        const j = await res.json().catch(() => ({}));
        setState({ ok: false, msg: j?.error || "Something went wrong. Try again." });
      }
    } catch {
      setState({ ok: false, msg: "Network error. Please try again." });
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-semibold">Contact</h1>
      <p className="text-white/70 mt-2">
        Quick discovery call → scoped plan → measurable delivery.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm text-white/80 mb-1" htmlFor="name">Name</label>
          <input id="name" name="name" required className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="Your name" />
        </div>

        <div>
          <label className="block text-sm text-white/80 mb-1" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="you@company.com" />
        </div>

        <div>
          <label className="block text-sm text-white/80 mb-1" htmlFor="company">Company (optional)</label>
          <input id="company" name="company" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="Company name" />
        </div>

        <div>
          <label className="block text-sm text-white/80 mb-1" htmlFor="service">What do you need?</label>
          <select id="service" name="service" className="w-full rounded-xl border border-white/15 bg-neutral-900 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-500" defaultValue="BIM Automation Sprint">
            <option>BIM Automation Sprint</option>
            <option>Revit ↔ Analysis Sync</option>
            <option>Coordination Dashboard</option>
            <option>Model Health Audit & Standards</option>
            <option>Revit Family Library Build</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-white/80 mb-1" htmlFor="message">Message</label>
          <textarea id="message" name="message" required rows={6} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="Tell me about your project, goals, and timeline." />
        </div>

        {/* honeypot */}
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

        <button type="submit" className="rounded-2xl bg-white text-neutral-900 px-5 py-3 font-medium hover:opacity-90">
          Send message
        </button>

        {state.msg && (
          <div
            className={`mt-3 text-sm transition-opacity duration-700 ease-in-out ${
              state.ok ? "text-emerald-400 opacity-100" : "text-rose-400 opacity-100"
            }`}
          >
            {state.msg}
          </div>
        )}
        </form>

      <div className="mt-10 text-sm text-white/60">
        Prefer email?{" "}
        <a className="underline hover:text-white" href="mailto:cbolden@cb-designconsultants.com">
          cbolden@cb-designconsultants.com
        </a>
      </div>
    </div>
  );
}
