'use client';

import React, { useState, useMemo } from 'react';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AppButton from '@/components/common/AppButton';
import ReciboModal from './ReciboModal';
import { ReciboData } from './ReciboPaperView';

interface RecibosTableProps {
  recibos: ReciboData[];
}

export default function RecibosTable({ recibos }: RecibosTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'todos' | 'pix' | 'cartao' | 'transferencia' | 'dinheiro'>('todos');
  const [selectedRecibo, setSelectedRecibo] = useState<ReciboData | null>(null);

  const filteredRecibos = useMemo(() => {
    return recibos.filter((r) => {
      const term = searchTerm.toLowerCase();
      const matchSearch =
        !term ||
        r.clienteNome.toLowerCase().includes(term) ||
        r.codigo.toLowerCase().includes(term) ||
        r.servicoDescricao.toLowerCase().includes(term);

      let matchFilter = true;
      if (activeFilter !== 'todos') {
        matchFilter = (r.formaPagamento || '').toLowerCase() === activeFilter;
      }

      return matchSearch && matchFilter;
    });
  }, [recibos, searchTerm, activeFilter]);

  const counts = useMemo(() => {
    const total = recibos.length;
    const pix = recibos.filter((r) => (r.formaPagamento || '').toLowerCase() === 'pix').length;
    const cartao = recibos.filter((r) => (r.formaPagamento || '').toLowerCase() === 'cartao').length;
    const transferencia = recibos.filter((r) => (r.formaPagamento || '').toLowerCase() === 'transferencia').length;
    const dinheiro = recibos.filter((r) => (r.formaPagamento || '').toLowerCase() === 'dinheiro').length;
    return { total, pix, cartao, transferencia, dinheiro };
  }, [recibos]);

  const handleSendWhatsApp = (item: ReciboData) => {
    const valFormatted = item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const texto = encodeURIComponent(
      `Olá ${item.clienteNome}! 👋 Segue seu comprovante de recibo quitado da TrampoCerto (${item.codigo}):\n\n` +
      `🛠️ *Serviço:* ${item.servicoDescricao}\n` +
      `💰 *Valor Quitado:* R$ ${valFormatted}\n` +
      `📅 *Data de Pagamento:* ${item.dataPagamento}\n` +
      `💳 *Forma:* ${item.formaPagamentoLabel}\n` +
      `🔐 *Autenticação Digital:* ${item.autenticacao}\n\n` +
      `Agradeço a preferência! Qualquer necessidade estou à disposição.`,
    );

    const tel = (item.clienteTelefone || '').replace(/\D/g, '');
    const url = tel ? `https://wa.me/55${tel}?text=${texto}` : `https://wa.me/?text=${texto}`;
    window.open(url, '_blank');
  };

  const getInitials = (name: string) => {
    const parts = (name || '').trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (name || 'TC').substring(0, 2).toUpperCase();
  };

  const getFormaIcon = (forma: string) => {
    switch ((forma || '').toLowerCase()) {
      case 'pix':
        return <QrCode2Icon sx={{ fontSize: 14, color: '#1E3A8A' }} />;
      case 'cartao':
        return <CreditCardIcon sx={{ fontSize: 14, color: '#2563EB' }} />;
      case 'transferencia':
        return <AccountBalanceIcon sx={{ fontSize: 14, color: '#43474E' }} />;
      case 'dinheiro':
        return <LocalAtmIcon sx={{ fontSize: 14, color: '#166534' }} />;
      default:
        return <CheckCircleIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />;
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
      {/* Toolbar: Search & Payment Filters */}
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
          placeholder="Buscar por cliente, recibo ou serviço..."
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
            { key: 'pix', label: 'Pix', count: counts.pix },
            { key: 'cartao', label: 'Cartão', count: counts.cartao },
            { key: 'transferencia', label: 'Transferência', count: counts.transferencia },
            { key: 'dinheiro', label: 'Dinheiro', count: counts.dinheiro },
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
        <Table sx={{ minWidth: 860 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F8F9FD' }}>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, pl: 3 }}>
                Recibo
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5 }}>
                Cliente
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5 }}>
                Serviço Quitado
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5 }}>
                Data & Hora
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, textAlign: 'right' }}>
                Valor Quitado
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, textAlign: 'center' }}>
                Forma
              </TableCell>
              <TableCell sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.05em', py: 1.5, textAlign: 'right', pr: 3 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRecibos.length === 0 ? (
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
                      Nenhum recibo encontrado
                    </Typography>
                    <Typography sx={{ color: '#74777F', fontSize: '0.8125rem', maxWidth: 360 }}>
                      Não há comprovantes correspondentes ao filtro atual. Tente buscar por outro termo.
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
              filteredRecibos.map((row, idx) => (
                <TableRow
                  key={row.id || idx}
                  sx={{
                    '&:hover': { bgcolor: '#F8F9FD' },
                    transition: 'background-color 0.15s ease',
                    borderBottom: '1px solid rgba(196, 198, 207, 0.25)',
                  }}
                >
                  {/* Código */}
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
                      {row.codigo}
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
                          bgcolor: idx % 3 === 0 ? '#DBEAFE' : idx % 3 === 1 ? '#DCFCE7' : '#F1F4F9',
                          color: idx % 3 === 0 ? '#172554' : idx % 3 === 1 ? '#166534' : '#2563EB',
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
                        {row.clienteDocumento && (
                          <Typography sx={{ fontSize: '0.75rem', color: '#74777F', mt: 0.25 }}>
                            {row.clienteDocumento}
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
                      {row.servicoDescricao}
                    </Typography>
                    {row.propostaCodigo && (
                      <Typography sx={{ fontSize: '0.6875rem', color: '#1E3A8A', fontWeight: 600, mt: 0.25 }}>
                        Origem: {row.propostaCodigo}
                      </Typography>
                    )}
                  </TableCell>

                  {/* Data */}
                  <TableCell sx={{ py: 2, whiteSpace: 'nowrap' }}>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#43474E' }}>
                      {row.dataPagamento}
                    </Typography>
                  </TableCell>

                  {/* Valor Total */}
                  <TableCell sx={{ py: 2, textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 800, color: '#166534' }}>
                      R$ {row.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  </TableCell>

                  {/* Forma de Pagamento */}
                  <TableCell sx={{ py: 2, textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,
                        px: 1.5,
                        py: 0.4,
                        borderRadius: '9999px',
                        bgcolor: '#F1F4F9',
                        color: '#1A1B20',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                      }}
                    >
                      {getFormaIcon(row.formaPagamento)}
                      <span>{row.formaPagamento.toUpperCase()}</span>
                    </Box>
                  </TableCell>

                  {/* Ações */}
                  <TableCell sx={{ py: 2, pr: 3, textAlign: 'right' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      {/* WhatsApp */}
                      <Box
                        onClick={() => handleSendWhatsApp(row)}
                        title="Enviar comprovante no WhatsApp"
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

                      {/* Visualizar Recibo */}
                      <Box
                        onClick={() => setSelectedRecibo(row)}
                        title="Visualizar Recibo Timbrado"
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
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
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
          Mostrando {filteredRecibos.length} de {recibos.length} comprovantes emitidos
        </span>
        <span>
          Sincronizado com Livro Caixa MEI
        </span>
      </Box>

      {/* Modal de Visualização & Impressão */}
      <ReciboModal
        open={Boolean(selectedRecibo)}
        onClose={() => setSelectedRecibo(null)}
        recibo={selectedRecibo}
      />
    </Box>
  );
}
