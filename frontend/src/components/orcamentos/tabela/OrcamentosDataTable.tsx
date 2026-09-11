'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Orcamento } from '@/types';
import { formatDataEnvio, formatMoeda, iniciais } from '@/lib/format';
import OrcamentoLinhaAcoes, { OrcamentoAcoes } from './OrcamentoLinhaAcoes';
import { visualDoStatus } from './statusOrcamento';

interface OrcamentosDataTableProps extends OrcamentoAcoes {
  orcamentos: Orcamento[];
  idEmProcessamento?: string | null;
  estadoVazio: React.ReactNode;
}

const CABECALHOS = [
  { label: 'Código', align: 'left' as const, pl: 2.5 },
  { label: 'Cliente', align: 'left' as const },
  { label: 'Serviço Técnico', align: 'left' as const },
  { label: 'Data', align: 'left' as const },
  { label: 'Valor Total', align: 'right' as const },
  { label: 'Status', align: 'center' as const },
  { label: 'Ações', align: 'right' as const, pr: 2.5 },
];

const CORES_AVATAR = [
  { bg: '#DBEAFE', color: '#172554' },
  { bg: '#E8EDF5', color: '#1E3A8A' },
  { bg: '#F1F4F9', color: '#2563EB' },
];

/**
 * Tabela de orçamentos usada tanto no card do dashboard quanto na tela de
 * Orçamentos. Antes eram duas cópias que divergiam a cada ajuste.
 */
export default function OrcamentosDataTable({
  orcamentos,
  idEmProcessamento,
  estadoVazio,
  ...acoes
}: OrcamentosDataTableProps) {
  return (
    <TableContainer sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 860 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F8F9FD' }}>
            {CABECALHOS.map((coluna) => (
              <TableCell
                key={coluna.label}
                sx={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: '#74777F',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  py: 1.5,
                  textAlign: coluna.align,
                  pl: coluna.pl,
                  pr: coluna.pr,
                }}
              >
                {coluna.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {orcamentos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={CABECALHOS.length} sx={{ p: 0, borderBottom: 'none' }}>
                {estadoVazio}
              </TableCell>
            </TableRow>
          ) : (
            orcamentos.map((orcamento, indice) => {
              const status = visualDoStatus(orcamento.status);
              const avatar = CORES_AVATAR[indice % CORES_AVATAR.length];

              return (
                <TableRow
                  key={orcamento.id}
                  sx={{
                    '&:hover': { bgcolor: '#F8F9FD' },
                    transition: 'background-color 0.15s ease',
                    borderBottom: '1px solid rgba(196, 198, 207, 0.25)',
                  }}
                >
                  <TableCell sx={{ pl: 2.5, py: 2 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 1.25,
                        py: 0.35,
                        borderRadius: '8px',
                        bgcolor: '#F1F4F9',
                        color: '#1E3A8A',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        border: '1px solid rgba(30, 58, 138, 0.15)',
                      }}
                    >
                      {orcamento.codigo}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ py: 2, whiteSpace: 'nowrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          bgcolor: avatar.bg,
                          color: avatar.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8125rem',
                          flexShrink: 0,
                        }}
                      >
                        {iniciais(orcamento.clienteNome)}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20' }}>
                          {orcamento.clienteNome}
                        </Typography>
                        {orcamento.clienteTelefone && (
                          <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                            {orcamento.clienteTelefone}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ py: 2, maxWidth: 280 }}>
                    <Typography
                      sx={{
                        fontSize: '0.8125rem',
                        color: '#43474E',
                        fontWeight: 500,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {orcamento.servicoDescricao || 'Serviço sob demanda'}
                    </Typography>
                    {orcamento.condicoesPagamento && (
                      <Typography sx={{ fontSize: '0.6875rem', color: '#74777F', mt: 0.25 }}>
                        {orcamento.condicoesPagamento}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell sx={{ py: 2, whiteSpace: 'nowrap' }}>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#43474E' }}>
                      {formatDataEnvio(orcamento.createdAt)}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 2, textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 800, color: '#1A1B20' }}>
                      {formatMoeda(orcamento.valorTotal)}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 2, textAlign: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,
                        px: 1.5,
                        py: 0.4,
                        borderRadius: '9999px',
                        bgcolor: status.bg,
                        color: status.color,
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                      }}
                    >
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: status.dot }} />
                      {status.label}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ py: 2, pr: 2.5, textAlign: 'right' }}>
                    <OrcamentoLinhaAcoes
                      orcamento={orcamento}
                      ocupado={idEmProcessamento === orcamento.id}
                      {...acoes}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
