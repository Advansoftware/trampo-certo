'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ItemComparativo, { TipoItemComparativo } from './ItemComparativo';

interface ColunaComparativaProps {
  tipo: TipoItemComparativo;
  titulo: string;
  itens: string[];
}

const estilosCartao = {
  negativo: { bgcolor: '#FFF8F6', borderColor: '#FFDCD5', corTitulo: '#BA1A1A' },
  positivo: { bgcolor: '#F3F8F5', borderColor: '#C4E7D3', corTitulo: '#137333' },
} as const;

/** Uma das duas colunas do comparativo "antes x depois" da landing. */
export default function ColunaComparativa({ tipo, titulo, itens }: ColunaComparativaProps) {
  const { bgcolor, borderColor, corTitulo } = estilosCartao[tipo];

  return (
    <Box
      sx={{
        height: '100%',
        bgcolor,
        border: `1px solid ${borderColor}`,
        borderRadius: '24px',
        p: { xs: 3, sm: 4 },
      }}
    >
      <Typography sx={{ color: corTitulo, fontWeight: 700, fontSize: '1.1rem', mb: 3 }}>{titulo}</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {itens.map((item) => (
          <ItemComparativo key={item} tipo={tipo}>
            {item}
          </ItemComparativo>
        ))}
      </Box>
    </Box>
  );
}
