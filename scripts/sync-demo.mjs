import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
const root=process.cwd();
const source=resolve(root,"projects/operations-data-review-suite");
const target=resolve(root,"public/operations-data-review-suite");
await mkdir(target,{recursive:true});
for(const name of ["index.html","styles.css","app.js","data.js","i18n.js"]) await cp(resolve(source,name),resolve(target,name));
const nova=resolve(root,"public/projects/novatech");
await mkdir(nova,{recursive:true});
for(const name of ["monthly_performance.csv","monthly_summary.csv","summary.json","monthly_trend.svg"]) await cp(resolve(root,"projects/novatech/data",name),resolve(nova,name));
for(const name of ["analyze.py","validate.py","model.md","schema.sql","analysis.sql","README.md"]) await cp(resolve(root,"projects/novatech",name),resolve(nova,name));
console.log("Synced the standalone synthetic-data demo and NovaTech source files.");

