'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Orcamento, OrcamentoStatus } from '@/types';
import { abrirWhatsApp, mensagemOrcamento } from './mensagemWhatsApp';

interface Opcoes {
  onAlterarStatus: (id: string, status: OrcamentoStatus) => Promise<unknown>;
  onSucesso?: (mensagem: string, status: OrcamentoStatus) => void;
  onErro?: (erro: unknown) => void;
}

/**
 * Ações de linha da tabela de orçamentos.
 *
 * A navegação para edição leva apenas o id na URL — a tela de edição busca o
 * registro completo na API. Nada de repassar o objeto por armazenamento local,
 * que perdia campos (chave Pix, validade, observações) no caminho.
 */
export function useAcoesOrcamento({ onAlterarStatus, onSucesso, onErro }: Opcoes) {
  const router = useRouter();
  const [preview, setPreview] = useState<Orcamento | null>(null);
  const [idEmProcessamento, setIdEmProcessamento] = useState<string | null>(null);

  const alterarStatus = useCallback(
    async (orcamento: Orcamento, status: OrcamentoStatus) => {
      setIdEmProcessamento(orcamento.id);
      try {
        await onAlterarStatus(orcamento.id, status);
        onSucesso?.(
          status === 'aprovado'
            ? 'Orçamento aprovado! A proposta agora está protegida contra alterações.'
            : 'Orçamento recusado.',
          status,
        );
      } catch (erro) {
        onErro?.(erro);
      } finally {
        setIdEmProcessamento(null);
      }
    },
    [onAlterarStatus, onSucesso, onErro],
  );

  return {
    preview,
    fecharPreview: useCallback(() => setPreview(null), []),
    idEmProcessamento,
    acoes: {
      onVisualizar: setPreview,
      onEditar: (orcamento: Orcamento) => router.push(`/orcamentos/novo?id=${orcamento.id}`),
      onWhatsApp: (orcamento: Orcamento) =>
        abrirWhatsApp(orcamento.clienteTelefone, mensagemOrcamento(orcamento)),
      onEmitirRecibo: (orcamento: Orcamento) => router.push(`/recibos?orcamento=${orcamento.id}`),
      onAprovar: (orcamento: Orcamento) => void alterarStatus(orcamento, 'aprovado'),
      onRecusar: (orcamento: Orcamento) => void alterarStatus(orcamento, 'recusado'),
    },
  };
}
