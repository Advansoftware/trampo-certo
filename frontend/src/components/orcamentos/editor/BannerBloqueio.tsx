'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import AppButton from '@/components/common/AppButton';
import type { MotivoBloqueio } from './useOrcamentoEditor';

interface BannerBloqueioProps {
  motivo: MotivoBloqueio;
  onVoltar: () => void;
}

const TEXTOS = {
  aprovado: {
    titulo: 'Orçamento aprovado (modo somente leitura)',
    descricao:
      'Depois que o cliente aprova, a proposta não aceita mais edições.',
    corTexto: '#1E3A8A',
    corDescricao: '#3B82F6',
    fundo: '#EFF6FF',
    borda: '1px solid #BFDBFE',
    corIcone: '#1E3A8A',
  },
  recusado: {
    titulo: 'Orçamento recusado (modo somente leitura)',
    descricao: 'Esta proposta foi recusada pelo cliente e não aceita mais edições.',
    corTexto: '#991B1B',
    corDescricao: '#B91C1C',
    fundo: '#FEF2F2',
    borda: '1px solid #FECACA',
    corIcone: '#DC2626',
  },
} as const;

export default function BannerBloqueio({ motivo, onVoltar }: BannerBloqueioProps) {
  if (!motivo) return null;
  const texto = TEXTOS[motivo];

  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        px: 2.5,
        borderRadius: '16px',
        bgcolor: texto.fundo,
        border: texto.borda,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 1.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <LockIcon sx={{ color: texto.corIcone, fontSize: 20 }} />
        <Box>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: texto.corTexto }}>
            {texto.titulo}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: texto.corDescricao }}>{texto.descricao}</Typography>
        </Box>
      </Box>
      <AppButton variant="outlined" size="small" onClick={onVoltar} sx={{ flexShrink: 0, fontSize: '0.75rem' }}>
        Voltar para orçamentos
      </AppButton>
    </Box>
  );
}
