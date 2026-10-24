"use client";

import { useEffect, useState } from "react";
import styles from "./portfolio-home.module.css";
import publicReport from "../projects/bogota-budget/data/summary.json";

type Language = "en" | "es";

const copy = {
  en: {
    nav: ["Profile", "Projects", "Experience", "Education"],
    role: "Electronic Engineer · Junior Data Analyst",
    headline: ["Electronic Engineer", "Junior Data Analyst", "Financial & operations data"],
    intro: "I review account, invoice, payment, service, and operational records; investigate billing discrepancies; and build reports and workflow tools. My projects analyze Bogotá public-budget data and use Python and SQL to validate an editable, generated invoice dataset.",
    primary: "Explore my work", resumeCTA: "View résumé", secondary: "Let’s connect", availability: "Open to junior analyst opportunities",
    visualLabel: "Bogotá 2025 budget analysis", visualCaption: "7,681 public records · 50 entity labels · COP 36.26T cumulative commitments", chartMonths: ["JAN", "JUN", "DEC"], chartLegend: "Net monthly change · COP",
    strip: ["Operational data review", "Record validation", "Trend analysis", "Business recommendations"],
    aboutEyebrow: "Profile", aboutTitle: "I analyze public budgets, invoices, and high-risk account records.",
    about: "I’m Juan Guillermo Barrios Villamil, an Electronic Engineer from Universidad de los Andes. In Iron Mountain’s High Risk function, I review account and billing records, investigate discrepancies, coordinate case follow-up, and build reports, charts, and workflow automation. I have also contributed to loading approximately 18,000 accounts into Oracle. My portfolio demonstrates these skills with public Bogotá budget data and clearly labeled generated datasets.",
    focusLabel: "Tools & current development", focus: ["Excel for operational record review", "Python · SQL (SQLite) used in project analysis", "Currently developing: pandas · Power BI · DAX · Git · GitHub"],
    workEyebrow: "Selected projects", workTitle: "Public budget analysis, invoice reporting, and operational tools.", workIntro: "The Bogotá analysis uses official public data. NovaTech, Operations Data Review Suite, and Decision Copilot are labeled demonstrations with generated examples.",
    demo: "Open demo", case: "Read case study", code: "View code", publicLabel: "PUBLIC DATA · BOGOTÁ 2025", publicTitle: "Bogotá 2025 public-budget commitments", publicText: "Analyzed 7,681 official records with Python and SQL to compare cumulative commitments by month, entity, and budget item. The December total reconciles to COP 36.26 trillion; 752 records with decreases are retained for review.",
    fictional: "GENERATED DATA · 4,800 ROWS",
    novaTitle: "NovaTech monthly performance (12 months)", novaText: "A 2025 dashboard view of invoices, payments, recoveries, and outstanding balances from a 4,800-row generated CSV covering 2024–2025. It separates Canada/CAD from United States/USD and includes Python and SQL checks.",
    opsLabel: "SYNTHETIC CSV WORKFLOW · HTML · CSS · JAVASCRIPT", opsTitle: "Operations Data Review Suite", opsText: "A six-view browser tool for filtering operational sample records, matching references, importing and exporting CSV files, tracking follow-up, and keeping local notes. It uses fictional records and browser storage, with no employer system connected.",
    copilotLabel: "CLIENT-SIDE RULE-BASED PROTOTYPE · NEXT.JS · REACT · TYPESCRIPT", copilotTitle: "Operations Decision Copilot", copilotText: "A browser-based prototype that organizes a fictional operations case into confirmed facts, open questions, and verification steps for human review. It formats a review note; it does not use AI or make account decisions.",
    experienceEyebrow: "Experience", experienceTitle: "High-risk account operations, billing review and workflow automation.",
    current: "Strategic Planning & High-Risk Account Specialist", currentDate: "May 4, 2026 – Present · Hybrid",
    currentPoints: ["Review and prioritize high-risk account cases, track statuses, and coordinate the appropriate operational follow-up across a broader High Risk function.", "Compare account, invoice, payment, inventory, and service records in Excel to validate information and investigate billing discrepancies.", "Helped bulk-load approximately 18,000 accounts into Oracle instead of entering them one at a time.", "Built a web-tool workflow to automate abandoned-record processing and created a dashboard to track account loading and recovery.", "For some inactive accounts, explain outstanding invoices and payment requirements when customers ask about restoring service; account reactivation decisions remain with authorized teams."],
    civil: "IT Support Assistant", civilDate: "Dec 2025 – Jan 2026", civilDetail: "Supported software quality testing and electronics inventory management at CivilTech Ingeniería y Construcción S.A.S.",
    found: "Customer Service Agent", foundDate: "Feb 2025 – Jul 2025", foundDetail: "Responded to customer service requests in an English-language support environment at Foundever de Colombia.",
    educationEyebrow: "Education & learning", educationTitle: "An engineering foundation.", degree: "Electronic Engineering", university: "Universidad de los Andes · degree awarded October 20, 2025", thesisLabel: "Thesis", thesis: "IoT automation of electronic systems integrating an adjustable voltage source and an AD9833 signal generator.", learningLabel: "Data-related certifications", certificates: ["Data Analytics Essentials · Cisco Networking Academy / MinTIC · May 23, 2026", "Introduction to Data Science · Cisco Networking Academy / MinTIC · May 5, 2026"], coursesLabel: "Additional courses", courses: ["Introduction to Cybersecurity · Cisco Networking Academy / MinTIC · May 23, 2026", "Frontend Developer · Platzi · 2025", "Practical Frontend Developer · Platzi · 2025", "Emotional Intelligence · Platzi · 2023", "Effective Communication · Platzi · 2023"],
    contactEyebrow: "Contact", contactTitle: "Discuss a junior data or BI role.", contactText: "Email me, view my résumé, or open my profiles.", linkedin: "LinkedIn", email: "Email Juan", resumeDownload: "Download résumé PDF", github: "GitHub", footer: "Project cards identify official public data and generated demonstrations.", language: "ES",
  },
  es: {
    nav: ["Perfil", "Proyectos", "Experiencia", "Formación"],
    role: "Ingeniero electrónico · Analista de datos junior",
    headline: ["Ingeniero electrónico", "Analista de datos junior", "Datos financieros y operativos"],
    intro: "Reviso registros de cuentas, facturas, pagos, servicios y operaciones; investigo diferencias de facturación; y elaboro reportes y herramientas de flujo de trabajo. Mis proyectos analizan datos presupuestales públicos de Bogotá y validan con Python y SQL un dataset editable de facturas con datos generados.",
    primary: "Ver mis proyectos", resumeCTA: "Ver hoja de vida", secondary: "Conversemos", availability: "Abierto a oportunidades junior de análisis",
    visualLabel: "Análisis presupuestario de Bogotá 2025", visualCaption: "7.681 registros públicos · 50 nombres de entidad · COP 36,26 billones en compromisos acumulados", chartMonths: ["ENE", "JUN", "DIC"], chartLegend: "Cambio neto mensual · COP",
    strip: ["Revisión de datos operativos", "Validación de registros", "Análisis de tendencias", "Recomendaciones de negocio"],
    aboutEyebrow: "Perfil", aboutTitle: "Analizo presupuestos públicos, facturas y registros de cuentas de alto riesgo.",
    about: "Soy Juan Guillermo Barrios Villamil, ingeniero electrónico de la Universidad de los Andes. En la función de High Risk de Iron Mountain reviso registros de cuentas y facturación, investigo discrepancias, coordino seguimientos y elaboro reportes, gráficos y automatizaciones de flujo de trabajo. También participé en la carga de aproximadamente 18.000 cuentas a Oracle. Mi portafolio demuestra estas habilidades con datos públicos de Bogotá y datasets generados claramente identificados.",
    focusLabel: "Herramientas y aprendizaje actual", focus: ["Excel para revisión de registros operativos", "Python · SQL (SQLite) aplicados en proyectos", "En desarrollo: pandas · Power BI · DAX · Git · GitHub"],
    workEyebrow: "Proyectos seleccionados", workTitle: "Análisis presupuestal, facturación y herramientas operativas.", workIntro: "El análisis de Bogotá usa datos públicos oficiales. NovaTech, Operations Data Review Suite y Decision Copilot son demostraciones identificadas con datos generados.",
    demo: "Abrir demo", case: "Ver caso de estudio", code: "Ver código", publicLabel: "DATOS PÚBLICOS · BOGOTÁ 2025", publicTitle: "Compromisos presupuestales públicos de Bogotá 2025", publicText: "Analicé 7.681 registros oficiales con Python y SQL para comparar compromisos acumulados por mes, entidad y rubro. El total de diciembre concilia con COP 36,26 billones; conservé para revisión 752 registros con disminuciones.",
    fictional: "DATOS GENERADOS · 4.800 FILAS",
    novaTitle: "NovaTech monthly performance (12 months)", novaText: "Vista de 2025 con facturas, pagos, recuperaciones y saldos pendientes a partir de un CSV generado de 4.800 filas que cubre 2024–2025. Separa Canadá/CAD de Estados Unidos/USD e incluye validaciones en Python y SQL.",
    opsLabel: "FLUJO CSV SINTÉTICO · HTML · CSS · JAVASCRIPT", opsTitle: "Operations Data Review Suite", opsText: "Herramienta web de seis vistas para filtrar registros operativos de muestra, buscar referencias, importar y exportar CSV, hacer seguimiento y guardar notas locales. Usa registros ficticios y almacenamiento del navegador; no se conecta a sistemas de empleadores.",
    copilotLabel: "PROTOTIPO EN EL NAVEGADOR BASADO EN REGLAS · NEXT.JS · REACT · TYPESCRIPT", copilotTitle: "Operations Decision Copilot", copilotText: "Prototipo en el navegador que organiza un caso operativo ficticio en hechos confirmados, preguntas abiertas y pasos de verificación para revisión humana. Prepara una nota; no usa IA ni toma decisiones sobre cuentas.",
    experienceEyebrow: "Experiencia", experienceTitle: "Operaciones de alto riesgo, revisión de facturación y automatización.",
    current: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo", currentDate: "4 de mayo de 2026 – Actualidad · Híbrido",
    currentPoints: ["Reviso y priorizo casos de cuentas de alto riesgo, hago seguimiento a sus estados y coordino las acciones operativas correspondientes dentro de una función amplia de High Risk.", "Comparo en Excel registros de cuentas, facturas, pagos, inventario y servicio para validar información e investigar diferencias de facturación.", "Participé en la carga masiva de aproximadamente 18.000 cuentas a Oracle, en vez de ingresarlas una por una.", "Automaticé el procesamiento de registros abandonados mediante una herramienta web y creé un dashboard para dar seguimiento a la carga de cuentas y su recuperación.", "En algunos casos de cuentas inactivas, explico las facturas pendientes y los pagos requeridos cuando un cliente consulta cómo recuperar el servicio; la reactivación corresponde a los equipos autorizados."],
    civil: "Auxiliar de Soporte IT", civilDate: "Dic 2025 – Ene 2026", civilDetail: "Apoyé pruebas de calidad de software y gestión de inventario electrónico en CivilTech Ingeniería y Construcción S.A.S.",
    found: "Agente de Servicio al Cliente", foundDate: "Feb 2025 – Jul 2025", foundDetail: "Atendí solicitudes de servicio al cliente en un entorno de soporte en inglés en Foundever de Colombia.",
    educationEyebrow: "Formación y aprendizaje", educationTitle: "Una base en ingeniería.", degree: "Ingeniería Electrónica", university: "Universidad de los Andes · título otorgado el 20 de octubre de 2025", thesisLabel: "Tesis", thesis: "Automatización IoT de sistemas electrónicos con integración de una fuente de voltaje variable y un generador de señales AD9833.", learningLabel: "Certificaciones relacionadas con datos", certificates: ["Fundamentos de Análisis de Datos · Cisco Networking Academy / MinTIC · 23 de mayo de 2026", "Introducción a la Ciencia de Datos · Cisco Networking Academy / MinTIC · 5 de mayo de 2026"], coursesLabel: "Cursos adicionales", courses: ["Introducción a la Ciberseguridad · Cisco Networking Academy / MinTIC · 23 de mayo de 2026", "Frontend Developer · Platzi · 2025", "Practical Frontend Developer · Platzi · 2025", "Inteligencia Emocional · Platzi · 2023", "Comunicación Efectiva · Platzi · 2023"],
    contactEyebrow: "Contacto", contactTitle: "Hablemos de un rol junior de datos o BI.", contactText: "Puedes escribirme, consultar mi hoja de vida o abrir mis perfiles.", linkedin: "LinkedIn", email: "Escribir a Juan", resumeDownload: "Descargar hoja de vida PDF", github: "GitHub", footer: "Los proyectos usan datos públicos y generados, identificados en cada caso.", language: "EN",
  },
} as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.arrow}><path d={diagonal ? "M7 17 17 7M8 7h9v9" : "M5 12h14m-6-6 6 6-6 6"} /></svg>;
}

