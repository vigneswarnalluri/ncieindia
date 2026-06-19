import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/login", "/_next/", "/api/"],
    },
    sitemap: "https://ncieindia.org/sitemap.xml",
  };
}

