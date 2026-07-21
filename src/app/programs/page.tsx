import React from "react";
import { Metadata } from "next";
import ProgramsClient from "./ProgramsClient";

export const metadata: Metadata = {
  title: "Programs & Schemes Catalog | NCIE India",
  description:
    "Explore NCIE India's institutional startup schemes, innovation grants, design-thinking bootcamps, and patent filing support calendars.",
  keywords: [
    "Innovation Schemes",
    "Incubation Grants",
    "NCIE Viksit Bharat 2047 Innovation Leadership Programs",
    "Student Startup Grants",
    "Seed Funding Program",
    "Innovation India Council",
  ],
  alternates: {
    canonical: "https://ncieindia.org/programs",
  },
  openGraph: {
    title: "Programs & Schemes Catalog | NCIE India",
    description:
      "Explore NCIE India's institutional startup schemes, innovation grants, design-thinking bootcamps, and patent filing support calendars.",
    url: "https://ncieindia.org/programs",
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
        "name": "Programs",
        "item": "https://ncieindia.org/programs",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProgramsClient />
    </>
  );
}
