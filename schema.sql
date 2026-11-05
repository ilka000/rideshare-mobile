-- Ekzekutoje në Neon SQL Editor te databaza/branch që përdor DATABASE_URL.
-- Krijon strukturën e aplikacionit dhe të dhëna fiktive pa i dubluar.
CREATE TABLE IF NOT EXISTS profilet (
  github_id TEXT PRIMARY KEY,
  emri TEXT NOT NULL,
  roli TEXT NOT NULL DEFAULT 'udhetar' CHECK (roli IN ('udhetar', 'shofer'))
);

CREATE TABLE IF NOT EXISTS udhetimet (
  id TEXT PRIMARY KEY,
  nisja TEXT NOT NULL,
  destinacioni TEXT NOT NULL,
  ora TEXT NOT NULL CHECK (ora ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  vendtakimi TEXT NOT NULL,
  vende INTEGER NOT NULL CHECK (vende >= 0),
  shofer_id TEXT REFERENCES profilet(github_id)
);

-- Për databazat e krijuara me versionin e vjetër të schema.sql.
ALTER TABLE udhetimet ADD COLUMN IF NOT EXISTS shofer_id TEXT REFERENCES profilet(github_id);

INSERT INTO udhetimet (id, nisja, destinacioni, ora, vendtakimi, vende)
VALUES
  ('1', 'Prishtinë', 'AAB', '08:00', 'Stacioni i autobusëve', 2),
  ('2', 'Fushë Kosovë', 'AAB', '08:15', 'Te stacioni kryesor', 1),
  ('3', 'Lipjan', 'AAB', '07:45', 'Qendra e qytetit', 0)
ON CONFLICT (id) DO NOTHING;

-- Shofer demo për udhëtimin 1; nuk është përdorues real.
INSERT INTO profilet (github_id, emri, roli)
VALUES ('DEMO-SHOFER-2', 'Shoferi tjetër (demo)', 'shofer')
ON CONFLICT (github_id) DO NOTHING;
UPDATE udhetimet SET shofer_id = 'DEMO-SHOFER-2'
WHERE id = '1' AND shofer_id IS NULL;

SELECT id, nisja, destinacioni, ora, vende, shofer_id FROM udhetimet ORDER BY id;
