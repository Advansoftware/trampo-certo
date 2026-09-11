'use client';

import { useCallback } from 'react';
import { clientesApi } from '@/lib/api';
import { Cliente, ClienteInput } from '@/types';
import { useApiResource } from './useApiResource';

/** Carteira de clientes com criação e edição refletidas na lista em memória. */
export function useClientes() {
  const listar = useCallback(() => clientesApi.listar(), []);
  const recurso = useApiResource<Cliente[]>(listar, []);
  const { setData } = recurso;

  const criar = useCallback(
    async (input: ClienteInput) => {
      const cliente = await clientesApi.criar(input);
      setData((anterior) => [cliente, ...anterior]);
      return cliente;
    },
    [setData],
  );

  const atualizar = useCallback(
    async (id: string, input: Partial<ClienteInput>) => {
      const cliente = await clientesApi.atualizar(id, input);
      setData((anterior) => anterior.map((item) => (item.id === id ? cliente : item)));
      return cliente;
    },
    [setData],
  );

  const remover = useCallback(
    async (id: string) => {
      await clientesApi.remover(id);
      setData((anterior) => anterior.filter((item) => item.id !== id));
    },
    [setData],
  );

  return { ...recurso, clientes: recurso.data, criar, atualizar, remover };
}
