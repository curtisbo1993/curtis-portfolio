// src/pages/Privacy.tsx
// @ts-nocheck
import React from "react";
import LegalLayout from "@/components/LegalLayout";

export default function PrivacyPage() {
  const toc = [
    { href: "#about", label: "About This Policy" },
    { href: "#collect", label: "Information We Collect" },
    { href: "#use", label: "How We Use Information" },
    { href: "#share", label: "When We Share Information" },
    { href: "#cookies", label: "Cookies & Analytics" },
    { href: "#security", label: "Security" },
    { href: "#retention", label: "Data Retention" },
    { href: "#rights", label: "Your Choices & Rights" },
    { href: "#minors", label: "Children’s Privacy" },
    { href: "#intl", label: "International Users" },
    { href: "#updates", label: "Changes to this Policy" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <LegalLayout title="Privacy Policy" toc={toc}>
      <p>
        CB Design Consultants LLC (“we”, “us”) respects your privacy. This Policy explains what data we collect, how
        we use it, how we share it, and the choices you have.
      </p>

      <h2 id="about" className="mt-10">1. About This Policy</h2>
      <p>Applies to cb-designconsultants.com and related forms, demos, and downloads (the “Website”).</p>

      <h2 id="collect">2. Information We Collect</h2>
      <ul>
        <li><strong>Contact/Submissions:</strong> name, email, company, message.</li>
        <li><strong>Usage/Logs:</strong> IP, device/browser, pages, timestamps, referrers (security/performance).</li>
        <li><strong>Cookies:</strong> essential + analytics (see below).</li>
        <li><strong>Demo Interactions:</strong> non-sensitive telemetry for stability/UX.</li>
      </ul>
      <p className="text-sm opacity-80">We do not intentionally collect sensitive data and do not target individuals under 18.</p>

      <h2 id="use">3. How We Use Information</h2>
      <ul>
        <li>Respond to inquiries and provide services.</li>
        <li>Operate, secure, and improve the Website and demos.</li>
        <li>Analyze aggregated usage to enhance performance.</li>
        <li>Maintain records and comply with legal obligations.</li>
      </ul>

      <h2 id="share">4. When We Share Information</h2>
      <p>We do not sell personal information. Limited sharing with service providers under contract:</p>
      <ul>
        <li><strong>Hosting/Analytics:</strong> Vercel, Google Analytics</li>
        <li><strong>Forms:</strong> Formspree</li>
        <li><strong>Media/Dev:</strong> GitHub, YouTube/Vimeo (if embedded)</li>
      </ul>
      <p>We may disclose if required by law, to protect rights/safety, or in a reorganization/transaction.</p>

      <h2 id="cookies">5. Cookies & Analytics</h2>
      <p>Essential cookies for core functionality; analytics cookies for traffic patterns. Manage cookies in your browser.</p>

      <h2 id="security">6. Security</h2>
      <p>We use administrative, technical, and physical safeguards (HTTPS/TLS, access controls, 2FA). No method is 100% secure.</p>

      <h2 id="retention">7. Data Retention</h2>
      <p>We keep submission records while needed for business/legal reasons, then delete or de-identify. Aggregated analytics only.</p>

      <h2 id="rights">8. Your Choices & Rights</h2>
      <ul>
        <li><strong>Access/Deletion/Correction:</strong> <a href="mailto:privacy@cb-designconsultants.com">privacy@cb-designconsultants.com</a></li>
        <li><strong>Communications:</strong> unsubscribe from promotional emails.</li>
        <li><strong>Browser Controls:</strong> manage cookies; some browsers support Do Not Track.</li>
      </ul>

      <h2 id="minors">9. Children’s Privacy</h2>
      <p>The Website is not directed to individuals under 18; contact us to remove any such data.</p>

      <h2 id="intl">10. International Users</h2>
      <p>We operate in the United States; your data may be processed there under U.S. law.</p>

      <h2 id="updates">11. Changes to this Policy</h2>
      <p>We may update this Policy; the date above reflects the latest version.</p>

      <h2 id="contact">12. Contact</h2>
      <p>
        <a href="mailto:privacy@cb-designconsultants.com">privacy@cb-designconsultants.com</a> • Austin, Texas •
        © {new Date().getFullYear()} CB Design Consultants LLC
      </p>
    </LegalLayout>
  );
}
