// src/components/Disclaimer.tsx
// @ts-nocheck
import React from "react";

export default function Disclaimer() {
  return (
    <div className="border-t border-white/10 bg-neutral-950/80 py-4 text-center px-4">
      <p className="text-xs text-white/60 max-w-3xl mx-auto leading-relaxed">
        <strong>Disclaimer:</strong> CB Design Consultants is a design technology and BIM automation practice focused on
        developing tools, workflows, and digital solutions that support architects, engineers, and contractors.  
        We are not a licensed engineering firm, and no service provided constitutes the practice of professional
        engineering. All analytical results, modeling outputs, and recommendations should be reviewed and approved by
        a licensed professional engineer before implementation or reliance in construction documents.
      </p>
    </div>
  );
}
