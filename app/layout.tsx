import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Guillermo Barrios | Operations & Data Analytics",
  description: "Electronic Engineer focused on operations analysis, data quality, and business intelligence.",
  openGraph: {
    title: "Juan Guillermo Barrios | Operations & Data Analytics",
    description: "Professional portfolio with fictional-data demonstrations.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
