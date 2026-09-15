'use client';

import React from 'react';
import Box from '@mui/material/Box';
import RecibosHeader from '@/components/recibos/RecibosHeader';
import RecibosMetrics from '@/components/recibos/RecibosMetrics';
import RecibosTable from '@/components/recibos/RecibosTable';
import NovoReciboModal from '@/components/recibos/NovoReciboModal';
import EstadoCarregamento from '@/components/common/EstadoCarregamento';
import Toast from '@/components/common/Toast';
import { useRecibos } from '@/hooks/useRecibos';
import { useToast } from '@/hooks/useToast';
import { baixarCsv, formatDataHora, sufixoDataArquivo } from '@/lib/format';

const CABECALHOS_CSV = [
  'Código', 'Cliente', 'Documento', 'Serviço', 'Valor', 'Forma de Pagamento', 'Data', 'Autenticação',
];

export default function RecibosPage() {
  const { recibos, loading, error, reload, emitir } = useRecibos();
  const { toast, showToast, hideToast } = useToast();
  const [modalAberto, setModalAberto] = React.useState(false);

  const exportarCsv = () => {
    if (recibos.length === 0) {
      showToast('Não há recibo para exportar.', 'warning');
      return;
    }

    baixarCsv(
      `recibos_trampocerto_${sufixoDataArquivo()}.csv`,
      CABECALHOS_CSV,
      recibos.map((recibo) => [
        recibo.codigo,
        recibo.clienteNome,
        recibo.clienteDocumento,
        recibo.servicoDescricao,
        recibo.valor.toFixed(2),
        recibo.formaPagamentoLabel,
        formatDataHora(recibo.dataPagamento),
        recibo.autenticacao,
      ]),
    );
    showToast('Arquivo CSV com os recibos baixado.');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      <RecibosHeader
        totalCount={recibos.length}
        onNewRecibo={() => setModalAberto(true)}
        onExport={exportarCsv}
      />

      <EstadoCarregamento loading={loading} error={error} onRetry={reload} minHeight={140}>
        <RecibosMetrics recibos={recibos} />
      </EstadoCarregamento>

      <EstadoCarregamento loading={loading} error={error} onRetry={reload} minHeight={320}>
        <RecibosTable recibos={recibos} />
      </EstadoCarregamento>

      <NovoReciboModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onEmitir={emitir}
        onEmitido={(recibo) => showToast(`Recibo ${recibo.codigo} emitido.`)}
      />

      <Toast message={toast.message} severity={toast.severity} onClose={hideToast} />
    </Box>
  );
}
