// src/pages/Terms.tsx
// @ts-nocheck
import React from "react";
import LegalLayout from "@/components/LegalLayout";

export default function TermsPage() {
  const toc = [
    { href: "#business", label: "Business Information" },
    { href: "#acceptance", label: "Acceptance of Terms" },
    { href: "#use", label: "Permitted & Prohibited Uses" },
    { href: "#ip", label: "Intellectual Property" },
    { href: "#engagement", label: "Client Engagement & Deliverables" },
    { href: "#software", label: "Software, Tools & Downloads" },
    { href: "#warranties", label: "Disclaimer of Warranties" },
    { href: "#liability", label: "Limitation of Liability" },
    { href: "#indemnity", label: "Indemnification" },
    { href: "#availability", label: "Service Availability & Changes" },
    { href: "#links", label: "Third-Party Links" },
    { href: "#law", label: "Governing Law; Venue" },
    { href: "#time", label: "Time to File Claims" },
    { href: "#misc", label: "Miscellaneous" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <LegalLayout title="Terms of Service" toc={toc}>
      <p>
        By accessing cb-designconsultants.com (the “Website”), any related demos, downloads, or software
        (collectively, the “Services”), you agree to these Terms of Service. If you do not agree, do not use the Website or Services.
      </p>

      <h2 id="business" className="mt-10">1. Business Information</h2>
      <p>
        CB Design Consultants LLC (“we”, “us”) operates as a subsidiary of Johnson & Young Corporation.
        We provide BIM/VDC, structural design, coordination, and software/automation development services in the U.S. and internationally.
      </p>

      <h2 id="acceptance">2. Acceptance of Terms</h2>
      <p>
        These Terms may be updated periodically; changes are effective when posted. Continued use constitutes acceptance.
      </p>

      <h2 id="use">3. Permitted & Prohibited Uses</h2>
      <ul>
        <li>Use only for lawful, professional purposes; comply with all applicable laws.</li>
        <li>No copying, scraping, resale, reverse engineering, bypassing security, or interference.</li>
        <li>No malware, bots against rate limits, or misrepresentation of identity.</li>
      </ul>

      <h2 id="ip">4. Intellectual Property</h2>
      <p>
        The site, content, branding, models, scripts, and software (“CB Content”) are owned by CB Design Consultants or licensors.
        No rights are granted except as expressly set out here.
      </p>

      <h2 id="engagement">5. Client Engagement & Deliverables</h2>
      <p>
        Fee-based work is governed by written proposals/agreements that define scope, schedule, payment, confidentiality,
        and ownership/licensing of deliverables. If a conflict exists, the project agreement controls.
      </p>

      <h2 id="software">6. Software, Tools & Downloads</h2>
      <p>
        Any sample code, scripts (Dynamo/Python/pyRevit), plug-ins, spreadsheets, or calculators are provided “AS IS”
        for demonstration/evaluation. You are responsible for verifying compatibility, accuracy, and code compliance.
      </p>

      <h2 id="warranties">7. Disclaimer of Warranties</h2>
      <p>
        THE WEBSITE AND SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
      </p>

      <h2 id="liability">8. Limitation of Liability</h2>
      <p>
        TO THE FULLEST EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
        DAMAGES, OR FOR LOST PROFITS, DATA, GOODWILL, OR BUSINESS INTERRUPTION. OUR TOTAL LIABILITY IS LIMITED TO US$100 OR THE
        AMOUNT PAID FOR THE SERVICE GIVING RISE TO THE CLAIM, WHICHEVER IS GREATER.
      </p>

      <h2 id="indemnity">9. Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold us harmless from claims arising from your violation of these Terms or misuse of the Services.
      </p>

      <h2 id="availability">10. Service Availability & Changes</h2>
      <p>We may modify, suspend, or discontinue features at any time without notice.</p>

      <h2 id="links">11. Third-Party Links</h2>
      <p>Links to Formspree, Vercel, GitHub, YouTube, LinkedIn, etc. are not under our control; review their policies.</p>

      <h2 id="law">12. Governing Law; Venue</h2>
      <p>Texas law governs; exclusive venue is in courts located in Houston, Texas (USA).</p>

      <h2 id="time">13. Time to File Claims</h2>
      <p>Any claim must be filed within one (1) year after it accrues.</p>

      <h2 id="misc">14. Miscellaneous</h2>
      <ul>
        <li><strong>Severability/Waiver:</strong> If a provision is unenforceable, the rest remains in effect; waivers must be in writing.</li>
        <li><strong>Assignment:</strong> We may assign; you may not without consent.</li>
        <li><strong>Electronic Comms:</strong> You consent to electronic notices, contracts, and records.</li>
        <li><strong>Force Majeure:</strong> We’re not liable for events beyond reasonable control.</li>
        <li><strong>Privacy:</strong> Incorporated by reference—see <a href="/privacy">Privacy Policy</a>.</li>
      </ul>

      <h2 id="contact">15. Contact</h2>
      <p>
        <a href="mailto:legal@cb-designconsultants.com">legal@cb-designconsultants.com</a> • Austin, Texas • © {new Date().getFullYear()} CB Design Consultants LLC
      </p>
    </LegalLayout>
  );
}
