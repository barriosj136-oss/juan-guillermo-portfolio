"""Clean and summarize Bogotá's public 2025 cumulative budget-commitment CSV."""

import csv
import json
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).parent
SOURCE = ROOT.parent.parent / "public" / "data" / "bogota" / "source_2025-12.csv"
OUT = ROOT / "data"
MONTHS = ("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")
EXPECTED_HEADERS = ("Vigencia", "Tipo de entidad ", "Codigo Entidad", "Nombre de la Entidad", "Código Rubro", "Descripción Rubro ", *MONTHS)


def amount(value, row_number, field):
    value = value.strip().replace(" ", "")
    if not value or value == "-":
        return 0
    if not all(char.isdigit() or char in ".,-" for char in value):
        raise ValueError(f"Row {row_number}, {field}: unsupported amount {value!r}")
    # This source uses periods as thousands separators and stores whole COP.
    normalized = value.replace(".", "").replace(",", "")
    result = int(normalized)
    if result < 0:
        raise ValueError(f"Row {row_number}, {field}: negative source value.")
    return result


def load_source():
    with SOURCE.open(encoding="cp1252", newline="") as source:
        reader = csv.reader(source, delimiter=";")
        headers = next(reader)
        if tuple(headers) != EXPECTED_HEADERS:
            raise ValueError(f"Unexpected source schema: {headers!r}")
        rows = []
        keys = set()
        footer_count = 0
        for line, fields in enumerate(reader, 2):
            if len(fields) < 18 or not fields[2].strip().isdigit():
                footer_count += 1
                continue
            if fields[0].strip() != "2025-12":
                raise ValueError(f"Row {line}: unexpected reporting cut {fields[0]!r}.")
            identity = tuple(value.strip() for value in fields[:6])
            if identity in keys:
                raise ValueError(f"Row {line}: duplicate complete entity/rubric key {identity!r}.")
            keys.add(identity)
            row = {"period": identity[0], "entity_type": identity[1], "entity_code": identity[2], "entity_name": identity[3], "rubric_code": identity[4], "rubric_name": identity[5]}
            values = [amount(fields[index + 6], line, MONTHS[index]) for index in range(12)]
            row["cumulative"] = values
            row["monthly_net"] = [values[0], *[values[index] - values[index - 1] for index in range(1, 12)]]
            rows.append(row)
    if not rows:
        raise ValueError("No detail rows were found.")
    return rows, footer_count


