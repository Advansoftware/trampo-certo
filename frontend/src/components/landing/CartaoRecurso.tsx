'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CartaoRecursoProps {
  icone: React.ReactNode;
  corFundoIcone: string;
  titulo: string;
  descricao: string;
}

/** Cartão de um recurso na grade da landing. */
export default function CartaoRecurso({ icone, corFundoIcone, titulo, descricao }: CartaoRecursoProps) {
  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '24px',
        p: 3.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(226, 226, 233, 0.8)',
        boxShadow: '0 4px 14px rgba(0, 32, 69, 0.04)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0, 32, 69, 0.08)',
        },
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: '16px',
          bgcolor: corFundoIcone,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2.5,
        }}
      >
        {icone}
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: '#002045', fontSize: '1.05rem', mb: 1.5, lineHeight: 1.3 }}
      >
        {titulo}
      </Typography>

      <Typography sx={{ color: '#43474E', fontSize: '0.875rem', lineHeight: 1.55 }}>{descricao}</Typography>
    </Box>
  );
}
