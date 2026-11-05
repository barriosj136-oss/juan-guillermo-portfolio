"use client";

import { useEffect, useState } from "react";

type Language = "en" | "es";
type Block = { heading: string; text?: string; list?: string[] };
export type CaseCopy = {
  label: string; title: string; summary: string; tags: string[]; blocks: Block[];
  demoTitle?: string; demoNote?: string; links?: [string, string][]; images?: { src: string; alt: string; width: number; height: number; phone?: boolean }[];
};

const ui = {
  en: { back: "Portfolio", live: "Live demo", open: "Open full screen", more: "Links", home: "Back to portfolio" },
  es: { back: "Portafolio", live: "Demo en vivo", open: "Abrir en pantalla completa", more: "Enlaces", home: "Volver al portafolio" },
};

/** Shared layout for case pages: problem, data, method, validation, result, tools, then the demo or screenshots. */
export default function CaseStudy({ content, demo }: { content: Record<Language, CaseCopy>; demo?: string }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => { if (window.localStorage.getItem("portfolio-language") === "es") setLanguage("es"); }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const c = content[language];
  const t = ui[language];
  const toggle = () => { const next = language === "en" ? "es" : "en"; setLanguage(next); window.localStorage.setItem("portfolio-language", next); };

  return <main className="case-page case-study">
    <header className="case-header"><a href="/#work">← {t.back}</a><p>{c.label}</p><button className="language-switch" type="button" onClick={toggle}>{language === "en" ? "Español" : "English"}</button></header>
    <section className="case-intro"><h1>{c.title}</h1><p>{c.summary}</p><div className="case-tags">{c.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section>
    <section className="case-blocks">{c.blocks.map((b) => <div key={b.heading}><h2>{b.heading}</h2>{b.text && <p>{b.text}</p>}{b.list && <ul>{b.list.map((item) => <li key={item}>{item}</li>)}</ul>}</div>)}</section>
    {demo && <section className="ops-demo" aria-label={t.live}>
      <div className="ops-demo-heading"><h2>{c.demoTitle || t.live}</h2><a href={demo} target="_blank" rel="noreferrer">{t.open} ↗</a></div>
      <iframe src={demo} title={`${c.title}: ${t.live}`} loading="lazy"/>
      {c.demoNote && <p>{c.demoNote}</p>}
    </section>}
    {c.images && <section className="case-shots" aria-label={c.demoTitle}>{c.images.map((img) => <img key={img.src} className={img.phone ? "is-phone" : undefined} src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy"/>)}{c.demoNote && <p>{c.demoNote}</p>}</section>}
    {c.links && <nav className="ops-other" aria-label={t.more}><h2>{t.more}</h2><div>{c.links.map(([label, href]) => <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{label}</a>)}</div></nav>}
    <footer className="case-footer"><a href="/">{t.home}</a><span>Juan Guillermo Barrios · Data Analyst</span></footer>
  </main>;
}
