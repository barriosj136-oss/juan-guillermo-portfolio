# NovaTech synthetic performance analysis

**Portfolio demonstration only.** NovaTech and every value in this project are fictional. The dataset is not connected to Iron Mountain or any customer. No real business outcome is claimed.

## Questions

- How did monthly actual performance compare with the target?
- Which months had actual spend above or below budget?
- How did the target, result, and spend evolve during 2025?

## Data model

The source `data/monthly_performance.csv` has one record per month for one fictional entity, with target, actual result, planned budget, and actual spend. The full field definitions, grain, formula rules, sign conventions, and limits are documented in [model.md](model.md).

## Reproduce the checks, summaries, and graphic

With Python 3 available, open PowerShell in this folder and run:

```powershell
python validate.py
```

The standard-library script checks the exact columns, valid and unique months, nonnegative integer values, expected 12-month coverage, and reconciled control totals. It then generates `data/monthly_summary.csv`, `data/summary.json`, and `data/monthly_trend.svg` from the source CSV. The portfolio's charts read the generated JSON summary, so the displayed metrics and trends use the same calculation output.

The locked demonstration control totals are 1,420 target units, 1,415 actual units, 696,000 planned budget units, 703,000 actual spend units, a 7,000-unit positive variance (actual minus planned), and 7 of 12 months over budget. Attainment is the ratio of summed actual to summed target, not the average of monthly percentages.

## SQL exercise (SQLite)

`schema.sql` defines a constrained table and `analysis.sql` contains monthly measures, aggregate calculations, month-over-month changes, and source quality checks. If the SQLite command-line utility is installed, from this directory run:

```text
sqlite3 novatech.db
.read schema.sql
.mode csv
.import --skip 1 data/monthly_performance.csv monthly_performance
.read analysis.sql
.quit
```

This imports the source CSV into a local SQLite database. The schema's primary key and `CHECK` constraints prevent duplicate months and invalid values. SQL window functions calculate month-over-month movement.

## Meaning and limitations

- Attainment = sum of actual / sum of target.
- Target gap = actual minus target; positive is above target.
- Budget variance = actual spend minus planned budget; positive is over plan.
- Month-over-month change is the current month minus the prior month; January is blank.
- One fictional entity and twelve observations cannot support causal claims, forecasting, or conclusions about real operations.
- No currency is defined for the illustrative budget units.

This project currently demonstrates CSV preparation, Python standard-library analysis, SQLite modeling and queries, trend visualization, and validation controls. Excel and Power BI versions remain future work and should only be added after the results reconcile to these source calculations.
