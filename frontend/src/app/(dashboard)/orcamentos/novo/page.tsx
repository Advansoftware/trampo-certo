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
import { createOrcamento, getOrcamentoById, updateOrcamento } from '@/lib/api';

const defaultItens: OrcamentoPreviewItem[] = [
  {
    id: '1',
    descricao: 'Instalação de rede elétrica e 8 pontos de tomada',
    subDescricao: 'Mão de obra técnica qualificada',
    qtd: 1,
    unidade: 'un',
    unitario: 850,
  },
  {
    id: '2',
    descricao: 'Quadro de distribuição trifásico com disjuntores DIN',
    subDescricao: 'Montagem, barramentos e identificação de circuitos',
    qtd: 1,
    unidade: 'un',
    unitario: 650,
  },
  {
    id: '3',
    descricao: 'Passagem de cabos de rede estruturada Cat6',
    subDescricao: 'Conectorização RJ45 e testes de continuidade',
    qtd: 50,
    unidade: 'm',
    unitario: 7,
  },
];

function CriadorOrcamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [codigo, setCodigo] = useState('042');
  const [isEditing, setIsEditing] = useState(false);
  const [lockedReason, setLockedReason] = useState<'aprovado' | 'recusado' | null>(null);

  // Form State (matching Stitch Prototype 1:1)
  const [clienteNome, setClienteNome] = useState('Juliana Mendes');
  const [clienteTelefone, setClienteTelefone] = useState('(11) 98765-4321');
  const [clienteLocalizacao, setClienteLocalizacao] = useState('São Paulo - SP (Pinheiros)');

  const [itens, setItens] = useState<OrcamentoPreviewItem[]>(defaultItens);
  const [desconto, setDesconto] = useState<number>(50);

  const [condicoesPagamento, setCondicoesPagamento] = useState('50% de entrada no aceite + 50% na conclusão da entrega');
  const [chavePix, setChavePix] = useState('rodrigo.silva@email.com (Banco Inter)');
  const [validade, setValidade] = useState('Válido por 10 dias (até 28/10/2024)');
  const [observacoes, setObservacoes] = useState(
    'Garantia técnica de 90 dias após conclusão do serviço. Materiais inclusos de 1ª linha com certificação INMETRO.',
  );

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  // Carregar dados de edição se houver id
  useEffect(() => {
    async function loadEditData() {
      let targetItem: any = null;

      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('trampo_edit_orcamento');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (!editId || parsed.id === editId) {
              targetItem = parsed;
            }
          } catch {}
        }
      }

      if (!targetItem && editId) {
        targetItem = await getOrcamentoById(editId);
      }

      // Se não for edição, verificar se veio da tela de clientes para novo orçamento
      if (!editId && typeof window !== 'undefined') {
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
      }
    }

    loadEditData();
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
            clienteNome={clienteNome}
            clienteTelefone={clienteTelefone}
            clienteLocalizacao={clienteLocalizacao}
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

