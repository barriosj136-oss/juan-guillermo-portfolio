# Public data case studies: project plan

These are source-backed project plans, not completed analyses. No values or findings are reported here. Each case becomes a portfolio project only after downloading the source data, documenting its schema and date, checking the calculations, and reconciling the Python, SQL, and dashboard outputs.

## 1. National budget execution by sector and entity

- **Dataset:** [General National Budget execution (Datos Abiertos Colombia)](https://www.datos.gov.co/Hacienda-y-Cr-dito-P-blico/Ejecuci-n-Presupuestal-del-Presupuesto-General-de-/xjxk-qhsc)
- **Publisher and available fields:** Ministry of Finance and Public Credit; the catalog lists appropriations, commitments, obligations, payments, sector, entity, and funding source. It is updated monthly. The catalog page currently reports 598 rows and 11 columns.
- **Business question:** At the published snapshot, where is the gap between current appropriation, commitments, obligations, and payments largest by sector or entity?
- **Measures to define after inspecting metadata:** commitment / appropriation; obligation / commitment; payment / obligation. Decide how to handle zero denominators, nulls, different funding situations, and the date represented by the downloaded snapshot.
- **Outputs:** documented data dictionary; Python cleaning and validation notebook; SQL summary queries using CTEs and window functions if the source has a defensible ordering or period; a Power BI report with filters by sector/entity and reconciled KPI definitions.
- **Important limit:** the catalog's listed fields do not show a month column. Do not claim a time trend from one snapshot. A trend requires comparable archived monthly snapshots and an explicit method for aligning them.

## 2. Bogotá public expenditure and investment execution

- **Dataset:** [Informe de gastos e inversiones de Bogotá D.C. (Datos Abiertos Colombia)](https://www.datos.gov.co/dataset/Informe-de-gastos-e-inversiones-Bogot-D-C-/862z-fm4s)
- **Publisher and scope:** Bogotá's District Treasury Secretariat. The catalog describes appropriation execution for operating expenses, debt service, and investment and lists downloadable files for multiple half-year and annual periods.
- **Business question:** How does reported execution differ across budget categories and reporting periods, and which categories account for the largest changes?
- **Methods:** inspect each period's dictionary first; normalize column names and category labels; verify that periods use comparable definitions; measure commitments/obligations/payments only when those fields and denominators are documented; compare like-for-like periods.
- **Outputs:** source and schema log; reproducible cleaning notebook; period-over-period SQL; a Power BI trend and composition report.
- **Important limit:** downloadable period files may differ in schema or coverage. Confirm comparability before combining them; report source and coverage dates.

## 3. Colombian labor-market indicators

- **Dataset:** [DANE GEIH 2026 microdata catalog](https://microdatos.dane.gov.co/index.php/catalog/900) and its [related documents and data dictionary](https://microdatos.dane.gov.co/index.php/catalog/900/related-materials).
- **Business question:** How do labor-market indicators such as employment or informality differ by city, sex, age group, and month in the chosen study period?
- **Methods:** read DANE's methodology and dictionary before coding; identify the survey expansion weights and eligible population; use weighted estimates where the survey design requires them; document the universe, exclusions, and definitions; compare compatible periods.
- **Outputs:** notebook with the reproducible weighted estimates; SQL tables for cleaned dimensions and measures; dashboard with city, month, and demographic filters; definitions and caveats beside each metric.
- **Important limit:** GEIH is a complex sample survey, not a simple list of independent rows. Unweighted counts cannot be presented as national population totals. Respect the DANE methodology, data dictionary, and comparability notes.

## Data-validation gate for every case

1. Save the original source file unchanged and record the download date, publisher, license, filename, and URL.
2. Inspect the data dictionary, grain, period, units, null codes, and permitted categories before choosing metrics.
3. Check row counts, unique keys, duplicate rows, missingness, valid ranges, category consistency, date coverage, and totals against the source.
4. Write metric definitions and denominator rules before making charts.
5. Reconcile the same key totals in pandas, SQL, and Power BI. Keep a small validation table in the project README.
6. Publish only results that can be reproduced from the cited public source; distinguish observation from recommendation and correlation from cause.

## Current status

Sources have been identified and their catalog descriptions reviewed. The downloadable records have **not** been ingested or analyzed in this workspace because direct access to the data API is blocked in the current environment. Therefore, this plan contains questions and methods, not findings. To begin the first complete case, download the national budget dataset as CSV from its catalog page and place the file in a project `data/raw/` folder.
