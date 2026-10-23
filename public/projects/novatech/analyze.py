"""Validate and summarize the editable synthetic NovaTech invoice ledger."""

import csv
import json
from collections import defaultdict
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).parent
DATA_FILE = ROOT.parent.parent / "public" / "data" / "novatech" / "monthly_operations.csv"
SUMMARY_FILE = ROOT / "data" / "monthly_summary.json"
FIELDS = ("record_id", "month", "business_unit", "currency", "risk_group", "invoice_amount", "paid_amount", "recovered_amount", "outstanding_amount", "aging_days", "status")
UNITS = {"Canada": "CAD", "United States": "USD"}


def load_rows():
    with DATA_FILE.open(newline="", encoding="utf-8-sig") as source:
        reader = csv.DictReader(source)
        if tuple(reader.fieldnames or ()) != FIELDS:
            raise ValueError(f"Expected columns: {', '.join(FIELDS)}")
        rows = list(reader)
    if not rows:
        raise ValueError("The CSV has no data rows.")
    seen = set()
    clean = []
    for line, row in enumerate(rows, 2):
        rid = (row["record_id"] or "").strip()
        if not rid or rid in seen:
            raise ValueError(f"Row {line}: record_id must be present and unique.")
        seen.add(rid)
        unit = (row["business_unit"] or "").strip()
        if unit not in UNITS or row["currency"] != UNITS.get(unit):
            raise ValueError(f"Row {line}: business unit and currency do not match the declared mapping.")
        risk = (row["risk_group"] or "").strip()
        if risk not in {"Standard", "Elevated", "High"}:
            raise ValueError(f"Row {line}: risk_group must be Standard, Elevated, or High.")
        try:
            month = datetime.strptime(row["month"], "%Y-%m").strftime("%Y-%m")
            amounts = {name: int(row[name]) for name in ("invoice_amount", "paid_amount", "recovered_amount", "outstanding_amount")}
            aging = int(row["aging_days"])
        except (ValueError, TypeError) as error:
            raise ValueError(f"Row {line}: invalid month, amount, or aging value.") from error
        if any(value < 0 for value in amounts.values()) or aging < 0:
            raise ValueError(f"Row {line}: amounts and aging days must be nonnegative.")
        if amounts["paid_amount"] + amounts["outstanding_amount"] != amounts["invoice_amount"]:
            raise ValueError(f"Row {line}: paid plus outstanding must equal invoice amount.")
        if amounts["recovered_amount"] > amounts["paid_amount"]:
            raise ValueError(f"Row {line}: recovered amount must be included within paid amount.")
        status = "Open" if amounts["outstanding_amount"] else "Paid"
        if row["status"] != status:
            raise ValueError(f"Row {line}: status does not agree with outstanding amount.")
        clean.append({"record_id": rid, "month": month, "business_unit": unit, "currency": row["currency"], "risk_group": risk, **amounts, "aging_days": aging, "status": status})
    return clean


def summarize(rows):
    groups = defaultdict(lambda: {"records": 0, "invoice": 0, "paid": 0, "recovered": 0, "outstanding": 0, "open_records": 0})
    for row in rows:
        key = (row["month"], row["business_unit"], row["currency"])
        group = groups[key]
        group["records"] += 1
        group["invoice"] += row["invoice_amount"]
        group["paid"] += row["paid_amount"]
        group["recovered"] += row["recovered_amount"]
        group["outstanding"] += row["outstanding_amount"]
        group["open_records"] += row["status"] == "Open"
    return [{"month": month, "business_unit": unit, "currency": currency, **values} for (month, unit, currency), values in sorted(groups.items())]


def main():
    rows = load_rows()
    monthly = summarize(rows)
    SUMMARY_FILE.write_text(json.dumps({"record_count": len(rows), "months": monthly}, indent=2), encoding="utf-8")
    print(f"PASS: {len(rows)} rows; required fields; unique synthetic identifiers; valid months and nonnegative amounts")
    print("PASS: unit/currency mapping, paid + outstanding = invoice, recovered <= paid, and status reconciliation")
    print(f"Wrote {SUMMARY_FILE.relative_to(ROOT)} ({len(monthly)} month/unit groups)")
    print("All records are synthetic; no employer or customer records are represented.")


if __name__ == "__main__":
    main()
