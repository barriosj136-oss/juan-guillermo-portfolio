"use client";

import { useEffect, useState } from "react";
import styles from "./learning-roadmap.module.css";

type Language = "en" | "es";

const content = {
  en: {
    back: "Back to portfolio", switch: "ES | EN", eyebrow: "A PRACTICAL PLAN · BUILT AROUND YOUR PROJECTS",
    title: "Learn the next tools. Practice on real data.",
    intro: "You already have a public Bogotá budget analysis and working SQL/Python project files. The clearest next gap for junior BI roles is a complete Power BI report. Build that first, then strengthen the skills around it.",
    priority: "Start here", focusTitle: "Power BI: turn the Bogotá analysis into a report",
    focusText: "Use the existing 2025 public dataset. Build a report that answers how commitments change by month, entity, and budget item. Keep the source link, define each measure, and reconcile every total with the Python and SQL outputs before sharing it.",
    focusTasks: ["Prepare and profile the source in Power Query; record each cleaning step.", "Create a simple fact/dimension model and verify relationships.", "Write explicit DAX measures for cumulative commitments, monthly change, and entity share.", "Build one report page with a trend, a ranking, filters, and a short written finding."],
    result: "Portfolio result", resultText: "A Power BI file, a screenshot, a short explanation of the business question, and a validation note. Until you build it, keep Power BI marked as in development.",
    resources: "Official learning resources", beginner: "Start with prepare and visualize", model: "Then learn data modeling", dax: "Then practice DAX", excel: "Excel: Power Query basics",
    next: "Reinforce the skills you already use", sqlTitle: "SQL", sqlText: "Reproduce the Bogotá summaries with joins, CTEs, window functions, aggregation, and checks for negative monthly changes. Explain why the 752 decreasing cumulative records are retained for review.", sqlResource: "SQLite SELECT and JOIN reference", sqlWindow: "SQLite window functions reference",
    pythonTitle: "Python and pandas", pythonText: "Rebuild the same checks from CSV: inspect types and missing values, validate keys, calculate monthly/entity summaries, and compare the results with SQL. Save the steps in a readable notebook or script.", pythonResource: "Python tutorial", pandasResource: "pandas getting started",
    excelTitle: "Excel", excelText: "Strengthen your current record-review experience with tables, PivotTables, filters, and Power Query imports/cleanup. Describe only the features you can demonstrate.",
    schedule: "An 8-week sequence", cadence: "Suggested pace: 4–6 focused hours each week. Each session: study one concept, apply it to your project, and write down what you checked.",
    weeks: [
      ["Weeks 1–2", "Power Query and report basics", "Load the Bogotá dataset, inspect columns and types, document transformations, and make a first report page."],
      ["Weeks 3–4", "Modeling and DAX", "Create relationships and measures; test totals by month, entity, and budget item against the existing summaries."],
      ["Weeks 5–6", "SQL and pandas practice", "Reproduce three business questions with SQL and Python; compare outputs and explain any discrepancies."],
      ["Weeks 7–8", "Finish and present the case", "Polish the report, capture screenshots, write a short method/findings page, and add the Power BI artifact to the Bogotá project."],
    ],
    checklist: "You are ready to show the work when", checks: ["A person can understand the business question in one sentence.", "The report totals reconcile to the SQL/Python outputs.", "The data source, period, and transformations are documented.", "You can explain one finding and one limitation without reading a script."],
    phone: "Open this guide on your phone", phoneText: "Go to your portfolio URL, tap Menu, then Guía de aprendizaje / Learning plan. The project and CV links are also in the same menu and project cards.",
    disclaimer: "This is a study plan, not a claim that these tools are already mastered. Use the official learning materials; no paid certification is required for the exercises in this plan.",
  },
  es: {
    back: "Volver al portafolio", switch: "ES | EN", eyebrow: "PLAN PRÁCTICO · BASADO EN TUS PROYECTOS",
    title: "Aprende las siguientes herramientas. Practica con datos reales.",
    intro: "Ya tienes un análisis público del presupuesto de Bogotá y archivos de proyectos con SQL y Python. Para tus postulaciones junior de BI, la brecha más clara es terminar un reporte completo en Power BI. Empieza por ahí y luego refuerza las habilidades que lo complementan.",
    priority: "Empieza aquí", focusTitle: "Power BI: convierte el análisis de Bogotá en un reporte",
    focusText: "Usa el dataset público de 2025 que ya analizaste. Construye un reporte que responda cómo cambian los compromisos por mes, entidad y rubro. Conserva el enlace de la fuente, define cada medida y concilia los totales con Python y SQL antes de compartirlos.",
    focusTasks: ["Prepara y revisa los datos en Power Query; documenta cada transformación.", "Crea un modelo sencillo de hechos y dimensiones y verifica sus relaciones.", "Escribe medidas explícitas en DAX para compromisos acumulados, cambio mensual y participación por entidad.", "Construye una página con tendencia, clasificación, filtros y un hallazgo escrito breve."],
    result: "Entregable para el portafolio", resultText: "Un archivo de Power BI, una captura, una explicación breve de la pregunta de negocio y una nota de validación. Mientras lo construyes, conserva Power BI como herramienta en desarrollo.",
    resources: "Recursos oficiales para estudiar", beginner: "Empieza con preparar y visualizar", model: "Después estudia el modelo de datos", dax: "Luego practica DAX", excel: "Excel: fundamentos de Power Query",
    next: "Refuerza las herramientas que ya usas", sqlTitle: "SQL", sqlText: "Reproduce los resúmenes de Bogotá con JOIN, CTE, funciones de ventana, agregaciones y controles de variaciones mensuales negativas. Explica por qué las 752 filas con disminuciones acumuladas se conservan para revisión.", sqlResource: "Referencia SQLite de SELECT y JOIN", sqlWindow: "Referencia SQLite de funciones de ventana",
    pythonTitle: "Python y pandas", pythonText: "Repite las validaciones desde CSV: revisa tipos y valores vacíos, valida llaves, calcula resúmenes mensuales y por entidad, y compara resultados con SQL. Guarda el proceso en un notebook o script legible.", pythonResource: "Tutorial de Python", pandasResource: "Primeros pasos con pandas",
    excelTitle: "Excel", excelText: "Amplía tu experiencia actual de revisión con tablas, tablas dinámicas, filtros e importación/limpieza en Power Query. En el portafolio, describe solo las funciones que puedas demostrar.",
    schedule: "Secuencia sugerida de 8 semanas", cadence: "Ritmo sugerido: 4–6 horas enfocadas por semana. En cada sesión estudia un concepto, aplícalo al proyecto y anota qué validaste.",
    weeks: [
      ["Semanas 1–2", "Power Query y fundamentos de reportes", "Carga el dataset de Bogotá, revisa columnas y tipos, documenta las transformaciones y crea la primera página del reporte."],
      ["Semanas 3–4", "Modelo y DAX", "Crea relaciones y medidas; prueba los totales por mes, entidad y rubro frente a los resúmenes existentes."],
      ["Semanas 5–6", "Práctica de SQL y pandas", "Responde tres preguntas de negocio con SQL y Python; compara salidas y explica las diferencias que encuentres."],
      ["Semanas 7–8", "Termina y presenta el caso", "Pule el reporte, guarda capturas, redacta una página breve de método y hallazgos, y añade el archivo de Power BI al proyecto de Bogotá."],
    ],
    checklist: "El trabajo está listo para mostrar cuando", checks: ["Una persona entiende la pregunta de negocio en una frase.", "Los totales del reporte concilian con SQL y Python.", "La fuente, el periodo y las transformaciones están documentados.", "Puedes explicar un hallazgo y una limitación sin leer un guion."],
    phone: "Abre esta guía desde tu celular", phoneText: "Entra a la URL de tu portafolio, toca Menú y elige Guía de aprendizaje / Learning plan. Los proyectos y la hoja de vida también están en ese menú y en las tarjetas de proyecto.",
    disclaimer: "Este es un plan de estudio, no una afirmación de dominio de las herramientas. Puedes hacer estos ejercicios con los materiales oficiales; no necesitas comprar una certificación para seguir el plan.",
  },
} as const;

