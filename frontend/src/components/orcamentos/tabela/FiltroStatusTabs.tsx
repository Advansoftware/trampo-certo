'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { FILTROS_STATUS, FiltroStatus } from './statusOrcamento';

interface FiltroStatusTabsProps {
  filtro: FiltroStatus;
  onChange: (filtro: FiltroStatus) => void;
  contadores: Record<FiltroStatus, number>;
  /** 'compacto' no card do dashboard, 'pilulas' na tela de orçamentos. */
  variante?: 'compacto' | 'pilulas';
}

export default function FiltroStatusTabs({
  filtro,
  onChange,
  contadores,
  variante = 'pilulas',
}: FiltroStatusTabsProps) {
  const compacto = variante === 'compacto';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: compacto ? 0.75 : 1,
        ...(compacto
          ? {
              bgcolor: '#F8F9FD',
              p: 0.5,
              borderRadius: '9999px',
              border: '1px solid rgba(196, 198, 207, 0.4)',
            }
          : { overflowX: 'auto', pb: { xs: 1, md: 0 } }),
      }}
    >
      {FILTROS_STATUS.map((tab) => {
        const selecionado = filtro === tab.key;
        return (
          <Box
            key={tab.key}
            onClick={() => onChange(tab.key)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: compacto ? 0.5 : 0.75,
              px: compacto ? 1.25 : 1.75,
              py: compacto ? 0.4 : 0.75,
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: selecionado ? 700 : 500,
              whiteSpace: 'nowrap',
              bgcolor: selecionado ? '#1E3A8A' : compacto ? 'transparent' : '#F1F4F9',
              color: selecionado ? '#FFFFFF' : '#43474E',
              transition: 'all 0.15s ease',
              '&:hover': { bgcolor: selecionado ? '#1D4ED8' : compacto ? '#EDF2F7' : '#E8EDF5' },
            }}
          >
            <span>{tab.label}</span>
            <Box
              component="span"
              sx={{
                px: 0.6,
                py: 0.05,
                borderRadius: '9999px',
                fontSize: '0.625rem',
                fontWeight: 700,
                bgcolor: selecionado ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                color: selecionado ? '#FFFFFF' : '#43474E',
              }}
            >
              {contadores[tab.key]}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
