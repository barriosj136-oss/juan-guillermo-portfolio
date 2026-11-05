import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-news", display: "swap" });

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Juan Guillermo Barrios Villamil",
  jobTitle: "Data Analyst",
  description: "Electronic engineer working as a data analyst: cleaning, reconciling and charting financial and operational data.",
  email: "mailto:juguibavi27@gmail.com",
  url: "https://portfolio-nu-ashy-28.vercel.app/",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de los Andes" },
  address: { "@type": "PostalAddress", addressLocality: "Bogotá", addressCountry: "CO" },
  sameAs: ["https://www.linkedin.com/in/juan-guillermo-barrios-villamil-474733234/", "https://github.com/barriosj136-oss"],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-nu-ashy-28.vercel.app"),
  title: "Juan Guillermo Barrios | Data Analyst",
  description: "Electronic engineer and data analyst in Bogotá. Dashboards, reconciliation and SQL/Python projects with public, synthetic and fictional data.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Juan Guillermo Barrios | Data Analyst",
    description: "Electronic engineer and data analyst in Bogotá: dashboards, reconciliation and SQL/Python projects.",
    type: "website",
    url: "https://portfolio-nu-ashy-28.vercel.app/",
    images: [{ url: "/portfolio-og.png", width: 1200, height: 630, alt: "Juan Guillermo Barrios · Data Analyst" }],
  },
  twitter: { card: "summary_large_image", title: "Juan Guillermo Barrios | Data Analyst", description: "Electronic engineer and data analyst in Bogotá.", images: ["/portfolio-og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={newsreader.variable}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c") }} /></body></html>;
}
