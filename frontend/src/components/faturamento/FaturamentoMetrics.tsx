'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import SpeedIcon from '@mui/icons-material/Speed';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CartaoMetrica from '@/components/common/CartaoMetrica';
import { formatMoeda } from '@/lib/format';
import { situacaoDoTeto } from '@/lib/mei';

interface FaturamentoMetricsProps {
  faturamentoAcumulado: number;
  limiteAnual: number;
  saldoRestante: number;
  mediaMensal: number;
  dasValor: number;
  dasVencimento: string;
}

/** Os quatro números do topo da tela de faturamento; todos vêm da API. */
export default function FaturamentoMetrics({
  faturamentoAcumulado,
  limiteAnual,
  saldoRestante,
  mediaMensal,
  dasValor,
  dasVencimento,
}: FaturamentoMetricsProps) {
  const percentual = limiteAnual > 0 ? Math.round((faturamentoAcumulado / limiteAnual) * 100) : 0;
  const ritmoParaOTeto = limiteAnual / 12;

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Faturado no ano"
          valor={formatMoeda(faturamentoAcumulado)}
          detalhe={`${percentual}% do teto de ${formatMoeda(limiteAnual)}`}
          icone={<SpeedIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#DBEAFE"
          corIcone="#1E3A8A"
          selo={situacaoDoTeto(percentual)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Ainda cabe no teto"
          valor={formatMoeda(saldoRestante)}
          detalhe={`Livre para faturar em ${new Date().getFullYear()}`}
          icone={<SavingsIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#DCFCE7"
          corIcone="#166534"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Média por mês"
          valor={formatMoeda(mediaMensal)}
          detalhe={`Chegar ao teto pediria ${formatMoeda(ritmoParaOTeto)} por mês`}
          icone={<TrendingUpIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#EFF6FF"
          corIcone="#2563EB"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="DAS deste mês"
          valor={formatMoeda(dasValor)}
          detalhe={dasVencimento ? `Vence em ${dasVencimento}` : 'Sem vencimento informado'}
          icone={<ReceiptIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#FEF3C7"
          corIcone="#D97706"
        />
      </Grid>
    </Grid>
  );
}
