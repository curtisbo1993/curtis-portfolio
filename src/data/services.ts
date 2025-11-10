// src/data/services.ts
export type Service = {
  id: string;
  name: string;
  category: string;
  time: string;          // “2 weeks”, “Varies”
  priceLabel: string;    // “from $5,400”, “from $75/hr”
  bullets: string[];

  // Quote-builder hints
  quoteEligible?: boolean;       // can be added to the quote
  fixedPriceEligible?: boolean;  // safe for “Pay deposit”
  estimateLow?: number;          // USD (for range totals)
  estimateHigh?: number;         // USD
};

const S = (p: Partial<Service>) => p as Service;

export const SERVICES: Record<string, Service[]> = {
  "BIM + CAD Production": [
    S({
      id: "prod-support",
      name: "BIM/CAD Production Support (AEC/EPC)",
      category: "BIM + CAD Production",
      time: "Varies",
      priceLabel: "from $75/hr",
      bullets: [
        "2D drafting & 3D modeling across disciplines",
        "Sheet setup, detailing, redlines",
        "Hourly or per-deliverable support",
      ],
      quoteEligible: true,
      estimateLow: 1500, estimateHigh: 6000,
    }),
    S({
      id: "model-health",
      name: "Model Health Audit & Standards",
      category: "BIM + CAD Production",
      time: "2 weeks",
      priceLabel: "from $5,000",
      bullets: [
        "Model QA/QC + standards compliance",
        "Family, view, and parameter review",
        "Cleanup & optimization report",
      ],
      quoteEligible: true,
      fixedPriceEligible: true,
      estimateLow: 5000, estimateHigh: 7000,
    }),
    S({
      id: "family-library",
      name: "Revit Family & Library Build",
      category: "BIM + CAD Production",
      time: "3–5 weeks",
      priceLabel: "from $8,000",
      bullets: [
        "Parametric families + type catalogs",
        "QA checklist + documentation",
        "Training & sample sheets",
      ],
      quoteEligible: true,
      fixedPriceEligible: true,
      estimateLow: 8000, estimateHigh: 12000,
    }),
  ],

  "Automation + Integration": [
    S({
      id: "auto-sprint",
      name: "BIM Automation Sprint",
      category: "Automation + Integration",
      time: "2 weeks",
      priceLabel: "from $5,400",
      bullets: [
        "Backlog audit → priority scoring",
        "Ship 1–2 Dynamo/pyRevit tools",
        "Loom walkthrough + handoff",
      ],
      quoteEligible: true,
      fixedPriceEligible: true,
      estimateLow: 5400, estimateHigh: 7000,
    }),
    S({
      id: "revit-analysis-sync",
      name: "Revit ↔ Analysis Sync",
      category: "Automation + Integration",
      time: "5 weeks",
      priceLabel: "from $13,500",
      bullets: [
        "Exporter/validator round-trip integration",
        "Parameter mapping with guardrails",
        "Pilot deployment & QA",
      ],
      quoteEligible: true,
      estimateLow: 13500, estimateHigh: 22000,
    }),
    S({
      id: "plugin-dev",
      name: "Software & Plugin Development",
      category: "Automation + Integration",
      time: "6–8 weeks",
      priceLabel: "from $20,000",
      bullets: [
        "C#/Python add-ins or pyRevit bundles",
        "Deployment packaging",
        "Docs + training",
      ],
      quoteEligible: true,
      estimateLow: 20000, estimateHigh: 40000,
    }),
  ],

  "Coordination + Digital Delivery": [
    S({
      id: "coordination",
      name: "Coordination & Clash Management",
      category: "Coordination + Digital Delivery",
      time: "3–4 weeks",
      priceLabel: "from $8,000",
      bullets: [
        "Navisworks/BIM Collaborate setup",
        "Clash KPI dashboards",
        "Coordination meeting support",
      ],
      quoteEligible: true,
      estimateLow: 8000, estimateHigh: 16000,
    }),
    S({
      id: "process-optimization",
      name: "Process & Workflow Optimization",
      category: "Coordination + Digital Delivery",
      time: "5–6 weeks",
      priceLabel: "from $18,000",
      bullets: [
        "As-Is → To-Be process mapping",
        "Revit↔PowerBI↔Excel automation",
        "Reporting templates",
      ],
      quoteEligible: true,
      estimateLow: 18000, estimateHigh: 30000,
    }),
    S({
      id: "digital-twin-gis",
      name: "Digital Twin + GIS Integration",
      category: "Coordination + Digital Delivery",
      time: "6–8 weeks",
      priceLabel: "from $18,900",
      bullets: [
        "ArcGIS / InfraWorks / iTwin setup",
        "Asset data linking + visualization",
        "Power BI + IoT dashboarding",
      ],
      quoteEligible: true,
      estimateLow: 18900, estimateHigh: 40000,
    }),
  ],

  "3D Visualization + Scan Data": [
    S({
      id: "pure-3d",
      name: "3D Modeling & Product Design",
      category: "3D Visualization + Scan Data",
      time: "3–4 weeks",
      priceLabel: "from $6,000",
      bullets: [
        "Fusion/Inventor/Alias/Rhino/Blender workflows",
        "Fabrication-ready geometry",
        "AEC + manufacturing hybrid modeling",
      ],
      quoteEligible: true,
      fixedPriceEligible: true,
      estimateLow: 6000, estimateHigh: 12000,
    }),
    S({
      id: "render-suite",
      name: "Visualization & Rendering Suite",
      category: "3D Visualization + Scan Data",
      time: "2–3 weeks",
      priceLabel: "from $5,100",
      bullets: [
        "Lumion / Enscape / D5 renderings",
        "Lighting + materials optimization",
        "Stills, 360°, or flythrough",
      ],
      quoteEligible: true,
      fixedPriceEligible: true,
      estimateLow: 5100, estimateHigh: 9000,
    }),
    S({
      id: "scan-to-bim",
      name: "Point Cloud / Scan-to-BIM",
      category: "3D Visualization + Scan Data",
      time: "5–6 weeks",
      priceLabel: "from $11,000",
      bullets: [
        "ReCap / CloudCompare processing",
        "Revit/Civil3D/Plant3D reconstruction",
        "Survey alignment + tolerance QA",
      ],
      quoteEligible: true,
      estimateLow: 11000, estimateHigh: 22000,
    }),
  ],

  "Management + Training": [
    S({
      id: "bim-training",
      name: "BIM Training & Team Development",
      category: "Management + Training",
      time: "4 sessions",
      priceLabel: "from $2,400 (group)",
      bullets: [
        "Revit / Navisworks / Dynamo training",
        "Custom playbooks & onboarding",
        "Hands-on workflows",
      ],
      quoteEligible: true,
      fixedPriceEligible: true,
      estimateLow: 2400, estimateHigh: 4800,
    }),
        S({
      id: "pm-controls",
      name: "Project Planning & Controls (PM/PC)",
      category: "Management + Training",
      time: "4 weeks",
      priceLabel: "from $9,600",
      bullets: [
        "WBS, baseline schedule & dashboards",
        "P6 / Synchro / MS Project setup",
        "Cost forecasting & risk tracking",
      ],
      quoteEligible: true,
      estimateLow: 9600,
      estimateHigh: 16000,
    }),
    S({
      id: "vdc-4d5d",
      name: "4D/5D VDC Planning",
      category: "Management + Training",
      time: "6–8 weeks",
      priceLabel: "from $14,400",
      bullets: [
        "Synchro 4D model-linked sequencing",
        "Cost + schedule dashboards",
        "Executive visualization package",
      ],
      quoteEligible: true,
      estimateLow: 14400,
      estimateHigh: 28000,
    }),
  ],
};

// (optional helper export)
export const ALL_SERVICES: Service[] = Object.values(SERVICES).flat();

