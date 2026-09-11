'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Toast from '@/components/common/Toast';
import EstadoCarregamento from '@/components/common/EstadoCarregamento';
import NovoClienteModal from '@/components/clientes/NovoClienteModal';
import { useClientes } from '@/hooks/useClientes';
import { useToast } from '@/hooks/useToast';
import { Cliente } from '@/types';
import OrcamentoBreadcrumbHeader from '../OrcamentoBreadcrumbHeader';
import OrcamentoA4Preview from '../OrcamentoA4Preview';
import OrcamentoBottomDock from '../OrcamentoBottomDock';
import { abrirWhatsApp, mensagemPropostaDetalhada } from '../tabela/mensagemWhatsApp';
import BannerBloqueio from './BannerBloqueio';
import OrcamentoLeftForm from './OrcamentoLeftForm';
import { useOrcamentoEditor } from './useOrcamentoEditor';

const BASE_PROPOSTA = 'https://trampocerto.com.br/proposta';

/** Tela de criação/edição de proposta: formulário à esquerda, A4 ao vivo à direita. */
export default function EditorOrcamento() {
  const editor = useOrcamentoEditor();
  const { clientes, criar: criarCliente } = useClientes();
  const { toast, showToast, hideToast } = useToast();

  const [modalClienteAberto, setModalClienteAberto] = React.useState(false);
  const [nomeInicialCliente, setNomeInicialCliente] = React.useState('');

  const abrirCadastroCliente = (nomeInicial: string) => {
    setNomeInicialCliente(nomeInicial);
    setModalClienteAberto(true);
  };

  const aoCriarCliente = (cliente: Cliente) => {
    editor.cliente.selecionar(cliente);
    showToast(`Cliente "${cliente.nome}" cadastrado e selecionado.`);
  };

  const salvar = async () => {
    const salvo = await editor.salvar((mensagem) => showToast(mensagem, 'error'));
    if (!salvo) return;

    showToast(
      editor.editando ? 'Alterações salvas com sucesso!' : `Orçamento ${salvo.codigo} salvo com sucesso!`,
    );
    setTimeout(() => editor.router.push('/orcamentos'), 1200);
  };

  const copiarLink = async () => {
    if (!editor.orcamentoId) {
      showToast('Salve o orçamento antes de compartilhar o link.', 'warning');
      return;
    }
    await navigator.clipboard.writeText(`${BASE_PROPOSTA}/${editor.orcamentoId}`);
    showToast('Link público copiado para a área de transferência!');
  };

  const enviarWhatsApp = () => {
    abrirWhatsApp(
      editor.cliente.telefone,
      mensagemPropostaDetalhada({
        codigo: editor.codigo || 'Nova proposta',
        clienteNome: editor.cliente.nome,
        itens: editor.itens,
        subtotal: editor.subtotal,
        desconto: editor.desconto,
        total: editor.total,
        condicoesPagamento: editor.condicoesPagamento,
        validade: editor.validade,
        propostaId: editor.orcamentoId ?? undefined,
      }),
    );
  };

  if (editor.carregando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#1E3A8A' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pb: { xs: 14, md: 12 } }}>
      <OrcamentoBreadcrumbHeader
        codigo={editor.codigo}
        isEditing={editor.editando}
        atualizadoEm={editor.atualizadoEm}
      />

      <EstadoCarregamento loading={false} error={editor.erroCarregamento} onRetry={() => editor.router.refresh()}>
        <>
          <BannerBloqueio motivo={editor.bloqueio} onVoltar={() => editor.router.push('/orcamentos')} />

          <Grid container spacing={3.5} sx={{ alignItems: 'flex-start' }}>
            <Grid size={{ xs: 12, lg: 6 }} data-print-hide="true">
              <OrcamentoLeftForm
                codigo={editor.codigo}
                editando={editor.editando}
                bloqueado={editor.bloqueado}
                clientes={clientes}
                cliente={editor.cliente}
                onCadastrarNovoCliente={abrirCadastroCliente}
                itens={editor.itens}
                onAdicionarItem={editor.adicionarItem}
                onRemoverItem={editor.removerItem}
                onAlterarItem={editor.alterarItem}
                subtotal={editor.subtotal}
                desconto={editor.desconto}
                onDescontoChange={editor.setDesconto}
                total={editor.total}
                condicoesPagamento={editor.condicoesPagamento}
                onCondicoesChange={editor.setCondicoesPagamento}
                chavePix={editor.chavePix}
                onChavePixChange={editor.setChavePix}
                validade={editor.validade}
                onValidadeChange={editor.setValidade}
                observacoes={editor.observacoes}
                onObservacoesChange={editor.setObservacoes}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }} sx={{ alignSelf: 'stretch' }}>
              <Box sx={{ position: { lg: 'sticky' }, top: 96, zIndex: 10 }}>
                <OrcamentoA4Preview
                  codigo={editor.codigo}
                  dataEmissao={editor.dataEmissao}
                  clienteNome={editor.cliente.nome}
                  clienteTelefone={editor.cliente.telefone}
                  clienteLocalizacao={editor.cliente.localizacao}
                  itens={editor.itens}
                  subtotal={editor.subtotal}
                  desconto={editor.desconto}
                  total={editor.total}
                  condicoesPagamento={editor.condicoesPagamento}
                  chavePix={editor.chavePix}
                  validade={editor.validade}
                  observacoes={editor.observacoes}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      </EstadoCarregamento>

      <OrcamentoBottomDock
        total={editor.total}
        codigo={editor.codigo}
        isEditing={editor.editando}
        isLocked={editor.bloqueado || editor.salvando}
        onSaveTemplate={() => void salvar()}
        onCopyLink={() => void copiarLink()}
        onDownloadPdf={() => window.print()}
        onSendWhatsApp={enviarWhatsApp}
      />

      <Toast message={toast.message} severity={toast.severity} onClose={hideToast} />

      <NovoClienteModal
        open={modalClienteAberto}
        initialNome={nomeInicialCliente}
        onClose={() => setModalClienteAberto(false)}
        onCriarCliente={criarCliente}
        onClienteCriado={aoCriarCliente}
      />
    </Box>
  );
}
