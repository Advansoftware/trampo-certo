'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ChipBeneficioProps {
  icone: React.ReactNode;
  corFundoIcone: string;
  corIcone: string;
  children: React.ReactNode;
}

/** Linha de benefício sobre o fundo escuro da vitrine de login. */
export default function ChipBeneficio({ icone, corFundoIcone, corIcone, children }: ChipBeneficioProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 1.5,
        borderRadius: '16px',
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          bgcolor: corFundoIcone,
          color: corIcone,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icone}
      </Box>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>{children}</Typography>
    </Box>
  );
}
