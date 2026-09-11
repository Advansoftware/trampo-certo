'use client';

import { useCallback } from 'react';
import { meiApi } from '@/lib/api';
import { DestaquesMensais, MeiMetrics, ReceitaMensal } from '@/types';
import { useApiResource } from './useApiResource';

export function useMeiMetrics(ano?: number, habilitado = true) {
  const carregar = useCallback(() => meiApi.metricas(ano), [ano]);
  const recurso = useApiResource<MeiMetrics | null>(carregar, null, habilitado);
  return { ...recurso, metrics: recurso.data };
}

export function useDestaquesMensais() {
  const carregar = useCallback(() => meiApi.destaques(), []);
  const recurso = useApiResource<DestaquesMensais | null>(carregar, null);
  return { ...recurso, destaques: recurso.data };
}

/** Relatório anual de receitas brutas + baixa da guia DAS. */
export function useReceitasMensais(ano?: number) {
  const carregar = useCallback(() => meiApi.receitasMensais(ano), [ano]);
  const recurso = useApiResource<ReceitaMensal[]>(carregar, []);
  const { setData } = recurso;

  const pagarDas = useCallback(
    async (competencia: string) => {
      const das = await meiApi.pagarDas(competencia);
      setData((anterior) =>
        anterior.map((mes) =>
          mes.competencia === competencia
            ? { ...mes, dasStatus: das.status, dasValor: das.valor, dasPagoEm: das.pagoEm }
            : mes,
        ),
      );
      return das;
    },
    [setData],
  );

  return { ...recurso, meses: recurso.data, pagarDas };
}
