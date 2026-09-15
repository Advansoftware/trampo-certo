'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

interface CartaoDepoimentoProps {
  nome: string;
  ocupacao: string;
  cidade: string;
  depoimento: string;
  foto?: string;
  corAvatar?: string;
}

/** Depoimento exibido na landing. Sem foto, cai na inicial do nome. */
export default function CartaoDepoimento({
  nome,
  ocupacao,
  cidade,
  depoimento,
  foto,
  corAvatar = '#C85A32',
}: CartaoDepoimentoProps) {
  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '24px',
        p: { xs: 3, sm: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid rgba(226, 226, 233, 0.8)',
        boxShadow: '0 4px 16px rgba(0, 32, 69, 0.04)',
      }}
    >
      <Typography
        sx={{ color: '#43474E', fontSize: '0.925rem', lineHeight: 1.6, fontStyle: 'italic', mb: 3 }}
      >
        &ldquo;{depoimento}&rdquo;
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {foto ? (
          <Avatar src={foto} alt={nome} sx={{ width: 46, height: 46 }} />
        ) : (
          <Avatar
            sx={{ width: 46, height: 46, bgcolor: corAvatar, color: '#FFFFFF', fontWeight: 700, fontSize: '1rem' }}
          >
            {nome.charAt(0)}
          </Avatar>
        )}

        <Box>
          <Typography sx={{ fontWeight: 700, color: '#002045', fontSize: '0.95rem' }}>{nome}</Typography>
          <Typography sx={{ color: '#74777F', fontSize: '0.8rem' }}>
            {ocupacao} • {cidade}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
