# Learning roadmap for a junior Data / BI Analyst

This sequence is designed for a beginner. Work through it using one public dataset and save each result in the portfolio repository. The goal is evidence you can show, not a long list of certificates.

## Stage 1 — Spreadsheet and data-quality basics (week 1)

**Learn:** table structure, data types, filters, sorting, conditional formulas, pivot tables, duplicate detection, missing values, date and number formats.

**Where:** Microsoft Support's Excel training and the Microsoft Learn Power BI beginner path linked below. Search for “Excel PivotTables”, “Excel tables”, and “Power Query clean data”.

**Build:** a one-page data dictionary, a quality checklist, and a pivot summary from a public CSV. Keep the original file unchanged and record every transformation.

## Stage 2 — SQL for analysis (weeks 2–3)

**Learn in order:** `SELECT` / `WHERE` / `ORDER BY`; `GROUP BY` and aggregates; `CASE`; `JOIN`; CTEs; date handling; window functions such as `LAG`, `ROW_NUMBER`, and running totals.

**Where:** [PostgreSQL's official tutorial](https://www.postgresql.org/docs/18/tutorial.html), especially joins, aggregate functions, and window functions. Practice on a local database with public data; learn explicit join keys and avoid `SELECT *` in final queries.

**Build:** queries answering three business questions, plus checks for duplicates, nulls, unmatched keys, and totals.

## Stage 3 — Python and pandas (weeks 3–4)

**Learn in order:** Python variables, lists and dictionaries, conditions, loops, functions, reading error messages; then pandas DataFrames, CSV/Excel I/O, selecting/filtering, `groupby`, `merge`, missing values, dates, and simple charts.

**Where:** the [official Python tutorial](https://docs.python.org/3/tutorial/) for language basics and [pandas getting started](https://pandas.pydata.org/docs/getting_started/) for tabular work. Use a Jupyter notebook in VS Code or another existing notebook environment; no additional data-science framework is needed for the first projects.

**Build:** a notebook that loads the public source, profiles it, applies documented cleaning rules, computes a few measures, and exports a tidy summary.

## Stage 4 — Statistics and responsible interpretation (week 4)

**Learn:** mean vs. median, percentage vs. percentage-point change, distributions, outliers, sample vs. population, uncertainty, correlation vs. causation, time-period comparability, survey weights for GEIH.

**Where:** start with the methodological notes and dictionary from the dataset publisher (DANE, MinHacienda, or Bogotá's Treasury Secretariat). For GEIH, read DANE's survey methodology and guide before calculating population-level estimates.

**Build:** add a short “what the data supports / what it does not support” section to the notebook. Never infer causes from a trend alone.

## Stage 5 — Power BI and dashboard design (weeks 5–6)

**Learn:** import and transform with Power Query; define a consistent grain; build fact and dimension tables; relationships; measures; filters; accessible chart choices; report navigation; reconcile cards and charts to query outputs.

**Where:** [Microsoft Learn's Power BI learning paths](https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-learning-path-directory), including [prepare and visualize data](https://learn.microsoft.com/training/paths/prepare-visualize-data-power-bi/) and Microsoft's guide to [star schema modeling](https://learn.microsoft.com/power-bi/guidance/star-schema).

**Build:** a report with a clear question, a few measures, one trend or comparison view, filters, source/date notes, and a QA table matching SQL/Python totals. Power BI Desktop is the local authoring tool. Check current account, licensing, and sharing options before promising a public hosted dashboard; do not use “Publish to web” for private information.

## Stage 6 — Git, documentation, and interview presentation (week 6+)

**Learn:** repository, commit, push, branch, README, `.gitignore`, and how to review a diff before committing. Keep raw public data out of Git if the file is large or the source license discourages redistribution; document its URL and retrieval steps instead.

**Where:** [GitHub Skills](https://skills.github.com/) — start with “Introduction to GitHub” and “Communicate using Markdown”. The official [Git documentation](https://git-scm.com/doc) is a reference when commands are unclear.

**Build:** one clean repository per case (or a clear project folder), a README with question/source/grain/cleaning/definitions/findings/limits, SQL files, notebook, report link or screenshots, and setup instructions. Make one small, named commit per meaningful change.

## Suggested weekly rhythm

- 4 short sessions per week, roughly 45–60 minutes each.
- Spend more time making one case reproducible than collecting course completion badges.
- After each stage, explain your work aloud in two minutes: question, data, checks, result, recommendation, limitation.
- Ask for feedback on the README and dashboard from someone who does not know the dataset.

## Skills to prioritize for this portfolio

1. Excel / Power Query data cleanup and pivot analysis.
2. SQL joins, grouped measures, CTEs, and window functions.
3. Python basics and pandas cleaning, grouping, merges, and validation.
4. Power BI modeling, basic DAX measures, and clear report layout.
5. Data definitions, quality checks, and concise business communication.
6. Git and GitHub workflow for showing reproducible work.
