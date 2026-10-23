import type { Metadata } from "next";
import "./globals.css";

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Juan Guillermo Barrios Villamil",
  jobTitle: "Strategic Planning & High-Risk Account Specialist",
  description: "Electronic Engineer building toward junior Data Analyst and BI Analyst roles, with experience in operational account review and public-data analysis projects.",
  email: "mailto:juguibavi27@gmail.com",
  url: "https://portfolio-nu-ashy-28.vercel.app/",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de los Andes" },
  address: { "@type": "PostalAddress", addressLocality: "Bogotá", addressCountry: "CO" },
  sameAs: ["https://www.linkedin.com/in/juan-guillermo-barrios-villamil-474733234/", "https://github.com/barriosj136-oss"],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-nu-ashy-28.vercel.app"),
  title: "Juan Guillermo Barrios | Data & Business Analysis",
  description: "Electronic Engineer with experience in operational and financial data review, record validation, and discrepancy investigation. Building toward Data Analyst and BI Analyst roles.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Juan Guillermo Barrios | Data & Business Analysis",
    description: "Electronic Engineer with experience in operational and financial data review, record validation, and discrepancy investigation.",
    type: "website",
    url: "https://portfolio-nu-ashy-28.vercel.app/",
    images: [{ url: "/portfolio-og.png", width: 1200, height: 630, alt: "Juan Guillermo Barrios · Data and Business Analysis" }],
  },
  twitter: { card: "summary_large_image", title: "Juan Guillermo Barrios | Data & Business Analysis", description: "Electronic Engineer with experience in operational and financial data review.", images: ["/portfolio-og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c") }} /></body></html>;
}
