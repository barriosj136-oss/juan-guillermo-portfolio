"use client";

import { useState } from "react";
import styles from "./portfolio-home.module.css";

type Language = "en" | "es";

// Same rules the reserve dashboard and Ops Studio use to read messy exports.
const SAMPLE_REGISTER = [
  { id: "DEMO-01001", unit: "Canada", status: "Open" },
  { id: "DEMO-01002", unit: "United States", status: "Review" },
  { id: "DEMO-01017", unit: "United States", status: "Waiting" },
  { id: "DEMO-01045", unit: "Canada", status: "Closed" },
  { id: "INV-2025-0310", unit: "Canada", status: "Open" },
];
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_ES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const ABBR = { en: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"] };

const refKey = (s: string) => (s.toUpperCase().match(/[A-Z]+|\d+/g) || []).map((g) => /^\d+$/.test(g) ? String(Number(g)) : g).join(" ");

function readMonth(s: string): [number, number] | null {
  let m = s.match(/^(\d{1,2})[-/.](\d{4})$/);
  if (m) return [+m[1], +m[2]];
  if ((m = s.match(/^(\d{4})-(\d{1,2})$/))) return [+m[2], +m[1]];
  if ((m = s.match(/^([a-zñ]{3,})\.?[\s\-/](?:de\s)?(\d{2}|\d{4})$/i))) {
    const word = m[1].toLowerCase().slice(0, 3);
    const i = Math.max(ABBR.en.indexOf(word), ABBR.es.indexOf(word));
    if (i >= 0) return [i + 1, +(m[2].length === 2 ? "20" + m[2] : m[2])];
  }
  return null;
}

function readAmount(raw: string): { value: number; mark: "comma" | "point" | "none" } | null {
  if (!/\d/.test(raw) || !/^[\s()+\-$€]*(?:cop|usd|cad)?\s*[\d.,\s]+\s*(?:cop|usd|cad)?\)?\s*$/i.test(raw)) return null;
  const neg = raw.includes("-") || /^\s*\(.*\)\s*$/.test(raw);
  const s = raw.replace(/[^0-9.,]/g, "");
  const lc = s.lastIndexOf(","), ld = s.lastIndexOf(".");
  const mark = lc >= 0 && ld >= 0 ? (lc > ld ? "comma" : "point")
    : lc >= 0 ? (/,\d{1,2}$/.test(s) && s.indexOf(",") === lc ? "comma" : "none")
    : ld >= 0 ? (s.indexOf(".") === ld && !/\.\d{3}$/.test(s) ? "point" : "none") : "none";
  const clean = mark === "comma" ? s.replace(/\./g, "").replace(",", ".") : mark === "point" ? s.replace(/,/g, "") : s.replace(/[.,]/g, "");
  const n = parseFloat(clean);
  return isNaN(n) ? null : { value: neg ? -n : n, mark };
}

const ui = {
  en: {
    heading: "Clean a messy value", label: "Type a reference, an amount or a month", examples: "Try these",
    kind: "Read as", ref: "Reference", amount: "Amount", month: "Month", unknown: "Not recognized",
    key: "Normalized key", match: "Sample register", exact: "exact match", normalized: "match after normalizing", partial: "partial match", none: "no match",
    value: "Value", mark: "Decimal mark", comma: "comma (es-CO export)", point: "point (en export)", plain: "none, whole number", sign: "Sign", negative: "negative (credit or reversal)", positive: "positive",
    period: "Period", hint: "Letters, numbers, spaces and punctuation are fine.",
  },
  es: {
    heading: "Limpia un valor desordenado", label: "Escribe una referencia, un monto o un mes", examples: "Prueba con",
    kind: "Se lee como", ref: "Referencia", amount: "Monto", month: "Mes", unknown: "No reconocido",
    key: "Clave normalizada", match: "Registro de muestra", exact: "coincidencia exacta", normalized: "coincide al normalizar", partial: "coincidencia parcial", none: "sin coincidencia",
    value: "Valor", mark: "Separador decimal", comma: "coma (export es-CO)", point: "punto (export en)", plain: "ninguno, número entero", sign: "Signo", negative: "negativo (crédito o reverso)", positive: "positivo",
    period: "Periodo", hint: "Sirven letras, números, espacios y signos.",
  },
};

const EXAMPLES = ["demo 1001", "1.215,60", "(2,500.00)", "Oct-26", "inv 2025 310"];

export default function ValueCleaner({ language }: { language: Language }) {
  const [value, setValue] = useState("demo 1001");
  const t = ui[language];
  const text = value.trim();
  const month = text ? readMonth(text) : null;
  const amount = !month && text ? readAmount(text) : null;
  const money = (n: number) => new Intl.NumberFormat(language === "es" ? "es-CO" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

  let rows: [string, string][] = [];
  if (month) {
    const [m, y] = month;
    rows = [[t.kind, t.month], [t.period, `${String(m).padStart(2, "0")}-${y}`], [language === "es" ? "Nombre" : "Name", `${(language === "es" ? MONTHS_ES : MONTHS_EN)[m - 1]} ${y}`]];
  } else if (amount) {
    rows = [[t.kind, t.amount], [t.value, money(Math.abs(amount.value))], [t.mark, t[amount.mark === "none" ? "plain" : amount.mark]], [t.sign, amount.value < 0 ? t.negative : t.positive]];
  } else if (text && /[a-z0-9]/i.test(text)) {
    const key = refKey(text);
    const exact = SAMPLE_REGISTER.find((r) => r.id === text);
    const norm = exact || SAMPLE_REGISTER.find((r) => refKey(r.id) === key);
    const part = norm || (key.length >= 3 ? SAMPLE_REGISTER.find((r) => refKey(r.id).includes(key)) : undefined);
    const how = exact ? t.exact : norm ? t.normalized : part ? t.partial : t.none;
    rows = [[t.kind, t.ref], [t.key, key.replace(/ /g, "-")], [t.match, part ? `${how}: ${part.id} · ${part.unit} · ${part.status}` : how]];
  } else {
    rows = [[t.kind, t.unknown]];
  }

  return <section className={styles.cleaner} id="cleaner" aria-labelledby="cleaner-title" data-reveal>
    <h2 id="cleaner-title" className={styles.cleanerHeading}>{t.heading}</h2>
    <div data-ui className={styles.cleanerUi}>
      <label className={styles.srOnly} htmlFor="cleaner-input">{t.label}</label>
      <input id="cleaner-input" className={styles.cleanerInput} value={value} onChange={(e) => setValue(e.target.value)} spellCheck={false} autoComplete="off" aria-describedby="cleaner-hint" />
      <p id="cleaner-hint" className={styles.cleanerHint}>{t.hint}</p>
      <dl className={styles.cleanerAnswer} aria-live="polite">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    </div>
    <div className={styles.cleanerExamples}><span>{t.examples}</span>{EXAMPLES.map((ex) => <button type="button" key={ex} onClick={() => setValue(ex)}>{ex}</button>)}</div>
  </section>;
}
