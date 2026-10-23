"use client";

import { useState } from "react";

type Language = "en" | "es";

const resumeContent = {
  en: {
    back: "Portfolio", label: "PROFESSIONAL RÉSUMÉ", title: "Juan Guillermo Barrios Villamil",
    headline: "Strategic Planning & High-Risk Account Specialist",
    summary: "Electronic Engineer with experience in operational account review, billing discrepancy investigation, record validation, and cross-functional follow-up. Building practical skills in data analytics, business intelligence, and process analysis.",
    print: "Print / save as PDF", linkedin: "LinkedIn", github: "GitHub profile", portfolio: "Portfolio home",
    experience: "Experience", current: "Strategic Planning & High-Risk Account Specialist", hybrid: "Hybrid · May 4, 2026 – Present", iron: "Iron Mountain",
    ironBullets: ["Review complex account records and identify cases requiring further investigation or review by authorized stakeholders.", "Compare available account, inventory, service, and billing records to identify discrepancies and missing information.", "Prepare structured operational reports and coordinate follow-up with internal teams and external partners.", "Document findings and next steps; financial decisions remain with authorized stakeholders."],
    civilTitle: "IT Support Assistant", civilDate: "Dec 2025 – Jan 2026", civilBullets: ["Supported software quality testing and electronics inventory management.", "Explored sensor-related business opportunities at a preliminary level."],
    foundTitle: "Customer Service Agent", foundDate: "Feb 2025 – Jul 2025", foundBullets: ["Responded to customer service requests in an English-language support environment."],
    education: "Education", degree: "Electronic Engineering", school: "Universidad de los Andes · Degree awarded October 20, 2025", thesis: "Thesis: IoT automation of electronic systems integrating an adjustable voltage source and an AD9833 signal generator.",
    credentials: "Certifications", certs: ["Data Analytics Essentials · Cisco Networking Academy / MinTIC · May 23, 2026", "Introduction to Data Science · Cisco Networking Academy / MinTIC · May 5, 2026", "Introduction to Cybersecurity · Cisco Networking Academy / MinTIC · May 23, 2026"], coursesLabel: "Additional courses · Platzi", courses: ["Frontend Developer · 2025", "Practical Frontend Developer · 2025", "Emotional Intelligence · 2023", "Effective Communication · 2023"],
    capabilities: "Capabilities", skillGroups: [["Experience-backed", "Operational case review · record validation · discrepancy investigation · customer service · software quality testing"], ["Learning", "Excel for analysis · SQL · Python fundamentals · Power BI and DAX · Git and GitHub"]],
    projects: "Selected projects", projectNote: "Independent portfolio projects.",
    projectsList: [["Operations Data Review Suite", "Explore a generic operational review workflow with synthetic records."], ["NovaTech monthly performance", "Fictional 12-month analysis with documented data checks and reproducible summaries."], ["Operations Decision Copilot", "Fictional decision-support case with documented assumptions and review steps."]],
    footer: "Independent portfolio · Demonstration data is fictional · No employer systems connected.", language: "Español",
  },
  es: {
    back: "Portafolio", label: "HOJA DE VIDA PROFESIONAL", title: "Juan Guillermo Barrios Villamil",
    headline: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo",
    summary: "Ingeniero electrónico con experiencia en revisión operativa de cuentas, investigación de discrepancias de facturación, validación de registros y coordinación de seguimientos. Desarrolla habilidades prácticas en analítica de datos, inteligencia de negocios y análisis de procesos.",
    print: "Imprimir / guardar como PDF", linkedin: "LinkedIn", github: "Perfil de GitHub", portfolio: "Inicio del portafolio",
    experience: "Experiencia", current: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo", hybrid: "Híbrido · 4 de mayo de 2026 – Actualidad", iron: "Iron Mountain",
    ironBullets: ["Reviso registros de cuentas complejas e identifico casos que requieren investigación o revisión adicional de responsables autorizados.", "Comparo registros disponibles de cuentas, inventario, servicio y facturación para identificar discrepancias e información faltante.", "Preparo reportes operativos estructurados y coordino seguimientos con equipos internos y aliados externos.", "Documento hallazgos y pasos siguientes; las decisiones financieras corresponden a responsables autorizados."],
    civilTitle: "Auxiliar de Soporte IT", civilDate: "Dic 2025 – Ene 2026", civilBullets: ["Apoyé pruebas de calidad de software y gestión de inventario electrónico.", "Exploré oportunidades de negocio relacionadas con sensores a nivel preliminar."],
    foundTitle: "Agente de Servicio al Cliente", foundDate: "Feb 2025 – Jul 2025", foundBullets: ["Atendí solicitudes de servicio al cliente en un entorno de soporte en inglés."],
    education: "Formación", degree: "Ingeniería Electrónica", school: "Universidad de los Andes · Título otorgado el 20 de octubre de 2025", thesis: "Tesis: automatización IoT de sistemas electrónicos con una fuente de voltaje ajustable y un generador de señales AD9833.",
    credentials: "Certificaciones", certs: ["Fundamentos de Análisis de Datos · Cisco Networking Academy / MinTIC · 23 de mayo de 2026", "Introducción a la Ciencia de Datos · Cisco Networking Academy / MinTIC · 5 de mayo de 2026", "Introducción a la Ciberseguridad · Cisco Networking Academy / MinTIC · 23 de mayo de 2026"], coursesLabel: "Cursos adicionales · Platzi", courses: ["Frontend Developer · 2025", "Practical Frontend Developer · 2025", "Inteligencia Emocional · 2023", "Comunicación Efectiva · 2023"],
    capabilities: "Habilidades", skillGroups: [["Respaldado por experiencia", "Revisión de casos operativos · validación de registros · investigación de discrepancias · servicio al cliente · pruebas de calidad de software"], ["En aprendizaje", "Excel para análisis · SQL · fundamentos de Python · Power BI y DAX · Git y GitHub"]],
    projects: "Proyectos seleccionados", projectNote: "Proyectos independientes del portafolio.",
    projectsList: [["Operations Data Review Suite", "Flujo genérico de revisión operativa con registros sintéticos."], ["Desempeño mensual de NovaTech", "Análisis ficticio de 12 meses con validaciones documentadas y resúmenes reproducibles."], ["Operations Decision Copilot", "Caso ficticio de apoyo a decisiones con supuestos y pasos de revisión documentados."]],
    footer: "Portafolio independiente · Datos demostrativos ficticios · Sin conexión a sistemas de empleadores.", language: "English",
  },
} as const;

