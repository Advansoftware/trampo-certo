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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AppButton from '@/components/common/AppButton';
import ReciboPaperView from './ReciboPaperView';
import { formatDataHora } from '@/lib/format';
import { Recibo } from '@/types';

interface ReciboModalProps {
  open: boolean;
  onClose: () => void;
  recibo: Recibo | null;
}

export default function ReciboModal({ open, onClose, recibo }: ReciboModalProps) {
  if (!recibo) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const valFormatted = recibo.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const texto = encodeURIComponent(
      `Olá ${recibo.clienteNome}! 👋 Segue seu *Comprovante de Pagamento & Recibo Oficial* da TrampoCerto (${recibo.codigo}):\n\n` +
      `🛠️ *Serviço:* ${recibo.servicoDescricao}\n` +
      `💰 *Valor Quitado:* R$ ${valFormatted}\n` +
      `📅 *Data:* ${formatDataHora(recibo.dataPagamento)}\n` +
      `💳 *Forma:* ${recibo.formaPagamentoLabel}\n` +
      `🔐 *Autenticação:* ${recibo.autenticacao}\n\n` +
      `Muito obrigado pela confiança no meu trabalho! Fico à disposição para futuros serviços.`,
    );

    const tel = (recibo.clienteTelefone || '').replace(/\D/g, '');
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
      {/* Top Modal Header */}
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
            {recibo.codigo}
          </Box>
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
            <CheckCircleIcon sx={{ fontSize: 14 }} />
            Recibo Quitado & Válido
          </Box>
        </Box>

        {/* Action Controls */}
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
            title="Fechar"
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

      {/* Recibo Body */}
      <DialogContent sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#F8F9FD' }}>
        <ReciboPaperView recibo={recibo} />
      </DialogContent>

      {/* Footer Controls */}
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
          TrampoCerto • Recibo de prestação de serviço
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
            Enviar WhatsApp
          </AppButton>
          <AppButton
            variant="primary"
            size="small"
            startIcon={<PrintIcon sx={{ fontSize: 16 }} />}
            onClick={handlePrint}
          >
            Imprimir Recibo PDF
          </AppButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
