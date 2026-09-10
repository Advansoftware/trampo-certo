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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import AppButton from '@/components/common/AppButton';

export interface MonthlyRevenueItem {
  mes: string;
  competencia: string;
  servicosSemNf: number;
  servicosComNf: number;
  total: number;
  dasStatus: string; // 'pago' | 'pendente' | 'a_vencer'
  dasValor: number;
  dasPagoEm?: string | null;
}

interface RelatorioMensalTableProps {
  months: MonthlyRevenueItem[];
  onPayDas: (item: MonthlyRevenueItem) => void;
}

export default function RelatorioMensalTable({ months, onPayDas }: RelatorioMensalTableProps) {
  const formatMoney = (val: number) =>
    `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const totalSemNf = months.reduce((acc, m) => acc + (m.servicosSemNf || 0), 0);
  const totalComNf = months.reduce((acc, m) => acc + (m.servicosComNf || 0), 0);
  const totalGeral = months.reduce((acc, m) => acc + (m.total || 0), 0);

  const getStatusBadge = (status: string, pagoEm?: string | null) => {
    switch (status) {
      case 'pago':
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.5,
              py: 0.35,
              borderRadius: '9999px',
              bgcolor: '#DCFCE7',
              color: '#166534',
              fontSize: '0.6875rem',
              fontWeight: 700,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 13 }} />
            Pago {pagoEm ? `(${pagoEm.slice(0, 5)})` : ''}
          </Box>
        );
      case 'pendente':
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.5,
              py: 0.35,
              borderRadius: '9999px',
              bgcolor: '#FEF3C7',
              color: '#92400E',
              fontSize: '0.6875rem',
              fontWeight: 700,
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 13 }} />
            Aberto
          </Box>
        );
      default:
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 1.25,
              py: 0.35,
              borderRadius: '9999px',
              bgcolor: '#F1F4F9',
              color: '#74777F',
              fontSize: '0.6875rem',
              fontWeight: 600,
            }}
          >
            Futuro
          </Box>
        );
    }
  };

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
      {/* Table Header Description */}
      <Box
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderBottom: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 1.5,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1B20' }}>
            Relatório Mensal das Receitas Brutas (MEI)
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', mt: 0.25 }}>
            Documento exigido pela Receita Federal a ser preenchido até o dia 20 do mês subsequente.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 0.75,
            borderRadius: '12px',
            bgcolor: '#F8F9FD',
            border: '1px solid rgba(196, 198, 207, 0.4)',
            fontSize: '0.8125rem',
            color: '#1E3A8A',
            fontWeight: 700,
          }}
        >
          Ano-Calendário: 2026
        </Box>
      </Box>

      {/* Table Content */}
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 840 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F8F9FD' }}>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', py: 1.5, pl: 3 }}>
                Mês / Competência
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', py: 1.5, textAlign: 'right' }}>
                Serviços Sem NF (PF)
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', py: 1.5, textAlign: 'right' }}>
                Serviços Com NF (PJ)
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', py: 1.5, textAlign: 'right' }}>
                Receita Total Mês
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', py: 1.5, textAlign: 'center' }}>
                Guia DAS
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', py: 1.5, textAlign: 'right', pr: 3 }}>
                Ação
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {months.map((row, idx) => {
              const isPast = row.total > 0 || row.dasStatus === 'pago';
              return (
                <TableRow
                  key={row.competencia || idx}
                  sx={{
                    '&:hover': { bgcolor: '#F8F9FD' },
                    borderBottom: '1px solid rgba(196, 198, 207, 0.25)',
                    bgcolor: row.dasStatus === 'pendente' && isPast ? '#FFFBEB' : 'transparent',
                  }}
                >
                  {/* Mês */}
                  <TableCell sx={{ pl: 3, py: 2 }}>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20' }}>
                      {row.mes}
                    </Typography>
                    <Typography sx={{ fontSize: '0.6875rem', color: '#74777F' }}>
                      {row.competencia}
                    </Typography>
                  </TableCell>

                  {/* Sem NF */}
                  <TableCell sx={{ py: 2, textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '0.8125rem', color: row.servicosSemNf > 0 ? '#43474E' : '#A0A3AD' }}>
                      {formatMoney(row.servicosSemNf)}
                    </Typography>
                  </TableCell>

                  {/* Com NF */}
                  <TableCell sx={{ py: 2, textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '0.8125rem', color: row.servicosComNf > 0 ? '#43474E' : '#A0A3AD' }}>
                      {formatMoney(row.servicosComNf)}
                    </Typography>
                  </TableCell>

                  {/* Total Mês */}
                  <TableCell sx={{ py: 2, textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 800, color: row.total > 0 ? '#1A1B20' : '#A0A3AD' }}>
                      {formatMoney(row.total)}
                    </Typography>
                  </TableCell>

                  {/* Guia DAS */}
                  <TableCell sx={{ py: 2, textAlign: 'center' }}>
                    {getStatusBadge(row.dasStatus, row.dasPagoEm)}
                  </TableCell>

                  {/* Ação */}
                  <TableCell sx={{ py: 2, pr: 3, textAlign: 'right' }}>
                    {row.dasStatus === 'pendente' && isPast ? (
                      <AppButton
                        variant="primary"
                        size="xsmall"
                        startIcon={<QrCode2Icon sx={{ fontSize: 15 }} />}
                        onClick={() => onPayDas(row)}
                        sx={{ bgcolor: '#1E3A8A' }}
                      >
                        Pagar Pix
                      </AppButton>
                    ) : (
                      <Typography sx={{ fontSize: '0.75rem', color: '#A0A3AD' }}>
                        {row.dasStatus === 'pago' ? 'Concluído' : 'Aguardando'}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Totalizador Anual Footer Row */}
            <TableRow sx={{ bgcolor: '#F8F9FD', borderTop: '2px solid rgba(196, 198, 207, 0.4)' }}>
              <TableCell sx={{ pl: 3, py: 2.5 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 800, color: '#1A1B20', textTransform: 'uppercase' }}>
                  Total Acumulado 2026
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2.5, textAlign: 'right' }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#43474E' }}>
                  {formatMoney(totalSemNf)}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2.5, textAlign: 'right' }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#43474E' }}>
                  {formatMoney(totalComNf)}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2.5, textAlign: 'right' }}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#1E3A8A' }}>
                  {formatMoney(totalGeral)}
                </Typography>
              </TableCell>
              <TableCell colSpan={2} sx={{ pr: 3, py: 2.5, textAlign: 'right' }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#166534', fontWeight: 700 }}>
                  52% do Limite Anual (R$ 81.000)
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
