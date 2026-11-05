import type { Metadata } from "next";
import CaseStudy, { type CaseCopy } from "../case-study";
import { opsViews } from "./views";

export const metadata: Metadata = {
  title: "Ops Studio | Juan Guillermo Barrios",
  description: "A seven-view collections workspace: backlog dashboard, action plan, reference search, register, CSV generator, follow-up queue and knowledge base. Fictional data.",
  alternates: { canonical: "/projects/ops-studio" },
};

const views = (lang: "en" | "es") => opsViews.map((v) => [v[lang].title, `/projects/ops-studio/${v.slug}`] as [string, string]);

const content: Record<"en" | "es", CaseCopy> = {
  en: {
    label: "COLLECTIONS WORKSPACE · 7 VIEWS",
    title: "Ops Studio",
    summary: "The public replica of a multi-tab tool I built for a collections team: the files they check every day, joined, cleaned and kept fresh in one place.",
    tags: ["Data joins", "Key normalization", "Freshness checks", "Fictional data"],
    blocks: [
      { heading: "Problem", text: "A collections team worked across several spreadsheets and exports: a baseline of accounts, a settlement hub, open items and case exports. Looking one account up meant opening four files." },
      { heading: "Data", text: "Exports of up to hundreds of thousands of rows, read in the browser in chunks and filtered to the accounts that matter; account keys arrive with invisible characters, trailing “.0” and scientific notation." },
      { heading: "Method", list: ["Normalize account keys before any join, so the same account always matches.", "Join the settlement hub with the baseline to show payments, write-offs and open balance per customer.", "Upload in blocks that update or add rows and never duplicate them.", "Track when each source was last loaded and show stale ones in red."] },
      { heading: "Validation", text: "A smoke test opens every tab in light and dark mode and fails on script errors, stuck loaders or overflowing layouts; uploads are checked for duplicates before writing." },
      { heading: "Result", text: "Seven views, each explained on its own page below, running with generated records so anyone can try them." },
      { heading: "Tools", text: "Google Apps Script, JavaScript, SheetJS, Chart.js, Puppeteer for smoke tests." },
    ],
    demoTitle: "Live demo with fictional data",
    links: views("en"),
  },
  es: {
    label: "ESPACIO DE COBRANZA · 7 VISTAS",
    title: "Ops Studio",
    summary: "La réplica pública de una herramienta de varias pestañas que construí para un equipo de cobranza: los archivos que revisan a diario, unidos, limpios y al día en un solo lugar.",
    tags: ["Cruces de datos", "Normalización de llaves", "Frescura de datos", "Datos ficticios"],
    blocks: [
      { heading: "Problema", text: "Un equipo de cobranza trabajaba entre varias hojas y exportes: una base de cuentas, un registro de acuerdos, partidas abiertas y exportes de casos. Buscar una cuenta implicaba abrir cuatro archivos." },
      { heading: "Datos", text: "Exportes de hasta cientos de miles de filas, leídos en el navegador por partes y filtrados a las cuentas relevantes; las llaves llegan con caracteres invisibles, “.0” al final y notación científica." },
      { heading: "Método", list: ["Normalizar las llaves de cuenta antes de cualquier cruce, para que la misma cuenta siempre coincida.", "Cruzar el registro de acuerdos con la base para mostrar pagos, castigos y saldo abierto por cliente.", "Cargar por bloques que actualizan o agregan filas sin duplicarlas.", "Registrar cuándo se cargó cada fuente y marcar en rojo las desactualizadas."] },
      { heading: "Validación", text: "Una prueba automática abre cada pestaña en modo claro y oscuro y falla si hay errores, cargas trabadas o desbordes; las cargas se revisan contra duplicados antes de escribir." },
      { heading: "Resultado", text: "Siete vistas, cada una explicada en su propia página abajo, con registros generados para que cualquiera las pruebe." },
      { heading: "Herramientas", text: "Google Apps Script, JavaScript, SheetJS, Chart.js y Puppeteer para pruebas." },
    ],
    demoTitle: "Demo en vivo con datos ficticios",
    links: views("es"),
  },
};

export default function Page() { return <CaseStudy content={content} demo="/ops-studio/index.html#dashboard" />; }
