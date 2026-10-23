"use client";
import { useState } from "react";
export default function OperationsCase() {
  const [es, setEs] = useState(false);
  const copy = es
    ? {
        back: "Portafolio", label: "CASO DE PROYECTO", demo: "DEMO", description: "Herramienta interactiva de revisión operativa con búsqueda, tableros, edición de registros, utilidades CSV y seguimiento.", tags: ["6 vistas", "32 registros", "CSV", "Almacenamiento local"],
        demonstrates: "Qué incluye", features: "Tablero y filtros, búsqueda normalizada, listados ordenables y paginados, edición de registros, importación y exportación CSV, snapshots locales, notas, sección de conocimiento y cambio de tema.", limits: "Alcance técnico", limitsText: "Importación y exportación CSV; los cambios se guardan en el almacenamiento local del navegador. No incluye importación XLSX ni persistencia en servidor.", live: "ABRIR DEMO", explore: "Explora la herramienta", open: "Abrir en otra pestaña", title: "Operations Data Review Suite", frame: "Demostración interactiva de Operations Data Review Suite", footer: "Diseñado y desarrollado por Juan Guillermo Barrios",
      }
    : {
        back: "Portfolio", label: "PROJECT CASE STUDY", demo: "DEMO", description: "Interactive operational review workspace with search, dashboards, record editing, CSV utilities, and follow-up tools.", tags: ["6 views", "32 records", "CSV", "Browser storage"],
        demonstrates: "What’s included", features: "Dashboard and filters, normalized search, sortable and paginated listings, record editing, CSV import and export, local snapshots, notes, a knowledge area, and theme controls.", limits: "Technical scope", limitsText: "CSV import and export; edits save in this browser’s local storage. XLSX import and server persistence are not included.", live: "OPEN DEMO", explore: "Explore the tool", open: "Open in a separate tab", title: "Operations Data Review Suite", frame: "Interactive Operations Data Review Suite demonstration", footer: "Designed and built by Juan Guillermo Barrios",
      };

  return <main className="case-page">
    <header className="case-header"><a href="/">← {copy.back}</a><p>{copy.label}</p><button className="language-switch" onClick={() => setEs(!es)}>{es ? "English" : "Español"}</button></header>
    <section className="case-intro"><p className="eyebrow">{copy.demo}</p><h1>{copy.title}</h1><p>{copy.description}</p><div className="case-tags">{copy.tags.map(tag => <span key={tag}>{tag}</span>)}</div></section>
    <section className="case-details"><article><h2>{copy.demonstrates}</h2><p>{copy.features}</p></article><article><h2>{copy.limits}</h2><p>{copy.limitsText}</p></article></section>
    <section className="demo-frame"><div className="demo-frame-heading"><div><p className="eyebrow">{copy.live}</p><h2>{copy.explore}</h2></div><a href="/operations-data-review-suite/index.html" target="_blank" rel="noreferrer">{copy.open} ↗</a></div><iframe title={copy.frame} src="/operations-data-review-suite/index.html" loading="lazy" /></section>
    <footer className="case-footer"><a href="/">{es ? "Volver al portafolio" : "Back to portfolio"}</a><span>{copy.footer}</span></footer>
  </main>;
}
