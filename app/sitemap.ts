import type { MetadataRoute } from "next";

const siteUrl = "https://portfolio-nu-ashy-28.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/resume",
    "/learning",
    "/projects/bogota-budget",
    "/projects/novatech",
    "/projects/operations-decision-copilot",
    "/operations-data-review-suite/",
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
