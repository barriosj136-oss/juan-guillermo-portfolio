"use client";

import { useEffect, useState } from "react";
import styles from "./portfolio-home.module.css";
import ValueCleaner from "./value-cleaner";

type Language = "en" | "es";
type Skill = "sql" | "python" | "excel" | "dashboards" | "script";

const EMAIL = "juguibavi27@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/juan-guillermo-barrios-villamil-474733234/";
const GITHUB = "https://github.com/barriosj136-oss";

const projects: { id: string; href: string; img?: string; skills: Skill[]; en: [string, string, string]; es: [string, string, string] }[] = [
  { id: "reserve", href: "/projects/reserve-dashboard", img: "/shots/reserve.jpg", skills: ["excel", "dashboards", "script"],
    en: ["Reserve & Rolling dashboard", "Excel logic rebuilt in Apps Script", "Fictional demo"], es: ["Dashboard de reserva y rolling", "Lógica de Excel llevada a Apps Script", "Demo ficticia"] },
  { id: "ops", href: "/projects/ops-studio", img: "/shots/ops-actionplan.jpg", skills: ["dashboards", "script", "excel"],
    en: ["Ops Studio", "Collections workspace in seven views", "Fictional demo"], es: ["Ops Studio", "Espacio de cobranza en siete vistas", "Demo ficticia"] },
  { id: "bogota", href: "/projects/bogota-budget", img: "/shots/bogota.jpg", skills: ["sql", "python"],
    en: ["Bogotá 2025 public budget", "7,681 official records in SQL and Python", "Public data"], es: ["Presupuesto público de Bogotá 2025", "7.681 registros oficiales en SQL y Python", "Datos públicos"] },
  { id: "novatech", href: "/projects/novatech", img: "/shots/novatech.jpg", skills: ["sql", "python", "excel", "dashboards"],
    en: ["NovaTech invoices and payments", "4,800 rows that must reconcile", "Synthetic data"], es: ["NovaTech: facturas y pagos", "4.800 filas que deben cuadrar", "Datos sintéticos"] },
  { id: "lukas", href: "/projects/lukas", img: "/shots/lukas-home.jpg", skills: ["script", "dashboards"],
    en: ["Lukas, a budgeting app", "Bank statements read from PDF", "Live app"], es: ["Lukas, app de presupuesto", "Extractos bancarios leídos desde PDF", "App en uso"] },
  { id: "trazo", href: "/projects/unit-economics", skills: ["excel"],
    en: ["Unit economics for a small shop", "Cost build-up and break-even model", "Case study"], es: ["Economía unitaria de un emprendimiento", "Costos, comisiones y punto de equilibrio", "Caso escrito"] },
  { id: "copilot", href: "/projects/operations-decision-copilot", skills: ["script"],
    en: ["Operations Decision Copilot", "Rules that turn a case into a review note", "Fictional demo"], es: ["Operations Decision Copilot", "Reglas que convierten un caso en nota", "Demo ficticia"] },
];

