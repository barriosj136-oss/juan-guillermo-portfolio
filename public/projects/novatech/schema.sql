-- Synthetic NovaTech operating records; no actual employer/customer data.
CREATE TABLE IF NOT EXISTS monthly_operations (
    record_id TEXT PRIMARY KEY CHECK (record_id GLOB 'DEMO-*'),
    month TEXT NOT NULL CHECK (length(month) = 7 AND month GLOB '[0-9][0-9][0-9][0-9]-[0-1][0-9]' AND substr(month, 6, 2) BETWEEN '01' AND '12'),
    business_unit TEXT NOT NULL CHECK (business_unit IN ('Canada', 'United States')),
    currency TEXT NOT NULL CHECK ((business_unit = 'Canada' AND currency = 'CAD') OR (business_unit = 'United States' AND currency = 'USD')),
    risk_group TEXT NOT NULL CHECK (risk_group IN ('Standard', 'Elevated', 'High')),
    invoice_amount INTEGER NOT NULL CHECK (invoice_amount >= 0),
    paid_amount INTEGER NOT NULL CHECK (paid_amount >= 0),
    recovered_amount INTEGER NOT NULL CHECK (recovered_amount >= 0),
    outstanding_amount INTEGER NOT NULL CHECK (outstanding_amount >= 0),
    aging_days INTEGER NOT NULL CHECK (aging_days >= 0),
    status TEXT NOT NULL CHECK (status IN ('Open', 'Paid')),
    CHECK (paid_amount + outstanding_amount = invoice_amount),
    CHECK (recovered_amount <= paid_amount),
    CHECK (status = CASE WHEN outstanding_amount > 0 THEN 'Open' ELSE 'Paid' END)
);
