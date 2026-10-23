-- Synthetic NovaTech practice data only. Currency stays separated throughout.

-- 1. Monthly invoice, payment, recovery and remaining balance by unit/currency.
SELECT month, business_unit, currency,
       COUNT(*) AS invoice_records,
       SUM(invoice_amount) AS invoiced,
       SUM(paid_amount) AS paid,
       SUM(recovered_amount) AS recovered_within_paid,
       SUM(outstanding_amount) AS outstanding,
       ROUND(100.0 * SUM(paid_amount) / NULLIF(SUM(invoice_amount), 0), 1) AS paid_to_invoiced_pct,
       SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) AS open_records
FROM monthly_operations
GROUP BY month, business_unit, currency
ORDER BY month, business_unit;

-- 2. Outstanding balance by generic risk group, separated by currency.
SELECT business_unit, currency, risk_group,
       COUNT(*) AS record_count,
       SUM(outstanding_amount) AS outstanding
FROM monthly_operations
GROUP BY business_unit, currency, risk_group
ORDER BY business_unit, outstanding DESC;

-- 3. Month-over-month movement for each currency and business unit.
WITH monthly AS (
  SELECT month, business_unit, currency,
         SUM(invoice_amount) AS invoiced,
         SUM(paid_amount) AS paid,
         SUM(outstanding_amount) AS outstanding
  FROM monthly_operations
  GROUP BY month, business_unit, currency
)
SELECT month, business_unit, currency, invoiced, paid, outstanding,
       invoiced - LAG(invoiced) OVER (PARTITION BY business_unit, currency ORDER BY month) AS invoice_change_mom,
       outstanding - LAG(outstanding) OVER (PARTITION BY business_unit, currency ORDER BY month) AS outstanding_change_mom
FROM monthly
ORDER BY business_unit, month;

-- 4. Data-quality checks: every query should return zero rows.
SELECT record_id, COUNT(*) AS duplicate_count
FROM monthly_operations
GROUP BY record_id
HAVING COUNT(*) > 1;

SELECT record_id
FROM monthly_operations
WHERE invoice_amount < 0 OR paid_amount < 0 OR recovered_amount < 0
   OR outstanding_amount < 0 OR aging_days < 0
   OR paid_amount + outstanding_amount <> invoice_amount
   OR recovered_amount > paid_amount
   OR currency <> CASE business_unit WHEN 'Canada' THEN 'CAD' WHEN 'United States' THEN 'USD' ELSE '' END
   OR status <> CASE WHEN outstanding_amount > 0 THEN 'Open' ELSE 'Paid' END;
