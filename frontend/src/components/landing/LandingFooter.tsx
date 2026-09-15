'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Logo from '@/components/Logo';
import { linksLanding } from './linksLanding';

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
            Orçamentos, recibos e controle do teto MEI para quem trabalha por conta.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {linksLanding.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              underline="hover"
              sx={{ color: '#43474E', fontSize: '0.8125rem' }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" underline="hover" sx={{ color: '#002045', fontWeight: 600, fontSize: '0.8125rem' }}>
            Área do cliente
          </Link>
        </Box>

        <Typography sx={{ color: '#74777F', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} TrampoCerto. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}
