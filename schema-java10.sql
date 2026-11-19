-- Ekzekuto në Neon, në të njëjtën branch me DATABASE_URL.
-- Kërkesat lidhen me udhëtimin dhe llogarinë GitHub të udhëtarit.
CREATE TABLE IF NOT EXISTS kerkesat (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ne_pritje' CHECK (status IN ('ne_pritje', 'pranuar')),
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  pergjigjur_me TIMESTAMPTZ,
  UNIQUE (udhetim_id, udhetar_id)
);

CREATE INDEX IF NOT EXISTS kerkesat_udhetim_id_idx ON kerkesat(udhetim_id);
