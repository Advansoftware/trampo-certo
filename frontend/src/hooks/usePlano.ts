'use client';

import { useCallback } from 'react';
import { planosApi } from '@/lib/api';
import { ResumoPlano } from '@/types';
import { useApiResource } from './useApiResource';

/** Plano do usuário logado e quanto da cota do mês já foi usada. */
export function usePlano(habilitado = true) {
  const carregar = useCallback(() => planosApi.meu(), []);
  const recurso = useApiResource<ResumoPlano | null>(carregar, null, habilitado);
  return { ...recurso, resumo: recurso.data };
}

/** Quanto falta de um recurso; `null` em limite significa plano sem cota. */
export function restaNoPlano(resumo: ResumoPlano | null, recurso: 'orcamentos' | 'recibos') {
  if (!resumo) return { limitado: false, restante: null as number | null, esgotado: false };

  const limite = resumo.limites[recurso];
  if (limite === null) return { limitado: false, restante: null as number | null, esgotado: false };

  const restante = Math.max(0, limite - resumo.uso[recurso]);
  return { limitado: true, restante, esgotado: restante === 0 };
}
