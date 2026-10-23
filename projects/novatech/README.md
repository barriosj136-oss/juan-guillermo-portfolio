# Strategic Performance Analytics — NovaTech

**Status: first draft.** This is a fictional business case built with synthetic data. It does not describe Iron Mountain or any real company, client, budget, or result.

## Business questions

1. How does actual monthly performance compare with the target?
2. When is actual spending above or below the planned budget?
3. How do performance and spending move over the year?

## Data

[`data/monthly_performance.csv`](data/monthly_performance.csv) contains 12 synthetic monthly records for 2025. `goal_target` and `goal_actual` are illustrative units; budget values are illustrative currency units with no specified currency. The numbers were created only to demonstrate an analysis workflow.

## Reproduce the first summary

The script uses only Python's standard library, so it needs no extra packages. From this folder, run:

```powershell
python analyze.py
```

If Windows reports that Python is unavailable, install it from the official source and reopen PowerShell; the portfolio site itself does not require Python.

The script reports total goal attainment (`sum(actual) / sum(target)`), total budget variance (`sum(actual spend) - sum(planned budget)`), and the number of months over budget. A positive budget variance means spending exceeded plan. These are descriptive summaries, not causal explanations or forecasts.

## What remains before this project is complete

- Run the script in a Python-enabled environment and verify the output.
- Add a monthly table and readable charts based on the computed data.
- Explain patterns only after checking the values and chart calculations.
- Add recommendations supported by those results.
- State limitations: synthetic values, one fictional business, no definitions for units/currency, no causal variables, and no forecast validation.
- Review the final explanation so it is easy to reproduce and defend in an interview.

Do not present the dataset or its results as actual company performance.
