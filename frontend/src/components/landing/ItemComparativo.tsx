'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export type TipoItemComparativo = 'negativo' | 'positivo';

interface ItemComparativoProps {
  tipo: TipoItemComparativo;
  children: React.ReactNode;
}

const estilos = {
  negativo: { bgcolor: '#FFDAD6', color: '#BA1A1A', Icone: CloseIcon },
  positivo: { bgcolor: '#CEEAD6', color: '#137333', Icone: CheckIcon },
} as const;

/** Linha das colunas "como se faz hoje" x "como fica aqui". */
export default function ItemComparativo({ tipo, children }: ItemComparativoProps) {
  const { bgcolor, color, Icone } = estilos[tipo];

  return (
    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          bgcolor,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        <Icone sx={{ fontSize: 16 }} />
      </Box>
      <Typography sx={{ color: '#43474E', fontSize: '0.925rem', lineHeight: 1.5 }}>{children}</Typography>
    </Box>
  );
}
