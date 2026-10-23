"use client";

import { useState } from "react";
import styles from "./decision-copilot.module.css";

type Language = "en" | "es";

const copy = {
  en: {
    back: "Back to portfolio", label: "BROWSER-BASED RULE-DRIVEN PROTOTYPE", title: "Operations Decision Copilot",
    lead: "A small case-review tool for separating recorded facts from unanswered questions before a person chooses the next step.",
    warning: "Practice with fictional examples only. This prototype does not send or save the text you enter.",
    caseLabel: "Fictional case summary", caseHint: "Describe the request without names, account numbers, or private details.", factsLabel: "Confirmed facts", factsHint: "One item per line. Include only information already checked.", questionsLabel: "Open questions", questionsHint: "One item per line. Write what still needs verification.", generate: "Prepare review note", clear: "Clear fields", outputTitle: "Review note", facts: "Confirmed facts", questions: "Open questions", checks: "Checks before a decision", next: "Suggested next step",
    checksText: ["Compare the invoice, payment, and account-status records for the same period.", "Resolve mismatches or missing evidence with the team that owns the source record.", "Record what was checked and keep assumptions separate from confirmed facts."],
    nextText: "Send the verified case summary to the authorized owner for review. This prototype does not approve account changes or determine service restoration.",
    empty: "Add a case summary, facts, or questions to prepare a structured note.", tools: "Next.js · React · TypeScript", local: "No AI model, employer system, API, or backend is connected.", toggle: "ES",
  },
  es: {
    back: "Volver al portafolio", label: "PROTOTIPO EN EL NAVEGADOR BASADO EN REGLAS", title: "Operations Decision Copilot",
    lead: "Herramienta breve para separar hechos registrados de preguntas pendientes antes de que una persona elija el siguiente paso.",
    warning: "Practica solo con ejemplos ficticios. Este prototipo no envía ni guarda el texto que escribes.",
    caseLabel: "Resumen del caso ficticio", caseHint: "Describe la solicitud sin nombres, números de cuenta ni información privada.", factsLabel: "Hechos confirmados", factsHint: "Un punto por línea. Incluye solo información ya verificada.", questionsLabel: "Preguntas abiertas", questionsHint: "Un punto por línea. Escribe qué falta verificar.", generate: "Preparar nota de revisión", clear: "Limpiar campos", outputTitle: "Nota de revisión", facts: "Hechos confirmados", questions: "Preguntas abiertas", checks: "Verificaciones antes de decidir", next: "Siguiente paso sugerido",
    checksText: ["Compara la factura, el pago y el estado de la cuenta para el mismo periodo.", "Aclara diferencias o evidencia faltante con el equipo responsable del registro fuente.", "Documenta qué se verificó y separa las suposiciones de los hechos confirmados."],
    nextText: "Envía el resumen verificado al responsable autorizado para revisión. Este prototipo no aprueba cambios de cuenta ni determina la restauración del servicio.",
    empty: "Agrega el resumen, hechos o preguntas del caso para preparar una nota estructurada.", tools: "Next.js · React · TypeScript", local: "No hay un modelo de IA, sistema de empleador, API ni backend conectado.", toggle: "EN",
  },
} as const;

function lines(value: string) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

export default function DecisionCopilot() {
  const [language, setLanguage] = useState<Language>("en");
  const [summary, setSummary] = useState("");
  const [confirmedFacts, setConfirmedFacts] = useState("");
  const [openQuestions, setOpenQuestions] = useState("");
  const [showNote, setShowNote] = useState(false);
  const t = copy[language];
  const facts = lines(confirmedFacts);
  const questions = lines(openQuestions);
  const hasInput = summary.trim() || facts.length || questions.length;

  function clear() {
    setSummary("");
    setConfirmedFacts("");
    setOpenQuestions("");
    setShowNote(false);
  }

  return <main className={styles.page}>
    <header className={styles.header}>
      <a href="/">← {t.back}</a>
      <span>OPERATIONS / CASE REVIEW</span>
      <button type="button" onClick={() => setLanguage(language === "en" ? "es" : "en")}>{t.toggle}</button>
    </header>
    <section className={styles.hero}>
      <p>{t.label}</p>
      <h1>{t.title}</h1>
      <div className={styles.heroGrid}><p>{t.lead}</p><aside>{t.warning}</aside></div>
    </section>
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={(event) => { event.preventDefault(); setShowNote(true); }}>
        <label>{t.caseLabel}<span>{t.caseHint}</span><textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={4}/></label>
        <label>{t.factsLabel}<span>{t.factsHint}</span><textarea value={confirmedFacts} onChange={(event) => setConfirmedFacts(event.target.value)} rows={5}/></label>
        <label>{t.questionsLabel}<span>{t.questionsHint}</span><textarea value={openQuestions} onChange={(event) => setOpenQuestions(event.target.value)} rows={5}/></label>
        <div className={styles.actions}><button type="submit">{t.generate} <span aria-hidden="true">↗</span></button><button type="button" onClick={clear}>{t.clear}</button></div>
      </form>
      <section className={styles.output} aria-live="polite" aria-labelledby="review-title">
        <p className={styles.outputLabel}>{t.label}</p><h2 id="review-title">{t.outputTitle}</h2>
        {!showNote || !hasInput ? <p className={styles.empty}>{t.empty}</p> : <>
          {summary.trim() ? <p className={styles.summary}>{summary.trim()}</p> : null}
          <h3>{t.facts}</h3>{facts.length ? <ul>{facts.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul> : <p className={styles.empty}>—</p>}
          <h3>{t.questions}</h3>{questions.length ? <ul>{questions.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul> : <p className={styles.empty}>—</p>}
          <h3>{t.checks}</h3><ol>{t.checksText.map((item) => <li key={item}>{item}</li>)}</ol>
          <h3>{t.next}</h3><p>{t.nextText}</p>
        </>}
      </section>
    </div>
    <footer className={styles.footer}><span>{t.tools}</span><span>{t.local}</span></footer>
  </main>;
}
