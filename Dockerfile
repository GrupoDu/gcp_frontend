FROM node:latest AS base

WORKDIR /app

COPY . .

FROM base AS dev
RUN echo "==> Iniciando dev..."
RUN npm i
CMD ["npm", "run", "dev"]

FROM base AS prod
RUN echo "==> Iniciando prod..."
RUN npm install
CMD ["npm", "run", "build:start"]

EXPOSE 3000
