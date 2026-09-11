'use client';

import { useMemo, useState } from 'react';
import { Orcamento } from '@/types';
import { FiltroStatus } from './statusOrcamento';

function correspondeAoFiltro(orcamento: Orcamento, filtro: FiltroStatus): boolean {
  if (filtro === 'todos') return true;
  if (filtro === 'pendente') return orcamento.status === 'pendente' || orcamento.status === 'rascunho';
  return orcamento.status === filtro;
}

function correspondeABusca(orcamento: Orcamento, termo: string): boolean {
  if (!termo) return true;
  const alvo = `${orcamento.clienteNome} ${orcamento.servicoDescricao} ${orcamento.codigo}`.toLowerCase();
  return alvo.includes(termo.toLowerCase());
}

/** Busca textual, filtro por status e contadores — compartilhado pelas duas telas. */
export function useFiltroOrcamentos(orcamentos: Orcamento[]) {
  const [termoBusca, setTermoBusca] = useState('');
  const [filtro, setFiltro] = useState<FiltroStatus>('todos');

  const contadores = useMemo(
    () => ({
      todos: orcamentos.length,
      pendente: orcamentos.filter((item) => correspondeAoFiltro(item, 'pendente')).length,
      aprovado: orcamentos.filter((item) => item.status === 'aprovado').length,
      recusado: orcamentos.filter((item) => item.status === 'recusado').length,
    }),
    [orcamentos],
  );

  const filtrados = useMemo(
    () =>
      orcamentos.filter(
        (item) => correspondeAoFiltro(item, filtro) && correspondeABusca(item, termoBusca),
      ),
    [orcamentos, filtro, termoBusca],
  );

  return { termoBusca, setTermoBusca, filtro, setFiltro, filtrados, contadores };
}
