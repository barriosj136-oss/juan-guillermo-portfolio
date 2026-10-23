import type { Metadata } from "next";
import OperationsCase from "./project-case";
export const metadata: Metadata = {
  title: "Operations Data Review Prototype | Juan Guillermo Barrios",
  description: "An interactive browser prototype for record search, filtering, CSV preparation, and review tracking, populated with synthetic sample records.",
  alternates: { canonical: "/projects/operations-data-review-suite" },
  openGraph: {
    title: "Operations Data Review Prototype",
    description: "Interactive record search, filtering, CSV preparation, and review tracking prototype.",
    url: "https://portfolio-nu-ashy-28.vercel.app/projects/operations-data-review-suite",
    type: "article",
    images: [{ url: "/portfolio-og.png", width: 1200, height: 630, alt: "Operations data review prototype" }],
  },
};
export default function Page() { return <OperationsCase />; }
