import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
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
      ],
      disallow: ["/dashboard/", "/login", "/_next/", "/api/"],
    },
    sitemap: "https://ncieindia.org/sitemap.xml",
  };
}
