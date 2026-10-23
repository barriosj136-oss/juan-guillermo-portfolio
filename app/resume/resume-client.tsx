"use client";

import { useState } from "react";

type Language = "en" | "es";

const resumeContent = {
  en: {
    back: "Portfolio", label: "PROFESSIONAL RÉSUMÉ", title: "Juan Guillermo Barrios Villamil",
    headline: "Strategic Planning & High-Risk Account Specialist",
    summary: "Electronic Engineer from Universidad de los Andes working in Iron Mountain’s High Risk function. Reviews account, service, invoice, and payment records; investigates discrepancies; coordinates case follow-up; and builds reports, charts, and automation logic to support team prioritization. In some cases, explains payment requirements when customers ask about restoring service; account reactivation is handled by authorized teams. Seeking junior Data Analyst, BI Analyst, Business Analyst, or Operations Analyst roles.",
    print: "Print / save as PDF", download: "Download résumé PDF", linkedin: "LinkedIn", github: "GitHub profile", portfolio: "Portfolio home",
    experience: "Experience", current: "Strategic Planning & High-Risk Account Specialist", hybrid: "Hybrid · May 4, 2026 – Present", iron: "Iron Mountain",
    ironBullets: ["Review and prioritize high-risk account cases, track statuses, and coordinate appropriate operational follow-up across the broader High Risk function.", "Compare account, invoice, payment, inventory, and service records in Excel to validate information and investigate billing discrepancies.", "Design and build reports, charts, and automation logic that help the team identify accounts for review and route follow-up consistently.", "For some inactive accounts, explain outstanding invoices and payment requirements when customers ask about restoring service; reactivation decisions remain with authorized teams.", "Review billed, paid, and outstanding amounts, document findings, and refer accounting or account-status decisions to authorized stakeholders."],
    workload: "Workload context: my current assigned queue is approximately 20 cases. Historically, one person handled around 200 cases in the function; these are different workload setups, not a like-for-like impact comparison.",
    civilTitle: "IT Support Assistant", civilDate: "Dec 2025 – Jan 2026", civilBullets: ["Supported software quality testing and electronics inventory management.", "Explored sensor-related business opportunities at a preliminary level."],
    foundTitle: "Customer Service Agent", foundDate: "Feb 2025 – Jul 2025", foundBullets: ["Responded to customer service requests in an English-language support environment."],
    education: "Education", degree: "Electronic Engineering", school: "Universidad de los Andes · Degree awarded October 20, 2025", thesis: "Thesis: IoT automation of electronic systems integrating an adjustable voltage source and an AD9833 signal generator.",
    credentials: "Data-related certifications", certs: ["Data Analytics Essentials · Cisco Networking Academy / MinTIC · May 23, 2026", "Introduction to Data Science · Cisco Networking Academy / MinTIC · May 5, 2026"], coursesLabel: "Additional courses · Cisco Networking Academy / MinTIC and Platzi", courses: ["Introduction to Cybersecurity · May 23, 2026", "Frontend Developer · 2025", "Practical Frontend Developer · 2025", "Emotional Intelligence · 2023", "Effective Communication · 2023"],
    capabilities: "Capabilities", skillGroups: [["Experience-backed", "Operational case review · record validation · discrepancy investigation · customer service · software quality testing · Excel-based review"], ["Currently developing", "SQL · Python and pandas · Power BI and DAX · Git and GitHub"], ["Languages", "Spanish · Native · English · C1, Universidad de los Andes"]],
    projects: "Selected projects", projectNote: "Independent projects and case studies.",
    projectsList: [["Bogotá 2025 budget commitments", "Python and SQL analysis of 7,681 official records across 50 entity labels and 2,198 budget-item codes. Monthly changes reconcile to COP 36.26 trillion in cumulative December commitments; source decreases are retained for review."], ["NovaTech invoice and payment review", "Editable 4,800-row synthetic dataset for 2024–2025, with invoice, payment, recovery, and outstanding-balance fields. Canada/CAD and United States/USD are kept separate; edit the CSV in Excel and reload the local dashboard to recalculate metrics."]],
    emailLabel: "Email", email: "juguibavi27@gmail.com", certificateLink: "View certificate",
    footer: "Independent portfolio · selected projects and case studies.", language: "Español",
  },
  es: {
    back: "Portafolio", label: "HOJA DE VIDA PROFESIONAL", title: "Juan Guillermo Barrios Villamil",
    headline: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo",
    summary: "Ingeniero electrónico de la Universidad de los Andes que trabaja en la función de High Risk de Iron Mountain. Reviso registros de cuentas, servicios, facturas y pagos; investigo discrepancias; coordino seguimientos; y elaboro reportes, gráficos y lógica de automatización para apoyar la priorización del equipo. En algunos casos explico los pagos requeridos cuando un cliente consulta cómo recuperar el servicio; la reactivación corresponde a equipos autorizados. Busco oportunidades junior como Analista de Datos, BI, Negocio u Operaciones.",
    print: "Imprimir / guardar como PDF", download: "Descargar hoja de vida PDF", linkedin: "LinkedIn", github: "Perfil de GitHub", portfolio: "Inicio del portafolio",
    experience: "Experiencia", current: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo", hybrid: "Híbrido · 4 de mayo de 2026 – Actualidad", iron: "Iron Mountain",
    ironBullets: ["Reviso y priorizo casos de cuentas de alto riesgo, hago seguimiento a sus estados y coordino acciones operativas dentro de la función amplia de High Risk.", "Comparo en Excel registros de cuentas, facturas, pagos, inventario y servicio para validar información e investigar diferencias de facturación.", "Diseño y elaboro reportes, gráficos y lógica de automatización que ayudan al equipo a identificar cuentas para revisión y encaminar seguimientos de forma consistente.", "En algunos casos de cuentas inactivas, explico facturas pendientes y pagos requeridos cuando un cliente consulta cómo recuperar el servicio; las decisiones de reactivación corresponden a equipos autorizados.", "Reviso montos facturados, pagados y pendientes, documento hallazgos y remito decisiones contables o de estado de cuenta a los responsables autorizados."],
    workload: "Contexto de carga de trabajo: mi cola asignada actual es de aproximadamente 20 casos. Históricamente, una persona manejaba cerca de 200 casos en la función; son configuraciones distintas y no una comparación directa de impacto.",
    civilTitle: "Auxiliar de Soporte IT", civilDate: "Dic 2025 – Ene 2026", civilBullets: ["Apoyé pruebas de calidad de software y gestión de inventario electrónico.", "Exploré oportunidades de negocio relacionadas con sensores a nivel preliminar."],
    foundTitle: "Agente de Servicio al Cliente", foundDate: "Feb 2025 – Jul 2025", foundBullets: ["Atendí solicitudes de servicio al cliente en un entorno de soporte en inglés."],
    education: "Formación", degree: "Ingeniería Electrónica", school: "Universidad de los Andes · Título otorgado el 20 de octubre de 2025", thesis: "Tesis: automatización IoT de sistemas electrónicos con una fuente de voltaje ajustable y un generador de señales AD9833.",
    credentials: "Certificaciones relacionadas con datos", certs: ["Fundamentos de Análisis de Datos · Cisco Networking Academy / MinTIC · 23 de mayo de 2026", "Introducción a la Ciencia de Datos · Cisco Networking Academy / MinTIC · 5 de mayo de 2026"], coursesLabel: "Cursos adicionales · Cisco Networking Academy / MinTIC y Platzi", courses: ["Introducción a la Ciberseguridad · 23 de mayo de 2026", "Frontend Developer · 2025", "Practical Frontend Developer · 2025", "Inteligencia Emocional · 2023", "Comunicación Efectiva · 2023"],
    capabilities: "Habilidades", skillGroups: [["Respaldadas por experiencia", "Revisión de casos operativos · validación de registros · investigación de discrepancias · servicio al cliente · pruebas de calidad de software · revisión con Excel"], ["En desarrollo", "SQL · Python y pandas · Power BI y DAX · Git y GitHub"], ["Idiomas", "Español · Nativo · Inglés · C1, Universidad de los Andes"]],
    projects: "Proyectos seleccionados", projectNote: "Proyectos y casos independientes.",
    projectsList: [["Compromisos presupuestarios de Bogotá 2025", "Análisis con Python y SQL de 7.681 registros oficiales, 50 entidades y 2.198 códigos de rubro. Los cambios mensuales concilian con COP 36,26 billones en compromisos acumulados a diciembre; las disminuciones de la fuente se conservan para revisión."], ["Revisión de facturas y pagos de NovaTech", "Dataset sintético editable de 4.800 filas para 2024–2025, con facturas, pagos, recuperación y saldos pendientes. Canadá/CAD y Estados Unidos/USD se mantienen separados; edita el CSV en Excel y recarga el dashboard local para recalcular indicadores."]],
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
        <div className="resume-links"><a href={`mailto:${t.email}`}>{t.emailLabel}: {t.email}</a><a href="https://www.linkedin.com/in/juan-guillermo-barrios-villamil-474733234/" target="_blank" rel="noreferrer">{t.linkedin} ↗</a><a href="https://github.com/barriosj136-oss" target="_blank" rel="noreferrer">{t.github} ↗</a><a href="/">{t.portfolio} ↗</a><a href={language === "en" ? "/cv/Juan-Guillermo-Barrios-Resume.pdf" : "/cv/Juan-Guillermo-Barrios-Hoja-de-Vida.pdf"} download>{t.download} ⤓</a><button onClick={() => window.print()}>{t.print}</button></div>
      </header>
      <section className="resume-section"><h2>{t.experience}</h2>
        <article className="resume-role"><div><h3>{t.current}</h3><p className="resume-company">{t.iron} · {t.hybrid}</p></div><ul>{t.ironBullets.map((item) => <li key={item}>{item}</li>)}</ul><p>{t.workload}</p></article>
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
