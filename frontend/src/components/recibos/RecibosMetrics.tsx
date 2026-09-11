'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentsIcon from '@mui/icons-material/Payments';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Recibo } from '@/types';

interface RecibosMetricsProps {
  recibos: Recibo[];
}

export default function RecibosMetrics({ recibos }: RecibosMetricsProps) {
  const totalRecibos = recibos.length;
  const valorTotal = recibos.reduce((acc, r) => acc + (r.valor || 0), 0);

  const pixRecibos = recibos.filter((r) => (r.formaPagamento || '').toLowerCase() === 'pix');
  const valorPix = pixRecibos.reduce((acc, r) => acc + (r.valor || 0), 0);
  const percentualPix = valorTotal > 0 ? Math.round((valorPix / valorTotal) * 100) : 0;

  const formatBrl = (num: number) =>
    `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const cards = [
    {
      title: 'Recibos Emitidos',
      value: String(totalRecibos),
      subtext: 'Comprovantes oficiais emitidos',
      badge: 'Quitados',
      badgeBg: '#DCFCE7',
      badgeColor: '#166534',
      icon: ReceiptLongIcon,
      iconBg: '#DBEAFE',
      iconColor: '#1E3A8A',
    },
    {
      title: 'Total Comprovado',
      value: formatBrl(valorTotal),
      subtext: '100% recebido e declarado',
      badge: 'Validado',
      badgeBg: '#DCFCE7',
      badgeColor: '#166534',
      icon: PaymentsIcon,
      iconBg: '#DCFCE7',
      iconColor: '#166534',
    },
    {
      title: 'Recebimentos via Pix',
      value: `${percentualPix}%`,
      subtext: `${formatBrl(valorPix)} recebidos no Pix`,
      badge: 'Instantâneo',
      badgeBg: '#EFF6FF',
      badgeColor: '#1E40AF',
      icon: QrCode2Icon,
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
    },
    {
      title: 'Competência Atual',
      value: formatBrl(valorTotal),
      subtext: 'Setembro / Outubro 2026',
      badge: 'Regular',
      badgeBg: '#F1F4F9',
      badgeColor: '#43474E',
      icon: CalendarMonthIcon,
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
    },
  ];

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {cards.map((c) => {
        const IconComponent = c.icon;
        return (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={c.title}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(196, 198, 207, 0.4)',
                borderRadius: '20px',
                p: 2.5,
                boxShadow: '0 1px 4px rgba(30, 41, 59, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'rgba(30, 58, 138, 0.25)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(30, 41, 59, 0.06)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '14px',
                    bgcolor: c.iconBg,
                    color: c.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent sx={{ fontSize: 24 }} />
                </Box>
                <Box
                  sx={{
                    px: 1.25,
                    py: 0.25,
                    borderRadius: '9999px',
                    bgcolor: c.badgeBg,
                    color: c.badgeColor,
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                  }}
                >
                  {c.badge}
                </Box>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: '0.8125rem',
                    color: '#74777F',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    mb: 0.5,
                  }}
                >
                  {c.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.25rem', md: '1.45rem' },
                    fontWeight: 800,
                    color: '#1A1B20',
                    letterSpacing: '-0.02em',
                    mb: 0.5,
                  }}
                >
                  {c.value}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                  {c.subtext}
                </Typography>
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
