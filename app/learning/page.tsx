import type { Metadata } from "next";
import LearningRoadmap from "./learning-roadmap";

export const metadata: Metadata = {
  title: "Data Analyst Learning Plan | Juan Guillermo Barrios Villamil",
  description: "A practical bilingual learning plan for Power BI, SQL, Python and pandas, using the Bogotá public-budget project as a portfolio exercise.",
  alternates: { canonical: "/learning" },
};

export default function Page() {
  return <LearningRoadmap />;
}
