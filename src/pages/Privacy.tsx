// src/pages/Privacy.tsx
// @ts-nocheck
import React from "react";

export default function PrivacyPage() {
  return (
    <section className="prose prose-invert mx-auto max-w-3xl py-16 px-4 sm:px-6 lg:px-8">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <p>
        CB Design Consultants (“we,” “our,” “us”) values your privacy.  
        This policy explains what information we collect, how we use it,
        and the rights you have when interacting with our website or services.
      </p>

      <h2>1. Who We Are</h2>
      <p>
        CB Design Consultants LLC, a subsidiary of Johnson & Young Corporation.  
        Email us at 
        <a href="mailto:info@cb-designconsultants.com">
          info@cb-designconsultants.com
        </a>.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>
          <strong>Form Submissions:</strong> Name, email, and message from our contact form.
        </li>
        <li>
          <strong>Usage Data:</strong> Anonymous analytics from Vercel Analytics and Formspree (for delivery status).
        </li>
        <li>
          <strong>Cookies:</strong> We use basic cookies and browser storage for site performance only.
        </li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>Respond to inquiries and provide requested services.</li>
        <li>Improve site performance and security.</li>
        <li>Maintain records of client communication and project engagements.</li>
      </ul>

      <h2>4. Data Sharing & Storage</h2>
      <p>
        We do not sell or rent personal information.  
        Limited data may be processed by our trusted service providers
        (Formspree, Vercel, and Google Fonts) under their respective privacy policies.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain contact form messages for as long as necessary to respond and comply with legal obligations.
        Analytics data is stored only in aggregate form.
      </p>

      <h2>6. Your Rights</h2>
      <ul>
        <li>Request a copy or deletion of your data by emailing us.</li>
        <li>Opt out of analytics by using a browser with Do Not Track enabled.</li>
      </ul>

      <h2>7. Security</h2>
      <p>
        Our site uses HTTPS encryption and industry-standard hosting security through Vercel.
        We take reasonable measures to protect data but cannot guarantee absolute security online.
      </p>

      <h2>8. Links to Other Sites</h2>
      <p>
        Our website may link to external resources for education or project examples.
        We are not responsible for their content or privacy practices.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time.
        Updates will appear on this page with a new “Last updated” date.
      </p>
    </section>
  );
}
