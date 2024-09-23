PRAGMA journal_mode=WAL;

CREATE TABLE IF NOT EXISTS usuario (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  nome TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contato (
  id INTEGER PRIMARY KEY,
  nome TEXT,
  telefone TEXT,
  email TEXT,
  endereco TEXT
);
