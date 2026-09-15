'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShieldIcon from '@mui/icons-material/Shield';
import CartaoDiagnostico from './CartaoDiagnostico';
import { formatMoedaCompacta } from '@/lib/format';
import { situacaoDoTeto } from '@/lib/mei';

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
  const percentual = limiteAnual > 0 ? Math.min(100, Math.round((faturamentoAcumulado / limiteAnual) * 100)) : 0;
  const ano = new Date().getFullYear();
  const mesesRestantes = Math.max(1, 12 - new Date().getMonth());
  const limiteTolerancia = limiteAnual * 1.2;
  const situacao = situacaoDoTeto(percentual);

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 1.5,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
            <ShieldIcon sx={{ fontSize: 20, color: '#166534' }} />
            <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#1A1B20' }}>
              Termômetro do teto anual
            </Typography>
            <Box
              sx={{
                px: 1.5,
                py: 0.25,
                borderRadius: '9999px',
                bgcolor: situacao.bgcolor,
                color: situacao.color,
                fontSize: '0.6875rem',
                fontWeight: 700,
              }}
            >
              {situacao.texto}
            </Box>
          </Box>
          <Typography sx={{ fontSize: '0.8125rem', color: '#74777F' }}>
            A conta usa o limite anual do MEI definido pelo Comitê Gestor do Simples Nacional.
          </Typography>
        </Box>

        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography
            sx={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E3A8A', letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            {percentual}%
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#74777F', mt: 0.25 }}>usado em {ano}</Typography>
        </Box>
      </Box>

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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: '#74777F',
            px: 0.5,
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <span>R$ 0</span>
          <Box component="span" sx={{ color: '#1E3A8A', fontWeight: 700 }}>
            {formatMoedaCompacta(faturamentoAcumulado)} até agora
          </Box>
          <Box component="span" sx={{ color: '#D97706', fontWeight: 600 }}>
            Alerta em {formatMoedaCompacta(limiteAnual * 0.8)}
          </Box>
          <Box component="span" sx={{ color: '#1A1B20', fontWeight: 700 }}>
            Teto {formatMoedaCompacta(limiteAnual)}
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <CartaoDiagnostico
            icone={<CheckCircleIcon sx={{ fontSize: 18 }} />}
            titulo="Quanto ainda cabe"
            cor="#166534"
          >
            Você pode faturar mais <strong>{formatMoedaCompacta(saldoRestante)}</strong> até dezembro sem sair do
            MEI.
          </CartaoDiagnostico>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CartaoDiagnostico
            icone={<InfoOutlinedIcon sx={{ fontSize: 18 }} />}
            titulo="Ritmo por mês"
            cor="#1E3A8A"
          >
            {mesesRestantes === 1 ? 'No mês que falta' : `Nos ${mesesRestantes} meses que faltam`} de {ano}, dá
            para emitir até <strong>{formatMoedaCompacta(saldoRestante / mesesRestantes)} por mês</strong>.
          </CartaoDiagnostico>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CartaoDiagnostico
            icone={<InfoOutlinedIcon sx={{ fontSize: 18 }} />}
            titulo="Se passar do teto"
            cor="#D97706"
          >
            Entre {formatMoedaCompacta(limiteAnual)} e {formatMoedaCompacta(limiteTolerancia)} você recolhe o DAS
            complementar e vira ME no ano seguinte. Acima disso, a mudança vale desde janeiro.
          </CartaoDiagnostico>
        </Grid>
      </Grid>
    </Box>
  );
}