const copy = {
  en: {
    nav: ["Work", "Process", "Experience"], resume: "Résumé", cta: "See the work", lang: "Español", langLabel: "Cambiar a español",
    title: ["Data that", "adds up."],
    lead: "I’m Juan Guillermo Barrios, an electronic engineer working as a data analyst in Bogotá. I clean, reconcile and chart financial and operational data until every total matches its source.",
    pdf: "Download résumé (PDF)", pdfHref: "/cv/Juan-Guillermo-Barrios-Resume.pdf",
    aboutTitle: "Engineer first, analyst by practice",
    about: "Engineering taught me to measure before I trust a reading. My job in collections operations put that to work on invoices, payments, write-offs and reserves: when a total looks wrong, I rebuild the logic behind the spreadsheet, test it against the numbers the team already trusts, and only then turn it into a dashboard people can read in a minute.",
    facts: [["Based in", "Bogotá, Colombia"], ["Degree", "Electronic Engineering, Universidad de los Andes"], ["Languages", "Spanish, English (C1)"]],
    numbers: [["7,681", "official budget records cleaned and reconciled in SQL and Python"], ["18,000", "accounts I helped bulk-load into Oracle instead of typing them one by one"], ["0", "difference between my rebuilt reserve logic and the workbook’s control totals"], ["38 h", "of manual work saved, by its own timer, in the first four days of my operations suite"]],
    toolkit: "Toolkit", using: "Working with", learning: "Learning now",
    tools: [["SQL", "joins, CTEs, window functions"], ["Python", "cleaning and validation"], ["Excel", "pivots, lookups, reconciliation"], ["Apps Script and JavaScript", "dashboards and tools"], ["Charts", "SVG, Chart.js"], ["AI-assisted development", "Claude Code, Codex"]],
    next: [["Power BI and DAX", "in progress"], ["pandas", "in progress"], ["PostgreSQL", "next"], ["Statistics", "next"]],
    workTitle: "Selected work", filterLabel: "Filter by skill", all: "All",
    skills: { sql: "SQL", python: "Python", excel: "Excel", dashboards: "Dashboards", script: "Apps Script & JS" },
    bandCaption: "The reserve dashboard demo. Every month is checked against the workbook’s own floored totals before it is shown.",
    galleryTitle: "Built to be used",
    gallery: [["Action Plan in Ops Studio: settlements, payments and open balance per customer.", "/projects/ops-studio/action-plan"], ["Bogotá’s 2025 commitments, month by month, from the District Treasury’s open data.", "/projects/bogota-budget"], ["Lukas on a phone: what is left this month, and what each day cost.", "/projects/lukas"]],
    processTitle: "From raw file to answer",
    process: "Most of the work happens before the chart. This is the order I follow on every project on this page.",
    slip: [["Before the data", [["Write the question and who acts on it", "Brief"], ["Find the source and its owner", "Source"]]], ["In the data", [["Fix formats, keys and duplicates", "Python, SQL"], ["Rebuild the logic people already trust", "Excel to code"], ["Check every total against its control", "Gap = 0"]]], ["After", [["Chart only what answers the question", "Dashboard"], ["Write what changed and why", "Note"]]]] as [string, [string, string][]][],
    slipEnd: ["A number the team can act on", "Checked"],
    expTitle: "Experience and education",
    groups: [
      ["Experience", [
        ["Iron Mountain · Strategic Planning & High-Risk Account Specialist", "Reconcile invoices, payments and services; built a reserve dashboard and an operations suite that cut a 45-minute settlement review to about a minute.", "2026 – now"],
        ["CivilTech Ingeniería y Construcción · IT Support Assistant", "Software quality testing and electronics inventory.", "2025 – 2026"],
        ["Foundever de Colombia · Customer Service Agent", "Support in an English-language environment.", "2025"]]],
      ["Education", [["Universidad de los Andes · Electronic Engineering", "Thesis: IoT automation of an adjustable voltage source and an AD9833 signal generator.", "2025"]]],
      ["Certificates", [["Data Analytics Essentials · Cisco / MinTIC", "", "2026"], ["Introduction to Data Science · Cisco / MinTIC", "", "2026"], ["Introduction to Cybersecurity · Cisco / MinTIC", "", "2026"], ["Frontend Developer · Platzi", "", "2025"]]],
    ] as [string, [string, string, string][]][],
    fullResume: "Full résumé",
    contactLine: "Hiring a data analyst? Write to me.",
    place: "Bogotá, Colombia · Spanish and English",
    footerLinks: [["Work", [["Reserve dashboard", "/projects/reserve-dashboard"], ["Ops Studio", "/projects/ops-studio"], ["Bogotá budget", "/projects/bogota-budget"], ["Lukas", "/projects/lukas"]]], ["Résumé", [["Web résumé", "/resume"], ["PDF in English", "/cv/Juan-Guillermo-Barrios-Resume.pdf"], ["PDF en español", "/cv/Juan-Guillermo-Barrios-Hoja-de-Vida.pdf"]]]] as [string, [string, string][]][],
    legal: "© 2026 Juan Guillermo Barrios Villamil. Demos use public, synthetic or fictional data only.", top: "Back to top",
  },
  es: {
    nav: ["Proyectos", "Proceso", "Experiencia"], resume: "Hoja de vida", cta: "Ver proyectos", lang: "English", langLabel: "Switch to English",
    title: ["Datos que", "cuadran."],
    lead: "Soy Juan Guillermo Barrios, ingeniero electrónico y analista de datos en Bogotá. Limpio, concilio y grafico datos financieros y operativos hasta que cada total coincide con su fuente.",
    pdf: "Descargar hoja de vida (PDF)", pdfHref: "/cv/Juan-Guillermo-Barrios-Hoja-de-Vida.pdf",
    aboutTitle: "Ingeniero de base, analista en la práctica",
    about: "La ingeniería me enseñó a medir antes de confiar en una lectura. Mi trabajo en operaciones de cobranza lo puso a prueba con facturas, pagos, castigos y reservas: cuando un total no se ve bien, reconstruyo la lógica detrás de la hoja de cálculo, la pruebo contra los números en los que el equipo ya confía y solo entonces la convierto en un dashboard que se lee en un minuto.",
    facts: [["Ciudad", "Bogotá, Colombia"], ["Título", "Ingeniería Electrónica, Universidad de los Andes"], ["Idiomas", "Español, inglés (C1)"]],
    numbers: [["7.681", "registros oficiales de presupuesto limpiados y conciliados en SQL y Python"], ["18.000", "cuentas que ayudé a cargar a Oracle en bloque, en vez de digitarlas una por una"], ["0", "de diferencia entre mi lógica de reserva y los totales de control del libro de Excel"], ["38 h", "de trabajo manual ahorradas, según su propio cronómetro, en los primeros cuatro días de mi suite operativa"]],
    toolkit: "Herramientas", using: "Trabajo con", learning: "Aprendiendo",
    tools: [["SQL", "JOIN, CTE, funciones de ventana"], ["Python", "limpieza y validación"], ["Excel", "tablas dinámicas, búsquedas, conciliación"], ["Apps Script y JavaScript", "dashboards y herramientas"], ["Gráficos", "SVG, Chart.js"], ["Desarrollo asistido por IA", "Claude Code, Codex"]],
    next: [["Power BI y DAX", "en curso"], ["pandas", "en curso"], ["PostgreSQL", "siguiente"], ["Estadística", "siguiente"]],
    workTitle: "Proyectos", filterLabel: "Filtrar por habilidad", all: "Todos",
    skills: { sql: "SQL", python: "Python", excel: "Excel", dashboards: "Dashboards", script: "Apps Script y JS" },
    bandCaption: "La demo del dashboard de reserva. Cada mes se compara con los totales del propio libro de Excel antes de mostrarse.",
    galleryTitle: "Hechos para usarse",
    gallery: [["Action Plan en Ops Studio: acuerdos, pagos y saldo abierto por cliente.", "/projects/ops-studio/action-plan"], ["Compromisos de Bogotá 2025 mes a mes, con datos abiertos de la Secretaría de Hacienda.", "/projects/bogota-budget"], ["Lukas en el celular: cuánto queda este mes y cuánto costó cada día.", "/projects/lukas"]],
    processTitle: "Del archivo a la respuesta",
    process: "Casi todo el trabajo ocurre antes del gráfico. Este es el orden que sigo en cada proyecto de esta página.",
    slip: [["Antes de los datos", [["Escribir la pregunta y quién actúa con ella", "Brief"], ["Encontrar la fuente y su dueño", "Fuente"]]], ["En los datos", [["Arreglar formatos, llaves y duplicados", "Python, SQL"], ["Reconstruir la lógica en la que ya confían", "Excel a código"], ["Comparar cada total con su control", "Dif. = 0"]]], ["Después", [["Graficar solo lo que responde la pregunta", "Dashboard"], ["Escribir qué cambió y por qué", "Nota"]]]] as [string, [string, string][]][],
    slipEnd: ["Un número con el que el equipo puede actuar", "Verificado"],
    expTitle: "Experiencia y formación",
    groups: [
      ["Experiencia", [
        ["Iron Mountain · Strategic Planning & High-Risk Account Specialist", "Concilio facturas, pagos y servicios; construí un dashboard de reserva y una suite operativa que bajó una revisión de acuerdos de 45 minutos a cerca de uno.", "2026 – hoy"],
        ["CivilTech Ingeniería y Construcción · Auxiliar de Soporte IT", "Pruebas de calidad de software e inventario de electrónicos.", "2025 – 2026"],
        ["Foundever de Colombia · Agente de Servicio al Cliente", "Soporte en un entorno en inglés.", "2025"]]],
      ["Formación", [["Universidad de los Andes · Ingeniería Electrónica", "Tesis: automatización IoT de una fuente de voltaje ajustable y un generador de señales AD9833.", "2025"]]],
      ["Certificados", [["Data Analytics Essentials · Cisco / MinTIC", "", "2026"], ["Introduction to Data Science · Cisco / MinTIC", "", "2026"], ["Introduction to Cybersecurity · Cisco / MinTIC", "", "2026"], ["Frontend Developer · Platzi", "", "2025"]]],
    ] as [string, [string, string, string][]][],
    fullResume: "Hoja de vida completa",
    contactLine: "¿Buscas un analista de datos? Escríbeme.",
    place: "Bogotá, Colombia · Español e inglés",
    footerLinks: [["Proyectos", [["Dashboard de reserva", "/projects/reserve-dashboard"], ["Ops Studio", "/projects/ops-studio"], ["Presupuesto de Bogotá", "/projects/bogota-budget"], ["Lukas", "/projects/lukas"]]], ["Hoja de vida", [["Hoja de vida web", "/resume"], ["PDF en español", "/cv/Juan-Guillermo-Barrios-Hoja-de-Vida.pdf"], ["PDF in English", "/cv/Juan-Guillermo-Barrios-Resume.pdf"]]]] as [string, [string, string][]][],
    legal: "© 2026 Juan Guillermo Barrios Villamil. Las demos usan solo datos públicos, sintéticos o ficticios.", top: "Volver arriba",
  },
};

