-- Java 9 · Preferimet e udhëtimeve. Ekzekuto në të njëjtën Neon branch si DATABASE_URL.
-- Çelësi primar e bën ruajtjen përsëritur idempotente për përdoruesin dhe udhëtimin.
CREATE TABLE IF NOT EXISTS preferimet (
  github_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (github_id, udhetim_id)
);

CREATE INDEX IF NOT EXISTS preferimet_udhetim_id_idx ON preferimet(udhetim_id);
