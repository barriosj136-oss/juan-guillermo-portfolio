import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
const root=process.cwd();
const operationsDemo=resolve(root,"public/operations-data-review-suite");
await mkdir(operationsDemo,{recursive:true});
for(const name of ["index.html","app.js","data.js","i18n.js","styles.css","README.md"]) await cp(resolve(root,"projects/operations-data-review-suite",name),resolve(operationsDemo,name));
const nova=resolve(root,"public/projects/novatech");
await mkdir(nova,{recursive:true});
for(const name of ["analyze.py","validate.py","model.md","schema.sql","analysis.sql","README.md"]) await cp(resolve(root,"projects/novatech",name),resolve(nova,name));
await cp(resolve(root,"projects/novatech/data/monthly_summary.json"),resolve(nova,"monthly_summary.json"));
const bogota=resolve(root,"public/projects/bogota-budget");
await mkdir(bogota,{recursive:true});
for(const name of ["summary.json","monthly_summary.csv","entity_summary.csv","rubric_summary.csv","dim_entity.csv","fact_budget_commitment.csv"]) await cp(resolve(root,"projects/bogota-budget/data",name),resolve(bogota,name));
for(const name of ["analyze.py","model.md","schema.sql","analysis.sql","README.md"]) await cp(resolve(root,"projects/bogota-budget",name),resolve(bogota,name));
console.log("Synced the standalone operations demo and portfolio analysis source files.");

