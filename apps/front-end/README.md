# Front-end da Teddy (SPA)

SPA em React 19 com Vite e TypeScript. Tem login, dashboard e a gestão de
clientes (listar, criar, editar, excluir com soft delete e o detalhe com
contador). A seleção de clientes é feita no próprio navegador.

## Estrutura

```
src/
├── main.tsx             # providers: QueryClient e Router
├── app/app.tsx          # rotas
├── shared/
│   ├── lib/             # axios (interceptor do JWT), formatação
│   └── components/      # Layout, ProtectedRoute, Modal
└── features/
    ├── auth/            # login, store (Zustand), api
    ├── clients/         # lista, card, modais, detalhe, hooks
    ├── dashboard/       # cards e gráfico (Recharts)
    └── selected/        # clientes selecionados (localStorage)
```

## Rotas

`/login`, `/dashboard`, `/clients`, `/clients/:id` e `/selected`. Sem token, as
rotas protegidas mandam de volta para `/login`.

## Rodar

Com Docker (nginx), desta pasta. Precisa da API no ar:

```bash
docker compose up --build   # http://localhost:5173
```

Local:

```bash
cp .env.example .env         # VITE_API_URL aponta para a API
npx nx serve front-end       # http://localhost:5173
```

## Estado

O TanStack Query cuida dos dados que vêm do servidor (clientes, stats), com
cache e revalidação. O Zustand guarda a autenticação e a seleção de clientes,
os dois persistidos no localStorage.

## Testes

```bash
npx nx test front-end
npx nx lint front-end
```
