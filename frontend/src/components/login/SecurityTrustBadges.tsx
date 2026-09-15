'use client';

import React from 'react';
import Box from '@mui/material/Box';
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

const selos = [
  { icone: <LockClockOutlinedIcon sx={{ fontSize: 16, color: '#002045' }} />, texto: 'Conexão criptografada TLS 1.3' },
  { icone: <CalculateOutlinedIcon sx={{ fontSize: 16, color: '#C85A32' }} />, texto: 'DAS calculado pela tabela do MEI' },
  { icone: <VerifiedOutlinedIcon sx={{ fontSize: 16, color: '#74777F' }} />, texto: 'Dados tratados conforme a LGPD' },
];

/** Selos exibidos abaixo do formulário de acesso. */
export default function SecurityTrustBadges() {
  return (
    <Box
      sx={{
        mt: 2.5,
        px: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
        color: '#74777F',
        fontSize: '0.75rem',
      }}
    >
      {selos.map((selo) => (
        <Box key={selo.texto} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          {selo.icone}
          <span>{selo.texto}</span>
        </Box>
      ))}
    </Box>
  );
}
