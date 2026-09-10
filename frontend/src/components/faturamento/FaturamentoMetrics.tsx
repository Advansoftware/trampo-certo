'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SpeedIcon from '@mui/icons-material/Speed';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';

interface FaturamentoMetricsProps {
  faturamentoAcumulado: number;
  limiteAnual: number;
  saldoRestante: number;
  mediaMensal: number;
  dasValor: number;
  dasVencimento: string;
}

export default function FaturamentoMetrics({
  faturamentoAcumulado,
  limiteAnual,
  saldoRestante,
  mediaMensal,
  dasValor,
  dasVencimento,
}: FaturamentoMetricsProps) {
  const percentual = Math.round((faturamentoAcumulado / limiteAnual) * 100);

  const formatBrl = (num: number) =>
    `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const cards = [
    {
      title: 'Faturamento Acumulado',
      value: formatBrl(faturamentoAcumulado),
      subtext: `${percentual}% do teto de ${formatBrl(limiteAnual)}`,
      badge: 'Faixa Segura',
      badgeBg: '#DCFCE7',
      badgeColor: '#166534',
      icon: SpeedIcon,
      iconBg: '#DBEAFE',
      iconColor: '#1E3A8A',
    },
    {
      title: 'Saldo até o Limite MEI',
      value: formatBrl(saldoRestante),
      subtext: 'Valor livre para faturar em 2026',
      badge: 'Disponível',
      badgeBg: '#EFF6FF',
      badgeColor: '#1E40AF',
      icon: SavingsIcon,
      iconBg: '#DCFCE7',
      iconColor: '#166534',
    },
    {
      title: 'Média Mensal Realizada',
      value: formatBrl(mediaMensal),
      subtext: 'Teto recomendado: R$ 6.750/mês',
      badge: 'Estável',
      badgeBg: '#F1F4F9',
      badgeColor: '#43474E',
      icon: TrendingUpIcon,
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
    },
    {
      title: 'Guia DAS MEI Atual',
      value: formatBrl(dasValor),
      subtext: `Vencimento em ${dasVencimento}`,
      badge: 'Pendente',
      badgeBg: '#FEF3C7',
      badgeColor: '#92400E',
      icon: ReceiptIcon,
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
