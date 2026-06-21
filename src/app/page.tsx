import React from "react";
import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "NCIE India | National Council for Innovation and Entrepreneurship",
  description:
    "Building the world's largest student innovation and entrepreneurship ecosystem under the Innovation India Council. Explore collegiate chapters, student startup grants, seed funding programs, and institutional incubation support.",
  keywords: [
    "NCIE India",
    "Innovation India Council",
    "National Council for Innovation and Entrepreneurship",
    "Student Internships",
    "Student Startup Grants",
    "Seed Funding Program",
    "Institutional Incubation",
    "startup India",
    "collegiate chapters",
    "Civic Tech India",
  ],
  alternates: {
    canonical: "https://ncieindia.org",
    languages: {
      "en-IN": "https://ncieindia.org/?lang=en",
      "hi-IN": "https://ncieindia.org/?lang=hi",
    },
  },
  openGraph: {
    title: "NCIE India | National Council for Innovation and Entrepreneurship",
    description:
      "Building the world's largest student innovation and entrepreneurship ecosystem under the Innovation India Council. Explore collegiate chapters, student startup grants, seed funding programs, and institutional incubation support.",
    url: "https://ncieindia.org",
    siteName: "NCIE India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://ncieindia.org/logo-new.svg",
        width: 800,
        height: 600,
        alt: "NCIE India Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NCIE India | National Council for Innovation and Entrepreneurship",
    description:
      "Building the world's largest student innovation and entrepreneurship ecosystem under the Innovation India Council. Explore collegiate chapters, student startup grants, seed funding programs, and institutional incubation support.",
    images: ["https://ncieindia.org/logo-new.svg"],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "National Council for Innovation and Entrepreneurship (NCIE) India",
    "alternateName": "NCIE India",
    "url": "https://ncieindia.org",
    "logo": "https://ncieindia.org/logo-new.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "0863 232 1417",
      "contactType": "technical support",
      "email": "office@ncieindia.org",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"],
    },
    "sameAs": [
      "https://www.linkedin.com/company/ncieindia",
      "https://www.facebook.com/ncieindiaofficial",
      "https://www.instagram.com/ncieindia",
      "https://x.com/ncieindia",
      "https://youtube.com/@ncie.9",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
