# TrampoCerto Web — Next.js 16 em modo standalone
FROM node:22-alpine AS build
WORKDIR /app

# Dependências primeiro, para aproveitar o cache entre builds
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# NEXT_PUBLIC_* é embutido no bundle; serve como padrão quando API_URL não é
# informada em runtime. Em produção prefira API_URL (ver src/lib/runtime-config.ts).
ARG NEXT_PUBLIC_API_URL=""
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Destino do proxy /api/* — resolvido no build porque os rewrites do Next não
# são dinâmicos. É o nome do serviço da API na rede interna do Compose.
ARG API_PROXY_TARGET="http://api:4000"
ENV API_PROXY_TARGET=$API_PROXY_TARGET

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# O standalone traz o server.js e apenas as dependências realmente usadas;
# estáticos e /public precisam ser copiados à parte.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER node
EXPOSE 3000

CMD ["node", "server.js"]
