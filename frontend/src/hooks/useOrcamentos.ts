'use client';

import { useCallback } from 'react';
import { orcamentosApi } from '@/lib/api';
import { Orcamento, OrcamentoStatus } from '@/types';
import { useApiResource } from './useApiResource';

export function useOrcamentos() {
  const listar = useCallback(() => orcamentosApi.listar(), []);
  const recurso = useApiResource<Orcamento[]>(listar, []);
  const { setData } = recurso;

  /**
   * Persiste primeiro e só então atualiza a lista com o registro devolvido:
   * assim a tela nunca exibe um status que o servidor recusou.
   */
  const alterarStatus = useCallback(
    async (id: string, status: OrcamentoStatus) => {
      const atualizado = await orcamentosApi.alterarStatus(id, status);
      setData((anterior) => anterior.map((item) => (item.id === id ? atualizado : item)));
      return atualizado;
    },
    [setData],
  );

  const remover = useCallback(
    async (id: string) => {
      await orcamentosApi.remover(id);
      setData((anterior) => anterior.filter((item) => item.id !== id));
    },
    [setData],
  );

  return { ...recurso, orcamentos: recurso.data, alterarStatus, remover };
}
