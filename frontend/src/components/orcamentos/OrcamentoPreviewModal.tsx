'use client';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AppButton from '@/components/common/AppButton';
import OrcamentoA4Preview from './OrcamentoA4Preview';
import { OrcamentoItemData } from './OrcamentosTable';

interface OrcamentoPreviewModalProps {
  open: boolean;
  onClose: () => void;
  orcamento: OrcamentoItemData | null;
}

export default function OrcamentoPreviewModal({
  open,
  onClose,
  orcamento,
}: OrcamentoPreviewModalProps) {
  if (!orcamento) return null;

  const isApproved =
    (orcamento.status || '').toLowerCase() === 'aprovado' ||
    (orcamento.status || '').toLowerCase().includes('recibo') ||
    (orcamento.status || '').toLowerCase() === 'concluido';

  const numTotal =
    typeof orcamento.valorTotal === 'number'
      ? orcamento.valorTotal
      : parseFloat(String(orcamento.valorTotal).replace(/[^\d.,]/g, '').replace(',', '.')) || 1450.0;

  // Garantir que haja itens formatados para o A4
  const itensFormatados =
    Array.isArray(orcamento.itens) && orcamento.itens.length > 0
      ? orcamento.itens.map((item, idx) => ({
          id: item.id || `item-${idx}`,
          descricao: item.descricao || 'Item do serviço',
          subDescricao: item.subDescricao,
          qtd: item.qtd || 1,
          unidade: item.unidade || 'un',
          unitario: item.unitario || item.total || numTotal,
        }))
      : [
          {
            id: 'item-1',
            descricao: orcamento.servicoDescricao || 'Serviços técnicos e mão de obra especializada MEI',
            qtd: 1,
            unidade: 'un',
            unitario: numTotal,
          },
        ];

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const valFormatted = numTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const texto = encodeURIComponent(
      `Olá ${orcamento.clienteNome}! 👋 Segue a proposta comercial da TrampoCerto (${orcamento.codigo || 'Orçamento'}):\n\n` +
      `🛠️ *Serviço:* ${orcamento.servicoDescricao || 'Serviços especializados'}\n` +
      `💰 *Valor Total:* R$ ${valFormatted}\n` +
      `📌 *Status:* ${isApproved ? '✅ Aprovado' : '⏳ Aguardando Aprovação'}\n\n` +
      `🔗 Visualize a folha original completa: https://trampocerto.com.br/proposta/${orcamento.id}\n\n` +
      `Fico à disposição!`,
    );

    const tel = (orcamento.clienteTelefone || '').replace(/\D/g, '');
    const url = tel ? `https://wa.me/55${tel}?text=${texto}` : `https://wa.me/?text=${texto}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
          },
        },
        paper: {
          sx: {
            borderRadius: '24px',
            bgcolor: '#F8F9FD',
            backgroundImage: 'none',
            boxShadow: '0 24px 48px -12px rgba(15, 23, 42, 0.25)',
            overflow: 'hidden',
            m: { xs: 1.5, sm: 3 },
            maxHeight: '92vh',
          },
        },
      }}
    >
      {/* Modal Top Bar */}
      <DialogTitle
        data-print-hide="true"
        sx={{
          p: { xs: 2, sm: 2.5 },
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Proposal Code Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 1.5,
              py: 0.5,
              borderRadius: '8px',
              bgcolor: '#DBEAFE',
              color: '#172554',
              fontFamily: 'monospace',
              fontSize: '0.8125rem',
              fontWeight: 800,
            }}
          >
            {orcamento.codigo || `#042`}
          </Box>

          {/* Status Badge */}
          {isApproved ? (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.5,
                py: 0.5,
                borderRadius: '9999px',
                bgcolor: '#DCFCE7',
                color: '#166534',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 15 }} />
              Aprovado
            </Box>
          ) : (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.5,
                py: 0.5,
                borderRadius: '9999px',
                bgcolor: '#FEF3C7',
                color: '#92400E',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 14 }} />
              Pendente de Aprovação
            </Box>
          )}
        </Box>

        {/* Action Controls & Close */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={handlePrint}
            title="Imprimir / Baixar PDF"
            sx={{
              bgcolor: '#F1F4F9',
              color: '#1A1B20',
              '&:hover': { bgcolor: '#E2E8F0', color: '#1E3A8A' },
            }}
          >
            <PrintIcon sx={{ fontSize: 19 }} />
          </IconButton>

          <IconButton
            onClick={handleWhatsApp}
            title="Compartilhar no WhatsApp"
            sx={{
              bgcolor: '#DCFCE7',
              color: '#15803D',
              '&:hover': { bgcolor: '#BBF7D0' },
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 19 }} />
          </IconButton>

          <IconButton
            onClick={onClose}
            title="Fechar visualização"
            sx={{
              bgcolor: '#F1F4F9',
              color: '#74777F',
              '&:hover': { bgcolor: '#E2E8F0', color: '#1A1B20' },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Warning Alert if Document is Locked/Approved */}
      {isApproved && (
        <Box
          data-print-hide="true"
          sx={{
            px: 3,
            py: 1.25,
            bgcolor: '#EFF6FF',
            borderBottom: '1px solid rgba(191, 219, 254, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <LockIcon sx={{ fontSize: 17, color: '#1E3A8A' }} />
          <Typography sx={{ fontSize: '0.75rem', color: '#1E40AF', fontWeight: 600 }}>
            <strong>Orçamento Concluído & Aprovado:</strong> Este documento está protegido contra modificações para garantir conformidade fiscal e jurídica com o cliente.
          </Typography>
        </Box>
      )}

      {/* Main Document Body */}
      <DialogContent sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#F8F9FD' }}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <OrcamentoA4Preview
            codigo={orcamento.codigo?.replace(/\D/g, '') || '042'}
            clienteNome={orcamento.clienteNome}
            clienteTelefone={orcamento.clienteTelefone || '(11) 98765-4321'}
            clienteLocalizacao="São Paulo - SP"
            itens={itensFormatados}
            subtotal={numTotal}
            desconto={0}
            total={numTotal}
            condicoesPagamento={orcamento.condicoesPagamento || '50% sinal + 50% na entrega (Pix)'}
            chavePix="45.123.789/0001-90 (CNPJ MEI)"
            validade="Válido por 10 dias"
            observacoes={
              isApproved
                ? 'Proposta aceita e aprovada pelo cliente. Garantia legal MEI de 90 dias a contar da data de conclusão dos serviços.'
                : 'Orçamento sujeito a aprovação. Materiais e mão de obra inclusos com garantia de 90 dias.'
            }
          />
        </Box>
      </DialogContent>

      {/* Modal Footer */}
      <DialogActions
        data-print-hide="true"
        sx={{
          p: { xs: 2, sm: 2.5 },
          bgcolor: '#FFFFFF',
          borderTop: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontSize: '0.75rem', color: '#74777F', display: { xs: 'none', sm: 'block' } }}>
          TrampoCerto MEI • Proposta Comercial Oficial
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: { xs: '100%', sm: 'auto' }, justifyContent: 'flex-end' }}>
          <AppButton variant="surface" size="small" onClick={onClose}>
            Fechar
          </AppButton>
          <AppButton
            variant="secondary"
            size="small"
            startIcon={<WhatsAppIcon sx={{ fontSize: 16 }} />}
            onClick={handleWhatsApp}
          >
            WhatsApp
          </AppButton>
          <AppButton
            variant="primary"
            size="small"
            startIcon={<PrintIcon sx={{ fontSize: 16 }} />}
            onClick={handlePrint}
          >
            Imprimir / Baixar PDF
          </AppButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
