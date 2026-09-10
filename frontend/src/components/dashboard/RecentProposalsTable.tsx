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
import Tooltip from '@mui/material/Tooltip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import AppButton from '@/components/common/AppButton';
import OrcamentoPreviewModal from '@/components/orcamentos/OrcamentoPreviewModal';
import { OrcamentoItemData } from '@/components/orcamentos/OrcamentosTable';
import { updateOrcamentoStatus } from '@/lib/api';

function sanitizeText(str?: string): string {
  if (!str) return '';
  return str
    .replace(/ManutenÃ§Ã£o/g, 'Manutenção')
    .replace(/instalaÃ§Ã£o/g, 'instalação')
    .replace(/bifÃ¡sico/g, 'bifásico')
    .replace(/AdequaÃ§Ã£o/g, 'Adequação')
    .replace(/conclusÃ£o/g, 'conclusão')
    .replace(/elÃ©trica/g, 'elétrica')
    .replace(/elÃ¡trica/g, 'elétrica')
    .replace(/Ã€ vista/g, 'À vista')
    .replace(/Ã©/g, 'é')
    .replace(/Ã¡/g, 'á')
    .replace(/Ã£/g, 'ã')
    .replace(/Ã§/g, 'ç')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãª/g, 'ê')
    .replace(/Ã­/g, 'í')
    .replace(/Ãº/g, 'ú')
    .replace(/Â/g, '');
}

interface RecentProposalsTableProps {
  proposals?: any[];
}

