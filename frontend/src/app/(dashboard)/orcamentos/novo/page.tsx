'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LockIcon from '@mui/icons-material/Lock';
import OrcamentoBreadcrumbHeader from '@/components/orcamentos/OrcamentoBreadcrumbHeader';
import OrcamentoLeftForm from '@/components/orcamentos/OrcamentoLeftForm';
import OrcamentoA4Preview, { OrcamentoPreviewItem } from '@/components/orcamentos/OrcamentoA4Preview';
import OrcamentoBottomDock from '@/components/orcamentos/OrcamentoBottomDock';
import AppButton from '@/components/common/AppButton';
import NovoClienteModal from '@/components/clientes/NovoClienteModal';
import { createOrcamento, getOrcamentoById, updateOrcamento, fetchClientes } from '@/lib/api';

const emptyItens: OrcamentoPreviewItem[] = [
  {
    id: '1',
    descricao: '',
    subDescricao: '',
    qtd: 1,
    unidade: 'un',
    unitario: 0,
  },
];

function CriadorOrcamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [codigo, setCodigo] = useState('042');
  const [isEditing, setIsEditing] = useState(false);
  const [lockedReason, setLockedReason] = useState<'aprovado' | 'recusado' | null>(null);

  // Clientes para listagem e seleção
  const [clientes, setClientes] = useState<any[]>([]);
  const [modalNovoClienteOpen, setModalNovoClienteOpen] = useState(false);
  const [novoClienteInitialName, setNovoClienteInitialName] = useState('');

  // Form State: Em branco para um novo orçamento
  const [clienteNome, setClienteNome] = useState('');
  const [clienteTelefone, setClienteTelefone] = useState('');
  const [clienteLocalizacao, setClienteLocalizacao] = useState('');

  const [itens, setItens] = useState<OrcamentoPreviewItem[]>(emptyItens);
  const [desconto, setDesconto] = useState<number>(0);

  const [condicoesPagamento, setCondicoesPagamento] = useState('50% de entrada no aceite + 50% na conclusão da entrega');
  const [chavePix, setChavePix] = useState('rodrigo.silva@email.com (Banco Inter)');
  const [validade, setValidade] = useState('Válido por 10 dias');
  const [observacoes, setObservacoes] = useState(
    'Garantia técnica de 90 dias após conclusão do serviço. Materiais inclusos de 1ª linha com certificação INMETRO.',
  );

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  // Carregar lista de clientes
  useEffect(() => {
    fetchClientes().then((data) => {
      if (Array.isArray(data)) {
        setClientes(data);
      }
    });
  }, []);

  // Carregar dados de edição se houver id na URL
  useEffect(() => {
    async function loadData() {
      // 1. MODO EDIÇÃO: Apenas se houver editId explícito na URL
      if (editId) {
        let targetItem: any = null;

        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem('trampo_edit_orcamento');
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              if (parsed.id === editId) {
                targetItem = parsed;
              }
            } catch {}
          }
        }

        if (!targetItem) {
          targetItem = await getOrcamentoById(editId);
        }

        if (targetItem) {
          setIsEditing(true);
          if (targetItem.codigo) {
            setCodigo(targetItem.codigo.replace(/\D/g, '') || targetItem.codigo);
          }
          if (targetItem.clienteNome) setClienteNome(targetItem.clienteNome);
          if (targetItem.clienteTelefone) setClienteTelefone(targetItem.clienteTelefone);
          if (targetItem.clienteLocalizacao) setClienteLocalizacao(targetItem.clienteLocalizacao);
          if (targetItem.condicoesPagamento) setCondicoesPagamento(targetItem.condicoesPagamento);
          if (targetItem.chavePix) setChavePix(targetItem.chavePix);
          if (targetItem.validade) setValidade(targetItem.validade);
          if (targetItem.observacoes) setObservacoes(targetItem.observacoes);
          if (targetItem.desconto !== undefined) setDesconto(targetItem.desconto);

          if (Array.isArray(targetItem.itens) && targetItem.itens.length > 0) {
            setItens(
              targetItem.itens.map((it: any, idx: number) => ({
                id: it.id || String(idx + 1),
                descricao: it.descricao || '',
                subDescricao: it.subDescricao || '',
                qtd: it.qtd || 1,
                unidade: it.unidade || 'un',
                unitario: it.unitario || 0,
              }))
            );
          }

          // Regra de bloqueio: nem aprovado nem recusado podem ser editados
          const statusLower = (targetItem.status || '').toLowerCase();
          if (statusLower === 'aprovado' || statusLower.includes('recibo') || statusLower === 'concluido') {
            setLockedReason('aprovado');
          } else if (statusLower === 'recusado') {
            setLockedReason('recusado');
          } else {
            setLockedReason(null);
          }
          return;
        }
      }

      // 2. MODO NOVO ORÇAMENTO: Formulário limpo e desbloqueado
      setIsEditing(false);
      setLockedReason(null);

      // Limpar cache residual de edição no localStorage para não vazar nenhum dado
      if (typeof window !== 'undefined') {
        localStorage.removeItem('trampo_edit_orcamento');
      }

      setClienteNome('');
      setClienteTelefone('');
      setClienteLocalizacao('');
      setItens(emptyItens);
      setDesconto(0);

      // Gerar código sequencial novo para a proposta
      setCodigo(String(Math.floor(100 + Math.random() * 900)));

      // Se veio da tela de clientes com cliente já selecionado
      if (typeof window !== 'undefined') {
        const clientePreFill = localStorage.getItem('trampo_novo_orcamento_cliente');
        if (clientePreFill) {
          try {
            const cli = JSON.parse(clientePreFill);
            if (cli.clienteNome) setClienteNome(cli.clienteNome);
            if (cli.clienteTelefone) setClienteTelefone(cli.clienteTelefone);
            if (cli.clienteLocalizacao) setClienteLocalizacao(cli.clienteLocalizacao);
            localStorage.removeItem('trampo_novo_orcamento_cliente');
          } catch {}
        }
      }
    }

    loadData();
  }, [editId]);

  // Calculations
  const subtotal = itens.reduce((acc, item) => acc + item.qtd * item.unitario, 0);
  const total = Math.max(0, subtotal - desconto);

  const handleAddItem = () => {
    if (lockedReason) return;
    setItens([
      ...itens,
      {
        id: String(Date.now()),
        descricao: '',
        qtd: 1,
        unidade: 'un',
        unitario: 0,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (lockedReason) return;
    if (itens.length > 1) {
      setItens(itens.filter((item) => item.id !== id));
    }
  };

  const handleItemChange = (id: string, field: keyof OrcamentoPreviewItem, value: any) => {
    if (lockedReason) return;
    setItens(
      itens.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      }),
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastOpen(true);
  };

  const handleSave = async () => {
    if (lockedReason === 'aprovado') {
      showToast('Este orçamento está aprovado e protegido contra alterações.');
      return;
    }
    if (lockedReason === 'recusado') {
      showToast('Este orçamento foi recusado e não pode ser alterado.');
      return;
    }

    const payload = {
      clienteNome,
      clienteTelefone,
      clienteLocalizacao,
      servicoDescricao: itens.map((i) => i.descricao).filter(Boolean).join('; '),
      valorTotal: total,
      desconto,
      condicoesPagamento,
      chavePix,
      validade,
      observacoes,
      itens: itens.map((i) => ({
        id: i.id,
        descricao: i.descricao,
        subDescricao: i.subDescricao,
        qtd: i.qtd,
        unidade: i.unidade,
        unitario: i.unitario,
        total: i.qtd * i.unitario,
      })),
    };

    if (isEditing && editId) {
      await updateOrcamento(editId, payload);
      showToast('Alterações salvas com sucesso! Redirecionando...');
      setTimeout(() => {
        router.push('/orcamentos');
      }, 1200);
    } else {
      await createOrcamento(payload);
      showToast('Novo orçamento salvo com sucesso no painel!');
      setTimeout(() => {
        router.push('/orcamentos');
      }, 1200);
    }
  };

  const handleCopyLink = () => {
    const url = `https://trampocerto.com.br/proposta/orc-${codigo}`;
    navigator.clipboard.writeText(url);
    showToast('Link público copiado para a área de transferência!');
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const texto = encodeURIComponent(
      `Olá ${clienteNome}! 👋 Segue a proposta comercial detalhada da TrampoCerto (Orçamento #${codigo}):\n\n` +
      `🛠️ *Serviços Orçados:*\n` +
      itens.map((i) => `• ${i.descricao} (${i.qtd} ${i.unidade || 'un'} x R$ ${i.unitario.toFixed(2)}) = R$ ${(i.qtd * i.unitario).toFixed(2)}`).join('\n') +
      `\n\n💰 *Subtotal:* R$ ${subtotal.toFixed(2)}\n` +
      (desconto > 0 ? `🏷️ *Desconto Especial:* - R$ ${desconto.toFixed(2)}\n` : '') +
      `✅ *Total Geral:* R$ ${total.toFixed(2)}\n` +
      `💳 *Condições:* ${condicoesPagamento}\n` +
      `📅 *Validade:* ${validade}\n\n` +
      `🔗 Acesse a proposta completa em PDF: https://trampocerto.com.br/proposta/orc-${codigo}\n\n` +
      `Fico à disposição para iniciarmos o trampo!`,
    );
    const tel = clienteTelefone.replace(/\D/g, '');
    window.open(`https://wa.me/55${tel}?text=${texto}`, '_blank');
  };

  const handleSelectCliente = (cli: any) => {
    setClienteNome(cli.nome || '');
    setClienteTelefone(cli.telefone || '');
    setClienteLocalizacao(
      cli.cidade ? `${cli.bairro ? cli.bairro + ', ' : ''}${cli.cidade}` : ''
    );
  };

  const handleOpenNovoCliente = (nameToPreFill?: string) => {
    setNovoClienteInitialName(nameToPreFill || '');
    setModalNovoClienteOpen(true);
  };

  const handleClienteCreated = (newCli: any) => {
    setClientes((prev) => [newCli, ...prev]);
    setClienteNome(newCli.nome || '');
    setClienteTelefone(newCli.telefone || '');
    setClienteLocalizacao(
      newCli.cidade ? `${newCli.bairro ? newCli.bairro + ', ' : ''}${newCli.cidade}` : ''
    );
    showToast(`Cliente "${newCli.nome}" cadastrado e selecionado com sucesso!`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pb: { xs: 14, md: 12 } }}>
      {/* 1. Breadcrumb Topbar & Auto-save Status */}
      <OrcamentoBreadcrumbHeader codigo={codigo} isEditing={isEditing} />

      {/* Banner de Bloqueio se Aprovado ou Recusado */}
      {lockedReason && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            px: 2.5,
            borderRadius: '16px',
            bgcolor: lockedReason === 'aprovado' ? '#EFF6FF' : '#FEF2F2',
            border: lockedReason === 'aprovado' ? '1px solid #BFDBFE' : '1px solid #FECACA',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LockIcon sx={{ color: lockedReason === 'aprovado' ? '#1E3A8A' : '#DC2626', fontSize: 20 }} />
            <Box>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: lockedReason === 'aprovado' ? '#1E3A8A' : '#991B1B' }}>
                {lockedReason === 'aprovado'
                  ? 'Orçamento Aprovado (Modo Somente Leitura)'
                  : 'Orçamento Recusado (Modo Somente Leitura)'}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: lockedReason === 'aprovado' ? '#3B82F6' : '#B91C1C' }}>
                {lockedReason === 'aprovado'
                  ? 'Após o cliente aprovar o orçamento, ele fica protegido contra edições para garantir integridade fiscal.'
                  : 'Este orçamento foi recusado/reprovado e não aceita mais edições.'}
              </Typography>
            </Box>
          </Box>
          <AppButton
            variant="outlined"
            size="small"
            onClick={() => router.push('/orcamentos')}
            sx={{ flexShrink: 0, fontSize: '0.75rem' }}
          >
            Voltar para Orçamentos
          </AppButton>
        </Box>
      )}

      {/* 2. Main 2-Column Split Layout (50% Form / 50% Live A4 Preview) */}
      <Grid container spacing={3.5} sx={{ alignItems: 'flex-start' }}>
        {/* Left Column: Form & Configuration */}
        <Grid size={{ xs: 12, lg: 6 }} data-print-hide="true">
          <OrcamentoLeftForm
            codigo={codigo}
            isEditing={isEditing}
            isLocked={!!lockedReason}
            clienteNome={clienteNome}
            clienteTelefone={clienteTelefone}
            clienteLocalizacao={clienteLocalizacao}
            clientes={clientes}
            onSelectCliente={handleSelectCliente}
            onOpenNovoClienteModal={handleOpenNovoCliente}
            onClienteNomeChange={setClienteNome}
            onClienteTelefoneChange={setClienteTelefone}
            onClienteLocalizacaoChange={setClienteLocalizacao}
            itens={itens}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onItemChange={handleItemChange}
            subtotal={subtotal}
            desconto={desconto}
            onDescontoChange={setDesconto}
            total={total}
            condicoesPagamento={condicoesPagamento}
            onCondicoesChange={setCondicoesPagamento}
            chavePix={chavePix}
            onChavePixChange={setChavePix}
            validade={validade}
            onValidadeChange={setValidade}
            observacoes={observacoes}
            onObservacoesChange={setObservacoes}
          />
        </Grid>

        {/* Right Column: Realistic Live A4 Sheet Preview (Sticky idêntico ao Stitch) */}
        <Grid
          size={{ xs: 12, lg: 6 }}
          sx={{
            alignSelf: 'stretch',
          }}
        >
          <Box
            sx={{
              position: { lg: 'sticky' },
              top: 96,
              zIndex: 10,
            }}
          >
            <OrcamentoA4Preview
              codigo={codigo}
              clienteNome={clienteNome}
              clienteTelefone={clienteTelefone}
              clienteLocalizacao={clienteLocalizacao}
              itens={itens}
              subtotal={subtotal}
              desconto={desconto}
              total={total}
              condicoesPagamento={condicoesPagamento}
              chavePix={chavePix}
              validade={validade}
              observacoes={observacoes}
            />
          </Box>
        </Grid>
      </Grid>

      {/* 3. FIXED BOTTOM FLOATING ACTION DOCK */}
      <OrcamentoBottomDock
        total={total}
        codigo={codigo}
        prazo="2 dias úteis"
        isEditing={isEditing}
        isLocked={!!lockedReason}
        onSaveTemplate={handleSave}
        onCopyLink={handleCopyLink}
        onDownloadPdf={handleDownloadPdf}
        onSendWhatsApp={handleSendWhatsApp}
      />

      {/* Toast Feedback */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          sx={{
            bgcolor: '#FFFFFF',
            color: '#1A1B20',
            border: '1px solid rgba(196, 198, 207, 0.4)',
            boxShadow: '0 8px 24px rgba(30, 41, 59, 0.12)',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>

      {/* Modal para Cadastro Rápido de Novo Cliente */}
      <NovoClienteModal
        open={modalNovoClienteOpen}
        initialNome={novoClienteInitialName}
        onClose={() => setModalNovoClienteOpen(false)}
        onClienteCreated={handleClienteCreated}
      />
    </Box>
  );
}

export default function CriadorOrcamentoPage() {
  return (
    <Suspense fallback={<Box sx={{ p: 4 }}>Carregando orçamentador...</Box>}>
      <CriadorOrcamentoContent />
    </Suspense>
  );
}

