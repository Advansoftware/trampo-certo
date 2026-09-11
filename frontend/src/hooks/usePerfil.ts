'use client';

import { useCallback } from 'react';
import { usuariosApi } from '@/lib/api';
import { PerfilMei } from '@/types';
import { useApiResource } from './useApiResource';

/** Perfil MEI do usuário logado (cabeçalho, proposta A4, recibos). */
export function usePerfil(habilitado = true) {
  const carregar = useCallback(() => usuariosApi.perfil(), []);
  const recurso = useApiResource<PerfilMei | null>(carregar, null, habilitado);
  return { ...recurso, perfil: recurso.data };
}
