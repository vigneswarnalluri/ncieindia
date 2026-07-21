import React from "react";
import { Metadata } from "next";
import VisionClient from "./VisionClient";

export const metadata: Metadata = {
  title: "Vision 2047 Centenary Roadmap | NCIE India",
  description:
    "Explore NCIE India's four-phase roadmap aligning collegiate innovation chapters with the Viksit Bharat 2047 centenary goals.",
  keywords: [
    "Viksit Bharat 2047",
    "Centenary Roadmap",
    "Deep-tech integration",
    "Academic incubation targets",
    "Sovereign technology goals",
  ],
  alternates: {
    canonical: "https://ncieindia.org/vision-2047",
  },
  openGraph: {
    title: "Vision 2047 Centenary Roadmap | NCIE India",
    description:
      "Explore NCIE India's four-phase roadmap aligning collegiate innovation chapters with the Viksit Bharat 2047 centenary goals.",
    url: "https://ncieindia.org/vision-2047",
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
        "name": "Vision 2047",
        "item": "https://ncieindia.org/vision-2047",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <VisionClient />
    </>
  );
}
