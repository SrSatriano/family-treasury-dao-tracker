# Family Treasury DAO & Goal Tracker

App web para planejamento patrimonial de longo prazo: cofres virtuais (educação, viagens), regras de juros compostos simulados e gráficos interativos.

## Stack

- React (Vite) + Node.js (Express)
- SQLite

## Filosofia de design

- **Transparência familiar**: todos os membros veem metas e progresso (com permissões).
- **Cofres, não contas bancárias**: simulação educacional — não movimenta dinheiro real.
- **Visualização primeiro**: gráficos motivam consistência nos aportes.
- **Regras simples**: juros compostos configuráveis por cofre para ensinar matemática financeira.

Detalhes: [docs/DESIGN_PHILOSOPHY.md](docs/DESIGN_PHILOSOPHY.md)

## Desenvolvimento local

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (outro terminal)
cd frontend && npm install && npm run dev
```

API: `http://localhost:4000` | UI: `http://localhost:5173`

Banco SQLite criado automaticamente em `backend/db/treasury.sqlite`.

## Funcionalidades

- Criar cofres com meta e prazo
- Aportes recorrentes simulados
- Projeção: `FV = PV * (1 + r)^n + PMT * (...)`
- Gráfico de evolução patrimonial

## Contribuição

Veja [CONTRIBUTING.md](CONTRIBUTING.md).

## Estrutura

| Pasta | Conteúdo |
|-------|----------|
| `frontend/` | React UI |
| `backend/` | API + SQLite |
| `docs/` | Design e API |
