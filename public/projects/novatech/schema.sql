-- SQLite schema for the synthetic NovaTech monthly dataset.
-- Fictional demonstration data only; no real company or employer records.
CREATE TABLE IF NOT EXISTS monthly_performance (
    month TEXT PRIMARY KEY
        CHECK (length(month) = 7 AND month GLOB '[0-9][0-9][0-9][0-9]-[0-1][0-9]')
        CHECK (substr(month, 6, 2) BETWEEN '01' AND '12')
        CHECK (strftime('%Y-%m', month || '-01') = month),
    goal_target INTEGER NOT NULL CHECK (goal_target >= 0),
    goal_actual INTEGER NOT NULL CHECK (goal_actual >= 0),
    budget_planned INTEGER NOT NULL CHECK (budget_planned >= 0),
    budget_actual INTEGER NOT NULL CHECK (budget_actual >= 0),
    CHECK (goal_target > 0)
);
