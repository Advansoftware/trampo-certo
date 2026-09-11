import { Orcamento } from '@/types';
import { baixarCsv, formatDataEnvio, sufixoDataArquivo } from '@/lib/format';

const CABECALHOS = ['Código', 'Cliente', 'Telefone', 'Serviço', 'Data', 'Valor Total', 'Status'];

/** Exportação usada pelo dashboard e pela tela de orçamentos. */
export function exportarOrcamentosCsv(orcamentos: Orcamento[], prefixo = 'orcamentos_trampocerto'): void {
  baixarCsv(
    `${prefixo}_${sufixoDataArquivo()}.csv`,
    CABECALHOS,
    orcamentos.map((orcamento) => [
      orcamento.codigo,
      orcamento.clienteNome,
      orcamento.clienteTelefone,
      orcamento.servicoDescricao,
      formatDataEnvio(orcamento.createdAt),
      orcamento.valorTotal.toFixed(2),
      orcamento.status,
    ]),
  );
}
