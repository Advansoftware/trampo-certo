'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Link from 'next/link';
import AppButton from '@/components/common/AppButton';

interface ClientesHeaderProps {
  totalCount: number;
  onOpenNovoCliente: () => void;
  onExport: () => void;
}

export default function ClientesHeader({
  totalCount,
  onOpenNovoCliente,
  onExport,
}: ClientesHeaderProps) {
  return (
    <Box
      data-print-hide="true"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      {/* Left: Breadcrumbs + Title */}
      <Box>
        {/* Breadcrumb Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '13px', color: '#43474E', mb: 0.75 }}>
          <Link
            href="/dashboard"
            style={{ textDecoration: 'none', color: '#43474E', transition: 'color 0.15s ease' }}
          >
            <span>Início</span>
          </Link>
          <ChevronRightIcon sx={{ fontSize: 16, color: '#74777F' }} />
          <Typography component="span" sx={{ fontSize: '13px', fontWeight: 600, color: '#1A1B20' }}>
            Clientes
          </Typography>
        </Box>

        {/* Title & Subtitle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.875rem' },
              fontWeight: 800,
              color: '#1A1B20',
              letterSpacing: '-0.025em',
            }}
          >
            Gestão de Clientes
          </Typography>
          <Box
            sx={{
              px: 1.5,
              py: 0.25,
              borderRadius: '9999px',
              bgcolor: '#DBEAFE',
              color: '#172554',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            {totalCount} cadastrados
          </Box>
        </Box>

        <Typography sx={{ color: '#74777F', fontSize: '0.875rem', mt: 0.5 }}>
          Controle sua carteira de pessoas físicas e jurídicas, histórico de serviços e faturamento acumulado.
        </Typography>
      </Box>

      {/* Right: Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', width: { xs: '100%', md: 'auto' } }}>
        <AppButton
          variant="outlined"
          size="medium"
          startIcon={<FileDownloadIcon sx={{ fontSize: 18 }} />}
          onClick={onExport}
          sx={{ flex: { xs: 1, sm: 'none' } }}
        >
          Exportar CSV
        </AppButton>

        <AppButton
          variant="primary"
          size="medium"
          startIcon={<PersonAddIcon sx={{ fontSize: 18 }} />}
          onClick={onOpenNovoCliente}
          sx={{
            flex: { xs: 1, sm: 'none' },
            boxShadow: '0 4px 14px rgba(30, 58, 138, 0.25)',
          }}
        >
          Novo Cliente
        </AppButton>
      </Box>
    </Box>
  );
}
