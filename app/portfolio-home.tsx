"use client";

import { useEffect, useState } from "react";
import ContactForm from "./contact-form";
import styles from "./portfolio-home.module.css";

type Language = "en" | "es";

const copy = {
  en: {
    nav: ["Profile", "Projects", "Experience", "Education"],
    role: "Electronic Engineer · Business Intelligence & Financial Operations",
    headline: ["I analyze account and", "billing data to support", "financial decisions."],
    intro: "At Iron Mountain, I review high-risk accounts, validate invoice and payment records, investigate billing discrepancies, and coordinate follow-up. I’m applying that experience to Data Analyst and Business Intelligence Analyst roles.",
    primary: "Explore my work", secondary: "Let’s connect", availability: "Open to junior analyst opportunities",
    visualLabel: "Business intelligence & financial operations", visualCaption: "Account · invoice · payment analysis",
    strip: ["High-risk account review", "Invoice validation", "Payment status", "Billing discrepancies"],
    aboutEyebrow: "Profile", aboutTitle: "Account, billing, and payment analysis.",
    about: "I’m Juan Guillermo Barrios Villamil, an Electronic Engineer from Universidad de los Andes and a Strategic Planning & High-Risk Account Specialist at Iron Mountain. I review account, invoice, and payment records; investigate discrepancies; and coordinate follow-up. My independent projects show how I approach business analysis questions with structured data and documented methods.",
    focusLabel: "Relevant experience", focus: ["High-risk account and billing review", "Invoice, payment, and record validation", "Discrepancy investigation and team follow-up"],
    workEyebrow: "Selected work", workTitle: "Data analysis projects.", workIntro: "Each project explains the business question, analysis, and tools used.",
    demo: "Open demonstration", case: "Read the case study", fictional: "INDEPENDENT DEMO",
    opsTitle: "Operations Data Review Suite", opsText: "An interactive operations review workspace with search, account views, dashboards, CSV utilities, notes, and sample records.",
    novaTitle: "NovaTech monthly performance", novaText: "A 12-month business analysis exploring target attainment, budget variance, and monthly movement, with Python and SQL validation materials.",
    copilotTitle: "Operations Decision Copilot", copilotText: "A decision-support exercise that separates confirmed facts from open questions and organizes next steps.",
    experienceEyebrow: "Experience", experienceTitle: "Roles and responsibilities.",
    current: "Strategic Planning & High-Risk Account Specialist", currentDate: "May 4, 2026 – Present · Hybrid",
    currentPoints: ["Review high-risk accounts across Abandoned Records, Bankruptcy, and Third-Party Collections workflows.", "Compare account, invoice, payment, inventory, and service records to investigate billing discrepancies and validate account status.", "Track billed, paid, outstanding, recovered, and unrecovered amounts to support account follow-up and financial review; escalate write-off decisions to authorized stakeholders."],
    civil: "IT Support Assistant", civilDate: "Dec 2025 – Jan 2026", civilDetail: "Supported software quality testing and electronics inventory management at CivilTech Ingeniería y Construcción S.A.S.",
    found: "Customer Service Agent", foundDate: "Feb 2025 – Jul 2025", foundDetail: "Responded to customer service requests in an English-language support environment at Foundever de Colombia.",
    educationEyebrow: "Education & learning", educationTitle: "An engineering foundation.", degree: "Electronic Engineering", university: "Universidad de los Andes · degree awarded October 20, 2025", thesisLabel: "Thesis", thesis: "IoT automation of electronic systems integrating an adjustable voltage source and an AD9833 signal generator.", learningLabel: "Courses & certifications", certificates: ["Data Analytics Essentials · Cisco Networking Academy / MinTIC · May 23, 2026", "Introduction to Data Science · Cisco Networking Academy / MinTIC · May 5, 2026", "Introduction to Cybersecurity · Cisco Networking Academy / MinTIC · May 23, 2026"], coursesLabel: "Platzi courses", courses: ["Frontend Developer · 2025", "Practical Frontend Developer · 2025", "Emotional Intelligence · 2023", "Effective Communication · 2023"],
    contactEyebrow: "Contact", contactTitle: "Discuss a data or BI analyst role.", contactText: "I’m seeking junior opportunities in data analysis, Business Intelligence, and financial operations.", linkedin: "Connect on LinkedIn", footer: "Independent portfolio · selected projects and case studies.", language: "Español",
  },
  es: {
    nav: ["Perfil", "Proyectos", "Experiencia", "Formación"],
    role: "Ingeniero electrónico · Inteligencia de Negocios y Operaciones Financieras",
    headline: ["Analizo datos de cuentas", "y facturación para apoyar", "decisiones financieras."],
    intro: "En Iron Mountain reviso cuentas de alto riesgo, valido registros de facturas y pagos, investigo diferencias de facturación y coordino seguimientos. Estoy orientando esa experiencia a cargos de Analista de Datos y Analista de Inteligencia de Negocios.",
    primary: "Ver mis proyectos", secondary: "Conversemos", availability: "Abierto a oportunidades junior de análisis",
    visualLabel: "Inteligencia de negocios y operaciones financieras", visualCaption: "Análisis de cuentas · facturas · pagos",
    strip: ["Revisión de cuentas de alto riesgo", "Validación de facturas", "Estado de pagos", "Diferencias de facturación"],
    aboutEyebrow: "Perfil", aboutTitle: "Análisis de cuentas, facturación y pagos.",
    about: "Soy Juan Guillermo Barrios Villamil, ingeniero electrónico de la Universidad de los Andes y Strategic Planning & High-Risk Account Specialist en Iron Mountain. Reviso registros de cuentas, facturas y pagos; investigo discrepancias y coordino seguimientos. Mis proyectos independientes muestran cómo abordo preguntas de negocio con datos estructurados y métodos documentados.",
    focusLabel: "Experiencia relevante", focus: ["Revisión de cuentas de alto riesgo y facturación", "Validación de facturas, pagos y registros", "Investigación de discrepancias y coordinación de seguimientos"],
    workEyebrow: "Proyectos seleccionados", workTitle: "Proyectos de análisis de datos.", workIntro: "Cada proyecto explica la pregunta de negocio, el análisis y las herramientas utilizadas.",
    demo: "Abrir demostración", case: "Leer el caso", fictional: "PROYECTO DEMO",
    opsTitle: "Operations Data Review Suite", opsText: "Espacio interactivo para revisar operaciones, con búsqueda, vistas de cuentas, tableros, utilidades CSV, notas y registros de muestra.",
    novaTitle: "Desempeño mensual de NovaTech", novaText: "Análisis empresarial de 12 meses sobre cumplimiento de objetivos, desviaciones presupuestarias y evolución mensual, con materiales de validación en Python y SQL.",
    copilotTitle: "Operations Decision Copilot", copilotText: "Ejercicio de apoyo a decisiones que separa hechos confirmados de preguntas abiertas y organiza próximos pasos.",
    experienceEyebrow: "Experiencia", experienceTitle: "Cargos y responsabilidades.",
    current: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo", currentDate: "4 de mayo de 2026 – Actualidad · Híbrido",
    currentPoints: ["Reviso cuentas de alto riesgo de los flujos de Abandoned Records, Bankruptcy y Third-Party Collections.", "Comparo registros de cuentas, facturas, pagos, inventario y servicio para investigar diferencias de facturación y validar el estado de las cuentas.", "Analizo montos facturados, pagados, pendientes, recuperados y no recuperados para apoyar seguimientos y revisiones financieras; las decisiones de write-off corresponden a responsables autorizados."],
    civil: "Auxiliar de Soporte IT", civilDate: "Dic 2025 – Ene 2026", civilDetail: "Apoyé pruebas de calidad de software y gestión de inventario electrónico en CivilTech Ingeniería y Construcción S.A.S.",
    found: "Agente de Servicio al Cliente", foundDate: "Feb 2025 – Jul 2025", foundDetail: "Atendí solicitudes de servicio al cliente en un entorno de soporte en inglés en Foundever de Colombia.",
    educationEyebrow: "Formación y aprendizaje", educationTitle: "Una base en ingeniería.", degree: "Ingeniería Electrónica", university: "Universidad de los Andes · título otorgado el 20 de octubre de 2025", thesisLabel: "Tesis", thesis: "Automatización IoT de sistemas electrónicos con integración de una fuente de voltaje variable y un generador de señales AD9833.", learningLabel: "Cursos y certificaciones", certificates: ["Fundamentos de Análisis de Datos · Cisco Networking Academy / MinTIC · 23 de mayo de 2026", "Introducción a la Ciencia de Datos · Cisco Networking Academy / MinTIC · 5 de mayo de 2026", "Introducción a la Ciberseguridad · Cisco Networking Academy / MinTIC · 23 de mayo de 2026"], coursesLabel: "Cursos de Platzi", courses: ["Frontend Developer · 2025", "Practical Frontend Developer · 2025", "Inteligencia Emocional · 2023", "Comunicación Efectiva · 2023"],
    contactEyebrow: "Contacto", contactTitle: "Conversemos sobre roles de análisis de datos o BI.", contactText: "Busco oportunidades junior en análisis de datos, Inteligencia de Negocios y operaciones financieras.", linkedin: "Conectar en LinkedIn", footer: "Portafolio independiente · proyectos y casos seleccionados.", language: "English",
  },
} as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.arrow}><path d={diagonal ? "M7 17 17 7M8 7h9v9" : "M5 12h14m-6-6 6 6-6 6"} /></svg>;
}

