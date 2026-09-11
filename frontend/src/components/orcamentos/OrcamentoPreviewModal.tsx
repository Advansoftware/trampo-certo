'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
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
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AppButton from '@/components/common/AppButton';
import { formatMoeda } from '@/lib/format';
import { Orcamento } from '@/types';
import OrcamentoA4Preview from './OrcamentoA4Preview';
import { abrirWhatsApp, mensagemOrcamento } from './tabela/mensagemWhatsApp';
import { visualDoStatus } from './tabela/statusOrcamento';

interface OrcamentoPreviewModalProps {
  open: boolean;
  onClose: () => void;
  orcamento: Orcamento | null;
}

export default function OrcamentoPreviewModal({ open, onClose, orcamento }: OrcamentoPreviewModalProps) {
  // Todos os hooks antes de qualquer retorno: a contagem precisa ser estável
  // entre o render sem orçamento (modal fechado) e o render com orçamento.
  const router = useRouter();

  const aprovado = orcamento?.status === 'aprovado';
  const recusado = orcamento?.status === 'recusado';
  const editavel = Boolean(orcamento) && !aprovado && !recusado;

  const handlePrint = React.useCallback(() => window.print(), []);

  const handleWhatsApp = React.useCallback(() => {
    if (!orcamento) return;
    abrirWhatsApp(orcamento.clienteTelefone, mensagemOrcamento(orcamento));
  }, [orcamento]);

  const handleEdit = React.useCallback(() => {
    if (!orcamento) return;
    router.push(`/orcamentos/novo?id=${orcamento.id}`);
  }, [orcamento, router]);

  if (!orcamento) return null;

  const status = visualDoStatus(orcamento.status);
  const itens = orcamento.itens.length > 0
    ? orcamento.itens.map((item) => ({
        id: item.id,
        descricao: item.descricao,
        subDescricao: item.subDescricao ?? undefined,
        qtd: item.qtd,
        unidade: item.unidade,
        unitario: item.unitario,
      }))
    : [
        {
          id: 'item-1',
          descricao: orcamento.servicoDescricao || 'Serviços técnicos especializados',
          qtd: 1,
          unidade: 'un',
          unitario: orcamento.valorTotal,
        },
      ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        backdrop: { sx: { bgcolor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(8px)' } },
        paper: {
          sx: {
            borderRadius: '24px',
            bgcolor: '#F8F9FD',
            backgroundImage: 'none',
            boxShadow: '0 24px 48px -12px rgba(15, 23, 42, 0.25)',
            overflow: 'hidden',
            m: { xs: 1.5, sm: 3 },
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 2.5,
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
          <Box
            sx={{
              px: 1.25,
              py: 0.35,
              borderRadius: '8px',
              bgcolor: '#F1F4F9',
              color: '#1E3A8A',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(30, 58, 138, 0.15)',
              flexShrink: 0,
            }}
          >
            {orcamento.codigo}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#1A1B20', lineHeight: 1.2 }}>
              {orcamento.clienteNome}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
              {formatMoeda(orcamento.valorTotal)} · {status.label}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <Box
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.4,
              borderRadius: '9999px',
              bgcolor: status.bg,
              color: status.color,
              fontSize: '0.6875rem',
              fontWeight: 700,
            }}
          >
            {aprovado ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : <AccessTimeIcon sx={{ fontSize: 14 }} />}
            {status.label}
          </Box>

          <IconButton onClick={handlePrint} size="small" sx={{ color: '#43474E' }} title="Imprimir / PDF">
            <PrintIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={handleWhatsApp} size="small" sx={{ color: '#15803D' }} title="Enviar no WhatsApp">
            <WhatsAppIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={onClose} size="small" sx={{ color: '#43474E' }} title="Fechar">
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#F8F9FD' }}>
        <OrcamentoA4Preview
          codigo={orcamento.codigo}
          clienteNome={orcamento.clienteNome}
          clienteTelefone={orcamento.clienteTelefone}
          clienteLocalizacao={orcamento.clienteLocalizacao}
          itens={itens}
          subtotal={orcamento.subtotal}
          desconto={orcamento.desconto}
          total={orcamento.valorTotal}
          condicoesPagamento={orcamento.condicoesPagamento}
          chavePix={orcamento.chavePix}
          validade={orcamento.validade}
          observacoes={orcamento.observacoes}
        />
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          bgcolor: '#FFFFFF',
          borderTop: '1px solid rgba(196, 198, 207, 0.4)',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {!editavel && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mr: 'auto', color: '#74777F' }}>
            <LockIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
              {aprovado
                ? 'Proposta aprovada — protegida contra edições.'
                : 'Proposta recusada — somente leitura.'}
            </Typography>
          </Box>
        )}

        {editavel && (
          <AppButton
            variant="outlined"
            size="small"
            startIcon={<EditIcon sx={{ fontSize: 16 }} />}
            onClick={handleEdit}
          >
            Editar proposta
          </AppButton>
        )}

        <AppButton
          variant="outlined"
          size="small"
          startIcon={<WhatsAppIcon sx={{ fontSize: 16 }} />}
          onClick={handleWhatsApp}
        >
          Enviar no WhatsApp
        </AppButton>

        <AppButton size="small" startIcon={<PrintIcon sx={{ fontSize: 16 }} />} onClick={handlePrint}>
          Imprimir / PDF
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
