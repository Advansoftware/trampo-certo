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
import AppButton from '@/components/common/AppButton';
import { OrcamentoPreviewItem } from './OrcamentoA4Preview';

interface OrcamentoLeftFormProps {
  codigo?: string;
  clienteNome: string;
  clienteTelefone: string;
  clienteLocalizacao: string;
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
  clienteNome,
  clienteTelefone,
  clienteLocalizacao,
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
  const formatMoney = (val: number) =>
    val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
          Criar Novo Orçamento #{codigo}
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
              <PersonIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1A1B20' }}>
              1. Dados do Cliente
            </Typography>
          </Box>
          <Box sx={{ px: 1.5, py: 0.25, borderRadius: '9999px', bgcolor: 'rgba(219, 234, 254, 0.7)', border: '1px solid rgba(30, 58, 138, 0.2)', color: '#1E3A8A', fontSize: '11px', fontWeight: 600 }}>
            Passo 1 de 3
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
          {/* Nome ou Empresa */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography sx={{ fontSize: '11px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
              Nome ou Empresa do Cliente
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <input
                type="text"
                value={clienteNome}
                onChange={(e) => onClienteNomeChange(e.target.value)}
                placeholder="Ex: Juliana Mendes"
                style={{
                  width: '100%',
                  padding: '11px 40px 11px 16px',
                  backgroundColor: '#F1F4F9',
                  border: '1px solid rgba(196, 198, 207, 0.6)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#1A1B20',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.15s ease, background-color 0.15s ease',
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
              <CheckCircleIcon sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#1E3A8A', fontSize: 18 }} />
            </Box>
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
                  onChange={(e) => onClienteTelefoneChange(e.target.value)}
                  placeholder="(00) 00000-0000"
                  style={{
                    width: '100%',
                    padding: '11px 16px 11px 38px',
                    backgroundColor: '#F1F4F9',
                    border: '1px solid rgba(196, 198, 207, 0.6)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: '#1A1B20',
                    outline: 'none',
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

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ fontSize: '11px', color: '#43474E', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                Cidade / Bairro
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <LocationOnIcon sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#74777F', fontSize: 17 }} />
                <input
                  type="text"
                  value={clienteLocalizacao}
                  onChange={(e) => onClienteLocalizacaoChange(e.target.value)}
                  placeholder="Cidade - UF"
                  style={{
                    width: '100%',
                    padding: '11px 16px 11px 38px',
                    backgroundColor: '#F1F4F9',
                    border: '1px solid rgba(196, 198, 207, 0.6)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: '#1A1B20',
                    outline: 'none',
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
