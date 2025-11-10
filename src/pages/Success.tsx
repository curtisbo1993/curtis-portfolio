// @ts-nocheck
import React from "react";
export default function SuccessPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-3xl md:text-4xl font-semibold">Payment Received ✅</h1>
      <p className="text-white/70 mt-3">
        Thanks for the deposit. I’ll email next steps shortly.
      </p>
      <a href="/services" className="mt-8 inline-block rounded-xl border border-white/15 px-4 py-2 hover:bg-white/10">
        Back to Services
      </a>
    </section>
  );
}
