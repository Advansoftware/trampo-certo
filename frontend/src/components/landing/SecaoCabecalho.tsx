'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SecaoCabecalhoProps {
  etiqueta: string;
  titulo: string;
  /** Cor da etiqueta acima do título. Padrão: azul da marca. */
  corEtiqueta?: string;
  larguraTitulo?: number;
}

/** Etiqueta + título que abre cada seção da landing. */
export default function SecaoCabecalho({
  etiqueta,
  titulo,
  corEtiqueta = '#002045',
  larguraTitulo = 680,
}: SecaoCabecalhoProps) {
  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
      <Typography
        sx={{
          color: corEtiqueta,
          fontWeight: 700,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          mb: 1.5,
        }}
      >
        {etiqueta}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          color: '#002045',
          fontSize: { xs: '1.85rem', sm: '2.4rem' },
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          maxWidth: larguraTitulo,
          mx: 'auto',
        }}
      >
        {titulo}
      </Typography>
    </Box>
  );
}