def build(rows, footer_count):
    monthly = []
    for index, month in enumerate(MONTHS):
        cumulative = sum(row["cumulative"][index] for row in rows)
        net = sum(row["monthly_net"][index] for row in rows)
        monthly.append({"month_number": index + 1, "month": month, "cumulative_commitments_cop": cumulative, "net_monthly_change_cop": net})

    entities = defaultdict(lambda: {"entity_type": "", "entity_code": "", "entity_name": "", "december_commitments_cop": 0})
    rubrics = defaultdict(lambda: {"rubric_code": "", "rubric_name": "", "december_commitments_cop": 0})
    for row in rows:
        key = (row["entity_type"], row["entity_code"], row["entity_name"])
        entity = entities[key]
        entity.update(entity_type=row["entity_type"], entity_code=row["entity_code"], entity_name=row["entity_name"])
        entity["december_commitments_cop"] += row["cumulative"][11]
        rubric = rubrics[row["rubric_code"]]
        rubric.update(rubric_code=row["rubric_code"], rubric_name=row["rubric_name"])
        rubric["december_commitments_cop"] += row["cumulative"][11]
    entity_rows = sorted(entities.values(), key=lambda row: row["december_commitments_cop"], reverse=True)
    rubric_rows = sorted(rubrics.values(), key=lambda row: row["december_commitments_cop"], reverse=True)
    entity_keys = {key: index + 1 for index, key in enumerate(sorted(entities))}
    for row in rows:
        row["entity_key"] = entity_keys[(row["entity_type"], row["entity_code"], row["entity_name"])]
    entity_dimension = [{"entity_key": entity_keys[key], "entity_type": key[0], "entity_code": key[1], "entity_name": key[2]} for key in sorted(entities)]
    fact_rows = [{"entity_key": row["entity_key"], "rubric_code": row["rubric_code"], "rubric_name": row["rubric_name"], **{f"cumulative_{index + 1:02d}": value for index, value in enumerate(row["cumulative"])}} for row in rows]

    decreases = sum(any(row["monthly_net"][index] < 0 for index in range(1, 12)) for row in rows)
    totals = {
        "source_rows": len(rows), "entities": len(entities), "rubrics": len(rubrics),
        "footer_rows_skipped": footer_count, "cumulative_december_cop": monthly[-1]["cumulative_commitments_cop"],
        "net_commitments_during_2025_cop": sum(item["net_monthly_change_cop"] for item in monthly),
        "rows_with_at_least_one_cumulative_decrease": decreases,
        "largest_entity_december": entity_rows[0], "largest_rubric_december": rubric_rows[0],
    }
    return {"source": {"publisher": "Secretaría Distrital de Hacienda - Secretaría de Hacienda de Bogotá D.C.", "dataset": "Informe de gastos e inversiones. Bogotá D.C.", "resource": "Informe de Gastos e Inversiones.Bogota.D.C.2025-12.csv", "period": "2025-12", "downloaded_on": "2026-10-23", "license": "Creative Commons Attribution 4.0", "url": "https://datosabiertos.bogota.gov.co/dataset/informe-de-gastos-e-inversiones-bogota/resource/788d304c-eebe-461d-b35b-2faed8659c85"}, "units": "COP", "measure_note": "Monthly source columns are cumulative commitments through each month. Net monthly change is calculated as current cumulative commitments minus the prior month's cumulative value; a negative change can reflect adjustments/reversals.", "totals": totals, "months": monthly, "top_entities": entity_rows[:10], "entities": entity_rows, "top_rubrics": rubric_rows[:10]}, entity_dimension, fact_rows


def write_csv(path, rows, fields):
    with path.open("w", newline="", encoding="utf-8-sig") as target:
        writer = csv.DictWriter(target, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def main():
    rows, footer_count = load_source()
    report, entity_dimension, fact_rows = build(rows, footer_count)
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "summary.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    write_csv(OUT / "monthly_summary.csv", report["months"], ["month_number", "month", "cumulative_commitments_cop", "net_monthly_change_cop"])
    write_csv(OUT / "entity_summary.csv", report["entities"], ["entity_type", "entity_code", "entity_name", "december_commitments_cop"])
    write_csv(OUT / "rubric_summary.csv", report["top_rubrics"], ["rubric_code", "rubric_name", "december_commitments_cop"])
    write_csv(OUT / "dim_entity.csv", entity_dimension, ["entity_key", "entity_type", "entity_code", "entity_name"])
    write_csv(OUT / "fact_budget_commitment.csv", fact_rows, ["entity_key", "rubric_code", "rubric_name", *[f"cumulative_{month:02d}" for month in range(1, 13)]])
    totals = report["totals"]
    assert totals["net_commitments_during_2025_cop"] == totals["cumulative_december_cop"], "Monthly net changes do not reconcile to December cumulative total."
    print(f"PASS: {totals['source_rows']:,} detail rows; expected 18-column source structure and 2025-12 cut")
    print(f"PASS: {totals['entities']} entity labels; {totals['rubrics']} rubric codes; complete identity keys unique")
    print(f"PASS: monthly changes reconcile to the December cumulative amount ({totals['cumulative_december_cop']:,} COP)")
    print(f"REVIEW: {totals['rows_with_at_least_one_cumulative_decrease']:,} rows have at least one month-to-month decrease; retained as source adjustments, not removed")
    print(f"Bogotá 2025 cumulative commitments at December: ${totals['cumulative_december_cop']:,} COP")
    print(f"Largest December entity in this source: {totals['largest_entity_december']['entity_name']} — ${totals['largest_entity_december']['december_commitments_cop']:,} COP")
    print("The data describes public-budget commitments, not payment execution or Juan's work results.")


if __name__ == "__main__":
    main()
