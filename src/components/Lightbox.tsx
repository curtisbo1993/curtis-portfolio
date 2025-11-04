// src/components/Lightbox.tsx
// @ts-nocheck
import React, { useEffect, useRef } from "react";

type LightboxProps = {
  open: boolean;
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ open, images, index, onClose, onPrev, onNext }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close on ESC, arrows for navigation
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  // Basic focus trap (send initial focus to close)
  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  if (!open) return null;
  const src = images[index];

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose(); // click outside image closes
      }}
    >
      <div className="absolute inset-0 grid place-items-center p-4">
        <img
          src={src}
          alt=""
          className="max-h-[88vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
          draggable={false}
        />
      </div>

      {/* Controls */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
      >
        ✕ Close
      </button>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
        <button
          onClick={onPrev}
          aria-label="Previous"
          className="pointer-events-auto ml-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xl hover:bg-white/20"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          aria-label="Next"
          className="pointer-events-auto mr-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xl hover:bg-white/20"
        >
          ›
        </button>
      </div>

      {/* Index hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
