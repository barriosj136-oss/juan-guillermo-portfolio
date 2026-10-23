-- Load dim_entity.csv into dim_entity and fact_budget_commitment.csv into
-- fact_budget_commitment after creating these SQLite tables.
CREATE TABLE IF NOT EXISTS dim_entity (
    entity_key INTEGER PRIMARY KEY,
    entity_type TEXT NOT NULL,
    entity_code TEXT NOT NULL,
    entity_name TEXT NOT NULL,
    UNIQUE (entity_type, entity_code, entity_name)
);

CREATE TABLE IF NOT EXISTS fact_budget_commitment (
    entity_key INTEGER NOT NULL,
    rubric_code TEXT NOT NULL,
    rubric_name TEXT NOT NULL,
    cumulative_01 INTEGER NOT NULL CHECK (cumulative_01 >= 0),
    cumulative_02 INTEGER NOT NULL CHECK (cumulative_02 >= 0),
    cumulative_03 INTEGER NOT NULL CHECK (cumulative_03 >= 0),
    cumulative_04 INTEGER NOT NULL CHECK (cumulative_04 >= 0),
    cumulative_05 INTEGER NOT NULL CHECK (cumulative_05 >= 0),
    cumulative_06 INTEGER NOT NULL CHECK (cumulative_06 >= 0),
    cumulative_07 INTEGER NOT NULL CHECK (cumulative_07 >= 0),
    cumulative_08 INTEGER NOT NULL CHECK (cumulative_08 >= 0),
    cumulative_09 INTEGER NOT NULL CHECK (cumulative_09 >= 0),
    cumulative_10 INTEGER NOT NULL CHECK (cumulative_10 >= 0),
    cumulative_11 INTEGER NOT NULL CHECK (cumulative_11 >= 0),
    cumulative_12 INTEGER NOT NULL CHECK (cumulative_12 >= 0),
    PRIMARY KEY (entity_key, rubric_code, rubric_name),
    FOREIGN KEY (entity_key) REFERENCES dim_entity(entity_key)
);
