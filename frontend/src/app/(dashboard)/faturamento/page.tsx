'use client';

import React from 'react';
import Box from '@mui/material/Box';
import FaturamentoHeader from '@/components/faturamento/FaturamentoHeader';
import FaturamentoMetrics from '@/components/faturamento/FaturamentoMetrics';
import FaturamentoThermometerCard from '@/components/faturamento/FaturamentoThermometerCard';
import RelatorioMensalTable from '@/components/faturamento/RelatorioMensalTable';
import DasPixModal from '@/components/faturamento/DasPixModal';
import EstadoCarregamento from '@/components/common/EstadoCarregamento';
import Toast from '@/components/common/Toast';
import { useMeiMetrics, useReceitasMensais } from '@/hooks/useMei';
import { useToast } from '@/hooks/useToast';
import { baixarCsv, formatCompetencia } from '@/lib/format';
import { ReceitaMensal } from '@/types';

const CABECALHOS_CSV = [
  'Mês', 'Competência', 'Serviços sem NF (PF)', 'Serviços com NF (PJ)',
  'Receita Total', 'Status DAS', 'Valor DAS', 'Pago em',
];

export default function FaturamentoPage() {
  const ano = new Date().getFullYear();
  const metricas = useMeiMetrics(ano);
  const receitas = useReceitasMensais(ano);
  const { toast, showToast, showError, hideToast } = useToast();

  const [pixModalAberto, setPixModalAberto] = React.useState(false);
  const [mesSelecionado, setMesSelecionado] = React.useState<ReceitaMensal | null>(null);

  const das = metricas.metrics?.dasMei;

  const exportarCsv = () => {
    if (receitas.meses.length === 0) {
      showToast('Nenhuma receita disponível para exportação.', 'warning');
      return;
    }

    baixarCsv(
      `relatorio_receitas_brutas_mei_${ano}.csv`,
      CABECALHOS_CSV,
      receitas.meses.map((mes) => [
        mes.mes,
        formatCompetencia(mes.competencia),
        mes.servicosSemNf.toFixed(2),
        mes.servicosComNf.toFixed(2),
        mes.total.toFixed(2),
        mes.dasStatus,
        mes.dasValor.toFixed(2),
        mes.dasPagoEm || '',
      ]),
    );
    showToast('Relatório mensal de receitas brutas exportado com sucesso!');
  };

  const abrirPagamentoDas = (mes?: ReceitaMensal) => {
    setMesSelecionado(mes ?? receitas.meses.find((item) => item.competencia === das?.competencia) ?? null);
    setPixModalAberto(true);
  };

  const marcarDasPago = async () => {
    const competencia = mesSelecionado?.competencia || das?.competencia;
    if (!competencia) return;

    try {
      await receitas.pagarDas(competencia);
      await metricas.reload();
      showToast('Guia DAS marcada como paga! Seu histórico foi atualizado.');
    } catch (erro) {
      showError(erro);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      <FaturamentoHeader
        limiteAnual={metricas.metrics?.limiteAnual ?? 0}
        onExport={exportarCsv}
        onPayDas={() => abrirPagamentoDas()}
      />

      <EstadoCarregamento
        loading={metricas.loading}
        error={metricas.error}
        onRetry={metricas.reload}
        minHeight={140}
      >
        {metricas.metrics && das && (
          <FaturamentoMetrics
            faturamentoAcumulado={metricas.metrics.faturamentoAcumulado}
            limiteAnual={metricas.metrics.limiteAnual}
            saldoRestante={metricas.metrics.saldoRestante}
            mediaMensal={metricas.metrics.mediaMensal}
            dasValor={das.valor}
            dasVencimento={das.vencimento}
          />
        )}
      </EstadoCarregamento>

      <EstadoCarregamento
        loading={metricas.loading}
        error={metricas.error}
        onRetry={metricas.reload}
        minHeight={220}
      >
        {metricas.metrics && (
          <FaturamentoThermometerCard
            faturamentoAcumulado={metricas.metrics.faturamentoAcumulado}
            limiteAnual={metricas.metrics.limiteAnual}
            saldoRestante={metricas.metrics.saldoRestante}
          />
        )}
      </EstadoCarregamento>

      <EstadoCarregamento
        loading={receitas.loading}
        error={receitas.error}
        onRetry={receitas.reload}
        minHeight={320}
      >
        <RelatorioMensalTable
          months={receitas.meses}
          limiteAnual={metricas.metrics?.limiteAnual ?? 0}
          onPayDas={abrirPagamentoDas}
        />
      </EstadoCarregamento>

      <DasPixModal
        open={pixModalAberto}
        onClose={() => setPixModalAberto(false)}
        competencia={formatCompetencia(mesSelecionado?.competencia || das?.competencia || '')}
        valor={mesSelecionado?.dasValor ?? das?.valor ?? 0}
        vencimento={das?.vencimento || ''}
        chavePix={das?.chavePix}
        onMarkPaid={() => void marcarDasPago()}
      />

      <Toast message={toast.message} severity={toast.severity} onClose={hideToast} />
    </Box>
  );
}
