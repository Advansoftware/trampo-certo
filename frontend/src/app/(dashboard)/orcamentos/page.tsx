'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import OrcamentosListHeader from '@/components/orcamentos/OrcamentosListHeader';
import OrcamentosMetricsSummary from '@/components/orcamentos/OrcamentosMetricsSummary';
import OrcamentosTable, { OrcamentoItemData } from '@/components/orcamentos/OrcamentosTable';
import { fetchOrcamentos } from '@/lib/api';

export default function OrcamentosPage() {
  const [proposals, setProposals] = useState<OrcamentoItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchOrcamentos();
        if (Array.isArray(data)) {
          setProposals(data);
        }
      } catch (err) {
        console.error('Erro ao carregar orçamentos:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleExportCsv = () => {
    if (proposals.length === 0) {
      setToastMessage('Nenhum orçamento disponível para exportação.');
      return;
    }

    const headers = ['Código', 'Cliente', 'Telefone', 'Serviço', 'Valor Total', 'Status', 'Data'];
    const rows = proposals.map((p) => [
      p.codigo || p.id,
      `"${(p.clienteNome || '').replace(/"/g, '""')}"`,
      `"${p.clienteTelefone || ''}"`,
      `"${(p.servicoDescricao || '').replace(/"/g, '""')}"`,
      typeof p.valorTotal === 'number' ? p.valorTotal.toFixed(2) : p.valorTotal,
      p.status || 'pendente',
      p.dataEnvio || p.createdAt || '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `orcamentos_trampocerto_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Relatório CSV de orçamentos baixado com sucesso!');
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    setToastMessage('Status do orçamento atualizado para Aprovado com sucesso!');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      {/* 1. Header with Breadcrumb, Status and CTA */}
      <OrcamentosListHeader
        totalCount={proposals.length}
        onExport={handleExportCsv}
      />

      {/* 2. Top Metric Cards (Total, Aprovados, Pendentes, Ticket Médio) */}
      <OrcamentosMetricsSummary proposals={proposals} />

      {/* 3. Full Data Table with Filters, Search and Actions */}
      <OrcamentosTable
        proposals={proposals}
        onStatusChange={handleStatusChange}
      />

      {/* Feedback Toast */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={3500}
        onClose={() => setToastMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToastMessage(null)}
          severity="success"
          sx={{
            width: '100%',
            borderRadius: '9999px',
            bgcolor: '#1E3A8A',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.8125rem',
            boxShadow: '0 8px 24px rgba(30, 58, 138, 0.35)',
            '& .MuiAlert-icon': { color: '#93C5FD' },
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
