import type { Metadata } from "next";
import NovaTechCase from "./project-case";
export const metadata: Metadata = {
  title: "NovaTech Invoice and Payment Review | Juan Guillermo Barrios",
  description: "Editable synthetic invoice and payment dashboard with Canada and United States views, Python validation and SQL queries.",
  alternates: { canonical: "/projects/novatech" },
  openGraph: {
    title: "NovaTech Invoice and Payment Review",
    description: "Editable synthetic CSV dashboard for invoice, payment, recovery, and outstanding-balance trends.",
    url: "https://portfolio-nu-ashy-28.vercel.app/projects/novatech",
    type: "article",
    images: [{ url: "/portfolio-og.png", width: 1200, height: 630, alt: "NovaTech performance analysis practice case" }],
  },
};
export default function Page() { return <NovaTechCase />; }
