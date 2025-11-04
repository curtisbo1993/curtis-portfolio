// src/pages/Terms.tsx
// @ts-nocheck
import React from "react";

export default function TermsPage() {
  return (
    <section className="prose prose-invert mx-auto max-w-3xl py-16 px-4 sm:px-6 lg:px-8">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <p>
        By accessing or using this website, you agree to these Terms of Service.
        If you do not agree, please do not use our site or services.
      </p>

      <h2>1. Business Information</h2>
      <p>
        CB Design Consultants LLC operates as a subsidiary of Johnson & Young Corporation.  
        We provide BIM/VDC, structural design support, and software development services
        to clients in the United States and abroad.
      </p>

      <h2>2. Use of Our Website</h2>
      <ul>
        <li>You must use this site only for lawful purposes.</li>
        <li>You may not copy, reproduce, or resell our materials without permission.</li>
        <li>Any project examples shown are for demonstration only and may not represent specific client data.</li>
      </ul>

      <h2>3. Intellectual Property</h2>
      <p>
        All content, designs, graphics, and software developed by CB Design Consultants remain our intellectual property.
        Client-specific deliverables are licensed under project agreements or contracts.
      </p>

      <h2>4. Client Engagement Terms</h2>
      <p>
        Work is performed under written agreements or proposals defining scope, payment, and ownership of deliverables.
        Estimates are subject to change based on project complexity and timeline.
      </p>

      <h2>5. Disclaimer of Warranties</h2>
      <p>
        Our website and content are provided “as is.”  
        We make no warranties about accuracy or availability and are not liable for any loss or damage arising from use.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, CB Design Consultants and its affiliates
        are not liable for any indirect, incidental, or consequential damages resulting from use of our site or services.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These terms are governed by the laws of the State of Texas, United States,
        without regard to its conflict of law principles.
      </p>

      <h2>8. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. 
        The latest version will always be posted on this page.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        For questions about these terms, email 
        <a href="mailto:info@cb-designconsultants.com">
          info@cb-designconsultants.com
        </a>.
      </p>
    </section>
  );
}
