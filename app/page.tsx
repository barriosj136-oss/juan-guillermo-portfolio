"use client";

import { useEffect, useState } from "react";

type Language = "en" | "es";
const content = {
  en: {
    nav: ["Profile", "Experience", "Projects", "Contact"],
    eyebrow: "ELECTRONIC ENGINEER · OPERATIONS ANALYSIS",
    hero: "I turn operational detail into clearer decisions.",
    intro: "I work across high-volume operations, case review, and record validation, while building practical skills in data analytics and business intelligence.",
    cta: "Explore selected work", contact: "Get in touch", availability: "Open to junior analyst opportunities",
    aboutTitle: "A practical path into analytics",
    about: "My background combines electronic engineering with operational case analysis, customer service, and IT support. I am developing toward Data Analyst, BI Analyst, Business Analyst, and Operations Analyst roles through focused study and clearly labeled fictional-data projects.",
    focusTitle: "What I bring", focus: ["Operational case review", "Record validation and discrepancy review", "Engineering problem-solving", "A careful, evidence-led learning approach"],
    projectsTitle: "Selected work", projectsIntro: "Demonstrations use fictional data and are not connected to any employer or customer system.",
    opsTitle: "Operations Data Review Suite", opsText: "A browser-based demonstration of a generic operations review workflow, with six views, synthetic records, CSV tools, local snapshots, notes, and a knowledge area.",
    novaTitle: "NovaTech monthly performance", novaText: "A fictional 12-month case with a reproducible Python summary. Synthetic data only; no real company results are claimed.",
    copilotTitle: "Operations Decision Copilot", copilotText: "A fictional decision-support case that separates confirmed facts from hypotheses and turns ambiguity into a cautious action plan.",
    demo: "Open interactive demo", case: "View first analysis", planned: "In progress · synthetic data",
    skillsTitle: "Skills and learning", capabilityLabel: "CAPABILITIES", educationLabel: "EDUCATION", projectKicker: "01 · INTERACTIVE DEMONSTRATION", fictionalLabel: "FICTIONAL DATA", supportTitle: "IT Support Assistant", skillsIntro: "I distinguish verified experience from tools I am still practicing.",
    groups: [
      ["Experience-backed", "Operations and case analysis · record validation · customer service · software quality testing · electronics inventory"],
      ["Formal background", "Electronic Engineering · IoT thesis · introductory data analytics and data science credentials"],
      ["Building next", "Excel for analysis · SQL refresh · Python fundamentals · Power BI and DAX · Git and GitHub"],
    ],
    experienceTitle: "Experience", currentDate: "May 4, 2026 – Present · Hybrid", currentBullets: ["Review complex account records and identify cases that need additional investigation or authorized review.", "Compare inventory, account information, and available service records to surface items that may need reconciliation.", "Investigate billing, invoice, and rate discrepancies, including zero-invoice situations, and seek clarification before drawing conclusions.", "Validate account data, identify inconsistencies or missing information, and determine which cases need further investigation, correction, or escalation.", "Prepare structured operational reports and tracking files to support case review and follow-up; specific reporting tools are not stated.", "Coordinate with internal teams and external partners, document case status and next steps, and refer financial decisions to authorized stakeholders."],
    civilDate: "Dec 2025 – Jan 2026", foundDate: "Feb 2025 – Jul 2025", civilBullets: ["Supported software quality testing and electronics inventory management.", "Explored sensor-related business opportunities at a preliminary level."], foundBullets: ["Responded to customer service requests in an English-language support environment."],
    educationTitle: "Education and credentials", degree: "Electronic Engineering · Universidad de los Andes · degree awarded October 20, 2025", thesis: "Thesis: IoT automation of electronic systems integrating an adjustable voltage source and AD9833 signal generator.", certificates: ["Data Analytics Essentials · Cisco Networking Academy / MinTIC · May 23, 2026", "Introduction to Data Science · Cisco Networking Academy / MinTIC · May 5, 2026", "Introduction to Cybersecurity · Cisco Networking Academy / MinTIC · May 23, 2026"],
    contactTitle: "Let’s connect", contactText: "Interested in junior opportunities across data, BI, business, and operations analysis.", contactLink: "Connect on LinkedIn", footer: "Independent portfolio · fictional-data demonstrations · no employer systems connected.", langLabel: "Español",
  },
  es: {
    nav: ["Perfil", "Experiencia", "Proyectos", "Contacto"],
    eyebrow: "INGENIERO ELECTRÓNICO · ANÁLISIS DE OPERACIONES",
    hero: "Convierto el detalle operativo en decisiones más claras.",
    intro: "Trabajo con operaciones de alto volumen, revisión de casos y validación de registros, mientras desarrollo habilidades prácticas en analítica de datos e inteligencia de negocios.",
    cta: "Ver proyectos", contact: "Contactarme", availability: "Abierto a oportunidades junior de análisis",
    aboutTitle: "Un camino práctico hacia la analítica",
    about: "Mi trayectoria combina ingeniería electrónica con análisis de casos operativos, servicio al cliente y soporte de TI. Me estoy orientando hacia roles de Data Analyst, BI Analyst, Business Analyst y Operations Analyst mediante estudio enfocado y proyectos con datos ficticios claramente identificados.",
    focusTitle: "Lo que aporto", focus: ["Revisión de casos operativos", "Validación de registros e inconsistencias", "Resolución de problemas de ingeniería", "Aprendizaje cuidadoso basado en evidencia"],
    projectsTitle: "Proyectos seleccionados", projectsIntro: "Las demostraciones usan datos ficticios y no están conectadas con sistemas de empleadores ni clientes.",
    opsTitle: "Operations Data Review Suite", opsText: "Demostración en navegador de un flujo genérico de revisión operativa, con seis vistas, registros sintéticos, herramientas CSV, snapshots locales, notas y una sección de conocimiento.",
    novaTitle: "Desempeño mensual de NovaTech", novaText: "Caso ficticio de 12 meses con resumen reproducible en Python. Solo datos sintéticos; no se afirman resultados de una empresa real.",
    copilotTitle: "Operations Decision Copilot", copilotText: "Caso ficticio de apoyo a decisiones que separa hechos confirmados de hipótesis y convierte la incertidumbre en un plan de acción prudente.",
    demo: "Abrir demo interactiva", case: "Ver primer análisis", planned: "En desarrollo · datos ficticios",
    skillsTitle: "Habilidades y aprendizaje", capabilityLabel: "HABILIDADES", educationLabel: "FORMACIÓN", projectKicker: "01 · DEMOSTRACIÓN INTERACTIVA", fictionalLabel: "DATOS FICTICIOS", supportTitle: "Auxiliar de Soporte IT", skillsIntro: "Distingo la experiencia verificada de las herramientas que todavía estoy practicando.",
    groups: [
      ["Respaldado por experiencia", "Análisis de operaciones y casos · validación de registros · servicio al cliente · pruebas de calidad de software · inventario electrónico"],
      ["Formación", "Ingeniería Electrónica · tesis IoT · certificados introductorios de analítica y ciencia de datos"],
      ["Próximos aprendizajes", "Excel para análisis · repaso de SQL · fundamentos de Python · Power BI y DAX · Git y GitHub"],
    ],
    experienceTitle: "Experiencia", currentDate: "4 de mayo de 2026 – Actualidad · Híbrido", currentBullets: ["Reviso registros de cuentas complejas e identifico casos que requieren investigación o revisión adicional por parte de responsables autorizados.", "Comparo inventarios, información de cuentas y registros de servicio disponibles para detectar datos que podrían necesitar conciliación.", "Investigo discrepancias de facturación, facturas y tarifas, incluidos casos con facturación en cero, y solicito aclaraciones antes de concluir.", "Valido datos de cuentas, identifico inconsistencias o información faltante y determino qué casos requieren más investigación, corrección o escalamiento.", "Preparo reportes operativos estructurados y archivos de seguimiento para apoyar la revisión y continuidad de los casos; no se especifican herramientas de reporte.", "Coordino con equipos internos y aliados externos, documento el estado y los pasos siguientes, y remito las decisiones financieras a responsables autorizados."],
    civilDate: "Dic 2025 – Ene 2026", foundDate: "Feb 2025 – Jul 2025", civilBullets: ["Apoyé pruebas de calidad de software y gestión de inventario electrónico.", "Exploré oportunidades de negocio relacionadas con sensores a nivel preliminar."], foundBullets: ["Atendí solicitudes de servicio al cliente en un entorno de soporte en inglés."],
    educationTitle: "Formación y certificados", degree: "Ingeniería Electrónica · Universidad de los Andes · título otorgado el 20 de octubre de 2025", thesis: "Tesis: automatización IoT de sistemas electrónicos con integración de una fuente de voltaje variable y un generador de señales AD9833.", certificates: ["Fundamentos de Análisis de Datos · Cisco Networking Academy / MinTIC · 23 de mayo de 2026", "Introducción a la Ciencia de Datos · Cisco Networking Academy / MinTIC · 5 de mayo de 2026", "Introducción a la Ciberseguridad · Cisco Networking Academy / MinTIC · 23 de mayo de 2026"],
    contactTitle: "Conversemos", contactText: "Interesado en oportunidades junior de análisis de datos, BI, negocio y operaciones.", contactLink: "Conectemos por LinkedIn", footer: "Portafolio independiente · demostraciones con datos ficticios · sin conexión a sistemas de empleadores.", langLabel: "English",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const t = content[language];
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    document.documentElement.classList.add("motion-ready");
    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
  return <main>
    <header className="site-header"><a className="wordmark" href="#top">JGB<span>.</span></a><nav aria-label={language === "en" ? "Main navigation" : "Navegación principal"}>{t.nav.map((label, i) => <a key={label} href={["#profile", "#experience", "#projects", "#contact"][i]}>{label}</a>)}</nav><button className="language-switch" onClick={() => setLanguage(language === "en" ? "es" : "en")} aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}>{t.langLabel}</button></header>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><span />{t.eyebrow}</p><h1>{t.hero}</h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button-primary" href="#projects">{t.cta}<span aria-hidden="true">↗</span></a><a className="text-link" href="#contact">{t.contact}</a></div><p className="availability"><i />{t.availability}</p></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orb orb-main">Data<br/>in context</div><div className="orb orb-small">01</div><div className="orb orb-dot"/></div><span className="hero-index">01 / 05</span></section>
    <section className="section profile-section" id="profile"><div className="section-label"><span>01</span><span>{t.nav[0]}</span></div><div className="section-body" data-reveal><h2>{t.aboutTitle}</h2><p className="lead">{t.about}</p><div className="focus-row"><h3>{t.focusTitle}</h3><ul>{t.focus.map(x => <li key={x}>{x}</li>)}</ul></div></div></section>
    <section className="section experience-section" id="experience"><div className="section-label"><span>02</span><span>{t.experienceTitle}</span></div><div className="section-body" data-reveal><h2>{t.experienceTitle}</h2><div className="timeline"><article data-reveal><div className="timeline-date">{t.currentDate}</div><div><h3>{language === "en" ? "Strategic Planning & High-Risk Account Specialist" : "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo"} <span>· Iron Mountain</span></h3><ul>{t.currentBullets.map(x=><li key={x}>{x}</li>)}</ul></div></article><article data-reveal><div className="timeline-date">{t.civilDate}</div><div><h3>{t.supportTitle} <span>· CivilTech Ingeniería y Construcción S.A.S.</span></h3><ul>{t.civilBullets.map(x=><li key={x}>{x}</li>)}</ul></div></article><article data-reveal><div className="timeline-date">{t.foundDate}</div><div><h3>{language === "en" ? "Customer Service Agent" : "Agente de Servicio al Cliente"} <span>· Foundever de Colombia</span></h3><ul>{t.foundBullets.map(x=><li key={x}>{x}</li>)}</ul></div></article></div></div></section>
    <section className="section projects-section" id="projects"><div className="section-label"><span>03</span><span>{t.nav[2]}</span></div><div className="section-body"><div className="section-heading"><div><h2>{t.projectsTitle}</h2><p>{t.projectsIntro}</p></div></div><article className="project-feature" data-reveal><div className="project-visual"><div className="mini-window"><div className="mini-top"><i/><i/><i/><span>OPS / REVIEW</span></div><div className="mini-kpis"><span/><span/><span/></div><div className="mini-chart"><i/><i/><i/><i/><i/><i/><i/></div><div className="mini-table"><i/><i/><i/><i/></div></div><span className="visual-tag">{t.fictionalLabel}</span></div><div className="project-copy"><p className="project-kicker">{t.projectKicker}</p><h3>{t.opsTitle}</h3><p>{t.opsText}</p><div className="project-tags"><span>HTML</span><span>CSS</span><span>JavaScript</span><span>CSV</span></div><a className="text-link" href="/projects/operations-data-review-suite">{t.demo}<span> ↗</span></a></div></article><article className="project-next" data-reveal><div><p className="project-kicker">{language === "en" ? "02 · FICTIONAL BUSINESS ANALYSIS" : "02 · ANÁLISIS EMPRESARIAL FICTICIO"}</p><h3>{t.novaTitle}</h3><p>{t.novaText}</p></div><a href="/projects/novatech" className="round-link" aria-label={t.case}>↗</a></article><article className="project-next" data-reveal><div><p className="project-kicker">{language === "en" ? "03 · FICTIONAL DECISION SUPPORT" : "03 · APOYO FICTICIO A DECISIONES"}</p><h3>{t.copilotTitle}</h3><p>{t.copilotText}</p></div><a href="/projects/operations-decision-copilot" className="round-link" aria-label={t.copilotTitle}>↗</a></article></div></section>
    <section className="section skills-section"><div className="section-label"><span>04</span><span>{t.capabilityLabel}</span></div><div className="section-body" data-reveal><h2>{t.skillsTitle}</h2><p>{t.skillsIntro}</p><div className="skill-groups">{t.groups.map(([title, body], i) => <article className="skill-group" key={title} data-reveal><span>0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></section>
    <section className="section education-section"><div className="section-label"><span>05</span><span>{t.educationLabel}</span></div><div className="section-body" data-reveal><h2>{t.educationTitle}</h2><div className="education-main" data-reveal><span className="degree-mark">E</span><div><h3>{t.degree}</h3><p>{t.thesis}</p></div></div><ul className="certificate-list">{t.certificates.map((x,i)=><li key={x} data-reveal><span>0{i+1}</span>{x}</li>)}</ul></div></section>
    <section className="contact-section" id="contact" data-reveal><p className="eyebrow">{language === "en" ? "CONTACT" : "CONTACTO"}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><a className="button-primary" href="https://www.linkedin.com/in/juan-guillermo-barrios-villamil-474733234/" target="_blank" rel="noreferrer">{t.contactLink}<span aria-hidden="true"> ↗</span></a></section>
    <footer><a className="wordmark" href="#top">JGB<span>.</span></a><p>{t.footer}</p><a href="#top">↑</a></footer>
  </main>;
}
