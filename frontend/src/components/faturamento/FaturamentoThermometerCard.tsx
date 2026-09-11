'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShieldIcon from '@mui/icons-material/Shield';

interface FaturamentoThermometerCardProps {
  faturamentoAcumulado: number;
  limiteAnual: number;
  saldoRestante: number;
}

export default function FaturamentoThermometerCard({
  faturamentoAcumulado,
  limiteAnual,
  saldoRestante,
}: FaturamentoThermometerCardProps) {
  const percentual = Math.min(100, Math.round((faturamentoAcumulado / limiteAnual) * 100));
  const ano = new Date().getFullYear();
  const mesesRestantes = Math.max(1, 12 - new Date().getMonth());
  const limiteTolerancia = limiteAnual * 1.2;

  const formatMoney = (val?: number | null) => {
    const num = typeof val === 'number' && !isNaN(val) ? val : 0;
    return `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(196, 198, 207, 0.4)',
        borderRadius: '24px',
        p: { xs: 3, sm: 4 },
        boxShadow: '0 1px 4px rgba(30, 41, 59, 0.03)',
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Card Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1.5 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <ShieldIcon sx={{ fontSize: 20, color: '#166534' }} />
            <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#1A1B20' }}>
              Termômetro do Teto Anual MEI
            </Typography>
            <Box
              sx={{
                px: 1.5,
                py: 0.25,
                borderRadius: '9999px',
                bgcolor: '#DCFCE7',
                color: '#166534',
                fontSize: '0.6875rem',
                fontWeight: 700,
              }}
            >
              Situação Segura
            </Box>
          </Box>
          <Typography sx={{ fontSize: '0.8125rem', color: '#74777F' }}>
            Base de cálculo oficial conforme o limite anual estabelecido pelo Comitê Gestor do Simples Nacional (CGSN).
          </Typography>
        </Box>

        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E3A8A', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {percentual}%
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#74777F', mt: 0.25 }}>
            utilizado em 2026
          </Typography>
        </Box>
      </Box>

      {/* Progress Bar Container */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box
          sx={{
            width: '100%',
            height: 18,
            bgcolor: '#F1F4F9',
            borderRadius: '9999px',
            overflow: 'hidden',
            p: '3px',
            border: '1px solid rgba(196, 198, 207, 0.4)',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: `${percentual}%`,
              height: '100%',
              bgcolor: '#1E3A8A',
              borderRadius: '9999px',
              transition: 'width 0.8s ease-in-out',
            }}
          />
        </Box>

        {/* Scale Markers */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#74777F', px: 0.5 }}>
          <span>R$ 0</span>
          <span style={{ color: '#1E3A8A', fontWeight: 700 }}>
            {formatMoney(faturamentoAcumulado)} (Atual)
          </span>
          <span style={{ color: '#D97706', fontWeight: 600 }}>
            80% ({formatMoney(limiteAnual * 0.8)})
          </span>
          <strong style={{ color: '#1A1B20' }}>
            {formatMoney(limiteAnual)} (Teto)
          </strong>
        </Box>
      </Box>

      {/* Diagnostic Insights Grid */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: '16px',
              bgcolor: '#F8F9FD',
              border: '1px solid rgba(196, 198, 207, 0.35)',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#166534', mb: 0.5 }}>
              <CheckCircleIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700 }}>
                Dentro da Margem Segura
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.75rem', color: '#43474E', lineHeight: 1.5 }}>
              Você ainda pode faturar <strong>{formatMoney(saldoRestante)}</strong> até o final do ano sem qualquer penalidade ou mudança de faixa tributária.
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: '16px',
              bgcolor: '#F8F9FD',
              border: '1px solid rgba(196, 198, 207, 0.35)',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#1E3A8A', mb: 0.5 }}>
              <InfoOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700 }}>
                Média Recomendada Restante
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.75rem', color: '#43474E', lineHeight: 1.5 }}>
              {mesesRestantes === 1 ? 'No mês restante' : `Nos ${mesesRestantes} meses restantes`} de {ano}, você pode emitir até <strong>{formatMoney(saldoRestante / mesesRestantes)}/mês</strong> mantendo o enquadramento simplificado de MEI.
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: '16px',
              bgcolor: '#F8F9FD',
              border: '1px solid rgba(196, 198, 207, 0.35)',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#D97706', mb: 0.5 }}>
              <InfoOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700 }}>
                Tolerância de até 20%
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.75rem', color: '#43474E', lineHeight: 1.5 }}>
              Se faturar entre {formatMoney(limiteAnual)} e {formatMoney(limiteTolerancia)}, você apenas recolhe o DAS complementar e migra para ME no ano seguinte, sem multas retroativas.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
