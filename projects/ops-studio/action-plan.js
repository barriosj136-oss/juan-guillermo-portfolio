(()=>{
"use strict";
// Action Plan view: one row per settlement — payment schedule by month, action plan, write-off, reserve, balance due and portfolio details.
// Same column logic as the production tab; all records here are fictional.
const $=s=>document.querySelector(s),PREF="ops-studio-action-plan-months";
const MONTHS=[{key:"2026-09",label:"Sep"},{key:"2026-10",label:"Oct"},{key:"2026-11",label:"Nov"},{key:"2026-12",label:"Dec"}];
const owners=[{owner:"A. Rivera",portfolio:"OPS-High Risk"},{owner:"L. Chen",portfolio:"OPS-RMS"},{owner:"S. Patel",portfolio:"OPS-Terminations"},{owner:"J. Okafor",portfolio:"OPS-High Risk"}];
const plans=["Destroy inventory in both accounts — trigger: upon payment of the full settlement.","Close the account, write off remaining balances and stop collection activity — trigger: upon clearance of the final installment.","Release storage hold and return inventory — trigger: upon receipt of the first installment.","Final disposition of inventory at no additional cost — trigger: upon receipt and clearance of the settlement payment."];
const names=["Northwind Retail LLC","Bluebird Logistics Inc","Cedar & Pine Foods","Summit Health Supply","Harbor Light Media","Atlas Field Services","Juniper Home Goods","Redwood Analytics","Silverline Transport","Orchard Street Cafe","Keystone Builders","Meridian Travel Co."];
const customers=names.map((name,i)=>{const o=owners[i%owners.length],installments=1+i%3,start=i%2,total=Math.round((4000+(i*2741%26000))/100)*100,schedule={};
 // Installment plans spread the total over consecutive months (e.g. $500 Sep + $400 Oct + $100 Nov).
 for(let j=0;j<installments;j++){const m=MONTHS[(start+j)%MONTHS.length].key;schedule[m]=(schedule[m]||0)+Math.round(total/installments)}
 return{id:`DEMO-${String(3101+i*7).padStart(5,"0")}`,name,schedule,total:Object.values(schedule).reduce((a,b)=>a+b,0),plan:plans[i%plans.length],balance:{amount:i%5===3?0:900+(i*2389%11800),invoices:i%5===3?0:1+(i*7%9)},owner:o.owner,portfolio:o.portfolio}});
window.ACTION_PLAN_DATA={months:MONTHS,customers};
let selected=loadMonths();
function loadMonths(){try{let v=JSON.parse(localStorage.getItem(PREF));if(Array.isArray(v)){v=v.filter(k=>MONTHS.some(m=>m.key===k));if(v.length)return v}}catch{}return MONTHS.map(m=>m.key)}
function saveMonths(){try{localStorage.setItem(PREF,JSON.stringify(selected))}catch{}}
const money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const activeMonths=()=>MONTHS.filter(m=>selected.includes(m.key));
const cell=(n,cls="")=>n?`<td class="num ${cls}">${money(n)}</td>`:`<td class="num ap-empty">—</td>`;
const blank='<td class="ap-empty">—</td>';
function metric(label,value,foot,icon,tone=""){return `<article class="metric"><div class="metric-top"><span>${esc(label)}</span><i class="metric-icon ${tone}">${icon}</i></div><strong>${esc(value)}</strong><div class="metric-foot">${esc(foot)}</div></article>`}
function rows(){const q=$("#apQuery").value.trim().toLowerCase(),owner=$("#apOwner").value,focus=$("#apFocus").value;return customers.filter(c=>(!q||[c.id,c.name,c.owner,c.portfolio,c.plan].some(v=>v.toLowerCase().includes(q)))&&(!owner||c.owner===owner)&&(focus!=="plan"||Object.keys(c.schedule).length>1)&&(focus!=="open"||c.balance.invoices))}
function render(){const months=activeMonths(),list=rows();
 $("#apMonths").innerHTML=MONTHS.map(m=>`<button type="button" class="month-chip ${selected.includes(m.key)?"on":""}" data-month="${m.key}" aria-pressed="${selected.includes(m.key)}">${m.label}</button>`).join("");
 $("#apSettleHead").colSpan=months.length+1;
 $("#apColumns").innerHTML=`<th class="ap-sticky ap-c1">CUST ID</th><th class="ap-sticky ap-c2">CUST NAME</th>${months.map(m=>`<th class="num ap-settle">${m.label.toUpperCase()}</th>`).join("")}<th class="num ap-settle ap-total-col">TOTAL</th><th class="ap-plan-col">ACTION PLAN</th><th class="ap-wo">STATUS</th><th class="num ap-wo">ADJUST AMOUNT</th><th class="ap-wo">DATE</th><th class="num ap-res">PENDING</th><th class="num ap-bal">TOTAL AMOUNT</th><th class="num ap-bal">INVOICES</th><th class="ap-port">PORTFOLIO OWNER</th><th class="ap-port">PORTFOLIO</th>`;
 $("#apRows").innerHTML=list.map(c=>`<tr><td class="ap-sticky ap-c1"><span class="record-link">${esc(c.id)}</span></td><td class="ap-sticky ap-c2"><strong class="ap-name">${esc(c.name)}</strong>${Object.keys(c.schedule).length>1?`<small class="ap-tag">${Object.keys(c.schedule).length} installments</small>`:""}</td>${months.map(m=>cell(c.schedule[m.key])).join("")}${cell(c.total,"ap-total-col")}<td><div class="ap-plan clamp" title="Click to expand">${esc(c.plan)}</div></td>${blank}<td class="num ap-empty">—</td>${blank}<td class="num ap-empty">—</td>${cell(c.balance.amount)}<td class="num">${c.balance.invoices?`<span class="ap-badge">${c.balance.invoices}</span>`:'<span class="ap-empty">—</span>'}</td><td>${esc(c.owner)}</td><td><span class="ap-port-pill">${esc(c.portfolio)}</span></td></tr>`).join("")||`<tr><td colspan="${months.length+12}" class="empty-cell">No settlements match these filters.</td></tr>`;
 $("#apRows").querySelectorAll(".ap-plan").forEach(p=>p.addEventListener("click",()=>p.classList.toggle("clamp")));
 const sum=f=>list.reduce((a,c)=>a+f(c),0),inMonths=c=>months.reduce((a,m)=>a+(c.schedule[m.key]||0),0),tSel=sum(inMonths),tTotal=sum(c=>c.total),tBal=sum(c=>c.balance.amount),tInv=sum(c=>c.balance.invoices);
 $("#apTotals").innerHTML=list.length?`<tr><td class="ap-sticky ap-c1">TOTAL</td><td class="ap-sticky ap-c2">${list.length} settlements</td>${months.map(m=>cell(sum(c=>c.schedule[m.key]||0))).join("")}${cell(tTotal,"ap-total-col")}<td></td><td></td><td></td><td></td><td></td>${cell(tBal)}<td class="num">${tInv}</td><td colspan="2"></td></tr>`:"";
 $("#apCount").textContent=`${list.length} settlements`;
 $("#apMetrics").innerHTML=[metric("Total settlement amount",money(tTotal),`${list.length} settlements`,"$"),metric("Scheduled in selected months",money(tSel),months.map(m=>m.label).join(" · ")||"No months selected","◷","amber"),metric("Balance due · open items",money(tBal),`${tInv} invoices`,"▤","green"),metric("WO · bad debt / reserve","—","Source pending","↓","red")].join("");
 $("#apMonths").querySelectorAll("[data-month]").forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.month;selected=selected.includes(k)?selected.filter(x=>x!==k):[...selected,k];if(!selected.length)selected=[k];saveMonths();render()}));
}
function csvCell(v){let s=String(v??"");if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"'}
function exportCsv(){const months=activeMonths(),head=["cust_id","cust_name",...months.map(m=>`settle_${m.label.toLowerCase()}`),"settle_total","action_plan","wo_status","wo_adjust_amount","wo_date","reserve_pending","balance_due","open_invoices","portfolio_owner","portfolio"],body=rows().map(c=>[c.id,c.name,...months.map(m=>c.schedule[m.key]||""),c.total,c.plan,"","","","",c.balance.amount,c.balance.invoices,c.owner,c.portfolio]),blob=new Blob(["﻿"+[head,...body].map(r=>r.map(csvCell).join(",")).join("\r\n")],{type:"text/csv;charset=utf-8"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="synthetic-action-plan.csv";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1200)}
function init(){const sel=$("#apOwner");sel.innerHTML='<option value="">All portfolio owners</option>'+[...new Set(customers.map(c=>c.owner))].sort().map(o=>`<option>${esc(o)}</option>`).join("");["#apQuery","#apOwner","#apFocus"].forEach(id=>$(id).addEventListener("input",render));$("#apExport").addEventListener("click",exportCsv);render()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
