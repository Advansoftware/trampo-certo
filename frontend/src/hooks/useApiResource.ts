'use client';

import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '@/lib/api';

export interface ApiResource<T> {
  data: T;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setData: (valor: T | ((anterior: T) => T)) => void;
}

function mensagemDeErro(erro: unknown): string {
  return erro instanceof ApiError ? erro.message : 'Não foi possível carregar os dados.';
}

/**
 * Carrega um recurso da API mantendo estado de carregamento e erro.
 *
 * Sem fallback silencioso: se a chamada falha, `error` é preenchido e a tela
 * mostra o problema em vez de exibir dado antigo ou fabricado.
 *
 * `loader` deve vir memoizado (useCallback) — é ele que dispara o recarregamento
 * quando muda, por exemplo ao trocar o ano consultado.
 */
export function useApiResource<T>(
  loader: () => Promise<T>,
  valorInicial: T,
  /** Quando false, nada é buscado — usado enquanto a sessão não foi confirmada. */
  habilitado = true,
): ApiResource<T> {
  const [data, setData] = useState<T>(valorInicial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!habilitado) return;
    let ativo = true;

    loader()
      .then((resultado) => {
        if (!ativo) return;
        setData(resultado);
        setError(null);
      })
      .catch((erro: unknown) => {
        if (ativo) setError(mensagemDeErro(erro));
      })
      .finally(() => {
        if (ativo) setLoading(false);
      });

    return () => {
      ativo = false;
    };
  }, [loader, habilitado]);

  /** Recarrega sob demanda (botão "tentar novamente", após uma mutação). */
  const reload = useCallback(async () => {
    if (!habilitado) return;
    setLoading(true);
    setError(null);
    try {
      setData(await loader());
    } catch (erro) {
      setError(mensagemDeErro(erro));
    } finally {
      setLoading(false);
    }
  }, [loader, habilitado]);

  return { data, loading, error, reload, setData };
}
