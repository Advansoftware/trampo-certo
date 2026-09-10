'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import RecibosHeader from '@/components/recibos/RecibosHeader';
import RecibosMetrics from '@/components/recibos/RecibosMetrics';
import RecibosTable from '@/components/recibos/RecibosTable';
import NovoReciboModal from '@/components/recibos/NovoReciboModal';
import { ReciboData } from '@/components/recibos/ReciboPaperView';
import { fetchRecibos } from '@/lib/api';

export default function RecibosPage() {
  const [recibos, setRecibos] = useState<ReciboData[]>([]);
  const [novoModalOpen, setNovoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await fetchRecibos();
      if (Array.isArray(data)) {
        setRecibos(data);
      }
    }
    load();
  }, []);

  const handleExportCsv = () => {
    if (recibos.length === 0) {
      setToastMessage('Nenhum recibo disponível para exportação.');
      return;
    }

    const headers = ['Código', 'Cliente', 'Documento', 'Serviço', 'Valor', 'Forma de Pagamento', 'Data', 'Autenticação'];
    const rows = recibos.map((r) => [
      r.codigo,
      `"${(r.clienteNome || '').replace(/"/g, '""')}"`,
      `"${r.clienteDocumento || ''}"`,
      `"${(r.servicoDescricao || '').replace(/"/g, '""')}"`,
      r.valor.toFixed(2),
      r.formaPagamentoLabel || r.formaPagamento,
      `"${r.dataPagamento || ''}"`,
      r.autenticacao,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `recibos_trampocerto_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Relatório fiscal de recibos exportado em CSV com sucesso!');
  };

  const handleCreateRecibo = (novo: ReciboData) => {
    setRecibos((prev) => [novo, ...prev]);
    setToastMessage(`Recibo ${novo.codigo} emitido com sucesso!`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      {/* 1. Header with Counters and New Receipt CTA */}
      <RecibosHeader
        totalCount={recibos.length}
        onNewRecibo={() => setNovoModalOpen(true)}
        onExport={handleExportCsv}
      />

      {/* 2. KPIs and Financial Proof Highlights */}
      <RecibosMetrics recibos={recibos} />

      {/* 3. Table with Payment Filters and Actions */}
      <RecibosTable recibos={recibos} />

      {/* 4. Quick Issue Receipt Modal */}
      <NovoReciboModal
        open={novoModalOpen}
        onClose={() => setNovoModalOpen(false)}
        onSave={handleCreateRecibo}
      />

      {/* Toast Feedback */}
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
