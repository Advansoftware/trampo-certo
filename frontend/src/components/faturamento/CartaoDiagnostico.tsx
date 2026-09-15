'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CartaoDiagnosticoProps {
  icone: React.ReactNode;
  titulo: string;
  cor: string;
  children: React.ReactNode;
}

/** Explicação curta abaixo do termômetro da tela de faturamento. */
export default function CartaoDiagnostico({ icone, titulo, cor, children }: CartaoDiagnosticoProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: '16px',
        bgcolor: '#F8F9FD',
        border: '1px solid rgba(196, 198, 207, 0.35)',
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: cor, mb: 0.5 }}>
        {icone}
        <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700 }}>{titulo}</Typography>
      </Box>
      <Typography sx={{ fontSize: '0.75rem', color: '#43474E', lineHeight: 1.5 }}>{children}</Typography>
    </Box>
  );
}
