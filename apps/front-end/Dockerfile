# --- Build stage: produce the Vite static bundle ---
# Build context is the repo root (the whole monorepo is needed for `nx build`).
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# VITE_API_URL is baked in at build time (Vite env vars are compile-time).
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL
RUN npx nx build front-end

# --- Runtime stage: serve the bundle with nginx ---
FROM nginx:alpine AS runtime
COPY --from=build /app/apps/front-end/dist /usr/share/nginx/html
COPY apps/front-end/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
