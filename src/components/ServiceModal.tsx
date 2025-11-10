// @ts-nocheck
import React from "react";
import { Service } from "@/data/services";

export default function ServiceModal({ open, onClose, service }: { open: boolean; onClose: () => void; service?: Service }) {
  if (!open || !service) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[70]" onClick={onClose} />
      <div className="fixed inset-0 z-[71] flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-[#0f1115] rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold">{service.name}</h2>
          <p className="text-white/60 text-sm">{service.category} • {service.time}</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {service.bullets.map((b, i) => <li key={i}>• {b}</li>)}
          </ul>
          <p className="mt-4 font-medium">{service.priceLabel}</p>
          <div className="flex justify-end mt-6">
            <button onClick={onClose} className="rounded-lg border border-white/15 px-4 py-2 hover:bg-white/10">Close</button>
          </div>
        </div>
      </div>
    </>
  );
}
