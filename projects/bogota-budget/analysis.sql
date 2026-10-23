-- Import the normalized Python outputs using SQLite's .import command.

-- 1) December commitments by entity type and public entity name.
SELECT e.entity_type, e.entity_code, e.entity_name,
       SUM(f.cumulative_12) AS december_commitments_cop
FROM fact_budget_commitment AS f
JOIN dim_entity AS e ON e.entity_key = f.entity_key
GROUP BY e.entity_type, e.entity_code, e.entity_name
ORDER BY december_commitments_cop DESC;

-- 2) Unpivot cumulative month fields, aggregate them, then calculate
-- month-to-month net changes using a window function.
WITH monthly_rows AS (
    SELECT entity_key, rubric_code, rubric_name, 1 AS month_number, cumulative_01 AS cumulative_cop FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 2, cumulative_02 FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 3, cumulative_03 FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 4, cumulative_04 FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 5, cumulative_05 FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 6, cumulative_06 FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 7, cumulative_07 FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 8, cumulative_08 FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 9, cumulative_09 FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 10, cumulative_10 FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 11, cumulative_11 FROM fact_budget_commitment
    UNION ALL SELECT entity_key, rubric_code, rubric_name, 12, cumulative_12 FROM fact_budget_commitment
), district_monthly AS (
    SELECT month_number, SUM(cumulative_cop) AS cumulative_commitments_cop
    FROM monthly_rows
    GROUP BY month_number
), with_change AS (
    SELECT month_number, cumulative_commitments_cop,
           cumulative_commitments_cop - LAG(cumulative_commitments_cop) OVER (ORDER BY month_number) AS net_monthly_change_cop
    FROM district_monthly
)
SELECT * FROM with_change ORDER BY month_number;

-- 3) Top budget-item descriptions based on December cumulative commitments.
SELECT rubric_code, rubric_name, SUM(cumulative_12) AS december_commitments_cop
FROM fact_budget_commitment
GROUP BY rubric_code, rubric_name
ORDER BY december_commitments_cop DESC
LIMIT 10;

-- 4) Orphaned fact records; should return no rows.
SELECT f.entity_key
FROM fact_budget_commitment AS f
LEFT JOIN dim_entity AS e ON e.entity_key = f.entity_key
WHERE e.entity_key IS NULL;
