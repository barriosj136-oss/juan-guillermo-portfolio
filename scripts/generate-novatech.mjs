import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const out = resolve(root, "public/data/novatech/monthly_operations.csv");
const units = [{ name: "Canada", currency: "CAD" }, { name: "United States", currency: "USD" }];
const risks = ["Standard", "Elevated", "High"];
const rows = ["record_id,month,business_unit,currency,risk_group,invoice_amount,paid_amount,recovered_amount,outstanding_amount,aging_days,status"];
const cents = [12500, 24750, 38900, 56200, 79500, 116500, 184900, 247500, 362000, 528000, 744500, 925000];

for (let monthIndex = 0; monthIndex < 24; monthIndex += 1) {
  const date = new Date(Date.UTC(2024, monthIndex, 1));
  const month = date.toISOString().slice(0, 7);
  for (const unit of units) for (let account = 1; account <= 100; account += 1) {
    const seq = monthIndex * 200 + (unit.name === "Canada" ? 0 : 100) + account;
    const invoice = cents[(seq * 7 + account * 3 + monthIndex) % cents.length] + ((seq * 137) % 97) * 100;
    const settledPct = [35, 55, 68, 76, 84, 92, 100][(seq * 5 + monthIndex) % 7];
    const paid = Math.floor(invoice * settledPct / 100);
    const outstanding = invoice - paid;
    const recoveredPct = [0, 0, 0, 18, 27, 43][(seq * 3 + account) % 6];
    const recovered = Math.min(paid, Math.floor(paid * recoveredPct / 100));
    const age = outstanding === 0 ? (seq % 24) : 15 + ((seq * 17 + account) % 211);
    const status = outstanding === 0 ? "Paid" : "Open";
    const risk = risks[(seq * 11 + account) % risks.length];
    const id = `DEMO-${String(seq + 1).padStart(6, "0")}`;
    rows.push([id, month, unit.name, unit.currency, risk, invoice, paid, recovered, outstanding, age, status].join(","));
  }
}

await mkdir(resolve(root, "public/data/novatech"), { recursive: true });
await writeFile(out, `${rows.join("\n")}\n`, "utf8");
console.log(`Generated ${rows.length - 1} deterministic synthetic rows at ${out}`);
