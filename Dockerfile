FROM oven/bun:alpine AS base

WORKDIR /app

COPY . .

FROM base AS dev
RUN echo "==> Iniciando dev..."
RUN bun i
CMD ["bun", "run", "dev"]

FROM base AS prod
RUN echo "==> Iniciando prod..."
RUN bun install
CMD ["bun", "run", "build:start"]

EXPOSE 3000
