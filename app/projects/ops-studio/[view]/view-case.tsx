"use client";

import { useEffect, useState } from "react";
import { opsViews } from "../views";

const ui = {
  en: { back: "Portfolio", tag: "OPS STUDIO · SYNTHETIC DATA", problem: "Why it exists", features: "What it does", skills: "Skills shown", live: "Live demo", open: "Open full screen", note: "Fictional records in your browser only. Nothing is sent to a server, and no employer or customer data is included.", others: "Other Ops Studio views", home: "Back to portfolio" },
  es: { back: "Portafolio", tag: "OPS STUDIO · DATOS FICTICIOS", problem: "Por qué existe", features: "Qué hace", skills: "Habilidades que muestra", live: "Demo en vivo", open: "Abrir en pantalla completa", note: "Registros ficticios solo en tu navegador. No se envía nada a un servidor y no incluye datos de empleadores ni clientes.", others: "Otras vistas de Ops Studio", home: "Volver al portafolio" },
};

export default function OpsViewCase({ slug }: { slug: string }) {
  const [language, setLanguage] = useState<"en" | "es">("en");
  useEffect(() => { if (window.localStorage.getItem("portfolio-language") === "es") setLanguage("es"); }, []);
  const view = opsViews.find((item) => item.slug === slug)!;
  const t = ui[language];
  const c = view[language];
  const demo = `/ops-studio/index.html#${view.hash}`;
  const toggle = () => { const next = language === "en" ? "es" : "en"; setLanguage(next); window.localStorage.setItem("portfolio-language", next); };

  return <main className="case-page">
    <header className="case-header"><a href="/#projects">← {t.back}</a><p>{c.label}</p><button className="language-switch" type="button" onClick={toggle}>EN | ES</button></header>
    <section className="case-intro"><p className="eyebrow">{t.tag}</p><h1>{c.title}</h1><p>{c.summary}</p><div className="case-tags">{view.tags.map((tag) => <span key={tag}>{tag}</span>)}<span>HTML · CSS · JavaScript</span></div></section>
    <section className="case-details">
      <div><h2>{t.problem}</h2><p>{c.problem}</p><h2>{t.skills}</h2><p>{c.skills}</p></div>
      <div><h2>{t.features}</h2><ul className="ops-features">{c.features.map((item) => <li key={item}>{item}</li>)}</ul></div>
    </section>
    <section className="ops-demo" aria-label={t.live}>
      <div className="ops-demo-heading"><h2>{t.live}</h2><a href={demo} target="_blank" rel="noreferrer">{t.open} ↗</a></div>
      <iframe src={demo} title={`${c.title} — ${t.live}`} loading="lazy"/>
      <p>{t.note}</p>
    </section>
    <nav className="ops-other" aria-label={t.others}><h2>{t.others}</h2><div>{opsViews.filter((item) => item.slug !== slug).map((item) => <a key={item.slug} href={`/projects/ops-studio/${item.slug}`}>{item[language].title}</a>)}</div></nav>
    <footer className="case-footer"><a href="/">{t.home}</a><span>Ops Studio · {t.tag}</span></footer>
  </main>;
}
