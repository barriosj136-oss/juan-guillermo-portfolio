import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-nu-ashy-28.vercel.app"),
  title: "Juan Guillermo Barrios | Operations & Data Analytics",
  description: "Electronic Engineer focused on operations analysis, data quality, and business intelligence.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Juan Guillermo Barrios | Operations & Data Analytics",
    description: "Professional portfolio with fictional-data demonstrations.",
    type: "website",
    url: "https://portfolio-nu-ashy-28.vercel.app/",
  },
  twitter: { card: "summary", title: "Juan Guillermo Barrios | Operations & Data Analytics", description: "Professional portfolio with fictional-data demonstrations." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
