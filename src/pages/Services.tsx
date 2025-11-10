// imports – keep ONLY ONE useState import
import React, { useState } from "react";
import { SERVICES, type Service } from "@/data/services";
import { useQuote } from "@/context/QuoteContext";
import ServiceModal from "@/components/ServiceModal";

export default function ServicesPage() {
  const [open, setOpen] = useState<string | null>(null);
  const { add } = useQuote();
  const [modal, setModal] = useState<Service | null>(null);

  const handleAdd = (s: Service) => {
    if (!s.quoteEligible) return alert("This service isn’t quote-eligible yet.");
    add(s);
  };

  return (
    <>
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold">Services</h1>
        <p className="text-white/70 mt-2">
          Productized BIM, automation, and development services with clear scope, timeline, and deliverables.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        {Object.entries(SERVICES).map(([category, items]) => (
          <section key={category} className="border border-white/10 rounded-3xl bg-white/[0.02]">
            <button onClick={() => setOpen(open === category ? null : category)} className="w-full flex items-center justify-between p-6 text-left">
              <h2 className="text-xl md:text-2xl font-semibold">{category}</h2>
              <span className="text-white/60 text-xl">{open === category ? "–" : "+"}</span>
            </button>

            {open === category && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 pt-0">
                {items.map((s) => (
                  <article key={s.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col">
                    {/* CLICKABLE TITLE TO OPEN MODAL */}
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        className="text-lg font-semibold cursor-pointer hover:text-blue-400"
                        onClick={() => setModal(s)}
                        title="Open details"
                      >
                        {s.name}
                      </h3>
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
                      <span className="text-white/90 font-medium">{s.priceLabel}</span>
                      <div className="flex gap-2">
                        <button className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10" onClick={() => handleAdd(s)}>
                          Add to Project
                        </button>
                        <a href="/contact" className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10">
                          Start
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* RENDER MODAL ONCE */}
      <ServiceModal open={!!modal} onClose={() => setModal(null)} service={modal!} />
    </>
  );
}
