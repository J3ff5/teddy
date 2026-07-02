# --- Build stage: compile the NestJS app with Nx ---
# Build context is the repo root (the whole monorepo is needed for `nx build`).
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx nx build back-end

# --- Runtime stage: install prod deps and run the bundled entrypoint ---
FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Nx emits main.js + a package.json listing runtime deps. `pg` is loaded
# dynamically by TypeORM, so it isn't detected by the bundler — add it here.
COPY --from=build /app/apps/back-end/dist ./
RUN npm install --omit=dev && npm install pg@^8 && npm cache clean --force

EXPOSE 3000
# Migrations run automatically on boot (migrationsRun: true).
CMD ["node", "main.js"]
