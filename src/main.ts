import { readFileSync } from "node:fs";
import { join } from "node:path";
import { serve } from "@hono/node-server";
import Database from "better-sqlite3";
import { Hono } from "hono";

const db = new Database("db.db");

const sql = readFileSync(join(import.meta.dirname, "sql.sql")).toString();

db.exec(sql);

const app = new Hono();

serve(
  {
    fetch: app.fetch,
    port: 3031,
    hostname: "0.0.0.0",
  },
  console.log,
);
