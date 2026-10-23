# Bogotá public-budget commitment review

## Source and scope

Source: Secretaría Distrital de Hacienda, *Informe de gastos e inversiones. Bogotá D.C.*, December 2025 CSV. It is published by Datos Abiertos Bogotá under Creative Commons Attribution 4.0. Downloaded 2026-10-23. The source describes passive budget execution and the final row identifies the measure as cumulative monthly commitments from Bogotá's Bogdata system.

This analysis covers one annual reporting cut and its Jan–Dec cumulative columns. It does not compare different annual files, whose definitions and schemas have not been reconciled. Values are Colombian pesos (COP).

## Grain and cleaning

Source grain: reporting year/cut, entity type, entity code, entity name (including unit suffix where present), budget item code, and budget item description. The data has 7,681 detail rows. The one source footer row is excluded from detail records. Blank and dash amounts are interpreted as zero. Dots are treated as thousands separators; values are whole COP. A complete six-field identity key must be unique.

The cleaned SQL model uses `dim_entity.csv` (entity type/code/name and deterministic key) and `fact_budget_commitment.csv` (entity key, budget item and cumulative COP by month). Monthly net change is calculated as each cumulative total minus the preceding month's cumulative total. Negative changes are retained as source adjustments/reversals; they are not treated as errors or removed.

## Measures

- Cumulative commitments by month = sum of the cumulative source value for that month.
- Net monthly change = current month's aggregate cumulative commitments minus the prior month's aggregate cumulative commitments. January uses its January cumulative value.
- Entity or budget item ranking = December cumulative commitments, using the same COP unit.
- All record checks are performed before summaries are written. A control total requires the sum of the twelve monthly net changes to equal the December cumulative value.

These are commitments in budget execution, not paid cash outflows, invoices, recovery or a measure of personal performance.
