"use client";

import { useState } from "react";

type Language = "en" | "es";

const resumeContent = {
  en: {
    back: "Portfolio", label: "PROFESSIONAL RÉSUMÉ", title: "Juan Guillermo Barrios Villamil",
    headline: "Strategic Planning & High-Risk Account Specialist",
    summary: "Electronic Engineer from Universidad de los Andes and Strategic Planning & High-Risk Account Specialist at Iron Mountain. I review high-risk accounts, investigate invoice and payment discrepancies, track outstanding and recovered amounts, and coordinate follow-up. Seeking junior Data Analyst and Business Intelligence Analyst roles.",
    print: "Print / save as PDF", linkedin: "LinkedIn", github: "GitHub profile", portfolio: "Portfolio home",
    experience: "Experience", current: "Strategic Planning & High-Risk Account Specialist", hybrid: "Hybrid · May 4, 2026 – Present", iron: "Iron Mountain",
    ironBullets: ["Review high-risk account cases across Abandoned Records, Bankruptcy, and Third-Party Collections workflows.", "Compare account, invoice, payment, inventory, and service records to investigate billing discrepancies and validate account status.", "Analyze billed, paid, outstanding, recovered, and unrecovered amounts to support account follow-up and financial review.", "Document findings and escalate potential write-off cases; approval remains with authorized stakeholders."],
    civilTitle: "IT Support Assistant", civilDate: "Dec 2025 – Jan 2026", civilBullets: ["Supported software quality testing and electronics inventory management.", "Explored sensor-related business opportunities at a preliminary level."],
    foundTitle: "Customer Service Agent", foundDate: "Feb 2025 – Jul 2025", foundBullets: ["Responded to customer service requests in an English-language support environment."],
    education: "Education", degree: "Electronic Engineering", school: "Universidad de los Andes · Degree awarded October 20, 2025", thesis: "Thesis: IoT automation of electronic systems integrating an adjustable voltage source and an AD9833 signal generator.",
    credentials: "Certifications", certs: ["Data Analytics Essentials · Cisco Networking Academy / MinTIC · May 23, 2026", "Introduction to Data Science · Cisco Networking Academy / MinTIC · May 5, 2026", "Introduction to Cybersecurity · Cisco Networking Academy / MinTIC · May 23, 2026"], coursesLabel: "Additional courses · Platzi", courses: ["Frontend Developer · 2025", "Practical Frontend Developer · 2025", "Emotional Intelligence · 2023", "Effective Communication · 2023"],
    capabilities: "Capabilities", skillGroups: [["Experience-backed", "Operational case review · record validation · discrepancy investigation · customer service · software quality testing"], ["Learning", "Excel for analysis · SQL · Python fundamentals · Power BI and DAX · Git and GitHub"]],
    projects: "Selected projects", projectNote: "Independent projects and case studies.",
    projectsList: [["Operations Data Review Suite", "Interactive operational review workflow with search, dashboards, and CSV tools."], ["NovaTech monthly performance", "12-month analysis of target attainment, budget variance, and documented data checks."], ["Operations Decision Copilot", "Decision-support case with documented assumptions and review steps."]],
    footer: "Independent portfolio · selected projects and case studies.", language: "Español",
  },
  es: {
    back: "Portafolio", label: "HOJA DE VIDA PROFESIONAL", title: "Juan Guillermo Barrios Villamil",
    headline: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo",
    summary: "Ingeniero electrónico de la Universidad de los Andes y Strategic Planning & High-Risk Account Specialist en Iron Mountain. Reviso cuentas de alto riesgo, investigo diferencias en facturas y pagos, analizo montos pendientes y recuperados, y coordino seguimientos. Busco oportunidades junior como Analista de Datos o Analista de Inteligencia de Negocios.",
    print: "Imprimir / guardar como PDF", linkedin: "LinkedIn", github: "Perfil de GitHub", portfolio: "Inicio del portafolio",
    experience: "Experiencia", current: "Especialista en Planeación Estratégica y Cuentas de Alto Riesgo", hybrid: "Híbrido · 4 de mayo de 2026 – Actualidad", iron: "Iron Mountain",
    ironBullets: ["Reviso cuentas de alto riesgo de los flujos de Abandoned Records, Bankruptcy y Third-Party Collections.", "Comparo registros de cuentas, facturas, pagos, inventario y servicio para investigar diferencias de facturación y validar el estado de las cuentas.", "Analizo montos facturados, pagados, pendientes, recuperados y no recuperados para apoyar seguimientos y revisiones financieras.", "Documento hallazgos y remito casos potenciales de write-off; su aprobación corresponde a responsables autorizados."],
    civilTitle: "Auxiliar de Soporte IT", civilDate: "Dic 2025 – Ene 2026", civilBullets: ["Apoyé pruebas de calidad de software y gestión de inventario electrónico.", "Exploré oportunidades de negocio relacionadas con sensores a nivel preliminar."],
    foundTitle: "Agente de Servicio al Cliente", foundDate: "Feb 2025 – Jul 2025", foundBullets: ["Atendí solicitudes de servicio al cliente en un entorno de soporte en inglés."],
    education: "Formación", degree: "Ingeniería Electrónica", school: "Universidad de los Andes · Título otorgado el 20 de octubre de 2025", thesis: "Tesis: automatización IoT de sistemas electrónicos con una fuente de voltaje ajustable y un generador de señales AD9833.",
    credentials: "Certificaciones", certs: ["Fundamentos de Análisis de Datos · Cisco Networking Academy / MinTIC · 23 de mayo de 2026", "Introducción a la Ciencia de Datos · Cisco Networking Academy / MinTIC · 5 de mayo de 2026", "Introducción a la Ciberseguridad · Cisco Networking Academy / MinTIC · 23 de mayo de 2026"], coursesLabel: "Cursos adicionales · Platzi", courses: ["Frontend Developer · 2025", "Practical Frontend Developer · 2025", "Inteligencia Emocional · 2023", "Comunicación Efectiva · 2023"],
    capabilities: "Habilidades", skillGroups: [["Respaldado por experiencia", "Revisión de casos operativos · validación de registros · investigación de discrepancias · servicio al cliente · pruebas de calidad de software"], ["En aprendizaje", "Excel para análisis · SQL · fundamentos de Python · Power BI y DAX · Git y GitHub"]],
    projects: "Proyectos seleccionados", projectNote: "Proyectos y casos independientes.",
    projectsList: [["Operations Data Review Suite", "Flujo interactivo de revisión operativa con búsqueda, tableros y herramientas CSV."], ["Desempeño mensual de NovaTech", "Análisis de 12 meses sobre objetivos, desviación presupuestaria y validación de datos."], ["Operations Decision Copilot", "Caso de apoyo a decisiones con supuestos y pasos de revisión documentados."]],
    footer: "Portafolio independiente · proyectos y casos seleccionados.", language: "English",
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
