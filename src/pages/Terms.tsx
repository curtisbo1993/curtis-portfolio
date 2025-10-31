// src/pages/Terms.tsx
// @ts-nocheck
import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-semibold">Terms of Service</h1>
      <p className="text-white/70 mt-2">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-invert prose-sm md:prose-base mt-6">
        <h2>1. Agreement</h2>
        <p>
          These Terms govern your access to and use of CB Design Consultants’
          website and services (“Services”). By engaging us or using our site,
          you agree to these Terms.
        </p>

        <h2>2. Services & Scope</h2>
        <p>
          We provide design-technology, BIM/VDC, automation, software
          development, analytics, and related consulting. We may provide
          prototypes, scripts, exporters, dashboards, training, and process
          documentation.
        </p>

        <h2>3. No Practice of Professional Engineering</h2>
        <p>
          We are not a licensed engineering firm and do not offer or perform
          professional engineering services (including signing/sealing drawings
          or accepting design responsibility). Any analytical results, modeling
          outputs, or recommendations we provide must be reviewed, validated,
          and approved by the Client’s licensed professional(s) before use in
          design, permitting, fabrication, or construction.
        </p>

        <h2>4. Client Responsibilities</h2>
        <ul>
          <li>Provide timely access to accurate project information and stakeholders.</li>
          <li>Review and approve deliverables; obtain licensed professional approvals as required.</li>
          <li>Maintain backups and appropriate IT/security controls for shared data.</li>
        </ul>

        <h2>5. Deliverables & IP</h2>
        <ul>
          <li>
            Unless otherwise stated in a written Statement of Work (SOW) or
            contract, upon full payment the Client receives a non-exclusive,
            perpetual license to use project-specific deliverables internally.
          </li>
          <li>
            We retain ownership of our pre-existing tools, know-how, libraries,
            and frameworks, and may reuse generalized learnings across clients.
          </li>
          <li>
            We may reference non-confidential work outcomes (not proprietary
            data) in our portfolio unless the Client requests confidentiality in
            writing.
          </li>
        </ul>

        <h2>6. Fees, Invoicing, & Taxes</h2>
        <p>
          Fees, schedules, and milestones will be defined in the SOW/proposal.
          Invoices are due upon receipt unless noted otherwise. Late payments
          may incur a finance charge or work pause. Client is responsible for
          applicable taxes.
        </p>

        <h2>7. Confidentiality</h2>
        <p>
          Each party will protect the other’s confidential information and use
          it only for the project. Confidentiality does not apply to information
          already public, independently known, or lawfully obtained from a
          third party.
        </p>

        <h2>8. Acceptable Use</h2>
        <p>
          You agree not to misuse our site or deliverables (e.g., unlawful use,
          reverse engineering beyond license rights, or introducing security
          vulnerabilities).
        </p>

        <h2>9. Warranties & Disclaimers</h2>
        <p>
          Services are provided “as is.” We disclaim all implied warranties
          (merchantability, fitness, non-infringement). We do not guarantee any
          particular business outcome.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, in no event will we be liable
          for indirect, incidental, special, consequential, exemplary, or
          punitive damages. Our total liability for any claim will not exceed
          the amounts paid to us for the specific project giving rise to the
          claim.
        </p>

        <h2>11. Indemnification</h2>
        <p>
          Client will defend and indemnify us from third-party claims arising
          from Client’s misuse of deliverables, failure to obtain licensed
          approvals, or violation of these Terms.
        </p>

        <h2>12. Termination</h2>
        <p>
          Either party may terminate a project for material breach not cured
          within 10 business days after written notice. Client will pay for work
          performed and non-cancelable commitments through the termination date.
        </p>

        <h2>13. Governing Law & Disputes</h2>
        <p>
          These Terms are governed by the laws of <em>[Your State]</em>, without
          regard to conflicts of law. Disputes will be resolved in the state or
          federal courts located in <em>[Your County/State]</em>.
        </p>

        <h2>14. Changes</h2>
        <p>We may update these Terms; continued use constitutes acceptance.</p>

        <h2>15. Contact</h2>
        <p>
          Questions? <a href="mailto:cbolden@cb-designconsultants.com">cbolden@cb-designconsultants.com</a>
        </p>
      </div>
    </div>
  );
}
