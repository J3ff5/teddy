# Back-end da Teddy (API)

API em NestJS 11 com TypeORM e PostgreSQL. Faz a autenticação por JWT, o CRUD de
clientes com soft delete, o dashboard, o contador de acessos, a auditoria por
timestamps e a observabilidade (health, métricas, logs em JSON e traces).

## Estrutura

```
src/
├── main.ts              # bootstrap: pino, ValidationPipe, Swagger, CORS
├── app/app.module.ts    # composição dos módulos
├── config/              # opções do TypeORM e DataSource da CLI
├── common/              # transformers (numeric)
├── auth/                # login JWT, guard, strategy, seed do admin
├── clients/             # CRUD, contador, stats
├── health/              # GET /healthz (Terminus)
├── metrics/             # GET /metrics (Prometheus) e counter próprio
├── observability/       # tracing com OpenTelemetry
└── migrations/          # schema inicial
```

## Rodar

Com Docker (API + Postgres), desta pasta:

```bash
docker compose up --build
```

Local, com um Postgres disponível:

```bash
cp .env.example .env      # ajuste DATABASE_URL
npx nx serve back-end     # http://localhost:3000
```

- Swagger: http://localhost:3000/docs
- Health: http://localhost:3000/healthz
- Métricas: http://localhost:3000/metrics

## Migrations

As migrations rodam sozinhas no boot (`migrationsRun: true`). Para rodar na mão,
da raiz do repo:

```bash
npm run migration:run
npm run migration:generate -- src/migrations/NomeDaMigration
npm run migration:revert
```

## Variáveis de ambiente

Estão no `.env.example`. As principais: `DATABASE_URL`, `JWT_SECRET`,
`JWT_EXPIRES_IN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `OTEL_ENABLED` e
`OTEL_EXPORTER_OTLP_ENDPOINT`.

## Testes

```bash
npx nx test back-end
npx nx lint back-end
```
