# Reserve Dashboard — fictional demo

Public copy of a reserve dashboard built in Google Apps Script. The real version replaces a manual Excel
workbook that tracks the 360+ bad-debt reserve by month and by collector. This copy runs entirely in the
browser with **generated data**: no real accounts, people, amounts or workbook content.

- `index.html` is the dashboard page with the reserve logic (`Logic.html` in the original project) inlined.
  The Apps Script calls are unused because `demo-data.js` sets `window.DEMO_DATA` first.
- `demo-data.js` generates 640 fictional accounts across 8 collectors with a fixed seed, writes the two CSV
  layouts the loader expects (monthly 360+ lines and the accumulated sheet with its three repeated period
  blocks), and parses them with the real `processCsv()`.

What it shows:

- **General Reserve**: accumulated reserve per month, a per-account running total floored at zero at each step.
  It is checked against the sheet's own floored columns ("Matches the workbook total for this column").
- **Rolling**: new 360+ balances per month, netted per account and floored at zero.
- **By VSL** table, mixed en/es number formats, and *Load data*, which lets visitors re-upload the sample CSVs
  (downloadable from the footer) or their own files in the same layout. Uploaded files stay in the browser tab.
