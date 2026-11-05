import type { Metadata } from "next";
import CaseStudy, { type CaseCopy } from "../case-study";

export const metadata: Metadata = {
  title: "Lukas, a budgeting app | Juan Guillermo Barrios",
  description: "A personal budgeting PWA that reads bank statements from PDF, infers income and expenses from the running balance and never duplicates an import.",
  alternates: { canonical: "/projects/lukas" },
};

const shots = (alt: [string, string]) => [
  { src: "/shots/lukas-home.jpg", alt: alt[0], width: 375, height: 812, phone: true },
  { src: "/shots/lukas-calendar.jpg", alt: alt[1], width: 375, height: 812, phone: true },
];

const content: Record<"en" | "es", CaseCopy> = {
  en: {
    label: "PWA · DATA CLEANING",
    title: "Lukas, a budgeting app",
    summary: "A budgeting app I use every day. Its hardest part is analyst work: turning a bank statement PDF into clean, de-duplicated movements.",
    tags: ["PDF parsing", "Deduplication", "Spending analytics", "In daily use"],
    blocks: [
      { heading: "Problem", text: "Typing every expense by hand does not last. Banks hand out statements as PDFs with their own date formats, thousands separators and no clear sign for money in or out." },
      { heading: "Data", text: "Bank statement PDFs (text layer read on the device, password prompt when protected), Apple Wallet payments sent from an iOS Shortcut, and manual entries." },
      { heading: "Method", list: ["Read the PDF text on the device; nothing is uploaded.", "Normalize dates and amounts, then infer income or expense from how the running balance moves, falling back to keywords.", "Give each line a stable id so importing the same statement twice adds nothing.", "Flag look-alikes (same kind and amount within a day) unchecked for review, and never delete existing data."] },
      { heading: "Validation", text: "Automated tests with synthetic statements cover formats, protected files and duplicate imports; a review sheet shows every parsed line before anything is saved." },
      { heading: "Result", text: "Monthly envelopes that carry unspent money forward, a calendar of what each day cost, a chart of where the money goes, and accounts that sync across devices with conflict-safe writes." },
      { heading: "Tools", text: "JavaScript (no framework), pdf.js, service worker for offline use, Vercel serverless functions and Blob storage." },
    ],
    demoTitle: "Screens with sample data",
    demoNote: "Screenshots taken with a test account and invented movements.",
    images: shots(["Lukas home screen with the balance left this month and envelopes", "Lukas calendar showing what each day of October cost"]),
    links: [["Open the app", "https://bolsillos-tau.vercel.app"]],
  },
  es: {
    label: "PWA · LIMPIEZA DE DATOS",
    title: "Lukas, app de presupuesto",
    summary: "Una app de presupuesto que uso todos los días. Su parte más difícil es trabajo de analista: convertir un extracto bancario en PDF en movimientos limpios y sin duplicados.",
    tags: ["Lectura de PDF", "Deduplicación", "Análisis de gastos", "En uso diario"],
    blocks: [
      { heading: "Problema", text: "Anotar cada gasto a mano no dura. Los bancos entregan extractos en PDF con sus propios formatos de fecha, separadores de miles y sin un signo claro para entradas y salidas." },
      { heading: "Datos", text: "Extractos bancarios en PDF (se lee el texto en el dispositivo y pide clave si está protegido), pagos de Apple Wallet enviados desde un atajo de iOS y registros manuales." },
      { heading: "Método", list: ["Leer el texto del PDF en el dispositivo; no se sube nada.", "Normalizar fechas y montos, e inferir ingreso o gasto según cómo se mueve el saldo, con palabras clave como respaldo.", "Dar a cada línea un id estable para que importar el mismo extracto dos veces no agregue nada.", "Marcar como dudosos (sin seleccionar) los parecidos: mismo tipo y monto en un día; nunca borrar datos existentes."] },
      { heading: "Validación", text: "Pruebas automáticas con extractos sintéticos cubren formatos, archivos con clave e importaciones repetidas; una hoja de revisión muestra cada línea antes de guardar." },
      { heading: "Resultado", text: "Bolsillos mensuales que guardan lo no gastado, un calendario de cuánto costó cada día, un gráfico de en qué se va la plata y cuentas que se sincronizan entre dispositivos sin perder datos." },
      { heading: "Herramientas", text: "JavaScript (sin framework), pdf.js, service worker para uso sin internet, funciones serverless y Blob de Vercel." },
    ],
    demoTitle: "Pantallas con datos de ejemplo",
    demoNote: "Capturas tomadas con una cuenta de prueba y movimientos inventados.",
    images: shots(["Pantalla de inicio de Lukas con lo que queda del mes y los bolsillos", "Calendario de Lukas con lo que costó cada día de octubre"]),
    links: [["Abrir la app", "https://bolsillos-tau.vercel.app"]],
  },
};

export default function Page() { return <CaseStudy content={content} />; }
