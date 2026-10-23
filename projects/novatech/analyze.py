"""Validate, summarize, and draw a fictional NovaTech monthly dataset.

Uses Python's standard library only. All generated outputs are synthetic
demonstration materials and must not be presented as actual company results.
"""

import csv
import json
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).parent
DATA_FILE = ROOT / "data" / "monthly_performance.csv"
SUMMARY_CSV = ROOT / "data" / "monthly_summary.csv"
SUMMARY_JSON = ROOT / "data" / "summary.json"
TREND_SVG = ROOT / "data" / "monthly_trend.svg"
FIELDS = ("month", "goal_target", "goal_actual", "budget_planned", "budget_actual")
EXPECTED = {
    "row_count": 12,
    "goal_target": 1420,
    "goal_actual": 1415,
    "budget_planned": 696000,
    "budget_actual": 703000,
    "budget_variance": 7000,
    "months_over_budget": 7,
}
MONTH_LABELS = ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")


def load_and_validate():
    with DATA_FILE.open(newline="", encoding="utf-8-sig") as source:
        reader = csv.DictReader(source)
        if tuple(reader.fieldnames or ()) != FIELDS:
            raise ValueError(f"Expected columns in this order: {', '.join(FIELDS)}")
        raw_rows = list(reader)

    if len(raw_rows) != EXPECTED["row_count"]:
        raise ValueError(f"Expected {EXPECTED['row_count']} monthly rows; found {len(raw_rows)}.")

    rows = []
    seen = set()
    for line, raw in enumerate(raw_rows, start=2):
        month = (raw.get("month") or "").strip()
        try:
            parsed_month = datetime.strptime(month, "%Y-%m")
        except ValueError as error:
            raise ValueError(f"Row {line}: month must be a valid YYYY-MM date.") from error
        if parsed_month.strftime("%Y-%m") != month:
            raise ValueError(f"Row {line}: month is not in canonical YYYY-MM form.")
        if month in seen:
            raise ValueError(f"Row {line}: duplicate month {month}.")
        seen.add(month)

        row = {"month": month}
        for field in FIELDS[1:]:
            value = (raw.get(field) or "").strip()
            if not value.isdigit():
                raise ValueError(f"Row {line}: {field} must be a nonnegative whole number.")
            row[field] = int(value)
        if row["goal_target"] == 0:
            raise ValueError(f"Row {line}: goal_target must be above zero to calculate attainment.")
        rows.append(row)

    rows.sort(key=lambda row: row["month"])
    months = [row["month"] for row in rows]
    expected_months = [f"2025-{month:02d}" for month in range(1, 13)]
    if months != expected_months:
        raise ValueError("Expected one record for every month from 2025-01 through 2025-12.")
    return rows


def build_monthly_summary(rows):
    result = []
    prior = None
    for row in rows:
        item = dict(row)
        item["target_gap"] = row["goal_actual"] - row["goal_target"]
        item["attainment_pct"] = round(row["goal_actual"] / row["goal_target"] * 100, 1)
        item["budget_variance"] = row["budget_actual"] - row["budget_planned"]
        item["actual_mom_change"] = None if prior is None else row["goal_actual"] - prior["goal_actual"]
        item["spend_mom_change"] = None if prior is None else row["budget_actual"] - prior["budget_actual"]
        result.append(item)
        prior = row
    return result


def totals(rows):
    target = sum(row["goal_target"] for row in rows)
    actual = sum(row["goal_actual"] for row in rows)
    planned = sum(row["budget_planned"] for row in rows)
    spent = sum(row["budget_actual"] for row in rows)
    return {
        "month_count": len(rows),
        "goal_target_total": target,
        "goal_actual_total": actual,
        "attainment_pct": round(actual / target * 100, 1),
        "budget_planned_total": planned,
        "budget_actual_total": spent,
        "budget_variance_total": spent - planned,
        "months_over_budget": sum(row["budget_actual"] > row["budget_planned"] for row in rows),
    }


def check_control_totals(summary):
    checks = {
        "row_count": summary["month_count"],
        "goal_target": summary["goal_target_total"],
        "goal_actual": summary["goal_actual_total"],
        "budget_planned": summary["budget_planned_total"],
        "budget_actual": summary["budget_actual_total"],
        "budget_variance": summary["budget_variance_total"],
        "months_over_budget": summary["months_over_budget"],
    }
    for key, expected in EXPECTED.items():
        if checks[key] != expected:
            raise ValueError(f"Control total failed for {key}: expected {expected}, got {checks[key]}.")


def write_csv(months):
    fields = ("month", "goal_target", "goal_actual", "attainment_pct", "target_gap", "budget_planned", "budget_actual", "budget_variance", "actual_mom_change", "spend_mom_change")
    with SUMMARY_CSV.open("w", newline="", encoding="utf-8") as target:
        writer = csv.DictWriter(target, fieldnames=fields)
        writer.writeheader()
        writer.writerows(months)


