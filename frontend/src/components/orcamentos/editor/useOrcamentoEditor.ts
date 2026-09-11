'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ApiError, clientesApi, orcamentosApi } from '@/lib/api';
import { usePerfilMei } from '@/components/providers/PerfilProvider';
import { Cliente, Orcamento, OrcamentoInput } from '@/types';
import { OrcamentoPreviewItem } from '../OrcamentoA4Preview';

export type MotivoBloqueio = 'aprovado' | 'recusado' | null;

const CONDICOES_PADRAO = '50% de entrada no aceite + 50% na conclusão da entrega';
const VALIDADE_PADRAO = 'Válido por 10 dias';
const OBSERVACOES_PADRAO =
  'Garantia técnica de 90 dias após a conclusão do serviço. Materiais inclusos conforme discriminado acima.';

function itemVazio(): OrcamentoPreviewItem {
  return { id: crypto.randomUUID(), descricao: '', subDescricao: '', qtd: 1, unidade: 'un', unitario: 0 };
}

function paraPreview(orcamento: Orcamento): OrcamentoPreviewItem[] {
  if (orcamento.itens.length === 0) return [itemVazio()];
  return orcamento.itens.map((item) => ({
    id: item.id,
    descricao: item.descricao,
    subDescricao: item.subDescricao ?? '',
    qtd: item.qtd,
    unidade: item.unidade,
    unitario: item.unitario,
  }));
}

/**
 * Estado do editor de propostas.
 *
 * Em modo edição o orçamento é buscado na API pelo id da URL — o formulário
 * nunca depende de dados carregados por outra tela, então nenhum campo
 * (chave Pix, validade, observações, desconto) chega faltando.
 */
