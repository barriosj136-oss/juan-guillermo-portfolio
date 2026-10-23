import type { Metadata } from "next";
import DecisionCopilot from "./decision-copilot";

export const metadata: Metadata = {
  title: "Operations Decision Copilot | Juan Guillermo Barrios Villamil",
  description: "A browser-based, rule-driven prototype for organizing a fictional operations case into confirmed facts, open questions, and verification steps.",
  alternates: { canonical: "/projects/operations-decision-copilot" },
  openGraph: {
    title: "Operations Decision Copilot",
    description: "A browser-based case-review prototype that structures facts, questions, and next checks for human review.",
    url: "https://portfolio-nu-ashy-28.vercel.app/projects/operations-decision-copilot",
    type: "article",
    images: [{ url: "/portfolio-og.png", width: 1200, height: 630, alt: "Operations Decision Copilot case review prototype" }],
  },
};

export default function Page() {
  return <DecisionCopilot />;
}
