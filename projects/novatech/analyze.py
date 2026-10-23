"""Summarize the fictional NovaTech dataset using Python's standard library."""

import csv
from pathlib import Path


DATA_FILE = Path(__file__).parent / "data" / "monthly_performance.csv"


def main():
    with DATA_FILE.open(newline="", encoding="utf-8") as source:
        rows = list(csv.DictReader(source))

    if not rows:
        raise SystemExit("No data rows found.")

    target = sum(int(row["goal_target"]) for row in rows)
    actual = sum(int(row["goal_actual"]) for row in rows)
    planned = sum(int(row["budget_planned"]) for row in rows)
    spent = sum(int(row["budget_actual"]) for row in rows)
    goal_attainment = actual / target * 100
    budget_variance = spent - planned
    months_over_budget = sum(
        int(row["budget_actual"]) > int(row["budget_planned"]) for row in rows
    )

    print("NovaTech — fictional demonstration dataset; not real company results")
    print(f"Months analyzed: {len(rows)}")
    print(f"Goal attainment: {goal_attainment:.1f}% (total actual / total target)")
    print(f"Budget variance: {budget_variance:,.0f} (actual spend - planned budget)")
    print(f"Months over budget: {months_over_budget} of {len(rows)}")
    print("These descriptive summaries do not establish causes or forecasts.")


if __name__ == "__main__":
    main()
