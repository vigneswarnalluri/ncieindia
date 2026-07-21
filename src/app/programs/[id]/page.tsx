import React from "react";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { PROGRAMS_DATA } from "@/data/programsData";
import ProgramDetailPageClient from "./ProgramDetailsClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProgramData(id: string) {
  try {
    const { data } = await supabase
      .from("programs")
      .select("*")
      .eq("id", id)
      .single();
    if (data) return data;
  } catch (err) {
    console.warn("Dynamic metadata program query error:", err);
  }
  return PROGRAMS_DATA.find((p) => p.id === id) || null;
}

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from("programs").select("id");
    if (data && data.length > 0) {
      return data.map((p) => ({ id: p.id }));
    }
  } catch (err) {
    console.warn("generateStaticParams query failed, using static fallbacks:", err);
  }
  return PROGRAMS_DATA.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const program = await getProgramData(id);

  if (!program) {
    return {
      title: "Program Not Found | NCIE India",
      description: "The requested NCIE innovation scheme could not be found.",
    };
  }

  const cleanTitle = `${program.title} | NCIE India`;
  const cleanDesc = program.subtitle
    ? `${program.subtitle}. ${program.description.slice(0, 115)}...`
    : program.description.slice(0, 150);

  return {
    title: cleanTitle,
    description: cleanDesc,
    alternates: {
      canonical: `https://ncieindia.org/programs/${id}`,
    },
    openGraph: {
      title: cleanTitle,
      description: cleanDesc,
      url: `https://ncieindia.org/programs/${id}`,
      siteName: "NCIE India",
      type: "website",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const program = await getProgramData(id);

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
      {
        "@type": "ListItem",
        "position": 3,
        "name": program?.title || "Details",
        "item": `https://ncieindia.org/programs/${id}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is equity taken in seed grant schemes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, all student grants provided under the seed funding programs are entirely equity-free.",
        },
      },
      {
        "@type": "Question",
        "name": "Can we apply without an established college chapter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can register as an independent student member and receive general ecosystem support, but direct institutional nominations require an active campus chapter.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ProgramDetailPageClient />
    </>
  );
}
