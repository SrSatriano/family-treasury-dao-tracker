import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, "../db/treasury.sqlite"));

db.exec(`
  CREATE TABLE IF NOT EXISTS vaults (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    target_amount REAL NOT NULL,
    monthly_contribution REAL DEFAULT 0,
    annual_rate REAL DEFAULT 0.08,
    current_amount REAL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

app.get("/api/vaults", (_, res) => {
  const rows = db.prepare("SELECT * FROM vaults ORDER BY id DESC").all();
  res.json(rows);
});

app.post("/api/vaults", (req, res) => {
  const { name, target_amount, monthly_contribution, annual_rate } = req.body;
  const r = db
    .prepare(
      `INSERT INTO vaults (name, target_amount, monthly_contribution, annual_rate)
       VALUES (?, ?, ?, ?)`
    )
    .run(name, target_amount, monthly_contribution ?? 0, annual_rate ?? 0.08);
  res.status(201).json({ id: r.lastInsertRowid });
});

/** Projeção FV com aportes mensais (simplificada) */
app.get("/api/vaults/:id/projection", (req, res) => {
  const v = db.prepare("SELECT * FROM vaults WHERE id = ?").get(req.params.id);
  if (!v) return res.status(404).json({ error: "not found" });
  const months = 120;
  const r = v.annual_rate / 12;
  const points = [];
  let balance = v.current_amount;
  for (let m = 0; m <= months; m++) {
    points.push({ month: m, balance: Math.round(balance * 100) / 100 });
    balance = balance * (1 + r) + v.monthly_contribution;
  }
  res.json({ vault: v, projection: points });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));
