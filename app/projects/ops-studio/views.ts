// One entry per Ops Studio view; each becomes its own case page at /projects/ops-studio/<slug>.
// `hash` is the view id the demo opens from the URL fragment (see projects/ops-studio/app.js).

type Copy = { title: string; label: string; summary: string; problem: string; features: string[]; skills: string };

export type OpsView = { slug: string; hash: string; tags: string[]; en: Copy; es: Copy };

export const opsViews: OpsView[] = [
  {
    slug: "backlog-dashboard", hash: "dashboard", tags: ["KPIs", "Charts", "CSV import"],
    en: {
      title: "Backlog Dashboard", label: "DASHBOARD NA",
      summary: "One screen that answers how big the active backlog is, how old it is, and where it sits by status, country, and code.",
      problem: "Operations teams need to see the size and age of open work before they decide what to review first. This view turns a flat register into totals, a status grid, and monthly charts.",
      features: ["Total active backlog with average age and critical items (over 90 days)", "Status grid and filter bar by period, country, status, and sample code", "Monthly target vs. actual and budget vs. spend charts", "CSV template, validated CSV upload, and latest-activity table"],
      skills: "KPI design · data validation · charting with plain JavaScript and SVG",
    },
    es: {
      title: "Dashboard de backlog", label: "DASHBOARD NA",
      summary: "Una pantalla que responde qué tan grande es el backlog activo, qué tan antiguo es y dónde está por estado, país y código.",
      problem: "Los equipos de operaciones necesitan ver el tamaño y la antigüedad del trabajo abierto antes de decidir qué revisar primero. Esta vista convierte un registro plano en totales, una cuadrícula de estados y gráficos mensuales.",
      features: ["Backlog activo total con edad promedio y casos críticos (más de 90 días)", "Cuadrícula de estados y filtros por periodo, país, estado y código de muestra", "Gráficos mensuales de meta vs. real y presupuesto vs. gasto", "Plantilla CSV, carga de CSV validada y tabla de actividad reciente"],
      skills: "Diseño de KPIs · validación de datos · gráficos con JavaScript y SVG",
    },
  },
  {
    slug: "action-plan", hash: "actionplan", tags: ["Collections", "Totals", "CSV export"],
    en: {
      title: "Action Plan Dashboard", label: "ACTION PLAN",
      summary: "A collections view with one row per customer: settlement terms, payment schedule, write-off status, and open balance together.",
      problem: "Follow-up on settlements usually means jumping between several files. This view puts each customer's agreed payments, write-off or bad-debt status, pending reserve, and open invoices in a single row.",
      features: ["KPI cards: total settlement, amount scheduled in the selected months, balance due, and write-off / reserve", "Month toggles (Sep–Dec) that recalculate scheduled payments", "Search by customer, ID, or action plan; filter by portfolio owner and settlement status", "Totals row and CSV export of the filtered table"],
      skills: "Financial data modeling · filtering and aggregation · tabular UI",
    },
    es: {
      title: "Dashboard de plan de acción", label: "ACTION PLAN",
      summary: "Una vista de cobranza con una fila por cliente: acuerdo de pago, calendario de pagos, estado de castigo y saldo abierto juntos.",
      problem: "El seguimiento de acuerdos de pago suele obligar a saltar entre varios archivos. Esta vista reúne en una sola fila los pagos acordados de cada cliente, su estado de castigo o cartera dudosa, la reserva pendiente y las facturas abiertas.",
      features: ["Tarjetas KPI: total acordado, monto programado en los meses elegidos, saldo pendiente y castigo / reserva", "Botones por mes (sep–dic) que recalculan los pagos programados", "Búsqueda por cliente, ID o plan de acción; filtros por responsable de cartera y estado del acuerdo", "Fila de totales y exportación CSV de la tabla filtrada"],
      skills: "Modelado de datos financieros · filtros y agregación · interfaz de tablas",
    },
  },
  {
    slug: "baseline-search", hash: "baseline", tags: ["Lookup", "Matching", "CSV export"],
    en: {
      title: "Baseline Search", label: "BASELINE SEARCH",
      summary: "Paste up to 1,000 references and see which ones exist, matched exactly, after normalization, or partially.",
      problem: "References arrive with different spacing, case, and leading zeros, so a plain search misses real matches. This view normalizes them and reports how each one matched.",
      features: ["Exact, normalized, and partial matching modes", "Normalization ignores punctuation, case, spacing, and leading zeros (DEMO-01001 = demo 1001)", "Results table with match type, unit, status, and month", "Input template and results export as CSV"],
      skills: "Data cleaning · string normalization · reconciliation",
    },
    es: {
      title: "Búsqueda de referencias", label: "BASELINE SEARCH",
      summary: "Pega hasta 1.000 referencias y ve cuáles existen: coincidencia exacta, normalizada o parcial.",
      problem: "Las referencias llegan con espacios, mayúsculas y ceros a la izquierda distintos, así que una búsqueda simple pierde coincidencias reales. Esta vista las normaliza e informa cómo coincidió cada una.",
      features: ["Modos de coincidencia exacta, normalizada y parcial", "La normalización ignora puntuación, mayúsculas, espacios y ceros a la izquierda (DEMO-01001 = demo 1001)", "Tabla de resultados con tipo de coincidencia, unidad, estado y mes", "Plantilla de entrada y exportación de resultados en CSV"],
      skills: "Limpieza de datos · normalización de texto · conciliación",
    },
  },
  {
    slug: "records-listing", hash: "listing", tags: ["CRUD", "Pagination", "Snapshot"],
    en: {
      title: "Records Listing", label: "RMS LISTING",
      summary: "The working register: filter, sort, page through, add, and edit records, then save a snapshot.",
      problem: "Reviewers need to correct and update records without a database. This view gives a full editable table with CSV in and out and a local snapshot to compare against.",
      features: ["Filter, sort, and paginate the register", "Add and edit records with validation", "Import and export CSV", "Publish or clear a local snapshot"],
      skills: "Data entry validation · table state management · CSV handling",
    },
    es: {
      title: "Listado de registros", label: "RMS LISTING",
      summary: "El registro de trabajo: filtra, ordena, pagina, agrega y edita registros, y guarda una foto (snapshot).",
      problem: "Quien revisa necesita corregir y actualizar registros sin una base de datos. Esta vista ofrece una tabla editable completa, con entrada y salida en CSV y un snapshot local para comparar.",
      features: ["Filtrar, ordenar y paginar el registro", "Agregar y editar registros con validación", "Importar y exportar CSV", "Publicar o borrar un snapshot local"],
      skills: "Validación de captura · manejo de estado de tablas · manejo de CSV",
    },
  },
  {
    slug: "csv-generator", hash: "generator", tags: ["Bulk upload", "Templates"],
    en: {
      title: "CSV Generator", label: "CSV GENERATOR",
      summary: "Build bulk-update files from a list of references, a country, a sample code, and a reason.",
      problem: "Bulk updates fail when files are built by hand. This view produces consistent reason, note, or combined CSV files from a few inputs.",
      features: ["Input sample references, United States or Canada, a sample risk code, and a reason", "Export reason, note, or combined CSV files", "Downloadable template"],
      skills: "Process automation · file standardization",
    },
    es: {
      title: "Generador de CSV", label: "CSV GENERATOR",
      summary: "Arma archivos de actualización masiva a partir de una lista de referencias, un país, un código de muestra y un motivo.",
      problem: "Las actualizaciones masivas fallan cuando los archivos se arman a mano. Esta vista produce archivos CSV consistentes de motivo, nota o combinados a partir de pocos datos.",
      features: ["Entrada de referencias de muestra, Estados Unidos o Canadá, un código de riesgo de muestra y un motivo", "Exportación de CSV de motivo, nota o combinado", "Plantilla descargable"],
      skills: "Automatización de procesos · estandarización de archivos",
    },
  },
  {
    slug: "follow-up-queue", hash: "followup", tags: ["Checklist", "Notes"],
    en: {
      title: "Follow-up Queue", label: "FOLLOW-UP QUEUE",
      summary: "An editable review checklist with saved notes that can be printed or downloaded.",
      problem: "Case follow-up depends on not skipping steps. This view keeps a generic checklist and notes next to each other so the review is consistent.",
      features: ["Editable, generic review checklist", "Notes saved in the browser", "Print or download a note with the sample code"],
      skills: "Process documentation · workflow design",
    },
    es: {
      title: "Cola de seguimiento", label: "FOLLOW-UP QUEUE",
      summary: "Una lista de revisión editable con notas guardadas que se pueden imprimir o descargar.",
      problem: "El seguimiento de casos depende de no saltarse pasos. Esta vista mantiene juntas una lista genérica de revisión y las notas, para que la revisión sea consistente.",
      features: ["Lista de revisión genérica y editable", "Notas guardadas en el navegador", "Imprimir o descargar una nota con el código de muestra"],
      skills: "Documentación de procesos · diseño de flujos de trabajo",
    },
  },
  {
    slug: "knowledge-base", hash: "knowledge", tags: ["Search", "Articles"],
    en: {
      title: "Knowledge Base", label: "KNOWLEDGE BASE",
      summary: "Searchable sample articles that the team can create, edit, remove, and print.",
      problem: "Answers to repeated questions get lost in chats. This view keeps short, searchable notes in one place.",
      features: ["Search and filter sample articles", "Create, edit, and remove local articles", "Print an article"],
      skills: "Knowledge management · plain-language writing",
    },
    es: {
      title: "Base de conocimiento", label: "KNOWLEDGE BASE",
      summary: "Artículos de muestra con buscador que el equipo puede crear, editar, eliminar e imprimir.",
      problem: "Las respuestas a preguntas repetidas se pierden en los chats. Esta vista guarda notas cortas y buscables en un solo lugar.",
      features: ["Buscar y filtrar artículos de muestra", "Crear, editar y eliminar artículos locales", "Imprimir un artículo"],
      skills: "Gestión del conocimiento · redacción en lenguaje claro",
    },
  },
];
