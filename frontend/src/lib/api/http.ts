const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  /** Sessão ausente/expirada — o app deve mandar o usuário para o login. */
  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  /** Regra de negócio recusou a operação (ex.: orçamento aprovado). */
  get isConflict(): boolean {
    return this.status === 409;
  }
}

async function extractError(response: Response): Promise<string> {
  try {
    const data: unknown = await response.json();
    if (data && typeof data === 'object' && 'message' in data) {
      const { message } = data as { message: unknown };
      if (Array.isArray(message)) return message.join(', ');
      if (typeof message === 'string') return message;
    }
  } catch {
    // resposta sem corpo JSON
  }
  return `Falha na requisição (HTTP ${response.status}).`;
}

/**
 * Cliente HTTP único do app.
 *
 * Sempre envia o cookie de sessão do Better Auth, nunca cacheia e converte
 * erro em `ApiError` — não existe fallback para dado local: se a API falhou,
 * a tela mostra o erro em vez de exibir número inventado.
 */
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    cache: 'no-store',
    credentials: 'include',
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, await extractError(response));
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const http = {
  get: <T>(path: string) => apiFetch<T>(path),
  post: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body: unknown) =>
    apiFetch<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T = void>(path: string) => apiFetch<T>(path, { method: 'DELETE' }),
};

export { API_BASE };
