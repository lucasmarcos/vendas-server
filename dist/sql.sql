PRAGMA journal_mode=WAL;

CREATE TABLE IF NOT EXISTS usuario (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  nome TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cliente (
  id INTEGER PRIMARY KEY,
  nome TEXT,
  documento TEXT,
  tipo INTEGER,
  email TEXT,
  endereco TEXT
);

CREATE TABLE IF NOT EXISTS fornecedor (
  id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS produto (
  id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS venda (
  id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS funcionario (
  id INTEGER PRIMARY KEY
);
