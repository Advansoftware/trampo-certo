'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import AppButton from '@/components/common/AppButton';
import EstadoVazio from '@/components/common/EstadoVazio';
import OrcamentoPreviewModal from '@/components/orcamentos/OrcamentoPreviewModal';
import FiltroStatusTabs from '@/components/orcamentos/tabela/FiltroStatusTabs';
import OrcamentosDataTable from '@/components/orcamentos/tabela/OrcamentosDataTable';
import { exportarOrcamentosCsv } from '@/components/orcamentos/tabela/exportarOrcamentosCsv';
import { useAcoesOrcamento } from '@/components/orcamentos/tabela/useAcoesOrcamento';
import { useFiltroOrcamentos } from '@/components/orcamentos/tabela/useFiltroOrcamentos';
import { Orcamento, OrcamentoStatus } from '@/types';

interface RecentProposalsTableProps {
  orcamentos: Orcamento[];
  onAlterarStatus: (id: string, status: OrcamentoStatus) => Promise<unknown>;
  onSucesso?: (mensagem: string) => void;
  onErro?: (erro: unknown) => void;
}

/** Card do dashboard: mesma tabela da tela de Orçamentos, com filtro compacto. */
export default function RecentProposalsTable({
  orcamentos,
  onAlterarStatus,
  onSucesso,
  onErro,
}: RecentProposalsTableProps) {
  const router = useRouter();
  const { filtro, setFiltro, filtrados, contadores } = useFiltroOrcamentos(orcamentos);
  const { preview, fecharPreview, idEmProcessamento, acoes } = useAcoesOrcamento({
    onAlterarStatus,
    onSucesso,
    onErro,
  });

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid rgba(196, 198, 207, 0.4)',
        p: { xs: 2.5, sm: 3.5 },
        boxShadow: '0 1px 4px rgba(30, 41, 59, 0.03)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1A1B20', fontSize: '1.125rem', letterSpacing: '-0.01em' }}>
            Orçamentos recentes
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', mt: 0.25 }}>
            Em que pé está cada proposta, e o atalho para responder pelo WhatsApp.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <FiltroStatusTabs filtro={filtro} onChange={setFiltro} contadores={contadores} variante="compacto" />

          <Typography
            onClick={() => router.push('/orcamentos')}
            sx={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#1E3A8A',
              px: 1.5,
              py: 0.75,
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
              '&:hover': { bgcolor: '#DBEAFE' },
            }}
          >
            Ver todos ({contadores.todos})
          </Typography>

          <AppButton
            variant="primary"
            size="small"
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            onClick={() => router.push('/orcamentos/novo')}
            sx={{ fontSize: '12px' }}
          >
            Novo
          </AppButton>
        </Box>
      </Box>

      <OrcamentosDataTable
        orcamentos={filtrados}
        idEmProcessamento={idEmProcessamento}
        estadoVazio={
          <EstadoVazio
            icone={<FilterListIcon sx={{ fontSize: 24 }} />}
            titulo={
              contadores.todos === 0 ? 'Nenhum orçamento criado ainda' : 'Nenhum orçamento para este filtro'
            }
            descricao={
              contadores.todos === 0
                ? 'Crie sua primeira proposta e ela aparece aqui com status e ações rápidas.'
                : 'Selecione outro filtro para ver as demais propostas.'
            }
            acaoLabel={contadores.todos === 0 ? 'Criar orçamento' : undefined}
            onAcao={contadores.todos === 0 ? () => router.push('/orcamentos/novo') : undefined}
          />
        }
        {...acoes}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 2.5,
          fontSize: '12px',
          color: '#74777F',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Typography component="span" sx={{ fontSize: '12px', color: '#74777F' }}>
          Mostrando {filtrados.length} de {contadores.todos} orçamentos
        </Typography>
        <Typography
          component="span"
          onClick={() => exportarOrcamentosCsv(orcamentos, 'orcamentos_dashboard')}
          sx={{
            fontSize: '12px',
            color: '#1E3A8A',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'color 0.15s ease',
            '&:hover': { textDecoration: 'underline', color: '#1D4ED8' },
          }}
        >
          Exportar histórico em CSV para o contador
        </Typography>
      </Box>

      <OrcamentoPreviewModal open={Boolean(preview)} onClose={fecharPreview} orcamento={preview} />
    </Box>
  );
}