const projectPaths = ["/projects/operations-data-review-suite", "/projects/novatech", "/projects/operations-decision-copilot"];

export default function ResumeClient() {
  const [language, setLanguage] = useState<Language>("en");
  const t = resumeContent[language];

  return <main className="resume-page">
    <header className="resume-header"><a href="/">← {t.back}</a><button className="language-switch" onClick={() => setLanguage(language === "en" ? "es" : "en")}>{t.language}</button></header>
    <article className="resume-sheet">
      <header className="resume-identity"><p className="eyebrow">{t.label}</p><h1>{t.title}</h1><h2>{t.headline}</h2><p>{t.summary}</p>
        <div className="resume-links"><a href="https://www.linkedin.com/in/juan-guillermo-barrios-villamil-474733234/" target="_blank" rel="noreferrer">{t.linkedin} ↗</a><a href="https://github.com/barriosj136-oss" target="_blank" rel="noreferrer">{t.github} ↗</a><a href="/">{t.portfolio} ↗</a><button onClick={() => window.print()}>{t.print} ⤓</button></div>
      </header>
      <section className="resume-section"><h2>{t.experience}</h2>
        <article className="resume-role"><div><h3>{t.current}</h3><p className="resume-company">{t.iron} · {t.hybrid}</p></div><ul>{t.ironBullets.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="resume-role"><div><h3>{t.civilTitle}</h3><p className="resume-company">CivilTech Ingeniería y Construcción S.A.S. · {t.civilDate}</p></div><ul>{t.civilBullets.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="resume-role"><div><h3>{t.foundTitle}</h3><p className="resume-company">Foundever de Colombia · {t.foundDate}</p></div><ul>{t.foundBullets.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>
      <section className="resume-section"><h2>{t.education}</h2><h3>{t.degree}</h3><p>{t.school}</p><p>{t.thesis}</p></section>
      <section className="resume-section"><h2>{t.credentials}</h2><ul>{t.certs.map((item) => <li key={item}>{item}</li>)}</ul><h3>{t.coursesLabel}</h3><ul>{t.courses.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="resume-section"><h2>{t.capabilities}</h2><div className="resume-skills">{t.skillGroups.map(([heading, body]) => <article key={heading}><h3>{heading}</h3><p>{body}</p></article>)}</div></section>
      <section className="resume-section"><h2>{t.projects}</h2><p>{t.projectNote}</p><div className="resume-projects">{t.projectsList.map(([title, description], index) => <a href={projectPaths[index]} key={title}><h3>{title} ↗</h3><p>{description}</p></a>)}</div></section>
      <footer className="resume-footer"><span>{t.footer}</span><a href="/">JGB · {t.back} ↗</a></footer>
    </article>
  </main>;
}
