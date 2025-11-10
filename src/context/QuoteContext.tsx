// src/context/QuoteContext.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import type { Service } from "@/data/services";

type Line = { id: string; name: string; category: string; estimateLow?: number; estimateHigh?: number; priceLabel: string; time: string };
type QuoteCtx = {
  lines: Line[];
  add: (s: Service) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (b: boolean) => void;
  totals: { low?: number; high?: number };
  allFixedEligible: boolean;
  payloadText: string; // human-readable selection for forms/calendly
};

const Ctx = createContext<QuoteCtx | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);

  const add = (s: Service) => {
    setLines((prev) => {
      if (prev.some((l) => l.id === s.id)) return prev; // avoid dupes
      return [...prev, {
        id: s.id, name: s.name, category: s.category,
        estimateLow: s.estimateLow, estimateHigh: s.estimateHigh,
        priceLabel: s.priceLabel, time: s.time
      }];
    });
    setOpen(true);
  };
  const remove = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
  const clear = () => setLines([]);

  const totals = useMemo(() => {
    const lows = lines.map(l => l.estimateLow ?? 0);
    const highs = lines.map(l => l.estimateHigh ?? 0);
    const low = lows.reduce((a,b)=>a+b,0) || undefined;
    const high = highs.reduce((a,b)=>a+b,0) || undefined;
    return { low, high };
  }, [lines]);

  const allFixedEligible = useMemo(
    () => lines.length > 0 && lines.every(l => typeof l.estimateLow === "number" && typeof l.estimateHigh === "number"),
    [lines]
  );

  const payloadText = useMemo(
    () =>
      lines.map((l, i) =>
        `${i+1}. ${l.name} (${l.category}) — ${l.priceLabel}${l.estimateLow ? ` | est: $${l.estimateLow?.toLocaleString()}–$${l.estimateHigh?.toLocaleString()}` : ""}`
      ).join("\n"),
    [lines]
  );

  return (
    <Ctx.Provider value={{ lines, add, remove, clear, open, setOpen, totals, allFixedEligible, payloadText }}>
      {children}
    </Ctx.Provider>
  );
}

export const useQuote = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useQuote must be used within QuoteProvider");
  return v;
};
