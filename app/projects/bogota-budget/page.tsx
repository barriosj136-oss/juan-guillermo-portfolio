import type { Metadata } from "next";
import BogotaBudgetCase from "./project-case";

export const metadata: Metadata = {
  title: "Bogotá 2025 Budget Commitments | Juan Guillermo Barrios",
  description: "Public-data analysis of Bogotá's cumulative budget commitments in 2025, with documented cleaning, SQL model, Python checks and monthly trend.",
  alternates: { canonical: "/projects/bogota-budget" },
  openGraph: {
    title: "Bogotá 2025 Budget Commitments",
    description: "A reproducible public-data analysis of cumulative budget commitments in Bogotá.",
    url: "https://portfolio-nu-ashy-28.vercel.app/projects/bogota-budget",
    type: "article",
    images: [{ url: "/portfolio-og.png", width: 1200, height: 630, alt: "Bogotá public-budget commitment analysis" }],
  },
};

export default function Page() { return <BogotaBudgetCase />; }
