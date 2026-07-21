import React from "react";
import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | NCIE India",
  description:
    "Official privacy protection guidelines and data collection safety directives for collegiate innovation chapters, SPOC registers, and grant records on the NCIE India portal.",
  keywords: [
    "Privacy Policy",
    "Data Collection",
    "JWT Session security",
    "OTP verification expiration",
    "AISHE directories data safety",
  ],
  alternates: {
    canonical: "https://ncieindia.org/privacy",
  },
  openGraph: {
    title: "Privacy Policy | NCIE India",
    description:
      "Official privacy protection guidelines and data collection safety directives for collegiate innovation chapters, SPOC registers, and grant records on the NCIE India portal.",
    url: "https://ncieindia.org/privacy",
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
        "name": "Privacy Policy",
        "item": "https://ncieindia.org/privacy",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PrivacyClient />
    </>
  );
}
