"use client";

import { useState } from "react";
import resumeContent from "./resume-content.json";

type Language = "en" | "es";

export default function ResumeClient() {
  const [language, setLanguage] = useState<Language>("en");
  const t = resumeContent[language];

  return <main className="resume-page">
    <header className="resume-header">
      <a href="/">← {language === "en" ? "Portfolio" : "Portafolio"}</a>
      <div><button className="resume-language" type="button" onClick={() => setLanguage(language === "en" ? "es" : "en")}>{language === "en" ? "Español" : "English"}</button><button className="resume-print" type="button" onClick={() => window.print()}>{language === "en" ? "Print / save as PDF" : "Imprimir / guardar como PDF"}</button></div>
    </header>
    <article className="resume-sheet">
      <header className="resume-identity">
        <p className="eyebrow">{t.label}</p>
        <h1>Juan Guillermo Barrios Villamil</h1>
        <h2>{t.headline}</h2>
        <p>{t.summary}</p>
        <div className="resume-links">{t.contact.map((item) => item.href ? <a key={item.label} href={item.href} target={item.href.startsWith("https:") ? "_blank" : undefined} rel={item.href.startsWith("https:") ? "noreferrer" : undefined}>{item.label}: {item.value}</a> : <span key={item.label}>{item.label}: {item.value}</span>)}<a className="resume-download" href={language === "en" ? "/cv/Juan-Guillermo-Barrios-Resume.pdf" : "/cv/Juan-Guillermo-Barrios-Hoja-de-Vida.pdf"} download>{language === "en" ? "Download PDF" : "Descargar PDF"}</a></div>
      </header>
      <section className="resume-section"><h2>{t.experienceHeading}</h2>
        {t.experience.map((role) => <article className="resume-role" key={role.company}>
          <h3>{role.title}</h3><p className="resume-company">{role.company} · {role.dates}</p>
          <ul>{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </article>)}
      </section>
      <section className="resume-section"><h2>{t.projectsHeading}</h2><div className="resume-projects">
        {t.projects.map((project) => <article key={project.title}><h3><a href={project.href}>{project.title}</a></h3><p>{project.description}</p><p className="resume-tools"><strong>{language === "en" ? "Tools:" : "Herramientas:"}</strong> {project.tools}</p></article>)}
      </div></section>
      <section className="resume-section"><h2>{t.educationHeading}</h2>
        {t.education.map((item) => <article className="resume-role" key={item.title}><h3>{item.title}</h3><p className="resume-company">{item.organization} · {item.dates}</p><p>{item.detail}</p></article>)}
      </section>
      <section className="resume-section"><h2>{t.skillsHeading}</h2><div className="resume-skills">{t.skills.map((skill) => <article key={skill.label}><h3>{skill.label}</h3><p>{skill.value}</p></article>)}</div></section>
      <section className="resume-section"><h2>{t.credentialsHeading}</h2><ul>{t.credentials.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="resume-section"><h2>{t.languagesHeading}</h2><p>{t.languages}</p></section>
      <footer className="resume-footer"><span>{t.footer}</span><a href="/">JGB · {language === "en" ? "Portfolio" : "Portafolio"}</a></footer>
    </article>
  </main>;
}
