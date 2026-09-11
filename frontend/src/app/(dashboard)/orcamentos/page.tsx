'use client';

import React from 'react';
import Box from '@mui/material/Box';
import OrcamentosListHeader from '@/components/orcamentos/OrcamentosListHeader';
import OrcamentosMetricsSummary from '@/components/orcamentos/OrcamentosMetricsSummary';
import OrcamentosTable from '@/components/orcamentos/OrcamentosTable';
import { exportarOrcamentosCsv } from '@/components/orcamentos/tabela/exportarOrcamentosCsv';
import EstadoCarregamento from '@/components/common/EstadoCarregamento';
import Toast from '@/components/common/Toast';
import { useOrcamentos } from '@/hooks/useOrcamentos';
import { useToast } from '@/hooks/useToast';

export default function OrcamentosPage() {
  const { orcamentos, loading, error, reload, alterarStatus } = useOrcamentos();
  const { toast, showToast, showError, hideToast } = useToast();

  const exportar = () => {
    if (orcamentos.length === 0) {
      showToast('Nenhum orçamento disponível para exportação.', 'warning');
      return;
    }
    exportarOrcamentosCsv(orcamentos);
    showToast('Relatório CSV de orçamentos baixado com sucesso!');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      <OrcamentosListHeader totalCount={orcamentos.length} onExport={exportar} />

      <EstadoCarregamento loading={loading} error={error} onRetry={reload} minHeight={140}>
        <OrcamentosMetricsSummary orcamentos={orcamentos} />
      </EstadoCarregamento>

      <EstadoCarregamento loading={loading} error={error} onRetry={reload} minHeight={320}>
        <OrcamentosTable
          orcamentos={orcamentos}
          onAlterarStatus={alterarStatus}
          onSucesso={(mensagem, status) => showToast(mensagem, status === 'recusado' ? 'warning' : 'success')}
          onErro={showError}
        />
      </EstadoCarregamento>

      <Toast message={toast.message} severity={toast.severity} onClose={hideToast} />
    </Box>
  );
}
