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
import PostAddIcon from '@mui/icons-material/PostAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Tooltip from '@mui/material/Tooltip';
import AppButton from '@/components/common/AppButton';
import { ClienteItemData } from './ClientesMetrics';

interface ClientesTableProps {
  clientes: ClienteItemData[];
  onSelectCliente: (cliente: ClienteItemData) => void;
}

export default function ClientesTable({
  clientes,
  onSelectCliente,
}: ClientesTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'todos' | 'PF' | 'PJ' | 'recorrente'>('todos');

  const filteredClientes = useMemo(() => {
    return clientes.filter((c) => {
      const term = searchTerm.toLowerCase();
      const matchSearch =
        !term ||
        c.nome.toLowerCase().includes(term) ||
        c.documento?.toLowerCase().includes(term) ||
        c.telefone?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.cidade?.toLowerCase().includes(term) ||
        c.bairro?.toLowerCase().includes(term);

      let matchFilter = true;
      if (activeFilter === 'PF') {
        matchFilter = (c.tipo || '').toUpperCase() === 'PF';
      } else if (activeFilter === 'PJ') {
        matchFilter = (c.tipo || '').toUpperCase() === 'PJ';
      } else if (activeFilter === 'recorrente') {
        matchFilter = (c.tags || []).some((t) => t.toLowerCase().includes('recorrente')) || c.totalPropostas > 1;
      }

      return matchSearch && matchFilter;
    });
  }, [clientes, searchTerm, activeFilter]);

  const counts = useMemo(() => {
    const total = clientes.length;
    const pf = clientes.filter((c) => (c.tipo || '').toUpperCase() === 'PF').length;
    const pj = clientes.filter((c) => (c.tipo || '').toUpperCase() === 'PJ').length;
    const recorrentes = clientes.filter(
      (c) => (c.tags || []).some((t) => t.toLowerCase().includes('recorrente')) || c.totalPropostas > 1
    ).length;
    return { total, pf, pj, recorrentes };
  }, [clientes]);

  const formatMoney = (val: number) => {
    const safe = typeof val === 'number' && !isNaN(val) ? val : 0;
    return `R$ ${safe.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getInitials = (name: string) => {
    const parts = (name || '').trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (name || 'CL').substring(0, 2).toUpperCase();
  };

  const handleWhatsApp = (cliente: ClienteItemData) => {
    const tel = (cliente.telefone || '').replace(/\D/g, '');
    const texto = encodeURIComponent(
      `Olá ${cliente.nome}! 👋 Tudo bem? Aqui é da TrampoCerto. Passando para conferir como estão os serviços e se precisa de algum novo suporte ou orçamento!`,
    );
    const url = tel ? `https://wa.me/55${tel}?text=${texto}` : `https://wa.me/?text=${texto}`;
    window.open(url, '_blank');
  };

  const handleNovoOrcamentoParaCliente = (cliente: ClienteItemData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'trampo_novo_orcamento_cliente',
        JSON.stringify({
          clienteNome: cliente.nome,
          clienteTelefone: cliente.telefone,
          clienteLocalizacao: `${cliente.bairro ? cliente.bairro + ', ' : ''}${cliente.cidade || 'São Paulo - SP'}`,
        })
      );
    }
    router.push('/orcamentos/novo');
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
      {/* Table Toolbar: Search & Filters */}
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
          placeholder="Buscar por nome, CPF/CNPJ, telefone, e-mail ou cidade..."
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
          sx={{ minWidth: { xs: '100%', md: 380 } }}
        />

        {/* Filter Pills */}
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
            { key: 'PF', label: 'Pessoa Física', count: counts.pf },
            { key: 'PJ', label: 'Pessoa Jurídica', count: counts.pj },
            { key: 'recorrente', label: 'Recorrentes', count: counts.recorrentes },
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

      {/* Main Table */}
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 920 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F8F9FD' }}>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, pl: 3 }}>
                Cliente
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5 }}>
                Contato
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5 }}>
                Localização
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, textAlign: 'center' }}>
                Propostas
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, textAlign: 'right' }}>
                Total Faturado
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5 }}>
                Perfil / Tags
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, textAlign: 'right', pr: 3 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredClientes.length === 0 ? (
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
                      Nenhum cliente encontrado
                    </Typography>
                    <Typography sx={{ color: '#74777F', fontSize: '0.8125rem', maxWidth: 360 }}>
                      Não encontramos clientes para os critérios atuais. Tente buscar por outro termo ou limpar o filtro.
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
              filteredClientes.map((row, idx) => {
                const isPj = (row.tipo || '').toUpperCase() === 'PJ';

                return (
                  <TableRow
                    key={row.id || idx}
                    sx={{
                      '&:hover': { bgcolor: '#F8F9FD' },
                      transition: 'background-color 0.15s ease',
                      borderBottom: '1px solid rgba(196, 198, 207, 0.25)',
                    }}
                  >
                    {/* Cliente + Documento */}
                    <TableCell sx={{ pl: 3, py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: '50%',
                            bgcolor: isPj ? '#E0E7FF' : idx % 2 === 0 ? '#DBEAFE' : '#E8EDF5',
                            color: isPj ? '#3730A3' : idx % 2 === 0 ? '#172554' : '#1E3A8A',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8125rem',
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(row.nome)}
                        </Box>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Typography
                              onClick={() => onSelectCliente(row)}
                              sx={{
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                color: '#1A1B20',
                                cursor: 'pointer',
                                '&:hover': { color: '#1E3A8A', textDecoration: 'underline' },
                              }}
                            >
                              {row.nome}
                            </Typography>
                            <Box
                              sx={{
                                px: 1,
                                py: 0.1,
                                borderRadius: '6px',
                                fontSize: '0.625rem',
                                fontWeight: 800,
                                bgcolor: isPj ? '#EEF2FF' : '#F1F4F9',
                                color: isPj ? '#3730A3' : '#43474E',
                                border: '1px solid rgba(196, 198, 207, 0.3)',
                              }}
                            >
                              {row.tipo || 'PF'}
                            </Box>
                          </Box>
                          <Typography sx={{ fontSize: '0.75rem', color: '#74777F', mt: 0.25, fontFamily: 'monospace' }}>
                            {row.documento || 'Documento não informado'}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Contato (Telefone + Email) */}
                    <TableCell sx={{ py: 2 }}>
                      <Box>
                        <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1A1B20' }}>
                          {row.telefone || 'Sem telefone'}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: '#74777F', mt: 0.25 }}>
                          {row.email || 'Sem e-mail'}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Localização */}
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 16, color: '#74777F' }} />
                        <Typography sx={{ fontSize: '0.8125rem', color: '#43474E' }}>
                          {row.bairro ? `${row.bairro}, ` : ''}{row.cidade || 'São Paulo - SP'}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Propostas & Conversão */}
                    <TableCell sx={{ py: 2, textAlign: 'center' }}>
                      <Box sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box
                          sx={{
                            px: 1.25,
                            py: 0.25,
                            borderRadius: '9999px',
                            bgcolor: '#DCFCE7',
                            color: '#166534',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                          }}
                        >
                          {row.propostasAprovadas} de {row.totalPropostas} aprovadas
                        </Box>
                        <Typography sx={{ fontSize: '0.6875rem', color: '#74777F', mt: 0.3 }}>
                          Último: {row.ultimoServico || 'Recente'}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Total Faturado */}
                    <TableCell sx={{ py: 2, textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <Typography sx={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1A1B20' }}>
                        {formatMoney(row.totalFaturado)}
                      </Typography>
                    </TableCell>

                    {/* Tags */}
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(row.tags || ['Cliente Ativo']).map((tag, tIdx) => (
                          <Box
                            key={tIdx}
                            sx={{
                              px: 1,
                              py: 0.2,
                              borderRadius: '9999px',
                              bgcolor: tag.toLowerCase().includes('top')
                                ? '#FEF3C7'
                                : tag.toLowerCase().includes('recorrente')
                                ? '#DBEAFE'
                                : '#F1F4F9',
                              color: tag.toLowerCase().includes('top')
                                ? '#92400E'
                                : tag.toLowerCase().includes('recorrente')
                                ? '#172554'
                                : '#43474E',
                              fontSize: '0.6875rem',
                              fontWeight: 600,
                            }}
                          >
                            {tag}
                          </Box>
                        ))}
                      </Box>
                    </TableCell>

                    {/* Ações */}
                    <TableCell sx={{ py: 2, pr: 3, textAlign: 'right' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                        {/* WhatsApp */}
                        <Tooltip title="Falar no WhatsApp" arrow>
                          <Box
                            onClick={() => handleWhatsApp(row)}
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
                        </Tooltip>

                        {/* Criar Orçamento para este cliente */}
                        <Tooltip title="Gerar novo orçamento para este cliente" arrow>
                          <Box
                            onClick={() => handleNovoOrcamentoParaCliente(row)}
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
                            <PostAddIcon sx={{ fontSize: 17 }} />
                          </Box>
                        </Tooltip>

                        {/* Ver Ficha Detalhada */}
                        <Tooltip title="Visualizar ficha completa" arrow>
                          <Box
                            onClick={() => onSelectCliente(row)}
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: '#43474E',
                              bgcolor: '#F1F4F9',
                              transition: 'all 0.15s ease',
                              '&:hover': { bgcolor: '#E2E8F0', transform: 'scale(1.05)' },
                            }}
                          >
                            <VisibilityIcon sx={{ fontSize: 17 }} />
                          </Box>
                        </Tooltip>
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
          Mostrando {filteredClientes.length} de {clientes.length} clientes
        </span>
        <span>
          Base sincronizada com emissor de propostas
        </span>
      </Box>
    </Box>
  );
}
