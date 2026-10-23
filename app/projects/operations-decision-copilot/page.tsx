import type { Metadata } from "next";
import OperationsDecisionCopilot from "./copilot";

export const metadata: Metadata = {
  title: "Operations Decision Copilot | Juan Guillermo Barrios",
  description: "A bilingual practice case for organizing evidence, open questions, and operational follow-up.",
  alternates: { canonical: "/projects/operations-decision-copilot" },
  openGraph: {
    title: "Operations Decision Copilot Practice Case",
    description: "A bilingual decision-support prototype for organizing evidence, open questions, and follow-up steps.",
    url: "https://portfolio-nu-ashy-28.vercel.app/projects/operations-decision-copilot",
    type: "article",
    images: [{ url: "/portfolio-og.png", width: 1200, height: 630, alt: "Operations decision support practice case" }],
  },
};

export default function Page() {
  return <OperationsDecisionCopilot />;
}
