'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Logo from '@/components/Logo';

export default function LandingFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#FFFFFF',
        borderTop: '1px solid rgba(226, 226, 233, 0.8)',
        py: 6,
      }}
    >
      <Box
        sx={{
          maxWidth: 1240,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box>
          <Logo height={34} />
          <Typography sx={{ color: '#74777F', fontSize: '0.8125rem', mt: 1 }}>
            Gestão simplificada de propostas e teto MEI para autônomos no Brasil.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Link href="#recursos" underline="hover" sx={{ color: '#43474E', fontSize: '0.8125rem' }}>
            Como funciona
          </Link>
          <Link href="#teto-mei" underline="hover" sx={{ color: '#43474E', fontSize: '0.8125rem' }}>
            Termômetro fiscal
          </Link>
          <Link href="#precos" underline="hover" sx={{ color: '#43474E', fontSize: '0.8125rem' }}>
            Planos
          </Link>
          <Link href="/login" underline="hover" sx={{ color: '#002045', fontWeight: 600, fontSize: '0.8125rem' }}>
            Área do cliente
          </Link>
        </Box>

        <Typography sx={{ color: '#74777F', fontSize: '0.75rem' }}>
          © 2024 TrampoCerto. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}
