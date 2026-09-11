'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CardCabecalhoProps {
  icone: React.ReactNode;
  titulo: string;
  acao?: React.ReactNode;
}

/** Cabeçalho padrão dos cards do editor (ícone redondo + título + ação). */
export default function CardCabecalho({ icone, titulo, acao }: CardCabecalhoProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 1,
        borderBottom: '1px solid rgba(196, 198, 207, 0.3)',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: '#DBEAFE',
            color: '#1E3A8A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icone}
        </Box>
        <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1A1B20' }}>{titulo}</Typography>
      </Box>
      {acao}
    </Box>
  );
}
