'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function LoginFooter() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        bgcolor: '#F3F3FA',
        py: 3,
        mt: 'auto',
      }}
    >
      <Box
        sx={{
          maxWidth: 1360,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
          © 2024 TrampoCerto Gestão Simplificada MEI. Todos os direitos reservados.
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Link
            href="#"
            underline="hover"
            sx={{ fontSize: '0.75rem', color: '#74777F', '&:hover': { color: '#1A1B20' } }}
          >
            Termos de Uso
          </Link>
          <Link
            href="#"
            underline="hover"
            sx={{ fontSize: '0.75rem', color: '#74777F', '&:hover': { color: '#1A1B20' } }}
          >
            Privacidade
          </Link>
          <Link
            href="#"
            underline="hover"
            sx={{ fontSize: '0.75rem', color: '#74777F', '&:hover': { color: '#1A1B20' } }}
          >
            Ajuda
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
