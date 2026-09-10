'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LinkIcon from '@mui/icons-material/Link';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SendIcon from '@mui/icons-material/Send';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AppButton from '@/components/common/AppButton';

interface OrcamentoBottomDockProps {
  total: number;
  codigo?: string;
  prazo?: string;
  onSaveTemplate: () => void;
  onCopyLink: () => void;
  onDownloadPdf: () => void;
  onSendWhatsApp: () => void;
}

export default function OrcamentoBottomDock({
  total,
  codigo = '042',
  prazo = '2 dias úteis',
  onSaveTemplate,
  onCopyLink,
  onDownloadPdf,
  onSendWhatsApp,
}: OrcamentoBottomDockProps) {
  const formattedTotal = total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Box
      component="div"
      data-print-hide="true"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: { xs: 0, md: '288px' },
        right: 0,
        bgcolor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(196, 198, 207, 0.4)',
        boxShadow: '0 -4px 24px rgba(30, 41, 59, 0.08)',
        zIndex: 100,
        px: { xs: 2, sm: 3, md: 4 },
        py: 1.5,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      {/* Left: Total & Metadata */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            sx={{
              fontSize: '10px',
              color: '#74777F',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.08em',
              lineHeight: 1.2,
            }}
          >
            Total do Documento
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.25 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.15rem', sm: '1.35rem' },
                fontWeight: 800,
                color: '#1A1B20',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              R$ {formattedTotal}
            </Typography>
            <Box
              sx={{
                px: 1.25,
                py: 0.25,
                borderRadius: '9999px',
                bgcolor: '#DBEAFE',
                color: '#172554',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              Orçamento #{codigo}
            </Box>
          </Box>
        </Box>

        {/* Suggested Deadline */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1,
            pl: 2.5,
            borderLeft: '1px solid rgba(196, 198, 207, 0.4)',
            color: '#74777F',
            fontSize: '12px',
          }}
        >
          <ScheduleIcon sx={{ fontSize: 17, color: '#1E3A8A' }} />
          <span>Prazo sugerido: {prazo}</span>
        </Box>
      </Box>

      {/* Right: Interactive Buttons (Exact Stitch Style & Colors) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <AppButton
          variant="outlined"
          size="small"
          startIcon={<BookmarkAddIcon sx={{ fontSize: 17 }} />}
          onClick={onSaveTemplate}
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            fontSize: '13px',
          }}
        >
          Salvar como Modelo
        </AppButton>

        <AppButton
          variant="outlined"
          size="small"
          startIcon={<LinkIcon sx={{ fontSize: 17 }} />}
          onClick={onCopyLink}
          sx={{ fontSize: '13px' }}
        >
          Copiar Link Público
        </AppButton>

        <AppButton
          variant="secondary"
          size="small"
          startIcon={<PictureAsPdfIcon sx={{ fontSize: 17 }} />}
          onClick={onDownloadPdf}
          sx={{
            bgcolor: '#2563EB',
            fontSize: '13px',
            '&:hover': { bgcolor: '#1D4ED8' },
          }}
        >
          Baixar PDF
        </AppButton>

        {/* Primary CTA: WhatsApp */}
        <AppButton
          variant="primary"
          size="medium"
          startIcon={<SendIcon sx={{ fontSize: 18 }} />}
          onClick={onSendWhatsApp}
          sx={{
            fontSize: '14px',
            fontWeight: 700,
            px: 3,
            boxShadow: '0 2px 10px rgba(30, 58, 138, 0.35)',
          }}
        >
          Enviar por WhatsApp
        </AppButton>
      </Box>
    </Box>
  );
}
