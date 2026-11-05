import type { Metadata } from "next";
import CaseStudy, { type CaseCopy } from "../case-study";

export const metadata: Metadata = {
  title: "Unit economics for a small shop | Juan Guillermo Barrios",
  description: "Cost build-up, payment fees, contribution margin, break-even and test capital for a made-to-order phone-case shop. Method only.",
  alternates: { canonical: "/projects/unit-economics" },
};

const content: Record<"en" | "es", CaseCopy> = {
  en: {
    label: "EXCEL MODEL · BUSINESS CASE",
    title: "Unit economics for a small shop",
    summary: "Before launching a made-to-order phone-case shop in Bogotá, I built the spreadsheet that says how many sales a month it takes to stop losing money.",
    tags: ["Excel", "Cost model", "Break-even", "Scenarios"],
    blocks: [
      { heading: "Question", text: "At the proposed price, what does one sale really leave after costs and fees, and how many sales a month cover a fixed marketing budget?" },
      { heading: "Data", text: "Public supplier and retail prices, the payment gateway's published fees, and clearly marked estimates where no quote existed yet. Every input carries its source and how reliable it is." },
      { heading: "Method", list: ["Build the unit cost line by line: case, printing, packaging, inbound transport.", "Add a quality reserve and the payment fee, computed from its percentage, fixed charge and tax.", "Derive the contribution per unit and the contribution margin.", "Run monthly scenarios at several sales volumes to find the break-even point, and size the test capital (samples, cash buffer, first month of marketing)."] },
      { heading: "Validation", text: "Inputs that are estimates are highlighted so they can be replaced by written quotes; the model recalculates everything when they change. A second sheet records each source." },
      { heading: "Result", text: "A clear answer on the price needed for a target margin and the monthly volume needed to break even, plus a step-by-step guide so it can be updated without help. Figures stay private." },
      { heading: "Tools", text: "Excel (formulas, scenarios, input highlighting), market research from public pages." },
    ],
  },
  es: {
    label: "MODELO EN EXCEL · CASO DE NEGOCIO",
    title: "Economía unitaria de un emprendimiento",
    summary: "Antes de lanzar una tienda de forros para celular bajo pedido en Bogotá, armé la hoja que dice cuántas ventas al mes se necesitan para dejar de perder plata.",
    tags: ["Excel", "Modelo de costos", "Punto de equilibrio", "Escenarios"],
    blocks: [
      { heading: "Pregunta", text: "Al precio propuesto, ¿cuánto deja de verdad una venta después de costos y comisiones, y cuántas ventas al mes cubren un presupuesto fijo de marketing?" },
      { heading: "Datos", text: "Precios públicos de proveedores y tiendas, las tarifas publicadas de la pasarela de pago y estimaciones marcadas donde aún no había cotización. Cada dato indica su fuente y qué tan confiable es." },
      { heading: "Método", list: ["Armar el costo unitario línea por línea: carcasa, impresión, empaque, transporte de insumos.", "Sumar una reserva de calidad y la comisión de la pasarela, calculada con su porcentaje, cargo fijo e IVA.", "Calcular el aporte por unidad y el margen de contribución.", "Correr escenarios mensuales con varios volúmenes para hallar el punto de equilibrio y dimensionar el capital de prueba (muestras, colchón de caja, primer mes de marketing)."] },
      { heading: "Validación", text: "Los supuestos estimados quedan resaltados para reemplazarlos por cotizaciones escritas; el modelo recalcula todo al cambiarlos. Otra hoja registra cada fuente." },
      { heading: "Resultado", text: "Una respuesta clara sobre el precio necesario para un margen objetivo y el volumen mensual para llegar al equilibrio, más una guía paso a paso para actualizarlo sin ayuda. Las cifras son privadas." },
      { heading: "Herramientas", text: "Excel (fórmulas, escenarios, resaltado de supuestos) e investigación de mercado en páginas públicas." },
    ],
  },
};

export default function Page() { return <CaseStudy content={content} />; }