const links = {
  powerBi: "https://learn.microsoft.com/en-us/training/courses/dp-605t00",
  model: "https://learn.microsoft.com/en-us/training/paths/model-data-power-bi/",
  dax: "https://learn.microsoft.com/en-in/training/paths/dax-power-bi/",
  excel: "https://support.microsoft.com/en-us/excel/about-power-query-in-excel",
  sqlite: "https://www.sqlite.org/lang_select.html",
  window: "https://www.sqlite.org/windowfunctions.html",
  python: "https://docs.python.org/3/tutorial/",
  pandas: "https://pandas.pydata.org/docs/getting_started/",
};

export default function LearningRoadmap() {
  const [language, setLanguage] = useState<Language>("es");
  const t = content[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    const initial = saved === "en" || saved === "es" ? saved : navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
    setLanguage(initial);
    document.documentElement.lang = initial;
  }, []);

  function switchLanguage() {
    const next = language === "es" ? "en" : "es";
    setLanguage(next);
    document.documentElement.lang = next;
    window.localStorage.setItem("portfolio-language", next);
  }

  return <main className={styles.page}>
    <header className={styles.header}><a href="/" className={styles.back}>← {t.back}</a><a href="/" className={styles.brand}>JGB<span>.</span> <small>DATA ANALYST LEARNING PLAN</small></a><button type="button" className={styles.language} onClick={switchLanguage} aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}>{t.switch}</button></header>
    <div className={styles.wrap}>
      <section className={styles.hero}><p className={styles.eyebrow}>{t.eyebrow}</p><h1>{t.title}</h1><p className={styles.intro}>{t.intro}</p><a href="#priority" className={styles.primary}>{t.priority}<span aria-hidden="true"> ↓</span></a></section>

      <section className={styles.priority} id="priority"><div className={styles.sectionLabel}><span>01</span><span>{t.priority}</span></div><div className={styles.priorityBody}><p className={styles.eyebrow}>POWER BI · POWER QUERY · DAX</p><h2>{t.focusTitle}</h2><p>{t.focusText}</p><ol>{t.focusTasks.map((task, index) => <li key={task}><span>0{index + 1}</span>{task}</li>)}</ol><div className={styles.result}><strong>{t.result}</strong><p>{t.resultText}</p></div><div className={styles.resourceList}><h3>{t.resources}</h3><a href={links.powerBi} target="_blank" rel="noreferrer">{t.beginner} ↗</a><a href={links.model} target="_blank" rel="noreferrer">{t.model} ↗</a><a href={links.dax} target="_blank" rel="noreferrer">{t.dax} ↗</a></div></div></section>

      <section className={styles.skills}><div className={styles.sectionLabel}><span>02</span><span>{t.next}</span></div><div className={styles.skillGrid}>
        <article><p className={styles.eyebrow}>SQL · SQLITE</p><h2>{t.sqlTitle}</h2><p>{t.sqlText}</p><a href={links.sqlite} target="_blank" rel="noreferrer">{t.sqlResource} ↗</a><a href={links.window} target="_blank" rel="noreferrer">{t.sqlWindow} ↗</a></article>
        <article><p className={styles.eyebrow}>PYTHON · PANDAS</p><h2>{t.pythonTitle}</h2><p>{t.pythonText}</p><a href={links.python} target="_blank" rel="noreferrer">{t.pythonResource} ↗</a><a href={links.pandas} target="_blank" rel="noreferrer">{t.pandasResource} ↗</a></article>
        <article><p className={styles.eyebrow}>EXCEL</p><h2>{t.excelTitle}</h2><p>{t.excelText}</p><a href={links.excel} target="_blank" rel="noreferrer">{t.excel} ↗</a></article>
      </div></section>

      <section className={styles.schedule}><div className={styles.sectionLabel}><span>03</span><span>{t.schedule}</span></div><div className={styles.scheduleBody}><h2>{t.schedule}</h2><p className={styles.cadence}>{t.cadence}</p><div className={styles.weeks}>{t.weeks.map(([period, title, detail]) => <article key={period}><span>{period}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div><div className={styles.checklist}><h3>{t.checklist}</h3><ul>{t.checks.map((check) => <li key={check}>{check}</li>)}</ul></div></div></section>

      <aside className={styles.phone}><h2>{t.phone}</h2><p>{t.phoneText}</p><a href="/">{t.back} ↗</a></aside>
      <p className={styles.note}>{t.disclaimer}</p>
    </div>
  </main>;
}
