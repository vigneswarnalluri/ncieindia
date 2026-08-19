import React, { Suspense } from "react";
import { Metadata } from "next";
import JoinClient from "./JoinClient";

export const metadata: Metadata = {
  title: "Apply for Internships, Memberships & Campus Chapters | NCIE India",
  description:
    "Join NCIE India. Apply for Viksit Bharat 2047 Internships, Innovation Leadership Programs, Student Memberships, and Institutional Campus Chapters.",
  keywords: [
    "NCIE Internship Application",
    "NCIE Application Portal",
    "NCIE Viksit Bharat 2047 Innovation Leadership Programs Registration",
    "Campus Chapter Affiliation",
    "Student Membership Registration",
    "Institutional Partnership Application",
  ],
  alternates: {
    canonical: "https://ncieindia.org/join",
  },
  openGraph: {
    title: "Apply for Internships, Memberships & Campus Chapters | NCIE India",
    description:
      "Join NCIE India. Apply for Viksit Bharat 2047 Internships, Innovation Leadership Programs, Student Memberships, and Institutional Campus Chapters.",
    url: "https://ncieindia.org/join",
    siteName: "NCIE India",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for Internships, Memberships & Campus Chapters | NCIE India",
    description:
      "Join NCIE India. Apply for Viksit Bharat 2047 Internships, Innovation Leadership Programs, Student Memberships, and Institutional Campus Chapters.",
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
        name: "Join / Register",
        item: "https://ncieindia.org/join",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500 font-mono">Loading Registration Gateway...</div>}>
        <JoinClient />
      </Suspense>
    </>
  );
}
