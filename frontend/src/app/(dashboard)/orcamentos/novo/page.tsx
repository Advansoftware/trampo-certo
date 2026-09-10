'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import OrcamentoBreadcrumbHeader from '@/components/orcamentos/OrcamentoBreadcrumbHeader';
import OrcamentoLeftForm from '@/components/orcamentos/OrcamentoLeftForm';
import OrcamentoA4Preview, { OrcamentoPreviewItem } from '@/components/orcamentos/OrcamentoA4Preview';
import OrcamentoBottomDock from '@/components/orcamentos/OrcamentoBottomDock';
import { createOrcamento } from '@/lib/api';

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

export default function CriadorOrcamentoPage() {
  const router = useRouter();

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

  // Calculations
  const subtotal = itens.reduce((acc, item) => acc + item.qtd * item.unitario, 0);
  const total = Math.max(0, subtotal - desconto);

  const handleAddItem = () => {
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
    if (itens.length > 1) {
      setItens(itens.filter((item) => item.id !== id));
    }
  };

  const handleItemChange = (id: string, field: keyof OrcamentoPreviewItem, value: any) => {
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

  const handleSaveTemplate = async () => {
    const payload = {
      clienteNome,
      clienteTelefone,
      servicoDescricao: itens.map((i) => i.descricao).filter(Boolean).join('; '),
      valorTotal: total,
      condicoesPagamento,
      validadeDias: 10,
      itens: itens.map((i) => ({
        descricao: i.descricao,
        qtd: i.qtd,
        unitario: i.unitario,
        total: i.qtd * i.unitario,
      })),
    };
    await createOrcamento(payload);
    showToast('Modelo salvo com sucesso no seu painel!');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://trampocerto.com.br/proposta/orc-042');
    showToast('Link público copiado para a área de transferência!');
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const texto = encodeURIComponent(
      `Olá ${clienteNome}! 👋 Segue a proposta comercial detalhada da TrampoCerto (Orçamento #042):\n\n` +
      `🛠️ *Serviços Orçados:*\n` +
      itens.map((i) => `• ${i.descricao} (${i.qtd} ${i.unidade || 'un'} x R$ ${i.unitario.toFixed(2)}) = R$ ${(i.qtd * i.unitario).toFixed(2)}`).join('\n') +
      `\n\n💰 *Subtotal:* R$ ${subtotal.toFixed(2)}\n` +
      (desconto > 0 ? `🏷️ *Desconto Especial:* - R$ ${desconto.toFixed(2)}\n` : '') +
      `✅ *Total Geral:* R$ ${total.toFixed(2)}\n` +
      `💳 *Condições:* ${condicoesPagamento}\n` +
      `📅 *Validade:* ${validade}\n\n` +
      `🔗 Acesse a proposta completa em PDF: https://trampocerto.com.br/proposta/orc-042\n\n` +
      `Fico à disposição para iniciarmos o trampo!`,
    );
    const tel = clienteTelefone.replace(/\D/g, '');
    window.open(`https://wa.me/55${tel}?text=${texto}`, '_blank');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pb: { xs: 14, md: 12 } }}>
      {/* 1. Breadcrumb Topbar & Auto-save Status */}
      <OrcamentoBreadcrumbHeader codigo="042" />

      {/* 2. Main 2-Column Split Layout (50% Form / 50% Live A4 Preview) */}
      <Grid container spacing={3.5} sx={{ alignItems: 'flex-start' }}>
        {/* Left Column: Form & Configuration */}
        <Grid size={{ xs: 12, lg: 6 }} data-print-hide="true">
          <OrcamentoLeftForm
            codigo="042"
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
            position: { lg: 'sticky' },
            top: 96,
            alignSelf: 'flex-start',
            zIndex: 10,
          }}
        >
          <OrcamentoA4Preview
            codigo="042"
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
        </Grid>
      </Grid>

      {/* 3. FIXED BOTTOM FLOATING ACTION DOCK */}
      <OrcamentoBottomDock
        total={total}
        codigo="042"
        prazo="2 dias úteis"
        onSaveTemplate={handleSaveTemplate}
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
