import React, { Suspense } from "react";
import { Metadata } from "next";
import PartnershipsClient from "./PartnershipsClient";

export const metadata: Metadata = {
  title: "CSR, Academic & Industrial Alliances | NCIE India",
  description:
    "Partner with NCIE India to accelerate collegiate innovation chapters, corporate CSR funding funnels, incubation hubs, and industry-academia technology transfer.",
  keywords: [
    "NCIE Institutional Partnerships",
    "CSR Funding Alliances",
    "Industry Academia Collaboration",
    "Collegiate Incubation Support",
    "Technology Transfer India",
    "Viksit Bharat Partner Network",
  ],
  alternates: {
    canonical: "https://ncieindia.org/partnerships",
  },
  openGraph: {
    title: "CSR, Academic & Industrial Alliances | NCIE India",
    description:
      "Partner with NCIE India to accelerate collegiate innovation chapters, corporate CSR funding funnels, incubation hubs, and industry-academia technology transfer.",
    url: "https://ncieindia.org/partnerships",
    siteName: "NCIE India",
    type: "website",
  },
};

export default function Page() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ncieindia.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Partnerships",
        item: "https://ncieindia.org/partnerships",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500 font-mono">Loading Partnerships...</div>}>
        <PartnershipsClient />
      </Suspense>
    </>
  );
}