export default function PortfolioHome() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];

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
      <button className={styles.languageButton} type="button" onClick={() => setLanguage(language === "en" ? "es" : "en")} aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}><span className={styles.globe} aria-hidden="true">◎</span>{t.language}</button>
    </header>

    <div id="main-content">
      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.eyebrowLine}/>{t.role}</p>
          <h1 id="hero-title">{t.headline.map((line, index) => <span className={styles.heroLine} key={line} style={{ "--line-index": index } as React.CSSProperties}><span>{line}</span></span>)}</h1>
          <p className={styles.heroIntro}>{t.intro}</p>
          <div className={styles.heroActions}><a className={styles.primaryButton} href="#projects">{t.primary}<Arrow/></a><a className={styles.secondaryLink} href="#contact">{t.secondary}<Arrow diagonal/></a></div>
          <p className={styles.availability}><span/> {t.availability}</p>
        </div>
        <div className={styles.heroVisual} role="img" aria-label={t.visualLabel}>
          <div className={styles.visualHeader}><span>JGB — ANALYSIS NOTES</span><span>01 / 03</span></div>
          <p className={styles.visualTitle}>{t.visualLabel}</p>
          <div className={styles.visualCanvas} aria-hidden="true">
            <div className={styles.chartAxis}><span>Question</span><span>Evidence</span><span>Insight</span></div>
            <svg viewBox="0 0 520 220" role="presentation" className={styles.chartSvg} preserveAspectRatio="none"><defs><linearGradient id="areaFade" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#b15f2c" stopOpacity=".26"/><stop offset="1" stopColor="#b15f2c" stopOpacity="0"/></linearGradient></defs><path d="M0 168 C48 160 56 106 108 126 S176 174 220 125 S292 92 326 119 S390 153 426 74 S480 84 520 35 L520 220 L0 220Z" fill="url(#areaFade)"/><path d="M0 168 C48 160 56 106 108 126 S176 174 220 125 S292 92 326 119 S390 153 426 74 S480 84 520 35" fill="none" stroke="#b15f2c" strokeWidth="3" vectorEffect="non-scaling-stroke"/><path d="M0 194 C52 192 80 178 128 182 S208 156 260 164 S348 143 386 150 S462 117 520 126" fill="none" stroke="#38465a" strokeWidth="2" strokeDasharray="5 7" vectorEffect="non-scaling-stroke"/></svg>
            <div className={styles.chartLegend}><span><i/>Observed pattern</span><span><i/>Comparison</span></div>
          </div>
          <div className={styles.visualSteps}>{t.strip.slice(0, 3).map((label, index) => <div key={label}><span>0{index + 1}</span><b>{label}</b></div>)}</div>
          <p className={styles.visualCaption}>{t.visualCaption}</p>
          <span className={styles.visualIndex} aria-hidden="true">ANALYTICS<br/>WITH CONTEXT</span>
        </div>
        <a href="#profile" className={styles.scrollCue}><span/>Scroll to explore</a>
      </section>

      <div className={styles.marquee} aria-label={t.strip.join(", ")}><div className={styles.marqueeTrack} aria-hidden="true">{[...t.strip, ...t.strip].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✳</i></span>)}</div></div>

      <section className={`${styles.section} ${styles.profile}`} id="profile">
        <div className={styles.sectionMeta} data-reveal><span>01 / {t.aboutEyebrow}</span><span className={styles.metaRule}/><span>BOGOTÁ, COLOMBIA</span></div>
        <div className={styles.profileContent} data-reveal><p className={styles.eyebrow}>{t.aboutEyebrow}</p><h2>{t.aboutTitle}</h2><p className={styles.profileText}>{t.about}</p><div className={styles.focusBlock}><p>{t.focusLabel}</p><ul>{t.focus.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul></div></div>
      </section>

      <section className={styles.projects} id="projects">
        <div className={styles.projectsHeading} data-reveal><div><p className={styles.eyebrow}>{t.workEyebrow}</p><h2>{t.workTitle}</h2></div><p>{t.workIntro}</p></div>
        <div className={styles.projectGrid}>
          <article className={`${styles.projectCard} ${styles.projectLarge}`} data-reveal>
            <a className={`${styles.projectArtwork} ${styles.opsArtwork}`} href="/projects/operations-data-review-suite" aria-label={`${t.demo}: ${t.opsTitle}`}><span className={styles.artLabel}>OPERATIONS / REVIEW</span><div className={styles.fakeDashboard}><div className={styles.fakeDashTop}><i/><i/><i/><span>DEMO WORKSPACE</span></div><div className={styles.fakeDashBody}><div className={styles.fakeSide}><b/><b/><b/><b/></div><div className={styles.fakeContent}><div className={styles.fakeKpis}><i/><i/><i/></div><div className={styles.fakeGraph}><b/><b/><b/><b/><b/><b/><b/><b/><b/><b/></div><div className={styles.fakeRows}><i/><i/><i/></div></div></div></div><span className={styles.artArrow}><Arrow diagonal/></span></a>
            <div className={styles.projectDetails}><div><p className={styles.projectType}>{t.fictional}</p><h3>{t.opsTitle}</h3><p>{t.opsText}</p><div className={styles.tags}><span>HTML</span><span>CSS</span><span>JavaScript</span><span>CSV</span></div></div><a className={styles.roundArrow} href="/projects/operations-data-review-suite" aria-label={`${t.demo}: ${t.opsTitle}`}><Arrow diagonal/></a></div>
          </article>
          <article className={`${styles.projectCard} ${styles.projectOffset}`} data-reveal>
            <a className={`${styles.projectArtwork} ${styles.novaArtwork}`} href="/projects/novatech" aria-label={`${t.case}: ${t.novaTitle}`}><span className={styles.artLabel}>NOVATECH / MONTHLY REVIEW</span><div className={styles.novaComposition}><div className={styles.novaLabel}>TARGET<br/>vs.<br/>ACTUAL</div><div className={styles.novaChart}><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className={styles.novaAxis}><span>JAN</span><span>JUN</span><span>DEC</span></div><div className={styles.demoStamp}>SYNTHETIC<br/>DATA</div></div><span className={styles.artArrow}><Arrow diagonal/></span></a>
            <div className={styles.projectDetails}><div><p className={styles.projectType}>{t.fictional}</p><h3>{t.novaTitle}</h3><p>{t.novaText}</p><div className={styles.tags}><span>Python</span><span>SQL</span><span>CSV</span></div></div><a className={styles.roundArrow} href="/projects/novatech" aria-label={`${t.case}: ${t.novaTitle}`}><Arrow diagonal/></a></div>
          </article>
          <article className={`${styles.projectCard} ${styles.projectWide}`} data-reveal>
            <a className={`${styles.projectArtwork} ${styles.copilotArtwork}`} href="/projects/operations-decision-copilot" aria-label={`${t.case}: ${t.copilotTitle}`}><span className={styles.artLabel}>DECISION SUPPORT / FICTIONAL CASE</span><div className={styles.decisionVisual}><div className={styles.decisionNode}>Question</div><span>→</span><div className={styles.decisionNode}>Evidence</div><span>→</span><div className={styles.decisionNode}>Next step</div></div><span className={styles.artArrow}><Arrow diagonal/></span></a>
            <div className={styles.projectDetails}><div><p className={styles.projectType}>{t.fictional}</p><h3>{t.copilotTitle}</h3><p>{t.copilotText}</p><div className={styles.tags}><span>Decision support</span><span>Process analysis</span></div></div><a className={styles.roundArrow} href="/projects/operations-decision-copilot" aria-label={`${t.case}: ${t.copilotTitle}`}><Arrow diagonal/></a></div>
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
          <div className={styles.certificates} data-reveal><p className={styles.projectType}>{t.learningLabel}</p>{t.certificates.map((certificate, index) => <div className={styles.certificate} key={certificate}><span>0{index + 1}</span><p>{certificate}</p><span aria-hidden="true">↗</span></div>)}<p className={styles.projectType}>{t.coursesLabel}</p>{t.courses.map((course, index) => <div className={styles.certificate} key={course}><span>0{index + 1}</span><p>{course}</p><span aria-hidden="true">↗</span></div>)}</div>
        </div>
      </section>
    </div>

    <footer className={styles.footer} id="contact">
      <div className={styles.footerTop}><div className={styles.footerCopy} data-reveal><p className={styles.eyebrow}>{t.contactEyebrow}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><a className={styles.footerLinkedin} href="https://www.linkedin.com/in/juan-guillermo-barrios-villamil-474733234/" target="_blank" rel="noreferrer">{t.linkedin}<Arrow diagonal/></a></div><div className={styles.contactForm} data-reveal><ContactForm language={language}/></div></div>
      <div className={styles.footerBottom}><a className={styles.footerBrand} href="#top">JGB<span>.</span></a><p>{t.footer}</p><span>© 2026 JUAN GUILLERMO BARRIOS VILLAMIL</span></div>
    </footer>
  </main>;
}
