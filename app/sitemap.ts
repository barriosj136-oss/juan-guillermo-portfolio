import type { MetadataRoute } from "next";
import { opsViews } from "./projects/ops-studio/views";

const siteUrl = "https://portfolio-nu-ashy-28.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/resume",
    "/projects/bogota-budget",
    "/projects/novatech",
    "/projects/operations-decision-copilot",
    "/operations-data-review-suite/",
    ...opsViews.map(({ slug }) => `/projects/ops-studio/${slug}`),
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
