import React from "react";
import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "NCIE India | National Council for Innovation and Entrepreneurship",
  description:
    "Building India's largest student innovation and entrepreneurship ecosystem under the Ministry of Education (MoE). Explore collegiate chapters, KAPILA patent support, SIH hackathons, and incubation grants.",
  keywords: [
    "NCIE India",
    "National Council for Innovation and Entrepreneurship",
    "Ministry of Education",
    "Institution's Innovation Council",
    "IIC network",
    "Smart India Hackathon",
    "SIH 2025",
    "KAPILA patent support",
    "YUKTI repository",
    "startup India",
    "collegiate chapters",
    "Civic Tech India",
  ],
  alternates: {
    canonical: "https://ncieindia.org",
  },
  openGraph: {
    title: "NCIE India | National Council for Innovation and Entrepreneurship",
    description:
      "Building India's largest student innovation and entrepreneurship ecosystem under the Ministry of Education (MoE). Explore collegiate chapters, KAPILA patent support, SIH hackathons, and incubation grants.",
    url: "https://ncieindia.org",
    siteName: "NCIE India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://ncieindia.org/logo-new.png",
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
      "Building India's largest student innovation and entrepreneurship ecosystem under the Ministry of Education (MoE). Explore collegiate chapters, KAPILA patent support, SIH hackathons, and incubation grants.",
    images: ["https://ncieindia.org/logo-new.png"],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "National Council for Innovation and Entrepreneurship (NCIE) India",
    "alternateName": "NCIE India",
    "url": "https://ncieindia.org",
    "logo": "https://ncieindia.org/logo-new.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "1800-180-0093",
      "contactType": "technical support",
      "email": "support-iic@mic.gov.in",
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
