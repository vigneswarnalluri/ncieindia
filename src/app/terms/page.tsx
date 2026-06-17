import React from "react";
import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Use | NCIE India",
  description:
    "Official terms and conditions governing access to the NCIE India portal, institutional SPOC credentials, security rules under Section 66 of the IT Act, and intellectual property terms.",
  keywords: [
    "Terms of Use",
    "Terms and Conditions",
    "Section 66 IT Act",
    "Portal access security",
    "Academic chapter license",
  ],
  alternates: {
    canonical: "https://ncieindia.org/terms",
  },
  openGraph: {
    title: "Terms of Use | NCIE India",
    description:
      "Official terms and conditions governing access to the NCIE India portal, institutional SPOC credentials, security rules under Section 66 of the IT Act, and intellectual property terms.",
    url: "https://ncieindia.org/terms",
    siteName: "NCIE India",
    type: "website",
  },
};

export default function Page() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ncieindia.org",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Terms of Use",
        "item": "https://ncieindia.org/terms",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TermsClient />
    </>
  );
}
