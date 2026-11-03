import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { opsViews } from "../views";
import OpsViewCase from "./view-case";

export const dynamicParams = false;
export function generateStaticParams() { return opsViews.map(({ slug }) => ({ view: slug })); }

export async function generateMetadata({ params }: { params: Promise<{ view: string }> }): Promise<Metadata> {
  const { view: requested } = await params;
  const view = opsViews.find(({ slug }) => slug === requested);
  if (!view) return {};
  const url = `/projects/ops-studio/${view.slug}`;
  return {
    title: `${view.en.title} · Ops Studio | Juan Guillermo Barrios`,
    description: view.en.summary,
    alternates: { canonical: url },
    openGraph: { title: `${view.en.title} · Ops Studio`, description: view.en.summary, url: `https://portfolio-nu-ashy-28.vercel.app${url}`, type: "article", images: [{ url: "/portfolio-og.png", width: 1200, height: 630, alt: view.en.title }] },
  };
}

export default async function Page({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  if (!opsViews.some(({ slug }) => slug === view)) notFound();
  return <OpsViewCase slug={view} />;
}
