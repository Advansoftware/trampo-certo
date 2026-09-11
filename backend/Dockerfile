# TrampoCerto API — NestJS + MySQL
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Remove as dependências de desenvolvimento para a imagem final
RUN npm prune --omit=dev

FROM node:22-alpine AS run
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

USER node
EXPOSE 4000

# O schema do banco é aplicado pelo SchemaService no boot (idempotente),
# então não há passo de migração separado.
CMD ["node", "dist/main.js"]