export default function PortfolioHome() {
  const [language, setLanguage] = useState<Language>("en");
  const [filter, setFilter] = useState<Skill | "all">("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const t = copy[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    setLanguage(saved === "en" || saved === "es" ? saved : navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const root = document.querySelector<HTMLElement>(`.${styles.page}`);
    if (!root) return;
    root.classList.add(styles.motion);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add(styles.seen);
      observer.unobserve(entry.target);
    }), { rootMargin: "0px 0px -10% 0px" });
    root.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const toggleLanguage = () => { const next = language === "en" ? "es" : "en"; setLanguage(next); window.localStorage.setItem("portfolio-language", next); };
  const shown = projects.filter((p) => filter === "all" || p.skills.includes(filter));
  const preview = projects.find((p) => p.id === hovered && p.img) || shown.find((p) => p.img);

  return <div className={styles.page}>
    <a className={styles.skip} href="#work">{language === "en" ? "Skip to the work" : "Ir a los proyectos"}</a>
    <header className={styles.top}>
      <a className={styles.wordmark} href="#top">Juan Guillermo Barrios</a>
      <nav className={styles.topLinks} aria-label={language === "en" ? "Sections" : "Secciones"}>
        {t.nav.map((label, i) => <a key={label} href={["#work", "#process", "#experience"][i]}>{label}</a>)}
        <a href="/resume">{t.resume}</a>
      </nav>
      <button type="button" className={styles.langButton} onClick={toggleLanguage} aria-label={t.langLabel}>{t.lang}</button>
    </header>

    <main id="top">
      <section className={styles.hero} aria-labelledby="hero-title">
        <p className={styles.heroLead}>{t.lead}</p>
        <h1 id="hero-title" className={styles.heroTitle}>{t.title.map((line, i) => <span key={line} className={styles.line} style={{ "--i": i } as React.CSSProperties}><span>{line}</span></span>)}</h1>
        <div className={styles.heroActions}>
          <a className={styles.button} href="#work">{t.cta}</a>
          <a className={styles.textLink} href={t.pdfHref}>{t.pdf}</a>
        </div>
      </section>

      <section className={styles.about} aria-labelledby="about-title">
        <div className={styles.aboutRow}>
          <dl className={styles.facts}>{t.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className={styles.aboutText}>
            <h2 id="about-title" className={styles.h2}>{t.aboutTitle}</h2>
            <p className={styles.statement}>{t.about}</p>
          </div>
        </div>
        <ul className={styles.numbers} data-reveal>{t.numbers.map(([n, label]) => <li key={label}><strong>{n}</strong><span>{label}</span></li>)}</ul>
        <div className={styles.toolkit} data-reveal>
          <h3 className={styles.plainWord}>{t.toolkit}</h3>
          <div className={styles.toolCols}>
            <div><p className={styles.colLabel}>{t.using}</p><ul>{t.tools.map(([a, b]) => <li key={a}><span>{a}</span><span>{b}</span></li>)}</ul></div>
            <div><p className={styles.colLabel}>{t.learning}</p><ul>{t.next.map(([a, b]) => <li key={a}><span>{a}</span><span>{b}</span></li>)}</ul></div>
          </div>
        </div>
      </section>

      <section className={styles.work} id="work" aria-labelledby="work-title">
        <div className={styles.ledger} data-reveal>
          <h2 id="work-title" className={styles.h2}>{t.workTitle}</h2>
          <div className={styles.filters} role="group" aria-label={t.filterLabel}>
            {(["all", "sql", "python", "excel", "dashboards", "script"] as const).map((key) => <button type="button" key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{key === "all" ? t.all : t.skills[key]}</button>)}
          </div>
          <ul className={styles.rows} onMouseLeave={() => setHovered(null)}>
            {shown.map((p) => <li key={p.id} className={hovered && hovered !== p.id ? styles.dim : undefined}>
              {p.img && <img className={styles.rowImage} src={p.img} alt="" width={640} height={400} loading="lazy"/>}
              <a href={p.href} onMouseEnter={() => setHovered(p.id)} onFocus={() => setHovered(p.id)} onBlur={() => setHovered(null)}>
                <span className={styles.rowName}>{p[language][0]}</span>
                <span className={styles.rowKind}>{p[language][1]}</span>
                <span className={styles.rowTag}>{p[language][2]}</span>
              </a>
            </li>)}
          </ul>
          <div className={styles.preview} aria-hidden="true">{preview && <img key={preview.id} src={preview.img} alt="" width={640} height={400}/>}</div>
        </div>
      </section>

      <figure className={styles.band}>
        <a href="/projects/reserve-dashboard"><img src="/shots/reserve.jpg" alt={language === "en" ? "Reserve dashboard showing the reserve by month and a table by collector" : "Dashboard de reserva con la reserva por mes y una tabla por cobrador"} width={1180} height={738} loading="lazy"/></a>
        <figcaption>{t.bandCaption}</figcaption>
      </figure>

      <ValueCleaner language={language}/>

      <section className={styles.gallery} aria-labelledby="gallery-title">
        <h2 id="gallery-title" className={styles.h2} data-reveal>{t.galleryTitle}</h2>
        <div className={styles.galleryGrid}>
          <figure className={styles.gWide} data-reveal><a href={t.gallery[0][1]}><img src="/shots/ops-actionplan.jpg" alt="" width={1260} height={680} loading="lazy"/></a><figcaption>{t.gallery[0][0]}</figcaption></figure>
          <figure className={styles.gMid} data-reveal><a href={t.gallery[1][1]}><img src="/shots/bogota.jpg" alt="" width={1100} height={688} loading="lazy"/></a><figcaption>{t.gallery[1][0]}</figcaption></figure>
          <figure className={styles.gPhones} data-reveal><a href={t.gallery[2][1]}><img src="/shots/lukas-home.jpg" alt="" width={375} height={812} loading="lazy"/><img src="/shots/lukas-calendar.jpg" alt="" width={375} height={812} loading="lazy"/></a><figcaption>{t.gallery[2][0]}</figcaption></figure>
        </div>
      </section>

      <section className={styles.process} id="process" aria-labelledby="process-title">
        <div className={styles.processText} data-reveal>
          <h2 id="process-title" className={styles.h2Large}>{t.processTitle}</h2>
          <p>{t.process}</p>
        </div>
        <div className={styles.slip} data-reveal>
          {t.slip.map(([group, rows]) => <div key={group} className={styles.slipGroup}>
            <h3>{group}</h3>
            <ul>{rows.map(([what, tool]) => <li key={what}><span>{what}</span><i aria-hidden="true"/><span>{tool}</span></li>)}</ul>
          </div>)}
          <p className={styles.slipEnd}><span>{t.slipEnd[0]}</span><span>{t.slipEnd[1]}</span></p>
        </div>
      </section>

      <section className={styles.experience} id="experience" aria-labelledby="exp-title">
        <div className={styles.expColumn} data-reveal>
          <h2 id="exp-title" className={styles.h2}>{t.expTitle}</h2>
          {t.groups.map(([group, rows]) => <div key={group} className={styles.expGroup}>
            <h3 className={styles.plainWord}>{group}</h3>
            <ul>{rows.map(([name, line, when]) => <li key={name}><i aria-hidden="true"/><div><span className={styles.expName}>{name}</span>{line && <span className={styles.expLine}>{line}</span>}</div><span className={styles.expWhen}>{when}</span></li>)}</ul>
          </div>)}
          <a className={styles.textLink} href="/resume">{t.fullResume}</a>
        </div>
      </section>

      <section className={styles.contact} id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title" className={styles.contactLine}>{t.contactLine}</h2>
        <a className={styles.email} href={`mailto:${EMAIL}`}>{EMAIL.split("@")[0]}<wbr/>@{EMAIL.split("@")[1]}</a>
        <div className={styles.contactFoot}>
          <span>{t.place}</span>
          <span><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a><a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a><a href={t.pdfHref}>{t.resume} PDF</a></span>
        </div>
      </section>
    </main>

    <footer className={styles.footer}>
      <p className={styles.footerName}>Juan Guillermo Barrios</p>
      <div className={styles.footerRow}>
        <ul className={styles.places}><li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li><li><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a></li><li><a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a></li></ul>
        <div className={styles.footerCols}>{t.footerLinks.map(([head, links]) => <div key={head}><p>{head}</p><ul>{links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul></div>)}
          <div><p>{language === "en" ? "Language" : "Idioma"}</p><ul><li><button type="button" onClick={toggleLanguage}>{t.lang}</button></li></ul></div>
        </div>
      </div>
      <div className={styles.legal}><span>{t.legal}</span><a href="#top">{t.top}</a></div>
    </footer>
  </div>;
}
