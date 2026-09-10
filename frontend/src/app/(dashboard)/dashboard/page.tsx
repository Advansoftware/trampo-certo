'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MeiThermometer from '@/components/dashboard/MeiThermometer';
import MonthlyMetricsGrid from '@/components/dashboard/MonthlyMetricsGrid';
import RecentProposalsTable from '@/components/dashboard/RecentProposalsTable';
import ReferralBanner from '@/components/dashboard/ReferralBanner';
import { fetchMeiMetrics, fetchMonthlyHighlights, fetchOrcamentos, getUserData } from '@/lib/api';

export default function DashboardPage() {
  const user = getUserData();
  const [metrics, setMetrics] = useState({
    faturamentoAcumulado: 42350.0,
    limiteAnual: 81000.0,
    percentualUtilizado: 52,
    saldoRestante: 38650.0,
    mediaMensal: 5293.0,
    dasMei: {
      competencia: 'Setembro/2026',
      valor: 75.6,
      vencimento: '20/09/2026',
      status: 'pendente',
    },
  });
  const [highlights, setHighlights] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const [m, h, p] = await Promise.all([
        fetchMeiMetrics(),
        fetchMonthlyHighlights(),
        fetchOrcamentos(),
      ]);
      if (m) setMetrics(m);
      if (h) setHighlights(h);
      if (p) setProposals(p);
    }
    load();
  }, []);

  const handleCobrarPix = () => {
    const text = encodeURIComponent(
      'Olá! Passando para enviar a chave Pix para acertarmos o serviço concluído: 45.123.789/0001-90 (CNPJ TrampoCerto). Qualquer dúvida estou à disposição!',
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      {/* 1. Header with Greetings and Instant Actions */}
      <DashboardHeader userName={user.name.split(' ')[0]} />

      {/* 2. Hero: Termômetro do Limite MEI */}
      <MeiThermometer
        faturamentoAcumulado={metrics.faturamentoAcumulado}
        limiteAnual={metrics.limiteAnual}
        percentualUtilizado={metrics.percentualUtilizado}
        saldoRestante={metrics.saldoRestante || metrics.limiteAnual - metrics.faturamentoAcumulado}
        mediaMensal={metrics.mediaMensal || 5293.0}
      />

      {/* 3. DAS MEI Attention Card + Monthly Metric Highlights */}
      <MonthlyMetricsGrid
        dasMei={metrics.dasMei}
        highlights={highlights}
        onCobrarPix={handleCobrarPix}
      />

      {/* 4. Recent Quotes & Proposals */}
      <RecentProposalsTable proposals={proposals} />

      {/* 5. Referral Banner */}
      <ReferralBanner />
    </Box>
  );
}
