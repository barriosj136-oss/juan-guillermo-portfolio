# NovaTech synthetic analysis model

This is a small, fictional monthly performance dataset for practicing business analysis. It does not describe a real company, customer, or employer. Amounts are illustrative units; no currency is specified.

## Grain and source

`monthly_performance.csv` has one row for one month for one fictional business unit. The current demonstration contains one fictional unit and twelve months in 2025. Each row is the lowest level available; no transaction or customer-level detail exists.

## Fields

| Field | Type | Meaning | Rule |
|---|---|---|---|
| `month` | YYYY-MM text | Reporting month | Required, unique, valid calendar month. |
| `goal_target` | Integer | Planned performance target | Required, nonnegative; greater than zero for aggregate attainment. |
| `goal_actual` | Integer | Realized performance in fictional units | Required, nonnegative. |
| `budget_planned` | Integer | Planned budget in fictional units | Required, nonnegative. |
| `budget_actual` | Integer | Actual spend in fictional units | Required, nonnegative. |

The file is already aggregated monthly. It contains no account names, personal data, or employer records.

## Measures and interpretation

- Goal attainment = `SUM(goal_actual) / SUM(goal_target)`. The portfolio shows aggregate attainment; it does not average monthly percentages.
- Target gap = `goal_actual - goal_target`; positive means actual is above target.
- Budget variance = `budget_actual - budget_planned`; positive means spending is above plan.
- Month-over-month change = this month's value minus the prior month's value. January has no prior month and is blank.
- Months over budget count rows where `budget_actual > budget_planned`.

## Assumptions and limits

There is one row per month, one fictional entity, twelve observations, and no drivers explaining changes. No forecast, causal claim, recommendation about a real business, or currency conversion is supported by this file. A zero invoice amount in this separate Copilot scenario is not linked to NovaTech.

## Reproducible workflow

Run `python analyze.py` from this directory. It checks the source structure and control totals, then writes `data/monthly_summary.csv`, `data/summary.json`, and `data/monthly_trend.svg`. Run `sqlite3 novatech.db < schema.sql`, import the source CSV as described in `README.md`, then run the read-only queries in `analysis.sql`. `validate.py` provides a small wrapper for the standard-library validation run.
