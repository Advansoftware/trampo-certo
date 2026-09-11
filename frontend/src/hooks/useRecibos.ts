'use client';

import { useCallback } from 'react';
import { recibosApi } from '@/lib/api';
import { Recibo, ReciboInput } from '@/types';
import { useApiResource } from './useApiResource';

export function useRecibos() {
  const listar = useCallback(() => recibosApi.listar(), []);
  const recurso = useApiResource<Recibo[]>(listar, []);
  const { setData } = recurso;

  const emitir = useCallback(
    async (input: ReciboInput) => {
      const recibo = await recibosApi.criar(input);
      setData((anterior) => [recibo, ...anterior]);
      return recibo;
    },
    [setData],
  );

  return { ...recurso, recibos: recurso.data, emitir };
}
