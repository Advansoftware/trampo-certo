'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SaveIcon from '@mui/icons-material/Save';
import AppButton from '@/components/common/AppButton';

interface OrcamentoHeaderProps {
  codigo?: string;
  onSave?: () => void;
  onExportPdf?: () => void;
}

export default function OrcamentoHeader({
  codigo = 'ORC-2026-042',
  onSave,
  onExportPdf,
}: OrcamentoHeaderProps) {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ fontSize: '0.85rem' }}>
        <Link
          color="inherit"
          href="/dashboard"
          onClick={(e) => {
            e.preventDefault();
            router.push('/dashboard');
          }}
          sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
        >
          Dashboard
        </Link>
        <Typography color="text.primary" sx={{ fontWeight: 600 }}>
          Criador de Orçamento
        </Typography>
      </Breadcrumbs>

      {/* Main Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Chip
              size="small"
              label="Proposta Comercial MEI"
              sx={{ bgcolor: 'secondary.main', color: '#FFFFFF', fontWeight: 700, fontSize: '0.7rem' }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              Código: {codigo}
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
            Criador de Orçamento (Material You)
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Preencha os serviços para gerar uma proposta profissional com botão de envio direto no WhatsApp.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <AppButton
            variant="outlined"
            size="small"
            startIcon={<PictureAsPdfIcon sx={{ fontSize: 18 }} />}
            onClick={onExportPdf}
            sx={{ flex: { xs: 1, sm: 'none' } }}
          >
            Exportar PDF
          </AppButton>
          <AppButton
            variant="primary"
            size="small"
            startIcon={<SaveIcon sx={{ fontSize: 18 }} />}
            onClick={onSave}
            sx={{ flex: { xs: 1, sm: 'none' } }}
          >
            Salvar Proposta
          </AppButton>
        </Stack>
      </Box>
    </Box>
  );
}
