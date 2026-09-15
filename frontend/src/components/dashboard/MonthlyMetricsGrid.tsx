'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import PaymentsIcon from '@mui/icons-material/Payments';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { formatMoedaCompacta, formatMoeda } from '@/lib/format';
import { DasCompetencia, DestaquesMensais } from '@/types';
import CardDestaque from './CardDestaque';
import DasMeiCard from './DasMeiCard';

interface MonthlyMetricsGridProps {
  das: DasCompetencia;
  destaques: DestaquesMensais;
  onCopiarPix: (chave: string) => void;
}

function textoVariacao(variacao: number | null, referencia: string): string {
  if (variacao === null) return `Ainda não dá para comparar com o ${referencia}`;
  const sinal = variacao >= 0 ? '+' : '';
  return `${sinal}${variacao.toFixed(0)}% em relação a ${referencia}`;
}

/** Guia DAS + os quatro indicadores do mês, todos calculados no backend. */
export default function MonthlyMetricsGrid({ das, destaques, onCopiarPix }: MonthlyMetricsGridProps) {
  const faturamentoSubiu = (destaques.variacaoFaturamento ?? 0) >= 0;

  return (
    <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
      <Grid size={{ xs: 12, lg: 4 }}>
        <DasMeiCard das={das} onCopiarPix={onCopiarPix} />
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CardDestaque
              titulo="Faturado no mês"
              valor={formatMoedaCompacta(destaques.faturamentoMes)}
              icone={<PaymentsIcon sx={{ fontSize: 20 }} />}
              corIcone="#1E3A8A"
              fundoIcone="#DBEAFE"
              rodapeIcone={
                faturamentoSubiu ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : <TrendingDownIcon sx={{ fontSize: 16 }} />
              }
              rodapeTexto={textoVariacao(destaques.variacaoFaturamento, 'mês anterior')}
              corRodape={faturamentoSubiu ? '#1E3A8A' : '#B91C1C'}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CardDestaque
              titulo="A receber (aprovados)"
              valor={formatMoedaCompacta(destaques.aReceber)}
              icone={<PendingActionsIcon sx={{ fontSize: 20 }} />}
              corIcone="#2563EB"
              fundoIcone="#F1F4F9"
              rodapeIcone={<ScheduleIcon sx={{ fontSize: 16 }} />}
              rodapeTexto={
                destaques.aReceberQtd === 1
                  ? '1 serviço aprovado sem recibo'
                  : `${destaques.aReceberQtd} serviços aprovados sem recibo`
              }
              corRodape="#2563EB"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CardDestaque
              titulo="Ticket médio do mês"
              valor={formatMoeda(destaques.ticketMedio)}
              icone={<TaskAltIcon sx={{ fontSize: 20 }} />}
              corIcone="#2563EB"
              fundoIcone="#E0E7FF"
              rodapeIcone={<ThumbUpIcon sx={{ fontSize: 16 }} />}
              rodapeTexto={textoVariacao(destaques.variacaoTicket, 'mês anterior')}
              corRodape="#1E3A8A"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CardDestaque
              titulo="Recibos emitidos"
              valor={String(destaques.recibosEmitidos)}
              sufixo={destaques.recibosEmitidos === 1 ? ' recibo' : ' recibos'}
              icone={<ReceiptIcon sx={{ fontSize: 20 }} />}
              corIcone="#D97706"
              fundoIcone="#FFFBEB"
              bordaIcone="1px solid #FDE68A"
              rodapeIcone={<CloudDoneIcon sx={{ fontSize: 16 }} />}
              rodapeTexto={`${destaques.orcamentosFechados} orçamentos fechados no mês`}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
