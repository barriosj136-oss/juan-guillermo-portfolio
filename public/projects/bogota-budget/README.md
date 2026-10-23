# Bogotá 2025 public-budget commitments

## Business question

How did cumulative budget commitments evolve across 2025, and which public entities and budget-item categories had the largest December totals?

## Official source

- Dataset: *Informe de gastos e inversiones. Bogotá D.C.*
- Publisher: Secretaría Distrital de Hacienda
- Resource: December 2025 CSV
- Resource updated: February 16, 2026 (catalog metadata)
- Retrieved: October 23, 2026
- License: CC BY 4.0
- Catalog and resource: https://datosabiertos.bogota.gov.co/dataset/informe-de-gastos-e-inversiones-bogota/resource/788d304c-eebe-461d-b35b-2faed8659c85

The official CSV and data dictionary are retained with this project. The source footer describes monthly values as cumulative commitments. They are not cash payments. Annual comparisons are omitted because compatibility across cuts has not been verified.

## Reproduce the cleaning and summary

From the repository root:

```powershell
python projects/bogota-budget/analyze.py
```

The standard-library script reads the original semicolon-delimited, Windows-1252 CSV, removes its footer, trims text, converts blank/dash amount cells to zero, parses COP thousands separators, checks 2025-12 cut and identity-key uniqueness, derives net monthly changes from cumulative figures, and reconciles those monthly changes to December. A source row with a month-to-month cumulative decrease is retained and counted for review.

Outputs are written under `projects/bogota-budget/data/`: a summary JSON, monthly trend, full entity summary, top rubric summary, and two normalized tables for SQL. No external package is needed.

## SQL model

`dim_entity.csv` contains the distinct entity labels. `fact_budget_commitment.csv` contains one entity/rubric row with 12 cumulative month columns. `schema.sql` defines the relational model and `analysis.sql` demonstrates a JOIN, CTE, monthly unpivot, window function, ranking and referential-integrity check. The dashboard and Python use the same source-file values.

## Interpretation

The analysis describes public commitments reported in Bogotá's budget system. It does not establish why commitments changed, measure realized payments, or represent the author's employer performance. Recommendations are limited to review actions supported by the descriptive numbers.
