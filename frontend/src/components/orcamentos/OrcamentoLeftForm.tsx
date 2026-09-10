'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SellIcon from '@mui/icons-material/Sell';
import PaymentsIcon from '@mui/icons-material/Payments';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import EventIcon from '@mui/icons-material/Event';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import AppButton from '@/components/common/AppButton';
import { OrcamentoPreviewItem } from './OrcamentoA4Preview';

interface OrcamentoLeftFormProps {
  codigo?: string;
  isEditing?: boolean;
  isLocked?: boolean;
  clienteNome: string;
  clienteTelefone: string;
  clienteLocalizacao: string;
  clientes?: any[];
  onSelectCliente?: (cliente: any) => void;
  onOpenNovoClienteModal?: (initialName?: string) => void;
  onClienteNomeChange: (v: string) => void;
  onClienteTelefoneChange: (v: string) => void;
  onClienteLocalizacaoChange: (v: string) => void;
  itens: OrcamentoPreviewItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onItemChange: (id: string, field: keyof OrcamentoPreviewItem, value: any) => void;
  subtotal: number;
  desconto: number;
  onDescontoChange: (v: number) => void;
  total: number;
  condicoesPagamento: string;
  onCondicoesChange: (v: string) => void;
  chavePix: string;
  onChavePixChange: (v: string) => void;
  validade: string;
  onValidadeChange: (v: string) => void;
  observacoes: string;
  onObservacoesChange: (v: string) => void;
}

