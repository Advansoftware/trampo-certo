'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CartaoInfoTermometroProps {
  icone: React.ReactNode;
  titulo: string;
  children: React.ReactNode;
}

/** Bloco de apoio do termômetro: saldo restante e ritmo mensal. */
export default function CartaoInfoTermometro({ icone, titulo, children }: CartaoInfoTermometroProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        bgcolor: '#F1F4F9',
        border: '1px solid rgba(196, 198, 207, 0.3)',
        p: 2,
        borderRadius: '16px',
        height: '100%',
      }}
    >
      {icone}
      <Box>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20', mb: 0.25 }}>
          {titulo}
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: '#43474E', lineHeight: 1.45 }}>{children}</Typography>
      </Box>
    </Box>
  );
}
