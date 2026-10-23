import type { Metadata } from "next";
import ResumeClient from "./resume-client";

export const metadata: Metadata = {
  title: "Résumé | Juan Guillermo Barrios",
  description: "Professional résumé for Juan Guillermo Barrios, with experience, education, selected projects, and contact links.",
};

export default function ResumePage() {
  return <ResumeClient />;
}
