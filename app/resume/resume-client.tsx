"use client";

import { useState } from "react";

type Language = "en" | "es";

const resumeContent = {
  en: {
    back: "Portfolio", label: "PROFESSIONAL RÉSUMÉ", title: "Juan Guillermo Barrios Villamil",
    headline: "Strategic Planning & High-Risk Account Specialist",
    summary: "Electronic Engineer from Universidad de los Andes with experience reviewing account, invoice, and payment records, validating data, investigating discrepancies, and coordinating operational follow-up. My engineering training supports a systematic approach to measurement, troubleshooting, and evidence. Seeking junior Data Analyst, BI Analyst, Business Analyst, or Operations Analyst roles.",
    print: "Print / save as PDF", linkedin: "LinkedIn", github: "GitHub profile", portfolio: "Portfolio home",
    experience: "Experience", current: "Strategic Planning & High-Risk Account Specialist", hybrid: "Hybrid · May 4, 2026 – Present", iron: "Iron Mountain",
    ironBullets: ["Review complex, high-risk account cases and track their status through operational follow-up.", "Compare account, invoice, payment, inventory, and service records in Excel to validate information and investigate billing discrepancies.", "Review billed, paid, outstanding, and recovered amounts to support case follow-up and financial review.", "Document findings and refer accounting decisions to authorized stakeholders.", "Work-impact metric pending confirmation: [COMPLETAR: verified result]."],
    civilTitle: "IT Support Assistant", civilDate: "Dec 2025 – Jan 2026", civilBullets: ["Supported software quality testing and electronics inventory management.", "Explored sensor-related business opportunities at a preliminary level."],
    foundTitle: "Customer Service Agent", foundDate: "Feb 2025 – Jul 2025", foundBullets: ["Responded to customer service requests in an English-language support environment."],
    education: "Education", degree: "Electronic Engineering", school: "Universidad de los Andes · Degree awarded October 20, 2025", thesis: "Thesis: IoT automation of electronic systems integrating an adjustable voltage source and an AD9833 signal generator.",
    credentials: "Data-related certifications", certs: ["Data Analytics Essentials · Cisco Networking Academy / MinTIC · May 23, 2026", "Introduction to Data Science · Cisco Networking Academy / MinTIC · May 5, 2026"], coursesLabel: "Additional courses · Cisco Networking Academy / MinTIC and Platzi", courses: ["Introduction to Cybersecurity · May 23, 2026", "Frontend Developer · 2025", "Practical Frontend Developer · 2025", "Emotional Intelligence · 2023", "Effective Communication · 2023"],
    capabilities: "Capabilities", skillGroups: [["Experience-backed", "Operational case review · record validation · discrepancy investigation · customer service · software quality testing · Excel-based review"], ["Currently developing", "SQL · Python and pandas · Power BI and DAX · Git and GitHub"], ["Languages", "Spanish · Native · English · C1, Universidad de los Andes"]],
    projects: "Selected projects", projectNote: "Independent projects and case studies.",
    projectsList: [["Bogotá 2025 budget commitments", "Python and SQL analysis of 7,681 public budget records, with monthly reconciliation."], ["NovaTech invoice and payment review", "Editable synthetic dataset and dashboard with separate CAD/USD views." ]],
    emailLabel: "Email", email: "juguibavi27@gmail.com", certificateLink: "View certificate",
    footer: "Independent portfolio · selected projects and case studies.", language: "Español",
  },
  es: {
    back: "Portafolio", label: "HOJA DE VIDA PROFESIONAL", title: "Juan Guillermo Barrios Villamil",
    headline: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo",
    summary: "Ingeniero electrónico de la Universidad de los Andes con experiencia en revisión de registros de cuentas, facturas y pagos, validación de datos, investigación de discrepancias y coordinación de seguimientos operativos. Mi formación en ingeniería respalda un enfoque sistemático de medición, diagnóstico y uso de evidencia. Busco oportunidades junior como Analista de Datos, BI, Negocio u Operaciones.",
    print: "Imprimir / guardar como PDF", linkedin: "LinkedIn", github: "Perfil de GitHub", portfolio: "Inicio del portafolio",
    experience: "Experiencia", current: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo", hybrid: "Híbrido · 4 de mayo de 2026 – Actualidad", iron: "Iron Mountain",
    ironBullets: ["Reviso casos complejos de cuentas de alto riesgo y hago seguimiento a su estado dentro de la operación.", "Comparo registros de cuentas, facturas, pagos, inventario y servicio en Excel para validar información e investigar diferencias de facturación.", "Reviso montos facturados, pagados, pendientes y recuperados para apoyar seguimientos y revisiones financieras.", "Documento hallazgos y remito las decisiones contables a los responsables autorizados.", "Métrica de impacto laboral pendiente de confirmar: [COMPLETAR: resultado verificable]."],
    civilTitle: "Auxiliar de Soporte IT", civilDate: "Dic 2025 – Ene 2026", civilBullets: ["Apoyé pruebas de calidad de software y gestión de inventario electrónico.", "Exploré oportunidades de negocio relacionadas con sensores a nivel preliminar."],
    foundTitle: "Agente de Servicio al Cliente", foundDate: "Feb 2025 – Jul 2025", foundBullets: ["Atendí solicitudes de servicio al cliente en un entorno de soporte en inglés."],
    education: "Formación", degree: "Ingeniería Electrónica", school: "Universidad de los Andes · Título otorgado el 20 de octubre de 2025", thesis: "Tesis: automatización IoT de sistemas electrónicos con una fuente de voltaje ajustable y un generador de señales AD9833.",
    credentials: "Certificaciones relacionadas con datos", certs: ["Fundamentos de Análisis de Datos · Cisco Networking Academy / MinTIC · 23 de mayo de 2026", "Introducción a la Ciencia de Datos · Cisco Networking Academy / MinTIC · 5 de mayo de 2026"], coursesLabel: "Cursos adicionales · Cisco Networking Academy / MinTIC y Platzi", courses: ["Introducción a la Ciberseguridad · 23 de mayo de 2026", "Frontend Developer · 2025", "Practical Frontend Developer · 2025", "Inteligencia Emocional · 2023", "Comunicación Efectiva · 2023"],
    capabilities: "Habilidades", skillGroups: [["Respaldadas por experiencia", "Revisión de casos operativos · validación de registros · investigación de discrepancias · servicio al cliente · pruebas de calidad de software · revisión con Excel"], ["En desarrollo", "SQL · Python y pandas · Power BI y DAX · Git y GitHub"], ["Idiomas", "Español · Nativo · Inglés · C1, Universidad de los Andes"]],
    projects: "Proyectos seleccionados", projectNote: "Proyectos y casos independientes.",
    projectsList: [["Compromisos presupuestarios de Bogotá 2025", "Análisis de 7.681 registros presupuestarios públicos con Python y SQL, conciliado por mes."], ["Revisión de facturas y pagos de NovaTech", "Dataset sintético editable y dashboard con vistas separadas en CAD/USD."]],
    emailLabel: "Correo", email: "juguibavi27@gmail.com", certificateLink: "Ver certificado",
    footer: "Portafolio independiente · proyectos y casos seleccionados.", language: "English",
  },
} as const;

