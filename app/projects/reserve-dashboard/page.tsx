import type { Metadata } from "next";
import CaseStudy, { type CaseCopy } from "../case-study";

export const metadata: Metadata = {
  title: "Reserve & Rolling Dashboard | Juan Guillermo Barrios",
  description: "A bad-debt reserve workbook rebuilt as an Apps Script dashboard, validated against the workbook's control totals. Public demo with fictional data.",
  alternates: { canonical: "/projects/reserve-dashboard" },
};

const content: Record<"en" | "es", CaseCopy> = {
  en: {
    label: "APPS SCRIPT · RECONCILIATION",
    title: "Reserve & Rolling dashboard",
    summary: "A monthly bad-debt reserve workbook, rebuilt as a dashboard that reads the file, redoes the math and proves it matches before anyone sees a number.",
    tags: ["Excel logic in code", "Control totals", "SVG charts", "Fictional demo data"],
    blocks: [
      { heading: "Problem", text: "The team tracked the 360+ day bad-debt reserve in a large Excel workbook with pivots and running totals. Reading it took time, and an earlier dashboard showed a total far above the real one because it read the wrong tab." },
      { heading: "Data", text: "Two sheets: monthly 360+ balances per invoice line, and an accumulated sheet whose period headers repeat in three blocks (inflows, running total, floored). Amounts arrive in both es-CO (1.215,60) and en (1,215.60) formats." },
      { heading: "Method", list: ["Pick the tabs by name and stop to ask when more than one matches, instead of guessing.", "Net each account per month, then floor it at zero, exactly as the pivot does.", "For the accumulated view, keep a running total per account and floor it at every step.", "Read every number with a parser that detects the decimal mark value by value."] },
      { heading: "Validation", text: "Each column is compared with the workbook's own floored totals and the page says whether it matches. On the real file both views matched the control totals to the peso, and the floor explained why the monthly and accumulated figures do not simply add up." },
      { heading: "Result", text: "One screen with the reserve by month, a click-to-select chart, a table by collector and a one-step upload. The internal version runs on Google Apps Script for the team; this public copy uses 640 generated accounts." },
      { heading: "Tools", text: "Google Apps Script, JavaScript, SVG charts, SheetJS for .xlsx, Node tests for the reserve math." },
    ],
    demoTitle: "Live demo with fictional data",
    demoNote: "Accounts, collectors and amounts are generated. Download the sample CSVs from the demo's footer and load them back with Load data to watch the checks run.",
  },
  es: {
    label: "APPS SCRIPT · CONCILIACIÓN",
    title: "Dashboard de reserva y rolling",
    summary: "Un libro de Excel de reserva de cartera reconstruido como dashboard: lee el archivo, rehace las cuentas y demuestra que cuadran antes de mostrar un número.",
    tags: ["Lógica de Excel en código", "Totales de control", "Gráficos SVG", "Datos ficticios"],
    blocks: [
      { heading: "Problema", text: "El equipo seguía la reserva de cartera de más de 360 días en un libro de Excel grande con tablas dinámicas y acumulados. Leerlo tomaba tiempo, y un dashboard anterior mostraba un total muy superior al real porque leía la pestaña equivocada." },
      { heading: "Datos", text: "Dos hojas: saldos mensuales de más de 360 días por línea de factura, y una hoja acumulada cuyos encabezados de periodo se repiten en tres bloques (entradas, acumulado, piso en cero). Los montos llegan en formato es-CO (1.215,60) y en (1,215.60)." },
      { heading: "Método", list: ["Elegir las pestañas por nombre y preguntar cuando más de una coincide, en vez de adivinar.", "Neto por cuenta y mes, con piso en cero, igual que la tabla dinámica.", "En la vista acumulada, total corrido por cuenta con piso en cero en cada paso.", "Leer cada número con un parser que detecta el separador decimal valor por valor."] },
      { heading: "Validación", text: "Cada columna se compara con los totales con piso del propio libro y la página dice si cuadra. Con el archivo real ambas vistas cuadraron con los totales de control al peso, y el piso en cero explicó por qué las cifras mensual y acumulada no se suman directamente." },
      { heading: "Resultado", text: "Una pantalla con la reserva por mes, un gráfico para seleccionar el mes, una tabla por cobrador y una carga en un paso. La versión interna corre en Google Apps Script para el equipo; esta copia pública usa 640 cuentas generadas." },
      { heading: "Herramientas", text: "Google Apps Script, JavaScript, gráficos SVG, SheetJS para .xlsx y pruebas en Node para la lógica de reserva." },
    ],
    demoTitle: "Demo en vivo con datos ficticios",
    demoNote: "Cuentas, cobradores y montos son generados. Descarga los CSV de muestra desde el pie de la demo y vuelve a cargarlos con Load data para ver las verificaciones.",
  },
};

export default function Page() { return <CaseStudy content={content} demo="/reserve-dashboard/index.html" />; }
