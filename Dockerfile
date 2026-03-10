FROM node:latest as base

WORKDIR /app

COPY . .

FROM base as dev
RUN echo "==> Iniciando dev..."
RUN npm i
CMD ["npm", "run", "dev"]

FROM base as prod
RUN echo "==> Iniciando prod..."
RUN npm i
RUN npm install
CMD ["npm", "run", "build:start"]

EXPOSE 3000
