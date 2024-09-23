import { readFileSync } from "node:fs";
import { join } from "node:path";
import { env } from "node:process";
import { serve } from "@hono/node-server";
import Database from "better-sqlite3";
import { Hono } from "hono";

const db = new Database("db.db");

const sql = readFileSync(join(import.meta.dirname, "sql.sql")).toString();

db.exec(sql);

const app = new Hono();

app.post("/login", async (ctx) => {
  const { email, senha } = await ctx.req.json();
  const sttm = db.prepare(
    "SELECT id FROM usuario WHERE email = ? AND senha = ?;",
  );
  const res = sttm.get(email, senha) as { id: number };
  return ctx.json({ id: res.id });
});

app.post("/register", async (ctx) => {
  const { email, senha, nome } = await ctx.req.json();
  const sttm = db.prepare(
    "INSERT INTO usuario (email, senha, nome) VALUES (?, ?, ?);",
  );
  const res = sttm.run(email, senha, nome);
  return ctx.json({ id: res.lastInsertRowid });
});

app.post("/usuarios", async (ctx) => {
  const sttm = db.prepare("SELECT id, email, nome FROM usuario;");
  const res = sttm.all();
  return ctx.json(res);
});

const PORT = Number.parseInt(env.PORT) || 3031;
const HOSTNAME = env.HOSTNAME || "localhost";

serve(
  {
    fetch: app.fetch,
    port: PORT,
    hostname: HOSTNAME,
  },
  console.log,
);
