import React, { Suspense } from "react";
import { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers & Official Recruitment Portal | NCIE India",
  description:
    "Explore official career opportunities, executive positions, research fellowships, and administrative vacancies at NCIE India.",
  keywords: [
    "NCIE Careers",
    "NCIE Vacancies",
    "NCIE Recruitment Portal",
    "Government Alignment Jobs Innovation",
    "NCIE Research Fellowships",
  ],
  alternates: {
    canonical: "https://ncieindia.org/careers",
  },
  openGraph: {
    title: "Careers & Official Recruitment Portal | NCIE India",
    description:
      "Explore official career opportunities, executive positions, research fellowships, and administrative vacancies at NCIE India.",
    url: "https://ncieindia.org/careers",
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
        name: "Careers & Recruitment",
        item: "https://ncieindia.org/careers",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500 font-mono">Loading Careers Portal...</div>}>
        <CareersClient />
      </Suspense>
    </>
  );
}
