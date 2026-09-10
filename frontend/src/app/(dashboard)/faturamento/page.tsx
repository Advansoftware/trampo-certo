'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FaturamentoHeader from '@/components/faturamento/FaturamentoHeader';
import FaturamentoMetrics from '@/components/faturamento/FaturamentoMetrics';
import FaturamentoThermometerCard from '@/components/faturamento/FaturamentoThermometerCard';
import RelatorioMensalTable, { MonthlyRevenueItem } from '@/components/faturamento/RelatorioMensalTable';
import DasPixModal from '@/components/faturamento/DasPixModal';
import { fetchMeiMetrics, fetchMonthlyRevenues } from '@/lib/api';

export default function FaturamentoPage() {
  const [metrics, setMetrics] = useState({
    faturamentoAcumulado: 42120.00,
    limiteAnual: 81000.00,
    percentualUtilizado: 52,
    saldoRestante: 38880.00,
    mediaMensal: 4680.00,
    dasMei: {
      competencia: 'Outubro/2026',
      valor: 75.60,
      vencimento: '20/10/2026',
      status: 'pendente',
      chavePix: '00020126580014br.gov.bcb.pix0136451237890001905204000053039865802BR5913RODRIGO SILVA6009SAO PAULO62070503***6304E2A1',
    },
  });
  const [months, setMonths] = useState<MonthlyRevenueItem[]>([]);
  const [pixModalOpen, setPixModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<MonthlyRevenueItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [m, rev] = await Promise.all([
        fetchMeiMetrics(),
        fetchMonthlyRevenues(),
      ]);
      if (m) setMetrics(m);
      if (Array.isArray(rev)) setMonths(rev);
    }
    load();
  }, []);

  const handleExportCsv = () => {
    const headers = ['Mês', 'Competência', 'Serviços sem NF (PF)', 'Serviços com NF (PJ)', 'Receita Total', 'Status DAS', 'Valor DAS'];
    const rows = months.map((m) => [
      m.mes,
      m.competencia,
      m.servicosSemNf.toFixed(2),
      m.servicosComNf.toFixed(2),
      m.total.toFixed(2),
      m.dasStatus,
      m.dasValor.toFixed(2),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_receitas_brutas_mei_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Relatório Mensal de Receitas Brutas exportado com sucesso!');
  };

  const handleOpenPayDas = (item?: MonthlyRevenueItem) => {
    setSelectedMonth(item || null);
    setPixModalOpen(true);
  };

  const handleMarkDasPaid = () => {
    if (selectedMonth) {
      setMonths((prev) =>
        prev.map((m) =>
          m.competencia === selectedMonth.competencia
            ? { ...m, dasStatus: 'pago', dasPagoEm: new Date().toLocaleDateString('pt-BR') }
            : m
        )
      );
    }
    setToastMessage('Guia DAS marcada como paga! Seu histórico foi atualizado.');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      {/* 1. Header with Export and Pay Actions */}
      <FaturamentoHeader
        onExport={handleExportCsv}
        onPayDas={() => handleOpenPayDas()}
      />

      {/* 2. Top Metric Cards */}
      <FaturamentoMetrics
        faturamentoAcumulado={metrics.faturamentoAcumulado}
        limiteAnual={metrics.limiteAnual}
        saldoRestante={metrics.saldoRestante}
        mediaMensal={metrics.mediaMensal}
        dasValor={metrics.dasMei?.valor || 75.60}
        dasVencimento={metrics.dasMei?.vencimento || '20/10/2026'}
      />

      {/* 3. Visual MEI Thermometer Card with Scale and Diagnostics */}
      <FaturamentoThermometerCard
        faturamentoAcumulado={metrics.faturamentoAcumulado}
        limiteAnual={metrics.limiteAnual}
        saldoRestante={metrics.saldoRestante}
      />

      {/* 4. Full 12-Month Table of Monthly Revenues & DAS Status */}
      <RelatorioMensalTable
        months={months}
        onPayDas={(item) => handleOpenPayDas(item)}
      />

      {/* 5. DAS Pix Payment Modal */}
      <DasPixModal
        open={pixModalOpen}
        onClose={() => setPixModalOpen(false)}
        competencia={selectedMonth?.competencia || metrics.dasMei?.competencia || 'Outubro/2026'}
        valor={selectedMonth?.dasValor || metrics.dasMei?.valor || 75.60}
        vencimento={metrics.dasMei?.vencimento || '20/10/2026'}
        chavePix={metrics.dasMei?.chavePix}
        onMarkPaid={handleMarkDasPaid}
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
