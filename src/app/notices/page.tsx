import React, { Suspense } from "react";
import { Metadata } from "next";
import NoticesClient from "./NoticesClient";

export const metadata: Metadata = {
  title: "Public Notices, Bulletins & Circulars | NCIE India",
  description:
    "Official Notice Board for the National Council for Innovation & Entrepreneurship (NCIE). Access public bulletins, recruitment notices, seed grant calls, fellowships, and circulars.",
  keywords: [
    "NCIE Notices",
    "NCIE Circulars",
    "NCIE Recruitment 2026",
    "NCIE Grants & Fellowships",
    "Viksit Bharat Circulars",
    "Innovation India Bulletins",
  ],
  alternates: {
    canonical: "https://ncieindia.org/notices",
  },
  openGraph: {
    title: "Public Notices, Bulletins & Circulars | NCIE India",
    description:
      "Official Notice Board for the National Council for Innovation & Entrepreneurship (NCIE). Access public bulletins, recruitment notices, seed grant calls, fellowships, and circulars.",
    url: "https://ncieindia.org/notices",
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
        name: "Public Notices",
        item: "https://ncieindia.org/notices",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500 font-mono">Loading Public Notice Board...</div>}>
        <NoticesClient />
      </Suspense>
    </>
  );
}
