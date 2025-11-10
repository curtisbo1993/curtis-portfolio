// src/components/QuoteDrawer.tsx
// @ts-nocheck
import React, { useState } from "react";
import { useQuote } from "@/context/QuoteContext";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzzkvdyk"; // same as Contact.tsx (replace if you change it)
const CALENDLY = "https://calendly.com/curtisbolden/30min";   // put your real link

export default function QuoteDrawer() {
  const { lines, remove, clear, open, setOpen, totals, allFixedEligible, payloadText } = useQuote();
  const [sending, setSending] = useState(false);
  const deposit = totals.low ? Math.round((totals.low * 0.3)) : undefined;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      {/* Panel */}
      <aside
        className={`fixed right-0 inset-y-0 z-[61] w-full max-w-md bg-[#0f1115] border-l border-white/10
                    transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}
                    flex flex-col h-[100dvh] min-h-0`}
        role="dialog" aria-label="Build your project"
      >
        <header className="p-5 flex items-center justify-between border-b border-white/10">
          <h2 className="text-lg font-semibold">Build your project</h2>
          <button className="rounded-lg border border-white/15 px-2 py-1 hover:bg-white/10" onClick={() => setOpen(false)}>✕</button>
        </header>

        <div className="flex-1 overflow-y-auto min-h-0 p-5">
          {lines.length === 0 ? (
            <p className="text-white/70">No services selected. Use “Add to Project” on any service card.</p>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => (
                <li key={l.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{l.name}</div>
                      <div className="text-xs text-white/60">{l.category} • {l.time}</div>
                      <div className="text-xs text-white/70 mt-1">{l.priceLabel}</div>
                      {typeof l.estimateLow === "number" && (
                        <div className="text-xs text-white/80 mt-1">
                          Est. ${l.estimateLow.toLocaleString()}–${(l.estimateHigh ?? l.estimateLow).toLocaleString()}
                        </div>
                      )}
                    </div>
                    <button onClick={() => remove(l.id)} className="text-xs rounded-md border border-white/15 px-2 py-1 hover:bg-white/10">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer actions */}
        <footer className="border-t border-white/10">
          <div className="p-5">
            {/* Totals (unchanged; paste your totals block here) */}
          </div>

          <div className="px-5 pb-5">
            <form
              className="col-span-2 space-y-2 max-h-[40vh] overflow-y-auto"
              onSubmit={async (e) => {
                e.preventDefault();
                setSending(true);
                try {
                  const fd = new FormData(e.currentTarget as HTMLFormElement);
                  fd.append("subject", "Quote request from cb-designconsultants.com");
                  fd.append("services", payloadText || "No selections");
                  const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: fd });
                  if (res.ok) { alert("Thanks! Your selections were sent. I’ll reply with a proposal."); clear(); setOpen(false); }
                  else { alert("Could not send. Please try again or use the Contact page."); }
                } finally { setSending(false); }
              }}
            >
              <input
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone (optional)"
                className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm"
              />
              <button
                type="submit"
                disabled={lines.length === 0 || sending}
                className="w-full rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10 disabled:opacity-50"
              >
                {sending ? "Sending…" : "Request Proposal"}
              </button>
            </form>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href="https://calendly.com/curtisbolden/30min"
                target="_blank"
                className="rounded-xl border border-white/15 px-4 py-2 text-sm text-center hover:bg-white/10"
              >
                Book Discovery
              </a>

              <button
                disabled={!allFixedEligible || lines.length === 0}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10 disabled:opacity-50"
                onClick={async () => {
                  if (!totals.low) return;
                  const amount = Math.round(totals.low * 0.3 * 100);
                  const res = await fetch("/api/create-checkout-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      amount,
                      description: `Deposit for ${lines.length} service(s): ${lines.map(l => l.name).join(", ")}`
                    })
                  });
                  const data = await res.json();
                  window.location.href = data.url;
                }}
              >
                Pay Deposit
              </button>
            </div>

            {lines.length > 0 && (
              <button onClick={clear} className="mt-3 w-full text-xs text-white/60 hover:text-white/80">
                Clear all
              </button>
            )}
          </div>
        </footer>
      </aside>
    </>
  );
}
