'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TermometroTetoDemo from '@/components/common/TermometroTetoDemo';

/** Vitrine do hero: o termômetro de exemplo mais a prévia da proposta enviada. */
export default function HeroDemonstracao() {
  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '24px',
        p: { xs: 2.5, sm: 3.5 },
        boxShadow: '0 20px 45px -10px rgba(0, 32, 69, 0.12)',
        border: '1px solid rgba(226, 226, 233, 0.8)',
      }}
    >
      <TermometroTetoDemo />

      <Box sx={{ bgcolor: '#F0F9F4', border: '1px solid #D1E7DD', borderRadius: '16px', p: 2, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <WhatsAppIcon sx={{ fontSize: 18, color: '#25D366' }} />
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F5132' }}>
            Proposta enviada ao cliente
          </Typography>
        </Box>

        <Typography sx={{ fontSize: '0.8125rem', color: '#43474E', lineHeight: 1.45, mb: 1.5 }}>
          &ldquo;Boa tarde, Carlos! Segue o orçamento da instalação elétrica. Deu R$ 1.850,00, e dá para dividir em
          2x no Pix.&rdquo;
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>PDF anexado • 140 KB</Typography>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#137333' }}>
            Aprovado em 15 min
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
