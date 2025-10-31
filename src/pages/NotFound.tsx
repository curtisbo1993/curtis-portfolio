// src/pages/NotFound.tsx
// @ts-nocheck
import React from "react";

export default function NotFoundPage() {
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
