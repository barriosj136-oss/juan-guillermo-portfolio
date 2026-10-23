"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Row = { record_id: string; month: string; business_unit: string; currency: string; risk_group: string; invoice_amount: number; paid_amount: number; recovered_amount: number; outstanding_amount: number; aging_days: number; status: string };
const columns = ["record_id", "month", "business_unit", "currency", "risk_group", "invoice_amount", "paid_amount", "recovered_amount", "outstanding_amount", "aging_days", "status"] as const;
const unitCurrency: Record<string, string> = { Canada: "CAD", "United States": "USD" };
const labels = {
  en: { back: "Portfolio", tag: "GENERATED PRACTICE DATA", title: "NovaTech monthly performance (12 months)", lead: "Review invoice, payment, recovery, and outstanding-balance patterns over a selected year. The editable CSV contains 4,800 generated records for 2024–2025.", edit: "Edit the CSV in Excel, save it in the same folder, then reload this page.", unit: "Business unit", year: "Year · 12-month view", loading: "Loading CSV…", errorTitle: "The dashboard could not validate this CSV", rows: "records", invoice: "Invoiced", paid: "Paid", recovered: "Recovered (included in paid)", outstanding: "Outstanding", collection: "Paid / invoiced", trend: "Monthly invoice and outstanding balance", groups: "Balance by risk group", month: "Month", open: "Open records", check: "Data checks", ok: "All row checks passed", issues: "row(s) need correction", download: "Download editable CSV", source: "CSV source", model: "Data model & refresh guide", sql: "SQL queries", python: "Python validation", local: "This dashboard processes the CSV in your browser. Changes to the local CSV appear after reload.", rule: "Recovered amounts are included in paid. Views are filtered to one business unit and currency at a time; CAD and USD are never combined.", proof: "NovaTech, identifiers, and all amounts are fictional generated examples. They are not records or results from an employer or customer." },
  es: { back: "Portafolio", tag: "DATOS GENERADOS PARA PRÁCTICA", title: "NovaTech monthly performance (12 months)", lead: "Revisa facturación, pagos, recuperaciones y saldos pendientes en el año seleccionado. El CSV editable contiene 4.800 registros generados para 2024–2025.", edit: "Edita el CSV en Excel, guárdalo en la misma carpeta y recarga esta página.", unit: "Unidad de negocio", year: "Año · vista de 12 meses", loading: "Cargando CSV…", errorTitle: "El dashboard no pudo validar este CSV", rows: "registros", invoice: "Facturado", paid: "Pagado", recovered: "Recuperado (incluido en pagos)", outstanding: "Pendiente", collection: "Pagado / facturado", trend: "Facturación y saldo pendiente por mes", groups: "Saldo por grupo de riesgo", month: "Mes", open: "Registros abiertos", check: "Validaciones de datos", ok: "Todas las filas pasaron las validaciones", issues: "fila(s) requieren corrección", download: "Descargar CSV editable", source: "CSV fuente", model: "Modelo y guía de actualización", sql: "Consultas SQL", python: "Validación Python", local: "El dashboard procesa el CSV en el navegador. Los cambios al CSV local aparecen al recargar.", rule: "Los valores recuperados están incluidos en lo pagado. Cada vista filtra una unidad de negocio y una moneda; CAD y USD nunca se suman.", proof: "NovaTech, los identificadores y todos los montos son ejemplos ficticios generados. No son registros ni resultados de empleadores o clientes." },
};

