-- Run with SQLite after creating the table from schema.sql and importing
-- data/monthly_performance.csv. All values are synthetic and illustrative.

-- 1) Monthly target, attainment, target gap, and budget variance.
SELECT
    month,
    goal_target,
    goal_actual,
    ROUND(100.0 * goal_actual / NULLIF(goal_target, 0), 1) AS attainment_pct,
    goal_actual - goal_target AS target_gap,
    budget_planned,
    budget_actual,
    budget_actual - budget_planned AS budget_variance
FROM monthly_performance
ORDER BY month;

-- 2) Aggregate totals. Attainment is ratio of sums, not an average of ratios.
SELECT
    SUM(goal_target) AS target_total,
    SUM(goal_actual) AS actual_total,
    ROUND(100.0 * SUM(goal_actual) / NULLIF(SUM(goal_target), 0), 1) AS attainment_pct,
    SUM(budget_planned) AS budget_planned_total,
    SUM(budget_actual) AS budget_actual_total,
    SUM(budget_actual) - SUM(budget_planned) AS budget_variance_total,
    SUM(CASE WHEN budget_actual > budget_planned THEN 1 ELSE 0 END) AS months_over_budget
FROM monthly_performance;

-- 3) Month-over-month movement. January has no prior observation.
WITH monthly AS (
    SELECT
        month,
        goal_actual,
        budget_actual,
        goal_actual - LAG(goal_actual) OVER (ORDER BY month) AS actual_mom_change,
        budget_actual - LAG(budget_actual) OVER (ORDER BY month) AS spend_mom_change
    FROM monthly_performance
)
SELECT * FROM monthly ORDER BY month;

-- 4) Simple source-quality checks. Each query should return no rows.
SELECT month, COUNT(*) AS row_count
FROM monthly_performance
GROUP BY month
HAVING COUNT(*) <> 1;

SELECT *
FROM monthly_performance
WHERE month IS NULL OR goal_target < 0 OR goal_actual < 0
   OR budget_planned < 0 OR budget_actual < 0;
