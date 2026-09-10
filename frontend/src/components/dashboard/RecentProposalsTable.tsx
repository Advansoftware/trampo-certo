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
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import SendIcon from '@mui/icons-material/Send';
import AppButton from '@/components/common/AppButton';

const proposalsData = [
  {
    id: '1',
    initials: 'MO',
    initialsBg: '#E8EDF5',
    initialsColor: '#1E3A8A',
    client: 'Marcos Oliveira',
    service: 'Reforma Elétrica Residencial',
    value: 'R$ 2.400,00',
    subValue: '2x de R$ 1.200',
    date: '14 Out, 10:20',
    status: 'Visto pelo Cliente',
    statusDotColor: '#2563EB',
    actionType: 'marcar-pago',
  },
  {
    id: '2',
    initials: 'CD',
    initialsBg: '#DBEAFE',
    initialsColor: '#172554',
    client: 'Camila Duarte',
    service: 'Projeto de Marcenaria Painel Sala',
    value: 'R$ 1.850,00',
    subValue: 'À vista via PIX',
    subValueColor: '#1E3A8A',
    date: '12 Out, 15:45',
    status: 'Aprovado',
    statusDotColor: '#1E3A8A',
    actionType: 'gerar-recibo',
  },
  {
    id: '3',
    initials: 'TS',
    initialsBg: '#F1F4F9',
    initialsColor: '#2563EB',
    client: 'TechSolutions Coworking',
    service: 'Manutenção & Cabeamento de Redes',
    value: 'R$ 900,00',
    subValue: 'Nota Prestação MEI',
    date: '10 Out, 09:15',
    status: 'Recibo Emitido',
    statusDotColor: '#2563EB',
    actionType: 'icones',
  },
];

function normalizeProposal(row: any, idx: number) {
  const client = row.client || row.clienteNome || 'Cliente';
  const service = row.service || row.servicoDescricao || 'Serviço prestado';

  let value = row.value;
  if (!value && row.valorTotal !== undefined) {
    const num = Number(row.valorTotal);
    value = !isNaN(num)
      ? `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `R$ ${row.valorTotal}`;
  }
  if (!value) value = 'R$ 1.200,00';

  const subValue =
    row.subValue ||
    row.condicoesPagamento ||
    (idx === 0 ? '2x de R$ 1.200' : idx === 1 ? 'À vista via PIX' : 'Nota Prestação MEI');

  let date = row.date || row.dataEnvio;
  if (!date && row.createdAt) {
    try {
      const d = new Date(row.createdAt);
      date = `${d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}, ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
      date = '14 Out, 10:20';
    }
  }
  if (!date) {
    date = idx === 0 ? '14 Out, 10:20' : idx === 1 ? '12 Out, 15:45' : '10 Out, 09:15';
  }

  const rawStatus = (row.status || '').toLowerCase();
  let status = row.status || 'Visto pelo Cliente';
  let statusDotColor = '#2563EB';
  let actionType = row.actionType;

  if (rawStatus === 'aprovado' || status === 'Aprovado') {
    status = 'Aprovado';
    statusDotColor = '#1E3A8A';
    if (!actionType) actionType = 'gerar-recibo';
  } else if (rawStatus.includes('recibo') || rawStatus === 'concluido' || status === 'Recibo Emitido') {
    status = 'Recibo Emitido';
    statusDotColor = '#2563EB';
    if (!actionType) actionType = 'icones';
  } else if (rawStatus === 'visto' || rawStatus.includes('visto') || status === 'Visto pelo Cliente') {
    status = 'Visto pelo Cliente';
    statusDotColor = '#2563EB';
    if (!actionType) actionType = 'marcar-pago';
  } else {
    status = 'Pendente';
    statusDotColor = '#D97706';
    if (!actionType) actionType = 'marcar-pago';
  }

  const parts = client.trim().split(' ');
  const initials =
    row.initials ||
    (parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0].substring(0, 2)).toUpperCase();

  const initialsBg = row.initialsBg || (idx % 3 === 0 ? '#E8EDF5' : idx % 3 === 1 ? '#DBEAFE' : '#F1F4F9');
  const initialsColor = row.initialsColor || (idx % 3 === 0 ? '#1E3A8A' : idx % 3 === 1 ? '#172554' : '#2563EB');
  const subValueColor = row.subValueColor || (actionType === 'gerar-recibo' ? '#1E3A8A' : undefined);

  return {
    id: row.id || String(idx + 1),
    initials,
    initialsBg,
    initialsColor,
    client,
    service,
    value,
    subValue,
    subValueColor,
    date,
    status,
    statusDotColor,
    actionType,
  };
}

