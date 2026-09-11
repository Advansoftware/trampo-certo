'use client';

import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';

import { Cliente } from '@/types';

interface ClientesMetricsProps {
  clientes: Cliente[];
}

export default function ClientesMetrics({ clientes }: ClientesMetricsProps) {
  const metrics = useMemo(() => {
    const total = clientes.length;
    const pjCount = clientes.filter((c) => (c.tipo || '').toUpperCase() === 'PJ').length;
    const pfCount = total - pjCount;

    const faturamentoTotal = clientes.reduce((acc, c) => acc + (Number(c.totalFaturado) || 0), 0);
    const ticketMedio = total > 0 ? faturamentoTotal / total : 0;

    // Top cliente
    let topCliente: Cliente | null = null;
    let maxFaturamento = -1;
    for (const c of clientes) {
      const val = Number(c.totalFaturado) || 0;
      if (val > maxFaturamento) {
        maxFaturamento = val;
        topCliente = c;
      }
    }

    return {
      total,
      pjCount,
      pfCount,
      faturamentoTotal,
      ticketMedio,
      topCliente,
      maxFaturamento,
    };
  }, [clientes]);

  const formatBrl = (num: number) => {
    const safe = typeof num === 'number' && !isNaN(num) ? num : 0;
    return `R$ ${safe.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const cards = [
    {
      title: 'Total de Clientes',
      value: String(metrics.total),
      subtext: `${metrics.total} ativos na carteira MEI`,
      icon: PeopleIcon,
      iconBg: '#DBEAFE',
      iconColor: '#1E3A8A',
      badge: '100% Ativos',
      badgeBg: '#DCFCE7',
      badgeColor: '#166534',
    },
    {
      title: 'Segmentação PF & PJ',
      value: `${metrics.pjCount} PJ • ${metrics.pfCount} PF`,
      subtext: `${metrics.pjCount} empresas cadastradas`,
      icon: BusinessIcon,
      iconBg: '#E0E7FF',
      iconColor: '#3730A3',
      badge: `${metrics.total > 0 ? Math.round((metrics.pjCount / metrics.total) * 100) : 0}% Empresas`,
      badgeBg: '#EEF2FF',
      badgeColor: '#3730A3',
    },
    {
      title: 'Ticket Médio / Cliente',
      value: formatBrl(metrics.ticketMedio),
      subtext: `Total acumulado ${formatBrl(metrics.faturamentoTotal)}`,
      icon: TrendingUpIcon,
      iconBg: '#DCFCE7',
      iconColor: '#15803D',
      badge: `${metrics.total} ${metrics.total === 1 ? 'cliente' : 'clientes'}`,
      badgeBg: '#DCFCE7',
      badgeColor: '#166534',
    },
    {
      title: 'Cliente Principal',
      value: metrics.topCliente ? metrics.topCliente.nome.split(' ')[0] : 'Nenhum',
      subtext: metrics.topCliente ? `${formatBrl(metrics.maxFaturamento)} faturados` : 'Sem registros',
      icon: StarIcon,
      iconBg: '#FEF3C7',
      iconColor: '#B45309',
      badge: metrics.topCliente?.tipo || 'PJ',
      badgeBg: '#FEF3C7',
      badgeColor: '#92400E',
    },
  ];

  return (
    <Grid container spacing={2.5}>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Grid key={idx} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(196, 198, 207, 0.4)',
                borderRadius: '24px',
                p: { xs: 2, sm: 2.5 },
                boxShadow: '0 1px 4px rgba(30, 41, 59, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(30, 58, 138, 0.08)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {/* Header: Title + Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#74777F' }}>
                  {card.title}
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: card.iconBg,
                    color: card.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </Box>
              </Box>

              {/* Metric Value */}
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.35rem', sm: '1.6rem' },
                    fontWeight: 800,
                    color: '#1A1B20',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  {card.value}
                </Typography>
              </Box>

              {/* Subtext + Badge */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1, borderTop: '1px solid rgba(196, 198, 207, 0.25)' }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#74777F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65%' }}>
                  {card.subtext}
                </Typography>
                <Box
                  sx={{
                    px: 1,
                    py: 0.25,
                    borderRadius: '9999px',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    bgcolor: card.badgeBg,
                    color: card.badgeColor,
                    flexShrink: 0,
                  }}
                >
                  {card.badge}
                </Box>
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
