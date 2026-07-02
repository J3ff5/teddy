# Teddy — Front-end (SPA)

SPA React 19 + Vite + TypeScript do desafio Teddy: login, dashboard, e gestão de
clientes (listar, criar, editar, excluir com soft delete, detalhe com contador),
mais a seleção de clientes (client-side).

## Estrutura

```
src/
├── main.tsx             # providers: QueryClient + Router
├── app/app.tsx          # rotas
├── shared/
│   ├── lib/             # axios (interceptor JWT), formatação
│   └── components/      # Layout, ProtectedRoute, Modal
└── features/
    ├── auth/            # login, store (Zustand), api
    ├── clients/         # lista, card, modais, detalhe, hooks
    ├── dashboard/       # cards + gráfico (Recharts)
    └── selected/        # "clientes selecionados" (localStorage)
```

## Rotas

`/login` · `/dashboard` · `/clients` · `/clients/:id` · `/selected`
(rotas protegidas redirecionam para `/login` sem token).

## Rodar

Isolado via Docker (nginx), a partir desta pasta — requer a API no ar:

```bash
docker compose up --build   # http://localhost:5173
```

Local (dev):

```bash
cp .env.example .env         # VITE_API_URL aponta para a API
npx nx serve front-end       # http://localhost:4200
```

## Estado

- **TanStack Query**: cache/sincronização dos dados do servidor (clientes, stats).
- **Zustand**: auth (token/usuário) e seleção de clientes, ambos persistidos em localStorage.

## Testes

```bash
npx nx test front-end
npx nx lint front-end
```
