'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatMoedaCompacta } from '@/lib/format';
import { MeiMetrics } from '@/types';

interface TetoMeiCardProps {
  metrics: MeiMetrics | null;
}

/** Mini termômetro do teto anual exibido no rodapé da sidebar. */
export default function TetoMeiCard({ metrics }: TetoMeiCardProps) {
  const percentual = Math.min(100, Math.round(metrics?.percentualUtilizado ?? 0));

  return (
    <Box
      sx={{
        bgcolor: '#F1F4F9',
        border: '1px solid rgba(196, 198, 207, 0.4)',
        borderRadius: '20px',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#43474E' }}>Teto anual MEI</Typography>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E3A8A' }}>
          {metrics ? `${percentual}%` : '—'}
        </Typography>
      </Box>

      <Box sx={{ width: '100%', height: 8, bgcolor: '#DFE4EE', borderRadius: '9999px', overflow: 'hidden', mb: 1 }}>
        <Box
          sx={{
            width: `${percentual}%`,
            height: '100%',
            bgcolor: percentual >= 90 ? '#B91C1C' : percentual >= 70 ? '#D97706' : '#1E3A8A',
            borderRadius: '9999px',
            transition: 'width 0.3s ease',
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#74777F' }}>
        <span>{metrics ? formatMoedaCompacta(metrics.faturamentoAcumulado) : '—'}</span>
        <span style={{ fontWeight: 600, color: '#1A1B20' }}>
          {metrics ? formatMoedaCompacta(metrics.limiteAnual) : '—'}
        </span>
      </Box>
    </Box>
  );
}
