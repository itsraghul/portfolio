import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/others",
      },
    ],
    sitemap: "https://raghuls.dev/sitemap.xml",
  };
}
