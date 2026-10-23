import type { Metadata } from "next";
import OperationsDecisionCopilot from "./copilot";

export const metadata: Metadata = {
  title: "Operations Decision Copilot | Juan Guillermo Barrios",
  description: "A fictional bilingual decision-support case study for operational ambiguity.",
};

export default function Page() {
  return <OperationsDecisionCopilot />;
}
