'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ClientesHeader from '@/components/clientes/ClientesHeader';
import ClientesMetrics, { ClienteItemData } from '@/components/clientes/ClientesMetrics';
import ClientesTable from '@/components/clientes/ClientesTable';
import NovoClienteModal from '@/components/clientes/NovoClienteModal';
import ClienteDetalhesModal from '@/components/clientes/ClienteDetalhesModal';
import { fetchClientes } from '@/lib/api';

export default function ClientesPage() {
  const [clientes, setClientes] = useState<ClienteItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalNovoOpen, setModalNovoOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<ClienteItemData | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchClientes();
        if (Array.isArray(data)) {
          setClientes(data);
        }
      } catch (err) {
        console.error('Erro ao carregar clientes:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleClienteCreated = (newClient: ClienteItemData) => {
    setClientes((prev) => [newClient, ...prev]);
    setToastMessage(`Cliente "${newClient.nome}" cadastrado com sucesso!`);
  };

  const handleExportCsv = () => {
    if (clientes.length === 0) {
      setToastMessage('Nenhum cliente disponível para exportação.');
      return;
    }

    const headers = ['Nome', 'Tipo', 'Documento', 'Telefone', 'E-mail', 'Cidade', 'Bairro', 'Total Faturado', 'Propostas Aprovadas', 'Total Propostas', 'Último Serviço'];
    const rows = clientes.map((c) => [
      `"${(c.nome || '').replace(/"/g, '""')}"`,
      c.tipo || 'PF',
      `"${c.documento || ''}"`,
      `"${c.telefone || ''}"`,
      `"${c.email || ''}"`,
      `"${c.cidade || ''}"`,
      `"${c.bairro || ''}"`,
      typeof c.totalFaturado === 'number' ? c.totalFaturado.toFixed(2) : c.totalFaturado,
      c.propostasAprovadas || 0,
      c.totalPropostas || 0,
      `"${c.ultimoServico || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `clientes_trampocerto_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Relatório CSV de clientes exportado com sucesso!');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      {/* 1. Header with Breadcrumb & New Client CTA */}
      <ClientesHeader
        totalCount={clientes.length}
        onOpenNovoCliente={() => setModalNovoOpen(true)}
        onExport={handleExportCsv}
      />

      {/* 2. Top Metrics (Total, PF vs PJ, Ticket Médio, Top Faturamento) */}
      <ClientesMetrics clientes={clientes} />

      {/* 3. Table with Search, Filter & Actions */}
      <ClientesTable
        clientes={clientes}
        onSelectCliente={(c) => setSelectedCliente(c)}
      />

      {/* Modal: Novo Cliente */}
      <NovoClienteModal
        open={modalNovoOpen}
        onClose={() => setModalNovoOpen(false)}
        onClienteCreated={handleClienteCreated}
      />

      {/* Modal: Detalhes do Cliente */}
      <ClienteDetalhesModal
        open={Boolean(selectedCliente)}
        onClose={() => setSelectedCliente(null)}
        cliente={selectedCliente}
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
