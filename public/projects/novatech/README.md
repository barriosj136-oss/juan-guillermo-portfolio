# NovaTech · editable operations dashboard

This is an independent, fictional business case. It uses a generated CSV with 4,800 records so the dashboard can demonstrate invoice review, payment, recovery, outstanding balance and aging patterns without using confidential employer/customer information.

## Run it locally

From the portfolio repository root in the VS Code terminal:

```powershell
pnpm dev
```

Open `http://localhost:3000/projects/novatech`. The dashboard reads `public/data/novatech/monthly_operations.csv` when the page loads. Download/open that CSV in Excel, save it in the same location, then refresh the browser. Keep the exact header row.

To validate and summarize the edited CSV:

```powershell
python projects/novatech/analyze.py
```

If SQLite is available, load `schema.sql`, import the CSV, then run `analysis.sql` to inspect monthly trends, risk groups, window-function movement and quality checks.

## Interpretation limits

The amounts are generated examples. CAD and USD are always shown separately; recovered amounts are already part of payments. These synthetic patterns do not describe any real business, employer, account, customer, or work achievement. The script is descriptive and does not establish causes or forecasts.
