'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import AppButton from '@/components/common/AppButton';
import { formatMoeda } from '@/lib/format';

interface FaturamentoHeaderProps {
  limiteAnual: number;
  onExport: () => void;
  onPayDas: () => void;
}

export default function FaturamentoHeader({ limiteAnual, onExport, onPayDas }: FaturamentoHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2.5,
        mb: 4,
      }}
    >
      <Box>
        {/* Top Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.4,
              borderRadius: '9999px',
              bgcolor: '#DBEAFE',
              color: '#172554',
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <AccountBalanceIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />
            Gestão Fiscal & Receita Federal
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              fontSize: '0.75rem',
              color: '#43474E',
              fontWeight: 500,
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: '#166534',
                boxShadow: '0 0 0 2px rgba(22, 101, 52, 0.2)',
              }}
            />
            Ano-Calendário 2026 • Situação Regular
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            color: '#1A1B20',
            fontSize: { xs: '1.5rem', md: '1.875rem' },
            letterSpacing: '-0.02em',
            mb: 0.5,
          }}
        >
          Faturamento & DAS MEI
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: '#43474E',
            fontSize: '0.875rem',
            maxWidth: 640,
            lineHeight: 1.5,
          }}
        >
          Monitore o teto anual de {formatMoeda(limiteAnual)} da Receita Federal, pague a guia DAS mensal e emita o Relatório Obrigatório de Receitas Brutas.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <AppButton
          variant="surface"
          size="medium"
          startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />}
          onClick={onExport}
        >
          Exportar Relatório Mensal
        </AppButton>

        <AppButton
          variant="primary"
          size="medium"
          startIcon={<QrCode2Icon sx={{ fontSize: 19 }} />}
          onClick={onPayDas}
        >
          Pagar DAS do Mês (Pix)
        </AppButton>
      </Box>
    </Box>
  );
}