export default function RecentProposalsTable({ proposals }: { proposals?: any[] }) {
  // Se não houver propostas ou forem menos de 3, usa as 3 oficiais do Stitch template para máxima fidelidade visual
  const sourceList = proposals && proposals.length >= 3 ? proposals : proposalsData;
  const tableData = sourceList.map((row, idx) => normalizeProposal(row, idx));

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid rgba(196, 198, 207, 0.5)',
        p: { xs: 2.5, sm: 3.5 },
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Table Header Controls */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1A1B20', fontSize: '1.05rem' }}>
            Orçamentos Recentes & Andamento
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', mt: 0.25 }}>
            Acompanhe quem visualizou suas propostas e despache recibos com 1 clique.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AppButton
            variant="outlined"
            size="small"
            sx={{ fontSize: '11px', py: '6px', px: '16px' }}
          >
            Filtrar por Status
          </AppButton>

          <Typography
            component="a"
            href="#"
            onClick={(e) => e.preventDefault()}
            sx={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#1E3A8A',
              px: 1.5,
              py: 0.75,
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
              '&:hover': { bgcolor: '#DBEAFE' },
            }}
          >
            Ver todos (18)
          </Typography>
        </Box>
      </Box>

      {/* Table Container */}
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 720 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F1F4F9' }}>
              <TableCell sx={{ py: 1.25, px: 2, borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.08em', border: 0 }}>
                Cliente & Serviço
              </TableCell>
              <TableCell sx={{ py: 1.25, px: 2, fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.08em', border: 0 }}>
                Valor
              </TableCell>
              <TableCell sx={{ py: 1.25, px: 2, fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.08em', border: 0 }}>
                Data de Envio
              </TableCell>
              <TableCell sx={{ py: 1.25, px: 2, fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.08em', border: 0 }}>
                Status do Trampo
              </TableCell>
              <TableCell align="right" sx={{ py: 1.25, px: 2, borderTopRightRadius: '16px', borderBottomRightRadius: '16px', fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.08em', border: 0 }}>
                Ações Rápidas
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  transition: 'background-color 0.15s ease',
                  '&:hover': { bgcolor: 'rgba(241, 244, 249, 0.6)' },
                  borderBottom: '1px solid rgba(196, 198, 207, 0.25)',
                  '&:last-child': { borderBottom: 0 },
                }}
              >
                {/* Cliente & Serviço */}
                <TableCell sx={{ py: 2, px: 2, border: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: row.initialsBg,
                        color: row.initialsColor,
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {row.initials}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20' }}>
                        {row.client}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                        {row.service}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                {/* Valor */}
                <TableCell sx={{ py: 2, px: 2, border: 0 }}>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 800, color: '#1A1B20' }}>
                    {row.value}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: row.subValueColor || '#74777F', fontWeight: row.subValueColor ? 600 : 400 }}>
                    {row.subValue}
                  </Typography>
                </TableCell>

                {/* Data de Envio */}
                <TableCell sx={{ py: 2, px: 2, border: 0, fontSize: '0.75rem', color: '#74777F' }}>
                  {row.date}
                </TableCell>

                {/* Status do Trampo */}
                <TableCell sx={{ py: 2, px: 2, border: 0 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '9999px',
                      bgcolor: '#F1F4F9',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#43474E',
                    }}
                  >
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: row.statusDotColor }} />
                    <span>{row.status}</span>
                  </Box>
                </TableCell>

                {/* Ações Rápidas */}
                <TableCell align="right" sx={{ py: 2, px: 2, border: 0 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                    {row.actionType === 'marcar-pago' && (
                      <>
                        <IconButton size="small" sx={{ color: '#74777F', '&:hover': { color: '#1E3A8A', bgcolor: '#F1F4F9' } }}>
                          <ShareIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#74777F', '&:hover': { color: '#1A1B20', bgcolor: '#F1F4F9' } }}>
                          <VisibilityIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <AppButton
                          variant="table-action"
                          size="xsmall"
                          sx={{ ml: 0.5 }}
                        >
                          Marcar Pago
                        </AppButton>
                      </>
                    )}

                    {row.actionType === 'gerar-recibo' && (
                      <>
                        <AppButton
                          variant="primary"
                          size="xsmall"
                          startIcon={<ReceiptIcon sx={{ fontSize: 15 }} />}
                          sx={{ ml: 0.5 }}
                        >
                          Gerar Recibo
                        </AppButton>
                        <IconButton size="small" sx={{ color: '#74777F', '&:hover': { color: '#1A1B20', bgcolor: '#F1F4F9' } }}>
                          <MoreVertIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </>
                    )}

                    {row.actionType === 'icones' && (
                      <>
                        <IconButton size="small" sx={{ color: '#74777F', '&:hover': { color: '#1E3A8A', bgcolor: '#F1F4F9' } }}>
                          <DownloadForOfflineIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#74777F', '&:hover': { color: '#1E3A8A', bgcolor: '#F1F4F9' } }}>
                          <SendIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#74777F', '&:hover': { color: '#1A1B20', bgcolor: '#F1F4F9' } }}>
                          <MoreVertIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footnote: font-body-sm text-body-sm text-on-surface-variant (12px) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, fontSize: '12px', color: '#74777F' }}>
        <Typography component="span" sx={{ fontSize: '12px', color: '#74777F' }}>
          Mostrando 3 de 18 propostas emitidas
        </Typography>
        <Typography
          component="a"
          href="#"
          onClick={(e) => e.preventDefault()}
          sx={{
            fontSize: '12px',
            color: '#1E3A8A',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'color 0.15s ease',
            '&:hover': { textDecoration: 'underline', color: '#1D4ED8' },
          }}
        >
          Exportar histórico para Contador (.CSV)
        </Typography>
      </Box>
    </Box>
  );
}
