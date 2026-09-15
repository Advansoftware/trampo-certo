'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import CartaoInfoTermometro from './CartaoInfoTermometro';
import { formatMoeda } from '@/lib/format';
import { situacaoDoTeto } from '@/lib/mei';

interface MeiThermometerProps {
  faturamentoAcumulado: number;
  limiteAnual: number;
  percentualUtilizado: number;
  saldoRestante: number;
  mediaMensal: number;
  /** Ano-calendário das métricas; o corrente quando não informado. */
  ano?: number;
}

export default function MeiThermometer({
  faturamentoAcumulado,
  limiteAnual,
  percentualUtilizado,
  saldoRestante,
  mediaMensal,
  ano = new Date().getFullYear(),
}: MeiThermometerProps) {
  // Faixa de alerta, limite de excesso e ritmo saem do teto recebido, não de um valor fixo.
  const valorAlerta = limiteAnual * 0.8;
  const limiteComExcesso = limiteAnual * 1.2;
  const mesesRestantes = Math.max(1, 12 - new Date().getMonth());
  const sugestaoMensal = saldoRestante / mesesRestantes;
  const situacao = situacaoDoTeto(percentualUtilizado);

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
                Termômetro do teto MEI {ano}
              </Typography>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.25,
                  borderRadius: '9999px',
                  bgcolor: situacao.bgcolor,
                  color: situacao.color,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {situacao.texto}
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', mt: 0.25 }}>
              Teto do ano: {formatMoeda(limiteAnual)}
            </Typography>
          </Box>
        </Box>

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
            Faturado no ano:
          </Typography>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E3A8A' }}>
            {formatMoeda(faturamentoAcumulado)}
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', fontWeight: 600 }}>
            ({percentualUtilizado}%)
          </Typography>
        </Box>
      </Box>

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
          <Box component="span" sx={{ color: '#D97706', fontWeight: 600 }}>
            Alerta em 80% ({formatMoeda(valorAlerta)})
          </Box>
          <Box component="span" sx={{ color: '#1A1B20', fontWeight: 600 }}>
            Teto {formatMoeda(limiteAnual)}
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CartaoInfoTermometro
            icone={<VerifiedUserIcon sx={{ color: '#1E3A8A', fontSize: 24, mt: 0.25 }} />}
            titulo="Ainda cabe até 31 de dezembro"
          >
            Você pode faturar mais{' '}
            <Box component="strong" sx={{ color: '#1E3A8A', fontWeight: 600 }}>
              {formatMoeda(saldoRestante)}
            </Box>{' '}
            neste ano sem passar do teto.
          </CartaoInfoTermometro>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CartaoInfoTermometro
            icone={<CalendarMonthIcon sx={{ color: '#2563EB', fontSize: 24, mt: 0.25 }} />}
            titulo="Ritmo por mês"
          >
            Sua média é{' '}
            <Box component="strong" sx={{ color: '#1A1B20', fontWeight: 600 }}>
              {formatMoeda(mediaMensal)}
            </Box>{' '}
            por mês. Dá para chegar a{' '}
            <Box component="strong" sx={{ color: '#1A1B20', fontWeight: 600 }}>
              {formatMoeda(sugestaoMensal)}
            </Box>{' '}
            {mesesRestantes === 1 ? 'no mês que falta' : `nos ${mesesRestantes} meses que faltam`} sem estourar o
            teto.
          </CartaoInfoTermometro>
        </Grid>
      </Grid>

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
          Passar de {formatMoeda(limiteComExcesso)} no ano, que é 20% acima do teto, tira você do MEI com efeito
          retroativo a 1º de janeiro, e os impostos passam a ser cobrados como microempresa.
        </Typography>
      </Box>
    </Box>
  );
}
