import React, { Suspense } from "react";
import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Official Contact Desks & Central Secretariat | NCIE India",
  description:
    "Get in touch with NCIE India's Central Secretariat, CEO Desk, Executive Director Desk, Nodal Implementation Agency, and CSR Partnership Desk.",
  keywords: [
    "NCIE Contact Desk",
    "Central Secretariat HQ",
    "NCIE India Address",
    "Nodal Officer Desk",
    "CEO Desk NCIE",
    "NCIE Support Helpdesk",
  ],
  alternates: {
    canonical: "https://ncieindia.org/contact",
  },
  openGraph: {
    title: "Official Contact Desks & Central Secretariat | NCIE India",
    description:
      "Get in touch with NCIE India's Central Secretariat, CEO Desk, Executive Director Desk, Nodal Implementation Agency, and CSR Partnership Desk.",
    url: "https://ncieindia.org/contact",
    siteName: "NCIE India",
    type: "website",
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact NCIE India Central Secretariat",
    url: "https://ncieindia.org/contact",
    mainEntity: {
      "@type": "Organization",
      name: "National Council for Innovation and Entrepreneurship (NCIE) India",
      telephone: "0863 232 1417",
      email: "office@ncieindia.org",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Old Secretariat, Near Vidhan Sabha",
        addressLocality: "Delhi",
        postalCode: "110054",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500 font-mono">Loading Contact Page...</div>}>
        <ContactClient />
      </Suspense>
    </>
  );
}
