'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SellIcon from '@mui/icons-material/Sell';
import AppButton from '@/components/common/AppButton';
import { formatNumero } from '@/lib/format';
import { OrcamentoPreviewItem } from '../OrcamentoA4Preview';
import CardCabecalho from './CardCabecalho';
import LinhaItem from './LinhaItem';
import { ESTILO_CARD, estiloInput } from './camposEstilo';

interface CardItensProps {
  bloqueado: boolean;
  itens: OrcamentoPreviewItem[];
  onAdicionarItem: () => void;
  onRemoverItem: (id: string) => void;
  onAlterarItem: (id: string, campo: keyof OrcamentoPreviewItem, valor: string | number) => void;
  subtotal: number;
  desconto: number;
  onDescontoChange: (valor: number) => void;
  total: number;
}

/** Passo 2: itens do serviço e fechamento financeiro. */
export default function CardItens({
  bloqueado,
  itens,
  onAdicionarItem,
  onRemoverItem,
  onAlterarItem,
  subtotal,
  desconto,
  onDescontoChange,
  total,
}: CardItensProps) {
  return (
    <Box sx={ESTILO_CARD}>
      <CardCabecalho
        icone={<FormatListBulletedIcon sx={{ fontSize: 18 }} />}
        titulo="2. Serviços e materiais"
        acao={
          <Typography sx={{ fontSize: '11px', color: '#74777F', fontWeight: 600 }}>Tabela dinâmica</Typography>
        }
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {itens.map((item) => (
          <LinhaItem
            key={item.id}
            item={item}
            bloqueado={bloqueado}
            podeRemover={itens.length > 1}
            onChange={onAlterarItem}
            onRemover={onRemoverItem}
          />
        ))}
      </Box>

      <AppButton
        variant="surface"
        size="small"
        disabled={bloqueado}
        startIcon={<AddCircleIcon sx={{ fontSize: 18, color: '#1E3A8A' }} />}
        onClick={onAdicionarItem}
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
          <span>Subtotal</span>
          <span style={{ fontWeight: 600, color: '#1A1B20' }}>R$ {formatNumero(subtotal)}</span>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#43474E', fontSize: '13px' }}>
            <SellIcon sx={{ fontSize: 16, color: '#2563EB' }} />
            <span>Desconto</span>
          </Box>
          <Box sx={{ position: 'relative', width: 120 }}>
            <span
              style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: '#74777F' }}
            >
              R$
            </span>
            <input
              type="number"
              step="any"
              min="0"
              placeholder="0"
              value={desconto === 0 ? '' : desconto}
              disabled={bloqueado}
              readOnly={bloqueado}
              onChange={(evento) => {
                const valor = evento.target.value;
                onDescontoChange(valor === '' ? 0 : Math.max(0, Number.parseFloat(valor) || 0));
              }}
              onFocus={(evento) => !bloqueado && evento.target.select()}
              style={{
                ...estiloInput({
                  bloqueado,
                  padding: '6px 8px 6px 26px',
                  fundo: '#FFFFFF',
                  fonte: '13px',
                  alinhamento: 'right',
                }),
                color: bloqueado ? '#64748B' : '#2563EB',
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>

        <Box sx={{ height: 1, bgcolor: 'rgba(196, 198, 207, 0.4)', my: 0.5 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#1A1B20' }}>
            Total do orçamento
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography sx={{ fontSize: '11px', fontWeight: 800, color: '#1E3A8A' }}>BRL</Typography>
            <Typography sx={{ fontSize: '22px', fontWeight: 800, color: '#1E3A8A', letterSpacing: '-0.02em' }}>
              R$ {formatNumero(total)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
