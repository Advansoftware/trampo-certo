'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CartaoMetrica from '@/components/common/CartaoMetrica';
import { formatMoeda } from '@/lib/format';
import { Orcamento } from '@/types';

interface OrcamentosMetricsSummaryProps {
  orcamentos: Orcamento[];
}

export default function OrcamentosMetricsSummary({ orcamentos }: OrcamentosMetricsSummaryProps) {
  const total = orcamentos.length;
  const aprovados = orcamentos.filter((item) => item.status === 'aprovado');
  const emAberto = orcamentos.filter((item) => item.status === 'pendente' || item.status === 'rascunho');

  const somar = (lista: Orcamento[]) => lista.reduce((soma, item) => soma + item.valorTotal, 0);
  const valorTotal = somar(orcamentos);
  const valorAprovado = somar(aprovados);
  const valorEmAberto = somar(emAberto);
  const ticketMedio = total > 0 ? valorTotal / total : 0;
  const taxaAprovacao = total > 0 ? Math.round((aprovados.length / total) * 100) : 0;

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Total orçado"
          valor={formatMoeda(valorTotal)}
          detalhe={total === 1 ? '1 orçamento emitido' : `${total} orçamentos emitidos`}
          icone={<RequestQuoteIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#DBEAFE"
          corIcone="#1E3A8A"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Fechado"
          valor={formatMoeda(valorAprovado)}
          detalhe={aprovados.length === 1 ? '1 proposta aprovada' : `${aprovados.length} propostas aprovadas`}
          icone={<CheckCircleIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#DCFCE7"
          corIcone="#15803D"
          selo={{ texto: `${taxaAprovacao}% de aprovação`, bgcolor: '#D1FAE5', color: '#065F46' }}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Esperando resposta"
          valor={formatMoeda(valorEmAberto)}
          detalhe={
            emAberto.length === 1 ? '1 proposta sem retorno' : `${emAberto.length} propostas sem retorno`
          }
          icone={<PendingActionsIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#FEF3C7"
          corIcone="#D97706"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <CartaoMetrica
          titulo="Valor médio da proposta"
          valor={formatMoeda(ticketMedio)}
          detalhe="Média entre todos os orçamentos"
          icone={<TrendingUpIcon sx={{ fontSize: 24 }} />}
          fundoIcone="#EFF6FF"
          corIcone="#2563EB"
        />
      </Grid>
    </Grid>
  );
}