const projectPaths = ["/projects/bogota-budget", "/projects/novatech"];

export default function ResumeClient() {
  const [language, setLanguage] = useState<Language>("en");
  const t = resumeContent[language];

  return <main className="resume-page">
    <header className="resume-header"><a href="/">← {t.back}</a><button className="language-switch" onClick={() => setLanguage(language === "en" ? "es" : "en")}>{t.language}</button></header>
    <article className="resume-sheet">
      <header className="resume-identity"><p className="eyebrow">{t.label}</p><h1>{t.title}</h1><h2>{t.headline}</h2><p>{t.summary}</p>
        <div className="resume-links"><a href={`mailto:${t.email}`}>{t.emailLabel}: {t.email}</a><a href="https://www.linkedin.com/in/juan-guillermo-barrios-villamil-474733234/" target="_blank" rel="noreferrer">{t.linkedin} ↗</a><a href="https://github.com/barriosj136-oss" target="_blank" rel="noreferrer">{t.github} ↗</a><a href="/">{t.portfolio} ↗</a><button onClick={() => window.print()}>{t.print} ⤓</button></div>
      </header>
      <section className="resume-section"><h2>{t.experience}</h2>
        <article className="resume-role"><div><h3>{t.current}</h3><p className="resume-company">{t.iron} · {t.hybrid}</p></div><ul>{t.ironBullets.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="resume-role"><div><h3>{t.civilTitle}</h3><p className="resume-company">CivilTech Ingeniería y Construcción S.A.S. · {t.civilDate}</p></div><ul>{t.civilBullets.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="resume-role"><div><h3>{t.foundTitle}</h3><p className="resume-company">Foundever de Colombia · {t.foundDate}</p></div><ul>{t.foundBullets.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>
      <section className="resume-section"><h2>{t.education}</h2><h3>{t.degree}</h3><p>{t.school}</p><p>{t.thesis}</p></section>
      <section className="resume-section"><h2>{t.credentials}</h2><ul>{t.certs.map((item, index) => <li key={item}>{item} · <a href={index === 0 ? "/certificates/data-analytics-essentials.pdf" : "/certificates/introduction-to-data-science.pdf"} target="_blank" rel="noreferrer">{t.certificateLink}</a></li>)}</ul><h3>{t.coursesLabel}</h3><ul>{t.courses.map((item) => <li key={item}>{item}{item.includes("Cybersecurity") || item.includes("Ciberseguridad") ? <> · <a href="/certificates/introduction-to-cybersecurity.pdf" target="_blank" rel="noreferrer">{t.certificateLink}</a></> : null}</li>)}</ul></section>
      <section className="resume-section"><h2>{t.capabilities}</h2><div className="resume-skills">{t.skillGroups.map(([heading, body]) => <article key={heading}><h3>{heading}</h3><p>{body}</p></article>)}</div></section>
      <section className="resume-section"><h2>{t.projects}</h2><p>{t.projectNote}</p><div className="resume-projects">{t.projectsList.map(([title, description], index) => <a href={projectPaths[index]} key={title}><h3>{title} ↗</h3><p>{description}</p></a>)}</div></section>
      <footer className="resume-footer"><span>{t.footer}</span><a href="/">JGB · {t.back} ↗</a></footer>
    </article>
  </main>;
}