function parseCsv(text: string): { rows: Row[]; errors: string[] } {
  const lines = text.replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  if (lines.length < 2) throw new Error("CSV is empty.");
  const header = lines[0].split(",").map(value => value.trim());
  if (header.length !== columns.length || columns.some((value, index) => header[index] !== value)) throw new Error(`Columns must be: ${columns.join(", ")}`);
  const seen = new Set<string>();
  const errors: string[] = [];
  const rows: Row[] = [];
  for (let index = 1; index < lines.length; index += 1) {
    const parts = lines[index].split(",");
    const rowNumber = index + 1;
    if (parts.length !== columns.length) { errors.push(`Row ${rowNumber}: expected ${columns.length} columns.`); continue; }
    const [record_id, month, business_unit, currency, risk_group, ...rest] = parts.map(value => value.trim());
    const [invoice_amount, paid_amount, recovered_amount, outstanding_amount, aging_days] = rest.slice(0, 5).map(Number);
    const status = rest[5];
    const issue = !record_id || seen.has(record_id) ? "missing or duplicate record_id" : !/^\d{4}-(0[1-9]|1[0-2])$/.test(month) ? "invalid month" : unitCurrency[business_unit] !== currency ? "unit/currency mismatch" : !["Standard", "Elevated", "High"].includes(risk_group) ? "invalid risk_group" : ![invoice_amount, paid_amount, recovered_amount, outstanding_amount, aging_days].every(value => Number.isSafeInteger(value) && value >= 0) ? "amounts and aging must be nonnegative whole numbers" : paid_amount + outstanding_amount !== invoice_amount ? "paid + outstanding does not equal invoice" : recovered_amount > paid_amount ? "recovered exceeds paid" : status !== (outstanding_amount ? "Open" : "Paid") ? "status disagrees with balance" : "";
    if (issue) { errors.push(`Row ${rowNumber}: ${issue}.`); continue; }
    seen.add(record_id);
    rows.push({ record_id, month, business_unit, currency, risk_group, invoice_amount, paid_amount, recovered_amount, outstanding_amount, aging_days, status });
  }
  return { rows, errors };
}

const money = (value: number, currency: string, language: "en" | "es") => new Intl.NumberFormat(language === "es" ? "es-CO" : "en-CA", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);

