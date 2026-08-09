import React, { Suspense } from "react";
import { Metadata } from "next";
import DirectorClient from "./DirectorClient";

export const metadata: Metadata = {
  title: "Executive Director Desk | NCIE India",
  description:
    "Read the message and vision statement from the Executive Director of the National Council for Innovation & Entrepreneurship (NCIE) India.",
  keywords: [
    "Executive Director NCIE",
    "Dr. Elia Thagaram",
    "NCIE Leadership",
    "Viksit Bharat 2047",
    "Collegiate Innovation",
  ],
  alternates: {
    canonical: "https://ncieindia.org/executive-director",
  },
  openGraph: {
    title: "Executive Director Desk | NCIE India",
    description:
      "Read the message and vision statement from the Executive Director of the National Council for Innovation & Entrepreneurship (NCIE) India.",
    url: "https://ncieindia.org/executive-director",
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
        "name": "Executive Director",
        "item": "https://ncieindia.org/executive-director",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500 font-mono">Loading Executive Director Desk...</div>}>
        <DirectorClient />
      </Suspense>
    </>
  );
}
