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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const program = await getProgramData(id);

  if (!program) {
    return {
      title: "Program Not Found | NCIE India",
      description: "The requested NCIE innovation scheme could not be found.",
    };
  }

  const cleanTitle = `${program.title} | Schemes Catalog | NCIE India`;
  const cleanDesc = program.subtitle
    ? `${program.subtitle}. ${program.description.slice(0, 140)}...`
    : program.description.slice(0, 160);

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProgramDetailPageClient />
    </>
  );
}
