# Teddy — Back-end (API)

API NestJS 11 + TypeORM + PostgreSQL do desafio Teddy: autenticação JWT, CRUD de
clientes com soft delete, dashboard, contador de acessos, auditoria e
observabilidade (health, métricas, logs JSON, traces).

## Estrutura

```
src/
├── main.ts              # bootstrap: pino, ValidationPipe, Swagger, CORS
├── app/app.module.ts    # composição dos módulos
├── config/              # TypeORM options + DataSource (CLI)
├── common/              # transformers (numeric)
├── auth/                # login JWT, guard, strategy, seed do admin
├── clients/             # CRUD, contador, stats
├── health/              # GET /healthz (Terminus)
├── metrics/             # GET /metrics (Prometheus) + counter custom
├── observability/       # tracing OpenTelemetry
└── migrations/          # schema inicial
```

## Rodar

Isolado (API + Postgres) via Docker, a partir desta pasta:

```bash
docker compose up --build
```

Local (precisa de um Postgres acessível):

```bash
cp .env.example .env      # ajuste DATABASE_URL
npx nx serve back-end     # http://localhost:3000
```

- Swagger: http://localhost:3000/docs
- Health: http://localhost:3000/healthz
- Métricas: http://localhost:3000/metrics

## Migrations

As migrations rodam automaticamente no boot (`migrationsRun: true`). Para operar
manualmente (da raiz do repo):

```bash
npm run migration:run
npm run migration:generate -- src/migrations/NomeDaMigration
npm run migration:revert
```

## Variáveis de ambiente

Veja `.env.example`. Principais: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`,
`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `OTEL_ENABLED`, `OTEL_EXPORTER_OTLP_ENDPOINT`.

## Testes

```bash
npx nx test back-end
npx nx lint back-end
```
