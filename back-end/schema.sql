DROP DATABASE amacher;
CREATE DATABASE amacher;
\connect amacher; 

SET timezone = 'America/Los_Angeles';

CREATE OR REPLACE FUNCTION update_time_created_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.time_created = CURRENT_TIMESTAMP; 
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE users (
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  regCode INTEGER NOT NULL,
  phone TEXT NOT NULL,
  email TEXT PRIMARY KEY
    CHECK (position('@' IN email) > 1),
  username VARCHAR(15) NOT NULL,
  password TEXT NOT NULL,
  profile_pic TEXT DEFAULT 'https://bit.ly/3mx9za2'
);

CREATE TABLE plasmids (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  time_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  sequence TEXT NOT NULL,
  gly_stock TEXT NOT NULL,
  puri_protein TEXT NOT NULL,
  email TEXT NOT NULL,
  uc_mole_weight TEXT NOT NULL,
  uc_ext_co TEXT NOT NULL,
  uc_ext_co_M TEXT NOT NULL,
  uc_iso_point TEXT NOT NULL,
  mole_weight TEXT NOT NULL,
  ext_co TEXT NOT NULL,
  ext_co_M TEXT NOT NULL,
  iso_point TEXT NOT NULL,
  FOREIGN KEY (email) REFERENCES users ON DELETE CASCADE
);

CREATE TABLE preps (
  id SERIAL PRIMARY KEY,
  plasmid_name TEXT NOT NULL,
  plasmid_id INTEGER NOT NULL,
  time_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  prepped_by TEXT NOT NULL,
  growth_starter TEXT,
  gly_stock TEXT,
  FOREIGN KEY (plasmid_id) REFERENCES plasmids ON DELETE CASCADE,
  FOREIGN KEY (prepped_by) REFERENCES users ON DELETE CASCADE
);

CREATE TABLE purified_protein (
  id SERIAL PRIMARY KEY,
  plasmid_name TEXT NOT NULL,
  cleaved BOOLEAN NOT NULL,
  concentration TEXT NOT NULL,
  tube_count TEXT NOT NULL,
  time_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  box INTEGER NOT NULL,
  FOREIGN KEY (box) REFERENCES preps ON DELETE CASCADE
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE protocols (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  link TEXT,
  project INTEGER NOT NULL,
  FOREIGN KEY (project) REFERENCES projects ON DELETE CASCADE
);

CREATE TABLE glycerolStocks (
  id SERIAL PRIMARY KEY,
  plasmid_id INTEGER,
  plasmid_name TEXT NOT NULL,
  number_of_tubes TEXT NOT NULL,
  FOREIGN KEY (plasmid_id) REFERENCES plasmids ON DELETE CASCADE
);

CREATE TABLE crystalTray (
  id SERIAL PRIMARY KEY,
  time_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  added_by TEXT,
  green TEXT,
  pink TEXT,
  purple TEXT,
  gStock TEXT,
  piStock TEXT,
  puStock TEXT,
  gAOne TEXT,
  piAOnek TEXT,
  puAOnek TEXT,
  gStep TEXT,
  piStepk TEXT,
  total_volume TEXT,
  FOREIGN KEY (added_by) REFERENCES users ON DELETE CASCADE
);
