'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import EstadoVazio from '@/components/common/EstadoVazio';
import OrcamentoPreviewModal from '@/components/orcamentos/OrcamentoPreviewModal';
import FiltroStatusTabs from './tabela/FiltroStatusTabs';
import OrcamentosDataTable from './tabela/OrcamentosDataTable';
import { useAcoesOrcamento } from './tabela/useAcoesOrcamento';
import { useFiltroOrcamentos } from './tabela/useFiltroOrcamentos';
import { Orcamento, OrcamentoStatus } from '@/types';

interface OrcamentosTableProps {
  orcamentos: Orcamento[];
  onAlterarStatus: (id: string, status: OrcamentoStatus) => Promise<unknown>;
  onSucesso?: (mensagem: string, status: OrcamentoStatus) => void;
  onErro?: (erro: unknown) => void;
}

/** Listagem completa de orçamentos: busca + filtros + tabela compartilhada. */
export default function OrcamentosTable({
  orcamentos,
  onAlterarStatus,
  onSucesso,
  onErro,
}: OrcamentosTableProps) {
  const router = useRouter();
  const { termoBusca, setTermoBusca, filtro, setFiltro, filtrados, contadores } =
    useFiltroOrcamentos(orcamentos);
  const { preview, fecharPreview, idEmProcessamento, acoes } = useAcoesOrcamento({
    onAlterarStatus,
    onSucesso,
    onErro,
  });

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(196, 198, 207, 0.4)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(30, 41, 59, 0.03)',
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderBottom: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <TextField
          placeholder="Buscar por cliente, serviço ou código..."
          size="small"
          value={termoBusca}
          onChange={(evento) => setTermoBusca(evento.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#74777F', fontSize: 20 }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '9999px',
                bgcolor: '#F8F9FD',
                fontSize: '0.8125rem',
                '& fieldset': { borderColor: 'rgba(196, 198, 207, 0.5)' },
                '&:hover fieldset': { borderColor: '#1E3A8A' },
                '&.Mui-focused fieldset': { borderColor: '#1E3A8A', borderWidth: '1.5px' },
              },
            },
          }}
          sx={{ minWidth: { xs: '100%', md: 340 } }}
        />

        <FiltroStatusTabs filtro={filtro} onChange={setFiltro} contadores={contadores} />
      </Box>

      <OrcamentosDataTable
        orcamentos={filtrados}
        idEmProcessamento={idEmProcessamento}
        estadoVazio={
          <EstadoVazio
            icone={<RequestQuoteIcon sx={{ fontSize: 24 }} />}
            titulo={
              contadores.todos === 0
                ? 'Você ainda não criou nenhum orçamento'
                : 'Nenhum orçamento encontrado'
            }
            descricao={
              contadores.todos === 0
                ? 'Monte sua primeira proposta em poucos minutos e envie direto pelo WhatsApp.'
                : 'Ajuste a busca ou selecione outro filtro de status.'
            }
            acaoLabel={contadores.todos === 0 ? 'Criar orçamento' : undefined}
            onAcao={contadores.todos === 0 ? () => router.push('/orcamentos/novo') : undefined}
          />
        }
        {...acoes}
      />

      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderTop: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: '12px', color: '#74777F' }}>
          Mostrando {filtrados.length} de {contadores.todos} orçamentos
        </Typography>
        <Typography sx={{ fontSize: '12px', color: '#74777F' }}>
          {contadores.aprovado} aprovados · {contadores.pendente} pendentes · {contadores.recusado} recusados
        </Typography>
      </Box>

      <OrcamentoPreviewModal open={Boolean(preview)} onClose={fecharPreview} orcamento={preview} />
    </Box>
  );
}
