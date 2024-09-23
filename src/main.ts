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
