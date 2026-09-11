/**
 * Resolve a URL pública da API.
 *
 * Ordem de prioridade:
 * 1. `window.__TRAMPO_API_URL__` — injetada pelo layout raiz a partir de `API_URL`
 *    do servidor, em cada requisição. É o que permite trocar o endereço da API no
 *    Coolify sem reconstruir a imagem do frontend.
 * 2. `NEXT_PUBLIC_API_URL` — valor fixado em tempo de build (dev local).
 * 3. Mesma origem — útil quando um proxy publica API e app no mesmo domínio.
 */
declare global {
  interface Window {
    __TRAMPO_API_URL__?: string;
  }
}

function semBarraFinal(url: string): string {
  return url.replace(/\/+$/, '');
}

export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined' && window.__TRAMPO_API_URL__) {
    return semBarraFinal(window.__TRAMPO_API_URL__);
  }
  return semBarraFinal(process.env.NEXT_PUBLIC_API_URL || '');
}

/** Base do Better Auth — mesmo host da API, que expõe /api/auth/*. */
export function getAuthBaseUrl(): string {
  const explicita = semBarraFinal(process.env.NEXT_PUBLIC_BETTER_AUTH_URL || '');
  if (explicita) return explicita;

  const api = getApiBaseUrl();
  if (api) return api;

  // Sem URL configurada, a API responde no mesmo domínio (proxy do Next).
  return typeof window !== 'undefined' ? window.location.origin : '';
}

/** Valor lido no servidor para ser injetado no HTML (ver app/layout.tsx). */
export function getServerApiUrl(): string {
  return semBarraFinal(process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '');
}
