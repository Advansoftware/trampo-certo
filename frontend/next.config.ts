import type { NextConfig } from 'next';
import path from 'path';

/**
 * O app serve a API no mesmo domínio: /api/* é encaminhado para o backend pela
 * rede interna do Compose. Isso elimina CORS e cookie entre domínios — basta
 * publicar um único domínio no Coolify.
 *
 * O destino é resolvido no build (os rewrites do Next não são dinâmicos), por
 * isso aponta para o nome do serviço no Compose, que não muda entre instalações.
 * Defina API_PROXY_TARGET="" para desativar o proxy e falar direto com a API
 * (é o que o ambiente de desenvolvimento faz).
 */
const apiProxyTarget = (process.env.API_PROXY_TARGET ?? 'http://api:4000').replace(/\/+$/, '');

const nextConfig: NextConfig = {
  // Saída standalone: a imagem final roda `node server.js` sem node_modules completo.
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,

  async rewrites() {
    if (!apiProxyTarget) return [];
    return [
      {
        source: '/api/:path*',
        destination: `${apiProxyTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
