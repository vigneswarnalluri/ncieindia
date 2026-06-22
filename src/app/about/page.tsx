import React from "react";
import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About NCIE India | Council for Innovation & Entrepreneurship",
  description:
    "Learn about NCIE India's institutional objectives, advisory council, performance metrics, and regional chapters driving collegiate innovation.",
  keywords: [
    "About NCIE India",
    "Advisory Council",
    "MoE Innovation Cell",
    "Technical Chapters Desk",
    "Regional Zones",
    "Performance Indicators",
  ],
  alternates: {
    canonical: "https://ncieindia.org/about",
  },
  openGraph: {
    title: "About NCIE India | Council for Innovation & Entrepreneurship",
    description:
      "Learn about NCIE India's institutional objectives, advisory council, performance metrics, and regional chapters driving collegiate innovation.",
    url: "https://ncieindia.org/about",
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
        "name": "About",
        "item": "https://ncieindia.org/about",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
