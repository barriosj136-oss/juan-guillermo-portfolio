# NovaTech synthetic invoice and payment review

## Purpose and provenance

This is a fictional portfolio exercise. NovaTech, the record identifiers, risk groups and every row value are generated deterministically by `scripts/generate-novatech.mjs`. They are not facts from Iron Mountain, any employer, or any customer. The dataset has 4,800 generated records: 100 generated records per business unit per month, across January 2024–December 2025.

## Grain and fields

One row represents one synthetic invoice record for one month. There are no real account identifiers or people.

| Field | Meaning / validation |
|---|---|
| `record_id` | Unique `DEMO-` identifier generated for this exercise. |
| `month` | Invoice month, `YYYY-MM`. |
| `business_unit` | `Canada` or `United States`. |
| `currency` | `CAD` for Canada, `USD` for United States. Never add totals across currencies. |
| `risk_group` | Generic category: `Standard`, `Elevated`, or `High`; not an internal employer code. |
| `invoice_amount` | Synthetic invoice amount in the row's currency. |
| `paid_amount` | Paid portion of the invoice. |
| `recovered_amount` | Part of `paid_amount`, not an additional payment. |
| `outstanding_amount` | Must equal `invoice_amount - paid_amount`. |
| `aging_days` | Generated age in days; zero-to-low age for settled examples and positive age for open balances. |
| `status` | `Open` when outstanding is positive, otherwise `Paid`. |

## Metric definitions

- Invoiced = sum of `invoice_amount` for the selected currency and period.
- Paid = sum of `paid_amount` for the selected currency and period.
- Recovered = sum of `recovered_amount`, already included in Paid.
- Outstanding = sum of `outstanding_amount`.
- Paid / invoiced = sum of paid divided by sum of invoiced, not an average of row ratios.
- Open records = count where `status = 'Open'`.

All amounts are generated example values, not evidence of a business outcome. This dataset supports practicing data validation, joins/aggregations, filters and trends; it cannot support conclusions about a real employer or customer.

## Editing and refresh

1. Open `public/data/novatech/monthly_operations.csv` in Excel and enable editing if prompted.
2. Preserve the header row and the field order; save as CSV UTF-8 to the same filename and folder.
3. Run the site locally and reload `/projects/novatech`. The dashboard fetches this file without a browser cache and recalculates its numbers in the browser.
4. Run `python projects/novatech/analyze.py` to validate the file and produce a grouped JSON summary under `projects/novatech/data/`.
5. If an edit causes errors, the dashboard lists the invalid rows and hides the KPIs instead of presenting stale values.

On the hosted site, the file is a static asset. Replacing it locally does not update production: a repository update and a new deployment are needed.
