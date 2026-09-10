'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';

interface MeiThermometerProps {
  faturamentoAcumulado: number;
  limiteAnual: number;
  percentualUtilizado: number;
  saldoRestante: number;
  mediaMensal: number;
}

export default function MeiThermometer({
  faturamentoAcumulado = 52450.0,
  limiteAnual = 81000.0,
  percentualUtilizado = 64.7,
  saldoRestante = 28550.0,
  mediaMensal = 7137.5,
}: MeiThermometerProps) {
  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '24px',
        p: { xs: 2.5, sm: 3.5 },
        border: '1px solid rgba(196, 198, 207, 0.5)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', lg: 'center' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '16px',
              bgcolor: '#DBEAFE',
              color: '#1E3A8A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <SpeedIcon sx={{ fontSize: 28 }} />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1A1B20', fontSize: '1.1rem' }}>
                Termômetro do Teto MEI 2024
              </Typography>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.25,
                  borderRadius: '9999px',
                  bgcolor: '#E0E7FF',
                  color: '#1E3A8A',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                Margem Confortável
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', mt: 0.25 }}>
              Teto anual permitido: <strong style={{ color: '#1A1B20', fontWeight: 600 }}>R$ 81.000,00</strong>
            </Typography>
          </Box>
        </Box>

        {/* Faturado YTD pill */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 1,
            bgcolor: '#F1F4F9',
            border: '1px solid rgba(196, 198, 207, 0.4)',
            px: 2,
            py: 0.75,
            borderRadius: '9999px',
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', color: '#74777F', fontWeight: 600, textTransform: 'uppercase' }}>
            Faturado YTD:
          </Typography>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E3A8A' }}>
            R$ {faturamentoAcumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', fontWeight: 600 }}>
            ({percentualUtilizado}%)
          </Typography>
        </Box>
      </Box>

      {/* Thermometer Progress Bar */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 16,
            bgcolor: '#DFE4EE',
            borderRadius: '9999px',
            overflow: 'hidden',
            p: 0.25,
          }}
        >
          <Box
            sx={{
              height: '100%',
              borderRadius: '9999px',
              background: 'linear-gradient(90deg, #1E3A8A 0%, #2563EB 60%, #D97706 100%)',
              width: `${Math.min(percentualUtilizado, 100)}%`,
              transition: 'width 1s ease-out',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, fontSize: '0.75rem', color: '#74777F' }}>
          <span>R$ 0,00</span>
          <span style={{ color: '#D97706', fontWeight: 600 }}>Alerta 80% (R$ 64.800)</span>
          <span style={{ color: '#1A1B20', fontWeight: 600 }}>Teto Legal R$ 81.000,00</span>
        </Box>
      </Box>

      {/* Projection and Security Specs */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              bgcolor: '#F1F4F9',
              border: '1px solid rgba(196, 198, 207, 0.3)',
              p: 2,
              borderRadius: '16px',
            }}
          >
            <VerifiedUserIcon sx={{ color: '#1E3A8A', fontSize: 24, mt: 0.25 }} />
            <Box>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20', mb: 0.25 }}>
                Margem Segura até 31/Dez
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: '#43474E', lineHeight: 1.45 }}>
                Você ainda pode faturar <strong style={{ color: '#1E3A8A', fontWeight: 600 }}>R$ {saldoRestante.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> sem nenhum risco de desenquadramento automático.
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              bgcolor: '#F1F4F9',
              border: '1px solid rgba(196, 198, 207, 0.3)',
              p: 2,
              borderRadius: '16px',
            }}
          >
            <CalendarMonthIcon sx={{ color: '#2563EB', fontSize: 24, mt: 0.25 }} />
            <Box>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20', mb: 0.25 }}>
                Média Sugerida
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: '#43474E', lineHeight: 1.45 }}>
                Recomendamos faturar no máximo <strong style={{ color: '#1A1B20', fontWeight: 600 }}>R$ {mediaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</strong> nos próximos 4 meses para fechar o ano 100% regular.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Educational Notice Box */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          bgcolor: '#FFFBEB',
          border: '1px solid #FDE68A',
          p: 1.5,
          borderRadius: '16px',
        }}
      >
        <InfoIcon sx={{ color: '#D97706', fontSize: 22, flexShrink: 0 }} />
        <Typography sx={{ fontSize: '0.8125rem', color: '#1A1B20', lineHeight: 1.45 }}>
          <strong style={{ color: '#D97706', fontWeight: 700 }}>Atenção Fiscal MEI:</strong> Ultrapassar mais de 20% do teto anual (R$ 97.200,00) anula o benefício MEI com efeito <em>retroativo a 1º de Janeiro</em>, cobrando impostos como Microempresa.
        </Typography>
      </Box>
    </Box>
  );
}
