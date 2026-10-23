"use client";

import { useEffect, useState } from "react";
import styles from "./portfolio-home.module.css";
import publicReport from "../projects/bogota-budget/data/summary.json";

type Language = "en" | "es";

const copy = {
  en: {
    nav: ["Profile", "Projects", "Experience", "Education"],
    role: "Electronic Engineer · Data & Business Analysis",
    headline: ["I analyzed 7,681 Bogotá", "budget records to track", "public commitments in", "2025."],
    intro: "In Iron Mountain’s High Risk function, I review complex account cases, reconcile account, service, invoice, and payment information, and build reports and charts that help the team prioritize follow-up. In some cases, I explain outstanding balances and payment requirements when a customer asks about restoring service; I do not authorize account reactivation. I’m building toward junior Data Analyst, BI Analyst, Business Analyst, and Operations Analyst roles.",
    primary: "Explore my work", resumeCTA: "View résumé", secondary: "Let’s connect", availability: "Open to junior analyst opportunities",
    visualLabel: "Bogotá 2025 budget analysis", visualCaption: "7,681 public records · 50 entity labels · COP 36.26T cumulative commitments", chartMonths: ["JAN", "JUN", "DEC"], chartLegend: "Net monthly change · COP",
    strip: ["Operational data review", "Record validation", "Trend analysis", "Business recommendations"],
    aboutEyebrow: "Profile", aboutTitle: "I turn business questions into structured analysis.",
    about: "I’m Juan Guillermo Barrios Villamil, an Electronic Engineer from Universidad de los Andes. In High Risk at Iron Mountain, I review account status and billing information, investigate differences across operational records, coordinate next steps, and design reports, charts, and automation logic for case prioritization. Customer payment conversations can be part of a case, but the role also covers broader risk review and operational follow-up. My engineering training supports a systematic approach to measurements, troubleshooting, and evidence.",
    focusLabel: "Transferable strengths", focus: ["Data and record validation", "Operational and financial analysis", "Structured problem investigation"],
    workEyebrow: "Selected work", workTitle: "Public budget analysis and an editable operations dashboard.", workIntro: "One analysis uses an official Bogotá dataset. The second is a separate synthetic business simulation with a CSV you can edit in Excel.",
    demo: "Open dashboard", case: "Read the analysis", publicLabel: "PUBLIC DATA · BOGOTÁ 2025", publicTitle: "Budget commitments in Bogotá", publicText: "Analyzed 7,681 official detail records to trace cumulative budget commitments by month, entity, and budget item. The December total reconciles to COP 36.26 trillion.",
    fictional: "SYNTHETIC BUSINESS SIMULATION",
    novaTitle: "NovaTech invoice and payment review", novaText: "Editable 4,800-row CSV demo with monthly invoiced, paid, recovered, and outstanding amounts, split by Canada/CAD and United States/USD.",
    experienceEyebrow: "Experience", experienceTitle: "Roles and responsibilities.",
    current: "Strategic Planning & High-Risk Account Specialist", currentDate: "May 4, 2026 – Present · Hybrid",
    currentPoints: ["Review and prioritize high-risk account cases, track statuses, and coordinate the appropriate operational follow-up across a broader High Risk function.", "Compare account, invoice, payment, inventory, and service records in Excel to validate information and investigate billing discrepancies.", "Design and build reports, charts, and automation logic that help the team identify accounts for review and route follow-up consistently.", "For some inactive accounts, explain outstanding invoices and payment requirements when customers ask about restoring service; account reactivation decisions remain with authorized teams.", "Review billed, paid, and outstanding amounts, document findings, and refer accounting or account-status decisions to authorized stakeholders."],
    civil: "IT Support Assistant", civilDate: "Dec 2025 – Jan 2026", civilDetail: "Supported software quality testing and electronics inventory management at CivilTech Ingeniería y Construcción S.A.S.",
    found: "Customer Service Agent", foundDate: "Feb 2025 – Jul 2025", foundDetail: "Responded to customer service requests in an English-language support environment at Foundever de Colombia.",
    educationEyebrow: "Education & learning", educationTitle: "An engineering foundation.", degree: "Electronic Engineering", university: "Universidad de los Andes · degree awarded October 20, 2025", thesisLabel: "Thesis", thesis: "IoT automation of electronic systems integrating an adjustable voltage source and an AD9833 signal generator.", learningLabel: "Data-related certifications", certificates: ["Data Analytics Essentials · Cisco Networking Academy / MinTIC · May 23, 2026", "Introduction to Data Science · Cisco Networking Academy / MinTIC · May 5, 2026"], coursesLabel: "Additional courses", courses: ["Introduction to Cybersecurity · Cisco Networking Academy / MinTIC · May 23, 2026", "Frontend Developer · Platzi · 2025", "Practical Frontend Developer · Platzi · 2025", "Emotional Intelligence · Platzi · 2023", "Effective Communication · Platzi · 2023"],
    contactEyebrow: "Contact", contactTitle: "Discuss a junior data or BI role.", contactText: "Email me, view my résumé, or open my profiles.", linkedin: "LinkedIn", email: "Email Juan", resumeDownload: "Download résumé PDF", github: "GitHub", footer: "Portfolio analysis uses public and generated data, identified on each case.", language: "ES",
  },
  es: {
    nav: ["Perfil", "Proyectos", "Experiencia", "Formación"],
    role: "Ingeniero electrónico · Análisis de datos y negocio",
    headline: ["Analicé 7.681 registros", "presupuestarios de Bogotá", "para seguir compromisos", "públicos de 2025."],
    intro: "En el área de High Risk de Iron Mountain, reviso casos complejos, concilio información de cuentas, servicios, facturas y pagos, y elaboro reportes y gráficos que ayudan al equipo a priorizar seguimientos. En algunos casos explico al cliente los saldos pendientes y los pagos requeridos cuando consulta cómo recuperar el servicio; no autorizo la reactivación de cuentas. Me proyecto hacia cargos junior de Analista de Datos, BI, Negocio y Operaciones.",
    primary: "Ver mis proyectos", resumeCTA: "Ver hoja de vida", secondary: "Conversemos", availability: "Abierto a oportunidades junior de análisis",
    visualLabel: "Análisis presupuestario de Bogotá 2025", visualCaption: "7.681 registros públicos · 50 nombres de entidad · COP 36,26 billones en compromisos acumulados", chartMonths: ["ENE", "JUN", "DIC"], chartLegend: "Cambio neto mensual · COP",
    strip: ["Revisión de datos operativos", "Validación de registros", "Análisis de tendencias", "Recomendaciones de negocio"],
    aboutEyebrow: "Perfil", aboutTitle: "Convierto preguntas de negocio en análisis estructurado.",
    about: "Soy Juan Guillermo Barrios Villamil, ingeniero electrónico de la Universidad de los Andes. En High Risk de Iron Mountain reviso el estado de cuentas y su facturación, investigo diferencias entre registros operativos, coordino seguimientos y diseño reportes, gráficos y lógica de automatización para priorizar casos. La comunicación sobre pagos pendientes puede ser parte de algunos casos, pero el cargo también abarca revisión de riesgo y seguimiento operativo. Mi formación en ingeniería respalda un enfoque sistemático de medición, diagnóstico y evidencia.",
    focusLabel: "Fortalezas transferibles", focus: ["Validación de datos y registros", "Análisis operativo y financiero", "Investigación estructurada de problemas"],
    workEyebrow: "Proyectos seleccionados", workTitle: "Análisis presupuestario público y dashboard operativo editable.", workIntro: "Un análisis usa datos oficiales de Bogotá. El segundo es una simulación empresarial sintética independiente con un CSV editable en Excel.",
    demo: "Abrir dashboard", case: "Leer el análisis", publicLabel: "DATOS PÚBLICOS · BOGOTÁ 2025", publicTitle: "Compromisos presupuestarios de Bogotá", publicText: "Analicé 7.681 filas oficiales para seguir compromisos presupuestarios acumulados por mes, entidad y rubro. El total de diciembre concilia a COP 36,26 billones.",
    fictional: "SIMULACIÓN EMPRESARIAL SINTÉTICA",
    novaTitle: "Revisión de facturas y pagos de NovaTech", novaText: "Demo con CSV editable de 4.800 filas y valores mensuales facturados, pagados, recuperados y pendientes; separa Canadá/CAD de Estados Unidos/USD.",
    experienceEyebrow: "Experiencia", experienceTitle: "Cargos y responsabilidades.",
    current: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo", currentDate: "4 de mayo de 2026 – Actualidad · Híbrido",
    currentPoints: ["Reviso y priorizo casos de cuentas de alto riesgo, hago seguimiento a sus estados y coordino las acciones operativas correspondientes dentro de una función amplia de High Risk.", "Comparo en Excel registros de cuentas, facturas, pagos, inventario y servicio para validar información e investigar diferencias de facturación.", "Diseño y elaboro reportes, gráficos y lógica de automatización que ayudan al equipo a identificar cuentas para revisión y encaminar seguimientos de forma consistente.", "En algunos casos de cuentas inactivas, explico las facturas pendientes y los pagos requeridos cuando un cliente consulta cómo recuperar el servicio; las decisiones de reactivación corresponden a los equipos autorizados.", "Reviso montos facturados, pagados y pendientes, documento hallazgos y remito decisiones contables o de estado de cuenta a los responsables autorizados."],
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
            <div className={styles.projectDetails}><div><p className={styles.projectType}>{t.publicLabel}</p><h3>{t.publicTitle}</h3><p>{t.publicText}</p><div className={styles.tags}><span>Python</span><span>SQLite</span><span>Public CSV</span></div><div className={styles.projectLinks}><a href="/projects/bogota-budget">{t.case}<Arrow diagonal/></a><a href="https://github.com/barriosj136-oss/juan-guillermo-portfolio/tree/main/projects/bogota-budget" target="_blank" rel="noreferrer">GitHub / code<Arrow diagonal/></a></div></div><a className={styles.roundArrow} href="/projects/bogota-budget" aria-label={`${t.case}: ${t.publicTitle}`}><Arrow diagonal/></a></div>
          </article>
          <article className={`${styles.projectCard} ${styles.projectOffset}`} data-reveal>
            <a className={`${styles.projectArtwork} ${styles.novaArtwork}`} href="/projects/novatech" aria-label={`${t.demo}: ${t.novaTitle}`}><span className={styles.artLabel}>NOVATECH · CSV-POWERED DASHBOARD</span><div className={styles.novaComposition}><div className={styles.novaLabel}>INVOICED<br/>PAID<br/>OPEN</div><div className={styles.novaChart}><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className={styles.novaAxis}><span>2024</span><span>2025</span></div><div className={styles.demoStamp}>4,800<br/>ROWS</div></div><span className={styles.artArrow}><Arrow diagonal/></span></a>
            <div className={styles.projectDetails}><div><p className={styles.projectType}>{t.fictional}</p><h3>{t.novaTitle}</h3><p>{t.novaText}</p><div className={styles.tags}><span>Python</span><span>SQL</span><span>CSV</span></div><div className={styles.projectLinks}><a href="/projects/novatech">{t.demo}<Arrow diagonal/></a><a href="https://github.com/barriosj136-oss/juan-guillermo-portfolio/tree/main/projects/novatech" target="_blank" rel="noreferrer">GitHub / code<Arrow diagonal/></a></div></div><a className={styles.roundArrow} href="/projects/novatech" aria-label={`${t.demo}: ${t.novaTitle}`}><Arrow diagonal/></a></div>
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
