'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AppButton from '@/components/common/AppButton';

interface OrcamentosListHeaderProps {
  totalCount?: number;
  onExport?: () => void;
}

export default function OrcamentosListHeader({
  totalCount = 0,
  onExport,
}: OrcamentosListHeaderProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2.5,
        mb: 4,
      }}
    >
      <Box>
        {/* Top Status & Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.4,
              borderRadius: '9999px',
              bgcolor: '#DBEAFE',
              color: '#172554',
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <RequestQuoteIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />
            Gestão de Vendas MEI
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              fontSize: '0.75rem',
              color: '#43474E',
              fontWeight: 500,
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: '#1E3A8A',
                boxShadow: '0 0 0 2px rgba(30, 58, 138, 0.2)',
              }}
            />
            {totalCount} propostas cadastradas
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            color: '#1A1B20',
            fontSize: { xs: '1.5rem', md: '1.875rem' },
            letterSpacing: '-0.02em',
            mb: 0.5,
          }}
        >
          Orçamentos & Propostas
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: '#43474E',
            fontSize: '0.875rem',
            maxWidth: 620,
            lineHeight: 1.5,
          }}
        >
          Acompanhe o status em tempo real, compartilhe links dinâmicos no WhatsApp e feche mais serviços com propostas profissionais.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        {onExport && (
          <AppButton
            variant="surface"
            size="medium"
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={onExport}
          >
            Exportar CSV
          </AppButton>
        )}

        <AppButton
          variant="primary"
          size="medium"
          startIcon={<AddIcon sx={{ fontSize: 19 }} />}
          onClick={() => router.push('/orcamentos/novo')}
        >
          Novo Orçamento
        </AppButton>
      </Box>
    </Box>
  );
}
