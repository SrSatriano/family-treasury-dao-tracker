# Getting Started

## Pré-requisitos

- Node.js 20+
- npm 10+

## Primeiro cofre

1. Acesse a UI em `http://localhost:5173`
2. Clique em **Novo cofre**
3. Defina meta R$ 50.000, aporte R$ 500/mês, taxa 8% a.a.
4. Veja a projeção no gráfico

## API

```http
POST /api/vaults
Content-Type: application/json

{
  "name": "Educação filhos",
  "target_amount": 50000,
  "monthly_contribution": 500,
  "annual_rate": 0.08
}
```