def write_svg(months):
    width, height = 1040, 470
    left, right = 72, 32
    plot_width = width - left - right
    step = plot_width / len(months)
    first_top, panel_height = 104, 128
    second_top = 300
    grid = []
    bars = []
    labels = []
    for tick in (0, 50, 100, 150):
        y = first_top + panel_height - tick / 160 * panel_height
        grid.append(f'<line x1="{left}" y1="{y:.1f}" x2="{width-right}" y2="{y:.1f}" stroke="#dce4dc"/>')
        grid.append(f'<text x="{left-12}" y="{y+4:.1f}" text-anchor="end" class="axis">{tick}</text>')
    for index, row in enumerate(months):
        center = left + step * (index + 0.5)
        for value, color, offset in ((row["goal_target"], "#c7d891", -8), (row["goal_actual"], "#397560", 8)):
            bar_height = value / 160 * panel_height
            y = first_top + panel_height - bar_height
            bars.append(f'<rect x="{center+offset-5:.1f}" y="{y:.1f}" width="10" height="{bar_height:.1f}" rx="3" fill="{color}"/>')
        labels.append(f'<text x="{center:.1f}" y="{first_top+panel_height+21}" text-anchor="middle" class="axis">{MONTH_LABELS[index]}</text>')

    spend_min, spend_max = 48000, 68000
    def spend_y(value):
        return second_top + panel_height - (value - spend_min) / (spend_max - spend_min) * panel_height

    for tick in (48000, 54000, 60000, 66000):
        y = spend_y(tick)
        grid.append(f'<line x1="{left}" y1="{y:.1f}" x2="{width-right}" y2="{y:.1f}" stroke="#dce4dc"/>')
        grid.append(f'<text x="{left-12}" y="{y+4:.1f}" text-anchor="end" class="axis">{tick//1000}k</text>')
    planned_points, actual_points = [], []
    for index, row in enumerate(months):
        x = left + step * (index + 0.5)
        planned_points.append(f"{x:.1f},{spend_y(row['budget_planned']):.1f}")
        actual_points.append(f"{x:.1f},{spend_y(row['budget_actual']):.1f}")
        labels.append(f'<text x="{x:.1f}" y="{second_top+panel_height+21}" text-anchor="middle" class="axis">{MONTH_LABELS[index]}</text>')
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
<title id="title">NovaTech fictional monthly trends</title><desc id="desc">Synthetic monthly goal target and actual bars, followed by planned and actual spending lines.</desc>
<style>text{{font-family:Arial,sans-serif;fill:#263b31}}.h{{font-size:18px;font-weight:700}}.axis{{font-size:11px;fill:#64756a}}.sub{{font-size:11px;fill:#718077}}</style>
<rect width="100%" height="100%" rx="18" fill="#f7f8f4"/><text x="28" y="34" class="h">NovaTech · synthetic demonstration data</text>
<text x="{left}" y="75" class="h">Monthly goal · illustrative units</text>
<circle cx="{left+4}" cy="92" r="5" fill="#c7d891"/><text x="{left+15}" y="96" class="sub">Target</text><circle cx="{left+85}" cy="92" r="5" fill="#397560"/><text x="{left+96}" y="96" class="sub">Actual</text>
{''.join(grid[:8])}{''.join(bars)}{''.join(labels[:12])}
<text x="{left}" y="271" class="h">Monthly planned and actual spend · illustrative units</text>
<line x1="{left}" y1="287" x2="{left+18}" y2="287" stroke="#c7d891" stroke-width="3"/><text x="{left+25}" y="291" class="sub">Planned</text><line x1="{left+100}" y1="287" x2="{left+118}" y2="287" stroke="#397560" stroke-width="3"/><text x="{left+125}" y="291" class="sub">Actual spend</text>
{''.join(grid[8:])}<polyline points="{' '.join(planned_points)}" fill="none" stroke="#a2ba62" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><polyline points="{' '.join(actual_points)}" fill="none" stroke="#397560" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
{''.join(f'<circle cx="{point.split(",")[0]}" cy="{point.split(",")[1]}" r="3" fill="#397560"/>' for point in actual_points)}{''.join(labels[12:])}
<text x="28" y="452" class="sub">Fictional values only · descriptive trends; no cause or forecast implied</text></svg>'''
    TREND_SVG.write_text(svg, encoding="utf-8")


def main():
    rows = load_and_validate()
    monthly = build_monthly_summary(rows)
    summary = totals(rows)
    check_control_totals(summary)
    write_csv(monthly)
    SUMMARY_JSON.write_text(json.dumps({"summary": summary, "months": monthly}, indent=2), encoding="utf-8")
    write_svg(monthly)

    print("PASS: required columns, valid dates, unique months, and numeric fields")
    print("PASS: one row for each month from 2025-01 through 2025-12")
    print("PASS: source control totals reconcile")
    print("NovaTech — fictional demonstration data; not real company results")
    print(f"Months analyzed: {summary['month_count']}")
    print(f"Goal attainment: {summary['attainment_pct']:.1f}% (sum actual / sum target)")
    print(f"Budget variance: {summary['budget_variance_total']:,} (actual spend - planned budget)")
    print(f"Months over budget: {summary['months_over_budget']} of {summary['month_count']}")
    print(f"Generated: {SUMMARY_CSV.name}, {SUMMARY_JSON.name}, {TREND_SVG.name}")
    print("These descriptive summaries do not establish causes or forecasts.")


if __name__ == "__main__":
    main()
