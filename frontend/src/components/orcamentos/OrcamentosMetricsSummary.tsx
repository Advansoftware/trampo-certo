'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface ProposalItem {
  id?: string;
  status?: string;
  valorTotal?: number | string;
  value?: string;
  [key: string]: any;
}

interface OrcamentosMetricsSummaryProps {
  proposals: ProposalItem[];
}

export default function OrcamentosMetricsSummary({ proposals }: OrcamentosMetricsSummaryProps) {
  const parseVal = (p: ProposalItem): number => {
    if (typeof p.valorTotal === 'number') return p.valorTotal;
    if (typeof p.valorTotal === 'string') {
      const parsed = parseFloat(p.valorTotal.replace(/[^\d.,]/g, '').replace(',', '.'));
      return isNaN(parsed) ? 0 : parsed;
    }
    if (p.value) {
      const parsed = parseFloat(p.value.replace(/[^\d.,]/g, '').replace(',', '.'));
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const totalPropostas = proposals.length;
  const aprovadas = proposals.filter((p) => {
    const s = (p.status || '').toLowerCase();
    return s === 'aprovado' || s.includes('recibo') || s === 'concluido';
  });
  const pendentes = proposals.filter((p) => {
    const s = (p.status || '').toLowerCase();
    return s !== 'aprovado' && !s.includes('recibo') && s !== 'concluido' && s !== 'recusado';
  });

  const valorTotalGeral = proposals.reduce((acc, cur) => acc + parseVal(cur), 0);
  const valorAprovado = aprovadas.reduce((acc, cur) => acc + parseVal(cur), 0);
  const valorPendente = pendentes.reduce((acc, cur) => acc + parseVal(cur), 0);
  const ticketMedio = totalPropostas > 0 ? valorTotalGeral / totalPropostas : 0;
  const taxaAprovacao = totalPropostas > 0 ? Math.round((aprovadas.length / totalPropostas) * 100) : 0;

  const formatBrl = (num: number) =>
    `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const cards = [
    {
      title: 'Total Orçado',
      value: formatBrl(valorTotalGeral),
      subtext: `${totalPropostas} orçamentos emitidos`,
      badge: 'Geral',
      badgeBg: '#F1F4F9',
      badgeColor: '#43474E',
      icon: RequestQuoteIcon,
      iconBg: '#DBEAFE',
      iconColor: '#1E3A8A',
    },
    {
      title: 'Aprovados & Fechados',
      value: formatBrl(valorAprovado),
      subtext: `${aprovadas.length} propostas convertidas`,
      badge: `${taxaAprovacao}% conversão`,
      badgeBg: '#D1FAE5',
      badgeColor: '#065F46',
      icon: CheckCircleIcon,
      iconBg: '#DCFCE7',
      iconColor: '#15803D',
    },
    {
      title: 'Em Negociação',
      value: formatBrl(valorPendente),
      subtext: `${pendentes.length} aguardando retorno`,
      badge: 'Pendentes',
      badgeBg: '#FEF3C7',
      badgeColor: '#92400E',
      icon: PendingActionsIcon,
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
    },
    {
      title: 'Ticket Médio MEI',
      value: formatBrl(ticketMedio),
      subtext: 'Valor médio por proposta',
      badge: 'Média',
      badgeBg: '#EFF6FF',
      badgeColor: '#1E40AF',
      icon: TrendingUpIcon,
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
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