export default function RecentProposalsTable({ proposals: initialProposals = [] }: RecentProposalsTableProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'todos' | 'pendente' | 'aprovado' | 'recusado'>('todos');
  const [proposals, setProposals] = useState<any[]>(initialProposals);
  const [selectedPreview, setSelectedPreview] = useState<OrcamentoItemData | null>(null);

  // Sincronizar com as props se atualizarem
  React.useEffect(() => {
    if (initialProposals && initialProposals.length > 0) {
      setProposals(initialProposals);
    }
  }, [initialProposals]);

  const handleMarkApproved = async (id: string) => {
    setProposals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'aprovado' } : item))
    );
    await updateOrcamentoStatus(id, 'aprovado');
  };

  const handleMarkRejected = async (id: string) => {
    setProposals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'recusado' } : item))
    );
    await updateOrcamentoStatus(id, 'recusado');
  };

  const handleEdit = (item: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('trampo_edit_orcamento', JSON.stringify(item));
    }
    router.push(`/orcamentos/novo?id=${item.id}`);
  };

  const handleSendWhatsApp = (item: any) => {
    const valFormatted =
      typeof item.valorTotal === 'number'
        ? item.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : item.valorTotal || item.value || '0,00';

    const texto = encodeURIComponent(
      `Olá ${sanitizeText(item.clienteNome || item.client)}! 👋 Segue seu orçamento da TrampoCerto (${item.codigo || 'Orçamento'}):\n\n` +
      `🛠️ *Serviço:* ${sanitizeText(item.servicoDescricao || item.service || 'Serviços especializados')}\n` +
      `💰 *Valor Total:* R$ ${valFormatted}\n` +
      (item.condicoesPagamento ? `💳 *Condições:* ${sanitizeText(item.condicoesPagamento)}\n` : '') +
      `\n🔗 Acesse a proposta completa: https://trampocerto.com.br/proposta/${item.id}\n\n` +
      `Qualquer dúvida, fico à disposição!`,
    );

    const tel = (item.clienteTelefone || '').replace(/\D/g, '');
    const url = tel ? `https://wa.me/55${tel}?text=${texto}` : `https://wa.me/?text=${texto}`;
    window.open(url, '_blank');
  };

  const handleExportCSV = () => {
    const headers = ['Código', 'Cliente', 'Telefone', 'Serviço', 'Data', 'Valor', 'Status'];
    const rows = proposals.map((p) => [
      p.codigo || p.id,
      `"${sanitizeText(p.clienteNome || p.client || '')}"`,
      `"${p.clienteTelefone || ''}"`,
      `"${sanitizeText(p.servicoDescricao || p.service || '').replace(/"/g, '""')}"`,
      p.dataEnvio || p.date || 'Recente',
      typeof p.valorTotal === 'number' ? p.valorTotal.toFixed(2) : String(p.valorTotal || p.value || 0),
      p.status || 'pendente',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orcamentos_dashboard_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    const s = String(val || '0,00');
    return s.startsWith('R$') ? s : `R$ ${s}`;
  };

  const formatDate = (p: any) => {
    if (p.dataEnvio) return sanitizeText(p.dataEnvio);
    if (p.date) return sanitizeText(p.date);
    if (p.createdAt) {
      try {
        const d = new Date(p.createdAt);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
      } catch {
        return 'Recente';
      }
    }
    return 'Recente';
  };

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

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      const s = (p.status || '').toLowerCase();
      if (activeFilter === 'aprovado') {
        return s === 'aprovado' || s.includes('recibo') || s === 'concluido';
      }
      if (activeFilter === 'pendente') {
        return s !== 'aprovado' && !s.includes('recibo') && s !== 'concluido' && s !== 'recusado';
      }
      if (activeFilter === 'recusado') {
        return s === 'recusado';
      }
      return true;
    });
  }, [proposals, activeFilter]);

  const counts = useMemo(() => {
    const total = proposals.length;
    const pendentes = proposals.filter((p) => {
      const s = (p.status || '').toLowerCase();
      return s !== 'aprovado' && !s.includes('recibo') && s !== 'concluido' && s !== 'recusado';
    }).length;
    const aprovados = proposals.filter((p) => {
      const s = (p.status || '').toLowerCase();
      return s === 'aprovado' || s.includes('recibo') || s === 'concluido';
    }).length;
    const recusados = proposals.filter((p) => (p.status || '').toLowerCase() === 'recusado').length;
    return { total, pendentes, aprovados, recusados };
  }, [proposals]);

  const filterTabs = [
    { key: 'todos', label: 'Todos', count: counts.total },
    { key: 'pendente', label: 'Pendentes', count: counts.pendentes },
    { key: 'aprovado', label: 'Aprovados', count: counts.aprovados },
    { key: 'recusado', label: 'Recusados', count: counts.recusados },
  ] as const;

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
      {/* Cabeçalho do Card */}
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
            Orçamentos Recentes & Andamento
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', mt: 0.25 }}>
            Acompanhe status, aprove serviços e envie propostas oficiais com 1 clique.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          {/* Tabs de Filtro Rápido */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, bgcolor: '#F8F9FD', p: 0.5, borderRadius: '9999px', border: '1px solid rgba(196, 198, 207, 0.4)' }}>
            {filterTabs.map((tab) => {
              const isSelected = activeFilter === tab.key;
              return (
                <Box
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  sx={{
                    px: 1.25,
                    py: 0.4,
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? 700 : 500,
                    bgcolor: isSelected ? '#1E3A8A' : 'transparent',
                    color: isSelected ? '#FFFFFF' : '#43474E',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&:hover': {
                      bgcolor: isSelected ? '#1D4ED8' : '#EDF2F7',
                    },
                  }}
                >
                  <span>{tab.label}</span>
                  <Box
                    component="span"
                    sx={{
                      px: 0.6,
                      py: 0.05,
                      borderRadius: '9999px',
                      fontSize: '0.625rem',
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

          {/* Ver todos link para tela de orçamentos */}
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
            Ver todos ({counts.total})
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

      {/* Tabela Unificada com padrão da tela de orçamentos */}
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 860 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F8F9FD' }}>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, pl: 2.5 }}>
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
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, textAlign: 'right', pr: 2.5 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProposals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ py: 6, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: '#F1F4F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#74777F',
                      }}
                    >
                      <FilterListIcon sx={{ fontSize: 24 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: '#1A1B20', fontSize: '0.9375rem' }}>
                      Nenhum orçamento para este filtro
                    </Typography>
                    <Typography sx={{ color: '#74777F', fontSize: '0.8125rem' }}>
                      Selecione outro filtro ou crie um novo orçamento.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredProposals.map((row, idx) => {
                const statusBadge = getStatusBadge(row.status);
                const isApproved = (row.status || '').toLowerCase() === 'aprovado' || (row.status || '').toLowerCase().includes('recibo') || (row.status || '').toLowerCase() === 'concluido';
                const isRejected = (row.status || '').toLowerCase() === 'recusado';
                const isPending = !isApproved && !isRejected;

                const clientName = sanitizeText(row.clienteNome || row.client || 'Cliente');
                const serviceDesc = sanitizeText(row.servicoDescricao || row.service || 'Serviço sob demanda');
                const paymentTerms = sanitizeText(row.condicoesPagamento || row.subValue || '');

                return (
                  <TableRow
                    key={row.id || idx}
                    sx={{
                      '&:hover': { bgcolor: '#F8F9FD' },
                      transition: 'background-color 0.15s ease',
                      borderBottom: '1px solid rgba(196, 198, 207, 0.25)',
                    }}
                  >
                    {/* Código */}
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
                            fontWeight: 700,
                            fontSize: '0.8125rem',
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(clientName)}
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20' }}>
                            {clientName}
                          </Typography>
                          {row.clienteTelefone && (
                            <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
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
                        {serviceDesc}
                      </Typography>
                      {paymentTerms && (
                        <Typography sx={{ fontSize: '0.6875rem', color: '#74777F', mt: 0.25 }}>
                          {paymentTerms}
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
                        {formatMoney(row.valorTotal || row.value || 0)}
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

                    {/* Ações Rápidas */}
                    <TableCell sx={{ py: 2, pr: 2.5, textAlign: 'right' }}>
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
                          onClick={() => {
                            const orcFormatado: OrcamentoItemData = {
                              id: row.id || `orc-${idx}`,
                              codigo: row.codigo || `#0${42 - idx}`,
                              clienteNome: clientName,
                              clienteTelefone: row.clienteTelefone,
                              servicoDescricao: serviceDesc,
                              condicoesPagamento: paymentTerms,
                              valorTotal: row.valorTotal || row.value || 0,
                              status: row.status || 'pendente',
                              itens: Array.isArray(row.itens) && row.itens.length > 0 ? row.itens : [
                                { id: '1', descricao: serviceDesc, qtd: 1, unidade: 'un', unitario: typeof row.valorTotal === 'number' ? row.valorTotal : 1450 }
                              ],
                            };
                            setSelectedPreview(orcFormatado);
                          }}
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

                        {/* Botão Editar (Apenas disponível se PENDENTE) */}
                        {isPending && (
                          <Tooltip title="Editar orçamento" arrow>
                            <Box
                              onClick={() => handleEdit(row)}
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#1E3A8A',
                                bgcolor: '#F1F4F9',
                                transition: 'all 0.15s ease',
                                '&:hover': { bgcolor: '#E2E8F0', transform: 'scale(1.05)' },
                              }}
                            >
                              <EditIcon sx={{ fontSize: 16 }} />
                            </Box>
                          </Tooltip>
                        )}

                        {/* Status / Ações de Decisão */}
                        {isApproved ? (
                          <AppButton
                            variant="surface"
                            size="xsmall"
                            startIcon={<ReceiptIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />}
                            onClick={() => router.push('/recibos')}
                            sx={{
                              bgcolor: '#EFF6FF',
                              color: '#1E3A8A',
                              borderColor: '#BFDBFE',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              '&:hover': { bgcolor: '#DBEAFE' },
                            }}
                          >
                            Recibo
                          </AppButton>
                        ) : isRejected ? (
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.5,
                              px: 1.25,
                              py: 0.4,
                              borderRadius: '9999px',
                              bgcolor: '#FEE2E2',
                              color: '#991B1B',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                            }}
                          >
                            <CloseIcon sx={{ fontSize: 13 }} />
                            Recusado
                          </Box>
                        ) : (
                          <>
                            {/* Botão Reprovar */}
                            <Tooltip title="Reprovar / Recusar proposta" arrow>
                              <Box
                                onClick={() => handleMarkRejected(row.id)}
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  color: '#DC2626',
                                  bgcolor: '#FEF2F2',
                                  border: '1px solid #FECACA',
                                  transition: 'all 0.15s ease',
                                  '&:hover': { bgcolor: '#FEE2E2', transform: 'scale(1.05)' },
                                }}
                              >
                                <CloseIcon sx={{ fontSize: 15 }} />
                              </Box>
                            </Tooltip>

                            {/* Botão Aprovar */}
                            <AppButton
                              variant="primary"
                              size="xsmall"
                              startIcon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                              onClick={() => handleMarkApproved(row.id)}
                              sx={{
                                bgcolor: '#16A34A',
                                fontSize: '0.6875rem',
                                '&:hover': { bgcolor: '#15803D' },
                              }}
                            >
                              Aprovar
                            </AppButton>
                          </>
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

      {/* Rodapé dinâmico */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2.5, fontSize: '12px', color: '#74777F', flexWrap: 'wrap', gap: 1.5 }}>
        <Typography component="span" sx={{ fontSize: '12px', color: '#74777F' }}>
          Mostrando {filteredProposals.length} de {counts.total} orçamentos
        </Typography>
        <Typography
          component="span"
          onClick={handleExportCSV}
          sx={{
            fontSize: '12px',
            color: '#1E3A8A',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'color 0.15s ease',
            '&:hover': { textDecoration: 'underline', color: '#1D4ED8' },
          }}
        >
          Exportar histórico para Contador (.CSV)
        </Typography>
      </Box>

      {/* Modal de Pré-visualização idêntico à tela de orçamentos */}
      <OrcamentoPreviewModal
        open={Boolean(selectedPreview)}
        onClose={() => setSelectedPreview(null)}
        orcamento={selectedPreview}
      />
    </Box>
  );
}
