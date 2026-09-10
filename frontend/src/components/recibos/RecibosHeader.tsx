'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AppButton from '@/components/common/AppButton';

interface RecibosHeaderProps {
  totalCount: number;
  onNewRecibo: () => void;
  onExport: () => void;
}

export default function RecibosHeader({
  totalCount,
  onNewRecibo,
  onExport,
}: RecibosHeaderProps) {
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
            <ReceiptLongIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />
            Comprovantes Fiscais MEI
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
                bgcolor: '#166534',
                boxShadow: '0 0 0 2px rgba(22, 101, 52, 0.2)',
              }}
            />
            {totalCount} recibos quitados
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
          Recibos Emitidos
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
          Gere comprovantes de pagamento profissionais com termo de quitação legal, assinatura digital e envio direto no WhatsApp.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <AppButton
          variant="surface"
          size="medium"
          startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />}
          onClick={onExport}
        >
          Exportar CSV
        </AppButton>

        <AppButton
          variant="primary"
          size="medium"
          startIcon={<AddIcon sx={{ fontSize: 19 }} />}
          onClick={onNewRecibo}
        >
          Emitir Novo Recibo
        </AppButton>
      </Box>
    </Box>
  );
}