export default function OrcamentoLeftForm({
  codigo = '042',
  isEditing = false,
  isLocked = false,
  clienteNome,
  clienteTelefone,
  clienteLocalizacao,
  clientes = [],
  onSelectCliente,
  onOpenNovoClienteModal,
  onClienteNomeChange,
  onClienteTelefoneChange,
  onClienteLocalizacaoChange,
  itens,
  onAddItem,
  onRemoveItem,
  onItemChange,
  subtotal,
  desconto,
  onDescontoChange,
  total,
  condicoesPagamento,
  onCondicoesChange,
  chavePix,
  onChavePixChange,
  validade,
  onValidadeChange,
  observacoes,
  onObservacoesChange,
}: OrcamentoLeftFormProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatMoney = (val: number) =>
    val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const matchingClients = React.useMemo(() => {
    if (!clientes || clientes.length === 0) return [];
    const term = (clienteNome || '').trim().toLowerCase();
    if (!term) return clientes.slice(0, 5);
    return clientes.filter(
      (c) =>
        c.nome?.toLowerCase().includes(term) ||
        c.documento?.toLowerCase().includes(term) ||
        c.telefone?.toLowerCase().includes(term)
    );
  }, [clientes, clienteNome]);

  const handleSelectOne = (cli: any) => {
    if (onSelectCliente) {
      onSelectCliente(cli);
    } else {
      onClienteNomeChange(cli.nome || '');
      onClienteTelefoneChange(cli.telefone || '');
      onClienteLocalizacaoChange(
        cli.cidade ? `${cli.bairro ? cli.bairro + ', ' : ''}${cli.cidade}` : ''
      );
    }
    setDropdownOpen(false);
  };

  const getInitials = (name: string) => {
    const parts = (name || '').trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (name || 'CL').substring(0, 2).toUpperCase();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Header Guidance Card */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: '20px',
          p: 3,
          border: '1px solid rgba(196, 198, 207, 0.4)',
          boxShadow: '0 2px 12px rgba(30, 41, 59, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#1E3A8A', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
          <EditDocumentIcon sx={{ fontSize: 16 }} />
          <span>Emissão Instantânea MEI</span>
        </Box>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '1.4rem', sm: '1.65rem' },
            fontWeight: 800,
            color: '#1A1B20',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {isEditing ? `Editar Orçamento #${codigo}` : `Criar Novo Orçamento #${codigo}`}
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#43474E', lineHeight: 1.5 }}>
          Preencha os dados em 2 minutos. O documento técnico A4 é formatado automaticamente em tempo real.
        </Typography>
      </Box>

      {/* Card 1: Dados do Cliente */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: '20px',
          p: 3,
          border: '1px solid rgba(196, 198, 207, 0.4)',
          boxShadow: '0 2px 12px rgba(30, 41, 59, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid rgba(196, 198, 207, 0.3)', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#DBEAFE',
                color: '#1E3A8A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PersonIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1A1B20' }}>
              1. Dados do Cliente
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isEditing ? (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 1.5,
                  py: 0.35,
                  borderRadius: '9999px',
                  bgcolor: '#EFF6FF',
                  color: '#1E3A8A',
                  border: '1px solid #BFDBFE',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                <LockIcon sx={{ fontSize: 13 }} />
                Cliente Vinculado
              </Box>
            ) : (
              onOpenNovoClienteModal && (
                <AppButton
                  variant="surface"
                  size="xsmall"
                  startIcon={<PersonAddIcon sx={{ fontSize: 14, color: '#1E3A8A' }} />}
                  onClick={() => onOpenNovoClienteModal('')}
                  sx={{
                    bgcolor: '#EFF6FF',
                    color: '#1E3A8A',
                    borderColor: '#BFDBFE',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    '&:hover': { bgcolor: '#DBEAFE' },
                  }}
                >
                  + Novo Cliente
                </AppButton>
              )
            )}
            <Box sx={{ px: 1.5, py: 0.25, borderRadius: '9999px', bgcolor: 'rgba(219, 234, 254, 0.7)', border: '1px solid rgba(30, 58, 138, 0.2)', color: '#1E3A8A', fontSize: '11px', fontWeight: 600 }}>
              Passo 1 de 3
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
          {/* Nome ou Empresa com Dropdown Inteligente de Clientes */}
          <Box ref={dropdownRef} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '11px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                Nome ou Empresa do Cliente
              </Typography>
              {!isEditing && clientes.length > 0 && (
                <Typography sx={{ fontSize: '11px', color: '#1E3A8A', cursor: 'pointer', fontWeight: 600 }} onClick={() => setDropdownOpen(true)}>
                  {dropdownOpen ? 'Ocultar clientes' : 'Selecionar da carteira'}
                </Typography>
              )}
            </Box>

            <Box sx={{ position: 'relative' }}>
              <input
                type="text"
                value={clienteNome}
                readOnly={isEditing}
                disabled={isLocked}
                onChange={(e) => {
                  if (isEditing) return;
                  onClienteNomeChange(e.target.value);
                  if (!dropdownOpen) setDropdownOpen(true);
                }}
                onFocus={() => {
                  if (!isEditing) setDropdownOpen(true);
                }}
                placeholder={isEditing ? 'Cliente vinculado' : 'Busque ou digite o nome do cliente...'}
                style={{
                  width: '100%',
                  padding: '11px 40px 11px 16px',
                  backgroundColor: isEditing ? '#F8F9FD' : '#F1F4F9',
                  border: isEditing ? '1px solid rgba(196, 198, 207, 0.5)' : dropdownOpen ? '1.5px solid #1E3A8A' : '1px solid rgba(196, 198, 207, 0.6)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: isEditing ? '#334155' : '#1A1B20',
                  fontWeight: isEditing ? 600 : 400,
                  outline: 'none',
                  cursor: isEditing ? 'not-allowed' : 'text',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.15s ease, background-color 0.15s ease',
                }}
              />
              {isEditing ? (
                <LockIcon sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: 17 }} />
              ) : (
                <SearchIcon sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#74777F', fontSize: 18 }} />
              )}
            </Box>

            {isEditing && (
              <Typography sx={{ fontSize: '11px', color: '#64748B', mt: 0.25, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LockIcon sx={{ fontSize: 12, color: '#94A3B8' }} />
                Este orçamento está fixado a este cliente e não pode ser transferido.
              </Typography>
            )}

            {/* Dropdown de Clientes Cadastrados / Opção de Criar Novo */}
            {!isEditing && dropdownOpen && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  mt: 0.75,
                  bgcolor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid rgba(196, 198, 207, 0.6)',
                  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.18)',
                  zIndex: 999,
                  overflow: 'hidden',
                  maxHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Cabeçalho da Lista */}
                <Box sx={{ p: 1.25, px: 2, bgcolor: '#F8F9FD', borderBottom: '1px solid rgba(196, 198, 207, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#74777F', textTransform: 'uppercase' }}>
                    Clientes Cadastrados ({matchingClients.length})
                  </Typography>
                  {onOpenNovoClienteModal && (
                    <Typography
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenNovoClienteModal(clienteNome);
                      }}
                      sx={{ fontSize: '11px', fontWeight: 700, color: '#1E3A8A', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    >
                      + Cadastrar Novo
                    </Typography>
                  )}
                </Box>

                {/* Lista de Clientes */}
                <Box sx={{ overflowY: 'auto', maxHeight: 200 }}>
                  {matchingClients.length > 0 ? (
                    matchingClients.map((cli) => {
                      const isPj = (cli.tipo || '').toUpperCase() === 'PJ';
                      return (
                        <Box
                          key={cli.id}
                          onClick={() => handleSelectOne(cli)}
                          sx={{
                            p: 1.25,
                            px: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease',
                            borderBottom: '1px solid rgba(196, 198, 207, 0.2)',
                            '&:hover': { bgcolor: '#F1F4F9' },
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                bgcolor: isPj ? '#E0E7FF' : '#DBEAFE',
                                color: isPj ? '#3730A3' : '#1E3A8A',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                fontWeight: 800,
                              }}
                            >
                              {getInitials(cli.nome)}
                            </Box>
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#1A1B20' }}>
                                  {cli.nome}
                                </Typography>
                                <Box sx={{ px: 0.75, py: 0.1, borderRadius: '4px', bgcolor: isPj ? '#EEF2FF' : '#F1F4F9', color: isPj ? '#3730A3' : '#74777F', fontSize: '9px', fontWeight: 700 }}>
                                  {cli.tipo || 'PF'}
                                </Box>
                              </Box>
                              <Typography sx={{ fontSize: '11px', color: '#74777F' }}>
                                {cli.telefone || 'Sem telefone'} {cli.cidade ? `• ${cli.cidade}` : ''}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography sx={{ fontSize: '11px', color: '#1E3A8A', fontWeight: 600 }}>
                            Selecionar
                          </Typography>
                        </Box>
                      );
                    })
                  ) : (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <Typography sx={{ fontSize: '13px', color: '#74777F' }}>
                        Nenhum cliente encontrado com este nome.
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Botão de Criação se não existir ou para cadastrar novo */}
                {onOpenNovoClienteModal && (
                  <Box
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenNovoClienteModal(clienteNome);
                    }}
                    sx={{
                      p: 1.5,
                      px: 2,
                      bgcolor: '#EFF6FF',
                      borderTop: '1px solid #BFDBFE',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: '#1E3A8A',
                      fontWeight: 700,
                      fontSize: '13px',
                      transition: 'background-color 0.15s ease',
                      '&:hover': { bgcolor: '#DBEAFE' },
                    }}
                  >
                    <PersonAddIcon sx={{ fontSize: 18 }} />
                    <span>
                      {clienteNome.trim()
                        ? `Cadastrar "${clienteNome.trim()}" como novo cliente`
                        : 'Cadastrar novo cliente agora'}
                    </span>
                  </Box>
                )}
              </Box>
            )}
          </Box>


          {/* Grid 2 colunas: WhatsApp + Localização */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ fontSize: '11px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                WhatsApp com DDD
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <ChatIcon sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#74777F', fontSize: 17 }} />
                <input
                  type="text"
                  value={clienteTelefone}
                  disabled={isLocked}
                  readOnly={isLocked}
                  onChange={(e) => onClienteTelefoneChange(e.target.value)}
                  placeholder="(00) 00000-0000"
                  style={{
                    width: '100%',
                    padding: '11px 16px 11px 38px',
                    backgroundColor: isLocked ? '#F8F9FD' : '#F1F4F9',
                    border: '1px solid rgba(196, 198, 207, 0.6)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: isLocked ? '#64748B' : '#1A1B20',
                    outline: 'none',
                    cursor: isLocked ? 'not-allowed' : 'text',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => {
                    if (isLocked) return;
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#1E3A8A';
                  }}
                  onBlur={(e) => {
                    if (isLocked) return;
                    e.currentTarget.style.backgroundColor = '#F1F4F9';
                    e.currentTarget.style.borderColor = 'rgba(196, 198, 207, 0.6)';
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ fontSize: '11px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                Cidade / Bairro
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <LocationOnIcon sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#74777F', fontSize: 17 }} />
                <input
                  type="text"
                  value={clienteLocalizacao}
                  disabled={isLocked}
                  readOnly={isLocked}
                  onChange={(e) => onClienteLocalizacaoChange(e.target.value)}
                  placeholder="Cidade - UF"
                  style={{
                    width: '100%',
                    padding: '11px 16px 11px 38px',
                    backgroundColor: isLocked ? '#F8F9FD' : '#F1F4F9',
                    border: '1px solid rgba(196, 198, 207, 0.6)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: isLocked ? '#64748B' : '#1A1B20',
                    outline: 'none',
                    cursor: isLocked ? 'not-allowed' : 'text',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#1E3A8A';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.backgroundColor = '#F1F4F9';
                    e.currentTarget.style.borderColor = 'rgba(196, 198, 207, 0.6)';
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Card 2: Serviços e Materiais */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: '20px',
          p: 3,
          border: '1px solid rgba(196, 198, 207, 0.4)',
          boxShadow: '0 2px 12px rgba(30, 41, 59, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid rgba(196, 198, 207, 0.3)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#DBEAFE',
                color: '#1E3A8A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormatListBulletedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1A1B20' }}>
              2. Serviços e Materiais
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '11px', color: '#74777F', fontWeight: 600 }}>
            Tabela Dinâmica
          </Typography>
        </Box>

        {/* Dynamic Items List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {itens.map((item, idx) => (
            <Box
              key={item.id || idx}
              sx={{
                p: 1.75,
                bgcolor: '#F1F4F9',
                border: '1px solid rgba(196, 198, 207, 0.4)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: 1.5,
                transition: 'all 0.15s ease',
                '&:hover': {
                  borderColor: 'rgba(30, 58, 138, 0.35)',
                  bgcolor: 'rgba(241, 244, 249, 0.7)',
                },
              }}
            >
              <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography sx={{ fontSize: '10px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600 }}>
                  Descrição Técnica
                </Typography>
                <input
                  type="text"
                  value={item.descricao}
                  onChange={(e) => onItemChange(item.id, 'descricao', e.target.value)}
                  placeholder="Descrição do serviço ou material"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(196, 198, 207, 0.6)',
                    borderRadius: '10px',
                    fontSize: '13px',
                    color: '#1A1B20',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#1E3A8A'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(196, 198, 207, 0.6)'; }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: { xs: '100%', md: 'auto' } }}>
                <Box sx={{ width: 68, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ fontSize: '10px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600 }}>
                    Qtd
                  </Typography>
                  <input
                    type="number"
                    min="1"
                    value={item.qtd}
                    onChange={(e) => onItemChange(item.id, 'qtd', Number(e.target.value) || 1)}
                    style={{
                      width: '100%',
                      padding: '8px 6px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(196, 198, 207, 0.6)',
                      borderRadius: '10px',
                      fontSize: '13px',
                      textAlign: 'center',
                      color: '#1A1B20',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#1E3A8A'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(196, 198, 207, 0.6)'; }}
                  />
                </Box>

                <Box sx={{ width: 88, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ fontSize: '10px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600 }}>
                    Unidade
                  </Typography>
                  <select
                    value={item.unidade || 'un'}
                    onChange={(e) => onItemChange(item.id, 'unidade', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 6px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(196, 198, 207, 0.6)',
                      borderRadius: '10px',
                      fontSize: '13px',
                      color: '#1A1B20',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                    }}
                  >
                    <option value="un">un</option>
                    <option value="h">h</option>
                    <option value="m²">m²</option>
                    <option value="m">m</option>
                  </select>
                </Box>

                <Box sx={{ width: 110, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ fontSize: '10px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600 }}>
                    Unitário
                  </Typography>
                  <Box sx={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: '#74777F' }}>
                      R$
                    </span>
                    <input
                      type="number"
                      step="1"
                      value={item.unitario}
                      onChange={(e) => onItemChange(item.id, 'unitario', Number(e.target.value) || 0)}
                      style={{
                        width: '100%',
                        padding: '8px 8px 8px 26px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(196, 198, 207, 0.6)',
                        borderRadius: '10px',
                        fontSize: '13px',
                        textAlign: 'right',
                        color: '#1A1B20',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#1E3A8A'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(196, 198, 207, 0.6)'; }}
                    />
                  </Box>
                </Box>

                <Box sx={{ pt: { xs: 0, md: 2.2 } }}>
                  <IconButton
                    size="small"
                    onClick={() => onRemoveItem(item.id)}
                    disabled={itens.length <= 1}
                    title="Remover item"
                    sx={{
                      color: '#74777F',
                      '&:hover': { color: '#BA1A1A', bgcolor: '#FFDAD6' },
                    }}
                  >
                    <DeleteOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Add Item Button */}
        <AppButton
          variant="surface"
          size="small"
          startIcon={<AddCircleIcon sx={{ fontSize: 18, color: '#1E3A8A' }} />}
          onClick={onAddItem}
          sx={{
            py: 1.25,
            bgcolor: '#F1F4F9',
            borderColor: 'rgba(196, 198, 207, 0.5)',
            color: '#1E3A8A',
            justifyContent: 'center',
            fontSize: '13px',
            '&:hover': { bgcolor: '#E8EDF5' },
          }}
        >
          Adicionar outro serviço ou item
        </AppButton>

        {/* Financial Subtotal / Discount / Total Widget */}
        <Box
          sx={{
            p: 2,
            bgcolor: '#F1F4F9',
            border: '1px solid rgba(196, 198, 207, 0.4)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.25,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#43474E' }}>
            <span>Subtotal Bruto</span>
            <span style={{ fontWeight: 600, color: '#1A1B20' }}>R$ {formatMoney(subtotal)}</span>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#43474E', fontSize: '13px' }}>
              <SellIcon sx={{ fontSize: 16, color: '#2563EB' }} />
              <span>Desconto Especial</span>
            </Box>
            <Box sx={{ position: 'relative', width: 120 }}>
              <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: '#74777F' }}>
                R$
              </span>
              <input
                type="number"
                value={desconto}
                onChange={(e) => onDescontoChange(Math.max(0, Number(e.target.value) || 0))}
                style={{
                  width: '100%',
                  padding: '6px 8px 6px 26px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(196, 198, 207, 0.6)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  textAlign: 'right',
                  color: '#2563EB',
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ height: 1, bgcolor: 'rgba(196, 198, 207, 0.4)', my: 0.5 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#1A1B20' }}>
              Total do Orçamento
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 800, color: '#1E3A8A' }}>
                BRL
              </Typography>
              <Typography sx={{ fontSize: '22px', fontWeight: 800, color: '#1E3A8A', letterSpacing: '-0.02em' }}>
                R$ {formatMoney(total)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Card 3: Pagamento & Garantia */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: '20px',
          p: 3,
          border: '1px solid rgba(196, 198, 207, 0.4)',
          boxShadow: '0 2px 12px rgba(30, 41, 59, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid rgba(196, 198, 207, 0.3)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#DBEAFE',
                color: '#1E3A8A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PaymentsIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1A1B20' }}>
              3. Pagamento & Garantia
            </Typography>
          </Box>
          <Box sx={{ px: 1.5, py: 0.25, borderRadius: '9999px', bgcolor: 'rgba(219, 234, 254, 0.7)', border: '1px solid rgba(30, 58, 138, 0.2)', color: '#1E3A8A', fontSize: '11px', fontWeight: 600 }}>
            Finalização
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
          {/* Condições de Pagamento */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography sx={{ fontSize: '11px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
              Condições de Pagamento
            </Typography>
            <input
              type="text"
              value={condicoesPagamento}
              onChange={(e) => onCondicoesChange(e.target.value)}
              placeholder="Ex: 50% de entrada no aceite + 50% na conclusão"
              style={{
                width: '100%',
                padding: '11px 16px',
                backgroundColor: '#F1F4F9',
                border: '1px solid rgba(196, 198, 207, 0.6)',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#1A1B20',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#1E3A8A'; }}
              onBlur={(e) => { e.currentTarget.style.backgroundColor = '#F1F4F9'; e.currentTarget.style.borderColor = 'rgba(196, 198, 207, 0.6)'; }}
            />
          </Box>

          {/* Grid 2 colunas: Chave PIX + Validade */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ fontSize: '11px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                Chave PIX Cadastrada
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <QrCode2Icon sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#1E3A8A', fontSize: 18 }} />
                <input
                  type="text"
                  value={chavePix}
                  onChange={(e) => onChavePixChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 16px 11px 38px',
                    backgroundColor: '#F1F4F9',
                    border: '1px solid rgba(196, 198, 207, 0.6)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#1A1B20',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#1E3A8A'; }}
                  onBlur={(e) => { e.currentTarget.style.backgroundColor = '#F1F4F9'; e.currentTarget.style.borderColor = 'rgba(196, 198, 207, 0.6)'; }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ fontSize: '11px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                Validade da Proposta
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <EventIcon sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#74777F', fontSize: 17 }} />
                <input
                  type="text"
                  value={validade}
                  onChange={(e) => onValidadeChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 16px 11px 38px',
                    backgroundColor: '#F1F4F9',
                    border: '1px solid rgba(196, 198, 207, 0.6)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#1A1B20',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#1E3A8A'; }}
                  onBlur={(e) => { e.currentTarget.style.backgroundColor = '#F1F4F9'; e.currentTarget.style.borderColor = 'rgba(196, 198, 207, 0.6)'; }}
                />
              </Box>
            </Box>
          </Box>

          {/* Termos de Garantia & Observações */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography sx={{ fontSize: '11px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
              Termos de Garantia & Observações
            </Typography>
            <textarea
              rows={2}
              value={observacoes}
              onChange={(e) => onObservacoesChange(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 16px',
                backgroundColor: '#F1F4F9',
                border: '1px solid rgba(196, 198, 207, 0.6)',
                borderRadius: '12px',
                fontSize: '13px',
                color: '#1A1B20',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                resize: 'none',
                lineHeight: 1.5,
              }}
              onFocus={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#1E3A8A'; }}
              onBlur={(e) => { e.currentTarget.style.backgroundColor = '#F1F4F9'; e.currentTarget.style.borderColor = 'rgba(196, 198, 207, 0.6)'; }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
