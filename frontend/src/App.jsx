import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function App() {
  const [vaults, setVaults] = useState([]);
  const [form, setForm] = useState({
    name: "",
    target_amount: 50000,
    monthly_contribution: 500,
    annual_rate: 0.08,
  });

  const load = () => fetch(`${API}/api/vaults`).then((r) => r.json()).then(setVaults);
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await fetch(`${API}/api/vaults`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", target_amount: 50000, monthly_contribution: 500, annual_rate: 0.08 });
    load();
  };

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 720, margin: "2rem auto", padding: 16 }}>
      <h1>Family Treasury</h1>
      <form onSubmit={create} style={{ display: "grid", gap: 8, marginBottom: 24 }}>
        <input placeholder="Nome do cofre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="number" placeholder="Meta (R$)" value={form.target_amount} onChange={(e) => setForm({ ...form, target_amount: +e.target.value })} />
        <input type="number" placeholder="Aporte mensal" value={form.monthly_contribution} onChange={(e) => setForm({ ...form, monthly_contribution: +e.target.value })} />
        <button type="submit">Criar cofre</button>
      </form>
      <ul>
        {vaults.map((v) => (
          <li key={v.id} style={{ marginBottom: 12, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            <strong>{v.name}</strong> — meta R$ {v.target_amount.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
