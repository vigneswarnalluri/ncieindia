import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ncieindia.org";

  const staticPages = [
    "",
    "/about",
    "/chapters",
    "/contact",
    "/join",
    "/media",
    "/opportunities",
    "/partnerships",
    "/programs",
    "/vision-2047",
    "/terms",
    "/privacy",
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic program paths
  let programIds = [
    "student-internships",
    "student-fellowships",
    "student-scholarships",
    "student-startup-grants",
    "startup-seed-funding",
    "institutional-incubation-support",
    "csr-rural-support",
    "iic-recognition-program",
    "free-training-program",
  ];

  try {
    const { data } = await supabase.from("programs").select("id");
    if (data && data.length > 0) {
      programIds = data.map((p) => p.id);
    }
  } catch (err) {
    console.error("Sitemap programs query error, using static fallback:", err);
  }

  const dynamicRoutes = programIds.map((id) => ({
    url: `${baseUrl}/programs/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
