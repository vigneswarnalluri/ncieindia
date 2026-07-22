import React, { Suspense } from "react";
import { Metadata } from "next";
import MediaClient from "./MediaClient";

export const metadata: Metadata = {
  title: "Press Releases, Circulars & Media Gallery | NCIE India",
  description:
    "Official press center for NCIE India. Access national circulars, policy notifications, media releases, photo galleries, and institutional announcements.",
  keywords: [
    "NCIE Press Releases",
    "NCIE Circulars",
    "NCIE Official Notifications",
    "Innovation India Media Desk",
    "NCIE Photo Gallery",
    "Viksit Bharat Chapter Announcements",
  ],
  alternates: {
    canonical: "https://ncieindia.org/media",
  },
  openGraph: {
    title: "Press Releases, Circulars & Media Gallery | NCIE India",
    description:
      "Official press center for NCIE India. Access national circulars, policy notifications, media releases, photo galleries, and institutional announcements.",
    url: "https://ncieindia.org/media",
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
        name: "Media & Press",
        item: "https://ncieindia.org/media",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500 font-mono">Loading Media Center...</div>}>
        <MediaClient />
      </Suspense>
    </>
  );
}
