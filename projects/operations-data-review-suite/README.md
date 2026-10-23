# Ops Studio — fictional local demo

This standalone application recreates the general shape of the documented multi-view operations suite with synthetic records and a generic visual identity. It runs entirely in the browser and uses no external services or libraries. The interface supports English and Spanish with a language switch.

The sample business-unit values are **United States** and **Canada**, reflecting the country choices explicitly supplied by the user. All record references, quantities, budgets, dates, status assignments, and code values remain fabricated. Risk categories use generic, customizable `SAMPLE-RISK-*` labels; they do not reproduce an employer's internal codes or decision rules.

## Open

Open `index.html` directly, or run `node preview-server.mjs` from the portfolio folder and visit `http://127.0.0.1:4173/projects/operations-data-review-suite/index.html`.

## Available views

- **Dashboard NA:** select a month, view KPIs and monthly charts, download a CSV template, import a replacement sample register, and export/inspect latest activity.
- **Baseline Search:** enter up to 1,000 references, perform exact, normalized, and partial lookups, and download results or an input template.
- **RMS Listing:** filter, sort, paginate, add/edit records, import/export CSV, and publish or clear a local snapshot.
- **CSV Generator:** enter sample references, United States or Canada, a customizable generic sample risk code, and a reason; export reason, note, or combined CSV files and a template.
- **Follow-up Queue:** use an editable, generic review checklist; save local notes; print or download a note with the sample code. It contains no real-world operational instructions.
- **Knowledge Base:** search and filter generic sample notes, create/edit/remove local notes, and print an article.
- **Workspace controls:** switch between light/dark themes and reset browser-local data to the included synthetic sample.

Reference matching includes exact, normalized, and partial modes. Normalization ignores punctuation, letter case, spacing, and leading zeroes in numeric groups (for example, `DEMO-01001` and `demo 1001`).

Uploads accept CSV only and require these columns: `id,month,unit,status,target,actual,budget,spend`. Optional `risk_code` values are accepted; missing codes receive the generic sample code. Month format is `YYYY-MM`; statuses are `Open`, `Review`, `Closed`, or `Waiting`. Data is validated before it replaces the current sample. The snapshot and notes are stored in local browser storage; if browser storage is unavailable, the page falls back to the current session. Existing browser-saved demo records are migrated to the two sample country values while preserving notes and other locally saved work.

## Relationship to the supplied source documents

The documents describe a prior Apps Script and Sheets application with similar view areas, imports, exports, filters, lookups, charts, checklists and knowledge tools. This local demo implements generic equivalents using fictional data, rather than connecting to, or reproducing, company-specific rules and procedures. Source fragments did not include a complete deployable application; some backend functions or wiring were missing, and entry points/helpers conflicted across files.

No Sheets API, backend, authentication, XLSX workbook import, internal action logic, customer/company content, logo, or measured results are included. No real company records or confidential materials were copied. The records and calculated values are fabricated examples; the app does not send them to a backend.

Authorship: Juan Barrios states that he independently created the portfolio demonstration. Another person contributed the idea referenced by an earlier source footer, not the implementation. This demonstration uses synthetic data and contains no employer or customer records.
