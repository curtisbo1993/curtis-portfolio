// src/pages/Services.tsx
// @ts-nocheck
import React from "react";

export default function ServicesPage({ services }: { services: {
  name: string; time: string; price: string; bullets: string[];
}[] }) {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-semibold">Productized Services</h1>
      <p className="text-white/70 mt-2 max-w-2xl">
        Clear scope, timeline, and deliverables focused on outcomes.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <article key={s.name} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">{s.name}</h3>
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
              <a href="/contact" className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10">
                Start
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