export default function NovaTechCase() {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [unit, setUnit] = useState("Canada");
  const [year, setYear] = useState("2025");
  const [rows, setRows] = useState<Row[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const t = labels[language];
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/data/novatech/monthly_operations.csv?refresh=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Could not read the CSV (${response.status}).`);
      const result = parseCsv(await response.text());
      setRows(result.rows); setErrors(result.errors); setLoadError("");
    } catch (error) { setRows([]); setErrors([]); setLoadError(error instanceof Error ? error.message : "CSV error"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  const availableUnits = useMemo(() => Array.from(new Set(rows.map(row => row.business_unit))), [rows]);
  const availableYears = useMemo(() => Array.from(new Set(rows.map(row => row.month.slice(0, 4)))).sort(), [rows]);
  useEffect(() => { if (!availableUnits.includes(unit) && availableUnits.length) setUnit(availableUnits[0]); }, [availableUnits, unit]);
  useEffect(() => { if (!availableYears.includes(year) && availableYears.length) setYear(availableYears.includes("2025") ? "2025" : availableYears.at(-1)!); }, [availableYears, year]);
  const selected = useMemo(() => rows.filter(row => row.business_unit === unit && row.month.startsWith(`${year}-`)), [rows, unit, year]);
  const currency = selected[0]?.currency ?? "CAD";
  const summary = useMemo(() => selected.reduce((result, row) => ({ invoices: result.invoices + row.invoice_amount, paid: result.paid + row.paid_amount, recovered: result.recovered + row.recovered_amount, outstanding: result.outstanding + row.outstanding_amount, open: result.open + Number(row.status === "Open") }), { invoices: 0, paid: 0, recovered: 0, outstanding: 0, open: 0 }), [selected]);
  const months = useMemo(() => { const output = new Map<string, { invoice: number; outstanding: number }>(); for (const row of selected) { const value = output.get(row.month) ?? { invoice: 0, outstanding: 0 }; value.invoice += row.invoice_amount; value.outstanding += row.outstanding_amount; output.set(row.month, value); } return Array.from(output, ([month, values]) => ({ month, ...values })).sort((a, b) => a.month.localeCompare(b.month)); }, [selected]);
  const risks = useMemo(() => { const output = new Map<string, number>(); for (const row of selected) output.set(row.risk_group, (output.get(row.risk_group) ?? 0) + row.outstanding_amount); return Array.from(output, ([risk, balance]) => ({ risk, balance })); }, [selected]);
  const maxMonth = Math.max(1, ...months.map(item => item.invoice));
  const maxRisk = Math.max(1, ...risks.map(item => item.balance));
  const monthName = (value: string) => new Date(`${value}-01T00:00:00Z`).toLocaleDateString(language === "es" ? "es-CO" : "en-US", { month: "short", year: "2-digit", timeZone: "UTC" });
  return <main className="case-page">
    <header className="case-header"><a href="/">← {t.back}</a><p>NOVATECH · CSV DASHBOARD</p><button className="language-switch" onClick={() => setLanguage(language === "en" ? "es" : "en")}>EN | ES</button></header>
    <section className="case-intro"><p className="eyebrow">{t.tag}</p><h1>{t.title}</h1><p>{t.lead}</p><p className="synthetic-proof">{t.proof}</p><div className="case-tags">{["4,800 generated rows", "2024–2025", "CSV · Python · SQLite"].map(value => <span key={value}>{value}</span>)}</div><p className="edit-instruction">{t.edit}</p></section>
    <section className="live-dashboard"><div className="dashboard-toolbar"><label>{t.year}<select value={year} onChange={event => setYear(event.target.value)}>{availableYears.map(value => <option key={value} value={value}>{value}</option>)}</select></label><label>{t.unit}<select value={unit} onChange={event => setUnit(event.target.value)}>{availableUnits.map(value => <option key={value} value={value}>{value} · {unitCurrency[value]}</option>)}</select></label><button type="button" onClick={() => void load()}>{language === "es" ? "Actualizar datos" : "Reload CSV"}</button></div>
      {loading ? <p role="status" className="csv-state">{t.loading}</p> : loadError || errors.length ? <div role="alert" className="csv-error"><h2>{t.errorTitle}</h2><p>{loadError || `${errors.length} ${t.issues}.`}</p><ul>{errors.slice(0, 8).map((error, index) => <li key={`${error}-${index}`}>{error}</li>)}</ul></div> : <>
        <p className="data-check" role="status">{t.ok} · {selected.length.toLocaleString()} {t.rows}</p>
        <div className="nova-metrics"><article><span>{t.invoice}</span><strong>{money(summary.invoices, currency, language)}</strong><small>{selected.length.toLocaleString()} {t.rows} · {currency}</small></article><article><span>{t.paid}</span><strong>{money(summary.paid, currency, language)}</strong><small>{summary.open.toLocaleString()} {t.open}</small></article><article><span>{t.recovered}</span><strong>{money(summary.recovered, currency, language)}</strong><small>{t.rule}</small></article><article><span>{t.outstanding}</span><strong>{money(summary.outstanding, currency, language)}</strong><small>{t.collection}: {summary.invoices ? (summary.paid / summary.invoices * 100).toFixed(1) : "0.0"}%</small></article></div>
        <section className="month-chart"><div className="demo-frame-heading"><div><p className="eyebrow">{t.month}</p><h2>{t.trend}</h2></div><div className="chart-legend"><span><i className="actual-dot"/> {t.invoice}</span><span><i className="target-dot"/> {t.outstanding}</span></div></div><div className="live-bars">{months.map(item => <div className="live-bar-month" key={item.month} title={`${item.month} · ${t.invoice}: ${money(item.invoice, currency, language)} · ${t.outstanding}: ${money(item.outstanding, currency, language)}`}><div className="live-bar-pair"><i style={{ height: `${item.invoice / maxMonth * 100}%` }}/><b style={{ height: `${item.outstanding / maxMonth * 100}%` }}/></div><small>{monthName(item.month)}</small></div>)}</div></section>
        <section className="month-chart"><div className="demo-frame-heading"><div><p className="eyebrow">{t.check}</p><h2>{t.groups}</h2></div></div><div className="risk-bars">{risks.map(item => <div key={item.risk}><span>{item.risk}</span><div><i style={{ width: `${item.balance / maxRisk * 100}%` }}/></div><strong>{money(item.balance, currency, language)}</strong></div>)}</div></section>
      </>}
    </section>
    <section className="csv-download"><div><h2>{t.check}</h2><p>{t.rule} {t.local}</p></div><a className="button-primary" href="/data/novatech/monthly_operations.csv" download>{t.download}</a></section>
    <section className="project-artifacts" aria-label={t.source}>{[[t.source,"/data/novatech/monthly_operations.csv"],[t.model,"/projects/novatech/model.md"],[t.sql,"/projects/novatech/analysis.sql"],[t.python,"/projects/novatech/analyze.py"]].map(([label, href]) => <a key={href} href={href} download>{label} ↗</a>)}</section>
    <footer className="case-footer"><a href="/">{language === "es" ? "Volver al portafolio" : "Back to portfolio"}</a><span>NovaTech · {t.tag}</span></footer>
  </main>;
}
