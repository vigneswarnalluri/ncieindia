import React, { Suspense } from "react";
import { Metadata } from "next";
import OpportunitiesClient from "./OpportunitiesClient";

export const metadata: Metadata = {
  title: "Opportunities, Fellowships & Innovation Grants | NCIE India",
  description:
    "Explore active NCIE Viksit Bharat 2047 Innovation Leadership Programs, research fellowships, startup seed grants, and innovation challenges for students and collegiate founders.",
  keywords: [
    "NCIE Innovation Fellowships",
    "NCIE Innovation Leadership Programs Opportunities",
    "Student Startup Grants",
    "Centenary Research Fellowship",
    "Incubation Seed Funding",
    "Civic Tech Challenges",
  ],
  alternates: {
    canonical: "https://ncieindia.org/opportunities",
  },
  openGraph: {
    title: "Opportunities, Fellowships & Innovation Grants | NCIE India",
    description:
      "Explore active NCIE Viksit Bharat 2047 Innovation Leadership Programs, research fellowships, startup seed grants, and innovation challenges for students and collegiate founders.",
    url: "https://ncieindia.org/opportunities",
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
        name: "Opportunities",
        item: "https://ncieindia.org/opportunities",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500 font-mono">Loading Opportunities...</div>}>
        <OpportunitiesClient />
      </Suspense>
    </>
  );
}
