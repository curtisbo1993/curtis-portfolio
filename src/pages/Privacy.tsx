// src/pages/Privacy.tsx
// @ts-nocheck
import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-semibold">Privacy Policy</h1>
      <p className="text-white/70 mt-2">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="prose prose-invert prose-sm md:prose-base mt-6">
        <p>
          CB Design Consultants (“we,” “us,” “our”) provides design-technology,
          BIM, and software services. This Privacy Policy explains how we
          collect, use, and safeguard information when you visit our website,
          contact us, or engage our services.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li><strong>Contact data</strong> (name, email, company, phone) you submit through forms or email.</li>
          <li><strong>Project data</strong> you share for discovery, proposals, or delivery.</li>
          <li><strong>Usage data</strong> (device, browser, pages visited) via cookies/analytics.</li>
        </ul>

        <h2>2. How We Use Information</h2>
        <ul>
          <li>To respond to inquiries and provide proposals/services.</li>
          <li>To operate, secure, and improve our website and offerings.</li>
          <li>For legal compliance, fraud prevention, and recordkeeping.</li>
        </ul>

        <h2>3. Legal Bases (EEA/UK)</h2>
        <ul>
          <li><strong>Contract:</strong> to deliver requested services.</li>
          <li><strong>Legitimate interests:</strong> site security, analytics, communication.</li>
          <li><strong>Consent:</strong> where required (e.g., certain cookies or marketing).</li>
        </ul>

        <h2>4. Cookies & Analytics</h2>
        <p>
          We may use cookies and privacy-respecting analytics to understand site
          performance. You can control cookies in your browser settings.
        </p>

        <h2>5. Sharing</h2>
        <p>
          We do not sell personal information. We share data only with:
          (i) service providers (e.g., hosting, email, form handling);
          (ii) professional advisors; and (iii) when required by law.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain information as needed for the purposes above, to comply with
          legal obligations, and to resolve disputes.
        </p>

        <h2>7. Security</h2>
        <p>
          We use reasonable administrative, technical, and organizational
          measures to protect information. No method of transmission or storage
          is 100% secure.
        </p>

        <h2>8. Your Rights</h2>
        <ul>
          <li>Access, correct, or delete your personal information.</li>
          <li>Object to or restrict processing in certain cases.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Data portability (where applicable).</li>
        </ul>
        <p>To exercise rights, contact: <a href="mailto:cbolden@cb-designconsultants.com">cbolden@cb-designconsultants.com</a>.</p>

        <h2>9. CCPA/CPRA (California)</h2>
        <p>
          California residents may request access to, deletion of, or details
          about personal information, and opt out of certain sharing. We do not
          “sell” personal information as defined by CPRA.
        </p>

        <h2>10. Children</h2>
        <p>Our site and services are not directed to children under 13.</p>

        <h2>11. International Transfers</h2>
        <p>
          If you access our site from outside the U.S., your information may be
          processed in the U.S. and other countries with different data laws.
        </p>

        <h2>12. Third-Party Links</h2>
        <p>We are not responsible for the privacy practices of external sites.</p>

        <h2>13. Changes</h2>
        <p>
          We may update this Policy. The “Last updated” date will reflect the
          current version.
        </p>

        <h2>14. Contact</h2>
        <p>
          Questions? Contact{" "}
          <a href="mailto:cbolden@cb-designconsultants.com">
            cbolden@cb-designconsultants.com
          </a>.
        </p>
      </div>
    </div>
  );
}