export default function PortfolioHome() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    const initial = saved === "en" || saved === "es" ? saved : navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
    setLanguage(initial);
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;
    const root = document.querySelector<HTMLElement>(`.${styles.page}`);
    if (!root) return;
    root.classList.add(styles.motionReady);
    const nodes = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add(styles.visible); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => { observer.disconnect(); root.classList.remove(styles.motionReady); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return <main className={styles.page}>
    <a className={styles.skipLink} href="#main-content">Skip to content</a>
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label="Juan Guillermo Barrios Villamil, home" onClick={closeMenu}><span className={styles.brandMark}>J<span>.</span></span><span className={styles.brandName}>Juan Guillermo<br/>Barrios Villamil</span></a>
      <button className={styles.menuToggle} type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}<span aria-hidden="true">{menuOpen ? "×" : "＋"}</span></button>
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} id="site-navigation" aria-label={language === "en" ? "Main navigation" : "Navegación principal"}>
        {t.nav.map((label, index) => <a key={label} href={["#profile", "#projects", "#experience", "#education"][index]} onClick={closeMenu}>{label}</a>)}
        <a className={styles.navContact} href="#contact" onClick={closeMenu}>{t.secondary}<Arrow diagonal/></a>
      </nav>
      <button className={styles.languageButton} type="button" onClick={() => { const next = language === "en" ? "es" : "en"; setLanguage(next); window.localStorage.setItem("portfolio-language", next); }} aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}><span aria-hidden="true">{language === "en" ? "EN | ES" : "ES | EN"}</span></button>
    </header>

    <div id="main-content">
      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.eyebrowLine}/>{t.role}</p>
          <h1 id="hero-title">{t.headline.map((line, index) => <span className={styles.heroLine} key={line} style={{ "--line-index": index } as React.CSSProperties}><span>{line}</span></span>)}</h1>
          <p className={styles.heroIntro}>{t.intro}</p>
          <div className={styles.heroActions}><a className={styles.primaryButton} href="#projects">{t.primary}<Arrow/></a><a className={styles.secondaryLink} href="/resume">{t.resumeCTA}<Arrow diagonal/></a><a className={styles.secondaryLink} href="#contact">{t.secondary}<Arrow diagonal/></a></div>
          <p className={styles.availability}><span/> {t.availability}</p>
        </div>
        <div className={styles.heroVisual} role="img" aria-label={t.visualLabel}>
          <div className={styles.visualHeader}><span>PUBLIC BUDGET DATA</span><span>BOGOTÁ · 2025</span></div>
          <p className={styles.visualTitle}>{t.visualLabel}</p>
          <div className={styles.visualCanvas} aria-hidden="true">
            <div className={styles.chartAxis}>{t.chartMonths.map((month) => <span key={month}>{month}</span>)}</div>
            <svg viewBox="0 0 520 220" role="presentation" className={styles.chartSvg} preserveAspectRatio="none"><defs><linearGradient id="areaFade" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#45658f" stopOpacity=".3"/><stop offset="1" stopColor="#45658f" stopOpacity="0"/></linearGradient></defs>{(() => { const months = (publicReport as typeof publicReport & {months: {net_monthly_change_cop:number}[]}).months; const max = Math.max(...months.map((item) => item.net_monthly_change_cop)); const pts = months.map((item, i) => `${(i / (months.length - 1)) * 520},${200 - (item.net_monthly_change_cop / max) * 165}`).join(" "); return <><polyline points={`0,220 ${pts} 520,220`} fill="url(#areaFade)"/><polyline points={pts} fill="none" stroke="#45658f" strokeWidth="3" vectorEffect="non-scaling-stroke"/></>; })()}</svg>
            <div className={styles.chartLegend}><span><i/>{t.chartLegend}</span></div>
          </div>
          <div className={styles.visualSteps}>{t.strip.slice(0, 3).map((label, index) => <div key={label}><span>0{index + 1}</span><b>{label}</b></div>)}</div>
          <p className={styles.visualCaption}>{t.visualCaption}</p>
          <span className={styles.visualIndex} aria-hidden="true">SOURCE<br/>2025-12</span>
        </div>
        <a href="#profile" className={styles.scrollCue}><span/>Scroll to explore</a>
      </section>

      <section className={`${styles.section} ${styles.profile}`} id="profile">
        <div className={styles.sectionMeta} data-reveal><span>01 / {t.aboutEyebrow}</span><span className={styles.metaRule}/><span>BOGOTÁ, COLOMBIA</span></div>
        <div className={styles.profileContent} data-reveal><p className={styles.eyebrow}>{t.aboutEyebrow}</p><h2>{t.aboutTitle}</h2><p className={styles.profileText}>{t.about}</p><div className={styles.focusBlock}><p>{t.focusLabel}</p><ul>{t.focus.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul></div></div>
      </section>

      <section className={styles.projects} id="projects">
        <div className={styles.projectsHeading} data-reveal><div><p className={styles.eyebrow}>{t.workEyebrow}</p><h2>{t.workTitle}</h2></div><p>{t.workIntro}</p></div>
        <div className={styles.projectGrid}>
          <article className={`${styles.projectCard} ${styles.projectLarge}`} data-reveal>
            <a className={`${styles.projectArtwork} ${styles.publicArtwork}`} href="/projects/bogota-budget" aria-label={`${t.case}: ${t.publicTitle}`}><span className={styles.artLabel}>{t.publicLabel}</span><div className={styles.publicCardChart}>{(publicReport as typeof publicReport & {months: {month:string;net_monthly_change_cop:number}[]}).months.map((item) => <i key={item.month} style={{height:`${Math.max(6,item.net_monthly_change_cop/Math.max(...publicReport.months.map((row) => row.net_monthly_change_cop))*100)}%`}} />)}</div><div className={styles.publicCardFoot}><strong>COP 36.26T</strong><span>7,681 rows · 2025</span></div><span className={styles.artArrow}><Arrow diagonal/></span></a>
            <div className={styles.projectDetails}><div><p className={styles.projectType}>{t.publicLabel}</p><h3>{t.publicTitle}</h3><p>{t.publicText}</p><div className={styles.tags}><span>Python</span><span>SQL</span><span>SQLite</span><span>Public CSV</span></div><div className={styles.projectLinks}><a href="/projects/bogota-budget">{t.case}<Arrow diagonal/></a><a href="https://github.com/barriosj136-oss/juan-guillermo-portfolio/tree/main/projects/bogota-budget" target="_blank" rel="noreferrer">GitHub / code<Arrow diagonal/></a></div></div><a className={styles.roundArrow} href="/projects/bogota-budget" aria-label={`${t.case}: ${t.publicTitle}`}><Arrow diagonal/></a></div>
          </article>
          <article className={`${styles.projectCard} ${styles.projectOffset}`} data-reveal>
            <a className={`${styles.projectArtwork} ${styles.novaArtwork}`} href="/projects/novatech" aria-label={`${t.demo}: ${t.novaTitle}`}><span className={styles.artLabel}>NOVATECH · CSV-POWERED DASHBOARD</span><div className={styles.novaComposition}><div className={styles.novaLabel}>INVOICED<br/>PAID<br/>OPEN</div><div className={styles.novaChart}><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className={styles.novaAxis}><span>2024</span><span>2025</span></div><div className={styles.demoStamp}>4,800<br/>ROWS</div></div><span className={styles.artArrow}><Arrow diagonal/></span></a>
            <div className={styles.projectDetails}><div><p className={styles.projectType}>{t.fictional}</p><h3>{t.novaTitle}</h3><p>{t.novaText}</p><div className={styles.tags}><span>Python</span><span>SQL</span><span>SQLite</span><span>Excel</span><span>CSV</span></div><div className={styles.projectLinks}><a href="/projects/novatech">{t.demo}<Arrow diagonal/></a><a href="https://github.com/barriosj136-oss/juan-guillermo-portfolio/tree/main/projects/novatech" target="_blank" rel="noreferrer">GitHub / code<Arrow diagonal/></a></div></div><a className={styles.roundArrow} href="/projects/novatech" aria-label={`${t.demo}: ${t.novaTitle}`}><Arrow diagonal/></a></div>
          </article>
          <article className={styles.projectCard} data-reveal>
            <a className={`${styles.projectArtwork} ${styles.opsArtwork}`} href="/operations-data-review-suite/" aria-label={`${t.demo}: ${t.opsTitle}`}><span className={styles.artLabel}>{t.opsLabel}</span><div className={styles.fakeDashboard}><div className={styles.fakeDashTop}><i/><i/><i/><span>OPS / REVIEW</span></div><div className={styles.fakeDashBody}><div className={styles.fakeSide}><b/><b/><b/><b/><b/></div><div className={styles.fakeContent}><div className={styles.fakeKpis}><i/><i/><i/></div><div className={styles.fakeGraph}>{Array.from({length: 9}, (_, index) => <b key={index}/>)}</div><div className={styles.fakeRows}><i/><i/><i/></div></div></div></div><span className={styles.artArrow}><Arrow diagonal/></span></a>
            <div className={styles.projectDetails}><div><p className={styles.projectType}>{t.opsLabel}</p><h3>{t.opsTitle}</h3><p>{t.opsText}</p><div className={styles.tags}><span>HTML</span><span>CSS</span><span>JavaScript</span><span>CSV</span></div><div className={styles.projectLinks}><a href="/operations-data-review-suite/">{t.demo}<Arrow diagonal/></a><a href="https://github.com/barriosj136-oss/juan-guillermo-portfolio/tree/main/projects/operations-data-review-suite" target="_blank" rel="noreferrer">GitHub / code<Arrow diagonal/></a></div></div><a className={styles.roundArrow} href="/operations-data-review-suite/" aria-label={`${t.demo}: ${t.opsTitle}`}><Arrow diagonal/></a></div>
          </article>
          <article className={`${styles.projectCard} ${styles.projectOffset}`} data-reveal>
            <a className={`${styles.projectArtwork} ${styles.copilotArtwork}`} href="/projects/operations-decision-copilot" aria-label={`${t.demo}: ${t.copilotTitle}`}><span className={styles.artLabel}>{t.copilotLabel}</span><div className={styles.decisionVisual}><div className={styles.decisionNode}>Confirmed<br/>facts</div><span aria-hidden="true">→</span><div className={styles.decisionNode}>Open<br/>questions</div><span aria-hidden="true">→</span><div className={styles.decisionNode}>Next<br/>checks</div></div><span className={styles.artArrow}><Arrow diagonal/></span></a>
            <div className={styles.projectDetails}><div><p className={styles.projectType}>{t.copilotLabel}</p><h3>{t.copilotTitle}</h3><p>{t.copilotText}</p><div className={styles.tags}><span>Next.js</span><span>React</span><span>TypeScript</span></div><div className={styles.projectLinks}><a href="/projects/operations-decision-copilot">{t.demo}<Arrow diagonal/></a><a href="https://github.com/barriosj136-oss/juan-guillermo-portfolio/tree/main/app/projects/operations-decision-copilot" target="_blank" rel="noreferrer">GitHub / code<Arrow diagonal/></a></div></div><a className={styles.roundArrow} href="/projects/operations-decision-copilot" aria-label={`${t.demo}: ${t.copilotTitle}`}><Arrow diagonal/></a></div>
          </article>
        </div>
      </section>

      <section className={styles.experience} id="experience">
        <div className={styles.experienceIntro} data-reveal><p className={styles.eyebrow}>{t.experienceEyebrow}</p><h2>{t.experienceTitle}</h2><span className={styles.experienceMark}>02</span></div>
        <div className={styles.timeline}>
          <article className={styles.timelineItem} data-reveal><div className={styles.timelineDate}>{t.currentDate}<span>01 / 03</span></div><div className={styles.timelineMain}><p>IRON MOUNTAIN</p><h3>{t.current}</h3><ul>{t.currentPoints.map((point) => <li key={point}>{point}</li>)}</ul></div></article>
          <article className={styles.timelineItem} data-reveal><div className={styles.timelineDate}>{t.civilDate}<span>02 / 03</span></div><div className={styles.timelineMain}><p>CIVILTECH INGENIERÍA Y CONSTRUCCIÓN S.A.S.</p><h3>{t.civil}</h3><p className={styles.timelineDescription}>{t.civilDetail}</p></div></article>
          <article className={styles.timelineItem} data-reveal><div className={styles.timelineDate}>{t.foundDate}<span>03 / 03</span></div><div className={styles.timelineMain}><p>FOUNDEVER DE COLOMBIA</p><h3>{t.found}</h3><p className={styles.timelineDescription}>{t.foundDetail}</p></div></article>
        </div>
      </section>

      <section className={styles.education} id="education">
        <div className={styles.educationHeading} data-reveal><p className={styles.eyebrow}>{t.educationEyebrow}</p><h2>{t.educationTitle}</h2></div>
        <div className={styles.educationGrid}>
          <article className={styles.degreeCard} data-reveal><span className={styles.degreeIcon}>E</span><p className={styles.projectType}>UNIVERSIDAD DE LOS ANDES</p><h3>{t.degree}</h3><p>{t.university}</p><div className={styles.thesis}><span>{t.thesisLabel}</span><p>{t.thesis}</p></div></article>
          <div className={styles.certificates} data-reveal><p className={styles.projectType}>{t.learningLabel}</p>{t.certificates.map((certificate, index) => <div className={styles.certificate} key={certificate}><span>0{index + 1}</span><p>{certificate}</p><a href={index === 0 ? "/certificates/data-analytics-essentials.pdf" : "/certificates/introduction-to-data-science.pdf"} target="_blank" rel="noreferrer">{language === "es" ? "Ver certificado" : "View certificate"} ↗</a></div>)}<details className={styles.otherCourses}><summary>{t.coursesLabel}</summary>{t.courses.map((course, index) => <div className={styles.certificate} key={`${course}-${index}`}><span>0{index + 1}</span><p>{course}</p>{course.includes("Cybersecurity") || course.includes("Ciberseguridad") ? <a href="/certificates/introduction-to-cybersecurity.pdf" target="_blank" rel="noreferrer">{language === "es" ? "Ver certificado" : "View certificate"} ↗</a> : null}</div>)}</details></div>
        </div>
      </section>
    </div>

    <footer className={styles.footer} id="contact">
      <div className={styles.footerTop}><div className={styles.footerCopy} data-reveal><p className={styles.eyebrow}>{t.contactEyebrow}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className={styles.contactLinks}><a className={styles.footerLinkedin} href="mailto:juguibavi27@gmail.com">{t.email}<Arrow diagonal/></a><a className={styles.footerLinkedin} href={language === "en" ? "/cv/Juan-Guillermo-Barrios-Resume.pdf" : "/cv/Juan-Guillermo-Barrios-Hoja-de-Vida.pdf"} download>{t.resumeDownload}<Arrow diagonal/></a><a className={styles.footerLinkedin} href="https://www.linkedin.com/in/juan-guillermo-barrios-villamil-474733234/" target="_blank" rel="noreferrer">{t.linkedin}<Arrow diagonal/></a><a className={styles.footerLinkedin} href="https://github.com/barriosj136-oss" target="_blank" rel="noreferrer">{t.github}<Arrow diagonal/></a></div></div></div>
      <div className={styles.footerBottom}><a className={styles.footerBrand} href="#top">JGB<span>.</span></a><p>{t.footer}</p><span>© 2026 JUAN GUILLERMO BARRIOS VILLAMIL</span></div>
    </footer>
  </main>;
}
