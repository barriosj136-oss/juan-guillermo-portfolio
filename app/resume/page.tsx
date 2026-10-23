import type { Metadata } from "next";
import ResumeClient from "./resume-client";

export const metadata: Metadata = {
  title: "Résumé | Juan Guillermo Barrios",
  description: "Bilingual résumé for Juan Guillermo Barrios, Electronic Engineer, with operational analysis experience, education, data certifications, and selected projects.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Résumé | Juan Guillermo Barrios",
    description: "Experience, education, data certifications, selected projects, and contact links.",
    url: "https://portfolio-nu-ashy-28.vercel.app/resume",
    type: "profile",
    images: [{ url: "/portfolio-og.png", width: 1200, height: 630, alt: "Juan Guillermo Barrios · Résumé" }],
  },
};

export default function ResumePage() {
  return <ResumeClient />;
}
