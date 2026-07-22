import React, { Suspense } from "react";
import { Metadata } from "next";
import ChaptersClient from "./ChaptersClient";

export const metadata: Metadata = {
  title: "Regional & Institutional Chapters Network | NCIE India",
  description:
    "Explore NCIE India's dual-tier framework establishing State Administrative Chapters and Collegiate Innovation Chapters across higher education institutions in India.",
  keywords: [
    "NCIE Regional Chapters",
    "Collegiate Innovation Chapters",
    "State Administrative Network",
    "Higher Education Chapters",
    "Student Maker Clubs",
    "Viksit Bharat Chapter Initiative",
  ],
  alternates: {
    canonical: "https://ncieindia.org/chapters",
  },
  openGraph: {
    title: "Regional & Institutional Chapters Network | NCIE India",
    description:
      "Explore NCIE India's dual-tier framework establishing State Administrative Chapters and Collegiate Innovation Chapters across higher education institutions in India.",
    url: "https://ncieindia.org/chapters",
    siteName: "NCIE India",
    type: "website",
  },
};

export default function ChaptersPage() {
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
        name: "Chapters",
        item: "https://ncieindia.org/chapters",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500 font-mono">Loading Chapters...</div>}>
        <ChaptersClient />
      </Suspense>
    </>
  );
}
