// src/pages/WorkDetail.tsx
// @ts-nocheck
import React from "react";
import { WORK } from "@/data/work";

export default function WorkDetail({ slug }: { slug: string }) {
  const item = WORK.find((w) => w.slug === slug);

  if (!item) {
    return (
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold">Not found</h1>
        <p className="text-white/70 mt-2">This case study doesn’t exist yet.</p>
        <a
          href="/work"
          className="mt-6 inline-flex rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10"
          onClick={(e) => {
            e.preventDefault();
            history.pushState(null, "", "/work");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }}
        >
          ← Back to Work
        </a>
      </div>
    );
  }

  const heroSrc = item.og || item.thumb;

  return (
    <article>
      {heroSrc && (
        <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
          <img src={heroSrc} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}

      <h1 className="mt-6 text-3xl md:text-4xl font-semibold">{item.title}</h1>
      <p className="text-white/70 mt-2">{item.summary}</p>

      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <InfoCard label="Client" value={item.client || "—"} />
        <InfoCard label="Stack" value={item.stack?.join(", ") || "—"} />
        <InfoCard label="Tags" value={item.tags?.join(", ") || "—"} />
      </div>

      {item.metrics?.length ? (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {item.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs uppercase tracking-wider text-white/60">{m.label}</div>
              <div className="mt-1 text-xl font-semibold">{m.value}</div>
            </div>
          ))}
        </div>
      ) : null}

      {item.problem && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Context & Problem</h2>
          <p className="text-white/80 mt-2">{item.problem}</p>
        </section>
      )}

      {item.solution && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Solution</h2>
          <p className="text-white/80 mt-2">{item.solution}</p>
        </section>
      )}

      {item.outcomes?.length ? (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Outcomes</h2>
          <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
            {item.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {item.images?.length ? (
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {item.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${item.title} ${i + 1}`}
              className="rounded-2xl border border-white/10 object-cover"
            />
          ))}
        </section>
      ) : null}
    </article>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-1">{value}</div>
    </div>
  );
}
