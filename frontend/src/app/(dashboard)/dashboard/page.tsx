'use client';

import React from 'react';
import Box from '@mui/material/Box';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MeiThermometer from '@/components/dashboard/MeiThermometer';
import MonthlyMetricsGrid from '@/components/dashboard/MonthlyMetricsGrid';
import RecentProposalsTable from '@/components/dashboard/RecentProposalsTable';
import ReferralBanner from '@/components/dashboard/ReferralBanner';
import CotaPlanoCard from '@/components/planos/CotaPlanoCard';
import EstadoCarregamento from '@/components/common/EstadoCarregamento';
import Toast from '@/components/common/Toast';
import { usePerfilMei } from '@/components/providers/PerfilProvider';
import { useDestaquesMensais, useMeiMetrics } from '@/hooks/useMei';
import { useOrcamentos } from '@/hooks/useOrcamentos';
import { usePlano } from '@/hooks/usePlano';
import { useToast } from '@/hooks/useToast';
import { primeiroNome } from '@/lib/format';

export default function DashboardPage() {
  const perfil = usePerfilMei();
  const metricas = useMeiMetrics();
  const destaques = useDestaquesMensais();
  const orcamentos = useOrcamentos();
  const plano = usePlano();
  const { toast, showToast, showError, hideToast } = useToast();

  const copiarChavePix = async (chave: string) => {
    if (!chave) {
      showToast('Cadastre sua chave Pix no perfil para copiar por aqui.', 'warning');
      return;
    }
    await navigator.clipboard.writeText(chave);
    showToast('Chave Pix copiada.');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      <DashboardHeader userName={primeiroNome(perfil?.name || '')} />

      <CotaPlanoCard resumo={plano.resumo} />

      <EstadoCarregamento
        loading={metricas.loading}
        error={metricas.error}
        onRetry={metricas.reload}
        minHeight={220}
      >
        {metricas.metrics && (
          <MeiThermometer
            faturamentoAcumulado={metricas.metrics.faturamentoAcumulado}
            limiteAnual={metricas.metrics.limiteAnual}
            percentualUtilizado={metricas.metrics.percentualUtilizado}
            saldoRestante={metricas.metrics.saldoRestante}
            mediaMensal={metricas.metrics.mediaMensal}
            ano={metricas.metrics.ano}
          />
        )}
      </EstadoCarregamento>

      <EstadoCarregamento
        loading={metricas.loading || destaques.loading}
        error={metricas.error || destaques.error}
        onRetry={() => {
          void metricas.reload();
          void destaques.reload();
        }}
        minHeight={260}
      >
        {metricas.metrics && destaques.destaques && (
          <MonthlyMetricsGrid
            das={metricas.metrics.dasMei}
            destaques={destaques.destaques}
            onCopiarPix={(chave) => void copiarChavePix(chave)}
          />
        )}
      </EstadoCarregamento>

      <EstadoCarregamento
        loading={orcamentos.loading}
        error={orcamentos.error}
        onRetry={orcamentos.reload}
        minHeight={300}
      >
        <RecentProposalsTable
          orcamentos={orcamentos.orcamentos}
          onAlterarStatus={orcamentos.alterarStatus}
          onSucesso={(mensagem) => {
            showToast(mensagem);
            void metricas.reload();
            void destaques.reload();
          }}
          onErro={showError}
        />
      </EstadoCarregamento>

      <ReferralBanner onCopiado={(mensagem) => showToast(mensagem)} />

      <Toast message={toast.message} severity={toast.severity} onClose={hideToast} />
    </Box>
  );
}
