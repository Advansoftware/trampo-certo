'use client';

import React, { createContext, useContext } from 'react';
import { PerfilMei } from '@/types';

const PerfilContext = createContext<PerfilMei | null>(null);

/**
 * Disponibiliza o perfil MEI autenticado para toda a área logada.
 *
 * Documentos (proposta A4, recibo) e o cabeçalho leem daqui em vez de
 * carregar nome, CNPJ e chave Pix fixos no código.
 */
export function PerfilProvider({
  perfil,
  children,
}: {
  perfil: PerfilMei | null;
  children: React.ReactNode;
}) {
  return <PerfilContext.Provider value={perfil}>{children}</PerfilContext.Provider>;
}

/** Perfil do usuário logado; null enquanto a requisição não retorna. */
export function usePerfilMei(): PerfilMei | null {
  return useContext(PerfilContext);
}

/** Campos do emissor prontos para os documentos, com rótulos neutros. */
export function useEmissor() {
  const perfil = usePerfilMei();
  return {
    nome: perfil?.name || 'Profissional MEI',
    ocupacao: perfil?.ocupacao || 'Serviços MEI',
    cnpj: perfil?.cnpj || '',
    telefone: perfil?.telefone || '',
    email: perfil?.email || '',
    cidade: perfil?.cidade || '',
    chavePix: perfil?.chavePix || '',
    iniciais: perfil?.avatarInitials || '',
  };
}
