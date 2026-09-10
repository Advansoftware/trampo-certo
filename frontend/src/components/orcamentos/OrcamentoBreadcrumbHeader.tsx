'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';

interface OrcamentoBreadcrumbHeaderProps {
  codigo?: string;
}

export default function OrcamentoBreadcrumbHeader({
  codigo = '042',
}: OrcamentoBreadcrumbHeaderProps) {
  return (
    <Box
      data-print-hide="true"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 1.5,
        mb: 2.5,
      }}
    >
      {/* Breadcrumbs */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '13px', color: '#43474E' }}>
        <Link
          href="/dashboard"
          style={{ textDecoration: 'none', color: '#43474E', transition: 'color 0.15s ease' }}
        >
          <span style={{ cursor: 'pointer' }}>Orçamentos</span>
        </Link>
        <ChevronRightIcon sx={{ fontSize: 16, color: '#74777F' }} />
        <Typography component="span" sx={{ fontSize: '13px', fontWeight: 600, color: '#1A1B20' }}>
          Novo Orçamento #{codigo}
        </Typography>
      </Box>

      {/* Auto-save Status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.5,
            bgcolor: '#DBEAFE',
            color: '#172554',
            borderRadius: '9999px',
            border: '1px solid rgba(30, 58, 138, 0.12)',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: '#1E3A8A',
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 0.4, transform: 'scale(0.8)' },
                '50%': { opacity: 1, transform: 'scale(1.2)' },
                '100%': { opacity: 0.4, transform: 'scale(0.8)' },
              },
            }}
          />
          Salvamento Automático Ativo
        </Box>
        <Typography sx={{ fontSize: '12px', color: '#74777F' }}>
          Modificado há 12 segundos
        </Typography>
      </Box>
    </Box>
  );
}
