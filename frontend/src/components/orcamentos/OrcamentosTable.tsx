'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PrintIcon from '@mui/icons-material/Print';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import AppButton from '@/components/common/AppButton';
import OrcamentoPreviewModal from './OrcamentoPreviewModal';

export interface OrcamentoItemData {
  id: string;
  codigo?: string;
  clienteNome: string;
  clienteTelefone?: string;
  clienteEmail?: string;
  servicoDescricao?: string;
  valorTotal: number | string;
  condicoesPagamento?: string;
  status: string;
  createdAt?: string;
  dataEnvio?: string;
  itens?: any[];
}

interface OrcamentosTableProps {
  proposals: OrcamentoItemData[];
  onStatusChange?: (id: string, newStatus: string) => void;
}

export default function OrcamentosTable({
  proposals: initialProposals,
  onStatusChange,
}: OrcamentosTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'todos' | 'pendente' | 'aprovado' | 'recusado'>('todos');
  const [proposals, setProposals] = useState<OrcamentoItemData[]>(initialProposals);
  const [selectedPreview, setSelectedPreview] = useState<OrcamentoItemData | null>(null);

  // Sync state if initialProposals change
  React.useEffect(() => {
    setProposals(initialProposals);
  }, [initialProposals]);

  const handleMarkApproved = (id: string) => {
    setProposals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'aprovado' } : item))
    );
    if (onStatusChange) {
      onStatusChange(id, 'aprovado');
    }
  };

  const handleSendWhatsApp = (item: OrcamentoItemData) => {
    const valFormatted =
      typeof item.valorTotal === 'number'
        ? item.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : item.valorTotal;

    const texto = encodeURIComponent(
      `Olá ${item.clienteNome}! 👋 Segue seu orçamento da TrampoCerto (${item.codigo || 'Orçamento'}):\n\n` +
      `🛠️ *Serviço:* ${item.servicoDescricao || 'Serviços especializados'}\n` +
      `💰 *Valor Total:* R$ ${valFormatted}\n` +
      (item.condicoesPagamento ? `💳 *Condições:* ${item.condicoesPagamento}\n` : '') +
      `\n🔗 Acesse a proposta completa: https://trampocerto.com.br/proposta/${item.id}\n\n` +
      `Qualquer dúvida, fico à disposição!`,
    );

    const tel = (item.clienteTelefone || '').replace(/\D/g, '');
    const url = tel ? `https://wa.me/55${tel}?text=${texto}` : `https://wa.me/?text=${texto}`;
    window.open(url, '_blank');
  };

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      // 1. Search filter
      const term = searchTerm.toLowerCase();
      const matchSearch =
        !term ||
        p.clienteNome?.toLowerCase().includes(term) ||
        p.servicoDescricao?.toLowerCase().includes(term) ||
        p.codigo?.toLowerCase().includes(term);

      // 2. Status tab filter
      const s = (p.status || '').toLowerCase();
      let matchStatus = true;
      if (activeFilter === 'aprovado') {
        matchStatus = s === 'aprovado' || s.includes('recibo') || s === 'concluido';
      } else if (activeFilter === 'pendente') {
        matchStatus = s !== 'aprovado' && !s.includes('recibo') && s !== 'concluido' && s !== 'recusado';
      } else if (activeFilter === 'recusado') {
        matchStatus = s === 'recusado';
      }

      return matchSearch && matchStatus;
    });
  }, [proposals, searchTerm, activeFilter]);

  const counts = useMemo(() => {
    const total = proposals.length;
    const aprovados = proposals.filter((p) => {
      const s = (p.status || '').toLowerCase();
      return s === 'aprovado' || s.includes('recibo') || s === 'concluido';
    }).length;
    const pendentes = proposals.filter((p) => {
      const s = (p.status || '').toLowerCase();
      return s !== 'aprovado' && !s.includes('recibo') && s !== 'concluido' && s !== 'recusado';
    }).length;
    const recusados = proposals.filter((p) => (p.status || '').toLowerCase() === 'recusado').length;

    return { total, aprovados, pendentes, recusados };
  }, [proposals]);

  const getStatusBadge = (rawStatus: string) => {
    const s = (rawStatus || '').toLowerCase();
    if (s === 'aprovado' || s.includes('recibo') || s === 'concluido') {
      return {
        label: 'Aprovado',
        bg: '#DBEAFE',
        color: '#172554',
        dot: '#1E3A8A',
      };
    }
    if (s === 'recusado') {
      return {
        label: 'Recusado',
        bg: '#FEE2E2',
        color: '#991B1B',
        dot: '#DC2626',
      };
    }
    return {
      label: 'Pendente',
      bg: '#FEF3C7',
      color: '#92400E',
      dot: '#D97706',
    };
  };

  const getInitials = (name: string) => {
    const parts = (name || '').trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (name || 'TC').substring(0, 2).toUpperCase();
  };

  const formatMoney = (val: number | string) => {
    if (typeof val === 'number') {
      return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return String(val).startsWith('R$') ? String(val) : `R$ ${val}`;
  };

  const formatDate = (p: OrcamentoItemData) => {
    if (p.dataEnvio) return p.dataEnvio;
    if (p.createdAt) {
      try {
        const d = new Date(p.createdAt);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
      } catch {
        return 'Recente';
      }
    }
    return '10 Out';
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
      {/* Table Toolbar: Search & Status Filters */}
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
        {/* Search Field */}
        <TextField
          placeholder="Buscar por cliente, serviço ou código..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Status Filter Pills */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            overflowX: 'auto',
            pb: { xs: 1, md: 0 },
          }}
        >
          {[
            { key: 'todos', label: 'Todos', count: counts.total },
            { key: 'pendente', label: 'Pendentes', count: counts.pendentes },
            { key: 'aprovado', label: 'Aprovados', count: counts.aprovados },
            { key: 'recusado', label: 'Recusados', count: counts.recusados },
          ].map((tab) => {
            const isSelected = activeFilter === tab.key;
            return (
              <Box
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 1.75,
                  py: 0.75,
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 500,
                  bgcolor: isSelected ? '#1E3A8A' : '#F1F4F9',
                  color: isSelected ? '#FFFFFF' : '#43474E',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    bgcolor: isSelected ? '#1D4ED8' : '#E8EDF5',
                  },
                }}
              >
                <span>{tab.label}</span>
                <Box
                  component="span"
                  sx={{
                    px: 0.75,
                    py: 0.1,
                    borderRadius: '9999px',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    bgcolor: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                    color: isSelected ? '#FFFFFF' : '#43474E',
                  }}
                >
                  {tab.count}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Main Table Container */}
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 860 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F8F9FD' }}>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, pl: 3 }}>
                Código
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5 }}>
                Cliente
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5 }}>
                Serviço Técnico
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5 }}>
                Data
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, textAlign: 'right' }}>
                Valor Total
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, textAlign: 'center' }}>
                Status
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, textAlign: 'right', pr: 3 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProposals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ py: 8, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: '#F1F4F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#74777F',
                      }}
                    >
                      <FilterListIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: '#1A1B20', fontSize: '1rem' }}>
                      Nenhum orçamento encontrado
                    </Typography>
                    <Typography sx={{ color: '#74777F', fontSize: '0.8125rem', maxWidth: 360 }}>
                      Não encontramos propostas para o filtro atual. Tente alterar o termo de busca ou o status.
                    </Typography>
                    {searchTerm && (
                      <AppButton variant="surface" size="small" onClick={() => setSearchTerm('')}>
                        Limpar busca
                      </AppButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredProposals.map((row, idx) => {
                const statusBadge = getStatusBadge(row.status);
                const isApproved = (row.status || '').toLowerCase() === 'aprovado' || (row.status || '').toLowerCase().includes('recibo');

                return (
                  <TableRow
                    key={row.id || idx}
                    sx={{
                      '&:hover': { bgcolor: '#F8F9FD' },
                      transition: 'background-color 0.15s ease',
                      borderBottom: '1px solid rgba(196, 198, 207, 0.25)',
                    }}
                  >
                    {/* Código / Badge */}
                    <TableCell sx={{ pl: 3, py: 2 }}>
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
                        {row.codigo || `#0${42 - idx}`}
                      </Box>
                    </TableCell>

                    {/* Cliente */}
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            bgcolor: idx % 3 === 0 ? '#DBEAFE' : idx % 3 === 1 ? '#E8EDF5' : '#F1F4F9',
                            color: idx % 3 === 0 ? '#172554' : idx % 3 === 1 ? '#1E3A8A' : '#2563EB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(row.clienteNome)}
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20', lineHeight: 1.2 }}>
                            {row.clienteNome}
                          </Typography>
                          {row.clienteTelefone && (
                            <Typography sx={{ fontSize: '0.75rem', color: '#74777F', mt: 0.25 }}>
                              {row.clienteTelefone}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Serviço */}
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
                        {row.servicoDescricao || 'Serviço sob demanda'}
                      </Typography>
                      {row.condicoesPagamento && (
                        <Typography sx={{ fontSize: '0.6875rem', color: '#74777F', mt: 0.25 }}>
                          {row.condicoesPagamento}
                        </Typography>
                      )}
                    </TableCell>

                    {/* Data */}
                    <TableCell sx={{ py: 2, whiteSpace: 'nowrap' }}>
                      <Typography sx={{ fontSize: '0.8125rem', color: '#43474E' }}>
                        {formatDate(row)}
                      </Typography>
                    </TableCell>

                    {/* Valor Total */}
                    <TableCell sx={{ py: 2, textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: 800, color: '#1A1B20' }}>
                        {formatMoney(row.valorTotal)}
                      </Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell sx={{ py: 2, textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,
                          px: 1.5,
                          py: 0.4,
                          borderRadius: '9999px',
                          bgcolor: statusBadge.bg,
                          color: statusBadge.color,
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: statusBadge.dot,
                          }}
                        />
                        {statusBadge.label}
                      </Box>
                    </TableCell>

                    {/* Ações */}
                    <TableCell sx={{ py: 2, pr: 3, textAlign: 'right' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                        {/* WhatsApp */}
                        <Box
                          onClick={() => handleSendWhatsApp(row)}
                          title="Enviar proposta no WhatsApp"
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#15803D',
                            bgcolor: '#DCFCE7',
                            transition: 'all 0.15s ease',
                            '&:hover': { bgcolor: '#BBF7D0', transform: 'scale(1.05)' },
                          }}
                        >
                          <WhatsAppIcon sx={{ fontSize: 17 }} />
                        </Box>

                        {/* Ver / Imprimir */}
                        <Box
                          onClick={() => setSelectedPreview(row)}
                          title="Visualizar documento em modal"
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#1E3A8A',
                            bgcolor: '#DBEAFE',
                            transition: 'all 0.15s ease',
                            '&:hover': { bgcolor: '#BFDBFE', transform: 'scale(1.05)' },
                          }}
                        >
                          <VisibilityIcon sx={{ fontSize: 17 }} />
                        </Box>

                        {/* Marcar Pago / Aprovado */}
                        {isApproved ? (
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.5,
                              px: 1.25,
                              py: 0.4,
                              borderRadius: '9999px',
                              bgcolor: '#DCFCE7',
                              color: '#166534',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                            }}
                          >
                            <CheckCircleIcon sx={{ fontSize: 13 }} />
                            Aprovado
                          </Box>
                        ) : (
                          <AppButton
                            variant="table-action"
                            size="xsmall"
                            onClick={() => handleMarkApproved(row.id)}
                            startIcon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                          >
                            Aprovar
                          </AppButton>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer Info */}
      <Box
        sx={{
          p: 2,
          px: 3,
          bgcolor: '#F8F9FD',
          borderTop: '1px solid rgba(196, 198, 207, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#74777F',
        }}
      >
        <span>
          Mostrando {filteredProposals.length} de {proposals.length} orçamentos
        </span>
        <span>
          Atualização automática ativada
        </span>
      </Box>

      {/* Modal de Pré-visualização A4 */}
      <OrcamentoPreviewModal
        open={Boolean(selectedPreview)}
        onClose={() => setSelectedPreview(null)}
        orcamento={selectedPreview}
      />
    </Box>
  );
}
