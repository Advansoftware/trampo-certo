'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AppButton from '@/components/common/AppButton';
import { Orcamento } from '@/types';

export interface OrcamentoAcoes {
  onWhatsApp: (orcamento: Orcamento) => void;
  onVisualizar: (orcamento: Orcamento) => void;
  onEditar: (orcamento: Orcamento) => void;
  onAprovar: (orcamento: Orcamento) => void;
  onRecusar: (orcamento: Orcamento) => void;
  onEmitirRecibo: (orcamento: Orcamento) => void;
}

interface Props extends OrcamentoAcoes {
  orcamento: Orcamento;
  /** Bloqueia os botões enquanto a mudança de status está em voo. */
  ocupado?: boolean;
}

const botaoIcone = (cor: string, fundo: string, hover: string) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: cor,
  bgcolor: fundo,
  transition: 'all 0.15s ease',
  '&:hover': { bgcolor: hover, transform: 'scale(1.05)' },
});

export default function OrcamentoLinhaAcoes({ orcamento, ocupado = false, ...acoes }: Props) {
  const aprovado = orcamento.status === 'aprovado';
  const recusado = orcamento.status === 'recusado';
  const editavel = !aprovado && !recusado;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1, opacity: ocupado ? 0.6 : 1 }}>
      <Tooltip title="Enviar proposta no WhatsApp" arrow>
        <Box onClick={() => acoes.onWhatsApp(orcamento)} sx={botaoIcone('#15803D', '#DCFCE7', '#BBF7D0')}>
          <WhatsAppIcon sx={{ fontSize: 17 }} />
        </Box>
      </Tooltip>

      <Tooltip title="Visualizar documento" arrow>
        <Box onClick={() => acoes.onVisualizar(orcamento)} sx={botaoIcone('#1E3A8A', '#DBEAFE', '#BFDBFE')}>
          <VisibilityIcon sx={{ fontSize: 17 }} />
        </Box>
      </Tooltip>

      {editavel && (
        <Tooltip title="Editar orçamento" arrow>
          <Box onClick={() => acoes.onEditar(orcamento)} sx={botaoIcone('#1E3A8A', '#F1F4F9', '#E2E8F0')}>
            <EditIcon sx={{ fontSize: 16 }} />
          </Box>
        </Tooltip>
      )}

      {aprovado && (
        <AppButton
          variant="surface"
          size="xsmall"
          startIcon={<ReceiptIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />}
          onClick={() => acoes.onEmitirRecibo(orcamento)}
          sx={{
            bgcolor: '#EFF6FF',
            color: '#1E3A8A',
            borderColor: '#BFDBFE',
            fontSize: '0.6875rem',
            fontWeight: 700,
            '&:hover': { bgcolor: '#DBEAFE' },
          }}
        >
          Recibo
        </AppButton>
      )}

      {recusado && (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1.25,
            py: 0.4,
            borderRadius: '9999px',
            bgcolor: '#FEE2E2',
            color: '#991B1B',
            fontSize: '0.6875rem',
            fontWeight: 700,
          }}
        >
          <CloseIcon sx={{ fontSize: 13 }} />
          Recusado
        </Box>
      )}

      {editavel && (
        <>
          <Tooltip title="Reprovar / Recusar proposta" arrow>
            <Box
              onClick={() => !ocupado && acoes.onRecusar(orcamento)}
              sx={{
                ...botaoIcone('#DC2626', '#FEF2F2', '#FEE2E2'),
                border: '1px solid #FECACA',
              }}
            >
              <CloseIcon sx={{ fontSize: 15 }} />
            </Box>
          </Tooltip>

          <AppButton
            variant="primary"
            size="xsmall"
            disabled={ocupado}
            startIcon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
            onClick={() => acoes.onAprovar(orcamento)}
            sx={{ bgcolor: '#16A34A', fontSize: '0.6875rem', '&:hover': { bgcolor: '#15803D' } }}
          >
            Aprovar
          </AppButton>
        </>
      )}
    </Box>
  );
}
