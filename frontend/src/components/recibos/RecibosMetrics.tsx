'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentsIcon from '@mui/icons-material/Payments';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CartaoMetrica from '@/components/common/CartaoMetrica';
import { formatMoeda } from '@/lib/format';
import { Recibo } from '@/types';

interface RecibosMetricsProps {
  recibos: Recibo[];
}

export default function RecibosMetrics({ recibos }: RecibosMetricsProps) {
  const total = recibos.length;
  const valorTotal = recibos.reduce((soma, recibo) => soma + (recibo.valor || 0), 0);

  const recibosPix = recibos.filter((recibo) => (recibo.formaPagamento || '').toLowerCase() === 'pix');
  const valorPix = recibosPix.reduce((soma, recibo) => soma + (recibo.valor || 0), 0);
  const percentualPix = valorTotal > 0 ? Math.round((valorPix / valorTotal) * 100) : 0;
  const ticketMedio = total > 0 ? valorTotal / total : 0;

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Recibos emitidos"
          valor={String(total)}
          detalhe={total === 1 ? '1 recibo no histórico' : `${total} recibos no histórico`}
          icone={<ReceiptLongIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#DBEAFE"
          corIcone="#1E3A8A"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Total em recibos"
          valor={formatMoeda(valorTotal)}
          detalhe="Soma de tudo que já foi recebido"
          icone={<PaymentsIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#DCFCE7"
          corIcone="#166534"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Recebido no Pix"
          valor={`${percentualPix}%`}
          detalhe={`${formatMoeda(valorPix)} entraram por Pix`}
          icone={<QrCode2Icon sx={{ fontSize: 24 }} />}
          fundoIcone="#EFF6FF"
          corIcone="#2563EB"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Valor médio do recibo"
          valor={formatMoeda(ticketMedio)}
          detalhe="Média entre todos os recibos"
          icone={<TrendingUpIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#FEF3C7"
          corIcone="#D97706"
        />
      </Grid>
    </Grid>
  );
}
