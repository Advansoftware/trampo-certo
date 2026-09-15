'use client';

import { useCallback } from 'react';
import { adminApi } from '@/lib/api';
import { Plano, StatusUsuario, UsuarioAdmin } from '@/types';
import { useApiResource } from './useApiResource';

/** Listagem administrativa com plano, bloqueio e exclusão de usuários. */
export function useAdminUsuarios(habilitado = true) {
  const listar = useCallback(() => adminApi.usuarios(), []);
  const recurso = useApiResource<UsuarioAdmin[]>(listar, [], habilitado);
  const { setData } = recurso;

  const trocarPlano = useCallback(
    async (id: string, plano: Plano) => {
      const usuario = await adminApi.atualizar(id, { plano });
      setData((anterior) => anterior.map((item) => (item.id === id ? usuario : item)));
      return usuario;
    },
    [setData],
  );

  const trocarStatus = useCallback(
    async (id: string, status: StatusUsuario) => {
      const usuario = await adminApi.atualizar(id, { status });
      setData((anterior) => anterior.map((item) => (item.id === id ? usuario : item)));
      return usuario;
    },
    [setData],
  );

  const excluir = useCallback(
    async (id: string) => {
      await adminApi.excluir(id);
      setData((anterior) => anterior.filter((item) => item.id !== id));
    },
    [setData],
  );

  return { ...recurso, usuarios: recurso.data, trocarPlano, trocarStatus, excluir };
}
