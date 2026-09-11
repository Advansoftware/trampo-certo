'use client';

import React from 'react';
import Box from '@mui/material/Box';
import ClientesHeader from '@/components/clientes/ClientesHeader';
import ClientesMetrics from '@/components/clientes/ClientesMetrics';
import ClientesTable from '@/components/clientes/ClientesTable';
import NovoClienteModal from '@/components/clientes/NovoClienteModal';
import ClienteDetalhesModal from '@/components/clientes/ClienteDetalhesModal';
import EstadoCarregamento from '@/components/common/EstadoCarregamento';
import Toast from '@/components/common/Toast';
import { useClientes } from '@/hooks/useClientes';
import { useToast } from '@/hooks/useToast';
import { baixarCsv, sufixoDataArquivo } from '@/lib/format';
import { Cliente } from '@/types';

const CABECALHOS_CSV = [
  'Nome', 'Tipo', 'Documento', 'Telefone', 'E-mail', 'Cidade', 'Bairro',
  'Total Faturado', 'Propostas Aprovadas', 'Total Propostas', 'Último Serviço',
];

export default function ClientesPage() {
  const { clientes, loading, error, reload, criar, atualizar } = useClientes();
  const { toast, showToast, showError, hideToast } = useToast();

  const [modalNovoAberto, setModalNovoAberto] = React.useState(false);
  const [clienteSelecionado, setClienteSelecionado] = React.useState<Cliente | null>(null);

  // Mantém o modal sincronizado com a lista após uma edição de tags.
  const clienteEmDetalhe = clienteSelecionado
    ? clientes.find((item) => item.id === clienteSelecionado.id) ?? clienteSelecionado
    : null;

  const exportarCsv = () => {
    if (clientes.length === 0) {
      showToast('Nenhum cliente disponível para exportação.', 'warning');
      return;
    }

    baixarCsv(
      `clientes_trampocerto_${sufixoDataArquivo()}.csv`,
      CABECALHOS_CSV,
      clientes.map((cliente) => [
        cliente.nome,
        cliente.tipo,
        cliente.documento,
        cliente.telefone,
        cliente.email,
        cliente.cidade,
        cliente.bairro,
        cliente.totalFaturado.toFixed(2),
        cliente.propostasAprovadas,
        cliente.totalPropostas,
        cliente.ultimoServico,
      ]),
    );
    showToast('Relatório CSV de clientes exportado com sucesso!');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 } }}>
      <ClientesHeader
        totalCount={clientes.length}
        onOpenNovoCliente={() => setModalNovoAberto(true)}
        onExport={exportarCsv}
      />

      <EstadoCarregamento loading={loading} error={error} onRetry={reload} minHeight={140}>
        <ClientesMetrics clientes={clientes} />
      </EstadoCarregamento>

      <EstadoCarregamento loading={loading} error={error} onRetry={reload} minHeight={320}>
        <ClientesTable clientes={clientes} onSelectCliente={setClienteSelecionado} />
      </EstadoCarregamento>

      <NovoClienteModal
        open={modalNovoAberto}
        onClose={() => setModalNovoAberto(false)}
        onCriarCliente={criar}
        onClienteCriado={(cliente) => showToast(`Cliente "${cliente.nome}" cadastrado com sucesso!`)}
      />

      <ClienteDetalhesModal
        open={Boolean(clienteEmDetalhe)}
        onClose={() => setClienteSelecionado(null)}
        cliente={clienteEmDetalhe}
        onAtualizarTags={(id, tags) => atualizar(id, { tags })}
        onErro={showError}
      />

      <Toast message={toast.message} severity={toast.severity} onClose={hideToast} />
    </Box>
  );
}