export function useOrcamentoEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const perfil = usePerfilMei();

  const editId = searchParams.get('id');
  const clienteIdInicial = searchParams.get('clienteId');

  const [carregando, setCarregando] = useState(Boolean(editId || clienteIdInicial));
  const [salvando, setSalvando] = useState(false);
  const [erroCarregamento, setErroCarregamento] = useState<string | null>(null);
  const [bloqueio, setBloqueio] = useState<MotivoBloqueio>(null);
  const [codigo, setCodigo] = useState('');
  const [orcamentoId, setOrcamentoId] = useState<string | null>(editId);

  const [clienteId, setClienteId] = useState<string | null>(null);
  const [clienteNome, setClienteNome] = useState('');
  const [clienteTelefone, setClienteTelefone] = useState('');
  const [clienteLocalizacao, setClienteLocalizacao] = useState('');
  const [clienteDocumento, setClienteDocumento] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');

  const [itens, setItens] = useState<OrcamentoPreviewItem[]>([itemVazio()]);
  const [desconto, setDesconto] = useState(0);
  const [condicoesPagamento, setCondicoesPagamento] = useState(CONDICOES_PADRAO);
  // null = ainda não editada nesta sessão: exibe a chave Pix do perfil.
  const [chavePixEditada, setChavePixEditada] = useState<string | null>(null);
  const [validade, setValidade] = useState(VALIDADE_PADRAO);
  const [observacoes, setObservacoes] = useState(OBSERVACOES_PADRAO);
  const [dataEmissao, setDataEmissao] = useState<string | undefined>(undefined);
  const [atualizadoEm, setAtualizadoEm] = useState<string | undefined>(undefined);

  const editando = Boolean(editId);
  const bloqueado = bloqueio !== null;

  // Proposta nova já nasce com a chave Pix cadastrada no perfil MEI.
  const chavePix = chavePixEditada ?? (editando ? '' : perfil?.chavePix ?? '');
  const setChavePix = setChavePixEditada;

  const aplicarCliente = useCallback((cliente: Cliente) => {
    setClienteId(cliente.id);
    setClienteNome(cliente.nome);
    setClienteTelefone(cliente.telefone);
    setClienteDocumento(cliente.documento);
    setClienteEmail(cliente.email);
    setClienteLocalizacao([cliente.bairro, cliente.cidade].filter(Boolean).join(', '));
  }, []);

  const aplicarOrcamento = useCallback((orcamento: Orcamento) => {
    setOrcamentoId(orcamento.id);
    setCodigo(orcamento.codigo);
    setClienteId(orcamento.clienteId);
    setClienteNome(orcamento.clienteNome);
    setClienteTelefone(orcamento.clienteTelefone);
    setClienteDocumento(orcamento.clienteDocumento);
    setClienteEmail(orcamento.clienteEmail);
    setClienteLocalizacao(orcamento.clienteLocalizacao);
    setItens(paraPreview(orcamento));
    setDesconto(orcamento.desconto);
    setCondicoesPagamento(orcamento.condicoesPagamento || CONDICOES_PADRAO);
    setChavePixEditada(orcamento.chavePix);
    setValidade(orcamento.validade || VALIDADE_PADRAO);
    setObservacoes(orcamento.observacoes);
    setDataEmissao(orcamento.createdAt);
    setAtualizadoEm(orcamento.updatedAt);
    setBloqueio(
      orcamento.status === 'aprovado' ? 'aprovado' : orcamento.status === 'recusado' ? 'recusado' : null,
    );
  }, []);

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      if (!editId && !clienteIdInicial) return;
      setCarregando(true);
      setErroCarregamento(null);
      try {
        if (editId) {
          const orcamento = await orcamentosApi.buscar(editId);
          if (!cancelado) aplicarOrcamento(orcamento);
        } else if (clienteIdInicial) {
          const cliente = await clientesApi.buscar(clienteIdInicial);
          if (!cancelado) aplicarCliente(cliente);
        }
      } catch (erro) {
        if (!cancelado) {
          setErroCarregamento(
            erro instanceof ApiError ? erro.message : 'Não foi possível carregar o orçamento.',
          );
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    void carregar();
    return () => {
      cancelado = true;
    };
  }, [editId, clienteIdInicial, aplicarOrcamento, aplicarCliente]);

  const subtotal = useMemo(
    () => itens.reduce((acc, item) => acc + item.qtd * item.unitario, 0),
    [itens],
  );
  const total = Math.max(0, subtotal - desconto);

  const adicionarItem = useCallback(() => {
    if (bloqueado) return;
    setItens((atual) => [...atual, itemVazio()]);
  }, [bloqueado]);

  const removerItem = useCallback(
    (id: string) => {
      if (bloqueado) return;
      setItens((atual) => (atual.length > 1 ? atual.filter((item) => item.id !== id) : atual));
    },
    [bloqueado],
  );

  const alterarItem = useCallback(
    (id: string, campo: keyof OrcamentoPreviewItem, valor: string | number) => {
      if (bloqueado) return;
      setItens((atual) => atual.map((item) => (item.id === id ? { ...item, [campo]: valor } : item)));
    },
    [bloqueado],
  );

  const selecionarCliente = useCallback(
    (cliente: Cliente) => {
      if (bloqueado) return;
      aplicarCliente(cliente);
    },
    [bloqueado, aplicarCliente],
  );

  const montarPayload = useCallback(
    (): OrcamentoInput => ({
      clienteId,
      clienteNome,
      clienteTelefone,
      clienteEmail,
      clienteDocumento,
      clienteLocalizacao,
      servicoDescricao: itens.map((item) => item.descricao).filter(Boolean).join('; '),
      desconto,
      condicoesPagamento,
      chavePix,
      validade,
      observacoes,
      itens: itens.map((item) => ({
        id: item.id,
        descricao: item.descricao,
        subDescricao: item.subDescricao,
        qtd: item.qtd,
        unidade: item.unidade,
        unitario: item.unitario,
      })),
    }),
    [
      clienteId, clienteNome, clienteTelefone, clienteEmail, clienteDocumento, clienteLocalizacao,
      itens, desconto, condicoesPagamento, chavePix, validade, observacoes,
    ],
  );

  /** @returns o orçamento salvo, ou null quando a validação/API recusou. */
  const salvar = useCallback(
    async (onErro: (mensagem: string) => void): Promise<Orcamento | null> => {
      if (bloqueado) {
        onErro(
          bloqueio === 'aprovado'
            ? 'Este orçamento está aprovado e protegido contra alterações.'
            : 'Este orçamento foi recusado e não pode ser alterado.',
        );
        return null;
      }
      if (!clienteNome.trim()) {
        onErro('Informe o cliente antes de salvar a proposta.');
        return null;
      }
      if (!itens.some((item) => item.descricao.trim())) {
        onErro('Descreva ao menos um item do serviço.');
        return null;
      }

      setSalvando(true);
      try {
        const payload = montarPayload();
        const salvo = editId
          ? await orcamentosApi.atualizar(editId, payload)
          : await orcamentosApi.criar(payload);
        aplicarOrcamento(salvo);
        return salvo;
      } catch (erro) {
        onErro(erro instanceof ApiError ? erro.message : 'Não foi possível salvar o orçamento.');
        return null;
      } finally {
        setSalvando(false);
      }
    },
    [bloqueado, bloqueio, clienteNome, itens, montarPayload, editId, aplicarOrcamento],
  );

  return {
    router,
    editando,
    carregando,
    salvando,
    erroCarregamento,
    bloqueio,
    bloqueado,
    codigo,
    orcamentoId,
    dataEmissao,
    atualizadoEm,
    cliente: {
      id: clienteId,
      nome: clienteNome,
      telefone: clienteTelefone,
      localizacao: clienteLocalizacao,
      documento: clienteDocumento,
      email: clienteEmail,
      setNome: setClienteNome,
      setTelefone: setClienteTelefone,
      setLocalizacao: setClienteLocalizacao,
      selecionar: selecionarCliente,
    },
    itens,
    adicionarItem,
    removerItem,
    alterarItem,
    subtotal,
    desconto,
    setDesconto,
    total,
    condicoesPagamento,
    setCondicoesPagamento,
    chavePix,
    setChavePix,
    validade,
    setValidade,
    observacoes,
    setObservacoes,
    salvar,
  };
}

export type OrcamentoEditor = ReturnType<typeof useOrcamentoEditor>;
